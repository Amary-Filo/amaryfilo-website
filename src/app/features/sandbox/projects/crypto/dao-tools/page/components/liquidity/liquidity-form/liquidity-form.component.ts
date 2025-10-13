import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesService } from '@sandbox/projects/crypto/dao-tools/services/balances.service';
import {
  LiquidityService,
  PAIR_TOKENS,
  QuickInfo,
} from '@sandbox/projects/crypto/dao-tools/services/liquidity.service';

import { InputChooseValues } from '@sandbox/shared/components/input-choose/input-choose.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UILiquidityInfoComponent } from '../liquidity-info/liquidity-info.component';

import {
  PairKey,
  TokenKey,
} from '@sandbox/projects/crypto/dao-tools/services/contracts/addresses';
import { parseToken } from '@sandbox/shared/web3/utils/units';

@Component({
  selector: 'ui-liquidity-form',
  templateUrl: './liquidity-form.component.html',
  styleUrl: './liquidity-form.component.scss',
  imports: [
    CommonModule,
    UIInputComponent,
    UIButtonComponent,
    UILiquidityInfoComponent,
  ],
  standalone: true,
})
export class UILiquidityFormComponent {
  private liq = inject(LiquidityService);
  private balances = inject(BalancesService);

  readonly pairs = this.liq.pairs;
  readonly pairItems: InputChooseValues[] = Object.entries(this.pairs).map(
    ([_key, value]) => ({
      title: value.label,
      value: value.key,
    })
  );

  pair = model<PairKey>('PAIR_AST_APT');
  tokenA = computed<TokenKey>(() => PAIR_TOKENS[this.pair()][0]);
  tokenB = computed<TokenKey>(() => PAIR_TOKENS[this.pair()][1]);
  pairLabel = computed(
    () => this.pairs.find((p) => p.key === this.pair())?.label
  );

  amountAH = signal<string>('');
  amountBH = signal<string>('');
  lpToRemoveH = signal<string>('');

  isAdding = signal<boolean>(false);
  isRemoving = signal<boolean>(false);

  linkByRatio = signal<boolean>(true);
  loadingQuick = signal<boolean>(true);
  info = signal<QuickInfo | null>(null);

  maxA = computed(() => this.balances.getTokenBalance(this.tokenA()).formatted);
  maxB = computed(() => this.balances.getTokenBalance(this.tokenB()).formatted);
  maxLP = computed(() =>
    this.pair() === 'PAIR_AST_APT'
      ? this.balances.pairAstApt().formatted
      : this.balances.pairAstWeth().formatted
  );

  constructor() {
    effect(() => {
      this.loadQuick();
      this.amountAH.set('');
      this.amountBH.set('');
      this.lpToRemoveH.set('');
    });

    effect(async () => {
      if (!this.linkByRatio()) return;
      const a = this.amountAH().trim();

      if (!a) {
        this.amountBH.set('');
        return;
      }

      try {
        const q = await this.liq.quoteAddByRatio(this.pair(), this.tokenA(), a);
        this.amountBH.set(q.amountBHuman);
      } catch {
        this.amountBH.set('');
      }
    });
  }

  setLinkByRatio(e: Event) {
    this.linkByRatio.set((e.target as HTMLInputElement).checked);
  }

  private async loadQuick() {
    this.loadingQuick.set(true);
    try {
      const pair = await this.liq.quickInfo(this.pair());
      this.info.set(pair);
    } catch {
      this.info.set(null);
    } finally {
      this.loadingQuick.set(false);
    }
  }

  async add() {
    if (this.isAdding()) return;
    const a = this.amountAH().trim();
    const b = this.amountBH().trim();
    if (!a || !b) return;

    try {
      this.isAdding.set(true);

      await this.liq.addLiquidity(
        this.pair(),
        this.tokenA(),
        this.tokenB(),
        parseToken(a),
        parseToken(b)
      );

      await this.loadQuick();
      this.amountAH.set('');
      this.amountBH.set('');
    } finally {
      this.isAdding.set(false);
    }
  }

  async remove() {
    if (this.isRemoving()) return;
    const lp = this.lpToRemoveH().trim();
    if (!lp) return;

    try {
      this.isAdding.set(true);
      await this.liq.removeLiquidity(this.pair(), parseToken(lp));

      await this.loadQuick();
      this.lpToRemoveH.set('');
    } finally {
      this.isAdding.set(false);
    }
  }
}
