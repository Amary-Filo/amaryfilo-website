// src/features/dex-tools/ui/swap-form/swap-form.component.ts

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

import { UIButton, UIFormField, UIInput, UISelect } from '@ui/kit';
import { CryptoBalanceFacade } from '@entities';

import { SwapService } from '../../services/swap/swap.service';
import type { DexPairKey, DexTokenKey, QuoteResult } from '../../services/swap/swap.types';

@Component({
  selector: 'swap-form',
  standalone: true,
  imports: [CommonModule, FormsModule, UIButton, UIFormField, UIInput, UISelect],
  templateUrl: './swap-form.component.html',
  styleUrl: './swap-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapFormComponent {
  private readonly swapService = inject(SwapService);
  private readonly balances = inject(CryptoBalanceFacade);

  readonly slippageValues = ['0.1', '0.5', '1'];

  readonly tokens: DexTokenKey[] = this.swapService.tokens;
  readonly tokenOptions = this.tokens;

  readonly tokenIn = signal<DexTokenKey>('AST');
  readonly tokenOut = signal<DexTokenKey>('APT');
  readonly amount = signal('');
  readonly slippage = signal('0.5');

  readonly loadingQuote = signal(false);
  readonly isSwapInProgress = signal(false);
  readonly quote = signal<QuoteResult | null>(null);

  readonly toOptions = computed(() =>
    this.tokens.filter(
      (token) =>
        this.swapService.isDirectionAllowed(this.tokenIn(), token) && token !== this.tokenIn(),
    ),
  );

  readonly max = computed(() => {
    const key =
      this.tokenIn() === 'AST' ? 'TOKEN_AST' : this.tokenIn() === 'APT' ? 'TOKEN_APT' : 'WETH';

    const token = this.balances.items().find((item) => item.key === key);
    return token?.human ?? '0';
  });

  readonly pairLabel = computed(() => `${this.tokenIn()}/${this.tokenOut()}`);
  readonly feeHuman = computed(() => this.quote()?.feeHuman ?? '0');

  readonly canSwap = computed(() => {
    if (this.isSwapInProgress()) return false;
    if (this.loadingQuote()) return false;
    if (!this.amount().trim()) return false;
    return !!this.quote();
  });

  constructor() {
    effect(() => {
      const amount = this.amount().trim();
      const tokenIn = this.tokenIn();
      const tokenOut = this.tokenOut();

      if (!amount || amount === '0' || amount === '0.0') {
        this.quote.set(null);
        return;
      }

      const pairKey = this.swapService.getPairKey(tokenIn, tokenOut);
      const showLoading = !this.swapService.isFresh(pairKey as DexPairKey);

      if (showLoading) {
        this.loadingQuote.set(true);
      }

      void this.updateQuote().finally(() => {
        if (showLoading) {
          this.loadingQuote.set(false);
        }
      });
    });

    effect(() => {
      const allowed = this.toOptions();
      if (!allowed.includes(this.tokenOut())) {
        this.tokenOut.set(allowed[0] ?? 'APT');
      }
    });
  }

  setSlippage(value: string): void {
    this.slippage.set(value);
  }

  setMax(): void {
    this.amount.set(this.max());
  }

  flip(): void {
    const currentIn = this.tokenIn();
    const currentOut = this.tokenOut();

    this.tokenIn.set(currentOut);

    if (this.swapService.isDirectionAllowed(currentOut, currentIn)) {
      this.tokenOut.set(currentIn);
      return;
    }

    const nextOptions = this.tokens.filter(
      (token) => this.swapService.isDirectionAllowed(currentOut, token) && token !== currentOut,
    );

    this.tokenOut.set(nextOptions[0] ?? 'AST');
  }

  private async updateQuote(): Promise<void> {
    const amount = this.amount().trim();

    if (!amount || amount === '0' || amount === '0.0') {
      this.quote.set(null);
      return;
    }

    try {
      const quote = await this.swapService.quoteExactIn(
        this.tokenIn(),
        this.tokenOut(),
        amount,
        Number(this.slippage()),
      );

      this.quote.set(quote);
    } catch {
      this.quote.set(null);
    }
  }

  async swap(): Promise<void> {
    if (!this.canSwap()) return;

    const currentQuote = this.quote();
    if (!currentQuote) return;

    this.isSwapInProgress.set(true);

    try {
      const deadline = Math.floor(Date.now() / 1000) + 600;

      await this.swapService.swapExactIn(
        this.tokenIn(),
        this.tokenOut(),
        this.amount().trim(),
        currentQuote.minOutWei,
        deadline,
      );

      this.amount.set('');
      this.quote.set(null);
    } finally {
      this.isSwapInProgress.set(false);
    }
  }

  trackByValue(_: number, value: string): string {
    return value;
  }
}
