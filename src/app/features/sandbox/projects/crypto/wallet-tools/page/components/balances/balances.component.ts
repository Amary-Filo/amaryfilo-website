import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletFacade } from '../../../services/wallet-facade.service';
import { BalancesService } from '../../../services/balances.service';

import { UISkeletonComponent } from '@sandbox/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'sbx-wallet-tools-balances-component',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss',
  imports: [CommonModule, UISkeletonComponent],
  standalone: true,
})
export class WalletToolsBalancesComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);

  readonly status = this.facade.status;
  readonly isLoading = this.balances.isLoading;
  readonly ast = this.balances.formatAst;
  readonly apt = this.balances.formatApt;
}
