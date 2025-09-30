import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletFacade } from '../../../services/wallet-facade.service';
import { StakingService } from '../../../services/staking.service';

import { WalletToolsBalancesComponent } from '../balances/balances.component';
import { WalletToolsRowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIStakingListComponent } from './staking-list/staking-list.component';
import { UIStakingFormComponent } from './staking-form/staking-form.component';
import { UIStakingInfoComponent } from './staking-info/staking-info.component';

@Component({
  selector: 'sbx-wallet-tools-staking-tab',
  imports: [
    CommonModule,
    UIStakingListComponent,
    WalletToolsBalancesComponent,
    WalletToolsRowTitleContentComponent,
    UIStakingFormComponent,
    UIStakingInfoComponent,
  ],
  templateUrl: './staking.component.html',
  styleUrl: './staking.component.scss',
  standalone: true,
})
export class WalletToolsStakingComponent {
  private facade = inject(WalletFacade);
  private staking = inject(StakingService);

  readonly status = this.facade.status;
  readonly itemsReady = this.staking.listReady;
  readonly itemsPending = this.staking.listPending;
}
