// src/features/wallet-tools/ui/staking-item/staking-item.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { UIButton } from '@ui/kit';
import { StakingService } from '../../services/staking/staking.service';
import { StakeViewUI } from '../../services/staking/staking.types';

@Component({
  selector: 'wallet-tools-staking-item',
  standalone: true,
  imports: [CommonModule, UIButton],
  templateUrl: './staking-item.component.html',
  styleUrl: './staking-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StakingItemComponent {
  private readonly staking = inject(StakingService);

  readonly item = input.required<StakeViewUI>();
  readonly isPending = input(false);
  readonly isOpen = signal(false);

  readonly now = this.staking.now;
  readonly withdrawing = this.staking.withdrawing;
  readonly isListLoading = this.staking.isListLoading;

  async withdraw(idx: number): Promise<void> {
    await this.staking.withdraw(idx);
  }

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  formatRemaining(etaMs: number): string {
    const diffSec = Math.max(0, Math.floor((etaMs - this.now()) / 1000));

    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const s = diffSec % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (h > 0) return `${pad(h)}:${pad(m)} hours`;
    return `${pad(m)}:${pad(s)} min`;
  }
}
