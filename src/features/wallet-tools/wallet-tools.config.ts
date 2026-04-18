// src/features/wallet-tools/wallet-tools.config.ts

import { sepolia } from 'viem/chains';
import { WALLET_TOOLS_CONTRACTS } from './contracts';

export const WALLET_TOOLS_CONFIG = {
  id: 'wallet-tools',
  title: 'Wallet Tools',
  requiredChain: sepolia,
  contracts: WALLET_TOOLS_CONTRACTS,
} as const;

export const WALLET_TOOLS_TOKENS = Object.values(WALLET_TOOLS_CONFIG.contracts).filter(
  (item) => item.kind === 'token',
);
