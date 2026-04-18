// src/features/wallet-tools/services/marketplace/marketplace.service.ts

import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { formatUnits } from 'viem';
import { getPublicClient, waitForTransactionReceipt, writeContract } from '@wagmi/core';

import { wagmiConfig, asAppChainId } from '@lib/web3';
import { AccountFacade } from '@entities';
import { WALLET_TOOLS_CONFIG } from '../../wallet-tools.config';
import { ensureErc20Allowance } from '../staking/staking.utils';
import { MARKETPLACE_ITEMS } from './marketplace.items';
import { MarketplaceItem, PurchaseUI } from './marketplace.types';

const APT_DECIMALS = 18;
const ZERO = 0n;

@Injectable()
export class MarketplaceService {
  private readonly account = inject(AccountFacade);

  private readonly catalogSignal = signal<MarketplaceItem[]>(
    MARKETPLACE_ITEMS.map((item) => this.resetRuntime(item)),
  );
  readonly catalog = this.catalogSignal.asReadonly();

  private readonly myPurchasesSignal = signal<PurchaseUI[]>([]);
  readonly myPurchases = this.myPurchasesSignal.asReadonly();

  readonly usersItems = computed(() => this.catalog().filter((item) => item.isBought));
  readonly availableItems = computed(() => this.catalog().filter((item) => !item.isBought));

  readonly isItemsLoading = signal(false);

  private readonly progressSignal = signal<Set<number>>(new Set());
  readonly progressState = this.progressSignal.asReadonly();

  private inFlight: Promise<void> | null = null;
  private readonly loadedForKey = signal<string | null>(null);

  constructor() {
    effect(() => {
      const address = this.account.address();
      const chainId = this.account.chainId();
      const canUseDemo = this.account.canUseDemo();

      if (!address || !chainId || !canUseDemo) {
        this.resetState();
        return;
      }

      const key = this.getLoadKey(address, chainId);
      if (this.loadedForKey() === key) return;

      this.loadedForKey.set(key);
      void this.reload();
    });
  }

  private getLoadKey(address: string, chainId: number): string {
    return `${chainId}:${address.toLowerCase()}`;
  }

  private resetState(): void {
    this.catalogSignal.set(MARKETPLACE_ITEMS.map((item) => this.resetRuntime(item)));
    this.myPurchasesSignal.set([]);
    this.progressSignal.set(new Set());
    this.loadedForKey.set(null);
    this.isItemsLoading.set(false);
  }

  private setProgress(id: number, value: boolean): void {
    const next = new Set(this.progressSignal());
    value ? next.add(id) : next.delete(id);
    this.progressSignal.set(next);
  }

  async reload(): Promise<void> {
    if (this.inFlight) return this.inFlight;

    this.inFlight = this.refreshFromEvents().finally(() => {
      this.inFlight = null;
    });

    return this.inFlight;
  }

  async refreshCatalog(): Promise<void> {
    this.loadedForKey.set(null);
    await this.reload();
  }

  private async refreshFromEvents(): Promise<void> {
    const address = this.account.address();
    const chainId = this.account.chainId();

    if (!address || !chainId) {
      this.resetState();
      return;
    }

    const appChainId = asAppChainId(chainId);
    const market = WALLET_TOOLS_CONFIG.contracts.MARKET;

    this.isItemsLoading.set(true);

    try {
      const publicClient = getPublicClient(wagmiConfig, {
        chainId: appChainId,
      });

      if (!publicClient) {
        throw new Error('Public client is not available');
      }

      const events = await publicClient.getContractEvents({
        address: market.address,
        abi: market.abi,
        eventName: 'Purchased',
        fromBlock: 0n,
        toBlock: 'latest',
        args: {
          buyer: address,
        },
      });

      const sums = new Map<number, bigint>();
      const purchases: PurchaseUI[] = [];

      for (const event of events) {
        const args = event.args as {
          buyer?: string;
          itemId?: bigint;
          price?: bigint;
        };

        const itemId = Number(args.itemId ?? 0n);
        const priceWei = args.price ?? 0n;

        if (!itemId || priceWei <= 0n) continue;

        sums.set(itemId, (sums.get(itemId) ?? ZERO) + priceWei);

        purchases.push({
          itemId,
          priceWei,
          priceAPT: formatUnits(priceWei, APT_DECIMALS),
          txHash: event.transactionHash,
          blockNumber: Number(event.blockNumber),
        });
      }

      this.myPurchasesSignal.set(purchases);

      this.catalogSignal.set(
        MARKETPLACE_ITEMS.map((item) =>
          this.recomputeRuntime({
            ...item,
            paidWei: sums.get(item.id) ?? ZERO,
          }),
        ),
      );
    } finally {
      this.isItemsLoading.set(false);
    }
  }

  async buy(itemId: number): Promise<void> {
    const chainId = this.account.chainId();
    if (!chainId) return;

    const appChainId = asAppChainId(chainId);
    const item = this.catalog().find((entry) => entry.id === itemId);
    if (!item) throw new Error('Unknown marketplace item');

    if (this.progressState().has(itemId)) return;

    const paid = item.paidWei ?? ZERO;
    const remainingWei = paid >= item.priceWei ? ZERO : item.priceWei - paid;
    if (remainingWei === ZERO) return;

    const apt = WALLET_TOOLS_CONFIG.contracts.TOKEN_APT;
    const market = WALLET_TOOLS_CONFIG.contracts.MARKET;

    this.setProgress(itemId, true);

    try {
      await ensureErc20Allowance({
        chainId: appChainId,
        tokenAddress: apt.address,
        tokenAbi: apt.abi,
        spender: market.address,
        amountWei: remainingWei,
      });

      const hash = await writeContract(wagmiConfig, {
        address: market.address,
        abi: market.abi,
        functionName: 'buy',
        args: [BigInt(itemId), remainingWei] as const,
        chainId: appChainId,
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash,
        chainId: appChainId,
      });

      this.loadedForKey.set(null);
      await this.reload();
    } finally {
      this.setProgress(itemId, false);
    }
  }

  openItem(item: MarketplaceItem): void {
    if (!item.isBought) return;

    if (item.type === 'link') {
      window.open(item.value, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.type === 'download') {
      const link = document.createElement('a');
      link.href = `/assets/files/${item.value}`;
      link.download = item.value.split('/').pop() || 'file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private recomputeRuntime(item: MarketplaceItem): MarketplaceItem {
    const paid = item.paidWei ?? ZERO;
    const isBought = paid >= item.priceWei;
    const remainingWei = isBought ? ZERO : item.priceWei - paid;

    return {
      ...item,
      isBought,
      isPartial: !isBought && paid > ZERO,
      remainingWei,
      remainingHuman: formatUnits(remainingWei, APT_DECIMALS),
      pricePartialHuman: paid > ZERO ? formatUnits(paid, APT_DECIMALS) : undefined,
    };
  }

  private resetRuntime(item: MarketplaceItem): MarketplaceItem {
    return {
      ...item,
      paidWei: undefined,
      isBought: false,
      isPartial: false,
      remainingWei: item.priceWei,
      remainingHuman: formatUnits(item.priceWei, APT_DECIMALS),
      pricePartialHuman: undefined,
    };
  }
}
