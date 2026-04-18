// src/features/wallet-tools/services/staking/staking.service.ts

import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'viem';
import { readContract, readContracts, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';
import { AccountFacade } from '@entities';
import { WALLET_TOOLS_CONFIG } from '../../wallet-tools.config';
import { STAKING_TERMS, TERM_BY_SEC, plannedReward } from './staking.constants';
import { StakeViewUI, TermsSec } from './staking.types';
import { ensureErc20Allowance } from './staking.utils';

@Injectable()
export class StakingService {
  private readonly TOKEN_DECIMALS = 18;

  private readonly account = inject(AccountFacade);
  private readonly destroyRef = inject(DestroyRef);

  readonly now = signal(Date.now());
  readonly isListLoading = signal(false);

  private readonly withdrawingSignal = signal<Set<number>>(new Set());
  readonly withdrawing = this.withdrawingSignal.asReadonly();

  private readonly listSignal = signal<StakeViewUI[]>([]);
  readonly list = this.listSignal.asReadonly();

  readonly listReady = computed(() =>
    this.list().filter((item) => !item.withdrawn && item.unlockAt * 1000 <= this.now()),
  );

  readonly listPending = computed(() =>
    this.list().filter((item) => !item.withdrawn && item.unlockAt * 1000 > this.now()),
  );

  private tick?: number;
  private inFlight: Promise<void> | null = null;
  private readonly loadedForKey = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      this.tick = window.setInterval(() => this.now.set(Date.now()), 1000);

      this.destroyRef.onDestroy(() => {
        if (this.tick) {
          clearInterval(this.tick);
        }
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
    this.listSignal.set([]);
    this.withdrawingSignal.set(new Set());
    this.loadedForKey.set(null);
    this.isListLoading.set(false);
  }

  private setWithdrawing(idx: number, value: boolean): void {
    const next = new Set(this.withdrawingSignal());
    value ? next.add(idx) : next.delete(idx);
    this.withdrawingSignal.set(next);
  }

  async reload(): Promise<void> {
    if (this.inFlight) return this.inFlight;

    this.inFlight = this.loadListInternal().finally(() => {
      this.inFlight = null;
    });

    return this.inFlight;
  }

  async loadList(): Promise<void> {
    this.loadedForKey.set(null);
    await this.reload();
  }

  private async loadListInternal(): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      this.listSignal.set([]);
      return;
    }

    const appChainId = asAppChainId(chainId);
    const staking = WALLET_TOOLS_CONFIG.contracts.STAKING;

    this.isListLoading.set(true);

    try {
      const count = await readContract(wagmiConfig, {
        address: staking.address,
        abi: staking.abi,
        functionName: 'stakesCount',
        args: [address] as const,
        chainId: appChainId,
      });

      const total = Number(count);
      if (!total) {
        this.listSignal.set([]);
        return;
      }

      const nowSec = Math.floor(Date.now() / 1000);

      const contracts = Array.from({ length: total }).flatMap((_, index) => [
        {
          address: staking.address,
          abi: staking.abi,
          functionName: 'getStake',
          args: [address, BigInt(index)] as const,
          chainId: appChainId,
        },
        {
          address: staking.address,
          abi: staking.abi,
          functionName: 'pendingReward',
          args: [address, BigInt(index)] as const,
          chainId: appChainId,
        },
      ]);

      const results = await readContracts(wagmiConfig, {
        allowFailure: false,
        contracts,
      });

      const out: StakeViewUI[] = [];

      for (let i = 0; i < total; i++) {
        const stakeData = results[i * 2] as {
          amount: bigint;
          unlockAt: bigint;
          termSec: bigint;
          aprBps: bigint;
          withdrawn: boolean;
        };

        const pendingReward = results[i * 2 + 1] as bigint;

        const amount = stakeData.amount;
        const unlockAt = Number(stakeData.unlockAt);
        const termSec = Number(stakeData.termSec);
        const aprBps = Number(stakeData.aprBps);
        const withdrawn = Boolean(stakeData.withdrawn);

        const rewardPlan = plannedReward(amount, aprBps, termSec);
        const totalPlan = amount + rewardPlan;

        const startSec = unlockAt - termSec;
        const elapsedSec = Math.max(0, Math.min(nowSec, unlockAt) - startSec);
        const progress = termSec > 0 ? Math.min(1, elapsedSec / termSec) : 0;
        const remainingSec = Math.max(0, unlockAt - nowSec);

        const termKey = TERM_BY_SEC[termSec];
        const termLabel = termKey ? STAKING_TERMS[termKey].title : `${Math.round(termSec / 60)}m`;

        out.push({
          idx: i,
          amount,
          unlockAt,
          termSec,
          aprBps,
          withdrawn,
          pendingReward,

          dateStart: startSec * 1000,
          amountHuman: formatUnits(amount, this.TOKEN_DECIMALS),
          percentHuman: `${(aprBps / 100).toFixed(2)}% APR`,
          rewardPlanned: rewardPlan,
          rewardPlannedHuman: formatUnits(rewardPlan, this.TOKEN_DECIMALS),
          totalPlanned: totalPlan,
          totalPlannedHuman: formatUnits(totalPlan, this.TOKEN_DECIMALS),
          pendingRewardHuman: formatUnits(pendingReward, this.TOKEN_DECIMALS),

          progress,
          remainingSec,
          eta: unlockAt * 1000,

          termKey: termKey ?? 'M60',
          termLabel,
        });
      }

      this.listSignal.set(out);
    } finally {
      this.isListLoading.set(false);
    }
  }

  async withdraw(idx: number): Promise<void> {
    if (this.withdrawingSignal().has(idx)) return;

    const chainId = this.account.chainId();
    if (!chainId) return;

    const appChainId = asAppChainId(chainId);
    const staking = WALLET_TOOLS_CONFIG.contracts.STAKING;

    this.setWithdrawing(idx, true);

    try {
      const hash = await writeContract(wagmiConfig, {
        address: staking.address,
        abi: staking.abi,
        functionName: 'withdraw',
        args: [BigInt(idx)] as const,
        chainId: appChainId,
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: appChainId,
      });

      this.loadedForKey.set(null);
      await this.reload();
    } finally {
      this.setWithdrawing(idx, false);
    }
  }

  async stake(amountWei: bigint, termKey: TermsSec): Promise<void> {
    const chainId = this.account.chainId();
    if (!chainId) return;

    const appChainId = asAppChainId(chainId);

    const ast = WALLET_TOOLS_CONFIG.contracts.TOKEN_AST;
    const staking = WALLET_TOOLS_CONFIG.contracts.STAKING;

    await ensureErc20Allowance({
      chainId: appChainId,
      tokenAddress: ast.address,
      tokenAbi: ast.abi,
      spender: staking.address,
      amountWei,
    });

    const termSec = STAKING_TERMS[termKey].time * 60;

    const hash = await writeContract(wagmiConfig, {
      address: staking.address,
      abi: staking.abi,
      functionName: 'stake',
      args: [amountWei, BigInt(termSec)] as const,
      chainId: appChainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId: appChainId,
    });

    this.loadedForKey.set(null);
    await this.reload();
  }
}
