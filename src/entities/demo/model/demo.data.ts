import { IDemoItem } from './demo.types';

export const DEMO_ITEMS: IDemoItem[] = [
  {
    "slug": "angular-ui-architecture-showcase",
    "img": "/enterprise-ui.png",
    "title": "Angular SSR & UI Foundation",
    "text": "Angular 21 reusable UI system with admin dashboards and optional wallet/transaction modules.",
    "summary": "A working technical foundation, not a publicly launched SaaS platform.",
    "description": "Built with Angular 21 standalone components, Signals, SSR/hydration, design tokens and headless UI patterns. The showcase contains reusable tables, filters, charts and admin layouts, plus wagmi/viem wallet and staking transaction examples. The admin and authentication APIs use mock data; the independent demo is not a production backend or customer system.",
    "tags": [
      "Angular 21",
      "SSR",
      "Signals",
      "UI Components",
      "Tables",
      "wagmi / viem"
    ],
    "link": "https://demo.amaryfilo.com/",
    "featured": true
  },
  {
    "slug": "wallet-tools",
    "img": "/wallet-tools.png",
    "title": "Wallet & Staking Tools",
    "text": "Interactive Angular/Web3 examples for staking, auctions, marketplace and transaction states.",
    "summary": "Hands-on demonstrations of wallet integration and contract-facing UI.",
    "description": "Interactive examples of Angular wallet-connected product flows, including staking, auction and marketplace screens, network handling and asynchronous transaction states. The examples are intended for technical exploration and are not a production wallet or security-audited protocol.",
    "tags": [
      "Angular",
      "Web3",
      "Wallet States",
      "Staking",
      "Transactions"
    ],
    "liveUrl": "https://amaryfilo.com/demos/wallet-tools",
    "featured": true
  },
  {
    "slug": "dex-tools",
    "img": "/dex-tools.png",
    "title": "DEX Interaction Tools",
    "text": "Angular demo for swap forms, liquidity, fee and farming interaction flows.",
    "summary": "A frontend-oriented AMM interface and state-management showcase.",
    "description": "Demonstrates swap, liquidity and farming interaction patterns, wallet-connected controls, amount validation and transaction progress. These are illustrative demo flows rather than an independently audited or financially operational DEX protocol.",
    "tags": [
      "Angular",
      "AMM",
      "Liquidity",
      "DeFi",
      "Form State"
    ],
    "liveUrl": "https://amaryfilo.com/demos/dex-tools",
    "featured": true
  }
];
