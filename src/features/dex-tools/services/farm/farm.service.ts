// src/features/dex-tools/services/farm/farm.service.ts

import { DestroyRef, Injectable, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId, ensureErc20Allowance } from '@lib/web3';
import { AccountFacade, CryptoBalanceFacade } from '@entities';
import { DEX_TOOLS_CONFIG } from '../../dex-tools.config';

export interface FarmSummaryView {
  rpsHuman: string;
  pendingHuman: string;
  stakedLpHuman: string;
}

@Injectable()
export class FarmService {
  private readonly account = inject(AccountFacade);
  private readonly balances = inject(CryptoBalanceFacade);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly summary = signal<FarmSummaryView | null>(null);

  private inFlight: Promise<void> | null = null;
  private readonly loadedForKey = signal<string | null>(null);
  private tick?: number;

  constructor() {
    if (typeof window !== 'undefined') {
      this.tick = window.setInterval(() => {
        if (this.account.canUseDemo()) {
          void this.refresh();
        }
      }, 30_000);

      this.destroyRef.onDestroy(() => {
        if (this.tick) clearInterval(this.tick);
      });
    }

    effect(() => {
      const address = this.account.address();
      const chainId = this.account.chainId();
      const canUseDemo = this.account.canUseDemo();

      if (!address || !chainId || !canUseDemo) {
        this.summary.set(null);
        this.error.set(null);
        this.loading.set(false);
        this.loadedForKey.set(null);
        return;
      }

      const key = `${chainId}:${address.toLowerCase()}`;
      if (this.loadedForKey() === key) return;

      this.loadedForKey.set(key);
      void this.refresh();
    });
  }

  async refresh(): Promise<void> {
    if (this.inFlight) return this.inFlight;

    this.inFlight = this.loadSummaryInternal().finally(() => {
      this.inFlight = null;
    });

    return this.inFlight;
  }

  private async loadSummaryInternal(): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      this.summary.set(null);
      return;
    }

    const appChainId = asAppChainId(chainId);
    const farm = DEX_TOOLS_CONFIG.contracts.FARM;

    if (!this.summary()) {
      this.loading.set(true);
    }

    this.error.set(null);

    try {
      const [rewardPerSecondRaw, pendingRaw, userRaw] = await Promise.all([
        readContract(wagmiConfig, {
          address: farm.address,
          abi: farm.abi,
          functionName: 'rewardPerSecond',
          args: [] as const,
          chainId: appChainId,
        }),
        readContract(wagmiConfig, {
          address: farm.address,
          abi: farm.abi,
          functionName: 'pendingRewards',
          args: [address] as const,
          chainId: appChainId,
        }),
        readContract(wagmiConfig, {
          address: farm.address,
          abi: farm.abi,
          functionName: 'users',
          args: [address] as const,
          chainId: appChainId,
        }),
      ]);

      const rewardPerSecond = this.asBigint(rewardPerSecondRaw);
      const pending = this.asBigint(pendingRaw);
      const stakedAmount = this.extractUserAmount(userRaw);

      this.summary.set({
        rpsHuman: formatUnits(rewardPerSecond, 18),
        pendingHuman: formatUnits(pending, 18),
        stakedLpHuman: formatUnits(stakedAmount, 18),
      });
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Farm refresh failed');
      this.summary.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async deposit(amountWei: bigint): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      throw new Error('Wallet not connected');
    }

    const appChainId = asAppChainId(chainId);
    const farm = DEX_TOOLS_CONFIG.contracts.FARM;
    const lpToken = DEX_TOOLS_CONFIG.contracts.PAIR_AST_APT;

    await ensureErc20Allowance({
      chainId: appChainId,
      tokenAddress: lpToken.address,
      spender: farm.address,
      amountWei,
    });

    const hash = await writeContract(wagmiConfig, {
      address: farm.address,
      abi: farm.abi,
      functionName: 'deposit',
      args: [amountWei] as const,
      chainId: appChainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId: appChainId,
    });

    await this.refreshAfterWrite();
  }

  async withdraw(amountWei: bigint): Promise<void> {
    const chainId = this.account.chainId();
    if (!chainId) {
      throw new Error('Wallet not connected');
    }

    const appChainId = asAppChainId(chainId);
    const farm = DEX_TOOLS_CONFIG.contracts.FARM;

    const hash = await writeContract(wagmiConfig, {
      address: farm.address,
      abi: farm.abi,
      functionName: 'withdraw',
      args: [amountWei] as const,
      chainId: appChainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId: appChainId,
    });

    await this.refreshAfterWrite();
  }

  async harvest(): Promise<void> {
    const chainId = this.account.chainId();
    if (!chainId) {
      throw new Error('Wallet not connected');
    }

    const appChainId = asAppChainId(chainId);
    const farm = DEX_TOOLS_CONFIG.contracts.FARM;

    const hash = await writeContract(wagmiConfig, {
      address: farm.address,
      abi: farm.abi,
      functionName: 'harvest',
      args: [] as const,
      chainId: appChainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId: appChainId,
    });

    await this.refreshAfterWrite();
  }

  private async refreshAfterWrite(): Promise<void> {
    this.loadedForKey.set(null);
    await this.refresh();

    const address = this.account.address();
    const chainId = this.account.chainId();
    if (!address || !chainId) return;

    await this.balances.load({
      requiredChainId: DEX_TOOLS_CONFIG.requiredChain.id,
      nativeTokenLabel: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.name,
      nativeTokenSymbol: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.symbol,
      nativeTokenDecimals: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.decimals,
      tokens: Object.values(DEX_TOOLS_CONFIG.contracts).filter(
        (item) =>
          item.kind === 'token' || item.key === 'PAIR_AST_APT' || item.key === 'PAIR_AST_WETH',
      ),
    });
  }

  private asBigint(value: unknown): bigint {
    if (typeof value === 'bigint') return value;
    return 0n;
  }

  private extractUserAmount(value: unknown): bigint {
    if (!value) return 0n;

    if (typeof value === 'object' && value !== null && 'amount' in value) {
      const amount = (value as { amount?: unknown }).amount;
      return typeof amount === 'bigint' ? amount : 0n;
    }

    if (Array.isArray(value)) {
      const first = value[0];
      return typeof first === 'bigint' ? first : 0n;
    }

    return 0n;
  }
}
