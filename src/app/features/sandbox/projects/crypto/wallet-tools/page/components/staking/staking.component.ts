import { Component, computed, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatUnits } from 'ethers';

import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { WalletFacade } from '../../../services/wallet-facade.service';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import {
  InputChooseValues,
  UIInputChooseComponent,
} from '@sandbox/shared/components/input-choose/input-choose.component';

import { BalancesService } from '../../../services/balances.service';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { StakingService } from '../../../services/staking.service';

import { STAKING_TERMS } from '../../../services/constants';
import { BPS, YEAR_SEC } from '../../../services/finance';
import { TermsSec } from '../../../services/types';

import { parseToken } from '@sandbox/shared/web3/utils/units';
import { UIStakingListComponent } from './staking-list/staking-list.component';
import { AstService } from '../../../services/ast.service';

@Component({
  selector: 'sbx-wallet-tools-staking-tab',
  imports: [
    UIAccordionComponent,
    UIButtonComponent,
    UIInputComponent,
    UIInputChooseComponent,
    UIStakingListComponent,
    CommonModule,
  ],
  templateUrl: './staking.component.html',
  styleUrl: './staking.component.scss',
  standalone: true,
})
export class WalletToolsStakingComponent {
  private facade = inject(WalletFacade);
  private staking = inject(StakingService);
  private astService = inject(AstService);
  private balances = inject(BalancesService);
  private tx = inject(TxService);

  readonly status = this.facade.status;
  readonly ast = computed(() => this.balances.formatAst());
  readonly itemsReady = this.staking.listReady;
  readonly itemsPending = this.staking.listPending;

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
  readonly effectivePercent = computed(() => {
    const aprBps = this.aprBps();
    const termSec = this.termSec();
    const eff = (aprBps * termSec) / (YEAR_SEC * 100);
    return eff;
  });
  readonly effectivePercentLabel = computed(
    () => this.effectivePercent().toFixed(4) + '%'
  );

  readonly amountWei = computed(() => {
    const s = this.amount() || '0';
    try {
      return parseToken(s);
    } catch {
      return 0n;
    }
  });

  readonly plannedRewardWei = computed(() => {
    const amount = this.amountWei();
    const aprBps = BigInt(this.aprBps());
    const termSec = BigInt(this.termSec());
    return (amount * aprBps * termSec) / (BigInt(YEAR_SEC) * BPS);
  });

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
  faucetInProgress = signal<boolean>(false);
  isFaucetCooldown = signal<boolean>(false);

  async stake() {
    if (
      this.stakingInProgress() ||
      !this.amount() ||
      this.amount() === '0' ||
      this.amount() === '0.0'
    )
      return;

    this.stakingInProgress.set(true);
    const wei = parseToken(this.amount());

    await this.tx.send(() => this.staking.stake(wei, this.percent()), {
      onStart: (s) => console.log('step started / tx hash?', s.hash),
      onSuccess: async (s) => {
        console.log('stake mined', s.receipt);
        await this.staking.loadList();

        this.stakingInProgress.set(false);
        this.amount.set('');
        this.percent.set('M15');
      },
      onError: (s) => {
        console.warn('stake error', s.error);
        this.stakingInProgress.set(false);
      },
    });
  }

  openLink(link: string) {
    window.open(link, '_blank', 'noopener');
  }

  async faucetClaim() {
    if (this.faucetInProgress()) return;

    this.faucetInProgress.set(true);

    await this.tx.send(() => this.astService.faucetClaim(), {
      onSuccess: () => this.faucetInProgress.set(false),
      onError: (e) => {
        console.log(e);
        if (
          e.error?.code === 3 ||
          e.error?.message === 'execution reverted: "Cooldown"' ||
          e.error?.revertReason === 'Cooldown'
        ) {
          this.isFaucetCooldown.set(true);
        }
        this.faucetInProgress.set(false);
      },
    });
  }

  maxBalanceValidator = (v: string) => {
    if (!v) return null;
    const n = Number(v);
    return n > Number(this.ast()) ? `Max ${this.ast()}` : null;
  };

  positiveValidator = (v: string) =>
    !v || Number(v) > 0 ? null : 'Must be > 0';
}
