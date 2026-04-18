// src/features/wallet-tools/services/marketplace/marketplace.types.ts

export type MarketplaceItemType = 'link' | 'download';

export interface MarketplaceItem {
  id: number;
  title: string;
  price: string;
  priceWei: bigint;
  type: MarketplaceItemType;
  value: string;

  isBought?: boolean;
  isPartial?: boolean;
  paidWei?: bigint;
  remainingWei?: bigint;
  remainingHuman?: string;
  pricePartialHuman?: string;
}

export type PurchaseUI = {
  itemId: number;
  priceWei: bigint;
  priceAPT: string;
  txHash?: string;
  blockNumber?: number;
  timestamp?: number;
};
