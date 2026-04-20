// src/features/dex-tools/ui/farm-form/farm-form.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { parseUnits } from 'viem';

import { CryptoBalanceFacade } from '@entities/crypto-balance';
import { UIButton, UIFormField, UIInput } from '@ui/kit';
import { FarmService } from '../../services/farm/farm.service';

@Component({
  selector: 'farm-form',
  standalone: true,
  imports: [CommonModule, FormsModule, UIButton, UIFormField, UIInput],
  templateUrl: './farm-form.component.html',
  styleUrl: './farm-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmFormComponent {
  private readonly farm = inject(FarmService);
  private readonly balances = inject(CryptoBalanceFacade);

  readonly depositH = signal('');
  readonly withdrawH = signal('');

  readonly depositing = signal(false);
  readonly withdrawing = signal(false);
  readonly harvesting = signal(false);

  readonly summary = this.farm.summary;

  readonly maxDeposit = computed(() => {
    const item = this.balances.items().find((entry) => entry.key === 'PAIR_AST_APT');
    return item?.human ?? '0';
  });

  readonly maxWithdraw = computed(() => this.summary()?.stakedLpHuman ?? '0');

  readonly canDeposit = computed(() => {
    if (this.depositing()) return false;

    try {
      return parseUnits(this.depositH() || '0', 18) > 0n;
    } catch {
      return false;
    }
  });

  readonly canWithdraw = computed(() => {
    if (this.withdrawing()) return false;

    try {
      return parseUnits(this.withdrawH() || '0', 18) > 0n;
    } catch {
      return false;
    }
  });

  readonly canHarvest = computed(() => {
    if (this.harvesting()) return false;
    return Number(this.summary()?.pendingHuman ?? '0') > 0;
  });

  setMaxDeposit(): void {
    this.depositH.set(this.maxDeposit());
  }

  setMaxWithdraw(): void {
    this.withdrawH.set(this.maxWithdraw());
  }

  async doDeposit(): Promise<void> {
    if (!this.canDeposit()) return;

    this.depositing.set(true);

    try {
      await this.farm.deposit(parseUnits(this.depositH().trim(), 18));
      this.depositH.set('');
    } finally {
      this.depositing.set(false);
    }
  }

  async doWithdraw(): Promise<void> {
    if (!this.canWithdraw()) return;

    this.withdrawing.set(true);

    try {
      await this.farm.withdraw(parseUnits(this.withdrawH().trim(), 18));
      this.withdrawH.set('');
    } finally {
      this.withdrawing.set(false);
    }
  }

  async doHarvest(): Promise<void> {
    if (!this.canHarvest()) return;

    this.harvesting.set(true);

    try {
      await this.farm.harvest();
    } finally {
      this.harvesting.set(false);
    }
  }
}
