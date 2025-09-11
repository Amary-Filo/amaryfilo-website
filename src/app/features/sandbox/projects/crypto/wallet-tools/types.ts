import { Web3Config } from '@sandbox/shared/utils/tokens';

export type WalletToolsTabs = 'home' | 'staking' | 'auction' | 'market';
export type ContractKey = keyof Web3Config['contracts'];
