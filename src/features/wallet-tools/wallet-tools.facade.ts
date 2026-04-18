// src/features/wallet-tools/wallet-tools.facade.ts

import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WALLET_TOOLS_CONFIG } from './wallet-tools.config';
import { WalletToolsTab, isWalletToolsTab } from './model/wallet-tools.tabs';

@Injectable({ providedIn: 'root' })
export class WalletToolsFacade {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly activeTab = signal<WalletToolsTab>('home');
  readonly config = WALLET_TOOLS_CONFIG;

  init(): void {
    const rawTab = this.route.snapshot.queryParamMap.get('tab');
    if (isWalletToolsTab(rawTab)) this.activeTab.set(rawTab);
  }

  async setTab(tab: WalletToolsTab): Promise<void> {
    this.activeTab.set(tab);

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }
}
