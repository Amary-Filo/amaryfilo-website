import { Component, model } from '@angular/core';

import { PageTabs } from '../../../types';

import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIHomeDexContractsAddressesComponent } from './home-contracts-addresses/home-contracts-addresses.component';
import { UIHomeDexTokensComponent } from './home-tokens/home-tokens.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIFarmSummaryComponent } from '../farming/farming-summary/farming-summary.component';
import { UILiquidityInfoComponent } from '../liquidity/liquidity-info/liquidity-info.component';

@Component({
  selector: 'sbx-dex-tools-home-tab',
  imports: [
    UIHomeDexContractsAddressesComponent,
    RowTitleContentComponent,
    UIHomeDexTokensComponent,
    UIButtonComponent,
    UIFarmSummaryComponent,
    UILiquidityInfoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class DexToolsHomeComponent {
  page = model<PageTabs>();

  go(page: PageTabs) {
    this.page.set(page);
  }

  openMetamaskLink() {
    window.open(
      `https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn`,
      '_blank',
      'noopener'
    );
  }
}
