// src/features/wallet-tools/ui/auction-pool-card/auction-pool-card.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { parseUnits } from 'viem';

import { CryptoBalanceFacade } from '@entities';
import { UIButton, UIFormField, UIInput } from '@ui/kit';
import { AuctionService } from '../../services/auction/auction.service';
import { AuctionPoolUI } from '../../services/auction/auction.types';

@Component({
  selector: 'wallet-tools-auction-pool-card',
  standalone: true,
  imports: [CommonModule, FormsModule, UIButton, UIFormField, UIInput],
  templateUrl: './auction-pool-card.component.html',
  styleUrl: './auction-pool-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionPoolCardComponent {
  private readonly balances = inject(CryptoBalanceFacade);
  readonly auction = inject(AuctionService);

  readonly pool = input.required<AuctionPoolUI>();

  readonly amount = signal('');
  readonly isSubmitting = signal(false);
  readonly isOpen = signal(false);

  readonly astBalance = computed(() => {
    const token = this.balances.items().find((item) => item.key === 'TOKEN_AST');
    return token?.human ?? '0';
  });

  readonly statusLabel = computed(() => {
    const pool = this.pool();

    if (pool.status === 'upcoming') return `Starts in ${this.auction.remainingStart(pool)}`;
    if (pool.status === 'active') return `Ends in ${this.auction.remaining(pool)}`;
    if (pool.status === 'withdraw') return 'Ready to withdraw';
    return 'Ended';
  });

  readonly canBid = computed(() => {
    const pool = this.pool();
    if (pool.status !== 'active') return false;
    if (this.isSubmitting()) return false;
    if (!this.amount()) return false;

    try {
      return parseUnits(this.amount(), 18) > 0n;
    } catch {
      return false;
    }
  });

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  setMax(): void {
    this.amount.set(this.astBalance());
  }

  async bid(): Promise<void> {
    if (!this.canBid()) return;

    this.isSubmitting.set(true);

    try {
      await this.auction.bid(this.pool().id, parseUnits(this.amount(), 18));
      this.amount.set('');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async settle(): Promise<void> {
    this.isSubmitting.set(true);

    try {
      await this.auction.settle(this.pool().id);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  isBidLoading(): boolean {
    return this.auction.progressBid().has(this.pool().id);
  }

  isWithdrawLoading(): boolean {
    return this.auction.progressWithdraw().has(this.pool().id);
  }
}
