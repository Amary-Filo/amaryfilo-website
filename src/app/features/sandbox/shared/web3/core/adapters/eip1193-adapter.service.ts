import { Injectable } from '@angular/core';
import { IWeb3Adapter } from '../provider-adapter';
import { AllowedWallets } from '@sandbox/shared/utils/tokens';
import { ChainConfig } from '../../network-registry.service';

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class Eip1193Adapter implements IWeb3Adapter {
  id: AllowedWallets = 'injected';
  label = 'Browser Wallet';

  private current: any | null = null;

  selectProvider(p: any) {
    this.current = p;
    p?.on?.('accountsChanged', (a: string[]) => this._onAccounts?.(a));
    p?.on?.('chainChanged', (hex: string) => this._onChain?.(hex));
    p?.on?.('disconnect', (e: any) => this._onDisconnect?.(e));
  }

  getProvider() {
    return this.current ?? (window as any).ethereum ?? null;
  }

  isAvailable() {
    return !!this.getProvider();
  }

  async request<T>(method: string, params?: any[]): Promise<T> {
    const eth = this.getProvider();
    if (!eth) throw new Error('No EIP-1193 provider');
    return eth.request({ method, params }) as Promise<T>;
  }

  async requestAccounts(): Promise<string[]> {
    const arr = await this.request<string[]>('eth_requestAccounts');
    return Array.isArray(arr) ? arr : [];
  }

  chainIdHex(): Promise<string> {
    return this.request<string>('eth_chainId');
  }

  async switchChain(chainIdHex: string): Promise<void> {
    await this.request('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
  }

  async addChain(params: ChainConfig): Promise<void> {
    await this.request('wallet_addEthereumChain', [params]);
  }

  async disconnect() {
    this.current = null;
  }

  private _onAccounts?: (a: string[]) => void;
  private _onChain?: (hex: string) => void;
  private _onDisconnect?: (e?: any) => void;

  onAccountsChanged(cb: (a: string[]) => void) {
    this._onAccounts = cb;
  }
  onChainChanged(cb: (hex: string) => void) {
    this._onChain = cb;
  }
  onDisconnect(cb: (e?: any) => void) {
    this._onDisconnect = cb;
  }
}
