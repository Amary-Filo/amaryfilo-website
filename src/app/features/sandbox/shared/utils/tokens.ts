import { InjectionToken, Type, WritableSignal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type AllowedWallets = 'injected' | 'walletconnect';
export type PreferredInjected = 'metamask' | 'coinbase' | 'okx';

export interface AdapterOptions {
  walletconnect?: {
    projectId: string;
    showQrModal?: boolean;
    metadata?: {
      name: string;
      description: string;
      url: string;
      icons: string[];
    };
    reconnect?: boolean;
  };
  injected?: {
    preferred?: PreferredInjected;
  };
}

export interface Web3Config {
  allowedChains: number[];
  allowedWallets: AllowedWallets[];
  adapterOptions?: AdapterOptions;
  contracts: Record<string, string>;
  abis: Record<string, any>;
}

export interface BaseDemoConfig {
  web3?: Web3Config;
  ui?: { frameless?: boolean };
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

export const DEMO_CONFIG = new InjectionToken<WritableSignal<BaseDemoConfig>>(
  'DEMO_CONFIG'
);
export const DEMO_THEME = new InjectionToken<WritableSignal<Theme>>(
  'DEMO_THEME'
);
