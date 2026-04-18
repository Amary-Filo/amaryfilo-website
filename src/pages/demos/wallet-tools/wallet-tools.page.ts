// src/pages/demos/wallet-tools/wallet-tools.page.ts

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DEMO_REQUIRED_CHAIN_ID } from '@lib/web3';
import { WALLET_TOOLS_CONFIG, WalletToolsShellComponent } from '@features/wallet-tools';
import { AccountFacade, AccountStore, CryptoBalanceFacade, CryptoBalanceService } from '@entities';

@Component({
  selector: 'page-wallet-tools',
  standalone: true,
  imports: [WalletToolsShellComponent],
  template: `<wallet-tools-shell />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DEMO_REQUIRED_CHAIN_ID,
      useValue: signal(WALLET_TOOLS_CONFIG.requiredChain.id),
    },
    AccountStore,
    AccountFacade,
    CryptoBalanceService,
    CryptoBalanceFacade,
  ],
})
export class WalletToolsPage {}
