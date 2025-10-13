import { Component } from '@angular/core';

import { BalancesComponent } from '../balances/balances.component';

import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { UILiquidityFormComponent } from './liquidity-form/liquidity-form.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

@Component({
  selector: 'sbx-dao-tools-liquidity-tab',
  imports: [
    RowTitleContentComponent,
    UILiquidityFormComponent,
    BalancesComponent,
    UIAccordionComponent,
  ],
  templateUrl: './liquidity.component.html',
  styleUrl: './liquidity.component.scss',
  standalone: true,
})
export class DaoToolsLiquidityComponent {}
