import { InjectionToken } from '@angular/core';

export interface IWeb3Adapter {
  getProvider(): any | null;

  request<T = any>(method: string, params?: any[]): Promise<T>;

  requestAccounts(): Promise<string[]>;

  chainIdHex(): Promise<string>;

  switchChain(chainIdHex: string): Promise<void>;

  addChain(params: {
    chainId: string;
    chainName: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
    rpcUrls: readonly string[];
    blockExplorerUrls?: readonly string[];
  }): Promise<void>;
}

export const WEB3_ADAPTER = new InjectionToken<IWeb3Adapter>('WEB3_ADAPTER');
