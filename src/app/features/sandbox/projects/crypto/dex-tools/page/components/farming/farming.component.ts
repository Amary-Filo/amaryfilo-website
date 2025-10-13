import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { BalancesComponent } from '../balances/balances.component';
import { UIFarmSummaryComponent } from './farming-summary/farming-summary.component';
import { UIFarmFormComponent } from './farming-form/farming-form.component';

@Component({
  selector: 'sbx-dex-tools-farming-tab',
  imports: [
    CommonModule,
    RowTitleContentComponent,
    UIAccordionComponent,
    BalancesComponent,
    UIFarmSummaryComponent,
    UIFarmFormComponent,
  ],
  templateUrl: './farming.component.html',
  styleUrl: './farming.component.scss',
  standalone: true,
})
export class DexToolsFarmingComponent {}
