import {
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LiquidityService,
  PAIR_TOKENS,
  QuickInfo,
} from '@sandbox/projects/crypto/dex-tools/services/liquidity.service';

import { UISkeletonComponent } from '@sandbox/shared/components/skeleton/skeleton.component';
import {
  InputChooseValues,
  UIInputChooseComponent,
} from '@sandbox/shared/components/input-choose/input-choose.component';

import {
  PairKey,
  TokenKey,
} from '@sandbox/projects/crypto/dex-tools/services/contracts/addresses';

@Component({
  selector: 'ui-liquidity-info',
  templateUrl: './liquidity-info.component.html',
  styleUrl: './liquidity-info.component.scss',
  imports: [CommonModule, UISkeletonComponent, UIInputChooseComponent],
  standalone: true,
})
export class UILiquidityInfoComponent {
  private liq = inject(LiquidityService);

  readonly pairs = this.liq.pairs;
  readonly pairItems: InputChooseValues[] = this.pairs.map((v) => ({
    title: v.label,
    value: v.key,
  }));

  selectedPair = output<PairKey>();

  pair = signal<PairKey>('PAIR_AST_APT');
  tokenA = computed<TokenKey>(() => PAIR_TOKENS[this.pair()][0]);
  tokenB = computed<TokenKey>(() => PAIR_TOKENS[this.pair()][1]);
  pairLabel = computed(
    () => this.pairs.find((p) => p.key === this.pair())?.label
  );

  loadingQuick = signal<boolean>(true);
  info = signal<QuickInfo | null>(null);

  constructor() {
    effect(() => this.loadQuick());
    effect(() => this.selectedPair.emit(this.pair()));
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
}
