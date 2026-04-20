// src/features/dex-tools/services/liquidity/liquidity.service.ts

import { Injectable, inject, signal } from '@angular/core';
import { formatUnits, parseUnits } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId, ensureErc20Allowance } from '@lib/web3';
import { AccountFacade } from '@entities';
import { DEX_TOOLS_CONFIG } from '../../dex-tools.config';
import type {
  DexPairKey,
  DexPairView,
  DexTokenKey,
  PairQuickInfo,
  PairReservesState,
} from './liquidity.types';

export const PAIR_TOKENS: Record<DexPairKey, [DexTokenKey, DexTokenKey]> = {
  PAIR_AST_APT: ['AST', 'APT'],
  PAIR_AST_WETH: ['AST', 'WETH'],
};

@Injectable()
export class LiquidityService {
  private readonly account = inject(AccountFacade);

  readonly pairs: DexPairView[] = [
    { key: 'PAIR_AST_APT', label: 'AST / APT', tokens: ['AST', 'APT'] },
    { key: 'PAIR_AST_WETH', label: 'AST / WETH', tokens: ['AST', 'WETH'] },
  ];

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly ttlMs = 120_000;
  private readonly cache = new Map<DexPairKey, PairReservesState>();
  private readonly inflight = new Map<DexPairKey, Promise<PairReservesState>>();

  private getPairDescriptor(pairKey: DexPairKey) {
    return DEX_TOOLS_CONFIG.contracts[pairKey];
  }

  private getTokenDescriptor(token: DexTokenKey) {
    switch (token) {
      case 'AST':
        return DEX_TOOLS_CONFIG.contracts.TOKEN_AST;
      case 'APT':
        return DEX_TOOLS_CONFIG.contracts.TOKEN_APT;
      case 'WETH':
        return DEX_TOOLS_CONFIG.contracts.WETH;
    }
  }

  private async getCurrentChainId(): Promise<ReturnType<typeof asAppChainId>> {
    const chainId = this.account.chainId();
    if (!chainId) throw new Error('Wallet chain is not available');
    return asAppChainId(chainId);
  }

  async getReserves(pairKey: DexPairKey): Promise<PairReservesState> {
    const cached = this.cache.get(pairKey);
    if (cached && Date.now() - cached.ts < this.ttlMs) {
      return cached;
    }

    const pending = this.inflight.get(pairKey);
    if (pending) {
      return pending;
    }

    const request = (async () => {
      const chainId = await this.getCurrentChainId();
      const pair = this.getPairDescriptor(pairKey);

      try {
        this.isLoading.set(true);
        this.error.set(null);

        const [token0, token1, reserves] = await Promise.all([
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'token0',
            args: [] as const,
            chainId,
          }),
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'token1',
            args: [] as const,
            chainId,
          }),
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'getReserves',
            args: [] as const,
            chainId,
          }),
        ]);

        const [r0, r1] = reserves as [bigint, bigint, bigint];

        const state: PairReservesState = {
          t0: token0 as `0x${string}`,
          t1: token1 as `0x${string}`,
          r0,
          r1,
          ts: Date.now(),
        };

        this.cache.set(pairKey, state);
        return state;
      } catch (error) {
        this.error.set(error instanceof Error ? error.message : 'Failed to load pair reserves');
        throw error;
      } finally {
        this.isLoading.set(false);
        this.inflight.delete(pairKey);
      }
    })();

    this.inflight.set(pairKey, request);
    return request;
  }

  async quickInfo(pairKey: DexPairKey): Promise<PairQuickInfo> {
    const chainId = await this.getCurrentChainId();
    const pair = this.getPairDescriptor(pairKey);
    const account = this.account.address();

    const [{ t0, t1, r0, r1 }, totalSupply, myLp] = await Promise.all([
      this.getReserves(pairKey),
      readContract(wagmiConfig, {
        address: pair.address,
        abi: pair.abi,
        functionName: 'totalSupply',
        args: [] as const,
        chainId,
      }),
      account
        ? readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'balanceOf',
            args: [account] as const,
            chainId,
          })
        : Promise.resolve(0n),
    ]);

    const ts = totalSupply as bigint;
    const me = myLp as bigint;

    const share = ts > 0n ? Number(me) / Number(ts) : 0;
    const underlying0 = Math.trunc(Number(formatUnits(r0, 18)) * share * 1_000_000) / 1_000_000;
    const underlying1 = Math.trunc(Number(formatUnits(r1, 18)) * share * 1_000_000) / 1_000_000;

    return {
      token0: t0,
      token1: t1,
      reserve0: formatUnits(r0, 18),
      reserve1: formatUnits(r1, 18),
      totalSupply: formatUnits(ts, 18),
      myLp: formatUnits(me, 18),
      mySharePct: Math.round(share * 10000) / 100,
      myUnderlying0: underlying0.toString(),
      myUnderlying1: underlying1.toString(),
    };
  }

  async quoteAddByRatio(
    pairKey: DexPairKey,
    tokenA: DexTokenKey,
    amountAHuman: string,
  ): Promise<{ amountAWei: bigint; amountBWei: bigint; amountBHuman: string }> {
    const { t0, r0, r1 } = await this.getReserves(pairKey);

    const tokenAAddress = this.getTokenDescriptor(tokenA).address.toLowerCase();
    const isA0 = tokenAAddress === t0.toLowerCase();

    const reserveA = isA0 ? r0 : r1;
    const reserveB = isA0 ? r1 : r0;

    let amountAWei = 0n;
    try {
      amountAWei = parseUnits(amountAHuman || '0', 18);
    } catch {
      amountAWei = 0n;
    }

    if (amountAWei <= 0n) {
      return { amountAWei, amountBWei: 0n, amountBHuman: '0' };
    }

    const amountBWei = reserveA > 0n ? (amountAWei * reserveB) / reserveA : 0n;

    return {
      amountAWei,
      amountBWei,
      amountBHuman: formatUnits(amountBWei, 18),
    };
  }

  async addLiquidity(
    pairKey: DexPairKey,
    tokenA: DexTokenKey,
    tokenB: DexTokenKey,
    amountAWei: bigint,
    amountBWei: bigint,
  ): Promise<void> {
    const address = this.account.address();
    const chainId = await this.getCurrentChainId();

    if (!address) {
      throw new Error('Wallet not connected');
    }

    const tokenADescriptor = this.getTokenDescriptor(tokenA);
    const tokenBDescriptor = this.getTokenDescriptor(tokenB);
    const router = DEX_TOOLS_CONFIG.contracts.ROUTER;

    await Promise.all([
      ensureErc20Allowance({
        chainId,
        tokenAddress: tokenADescriptor.address,
        spender: router.address,
        amountWei: amountAWei,
      }),
      ensureErc20Allowance({
        chainId,
        tokenAddress: tokenBDescriptor.address,
        spender: router.address,
        amountWei: amountBWei,
      }),
    ]);

    const hash = await writeContract(wagmiConfig, {
      address: router.address,
      abi: router.abi,
      functionName: 'addLiquidity',
      args: [tokenADescriptor.address, tokenBDescriptor.address, amountAWei, amountBWei] as const,
      chainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId,
    });

    this.cache.delete(pairKey);
    await this.getReserves(pairKey);
  }

  async removeLiquidity(pairKey: DexPairKey, lpAmountWei: bigint): Promise<void> {
    const address = this.account.address();
    const chainId = await this.getCurrentChainId();

    if (!address) {
      throw new Error('Wallet not connected');
    }

    const pair = this.getPairDescriptor(pairKey);
    const router = DEX_TOOLS_CONFIG.contracts.ROUTER;

    await ensureErc20Allowance({
      chainId,
      tokenAddress: pair.address,
      spender: router.address,
      amountWei: lpAmountWei,
    });

    const { t0, t1 } = await this.getReserves(pairKey);

    const hash = await writeContract(wagmiConfig, {
      address: router.address,
      abi: router.abi,
      functionName: 'removeLiquidity',
      args: [t0, t1, lpAmountWei] as const,
      chainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId,
    });

    this.cache.delete(pairKey);
    await this.getReserves(pairKey);
  }
}
