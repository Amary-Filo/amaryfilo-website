import { InjectionToken } from '@angular/core';
import type { Web3Config } from '../utils/tokens';

export const DEMO_WEB3_CONFIG = new InjectionToken<Web3Config>(
  'DEMO_WEB3_CONFIG'
);
