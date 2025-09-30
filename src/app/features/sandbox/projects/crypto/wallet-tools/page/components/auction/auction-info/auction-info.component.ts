import { Component, inject } from '@angular/core';
import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'ui-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrl: './auction-info.component.scss',
  imports: [UIAccordionComponent],
  standalone: true,
})
export class UIAuctionInfoComponent {
  private facade = inject(WalletFacade);
  readonly status = this.facade.status;
}
