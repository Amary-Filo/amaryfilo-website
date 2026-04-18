// src/features/wallet-tools/ui/staking-form/staking-form.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatUnits, parseUnits } from 'viem';

import { CryptoBalanceFacade } from '@entities';
import { UIButton, UIFormField, UIInput } from '@ui/kit';

import { STAKING_TERMS, BPS, YEAR_SEC } from '../../services/staking/staking.constants';
import { StakingService } from '../../services/staking/staking.service';
import { TermsSec } from '../../services/staking/staking.types';

@Component({
  selector: 'wallet-tools-staking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, UIButton, UIFormField, UIInput],
  templateUrl: './staking-form.component.html',
  styleUrl: './staking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StakingFormComponent {
  private readonly staking = inject(StakingService);
  private readonly balances = inject(CryptoBalanceFacade);

  readonly amount = signal('');
  readonly term = signal<TermsSec>('M15');
  readonly stakingInProgress = signal(false);

  readonly astBalance = computed(() => {
    const token = this.balances.items().find((item) => item.key === 'TOKEN_AST');
    return token?.human ?? '0';
  });

  readonly termOptions = Object.entries(STAKING_TERMS).map(([key, value]) => ({
    key: key as TermsSec,
    title: value.title,
    percent: value.percent,
  }));

  readonly termSec = computed(() => STAKING_TERMS[this.term()].time * 60);
  readonly aprBps = computed(() => STAKING_TERMS[this.term()].percent);
  readonly aprPercentLabel = computed(() => `${(this.aprBps() / 100).toFixed(2)}% APR`);

  readonly amountWei = computed(() => {
    try {
      return parseUnits(this.amount() || '0', 18);
    } catch {
      return 0n;
    }
  });

  readonly plannedRewardWei = computed(
    () =>
      (this.amountWei() * BigInt(this.aprBps()) * BigInt(this.termSec())) /
      (BigInt(YEAR_SEC) * BPS),
  );

  readonly totalPlannedWei = computed(() => this.amountWei() + this.plannedRewardWei());

  readonly rewardHuman = computed(() => formatUnits(this.plannedRewardWei(), 18));
  readonly totalHuman = computed(() => formatUnits(this.totalPlannedWei(), 18));

  readonly canStake = computed(() => {
    return !this.stakingInProgress() && !!this.amount() && this.amountWei() > 0n;
  });

  setMax(): void {
    this.amount.set(this.astBalance());
  }

  async stake(): Promise<void> {
    if (!this.canStake()) return;

    this.stakingInProgress.set(true);

    try {
      await this.staking.stake(this.amountWei(), this.term());
      this.amount.set('');
      this.term.set('M15');
    } finally {
      this.stakingInProgress.set(false);
    }
  }
}
