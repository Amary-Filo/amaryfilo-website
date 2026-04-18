// src/features/wallet-tools/ui/wallet-tools-shell/wallet-tools-shell.component.ts

import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UIButton, UISeparator } from '@ui/kit';
import { WidgetPageHero } from '@widgets';
import { AccountFacade, CryptoBalanceFacade } from '@entities';
import { WALLET_TOOLS_CONFIG, WalletToolsFacade } from '../..';
import { WALLET_TOOLS_TOKENS } from '../../wallet-tools.config';
import { WALLET_TOOLS_TABS, WalletToolsTab } from '../../model/wallet-tools.tabs';
import { WalletToolsHomeTabComponent } from '../wallet-tools-home-tab/wallet-tools-home-tab.component';
import { WalletToolsStakingTabComponent } from '../wallet-tools-staking-tab/wallet-tools-staking-tab.component';
import { WalletToolsAuctionTabComponent } from '../wallet-tools-auction-tab/wallet-tools-auction-tab.component';
import { WalletToolsMarketplaceTabComponent } from '../wallet-tools-marketplace-tab/wallet-tools-marketplace-tab.component';

@Component({
  selector: 'wallet-tools-shell',
  standalone: true,
  imports: [
    UIButton,
    WidgetPageHero,
    UISeparator,
    WalletToolsHomeTabComponent,
    WalletToolsStakingTabComponent,
    WalletToolsAuctionTabComponent,
    WalletToolsMarketplaceTabComponent,
  ],
  templateUrl: './wallet-tools-shell.component.html',
  styleUrl: './wallet-tools-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletToolsShellComponent {
  private readonly router = inject(Router);
  readonly balances = inject(CryptoBalanceFacade);

  readonly account = inject(AccountFacade);
  readonly facade = inject(WalletToolsFacade);

  readonly tabs = WALLET_TOOLS_TABS;
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
        requiredChainId: WALLET_TOOLS_CONFIG.requiredChain.id,
        nativeTokenLabel: WALLET_TOOLS_CONFIG.requiredChain.nativeCurrency.name,
        nativeTokenSymbol: WALLET_TOOLS_CONFIG.requiredChain.nativeCurrency.symbol,
        nativeTokenDecimals: WALLET_TOOLS_CONFIG.requiredChain.nativeCurrency.decimals,
        tokens: WALLET_TOOLS_TOKENS,
      });
    });
  }

  async setTab(tab: WalletToolsTab): Promise<void> {
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

  trackByTab(_: number, tab: WalletToolsTab): WalletToolsTab {
    return tab;
  }

  trackByContract(_: number, item: { key: string }): string {
    return item.key;
  }
}
