// src/entities/crypto-balance/model/crypto-balance.utils.ts

import { formatUnits } from 'viem';
import type { DemoContractDescriptor } from '@lib/web3/contracts/contract.types';
import type { CryptoBalanceItem } from './crypto-balance.types';

export function toBalanceItem(params: {
  descriptor: DemoContractDescriptor;
  wei: bigint;
}): CryptoBalanceItem {
  const { descriptor, wei } = params;
  const decimals = descriptor.tokenMeta?.decimals ?? 18;

  return {
    key: descriptor.key,
    label: descriptor.label,
    symbol: descriptor.tokenMeta?.symbol ?? descriptor.label,
    decimals,
    address: descriptor.address,
    human: formatUnits(wei, decimals),
    wei,
    isNative: !!descriptor.tokenMeta?.isNative,
  };
}
