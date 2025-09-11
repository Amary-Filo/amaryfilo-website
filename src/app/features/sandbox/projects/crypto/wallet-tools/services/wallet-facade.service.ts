import { Injectable, inject, computed } from '@angular/core';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { CHAINS } from '@sandbox/shared/web3/network-registry.service';
import { Web3Orchestrator } from './web3-orchestrator.service';

@Injectable()
export class WalletFacade {
  private store = inject(WalletStore);
  private readonly _orch = inject(Web3Orchestrator);

  account = computed(() => this.store.account());
  chainId = computed(() => this.store.chainId());
  status = computed(() => this.store.status());

  connect() {
    return this.store.connect();
  }

  disconnect() {
    return this.store.disconnect();
  }

  async switchToSepolia() {
    const c = CHAINS['sepolia'];
    await this.store.switchOrAddChain({
      chainIdHex: c.hex,
      chainName: c.name,
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: c.rpcUrls,
      blockExplorerUrls: c.explorers?.map((e) => e.url),
    });
  }
}
