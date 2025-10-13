import { DestroyRef, Injectable, effect, inject } from '@angular/core';
import { Web3Config } from '@sandbox/shared/utils/tokens';
import { DEMO_WEB3_CONFIG } from '@sandbox/shared/web3/tokens';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { BalancesService } from './balances.service';

@Injectable()
export class Web3Orchestrator {
  private wallet = inject(WalletStore);
  private balances = inject(BalancesService);
  private cfg = inject<Web3Config>(DEMO_WEB3_CONFIG);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(
      () => {
        const acc = this.wallet.account();
        const chainId = this.wallet.chainId();
        const status = this.wallet.status();

        const allowed = this.cfg.allowedChains?.length
          ? this.cfg.allowedChains.includes(chainId ?? -1)
          : false;

        if (!acc || !allowed || status !== 'connected') {
          this.balances.setDefault();
          return;
        }

        this.balances.refresh(acc);
      },
      { manualCleanup: true }
    );

    const t = setInterval(() => {
      const acc = this.wallet.account();
      const chainId = this.wallet.chainId();
      const status = this.wallet.status();
      const allowed = this.cfg.allowedChains?.length
        ? this.cfg.allowedChains.includes(chainId ?? -1)
        : false;

      if (acc && status === 'connected' && allowed) {
        this.balances.refresh(acc);
      }
    }, 15_000);

    this.destroyRef.onDestroy(() => clearInterval(t));
  }
}
