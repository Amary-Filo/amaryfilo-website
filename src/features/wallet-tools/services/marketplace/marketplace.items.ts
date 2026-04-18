// src/features/wallet-tools/services/marketplace/marketplace.items.ts

import { parseUnits } from 'viem';
import { MarketplaceItem } from './marketplace.types';

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 1,
    title: 'Setup info',
    price: '1',
    priceWei: parseUnits('1', 18),
    type: 'download',
    value: 'demo/amfi-setup.pdf',
  },
  {
    id: 2,
    title: 'Private Channel',
    price: '30',
    priceWei: parseUnits('30', 18),
    type: 'link',
    value: 'https://t.me/amaryfilo_bot',
  },
  {
    id: 3,
    title: 'Component 1',
    price: '1.52',
    priceWei: parseUnits('1.52', 18),
    type: 'download',
    value: 'demo/component-1.zip',
  },
  {
    id: 4,
    title: 'Component 2',
    price: '1.2',
    priceWei: parseUnits('1.2', 18),
    type: 'download',
    value: 'demo/component-2.zip',
  },
  {
    id: 5,
    title: 'Useful links for CSS',
    price: '0.05',
    priceWei: parseUnits('0.05', 18),
    type: 'link',
    value: 'https://uiverse.io/',
  },
  {
    id: 6,
    title: 'Landing 1',
    price: '4.35',
    priceWei: parseUnits('4.35', 18),
    type: 'download',
    value: 'demo/landing-1.zip',
  },
  {
    id: 7,
    title: 'Component 3',
    price: '0.64',
    priceWei: parseUnits('0.64', 18),
    type: 'download',
    value: 'demo/component-3.zip',
  },
];
