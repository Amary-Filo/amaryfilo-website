import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletFacade } from '@sandbox/projects/crypto/wallet-tools/services/wallet-facade.service';
import { MarketService } from '@sandbox/projects/crypto/wallet-tools/services/marketplace.service';
import { IMarketplaceItems } from '@sandbox/projects/crypto/wallet-tools/services/marketplace-items';

import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UISpinnerComponent } from '@sandbox/shared/components/spinner/spinner.component';

@Component({
  selector: 'ui-marketplace-items-list',
  imports: [
    UIAccordionComponent,
    UIButtonComponent,
    UISpinnerComponent,
    CommonModule,
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
  standalone: true,
})
export class UIMarketplaceItemsComponent {
  private facade = inject(WalletFacade);
  private market = inject(MarketService);

  items = input<IMarketplaceItems[] | null>(null);
  apt = input<bigint>(0n);

  buyItem = output<number>();
  getItem = output<IMarketplaceItems>();

  readonly status = this.facade.status;
  readonly isItemsLoading = computed(() => this.market.isItemsLoading());
  readonly data = computed<IMarketplaceItems[]>(
    () => this.items() ?? this.market?.usersItems() ?? []
  );
  readonly isAvailable = (price: bigint) => computed(() => this.apt() >= price);
  readonly isItemLoading = (id: number) => this.market.progressState().has(id);

  buy(id: number): void {
    this.buyItem.emit(id);
  }

  getOneItem(item: IMarketplaceItems): void {
    this.getItem.emit(item);
  }
}
