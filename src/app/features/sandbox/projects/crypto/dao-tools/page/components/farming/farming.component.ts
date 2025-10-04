import { Component, model } from '@angular/core';

import { PageTabs } from '../../../types';
import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-dao-tools-farming-tab',
  imports: [RowTitleContentComponent, UIAccordionComponent],
  templateUrl: './farming.component.html',
  styleUrl: './farming.component.scss',
  standalone: true,
})
export class DaoToolsFarmingComponent {
  page = model<PageTabs>();
}
