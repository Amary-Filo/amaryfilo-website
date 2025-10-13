import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { ethers } from 'ethers';

import { formatToken } from '@sandbox/shared/web3/utils/units';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { ContractsService } from './contracts.service';
import { BalancesService } from './balances.service';

@Injectable()
export class FarmService {
  private contracts = inject(ContractsService);
  private wallet = inject(WalletStore);
  private balances = inject(BalancesService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private inflight: Promise<void> | null = null;

  readonly summary = signal<{
    rpsHuman: string;
    pendingHuman: string;
    stakedLpHuman: string;
  } | null>(null);

  constructor() {
    effect(() => {
      const status = this.wallet.status();
      const acc = this.wallet.account();

      if (status === 'connected' && acc) untracked(() => this.refresh());
      else {
        this.summary.set(null);
        this.loading.set(true);
      }
    });
  }

  async refresh(): Promise<void> {
    if (this.inflight) return this.inflight;

    if (!this.summary()) this.loading.set(true);
    this.error.set(null);

    this.inflight = (async () => {
      try {
        const farm = await this.contracts.farmRead();
        const acc = this.wallet.account();
        if (!acc) return;

        const [rps, pending, user] = await Promise.all([
          farm.rewardPerSecond() as Promise<bigint>,
          farm.pendingRewards(acc) as Promise<bigint>,
          farm.users(acc) as Promise<{ amount: bigint }>,
        ]);

        this.summary.set({
          rpsHuman: formatToken(rps),
          pendingHuman: formatToken(pending),
          stakedLpHuman: formatToken(user.amount),
        });
      } catch (e: any) {
        this.error.set(e?.message ?? 'Farm refresh failed');
      } finally {
        this.loading.set(false);
        this.inflight = null;
      }
    })();

    return this.inflight;
  }

  private async ensureLpAllowance(amountWei: bigint) {
    const farm = await this.contracts.farmRead();
    const lp = await this.contracts.pairRead('PAIR_AST_APT');
    const owner = this.wallet.account();
    if (!owner) throw new Error('Wallet not connected');

    const spender = await farm.getAddress();
    const alw = (await lp.allowance(owner, spender)) as bigint;
    if (alw >= amountWei) return;

    const lpW = await this.contracts.pairWrite('PAIR_AST_APT');
    const tx = await lpW.approve(spender, ethers.MaxUint256);
    await tx.wait();
  }

  async deposit(amountWei: bigint) {
    const farm = await this.contracts.farm();
    const owner = this.wallet.account();
    if (!owner) throw new Error('Wallet not connected');

    await this.ensureLpAllowance(amountWei);
    const tx = await farm.deposit(amountWei);
    await tx.wait();

    await this.balances.refresh(owner);
    await this.refresh();
  }

  async withdraw(amountWei: bigint) {
    const farm = await this.contracts.farm();
    const owner = this.wallet.account();
    if (!owner) throw new Error('Wallet not connected');

    const tx = await farm.withdraw(amountWei);
    await tx.wait();

    await this.balances.refresh(owner);
    await this.refresh();
  }

  async harvest() {
    const farm = await this.contracts.farm();
    const owner = this.wallet.account();
    if (!owner) throw new Error('Wallet not connected');

    const tx = await farm.harvest();
    await tx.wait();

    await this.balances.refresh(owner);
    await this.refresh();
  }
}
