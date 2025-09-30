import { Component, inject } from '@angular/core';

import { WalletFacade } from '../../../services/wallet-facade.service';
import { BalancesService } from '../../../services/balances.service';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { MarketService } from '../../../services/marketplace.service';
import { IMarketplaceItems } from '../../../services/marketplace-items';

import { WalletToolsBalancesComponent } from '../balances/balances.component';
import { WalletToolsRowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIMarketplaceInfoComponent } from './marketplace-info/marketplace-info.component';
import { UIMarketplaceItemsComponent } from './items-list/items-list.component';

@Component({
  selector: 'sbx-wallet-tools-marketplace-tab',
  imports: [
    UIMarketplaceItemsComponent,
    WalletToolsBalancesComponent,
    WalletToolsRowTitleContentComponent,
    UIMarketplaceInfoComponent,
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
  standalone: true,
})
export class WalletToolsMarketplaceComponent {
  private facade = inject(WalletFacade);
  private market = inject(MarketService);
  private tx = inject(TxService);
  private balances = inject(BalancesService);

  readonly apt = this.balances.apt;
  readonly availableItems = this.market.availableItems();
  readonly usersItems = this.market.usersItems();

  readonly status = this.facade.status;

  async buy(id: number) {
    await this.tx.send(() => this.market.buy(id)),
      {
        onStart: (s: any) => console.log('step started / tx hash?', s.hash),
        onSuccess: async (s: any) => {
          console.log('stake mined', s.receipt);
        },
        onError: (s: any) => {
          console.warn('stake error', s.error);
        },
      };
  }

  getItem(item: IMarketplaceItems) {
    if (item.type === 'link') window.open(item.value, '_blank', 'noopener');
    if (item.type === 'download')
      window.open(`assets/${item.value}`, '_blank', 'noopener');
  }
}
