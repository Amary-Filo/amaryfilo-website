// src/entities/demo/model/demo.data.ts

import { IDemoItem } from './demo.types';

export const DEMO_ITEMS: IDemoItem[] = [
  {
    slug: 'angular-ui-architecture-showcase',
    img: '/enterprise-ui.png',
    title: 'Hybrid Web3 & Enterprise UI Showcase',
    text: 'Angular 21 demo combining transactional Web3 staking flows with data-heavy B2B admin interfaces.',
    summary:
      'Production-grade Angular architecture built with Feature-Sliced Design (FSD), showcasing both DeFi flows and Enterprise data grids.',
    description:
      'This platform is a comprehensive dual-purpose showcase of my frontend architecture capabilities using Angular 19+ and FSD. It proves that complex domains can coexist cleanly in one codebase. The Web3 module features a complete dApp flow (wallet connection, Sepolia network detection, smart contract staking, and transaction states). The Enterprise module demonstrates a reusable B2B admin dashboard with complex data grids, multi-layer popover filtering, robust error handling, and dense layouts combining charts with tables. The entire showcase supports dynamic theming (Light/Dark/Auto) and localization (EN/RU).',
    tags: ['Angular 21', 'FSD', 'Web3 Staking', 'Complex Data Grids', 'Theming & i18n'],
    link: 'https://demo.amaryfilo.com',
    featured: true,
  },
  {
    slug: 'wallet-tools',
    img: '/wallet-tools.png',
    title: 'DeFi Wallet Tools',
    text: 'Angular/Web3 demo covering staking, auction, marketplace, and wallet-connected product flows.',
    summary:
      'Full-stack Web3 marketplace demo with custom smart contracts deployed to Sepolia testnet.',
    description:
      'A technical showcase of bridging Angular with blockchain logic. I engineered both the frontend architecture and the underlying smart contracts for staking and auction mechanics. The demo highlights complex state management for wallet connections, handling asynchronous blockchain transaction states (pending, success, revert), and seamless network switching.',
    tags: ['Angular', 'Web3', 'Smart Contracts', 'Sepolia', 'Transactions'],
    code: 'https://github.com/Amary-Filo/amaryfilo-website/tree/master/src/features/wallet-tools',
    liveUrl: 'https://amaryfilo.com/demos/wallet-tools',
    featured: true,
  },
  {
    slug: 'dex-tools',
    img: '/dex-tools.png',
    title: 'AMM DEX Tools',
    text: 'Angular/Web3 demo covering swaps, liquidity, farming, LP flows, and AMM-style mechanics.',
    summary:
      'DeFi interface demonstrating protocol-facing interactions and mathematical UI state updates.',
    description:
      'This demo explores Automated Market Maker (AMM) mechanics on the frontend. It focuses on protocol-facing flows: calculating slippage, displaying price impact, managing liquidity pool (LP) shares, and yield farming interactions. The architecture connects complex mathematical state updates with a responsive Angular UI, ensuring users get real-time feedback before signing transactions.',
    tags: ['DeFi', 'AMM', 'Liquidity Pools', 'Angular', 'Web3'],
    code: 'https://github.com/Amary-Filo/amaryfilo-website/tree/master/src/features/dex-tools',
    liveUrl: 'https://amaryfilo.com/demos/dex-tools',
    featured: true,
  },
];
