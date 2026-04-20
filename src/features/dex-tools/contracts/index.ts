// src/features/dex-tools/contracts/index.ts

import { erc20Abi, type Abi, type Address } from 'viem';
import { AST_ABI } from './ast.abi';
import { APT_ABI } from './apt.abi';
import { PAIR_ABI } from './pair.abi';
import { FACTORY_ABI } from './factory.abi';
import { FARM_ABI } from './farm.abi';
import { ROUTER_ABI } from './router.abi';

export type DexToolsContractKey =
  | 'TOKEN_AST'
  | 'TOKEN_APT'
  | 'WETH'
  | 'FACTORY'
  | 'FARM'
  | 'PAIR_AST_APT'
  | 'PAIR_AST_WETH'
  | 'ROUTER';

export interface DemoContractDescriptor {
  key: DexToolsContractKey;
  address: Address;
  abi: Abi;
  kind: 'token' | 'contract';
  label: string;
  decimals?: number;
  symbol?: string;
}

export const DEX_TOOLS_CONTRACTS: Record<DexToolsContractKey, DemoContractDescriptor> = {
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
  WETH: {
    key: 'WETH',
    label: 'WETH Token',
    address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
    abi: erc20Abi,
    kind: 'token',
    symbol: 'WETH',
    decimals: 18,
  },
  PAIR_AST_APT: {
    key: 'PAIR_AST_APT',
    label: 'LP AST / APT',
    address: '0x1f15684924c184E42032F88250a9Be1f2751648E',
    abi: PAIR_ABI,
    kind: 'token',
    symbol: 'LP/AA',
    decimals: 18,
  },
  PAIR_AST_WETH: {
    key: 'PAIR_AST_WETH',
    label: 'LP AST / WETH',
    address: '0xd46f41154f61Bffb4eF37B3dD8CcCb998f3f158A',
    abi: PAIR_ABI,
    kind: 'token',
    symbol: 'LP/AW',
    decimals: 18,
  },
  FACTORY: {
    key: 'FACTORY',
    label: 'Factory Contract',
    address: '0x7E93D141a5535f866dEF115aF698a058c04A0Bc6',
    abi: FACTORY_ABI,
    kind: 'contract',
  },
  FARM: {
    key: 'FARM',
    label: 'Farm Contract',
    address: '0xd845D26108f9d9E5d39862f163Bcc3c11000d629',
    abi: FARM_ABI,
    kind: 'contract',
  },
  ROUTER: {
    key: 'ROUTER',
    label: 'Router Contract',
    address: '0x28FCb0D62FC84197715799027615D2e364f0Db65',
    abi: ROUTER_ABI,
    kind: 'contract',
  },
};
