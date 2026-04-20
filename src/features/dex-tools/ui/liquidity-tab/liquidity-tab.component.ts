// src/features/dex-tools/ui/liquidity-tab/liquidity-tab.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LiquidityService } from '../../services/liquidity/liquidity.service';
import { LiquidityFormComponent } from '../liquidity-form/liquidity-form.component';

@Component({
  selector: 'liquidity-tab',
  standalone: true,
  imports: [LiquidityFormComponent],
  templateUrl: './liquidity-tab.component.html',
  styleUrl: './liquidity-tab.component.scss',
  providers: [LiquidityService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidityTabComponent {
  readonly notes: { title: string; text: string }[] = [
    {
      title: 'Liquidity powers the AMM',
      text: 'Pools such as AST / APT and AST / WETH hold reserves that swaps use for pricing and execution.',
    },
    {
      title: 'You receive LP tokens',
      text: 'After adding liquidity, the pool mints LP tokens that represent your share and your participation in trading fees.',
    },
    {
      title: 'Pool ratio matters',
      text: 'For existing pools, liquidity should be added close to the current reserve ratio. The form can auto-fill the second asset amount.',
    },
    {
      title: 'Removing liquidity burns LP',
      text: 'When liquidity is removed, LP tokens are burned and the underlying pair assets are returned to your wallet.',
    },
  ];
}
