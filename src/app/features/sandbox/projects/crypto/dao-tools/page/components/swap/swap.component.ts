import { Component, model } from '@angular/core';

import { PageTabs } from '../../../types';
import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-dao-tools-swap-tab',
  imports: [RowTitleContentComponent, UIAccordionComponent],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.scss',
  standalone: true,
})
export class DaoToolsSwapComponent {
  page = model<PageTabs>();
}
