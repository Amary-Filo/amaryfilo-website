// src/entities/crypto-balance/model/crypto-balance.types.ts

import type { Address } from 'viem';
import type { DemoContractDescriptor } from '@lib/web3/contracts/contract.types';

export interface CryptoBalanceItem {
  key: string;
  label: string;
  symbol: string;
  decimals: number;
  address: Address;
  human: string;
  wei: bigint;
  isNative: boolean;
}

export interface CryptoBalanceState {
  isLoading: boolean;
  items: CryptoBalanceItem[];
  error: string | null;
}

export interface CryptoBalanceLoadParams {
  account: Address;
  chainId: number;
  nativeToken: DemoContractDescriptor;
  tokens: DemoContractDescriptor[];
}
