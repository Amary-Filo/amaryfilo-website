import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletFacade } from '../../../services/wallet-facade.service';
import { BalancesService } from '../../../services/balances.service';

import { UISkeletonComponent } from '@sandbox/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'sbx-balances-component',
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss',
  imports: [CommonModule, UISkeletonComponent],
  standalone: true,
})
export class BalancesComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);

  readonly status = this.facade.status;
  readonly isLoading = this.balances.isLoading;
  readonly ast = this.balances.tokenAst;
  readonly apt = this.balances.tokenApt;
  readonly weth = this.balances.tokenWeth;
  readonly astApt = this.balances.pairAstApt;
  readonly astWeth = this.balances.pairAstWeth;
}
