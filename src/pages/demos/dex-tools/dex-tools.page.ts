// src/pages/demos/dex-tools/dex-tools.page.ts

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DEMO_REQUIRED_CHAIN_ID } from '@lib/web3';
import { DEX_TOOLS_CONFIG, DexToolsShellComponent } from '@features/dex-tools';
import { AccountFacade, AccountStore, CryptoBalanceFacade, CryptoBalanceService } from '@entities';

@Component({
  selector: 'page-dex-tools',
  standalone: true,
  imports: [DexToolsShellComponent],
  template: `<dex-tools-shell />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DEMO_REQUIRED_CHAIN_ID,
      useValue: signal(DEX_TOOLS_CONFIG.requiredChain.id),
    },
    AccountStore,
    AccountFacade,
    CryptoBalanceService,
    CryptoBalanceFacade,
  ],
})
export class DexToolsPage {}
