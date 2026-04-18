// src/shared/lib/web3/web3.helper.ts

import { inject } from '@angular/core';
import { DEMO_REQUIRED_CHAIN_ID } from './demo-chain.token';
import type { AppChainId } from './web3.types';

export function injectRequiredChainId() {
  return inject(DEMO_REQUIRED_CHAIN_ID);
}

export function asAppChainId(chainId: number): AppChainId {
  return chainId as AppChainId;
}
