import { Component, model } from '@angular/core';

import { WalletToolsTabs } from '../../../types';

import { WalletToolsRowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIHomeContractsAddressesComponent } from './home-contracts-addresses/home-contracts-addresses.component';
import { UIHomeTokensComponent } from './home-tokens/home-tokens.component';
import { UIStakingListComponent } from '../staking/staking-list/staking-list.component';
import { UIAuctionListComponent } from '../auction/auction-list/auction-list.component';
import { UIMarketplaceItemsComponent } from '../marketplace/items-list/items-list.component';

@Component({
  selector: 'sbx-wallet-tools-home-tab',
  imports: [
    UIStakingListComponent,
    UIMarketplaceItemsComponent,
    UIAuctionListComponent,
    UIHomeContractsAddressesComponent,
    WalletToolsRowTitleContentComponent,
    UIHomeTokensComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class WalletToolsHomeComponent {
  page = model<WalletToolsTabs>();
}
