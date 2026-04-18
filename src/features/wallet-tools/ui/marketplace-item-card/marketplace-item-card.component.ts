// src/features/wallet-tools/ui/marketplace-item-card/marketplace-item-card.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { CryptoBalanceFacade } from '@entities';
import { UIButton } from '@ui/kit';
import { MarketplaceService } from '../../services/marketplace/marketplace.service';
import { MarketplaceItem } from '../../services/marketplace/marketplace.types';

@Component({
  selector: 'wallet-tools-marketplace-item-card',
  standalone: true,
  imports: [CommonModule, UIButton],
  templateUrl: './marketplace-item-card.component.html',
  styleUrl: './marketplace-item-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketplaceItemCardComponent {
  private readonly market = inject(MarketplaceService);
  private readonly balances = inject(CryptoBalanceFacade);

  readonly item = input.required<MarketplaceItem>();
  readonly isOpen = signal(false);

  readonly aptBalanceWei = computed(() => {
    const token = this.balances.items().find((entry) => entry.key === 'TOKEN_APT');
    return token?.wei ?? 0n;
  });

  readonly canBuy = computed(() => {
    const item = this.item();
    if (item.isBought) return false;
    return this.aptBalanceWei() >= (item.remainingWei ?? item.priceWei);
  });

  readonly statusLabel = computed(() => {
    const item = this.item();
    if (item.isBought) return 'Purchased';
    if (item.isPartial) return 'Partial purchase';
    return 'Available';
  });

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  isLoading(): boolean {
    return this.market.progressState().has(this.item().id);
  }

  async buy(): Promise<void> {
    await this.market.buy(this.item().id);
  }

  open(): void {
    this.market.openItem(this.item());
  }
}
