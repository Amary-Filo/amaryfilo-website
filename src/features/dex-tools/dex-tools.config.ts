// src/features/dex-tools/dex-tools.config.ts

import { sepolia } from 'viem/chains';
import { DEX_TOOLS_CONTRACTS } from './contracts';

export const DEX_TOOLS_CONFIG = {
  id: 'dex-tools',
  title: 'Dex Tools',
  requiredChain: sepolia,
  contracts: DEX_TOOLS_CONTRACTS,
} as const;

export const DEX_TOOLS_TOKENS = Object.values(DEX_TOOLS_CONFIG.contracts).filter(
  (item) => item.kind === 'token',
);
