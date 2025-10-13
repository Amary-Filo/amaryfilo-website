import { Web3Config } from '@sandbox/shared/utils/tokens';

export type PageTabs = 'home' | 'swap' | 'liquidity' | 'farming' | 'about';
export type ContractKey = keyof Web3Config['contracts'];
