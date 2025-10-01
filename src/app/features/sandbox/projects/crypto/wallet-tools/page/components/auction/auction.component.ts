import { Component, inject } from '@angular/core';

import { WalletFacade } from '../../../services/wallet-facade.service';
import { AuctionService } from '../../../services/auction.service';

import { WalletToolsBalancesComponent } from '../balances/balances.component';
import { WalletToolsRowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAuctionListComponent } from './auction-list/auction-list.component';
import { UIAuctionInfoComponent } from './auction-info/auction-info.component';

@Component({
  standalone: true,
  selector: 'sbx-wallet-tools-auction-tab',
  imports: [
    UIAuctionListComponent,
    WalletToolsBalancesComponent,
    WalletToolsRowTitleContentComponent,
    UIAuctionInfoComponent,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.scss',
})
export class WalletToolsAuctionComponent {
  private auction = inject(AuctionService);
  private facade = inject(WalletFacade);

  readonly status = this.facade.status;

  readonly active = this.auction.poolsActive;
  readonly needSettleMine = this.auction.poolsWithdraw;
  readonly past = this.auction.poolsEnded;
}
