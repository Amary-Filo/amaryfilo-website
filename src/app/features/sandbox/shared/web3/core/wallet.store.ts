import { Injectable, signal, computed, inject } from '@angular/core';
import { ProviderService } from './provider.service';

@Injectable({ providedIn: 'root' })
export class WalletStore {
  private p = inject(ProviderService);

  account = signal<string | null>(null);
  chainId = signal<number | null>(null);
  status = signal<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  isConnected = computed(() => !!this.account());
  chainHex = computed(() => {
    const id = this.chainId();
    return id ? '0x' + id.toString(16) : null;
  });

  constructor() {
    if (this.p.ethereum) {
      this.p.ethereum.on('accountsChanged', (accs: string[]) => {
        this.account.set(accs?.[0] ?? null);
        if (!accs?.length) this.status.set('idle');
      });
      this.p.ethereum.on('chainChanged', (hex: string) => {
        this.chainId.set(parseInt(hex, 16));
      });
    }
  }

  async connect() {
    this.status.set('connecting');
    try {
      const accs = await this.p.requestAccounts();
      this.account.set(accs?.[0] ?? null);
      const hex = await this.p.chainIdHex();
      this.chainId.set(parseInt(hex, 16));
      this.status.set('connected');
    } catch (e) {
      console.error(e);
      this.status.set('error');
    }
  }

  disconnect() {
    this.account.set(null);
    this.chainId.set(null);
    this.status.set('idle');
  }

  async ensureAllowedChains(allowed: number[]) {
    const cid = this.chainId();
    if (!cid || !allowed.includes(cid)) {
      throw new Error(`Wrong chain: ${cid}`);
    }
  }

  async switchOrAddChain(params: {
    chainIdHex: string;
    chainName: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
    rpcUrls: readonly string[];
    blockExplorerUrls?: readonly string[];
  }) {
    try {
      await this.p.switchChain(params.chainIdHex);
    } catch (e: any) {
      if (e?.code === 4902 || e?.message === 'Chain not added') {
        await this.p.addChain({
          chainId: params.chainIdHex,
          chainName: params.chainName,
          nativeCurrency: params.nativeCurrency,
          rpcUrls: [...params.rpcUrls],
          blockExplorerUrls: params.blockExplorerUrls
            ? [...params.blockExplorerUrls]
            : undefined,
        });
      } else {
        throw e;
      }
    }
  }
}
