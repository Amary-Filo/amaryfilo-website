import { Component, model } from '@angular/core';

import { PageTabs } from '../../../types';
import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-dex-tools-about-tab',
  imports: [RowTitleContentComponent, UIAccordionComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class DexToolsAboutComponent {
  page = model<PageTabs>();
}
