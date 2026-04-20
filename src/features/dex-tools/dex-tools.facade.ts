// src/features/dex-tools/dex-tools.facade.ts

import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DEX_TOOLS_CONFIG } from './dex-tools.config';
import { DexToolsTab, isDexToolsTab } from './model/dex-tools.tabs';

@Injectable({ providedIn: 'root' })
export class DexToolsFacade {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly activeTab = signal<DexToolsTab>('home');
  readonly config = DEX_TOOLS_CONFIG;

  init(): void {
    const rawTab = this.route.snapshot.queryParamMap.get('tab');
    if (isDexToolsTab(rawTab)) this.activeTab.set(rawTab);
  }

  async setTab(tab: DexToolsTab): Promise<void> {
    this.activeTab.set(tab);

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
    });
  }
}
