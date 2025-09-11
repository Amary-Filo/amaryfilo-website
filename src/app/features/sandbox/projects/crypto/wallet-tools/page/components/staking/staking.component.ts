import { Component, inject } from '@angular/core';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { WalletFacade } from '../../../services/wallet-facade.service';

@Component({
  selector: 'sbx-wallet-tools-staking-tab',
  imports: [UIAccordionComponent, UIButtonComponent],
  templateUrl: './staking.component.html',
  styleUrl: './staking.component.scss',
  standalone: true,
})
export class WalletToolsStakingComponent {
  private facade = inject(WalletFacade);

  readonly status = this.facade.status;
}
