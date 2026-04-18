// src/features/wallet-tools/services/auction/auction.service.ts

import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'viem';
import { readContract, readContracts, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';
import { AccountFacade } from '@entities';
import { WALLET_TOOLS_CONFIG } from '../../wallet-tools.config';
import { ensureErc20Allowance } from '../staking/staking.utils';
import { AuctionPoolStatus, AuctionPoolUI, BidPoolStatus, IPoolResponse } from './auction.types';

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

@Injectable()
export class AuctionService {
  private readonly account = inject(AccountFacade);
  private readonly destroyRef = inject(DestroyRef);

  readonly now = signal(Date.now());
  readonly isPoolsLoading = signal(false);

  private readonly poolsSignal = signal<AuctionPoolUI[]>([]);
  readonly pools = this.poolsSignal.asReadonly();

  readonly poolsUpcoming = computed(() => this.pools().filter((p) => p.status === 'upcoming'));
  readonly poolsActive = computed(() => this.pools().filter((p) => p.status === 'active'));
  readonly poolsWithdraw = computed(() => this.pools().filter((p) => p.status === 'withdraw'));
  readonly poolsEnded = computed(() => this.pools().filter((p) => p.status === 'ended'));

  private readonly progressBidSignal = signal<Set<number>>(new Set());
  readonly progressBid = this.progressBidSignal.asReadonly();

  private readonly progressWithdrawSignal = signal<Set<number>>(new Set());
  readonly progressWithdraw = this.progressWithdrawSignal.asReadonly();

  private tick?: number;
  private inFlight: Promise<void> | null = null;
  private readonly loadedForKey = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      this.tick = window.setInterval(() => this.now.set(Date.now()), 1000);

      this.destroyRef.onDestroy(() => {
        if (this.tick) clearInterval(this.tick);
      });
    }

    effect(() => {
      const address = this.account.address();
      const chainId = this.account.chainId();
      const canUseDemo = this.account.canUseDemo();

      if (!address || !chainId || !canUseDemo) {
        this.resetState();
        return;
      }

      const key = this.getLoadKey(address, chainId);
      if (this.loadedForKey() === key) return;

      this.loadedForKey.set(key);
      void this.reload();
    });
  }

  private getLoadKey(address: string, chainId: number): string {
    return `${chainId}:${address.toLowerCase()}`;
  }

  private resetState(): void {
    this.poolsSignal.set([]);
    this.progressBidSignal.set(new Set());
    this.progressWithdrawSignal.set(new Set());
    this.loadedForKey.set(null);
    this.isPoolsLoading.set(false);
  }

  private setProgressBid(id: number, value: boolean): void {
    const next = new Set(this.progressBidSignal());
    value ? next.add(id) : next.delete(id);
    this.progressBidSignal.set(next);
  }

  private setProgressWithdraw(id: number, value: boolean): void {
    const next = new Set(this.progressWithdrawSignal());
    value ? next.add(id) : next.delete(id);
    this.progressWithdrawSignal.set(next);
  }

  async reload(): Promise<void> {
    if (this.inFlight) return this.inFlight;

    this.inFlight = this.loadPoolsInternal().finally(() => {
      this.inFlight = null;
    });

    return this.inFlight;
  }

  async loadPools(): Promise<void> {
    this.loadedForKey.set(null);
    await this.reload();
  }

  private async loadPoolsInternal(): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      this.poolsSignal.set([]);
      return;
    }

    const appChainId = asAppChainId(chainId);
    const auction = WALLET_TOOLS_CONFIG.contracts.AUCTION;

    this.isPoolsLoading.set(true);

    try {
      const lastPoolId = await readContract(wagmiConfig, {
        address: auction.address,
        abi: auction.abi,
        functionName: 'lastPoolId',
        args: [] as const,
        chainId: appChainId,
      });

      const total = Number(lastPoolId);
      if (!total) {
        this.poolsSignal.set([]);
        return;
      }

      const contracts = Array.from({ length: total }, (_, index) => ({
        address: auction.address,
        abi: auction.abi,
        functionName: 'pools',
        args: [BigInt(index + 1)] as const,
        chainId: appChainId,
      }));

      const results = await readContracts(wagmiConfig, {
        allowFailure: false,
        contracts,
      });

      const out: AuctionPoolUI[] = results.map((raw, index) =>
        this.createPool(index + 1, raw as IPoolResponse, address),
      );

      this.poolsSignal.set(out);
    } finally {
      this.isPoolsLoading.set(false);
    }
  }

  private createPool(id: number, data: IPoolResponse, currentAddress: string): AuctionPoolUI {
    const now = this.now();

    const startTime = Number(data.startTime) * 1000;
    let endTime = Number(data.endTime) * 1000;

    const delta = endTime - startTime;
    if (endTime <= startTime || delta > 14 * 24 * 3600 * 1000) endTime = startTime + 60 * 60 * 1000;

    const started = startTime <= now;
    const finished = endTime <= now;

    const highestAddress = String(data.highestBidder).toLowerCase();
    const isUserHighest = highestAddress === currentAddress.toLowerCase();
    const settled = Boolean(data.settled);

    const minBidWei = data.highestBidAST > 0n ? data.highestBidAST + 1n : data.minBid;

    const bidStatus: BidPoolStatus =
      highestAddress === DEFAULT_ADDRESS.toLowerCase() ? 'empty' : isUserHighest ? 'winner' : 'bid';

    const status: AuctionPoolStatus = !started
      ? 'upcoming'
      : !finished
        ? 'active'
        : !settled && isUserHighest
          ? 'withdraw'
          : 'ended';

    return {
      id,
      status,
      bidStatus,
      isUserHighest,

      amountAPT: formatUnits(data.amountAPT, 18),
      endTime,
      startTime,
      highestAddress,
      highestAST: formatUnits(data.highestBidAST, 18),
      settled,
      minBid: formatUnits(minBidWei, 18),
    };
  }

  async refreshOne(id: number): Promise<AuctionPoolUI | null> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId || id <= 0) return null;

    const appChainId = asAppChainId(chainId);
    const auction = WALLET_TOOLS_CONFIG.contracts.AUCTION;

    const raw = await readContract(wagmiConfig, {
      address: auction.address,
      abi: auction.abi,
      functionName: 'pools',
      args: [BigInt(id)] as const,
      chainId: appChainId,
    });

    const next = this.createPool(id, raw as IPoolResponse, address);

    this.poolsSignal.update((list) => {
      const idx = list.findIndex((p) => p.id === id);
      if (idx === -1) return [...list, next];
      const copy = list.slice();
      copy[idx] = next;
      return copy;
    });

    return next;
  }

  async bid(id: number, amountWei: bigint): Promise<void> {
    if (this.progressBid().has(id)) return;

    const chainId = this.account.chainId();
    if (!chainId) return;

    const appChainId = asAppChainId(chainId);
    const ast = WALLET_TOOLS_CONFIG.contracts.TOKEN_AST;
    const auction = WALLET_TOOLS_CONFIG.contracts.AUCTION;

    this.setProgressBid(id, true);

    try {
      await ensureErc20Allowance({
        chainId: appChainId,
        tokenAddress: ast.address,
        tokenAbi: ast.abi,
        spender: auction.address,
        amountWei,
      });

      const hash = await writeContract(wagmiConfig, {
        address: auction.address,
        abi: auction.abi,
        functionName: 'placeBid',
        args: [BigInt(id), amountWei] as const,
        chainId: appChainId,
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: appChainId,
      });

      await this.refreshOne(id);
    } finally {
      this.setProgressBid(id, false);
    }
  }

  async settle(id: number): Promise<void> {
    if (this.progressWithdraw().has(id)) return;

    const chainId = this.account.chainId();
    if (!chainId) return;

    const appChainId = asAppChainId(chainId);
    const auction = WALLET_TOOLS_CONFIG.contracts.AUCTION;

    this.setProgressWithdraw(id, true);

    try {
      const hash = await writeContract(wagmiConfig, {
        address: auction.address,
        abi: auction.abi,
        functionName: 'settle',
        args: [BigInt(id)] as const,
        chainId: appChainId,
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: appChainId,
      });

      await this.refreshOne(id);
    } finally {
      this.setProgressWithdraw(id, false);
    }
  }

  remaining(pool: AuctionPoolUI): string {
    const diffSec = Math.max(0, Math.floor((pool.endTime - this.now()) / 1000));
    return this.formatDuration(diffSec);
  }

  remainingStart(pool: AuctionPoolUI): string | undefined {
    const startMs = Number(pool.startTime ?? 0);
    if (!Number.isFinite(startMs) || startMs <= 0) return undefined;

    const diffSec = Math.floor((startMs - this.now()) / 1000);
    if (diffSec <= 0) return undefined;

    return this.formatDuration(diffSec);
  }

  private formatDuration(totalSec: number): string {
    const SEC_MIN = 60;
    const SEC_HOUR = 60 * SEC_MIN;
    const SEC_DAY = 24 * SEC_HOUR;
    const SEC_WEEK = 7 * SEC_DAY;

    if (totalSec < 0) totalSec = 0;

    if (totalSec >= SEC_WEEK) {
      const weeks = Math.floor(totalSec / SEC_WEEK);
      const rest = totalSec % SEC_WEEK;
      const days = Math.floor(rest / SEC_DAY);
      return `${weeks} week${weeks > 1 ? 's' : ''}${days > 0 ? ` ${days} day${days > 1 ? 's' : ''}` : ''}`;
    }

    if (totalSec >= SEC_DAY) {
      const days = Math.floor(totalSec / SEC_DAY);
      const rest = totalSec % SEC_DAY;
      const hours = Math.floor(rest / SEC_HOUR);
      return `${days}d ${hours}h`;
    }

    const h = Math.floor(totalSec / SEC_HOUR);
    const m = Math.floor((totalSec % SEC_HOUR) / SEC_MIN);
    const s = totalSec % SEC_MIN;
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    return h > 0 ? `${pad(h)}:${pad(m)} hours` : `${pad(m)}:${pad(s)} min`;
  }
}
