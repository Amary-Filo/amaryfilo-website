import { Injectable, signal, computed, inject } from '@angular/core';
import { Web3Gateway } from './web3-gateway.service';
import { ChainConfig, CHAINS } from '../network-registry.service';
import { DEMO_WEB3_CONFIG } from '../tokens';
import { Web3Config } from '@sandbox/shared/utils/tokens';

@Injectable({ providedIn: 'root' })
export class WalletStore {
  private gw = inject(Web3Gateway);
  private cfg = inject<Web3Config>(DEMO_WEB3_CONFIG);

  account = signal<string | null>(null);
  chainId = signal<number | null>(null);
  status = signal<'idle' | 'connecting' | 'connected' | 'error'>('idle');

  isConnected = computed(() => !!this.account());
  chainHex = computed(() =>
    this.chainId() ? '0x' + this.chainId()!.toString(16) : null
  );

  constructor() {
    this.gw.onAccountsChanged((accs) => {
      this.account.set(accs?.[0] ?? null);
      if (!accs?.length) this.status.set('idle');
    });
    this.gw.onChainChanged((hex) => {
      this.chainId.set(parseInt(hex, 16));
    });
    this.gw.onDisconnect(() => {
      this.account.set(null);
      this.chainId.set(null);
      this.status.set('idle');
    });
  }

  setAdapter(id: 'injected' | 'walletconnect') {
    this.gw.setAdapter(id);
  }

  async connect() {
    this.status.set('connecting');
    try {
      const acc = await this.gw.requestAccounts();
      this.account.set(acc[0] ?? null);

      const hex = await this.gw.chainIdHex();
      this.chainId.set(parseInt(hex, 16));

      const allowed = this.cfg.allowedChains;
      const want = allowed[0];

      if (!allowed.includes(parseInt(hex, 16))) {
        const def = Object.values(CHAINS).find((c) => c.id === want);
        if (!def) throw new Error(`Chain ${want} is not in registry`);

        try {
          await this.gw.switchChain(def.hex);
        } catch (e: any) {
          if (e?.code === 4902 || String(e?.message).includes('not added')) {
            await this.gw.addChain({
              chainId: def.hex,
              chainName: def.name,
              nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
              rpcUrls: def.rpcUrls,
              blockExplorerUrls:
                def.explorers?.map((x) => x.url) ??
                (def.explorer ? [def.explorer.url] : []),
            });
            await this.gw.switchChain(def.hex);
          } else {
            throw e;
          }
        }

        const hex2 = await this.gw.chainIdHex();
        this.chainId.set(parseInt(hex2, 16));
      }

      this.status.set('connected');
    } catch (e) {
      console.error(e);
      this.status.set('error');
      throw e;
    }
  }

  // async connect() {
  //   this.status.set('connecting');
  //   try {
  //     const accs = await this.gw.requestAccounts(); // ← string[]
  //     this.account.set(accs?.[0] ?? null);
  //     const hex = await this.gw.chainIdHex();
  //     this.chainId.set(parseInt(hex, 16));
  //     this.status.set('connected');
  //   } catch (e) {
  //     console.error(e);
  //     this.status.set('error');
  //   }
  // }

  disconnect() {
    this.account.set(null);
    this.chainId.set(null);
    this.status.set('idle');
    this.gw.disconnect().catch(() => {});
  }

  async ensureAllowedChains(allowed: number[]) {
    const cid = this.chainId();
    if (!cid || !allowed.includes(cid)) {
      throw new Error(`Wrong chain: ${cid}`);
    }
  }

  async switchOrAddChain(params: ChainConfig) {
    try {
      await this.gw.switchChain(params.chainId);
    } catch (e: any) {
      if (e?.code === 4902 || e?.message?.includes?.('not added')) {
        await this.gw.addChain({
          chainId: params.chainId,
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
