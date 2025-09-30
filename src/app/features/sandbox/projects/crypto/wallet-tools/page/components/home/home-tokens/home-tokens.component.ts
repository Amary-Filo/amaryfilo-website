import { Component, inject, model } from '@angular/core';

import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { BalancesService } from '@sandbox/projects/crypto/wallet-tools/services/balances.service';
import { WalletToolsTabs } from '@sandbox/projects/crypto/wallet-tools/types';

import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

@Component({
  selector: 'ui-home-tokens',
  templateUrl: './home-tokens.component.html',
  styleUrl: './home-tokens.component.scss',
  imports: [UIAccordionComponent, UIButtonComponent],
  standalone: true,
})
export class UIHomeTokensComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);
  readonly status = this.facade.status;

  page = model<WalletToolsTabs>();
  ast = this.balances.formatAst;
  apt = this.balances.formatApt;

  go = (p: WalletToolsTabs) => this.page.set(p);
}
