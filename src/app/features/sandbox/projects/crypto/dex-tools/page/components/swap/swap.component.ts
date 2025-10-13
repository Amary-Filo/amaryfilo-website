import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesService } from '../../../services/balances.service';
import { SwapService } from '../../../services/swap.service';

import { RowTitleContentComponent } from '../row-title-content/row-title-content.component';
import { BalancesComponent } from '../balances/balances.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UISkeletonComponent } from '@sandbox/shared/components/skeleton/skeleton.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UISelectComponent } from '@sandbox/shared/components/select/select.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';
import { InputChooseValues } from '@sandbox/shared/components/input-choose/input-choose.component';

import { TokenKey } from '../../../services/contracts/addresses';
import { formatToken } from '@sandbox/shared/web3/utils/units';

@Component({
  selector: 'sbx-dex-tools-swap-tab',
  imports: [
    CommonModule,
    RowTitleContentComponent,
    UIAccordionComponent,
    BalancesComponent,
    UISkeletonComponent,
    UIButtonComponent,
    UIInputComponent,
    UISelectComponent,
  ],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.scss',
  standalone: true,
})
export class DexToolsSwapComponent {
  private svc = inject(SwapService);
  private balance = inject(BalancesService);

  private readonly slippageValues = ['0.1', '0.5', '1'];
  readonly slippagePresets: InputChooseValues[] = this.slippageValues.map(
    (value) => ({
      title: value,
      value: value,
    })
  );

  readonly tokens: TokenKey[] = this.svc.tokens;

  isLoading = this.svc.isLoadingReserves;
  tokenIn = signal<TokenKey>('AST');
  tokenOut = signal<TokenKey>('APT');
  amount = signal<string>('');
  slippage = signal<string>('0.5');

  loadingQuote = signal(true);
  isSwapInProgress = signal(false);
  quote = signal<Awaited<ReturnType<SwapService['quoteExactIn']>> | null>(null);

  tokenItems = this.tokens.map((t) => ({ value: t, label: t }));
  toItems = computed(() =>
    this.tokens
      .filter(
        (t) =>
          this.svc.isDirectionAllowed(this.tokenIn(), t) && t !== this.tokenIn()
      )
      .map((t) => ({ value: t, label: t }))
  );

  readonly max = computed(
    () => this.balance.getTokenBalance(this.tokenIn()).formatted
  );
  readonly toOptions = computed(() =>
    this.tokens.filter(
      (t) =>
        this.svc.isDirectionAllowed(this.tokenIn(), t) && t !== this.tokenIn()
    )
  );
  readonly pairLabel = computed(() =>
    [this.tokenIn(), this.tokenOut()].slice().join('/')
  );

  constructor() {
    effect(() => {
      const amt = this.amount().trim();
      const tin = this.tokenIn();
      const tout = this.tokenOut();

      if (!amt || amt === '0') {
        this.quote.set(null);
        return;
      }

      const pairKey =
        (tin === 'AST' && tout === 'APT') || (tin === 'APT' && tout === 'AST')
          ? 'PAIR_AST_APT'
          : 'PAIR_AST_WETH';

      const needSpinner = !this.svc.isFresh(pairKey);
      if (needSpinner) this.loadingQuote.set(true);

      this.updateQuote().finally(() => {
        if (needSpinner) this.loadingQuote.set(false);
      });
    });

    effect(() => {
      if (this.tokenOut() === undefined) {
        const first = this.toItems()[0]?.value as TokenKey | undefined;
        if (first) this.tokenOut.set(first);
      }
    });
  }

  feeHuman = () => (this.quote() ? formatToken(this.quote()!.feeWei) : '0');

  flip() {
    const a = this.tokenIn();
    const b = this.tokenOut();
    this.tokenIn.set(b);
    this.tokenOut.set(a);

    if (!this.svc.isDirectionAllowed(a, b)) {
      const opts = this.toOptions();
      this.tokenOut.set(opts[0] ?? (a === 'AST' ? 'APT' : 'AST'));
    }
  }

  private async updateQuote() {
    const amount = this.amount().trim();
    if (!amount || amount === '0' || amount === '0.0') {
      this.quote.set(null);
      return;
    }

    try {
      const quote = await this.svc.quoteExactIn(
        this.tokenIn(),
        this.tokenOut(),
        amount,
        +this.slippage()
      );

      this.quote.set(quote);
    } catch (e: any) {
      console.log(e?.message ?? 'Quote failed');
      this.quote.set(null);
    } finally {
      this.isSwapInProgress.set(false);
    }
  }

  async swap() {
    if (this.isSwapInProgress()) return;

    if (!this.quote()) {
      await this.updateQuote();
      if (!this.quote()) return;
    }

    this.isSwapInProgress.set(true);

    try {
      const deadline = Math.floor(Date.now() / 1000) + 600;

      await this.svc.swapExactIn(
        this.tokenIn(),
        this.tokenOut(),
        this.amount().trim(),
        this.quote()!.minOutWei,
        deadline
      );

      this.amount.set('');
      this.quote.set(null);
    } catch (e: any) {
      console.log(e?.message ?? 'Swap failed');
    } finally {
      this.isSwapInProgress.set(false);
    }
  }
}
