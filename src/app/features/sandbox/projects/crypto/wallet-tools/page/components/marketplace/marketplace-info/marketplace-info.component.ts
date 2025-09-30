import { Component, inject } from '@angular/core';
import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'ui-marketplace-info',
  templateUrl: './marketplace-info.component.html',
  styleUrl: './marketplace-info.component.scss',
  imports: [UIAccordionComponent],
  standalone: true,
})
export class UIMarketplaceInfoComponent {
  private facade = inject(WalletFacade);
  readonly status = this.facade.status;
}
