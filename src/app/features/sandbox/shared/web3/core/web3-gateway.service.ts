import { Injectable, inject } from '@angular/core';
import { Eip1193Adapter } from './adapters/eip1193-adapter.service';
import { WalletConnectAdapter } from './adapters/walletconnect-adapter.service';
import { IWeb3Adapter } from './provider-adapter';
import { DEMO_WEB3_CONFIG } from '../tokens';
import { Web3Config } from '@sandbox/shared/utils/tokens';
import { ChainConfig } from '../network-registry.service';

@Injectable()
export class Web3Gateway {
  private cfg = inject<Web3Config>(DEMO_WEB3_CONFIG);

  private injected = inject(Eip1193Adapter);
  private wc = inject(WalletConnectAdapter);

  private current: IWeb3Adapter | null = null;

  setAdapter(id: IWeb3Adapter['id']) {
    const next = id === 'walletconnect' ? this.wc : this.injected;
    this.current = next;
  }

  getAdapter(): IWeb3Adapter {
    if (!this.current) {
      const allowed = this.cfg.allowedWallets;
      if (!allowed?.length) throw new Error('No allowedWallets');
      this.setAdapter((allowed[0] as IWeb3Adapter['id']) ?? 'injected');
    }
    return this.current!;
  }

  request<T>(m: string, params?: any[]) {
    return this.getAdapter().request<T>(m, params);
  }

  requestAccounts() {
    return this.getAdapter().requestAccounts();
  }

  chainIdHex() {
    return this.getAdapter().chainIdHex();
  }

  switchChain(hex: string) {
    return this.getAdapter().switchChain(hex);
  }

  addChain(p: ChainConfig) {
    return this.getAdapter().addChain(p);
  }

  async disconnect() {
    await this.getAdapter().disconnect?.();
  }

  onAccountsChanged(cb: (a: string[]) => void) {
    this.injected.onAccountsChanged?.(cb);
    this.wc.onAccountsChanged?.(cb);
  }

  onChainChanged(cb: (hex: string) => void) {
    this.injected.onChainChanged?.(cb);
    this.wc.onChainChanged?.(cb);
  }

  onDisconnect(cb: (e?: any) => void) {
    this.injected.onDisconnect?.(cb);
    this.wc.onDisconnect?.(cb);
  }
}
