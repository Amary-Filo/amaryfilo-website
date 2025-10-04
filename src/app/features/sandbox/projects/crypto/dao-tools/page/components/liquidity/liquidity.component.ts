import { Component, model } from '@angular/core';

import { PageTabs } from '../../../types';
import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-dao-tools-liquidity-tab',
  imports: [RowTitleContentComponent, UIAccordionComponent],
  templateUrl: './liquidity.component.html',
  styleUrl: './liquidity.component.scss',
  standalone: true,
})
export class DaoToolsLiquidityComponent {
  page = model<PageTabs>();
}
