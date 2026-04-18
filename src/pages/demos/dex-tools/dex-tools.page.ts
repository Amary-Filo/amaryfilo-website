// src/pages/demos/dex-tools/dex-tools.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WidgetPageHero } from '@widgets';
import { UISeparator } from '@ui/kit';

@Component({
  selector: 'page-wallet-dex',
  standalone: true,
  imports: [WidgetPageHero, UISeparator],
  templateUrl: 'dex-tools.page.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--ui-spacing-5xl);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DexToolsPage {
  readonly heroMeta = ['Angular', 'Web3', 'Wallet flows', 'Transaction-heavy interfaces'];
}
