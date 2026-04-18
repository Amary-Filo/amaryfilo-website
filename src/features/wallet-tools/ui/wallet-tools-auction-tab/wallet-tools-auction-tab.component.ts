// src/features/wallet-tools/ui/wallet-tools-auction-tab/wallet-tools-auction-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuctionService } from '../../services/auction/auction.service';
import { AuctionPoolCardComponent } from '../auction-pool-card/auction-pool-card.component';

@Component({
  selector: 'wallet-tools-auction-tab',
  standalone: true,
  imports: [AuctionPoolCardComponent],
  templateUrl: './wallet-tools-auction-tab.component.html',
  styleUrl: './wallet-tools-auction-tab.component.scss',
  providers: [AuctionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletToolsAuctionTabComponent {
  readonly auction = inject(AuctionService);

  readonly notes: { title: string; text: string }[] = [
    {
      title: 'Bid with AST only',
      text: 'Auctions accept AST as the bidding token. The current pool state defines the minimum amount required to outbid the current leader.',
    },
    {
      title: 'One pool, one winner',
      text: 'Each pool ends with a single winner. The highest bidder when the timer ends becomes eligible to settle the reward.',
    },
    {
      title: 'Outbids change the state',
      text: 'A pool remains active until the timer ends. Someone can outbid the current leader at any time while the pool is still active.',
    },
    {
      title: 'Settlement happens after the end',
      text: 'If the connected wallet finishes as the winning bidder, the pool moves to withdraw state and the reward can be settled.',
    },
  ];
}
