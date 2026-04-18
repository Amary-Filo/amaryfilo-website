// src/shared/lib/web3/demo-chain.token.ts

import { InjectionToken, signal } from '@angular/core';

export const DEMO_REQUIRED_CHAIN_ID = new InjectionToken<ReturnType<typeof signal<number>>>(
  'DEMO_REQUIRED_CHAIN_ID',
);
