import { Component, computed, inject, input } from '@angular/core';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIBenefitListComponent } from '../benefit-list/benefit-list.component';
import { StakeViewUI } from '@sandbox/projects/crypto/wallet-tools/services/types';
import { CommonModule } from '@angular/common';
import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { StakingService } from '@sandbox/projects/crypto/wallet-tools/services/staking.service';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { UISpinnerComponent } from '@sandbox/shared/components/spinner/spinner.component';

@Component({
  selector: 'ui-staking-list',
  imports: [
    UIAccordionComponent,
    UIButtonComponent,
    UIBenefitListComponent,
    UISpinnerComponent,
    CommonModule,
  ],
  templateUrl: './staking-list.component.html',
  styleUrl: './staking-list.component.scss',
  standalone: true,
})
export class UIStakingListComponent {
  private facade = inject(WalletFacade);
  private staking = inject(StakingService);
  private tx = inject(TxService);

  items = input<StakeViewUI[] | null>(null);
  isPending = input<boolean>(false);

  readonly data = computed<StakeViewUI[]>(
    () => this.items() ?? this.staking?.listReady() ?? []
  );

  readonly now = this.staking.now;
  readonly status = this.facade.status;
  readonly isWithdraw = computed(() => this.staking.withdrawing());
  readonly isListLoading = computed(() => this.staking.isListLoading());

  async withdraw(idx: number): Promise<void> {
    await this.tx.send(() => this.staking.withdraw(idx));
  }

  formatRemaining(etaMs: number): string {
    const diffSec = Math.max(0, Math.floor((etaMs - this.now()) / 1000));

    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const s = diffSec % 60;

    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);

    if (h > 0) return `${pad(h)}:${pad(m)} hours`;
    return `${pad(m)}:${pad(s)} min`;
  }
}
