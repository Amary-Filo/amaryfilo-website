import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'ethers';

import { WalletStore } from '@sandbox/shared/web3/core/wallet.store';
import { Web3TokenService } from '@sandbox/shared/web3/services/web3-token.service';
import { ContractsService } from './contracts.service';

import { MARKETPLACE_ITEMS, IMarketplaceItems } from './marketplace-items';

const APT_DECIMALS = 18;
const ZERO = 0n;

export type PurchaseUI = {
  itemId: number;
  priceWei: bigint;
  priceAPT: string;
  txHash?: string;
  blockNumber?: number;
  timestamp?: number;
};

@Injectable()
export class MarketService {
  private contracts = inject(ContractsService);
  private wallet = inject(WalletStore);
  private token = inject(Web3TokenService);

  private bound = false;

  private _catalog = signal<IMarketplaceItems[]>(MARKETPLACE_ITEMS);
  readonly catalog = this._catalog.asReadonly();

  readonly usersItems = computed(() =>
    this._catalog().filter((i) => i.isBought)
  );
  readonly availableItems = computed(() =>
    this._catalog().filter((i) => !i.isBought)
  );

  private _myPurchases = signal<PurchaseUI[]>([]);
  readonly myPurchases = this._myPurchases.asReadonly();

  private _paidMap = computed<Map<number, bigint>>(() => {
    const m = new Map<number, bigint>();

    for (const p of this._myPurchases())
      m.set(p.itemId, (m.get(p.itemId) ?? ZERO) + p.priceWei);

    return m;
  });

  readonly itemsWithState = computed(() => {
    const paid = this._paidMap();

    return this._catalog().map((it) => {
      const paidWei = paid.get(it.id) ?? ZERO;
      const purchased = paidWei >= it.priceWei;
      const remainingWei = purchased ? ZERO : it.priceWei - paidWei;
      const pricePartial = paidWei > ZERO ? paidWei : undefined;

      return {
        ...it,
        isPartial: !purchased && paidWei > ZERO,
        pricePartial,
        remainingWei,
        remainingHuman: formatUnits(remainingWei, APT_DECIMALS),
      };
    });
  });

  private _progress = signal<Set<number>>(new Set());
  readonly progressState = computed(() => this._progress());
  private setProgress(id: number, v: boolean) {
    this._progress.update((s) => {
      const n = new Set(s);
      v ? n.add(id) : n.delete(id);
      return n;
    });
  }

  readonly isItemsLoading = signal<boolean>(true);

  constructor() {
    effect(() => {
      const status = this.wallet.status();
      const account = this.wallet.account();

      if (status === 'connected' && account) {
        this.refreshFromEvents().catch(() => {});
        this.bindEvents().catch(() => {});
      } else {
        this._catalog.update((list) => list.map((it) => this.resetRuntime(it)));
        this._progress.set(new Set());
        this.isItemsLoading.set(false);
      }
    });
  }

  async buy(itemId: number) {
    const item = this._catalog().find((i) => i.id === itemId);
    if (!item) throw new Error('Unknown item');
    if (this._progress().has(itemId)) return;

    const paid = item.paidWei ?? ZERO;
    const remaining = paid >= item.priceWei ? ZERO : item.priceWei - paid;

    if (remaining === ZERO) return;

    this.setProgress(itemId, true);

    try {
      const market = await this.contracts.market();
      const aptAddr = this.contracts.getAddress('APT');
      const marketAddr = this.contracts.getAddress('MARKET');

      await this.token.ensureAllowance(aptAddr, marketAddr, remaining);

      const tx = await market.buy(itemId, remaining);
      await tx.wait?.();

      this.applyPurchaseToCatalog(itemId, remaining);
    } finally {
      this.setProgress(itemId, false);
    }
  }

  private async refreshFromEvents() {
    const account = this.wallet.account();
    if (!account) return;

    const market = await this.contracts.marketRead();
    const filter = market.filters.Purchased(account, null, null);
    const events = await market.queryFilter(filter);
    const sums = new Map<number, bigint>();

    for (const ev of events) {
      const user = String(ev.args[0]).toLowerCase();
      if (user !== account.toLowerCase()) continue;

      const itemId = Number(ev.args[1]);
      const priceWei = ev.args[2] as bigint;

      sums.set(itemId, (sums.get(itemId) ?? ZERO) + priceWei);
    }

    this._catalog.update((list) =>
      list.map((it) =>
        this.recomputeRuntime({ ...it, paidWei: sums.get(it.id) ?? ZERO })
      )
    );

    this.isItemsLoading.set(false);
  }

  private async bindEvents() {
    if (this.bound) return;
    this.bound = true;

    const market = await this.contracts.marketRead();
    const address = this.wallet.account()?.toLocaleLowerCase();

    market.on(market.filters.Purchased(), async (ev: any) => {
      const user = ev.args[0];
      if (user.toLowerCase() !== address) return;

      const id = ev.args[1];
      const priceAPT = ev.args[2];

      this.applyPurchaseToCatalog(Number(id), priceAPT);
    });
  }

  private applyPurchaseToCatalog(itemId: number, addWei: bigint) {
    if (addWei <= ZERO) return;

    this._catalog.update((list) =>
      list.map((it) => {
        if (it.id !== itemId) return it;
        const paid = (it.paidWei ?? ZERO) + addWei;
        return this.recomputeRuntime({ ...it, paidWei: paid });
      })
    );
  }

  private recomputeRuntime(it: IMarketplaceItems): IMarketplaceItems {
    const paid = it.paidWei ?? ZERO;
    const isBought = paid >= it.priceWei;
    const remainingWei = isBought ? ZERO : it.priceWei - paid;

    return {
      ...it,
      isBought,
      isPartial: !isBought && paid > ZERO,
      remainingWei,
      remainingHuman: formatUnits(remainingWei, APT_DECIMALS),
      pricePartialHuman:
        paid > ZERO ? formatUnits(paid, APT_DECIMALS) : undefined,
    };
  }

  private resetRuntime(it: IMarketplaceItems): IMarketplaceItems {
    return {
      ...it,
      paidWei: undefined,
      isBought: false,
      isPartial: false,
      remainingWei: it.priceWei,
      remainingHuman: formatUnits(it.priceWei, APT_DECIMALS),
      pricePartialHuman: undefined,
    };
  }
}
