import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesService } from '@sandbox/projects/crypto/dex-tools/services/balances.service';
import { FarmService } from '@sandbox/projects/crypto/dex-tools/services/farm.service';

import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';

import { parseToken } from '@sandbox/shared/web3/utils/units';

@Component({
  selector: 'ui-farming-form',
  templateUrl: './farming-form.component.html',
  styleUrl: './farming-form.component.scss',
  imports: [CommonModule, UIInputComponent, UIButtonComponent],
  standalone: true,
})
export class UIFarmFormComponent {
  private farm = inject(FarmService);
  private balances = inject(BalancesService);

  depositH = signal<string>('');
  withdrawH = signal<string>('');

  depositing = signal<boolean>(false);
  withdrawing = signal<boolean>(false);
  harvesting = signal<boolean>(false);

  readonly loading = this.farm.loading;
  readonly summary = this.farm.summary;

  maxDeposit = computed(() => this.balances.pairAstApt().formatted);
  maxWithdraw = computed(() => this.summary()?.stakedLpHuman ?? '0');

  canDeposit = computed(() => !!this.depositH() && !this.depositing());
  canWithdraw = computed(() => !!this.withdrawH() && !this.withdrawing());
  canHarvest = computed(
    () => !this.harvesting() && Number(this.summary()?.pendingHuman ?? '0') > 0
  );

  async doDeposit() {
    if (!this.canDeposit()) return;
    this.depositing.set(true);

    try {
      await this.farm.deposit(parseToken(this.depositH()));
      this.depositH.set('');
    } catch (e) {
      console.warn('deposit failed', e);
    } finally {
      this.depositing.set(false);
    }
  }

  async doWithdraw() {
    if (!this.canWithdraw()) return;
    this.withdrawing.set(true);

    try {
      await this.farm.withdraw(parseToken(this.withdrawH()));
      this.withdrawH.set('');
    } catch (e) {
      console.warn('withdraw failed', e);
    } finally {
      this.withdrawing.set(false);
    }
  }

  async doHarvest() {
    if (!this.canHarvest()) return;
    this.harvesting.set(true);

    try {
      await this.farm.harvest();
    } catch (e) {
      console.warn('harvest failed', e);
    } finally {
      this.harvesting.set(false);
    }
  }
}
