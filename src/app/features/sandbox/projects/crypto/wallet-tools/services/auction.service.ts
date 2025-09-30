import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'ethers';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { ContractsService } from './contracts.service';

import {
  AuctionPoolStatus,
  AuctionPoolUI,
  BidPoolStatus,
  IPoolResponse,
} from './types';

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

@Injectable()
export class AuctionService {
  private contracts = inject(ContractsService);
  private wallet = inject(WalletStore);
  private token = inject(Web3TokenService);

  private _pools = signal<AuctionPoolUI[]>([]);
  readonly pools = this._pools.asReadonly();

  readonly poolsActive = computed(() =>
    this._pools().filter((p) => p.status === 'active')
  );
  readonly poolsWithdraw = computed(() =>
    this._pools().filter((p) => p.status === 'withdraw')
  );
  readonly poolsEnded = computed(() =>
    this._pools().filter((p) => p.status === 'ended')
  );

  private bound = false;

  private _progressState = signal<Set<number>>(new Set());
  readonly progressState = computed(() => this._progressState());
  private _progressWithdraw = signal<Set<number>>(new Set());
  readonly progressWithdraw = computed(() => this._progressWithdraw());

  readonly isPoolsLoading = signal<boolean>(true);

  private tick?: number;
  readonly now = signal(Date.now());

  constructor() {
    this.tick = window.setInterval(() => this.now.set(Date.now()), 1000);

    effect(() => {
      const status = this.wallet.status();
      const account = this.wallet.account();

      if (status === 'connected' && account) {
        this.loadPools();
        this.bindEvents();
      } else {
        this._pools.set([]);
        this._progressState.set(new Set());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tick) clearInterval(this.tick);
  }

  async loadPools(): Promise<void> {
    this.isPoolsLoading.set(true);
    const contract = await this.contracts.auction();

    try {
      const count: bigint = await contract.lastPoolId();
      const n = Number(count);

      const out: AuctionPoolUI[] = [];

      for (let i = 1; i < n + 1; i++) {
        const p: IPoolResponse = await contract.pools(i);
        const pool = this.createPool(i, p);
        out.push(pool);
      }

      console.log(out);

      this._pools.set(out);
    } finally {
      this.isPoolsLoading.set(false);
    }
  }

  createPool(id: number, data: IPoolResponse): AuctionPoolUI {
    const address = this.wallet.account();
    const now = +Date.now();
    const endTime = Number(data.endTime) * 1000;
    const finished = endTime <= now;
    const highestAddress = data.highestBidder.toLowerCase();
    const isUserHighest =
      highestAddress.toLowerCase() === address?.toLowerCase();
    const settled = Boolean(data.settled);
    const minBid = formatUnits(
      data.highestBidAST > 0n ? data.highestBidAST + 1n : data.minBid,
      18
    );

    const bidStatus: BidPoolStatus =
      highestAddress === DEFAULT_ADDRESS
        ? 'empty'
        : isUserHighest
        ? 'winner'
        : 'bid';

    const status: AuctionPoolStatus = !finished
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
      highestAddress,
      highestAST: formatUnits(data.highestBidAST, 18),
      settled,
      minBid,
    };
  }

  private async bindEvents() {
    if (this.bound) return;
    this.bound = true;

    const auctionRead = await this.contracts.auctionRead();
    // const created = await auctionRead.queryFilter(
    //   auctionRead.filters.PoolCreated()
    // );
    // console.log('past', created);
    // for (const ev of created) {}

    // Pools events
    auctionRead.on(auctionRead.filters.PoolCreated(), async (ev: any) => {
      console.log('Contract Created', ev);

      const id = ev.args[0];
      const poolId = this._toPoolId(id);

      console.log('Contract Created Data', id);

      if (poolId !== null) await this.refreshOne(poolId);
    });

    auctionRead.on(auctionRead.filters.BidPlaced(), async (ev: any) => {
      console.log('Bid Placed', ev);

      const id = ev.args[0];
      const user = ev.args[1];
      const amount = ev.args[2];

      console.log('Bid Placed Data', id, user, amount);

      const poolId = this._toPoolId(id);
      if (poolId !== null) await this.refreshOne(poolId);
    });

    auctionRead.on(auctionRead.filters.Outbid(), (ev: any) => {
      console.log('Outbid', ev);

      const user = ev.args[0];
      const refund = ev.args[1];

      console.log('Outbid data', user, refund);

      const me = this.wallet.account()?.toLowerCase();
      if (me && String(user).toLowerCase() === me) {
        console.log('⚠️ Ваша ставка перебита. Refund:', refund.toString());
      }
    });

    auctionRead.on(auctionRead.filters.PoolSettled(), async (ev: any) => {
      console.log('Settled');

      const id = ev.args[0];
      const address = ev.args[1];
      const amount = ev.args[2];
      const poolId = this._toPoolId(id);

      console.log('Settled data', id, address, amount);
      if (poolId !== null) await this.refreshOne(poolId);
    });
  }

  async refreshOne(id: number): Promise<AuctionPoolUI | null> {
    if (!Number.isFinite(id) || id <= 0) return null;
    const c = await this.contracts.auction();
    const raw: IPoolResponse = await c.pools(BigInt(id));
    const next = this.createPool(id, raw);

    if (!next.isUserHighest && next.highestAddress !== DEFAULT_ADDRESS)
      console.log(
        `Your bid in pool ${next.id} are refund! Bid minimum AST to win this pool!`
      );

    this._pools.update((list) => {
      const idx = list.findIndex((p) => p.id === id);
      if (idx === -1) return [...list, next];
      const copy = list.slice();
      copy[idx] = next;
      return copy;
    });

    return next;
  }

  private _toPoolId(x: unknown): number | null {
    const finiteNumber = (n: number): number | null =>
      Number.isFinite(n) ? n : null;

    const hasToString = (v: unknown): v is { toString(): string } =>
      v != null && typeof (v as any).toString === 'function';

    if (typeof x === 'bigint' || typeof x === 'number')
      return finiteNumber(Number(x));

    if (hasToString(x)) return finiteNumber(Number(x.toString()));

    return null;
  }

  private setProgressState(idx: number, value: boolean): void {
    const progress = new Set(this._progressState());
    value ? progress.add(idx) : progress.delete(idx);
    this._progressState.set(progress);
  }

  private setProgressWithdraw(idx: number, value: boolean): void {
    const progress = new Set(this._progressWithdraw());
    value ? progress.add(idx) : progress.delete(idx);
    this._progressWithdraw.set(progress);
  }

  async bid(id: number, amountWei: bigint) {
    if (this.progressState().has(id)) return;
    this.setProgressState(id, true);

    try {
      const contract = await this.contracts.auction();
      const ast = this.contracts.getAddress('AST');
      const auction = this.contracts.getAddress('AUCTION');
      await this.token.ensureAllowance(ast, auction, amountWei);

      const tx = await contract.placeBid(id, amountWei);
      await tx.wait?.();
    } finally {
      this.setProgressState(id, false);
    }

    await this.refreshOne(id);
    this.setProgressState(id, false);
  }

  async settle(id: number) {
    if (this.progressWithdraw().has(id)) return;
    this.setProgressWithdraw(id, true);

    try {
      const contract = await this.contracts.auction();
      const tx = await contract.settle(id);
      await tx.wait?.();
    } finally {
      this.setProgressWithdraw(id, false);
    }

    await this.refreshOne(id);
    this.setProgressWithdraw(id, false);
  }
}
