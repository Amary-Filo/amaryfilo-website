// src/features/wallet-tools/model/wallet-tools.tabs.ts

export type WalletToolsTab = 'home' | 'staking' | 'auction' | 'marketplace';

export const WALLET_TOOLS_TABS: WalletToolsTab[] = ['home', 'staking', 'auction', 'marketplace'];

export function isWalletToolsTab(value: string | null): value is WalletToolsTab {
  return !!value && WALLET_TOOLS_TABS.includes(value as WalletToolsTab);
}
