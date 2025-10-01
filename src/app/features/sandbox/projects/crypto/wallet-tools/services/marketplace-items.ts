import { parseToken } from '@sandbox/shared/web3/utils/units';

export type IMarketplaceItemsType = 'link' | 'download';

export interface IMarketplaceItems {
  id: number;
  title: string;
  price: string;
  priceWei: bigint;
  type: IMarketplaceItemsType;
  value: string;
  isBought?: boolean;
  isPartial?: boolean;
  paidWei?: bigint;
  remainingWei?: bigint;
  remainingHuman?: string;
  pricePartialHuman?: string;
}

export const MARKETPLACE_ITEMS: IMarketplaceItems[] = [
  {
    id: 1,
    title: 'Amary Filo video setup',
    price: '1',
    priceWei: parseToken('1', 18),
    type: 'download',
    value: 'pdf/amfi-setup.pdf',
  },
  {
    id: 2,
    title: 'Amary Filo private Channel',
    price: '30',
    priceWei: parseToken('30', 18),
    type: 'link',
    value: 'https://t.me/amaryfilo_bot',
  },
  {
    id: 3,
    title: 'Component 1: Extended',
    price: '1.52',
    priceWei: parseToken('1.52', 18),
    type: 'download',
    value: 'components/component-1.zip',
  },
  {
    id: 4,
    title: 'Component 2: Extended',
    price: '1.2',
    priceWei: parseToken('1.2', 18),
    type: 'download',
    value: 'components/component-2.zip',
  },
  {
    id: 5,
    title: 'Useful website for css',
    price: '0.05',
    priceWei: parseToken('0.05', 18),
    type: 'link',
    value: 'https://uiverse.io/',
  },
  {
    id: 6,
    title: 'Landing 1: Full code',
    price: '4.35',
    priceWei: parseToken('4.35', 18),
    type: 'download',
    value: 'landings/landing-1.zip',
  },
  {
    id: 7,
    title: 'Component 3: Extended',
    price: '0.64',
    priceWei: parseToken('0.64', 18),
    type: 'download',
    value: 'components/component-3.zip',
  },
];
