import { Component, inject } from '@angular/core';
import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'ui-staking-info',
  templateUrl: './staking-info.component.html',
  styleUrl: './staking-info.component.scss',
  imports: [UIAccordionComponent],
  standalone: true,
})
export class UIStakingInfoComponent {
  private facade = inject(WalletFacade);
  readonly status = this.facade.status;
}
