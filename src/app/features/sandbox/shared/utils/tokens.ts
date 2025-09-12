import { InjectionToken, Type } from '@angular/core';

export type Theme = 'light' | 'dark';

export interface Web3Config {
  allowedChains: number[];
  allowedWallets: ('injected' | 'walletconnect' | string)[];
  contracts: Record<string, string>;
  abis: Record<string, any>;
}

export interface BaseDemoConfig {
  web3?: Web3Config;
  ui?: {
    frameless?: boolean;
  };
  [k: string]: unknown;
}

export interface Manifest<Cfg extends BaseDemoConfig = BaseDemoConfig> {
  id: string;
  slug: string;
  kind: string;
  title: string;
  description: string;
  tags: string[];
  component: Type<unknown>;
  controls?: Type<unknown>;
  defaultConfig?: Cfg;
}

export const DEMO_CONFIG = new InjectionToken<any>('DEMO_CONFIG');
export const DEMO_THEME = new InjectionToken<any>('DEMO_THEME');
