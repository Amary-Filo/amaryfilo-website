import { Component, computed, inject, model } from '@angular/core';
import { parseToken } from '@sandbox/shared/web3/utils/units';
import { AuctionService } from '../../../services/auction.service';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { BalancesService } from '../../../services/balances.service';
import { UILotBenefitListComponent } from './lot-benefit-list/lot-benefit-list.component';
import { UIPullContentComponent } from './pull-content/pull-content.component';

@Component({
  selector: 'sbx-wallet-tools-auction-tab',
  imports: [
    UIButtonComponent,
    UIAccordionComponent,
    UIPullContentComponent,
    UILotBenefitListComponent,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss',
  standalone: true,
})
export class WalletToolsAuctionComponent {
  private auction = inject(AuctionService);
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);

  readonly status = this.facade.status;
  amount = model<string>('');
  ast = computed(() => this.balances.formatAst());

  maxBalanceValidator = (v: string) => {
    if (!v) return null;
    const n = Number(v);
    return n > Number(this.ast()) ? `Max ${this.ast()}` : null;
  };

  positiveValidator = (v: string) =>
    !v || Number(v) > 0 ? null : 'Must be > 0';

  async bid() {
    await this.auction.bid(parseToken(this.amount(), 18));
  }

  async withdraw() {
    await this.auction.withdraw();
  }
}
