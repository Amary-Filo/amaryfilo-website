// src/features/dex-tools/ui/swap-tab/swap-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SwapService } from '../../services/swap/swap.service';
import { SwapFormComponent } from '../swap-form/swap-form.component';

@Component({
  selector: 'swap-tab',
  standalone: true,
  imports: [SwapFormComponent],
  templateUrl: './swap-tab.component.html',
  styleUrl: './swap-tab.component.scss',
  providers: [SwapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapTabComponent {
  readonly swap = inject(SwapService);

  readonly notes: { title: string; text: string }[] = [
    {
      title: 'AMM-based exchange',
      text: 'This swap flow uses liquidity pool reserves instead of an order book. The output amount depends on pool balance, fee, and the size of the trade.',
    },
    {
      title: 'Approvals may happen first',
      text: 'If the input token has not yet been approved for the router contract, the wallet may ask for an ERC-20 approval before the actual swap transaction.',
    },
    {
      title: 'Price impact matters',
      text: 'Larger swaps move the pool ratio more aggressively. The UI shows estimated price impact so the trade is easier to evaluate before confirming.',
    },
    {
      title: 'Everything is testnet-only',
      text: 'All token balances, reserves, and swaps in this demo exist on Sepolia only and are meant to illustrate DeFi product behavior, not real asset usage.',
    },
  ];
}
