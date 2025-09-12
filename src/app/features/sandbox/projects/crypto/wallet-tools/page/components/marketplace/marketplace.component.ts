import { Component, inject } from '@angular/core';
import { BalancesService } from '../../../services/balances.service';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

@Component({
  selector: 'sbx-wallet-tools-marketplace-tab',
  imports: [UIAccordionComponent, UIButtonComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
  standalone: true,
})
export class WalletToolsMarketplaceComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);

  readonly status = this.facade.status;
}
