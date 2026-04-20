// src/features/dex-tools/services/liquidity/liquidity.types.ts

export type DexPairKey = 'PAIR_AST_APT' | 'PAIR_AST_WETH';
export type DexTokenKey = 'AST' | 'APT' | 'WETH';

export type DexPairView = {
  key: DexPairKey;
  label: string;
  tokens: [DexTokenKey, DexTokenKey];
};

export type PairReservesState = {
  t0: `0x${string}`;
  t1: `0x${string}`;
  r0: bigint;
  r1: bigint;
  ts: number;
};

export interface PairQuickInfo {
  token0: `0x${string}`;
  token1: `0x${string}`;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
  myLp: string;
  mySharePct: number;
  myUnderlying0: string;
  myUnderlying1: string;
}
