import { Component, inject, input } from '@angular/core';

import { WalletFacade } from '@sandbox/projects/crypto/dex-tools/services/wallet-facade.service';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { ContractsService } from '@sandbox/projects/crypto/dex-tools/services/contracts.service';

import { ContractKey } from '@sandbox/projects/crypto/dex-tools/types';
import { explorerUrl } from '@sandbox/shared/web3/utils/helpers';

import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

@Component({
  selector: 'ui-dex-home-contracts-addresses-item',
  imports: [UIAccordionComponent, UIButtonComponent],
  templateUrl: './home-contracts-addresses-item.component.html',
  styleUrl: './home-contracts-addresses-item.component.scss',
  standalone: true,
})
export class UIHomeDexContractsAddressesItemComponent {
  contractKey = input<ContractKey>('');

  private store = inject(WalletStore);
  private facade = inject(WalletFacade);
  private contracts = inject(ContractsService);
  readonly status = this.facade.status;

  get address() {
    return this.contracts.getAddress(this.contractKey());
  }

  get contractName(): string {
    const names: Record<ContractKey, string> = {
      PAIR_AST_APT: 'LP/AA',
      PAIR_AST_WETH: 'LP/AW',
    };

    return names[this.contractKey()] || this.contractKey();
  }

  open() {
    const id = this.store.chainId();
    if (!id) return;

    const base = explorerUrl(id);
    const addr = this.address;

    if (!base || !addr) return;
    window.open(`${base}/address/${addr}`, '_blank', 'noopener');
  }
}
