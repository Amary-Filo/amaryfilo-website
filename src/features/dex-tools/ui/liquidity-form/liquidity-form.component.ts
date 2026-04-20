// src/features/dex-tools/ui/liquidity-form/liquidity-form.component.ts

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { parseUnits } from 'viem';

import { CryptoBalanceFacade } from '@entities';
import { UIButton, UIFormField, UIInput } from '@ui/kit';

import { LiquidityService, PAIR_TOKENS } from '../../services/liquidity/liquidity.service';
import type {
  DexPairKey,
  DexTokenKey,
  PairQuickInfo,
} from '../../services/liquidity/liquidity.types';

@Component({
  selector: 'liquidity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, UIButton, UIFormField, UIInput],
  templateUrl: './liquidity-form.component.html',
  styleUrl: './liquidity-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidityFormComponent {
  private readonly liquidity = inject(LiquidityService);
  private readonly balances = inject(CryptoBalanceFacade);

  readonly pair = signal<DexPairKey>('PAIR_AST_APT');

  readonly amountAH = signal('');
  readonly amountBH = signal('');
  readonly lpToRemoveH = signal('');

  readonly isAdding = signal(false);
  readonly isRemoving = signal(false);
  readonly linkByRatio = signal(true);

  readonly loadingQuick = signal(true);
  readonly info = signal<PairQuickInfo | null>(null);

  readonly pairs = this.liquidity.pairs;
  readonly tokenA = computed<DexTokenKey>(() => PAIR_TOKENS[this.pair()][0]);
  readonly tokenB = computed<DexTokenKey>(() => PAIR_TOKENS[this.pair()][1]);
  readonly pairLabel = computed(
    () => this.pairs.find((item) => item.key === this.pair())?.label ?? '',
  );

  readonly maxA = computed(() => this.getTokenBalance(this.tokenA()));
  readonly maxB = computed(() => this.getTokenBalance(this.tokenB()));
  readonly maxLP = computed(() => this.info()?.myLp ?? '0');

  readonly canAdd = computed(() => {
    if (this.isAdding()) return false;
    if (!this.amountAH().trim() || !this.amountBH().trim()) return false;

    try {
      return (
        parseUnits(this.amountAH().trim(), 18) > 0n && parseUnits(this.amountBH().trim(), 18) > 0n
      );
    } catch {
      return false;
    }
  });

  readonly canRemove = computed(() => {
    if (this.isRemoving()) return false;
    if (!this.lpToRemoveH().trim()) return false;

    try {
      return parseUnits(this.lpToRemoveH().trim(), 18) > 0n;
    } catch {
      return false;
    }
  });

  constructor() {
    effect(() => {
      void this.loadQuickInfo();
      this.amountAH.set('');
      this.amountBH.set('');
      this.lpToRemoveH.set('');
    });

    effect(() => {
      const value = this.amountAH().trim();
      const pair = this.pair();
      const tokenA = this.tokenA();

      if (!this.linkByRatio()) return;

      if (!value) {
        this.amountBH.set('');
        return;
      }

      void this.updateRatioAmount(pair, tokenA, value);
    });
  }

  private getTokenBalance(token: DexTokenKey): string {
    const key = token === 'AST' ? 'TOKEN_AST' : token === 'APT' ? 'TOKEN_APT' : 'WETH';
    const item = this.balances.items().find((entry) => entry.key === key);
    return item?.human ?? '0';
  }

  private async loadQuickInfo(): Promise<void> {
    this.loadingQuick.set(true);

    try {
      const info = await this.liquidity.quickInfo(this.pair());
      this.info.set(info);
    } catch {
      this.info.set(null);
    } finally {
      this.loadingQuick.set(false);
    }
  }

  private async updateRatioAmount(
    pair: DexPairKey,
    tokenA: DexTokenKey,
    amountAHuman: string,
  ): Promise<void> {
    try {
      const quote = await this.liquidity.quoteAddByRatio(pair, tokenA, amountAHuman);
      this.amountBH.set(quote.amountBHuman);
    } catch {
      this.amountBH.set('');
    }
  }

  setPair(pair: DexPairKey): void {
    this.pair.set(pair);
  }

  setMaxA(): void {
    this.amountAH.set(this.maxA());
  }

  setMaxB(): void {
    this.amountBH.set(this.maxB());
  }

  setMaxLP(): void {
    this.lpToRemoveH.set(this.maxLP());
  }

  onRatioToggle(event: Event): void {
    this.linkByRatio.set((event.target as HTMLInputElement).checked);
  }

  async add(): Promise<void> {
    if (!this.canAdd()) return;

    this.isAdding.set(true);

    try {
      await this.liquidity.addLiquidity(
        this.pair(),
        this.tokenA(),
        this.tokenB(),
        parseUnits(this.amountAH().trim(), 18),
        parseUnits(this.amountBH().trim(), 18),
      );

      await this.loadQuickInfo();
      this.amountAH.set('');
      this.amountBH.set('');
    } finally {
      this.isAdding.set(false);
    }
  }

  async remove(): Promise<void> {
    if (!this.canRemove()) return;

    this.isRemoving.set(true);

    try {
      await this.liquidity.removeLiquidity(this.pair(), parseUnits(this.lpToRemoveH().trim(), 18));

      await this.loadQuickInfo();
      this.lpToRemoveH.set('');
    } finally {
      this.isRemoving.set(false);
    }
  }
}
