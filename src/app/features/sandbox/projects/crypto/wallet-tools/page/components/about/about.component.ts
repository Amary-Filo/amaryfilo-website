import { Component, model } from '@angular/core';

import { WalletToolsTabs } from '../../../types';
import { WalletToolsRowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-wallet-tools-about-tab',
  imports: [WalletToolsRowTitleContentComponent, UIAccordionComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class WalletToolsAboutComponent {
  page = model<WalletToolsTabs>();
}
