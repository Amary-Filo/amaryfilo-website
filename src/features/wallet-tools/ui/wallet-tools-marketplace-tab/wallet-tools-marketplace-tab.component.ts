// src/features/wallet-tools/ui/wallet-tools-marketplace-tab/wallet-tools-marketplace-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MarketplaceService } from '../../services/marketplace/marketplace.service';
import { MarketplaceItemCardComponent } from '../marketplace-item-card/marketplace-item-card.component';

@Component({
  selector: 'wallet-tools-marketplace-tab',
  standalone: true,
  imports: [MarketplaceItemCardComponent],
  templateUrl: './wallet-tools-marketplace-tab.component.html',
  styleUrl: './wallet-tools-marketplace-tab.component.scss',
  providers: [MarketplaceService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletToolsMarketplaceTabComponent {
  readonly market = inject(MarketplaceService);

  readonly notes: { title: string; text: string }[] = [
    {
      title: 'APT is the marketplace token',
      text: 'Marketplace items are priced in APT, which means the connected wallet needs enough APT balance to complete a purchase.',
    },
    {
      title: 'Purchases are contract actions',
      text: 'Buying an item is an on-chain transaction. Once confirmed, the purchased state is restored from wallet history and contract events.',
    },
    {
      title: 'Items can be links or downloads',
      text: 'Some items open external resources, while others simulate downloadable digital assets inside the demo.',
    },
    {
      title: 'Partial purchase support',
      text: 'If the item supports partial progress in the demo flow, the remaining value is shown and the next purchase action only covers what is left.',
    },
  ];
}
