// src/entities/demo/model/demo.data.ts

import { IDemoItem } from './demo.types';

export const DEMO_ITEMS: IDemoItem[] = [
  {
    slug: 'wallet-tools',
    img: '/wallet-tools.png',
    title: 'Wallet Tools',
    text: 'Angular/Web3 demo covering staking, auction, marketplace, and wallet-connected product flows.',
    code: '',
    featured: true,
  },
  {
    slug: 'dex-tools',
    img: '/dex-tools.png',
    title: 'DEX Tools',
    text: 'Angular/Web3 demo covering swaps, liquidity, farming, LP flows, and AMM-style mechanics.',
    code: '',
    featured: true,
  },
];
