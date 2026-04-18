// src/features/wallet-tools/contracts/index.ts

import type { Abi, Address } from 'viem';
import { AST_ABI } from './ast.abi';
import { APT_ABI } from './apt.abi';
import { STAKING_ABI } from './staking.abi';
import { AUCTION_ABI } from './auction.abi';
import { MARKET_ABI } from './marketplace.abi';

export type WalletToolsContractKey = 'TOKEN_AST' | 'TOKEN_APT' | 'STAKING' | 'AUCTION' | 'MARKET';

export interface DemoContractDescriptor {
  key: WalletToolsContractKey;
  address: Address;
  abi: Abi;
  kind: 'token' | 'contract';
  label: string;
  decimals?: number;
  symbol?: string;
}

export const WALLET_TOOLS_CONTRACTS: Record<WalletToolsContractKey, DemoContractDescriptor> = {
  TOKEN_AST: {
    key: 'TOKEN_AST',
    label: 'AST Token',
    address: '0x2CC8Cad10fEFA524c36676390a3c52A497e3be49',
    abi: AST_ABI,
    kind: 'token',
    symbol: 'AST',
    decimals: 18,
  },
  TOKEN_APT: {
    key: 'TOKEN_APT',
    label: 'APT Token',
    address: '0xC1A7E51E1a2afCb23b1bCb4065Dbc280c8ca1523',
    abi: APT_ABI,
    kind: 'token',
    symbol: 'APT',
    decimals: 18,
  },
  STAKING: {
    key: 'STAKING',
    label: 'Staking Contract',
    address: '0xE25dc68Ea8824a0f85F4ee7F2A3f2AB8a2B9E556',
    abi: STAKING_ABI,
    kind: 'contract',
  },
  AUCTION: {
    key: 'AUCTION',
    label: 'Auction Contract',
    address: '0xe5bF597Bb2ABDdD5288b559727973B8DF7596DE8',
    abi: AUCTION_ABI,
    kind: 'contract',
  },
  MARKET: {
    key: 'MARKET',
    label: 'Market Contract',
    address: '0x48B15F9BF85Df30747A45C02146C9AaEe4a00A43',
    abi: MARKET_ABI,
    kind: 'contract',
  },
};
