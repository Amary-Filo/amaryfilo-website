import { Component, computed, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatUnits } from 'ethers';

import { BalancesService } from '@sandbox/projects/crypto/wallet-tools/services/balances.service';
import { TermsSec } from '@sandbox/projects/crypto/wallet-tools/services/types';
import {
  STAKING_TERMS,
  YEAR_SEC,
  BPS,
} from '@sandbox/projects/crypto/wallet-tools/services/constants';
import { parseToken } from '@sandbox/shared/web3/utils/units';

import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIStakingZeroAstComponent } from '../staking-zero-ast/staking-zero-ast.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import {
  InputChooseValues,
  UIInputChooseComponent,
} from '@sandbox/shared/components/input-choose/input-choose.component';

import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { StakingService } from '@sandbox/projects/crypto/wallet-tools/services/staking.service';

@Component({
  selector: 'ui-staking-form',
  templateUrl: './staking-form.component.html',
  styleUrl: './staking-form.component.scss',
  imports: [
    CommonModule,
    UIInputComponent,
    UIInputChooseComponent,
    UIButtonComponent,
    UIStakingZeroAstComponent,
  ],
  standalone: true,
})
export class UIStakingFormComponent {
  private staking = inject(StakingService);
  private balances = inject(BalancesService);
  private tx = inject(TxService);

  readonly ast = this.balances.formatAst;
  readonly isBalanceLoading = this.balances.isLoading;

  readonly terms: InputChooseValues[] = Object.entries(STAKING_TERMS).map(
    ([key, term]) => ({
      title: term.title,
      value: key as TermsSec,
    })
  );

  readonly termSec = computed(() => STAKING_TERMS[this.percent()].time * 60);
  readonly aprBps = computed(() => STAKING_TERMS[this.percent()].percent);

  readonly aprPercentLabel = computed(
    () => (this.aprBps() / 100).toFixed(2) + '% APR'
  );
  readonly effectivePercent = computed(
    () => (this.aprBps() * this.termSec()) / (YEAR_SEC * 100)
  );
  readonly effectivePercentLabel = computed(
    () => this.effectivePercent().toFixed(4) + '%'
  );

  readonly amountWei = computed(() => parseToken(this.amount() || '0'));

  readonly plannedRewardWei = computed(
    () =>
      (this.amountWei() * BigInt(this.aprBps()) * BigInt(this.termSec())) /
      (BigInt(YEAR_SEC) * BPS)
  );
  readonly totalPlannedWei = computed(
    () => this.amountWei() + this.plannedRewardWei()
  );

  readonly rewardHuman = computed(() =>
    formatUnits(this.plannedRewardWei(), 18)
  );
  readonly totalHuman = computed(() => formatUnits(this.totalPlannedWei(), 18));

  amount = model<string>('');
  percent = model<TermsSec>('M15');
  stakingInProgress = signal<boolean>(false);

  async stake() {
    if (
      this.stakingInProgress() ||
      !this.amount() ||
      ['0', '0.0'].includes(this.amount())
    )
      return;

    this.stakingInProgress.set(true);

    await this.tx.send(
      () => this.staking.stake(this.amountWei(), this.percent()),
      {
        onStart: (s) => console.log('step started / tx hash?', s.hash),
        onSuccess: async (s) => {
          console.log('stake mined', s.receipt);
          await this.staking.loadList();
          this.resetForm();
        },
        onError: (s) => {
          console.warn('stake error', s.error);
        },
      }
    );

    this.stakingInProgress.set(false);
  }

  private resetForm() {
    this.amount.set('');
    this.percent.set('M15');
  }
}
