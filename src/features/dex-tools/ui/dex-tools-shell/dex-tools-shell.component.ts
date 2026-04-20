// src/features/dex-tools/ui/dex-tools-shell/dex-tools-shell.component.ts

import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UIButton, UISeparator } from '@ui/kit';
import { WidgetPageHero } from '@widgets';
import { AccountFacade, CryptoBalanceFacade } from '@entities';
import { DEX_TOOLS_CONFIG, DexToolsFacade } from '../..';
import { DEX_TOOLS_TOKENS } from '../../dex-tools.config';
import { DEX_TOOLS_TABS, DexToolsTab } from '../../model/dex-tools.tabs';
import { HomeTabComponent } from '../home-tab/home-tab.component';
import { SwapTabComponent } from '../swap-tab/swap-tab.component';
import { LiquidityTabComponent } from '../liquidity-tab/liquidity-tab.component';
import { FarmTabComponent } from '../farm-tab/farm-tab.component';

@Component({
  selector: 'dex-tools-shell',
  standalone: true,
  imports: [
    UIButton,
    WidgetPageHero,
    UISeparator,
    HomeTabComponent,
    SwapTabComponent,
    LiquidityTabComponent,
    FarmTabComponent,
  ],
  templateUrl: './dex-tools-shell.component.html',
  styleUrl: './dex-tools-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DexToolsShellComponent {
  private readonly router = inject(Router);
  readonly balances = inject(CryptoBalanceFacade);

  readonly account = inject(AccountFacade);
  readonly facade = inject(DexToolsFacade);

  readonly tabs = DEX_TOOLS_TABS;
  readonly heroMeta = ['Angular', 'Web3', 'Wallet flows', 'Transaction-heavy interfaces'];

  readonly contractEntries = computed(() => Object.values(this.facade.config.contracts));
  readonly actionText = computed(() => (!this.account.isConnected() ? 'Connect Wallet' : 'Logout'));

  readonly balancesState = computed(() => {
    if (!this.account.canUseDemo()) return 'disconnected';
    if (this.balances.isLoading()) return 'loading';
    if (this.balances.error()) return 'error';
    return 'ready';
  });

  constructor() {
    this.facade.init();

    effect(() => {
      const address = this.account.address();
      const chainId = this.account.chainId();
      const canUseDemo = this.account.canUseDemo();

      if (!address || !chainId || !canUseDemo) {
        this.balances.reset();
        return;
      }

      void this.balances.load({
        requiredChainId: DEX_TOOLS_CONFIG.requiredChain.id,
        nativeTokenLabel: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.name,
        nativeTokenSymbol: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.symbol,
        nativeTokenDecimals: DEX_TOOLS_CONFIG.requiredChain.nativeCurrency.decimals,
        tokens: DEX_TOOLS_TOKENS,
      });
    });
  }

  async setTab(tab: DexToolsTab): Promise<void> {
    await this.facade.setTab(tab);
  }

  async goBackToDemos(): Promise<void> {
    await this.router.navigateByUrl('/demos');
  }

  actionButton(): void {
    if (this.account.isConnected()) this.account.disconnect();
    else this.account.connectWallet();
  }

  shortenAddress(value: string | null): string {
    if (!value) return '—';
    return `${value.slice(0, 6)}...${value.slice(-4)}`;
  }

  trackByTab(_: number, tab: DexToolsTab): DexToolsTab {
    return tab;
  }

  trackByContract(_: number, item: { key: string }): string {
    return item.key;
  }
}
