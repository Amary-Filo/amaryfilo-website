// src/shared/lib/web3/contracts/contract.types.ts

import type { Abi, Address } from 'viem';

export type DemoContractKind = 'token' | 'contract';

export interface DemoTokenMeta {
  symbol: string;
  name: string;
  decimals: number;
  isNative?: boolean;
  icon?: string;
}

export interface DemoContractDescriptor<TKey extends string = string> {
  key: TKey;
  label: string;
  address: Address;
  abi: Abi;
  kind: DemoContractKind;
  tokenMeta?: DemoTokenMeta;
}
