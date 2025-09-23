import {
  computed,
  effect,
  inject,
  Injectable,
  OnDestroy,
  signal,
} from '@angular/core';
import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { ContractsService } from './contracts.service';
import { StakeViewUI, TermsSec } from './types';
import { formatUnits } from 'ethers';
import { plannedReward } from './finance';
import { STAKING_TERMS, TERM_BY_SEC } from './constants';

@Injectable()
export class StakingService implements OnDestroy {
  private readonly TOKEN_DECIMALS = 18;

  private tick?: number;
  readonly now = signal(Date.now());

  private _withdrawing = signal<Set<number>>(new Set());
  readonly withdrawing = computed(() => this._withdrawing());

  private wallet = inject(WalletStore);
  private contracts = inject(ContractsService);
  private token = inject(Web3TokenService);

  private _list = signal<StakeViewUI[]>([]);
  readonly list = computed(() => this._list());
  readonly isListLoading = signal<boolean>(true);

  readonly listReady = computed(() =>
    this.list().filter((i) => !i.withdrawn && i.unlockAt * 1000 <= this.now())
  );

  readonly listPending = computed(() =>
    this.list().filter((i) => !i.withdrawn && i.unlockAt * 1000 > this.now())
  );

  constructor() {
    this.tick = window.setInterval(() => this.now.set(Date.now()), 1000);

    effect(() => {
      const status = this.wallet.status();
      const acc = this.wallet.account();

      if (status === 'connected' && acc) this.loadList();
      else {
        this._list.set([]);
        this._withdrawing.set(new Set());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tick) clearInterval(this.tick);
  }

  private setWithdrawing(idx: number, val: boolean): void {
    const s = new Set(this._withdrawing());
    val ? s.add(idx) : s.delete(idx);
    this._withdrawing.set(s);
  }

  async loadList(): Promise<void> {
    this.isListLoading.set(true);
    const address = this.wallet.account();
    const contract = await this.contracts.staking();

    try {
      const count: bigint = await contract.stakesCount(address);
      const n = Number(count);
      const nowSec = Math.floor(Date.now() / 1000);
      const out: StakeViewUI[] = [];

      for (let i = 0; i < n; i++) {
        const s = await contract.getStake(address, i);
        const pending = await contract.pendingReward(address, i);

        const amount: bigint = s.amount as bigint;
        const unlockAt = Number(s.unlockAt);
        const termSec = Number(s.termSec);
        const aprBps = Number(s.aprBps);
        const withdrawn = Boolean(s.withdrawn);

        const rewardPlan = plannedReward(amount, aprBps, termSec);
        const totalPlan = amount + rewardPlan;

        const startSec = unlockAt - termSec;
        const elapsedSec = Math.max(0, Math.min(nowSec, unlockAt) - startSec);
        const progress = termSec > 0 ? Math.min(1, elapsedSec / termSec) : 0;
        const remainingSec = Math.max(0, unlockAt - nowSec);

        const termKey = TERM_BY_SEC[termSec];
        const termLabel = termKey
          ? STAKING_TERMS[termKey].title
          : `${Math.round(termSec / 60)}m`;

        out.push({
          idx: i,
          amount,
          unlockAt,
          termSec,
          aprBps,
          withdrawn,
          pendingReward: pending as bigint,

          dateStart: startSec * 1000,
          amountHuman: formatUnits(amount, this.TOKEN_DECIMALS),
          percentHuman: `${(aprBps / 100).toFixed(2)}% APR`,
          rewardPlanned: rewardPlan,
          rewardPlannedHuman: formatUnits(rewardPlan, this.TOKEN_DECIMALS),
          totalPlanned: totalPlan,
          totalPlannedHuman: formatUnits(totalPlan, this.TOKEN_DECIMALS),
          pendingRewardHuman: formatUnits(
            pending as bigint,
            this.TOKEN_DECIMALS
          ),

          progress,
          remainingSec,
          eta: unlockAt * 1000,

          termKey: termKey ?? ('M60' as TermsSec),
          termLabel,
        });
      }

      this._list.set(out);
    } finally {
      this.isListLoading.set(false);
    }
  }

  async withdraw(idx: number): Promise<void> {
    if (this._withdrawing().has(idx)) return;

    this.setWithdrawing(idx, true);

    try {
      const contract = await this.contracts.staking();
      const tx = await contract.withdraw(idx);

      await tx.wait?.();
      await this.loadList();
    } finally {
      this.setWithdrawing(idx, false);
    }
  }

  async stake(amountWei: bigint, termKey: TermsSec): Promise<any> {
    const contract = await this.contracts.staking();
    const astAddress = this.contracts.getAddress('AST');
    const stakingAddress = this.contracts.getAddress('STAKING');

    await this.token.ensureAllowance(astAddress, stakingAddress, amountWei);

    const termSec = STAKING_TERMS[termKey].time * 60;
    return contract.stake(amountWei, termSec);
  }
}
