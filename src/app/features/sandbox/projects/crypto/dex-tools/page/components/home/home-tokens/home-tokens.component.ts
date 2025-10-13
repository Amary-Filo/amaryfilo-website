import { Component, inject, model } from '@angular/core';

import { WalletFacade } from '@sandbox/projects/crypto/dex-tools/services/wallet-facade.service';
import { BalancesService } from '@sandbox/projects/crypto/dex-tools/services/balances.service';
import { PageTabs } from '@sandbox/projects/crypto/dex-tools/types';

import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

@Component({
  selector: 'ui-dex-home-tokens',
  templateUrl: './home-tokens.component.html',
  styleUrl: './home-tokens.component.scss',
  imports: [UIAccordionComponent, UIButtonComponent],
  standalone: true,
})
export class UIHomeDexTokensComponent {
  private facade = inject(WalletFacade);
  private balances = inject(BalancesService);
  readonly status = this.facade.status;

  page = model<PageTabs>();
  ast = this.balances.tokenAst;
  apt = this.balances.tokenApt;
  weth = this.balances.tokenWeth;
  astApt = this.balances.pairAstApt;
  astWeth = this.balances.pairAstWeth;

  go = (p: PageTabs) => this.page.set(p);
  openWalletTools = () =>
    window.open(`/sandbox/crypto/wallet-tools`, '_blank', 'noopener');
}
