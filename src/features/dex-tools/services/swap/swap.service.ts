// src/features/dex-tools/services/swap/swap.service.ts

import { Injectable, signal, inject } from '@angular/core';
import { formatUnits, parseUnits } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';
import { AccountFacade } from '@entities';
import { ensureErc20Allowance } from '@lib/web3';
import { DEX_TOOLS_CONFIG } from '../../dex-tools.config';
import type { DexPairKey, DexTokenKey, QuoteResult, ReservesState } from './swap.types';

@Injectable()
export class SwapService {
  private readonly account = inject(AccountFacade);

  readonly tokens: DexTokenKey[] = ['AST', 'APT', 'WETH'];

  private readonly allowed: Record<DexTokenKey, DexTokenKey[]> = {
    AST: ['APT', 'WETH'],
    APT: ['AST'],
    WETH: ['AST'],
  };

  readonly isLoadingReserves = signal(false);
  readonly reservesError = signal<string | null>(null);

  private readonly ttlMs = 120_000;
  private readonly cache = new Map<DexPairKey, ReservesState>();
  private readonly inflight = new Map<DexPairKey, Promise<ReservesState>>();

  isDirectionAllowed(tokenIn: DexTokenKey, tokenOut: DexTokenKey): boolean {
    return this.allowed[tokenIn]?.includes(tokenOut) ?? false;
  }

  isFresh(pairKey: DexPairKey): boolean {
    const cached = this.cache.get(pairKey);
    return !!cached && Date.now() - cached.ts < this.ttlMs;
  }

  getPairKey(tokenIn: DexTokenKey, tokenOut: DexTokenKey): DexPairKey {
    const isAstApt =
      (tokenIn === 'AST' && tokenOut === 'APT') || (tokenIn === 'APT' && tokenOut === 'AST');

    const isAstWeth =
      (tokenIn === 'AST' && tokenOut === 'WETH') || (tokenIn === 'WETH' && tokenOut === 'AST');

    if (isAstApt) return 'PAIR_AST_APT';
    if (isAstWeth) return 'PAIR_AST_WETH';

    throw new Error('Pair not supported');
  }

  private getTokenAddress(token: DexTokenKey) {
    switch (token) {
      case 'AST':
        return DEX_TOOLS_CONFIG.contracts.TOKEN_AST.address;
      case 'APT':
        return DEX_TOOLS_CONFIG.contracts.TOKEN_APT.address;
      case 'WETH':
        return DEX_TOOLS_CONFIG.contracts.WETH.address;
    }
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

  private async getReserves(pairKey: DexPairKey): Promise<ReservesState> {
    const now = Date.now();
    const cached = this.cache.get(pairKey);

    if (cached && now - cached.ts < this.ttlMs) {
      return cached;
    }

    const currentInflight = this.inflight.get(pairKey);
    if (currentInflight) return currentInflight;

    const request = (async () => {
      const chainId = this.account.chainId();
      if (!chainId) throw new Error('Wallet chain is not available');

      const appChainId = asAppChainId(chainId);
      const pair = DEX_TOOLS_CONFIG.contracts[pairKey];

      try {
        this.isLoadingReserves.set(true);
        this.reservesError.set(null);

        const [token0, token1, reserves] = await Promise.all([
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'token0',
            args: [] as const,
            chainId: appChainId,
          }),
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'token1',
            args: [] as const,
            chainId: appChainId,
          }),
          readContract(wagmiConfig, {
            address: pair.address,
            abi: pair.abi,
            functionName: 'getReserves',
            args: [] as const,
            chainId: appChainId,
          }),
        ]);

        const [r0, r1] = reserves as [bigint, bigint, bigint];

        const state: ReservesState = {
          t0: token0 as `0x${string}`,
          t1: token1 as `0x${string}`,
          r0,
          r1,
          ts: Date.now(),
        };

        this.cache.set(pairKey, state);
        return state;
      } catch (error) {
        this.reservesError.set(error instanceof Error ? error.message : 'Failed to load reserves');
        throw error;
      } finally {
        this.isLoadingReserves.set(false);
        this.inflight.delete(pairKey);
      }
    })();

    this.inflight.set(pairKey, request);
    return request;
  }

  private getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint): bigint {
    if (amountIn <= 0n || reserveIn <= 0n || reserveOut <= 0n) return 0n;

    const amountInWithFee = amountIn * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;

    return denominator === 0n ? 0n : numerator / denominator;
  }

  async quoteExactIn(
    tokenIn: DexTokenKey,
    tokenOut: DexTokenKey,
    amountInHuman: string,
    slippagePct: number,
  ): Promise<QuoteResult> {
    if (!this.isDirectionAllowed(tokenIn, tokenOut)) {
      throw new Error('Direction not allowed');
    }

    const pairKey = this.getPairKey(tokenIn, tokenOut);
    const { t0, r0, r1 } = await this.getReserves(pairKey);

    const tokenInAddress = this.getTokenAddress(tokenIn);
    const reserveIn = tokenInAddress.toLowerCase() === t0.toLowerCase() ? r0 : r1;
    const reserveOut = tokenInAddress.toLowerCase() === t0.toLowerCase() ? r1 : r0;

    const amountInWei = parseUnits(amountInHuman, 18);
    if (amountInWei <= 0n) throw new Error('Enter amount');

    const amountOutWei = this.getAmountOut(amountInWei, reserveIn, reserveOut);
    const bps = Math.round(slippagePct * 100);
    const minOutWei = amountOutWei - (amountOutWei * BigInt(bps)) / 10_000n;
    const safeMinOutWei = minOutWei < 0n ? 0n : minOutWei;

    const feeWei = (amountInWei * 3n) / 1000n;

    const reserveInHuman = Number(formatUnits(reserveIn, 18));
    const reserveOutHuman = Number(formatUnits(reserveOut, 18));
    const amountInHumanNum = Number(formatUnits(amountInWei, 18));
    const amountOutHumanNum = Number(formatUnits(amountOutWei, 18));

    const mid = reserveInHuman > 0 ? reserveOutHuman / reserveInHuman : 0;
    const execution = amountInHumanNum > 0 ? amountOutHumanNum / amountInHumanNum : 0;
    const priceImpactPct = mid > 0 ? Math.max(0, (1 - execution / mid) * 100) : 0;

    return {
      amountInWei,
      amountOutWei,
      minOutWei: safeMinOutWei,
      amountOutHuman: formatUnits(amountOutWei, 18),
      minOutHuman: formatUnits(safeMinOutWei, 18),
      priceImpactPct,
      feeWei,
      feeHuman: formatUnits(feeWei, 18),
    };
  }

  async swapExactIn(
    tokenIn: DexTokenKey,
    tokenOut: DexTokenKey,
    amountInHuman: string,
    minOutWei: bigint,
    deadlineSec: number,
  ): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      throw new Error('Wallet not connected');
    }

    const appChainId = asAppChainId(chainId);

    const tokenInDescriptor = this.getTokenDescriptor(tokenIn);
    const router = DEX_TOOLS_CONFIG.contracts.ROUTER;
    const amountInWei = parseUnits(amountInHuman, 18);

    await ensureErc20Allowance({
      chainId: appChainId,
      tokenAddress: tokenInDescriptor.address,
      spender: router.address,
      amountWei: amountInWei,
    });

    const hash = await writeContract(wagmiConfig, {
      address: router.address,
      abi: router.abi,
      functionName: 'swapExactTokensForTokens',
      args: [
        this.getTokenAddress(tokenIn),
        this.getTokenAddress(tokenOut),
        amountInWei,
        minOutWei,
        address,
        BigInt(deadlineSec),
      ] as const,
      chainId: appChainId,
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      chainId: appChainId,
    });

    const pairKey = this.getPairKey(tokenIn, tokenOut);
    this.cache.delete(pairKey);
  }
}
