// src/shared/lib/web3/web3.types.ts

import { wagmiConfig } from './wagmi.config';

export type AppChainId = (typeof wagmiConfig)['chains'][number]['id'];
