import { Component, computed, inject, model } from '@angular/core';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { CHAINS } from '@sandbox/shared/web3/network-registry.service';
import { ContractsService } from '../../../services/contracts.service';
import { ContractKey, WalletToolsTabs } from '../../../types';
import { formatToken } from '@sandbox/shared/web3/utils/units';
import { BalancesService } from '../../../services/balances.service';
import { WalletFacade } from '../../../services/wallet-facade.service';

@Component({
  selector: 'sbx-wallet-tools-home-tab',
  imports: [UIAccordionComponent, UIButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class WalletToolsHomeComponent {
  private store = inject(WalletStore);
  private balances = inject(BalancesService);
  private contracts = inject(ContractsService);
  private facade = inject(WalletFacade);

  readonly status = this.facade.status;

  page = model<WalletToolsTabs>();
  ast = computed(() => this.balances.ast());
  apt = computed(() => this.balances.apt());

  getContractAddress(key: ContractKey): string {
    return this.contracts.getAddress(key);
  }

  displayToken(amount: bigint): string {
    return formatToken(amount, 18);
  }

  private explorerBase(): string | null {
    const id = this.store.chainId();
    if (!id) return null;

    const chain = Object.values(CHAINS).find((c) => c.id === id);
    const base = chain?.explorer?.url || chain?.explorers?.[0]?.url || null;

    return base;
  }

  openExplorer(key: ContractKey) {
    const base = this.explorerBase();
    const addr = this.getContractAddress(key);

    if (!base || !addr) return;
    window.open(`${base}/address/${addr}`, '_blank', 'noopener');
  }

  go(p: WalletToolsTabs) {
    this.page.set(p);
  }
}
