// src/features/dex-tools/model/dex-tools.tabs.ts

export type DexToolsTab = 'home' | 'swap' | 'liquidity' | 'farm';

export const DEX_TOOLS_TABS: DexToolsTab[] = ['home', 'swap', 'liquidity', 'farm'];

export function isDexToolsTab(value: string | null): value is DexToolsTab {
  return !!value && DEX_TOOLS_TABS.includes(value as DexToolsTab);
}
