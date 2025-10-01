import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private platformId = inject(PLATFORM_ID);

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  get ethereum(): any | null {
    if (!this.isBrowser) return null;
    return (window as any).ethereum ?? null;
  }

  request<T = any>(method: string, params?: any[]): Promise<T> {
    const eth = this.ethereum;
    if (!eth) throw new Error('No EIP-1193 provider');
    return eth.request({ method, params });
  }

  requestAccounts(): Promise<string[]> {
    return this.request('eth_requestAccounts');
  }

  chainIdHex(): Promise<string> {
    return this.request('eth_chainId');
  }

  switchChain(chainIdHex: string) {
    return this.request('wallet_switchEthereumChain', [
      { chainId: chainIdHex },
    ]);
  }

  addChain(params: {
    chainId: string;
    chainName: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
    rpcUrls: readonly string[];
    blockExplorerUrls?: readonly string[];
  }) {
    return this.request('wallet_addEthereumChain', [params]);
  }
}
