// src/features/dex-tools/services/swap/swap.types.ts

import type { Address } from 'viem';

export type DexTokenKey = 'AST' | 'APT' | 'WETH';
export type DexPairKey = 'PAIR_AST_APT' | 'PAIR_AST_WETH';

export interface QuoteResult {
  amountInWei: bigint;
  amountOutWei: bigint;
  minOutWei: bigint;
  amountOutHuman: string;
  minOutHuman: string;
  priceImpactPct: number;
  feeWei: bigint;
  feeHuman: string;
}

export interface ReservesState {
  t0: Address;
  t1: Address;
  r0: bigint;
  r1: bigint;
  ts: number;
}
