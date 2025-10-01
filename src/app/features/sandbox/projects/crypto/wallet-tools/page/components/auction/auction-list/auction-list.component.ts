import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { TxService } from '@sandbox/shared/web3/core/tx.service';
import { BalancesService } from '@sandbox/projects/crypto/wallet-tools/services/balances.service';
import { AuctionService } from '@sandbox/projects/crypto/wallet-tools/services/auction.service';

import { UISpinnerComponent } from '@sandbox/shared/components/spinner/spinner.component';
import { UILotBenefitListComponent } from '../lot-benefit-list/lot-benefit-list.component';
import { UIPullContentComponent } from '../pull-content/pull-content.component';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';

import {
  AuctionPoolStatus,
  AuctionPoolUI,
} from '@sandbox/projects/crypto/wallet-tools/services/types';
import { parseToken } from '@sandbox/shared/web3/utils/units';

@Component({
  selector: 'ui-auction-list',
  imports: [
    UIAccordionComponent,
    UILotBenefitListComponent,
    UIPullContentComponent,
    UISpinnerComponent,
    CommonModule,
  ],
  templateUrl: './auction-list.component.html',
  styleUrl: './auction-list.component.scss',
  standalone: true,
})
export class UIAuctionListComponent {
  private facade = inject(WalletFacade);
  private auction = inject(AuctionService);
  private balances = inject(BalancesService);
  private tx = inject(TxService);

  readonly ast = computed(() => this.balances.formatAst());
  readonly isWithdrawn = (id: number) =>
    this.auction.progressWithdraw().has(id);
  readonly isLoading = (id: number) => this.auction.progressState().has(id);

  items = input<AuctionPoolUI[] | null>(null);
  isPending = input<boolean>(false);
  type = input<AuctionPoolStatus>('active');

  readonly data = computed<AuctionPoolUI[]>(
    () => this.items() ?? this.auction?.poolsWithdraw() ?? []
  );

  readonly now = this.auction.now;
  readonly status = this.facade.status;
  readonly isWithdraw = computed(() => this.auction.progressState());
  readonly isListLoading = computed(() => this.auction.isPoolsLoading());

  private refreshed = new Set<number>();

  remaining(pool: AuctionPoolUI): string {
    const { id, status, endTime } = pool;
    const now = this.now();
    const diffSec = Math.max(0, Math.floor((endTime - now) / 1000));

    if (status === 'active' && diffSec === 0 && !this.refreshed.has(id)) {
      this.refreshed.add(id);

      this.auction
        .refreshOne(id)
        .then((updated) => {
          if (updated && updated.status === 'active') {
            setTimeout(() => {
              this.auction
                .refreshOne(id)
                .finally(() => this.refreshed.delete(id));
            }, 1000);
          } else this.refreshed.delete(id);
        })
        .catch(() => this.refreshed.delete(id));
    }

    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const s = diffSec % 60;
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    return h > 0 ? `${pad(h)}:${pad(m)} hours` : `${pad(m)}:${pad(s)} min`;
  }

  async bid(id: number, event: string) {
    if (!event || ['0', '0.0'].includes(event)) return;

    await this.tx.send(() => this.auction.bid(id, parseToken(event))),
      {
        onStart: (s: any) => console.log('step started / tx hash?', s.hash),
        onSuccess: async (s: any) => {
          console.log('stake mined', s.receipt);
        },
        onError: (s: any) => {
          console.warn('stake error', s.error);
        },
      };
  }

  async withdraw(id: number) {
    await this.tx.send(() => this.auction.settle(id)),
      {
        onStart: (s: any) => console.log('step started / tx hash?', s.hash),
        onSuccess: async (s: any) => {
          console.log('stake mined', s.receipt);
        },
        onError: (s: any) => {
          console.warn('stake error', s.error);
        },
      };
  }
}
