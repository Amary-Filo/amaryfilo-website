import { Injectable, inject, computed } from '@angular/core';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3Orchestrator } from './web3-orchestrator.service';
import { CHAINS } from '@sandbox/shared/web3/network-registry.service';
import { AllowedWallets } from '@sandbox/shared/utils/tokens';

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

  setAdapter(id: AllowedWallets) {
    this.store.setAdapter(id);
  }

  disconnect() {
    return this.store.disconnect();
  }

  async switchToSepolia() {
    const c = CHAINS['sepolia'];
    await this.store.switchOrAddChain({
      chainId: c.hex,
      chainName: c.name,
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: c.rpcUrls,
      blockExplorerUrls: c.explorers?.map((e) => e.url),
    });
  }
}
