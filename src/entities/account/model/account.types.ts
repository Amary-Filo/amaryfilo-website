// src/entities/account/model/account.types.ts

import type { Address } from 'viem';

export type AccountStatus = 'disconnected' | 'connecting' | 'connected' | 'wrong_network' | 'error';

export interface AccountState {
  status: AccountStatus;
  address: Address | null;
  chainId: number | null;
  error: string | null;
}
