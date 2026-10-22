import { IWorkItem } from './work.types';

// Selected work. Client work is described without links to private or retired systems.
export const WORK_ITEMS: IWorkItem[] = [
  {
    "id": "fitness-product",
    "title": "Independent Fitness Product",
    "meta": "Independent · Product engineering · 2026–Present",
    "summary": "An in-development fitness application spanning backend APIs, a web authentication client and an early mobile shell.",
    "description": "Designing and validating an end-to-end fitness product. The NestJS/TypeScript backend uses Prisma and PostgreSQL for authentication, exercise catalogs, workout plans, schedules, sessions and history. A Next.js/React web client implements email OTP, session reconciliation, TanStack Query and generated API clients with Playwright tests. React Native/Expo is at the initial app stage. The product is locally tested and has not been publicly launched.",
    "tags": [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Next.js",
      "React",
      "React Native",
      "Playwright"
    ],
    "group": "featured",
    "year": "2026"
  },
  {
    "id": "angular-foundation",
    "title": "Reusable Angular SSR Foundation",
    "meta": "Independent · Frontend architecture · 2025–Present",
    "summary": "A reusable Angular 21 foundation with headless UI, data-heavy admin blocks and an optional Web3 transaction layer.",
    "description": "Built an Angular 21 standalone/Signals SSR and hydration foundation with design tokens, accessible UI primitives, table and filter patterns, chart/dashboard compositions and themes. An optional Web3 layer uses wagmi/viem for wallet connections, approvals, staking and transaction-state handling. Authentication and admin endpoints in the showcase are mocked: this is a technical foundation and demo, not a launched SaaS product.",
    "tags": [
      "Angular 21",
      "SSR",
      "Signals",
      "Headless UI",
      "Design Tokens",
      "Data Tables",
      "wagmi / viem"
    ],
    "liveUrl": "https://demo.amaryfilo.com/",
    "group": "featured",
    "year": "2025–2026"
  },
  {
    "id": "unlimit-kyb",
    "title": "Corporate KYB / KYC Onboarding",
    "meta": "Unlimit · Banking & compliance · 2023–2025",
    "summary": "Angular onboarding flows for corporate verification, stakeholder roles, document submission and asynchronous compliance checks.",
    "description": "Delivered the initial Angular onboarding MVP in three weeks and developed role-based journeys, sequential document uploads, RxJS state orchestration and integration with backend/KYC services. A mock API server supported independent frontend work. The product later onboarded 300+ companies; the Product Owner estimated roughly 90% less manual onboarding effort.",
    "tags": [
      "Angular",
      "RxJS",
      "TypeScript",
      "KYB / KYC",
      "API Contracts",
      "Async Workflows"
    ],
    "group": "featured",
    "year": "2023–2025"
  },
  {
    "id": "unlimit-pult",
    "title": "Banking Operations Backoffice",
    "meta": "Unlimit · Internal banking tools · 2024–2025",
    "summary": "Internal account and permission management with data tables, filtering, pagination and an Angular 19/Signals rebuild.",
    "description": "Owned frontend delivery of an internal banking backoffice, including account, card and login management, permission-sensitive flows and reusable page-state logic for filtering, sorting, pagination and data refresh. Later modernized the application with Angular 19, Signals and RxJS.",
    "tags": [
      "Angular 19",
      "Signals",
      "RxJS",
      "Permissions",
      "Data Grids",
      "REST APIs"
    ],
    "group": "featured",
    "year": "2024–2025"
  },
  {
    "id": "ducatus-wallet",
    "title": "Ducatus Wallet Ecosystem",
    "meta": "Rock’n’Block · Web, mobile & backend · 2019–2022",
    "summary": "Non-custodial wallet across web, iOS and Android, combining product delivery, native integrations and selected backend work.",
    "description": "Owned Angular/Ionic wallet frontend and mobile releases for a product with approximately 10,000 users. Worked on vouchers, locked deposits, token integrations, transaction signing and cross-platform incidents. Implemented selected Node.js/Express and MongoDB-backed wallet APIs and client SDK methods and a Cordova bridge for Tangem NFC hardware-card signing.",
    "tags": [
      "Angular",
      "Ionic",
      "Cordova",
      "Node.js",
      "Express",
      "MongoDB",
      "Wallets",
      "NFC"
    ],
    "group": "featured",
    "year": "2019–2022"
  },
  {
    "id": "minto-finance",
    "title": "Minto Finance",
    "meta": "Rock’n’Block · React / DeFi · 2021",
    "summary": "Production React/TypeScript/MobX application for token presales, staking, rewards and wallet transactions.",
    "description": "Built the core React frontend and UI/UX, including MobX app state, wallet connection, USDT-based token purchases, allowance/approval transactions, locked and unlocked staking, withdrawals, reward calculations and user statistics. The app was launched; additional contributors later maintained contract-address configuration.",
    "tags": [
      "React",
      "TypeScript",
      "MobX",
      "Web3.js",
      "Staking",
      "Token Approvals"
    ],
    "group": "featured",
    "year": "2021"
  },
  {
    "id": "unlimit-banking-migration",
    "title": "Banking Web App Modernization",
    "meta": "Unlimit · Angular platform · 2024",
    "summary": "Angular 14-to-17 migration for a banking web application serving around 1,500 daily users.",
    "description": "Led a focused three-engineer migration of an established Angular banking web app, preserving existing account and operational workflows without rewriting the entire system. Work centered on compatibility, frontend architecture, delivery continuity and cross-team coordination.",
    "tags": [
      "Angular",
      "TypeScript",
      "Architecture",
      "Migration",
      "Banking"
    ],
    "group": "product",
    "year": "2024"
  },
  {
    "id": "unlimit-extension",
    "title": "Internal Browser Wallet Extension",
    "meta": "Unlimit · Wallet engineering · 2022–2023",
    "summary": "Working internal prototype for a non-custodial browser wallet and custom dApp interface; not publicly released.",
    "description": "Built an internal browser extension with injected scripts, service workers, origin-based permissions, session state and QR/WebSocket mobile pairing. Designed the custom dApp-facing API and cross-context synchronization. The initiative was not publicly launched.",
    "tags": [
      "TypeScript",
      "Browser APIs",
      "Web3",
      "Wallet Connection",
      "WebSockets"
    ],
    "group": "product",
    "year": "2022–2023"
  },
  {
    "id": "less-bridge",
    "title": "LESS Bridge",
    "meta": "Rock’n’Block · React / Web3 · 2021",
    "summary": "Production React/Redux cross-chain transfer UI with EVM and Tron wallets, token approvals and transaction states.",
    "description": "Developed frontend network selection and provider adapters for Ethereum-compatible networks and Tron, integrating balances, allowance checks, fee calculation, transaction submission, pending/error handling and a backend API client. Worked with Redux and Web3.js; this repository contains frontend integrations, not the blockchain protocol backend.",
    "tags": [
      "React",
      "Redux",
      "Web3.js",
      "EVM",
      "TronWeb",
      "Cross-chain"
    ],
    "group": "product",
    "year": "2021"
  },
  {
    "id": "axion-dapps",
    "title": "Axion Staking & Auctions",
    "meta": "Rock’n’Block · Angular / Web3 · 2020–2021",
    "summary": "Production Angular staking, auctions and claim flows connected to MetaMask and smart contracts.",
    "description": "Developed Angular/TypeScript transaction interfaces for deposits, staking terms, token claims, auction participation and withdrawals. Integrated account and contract states using RxJS, Web3.js and BigNumber calculations; the role was frontend and smart-contract integration rather than Solidity contract authoring.",
    "tags": [
      "Angular",
      "RxJS",
      "Web3.js",
      "MetaMask",
      "BigNumber",
      "Staking"
    ],
    "group": "product",
    "year": "2020–2021"
  },
  {
    "id": "axion-dashboard",
    "title": "Axion Analytics Dashboard",
    "meta": "Rock’n’Block · Angular / REST · 2020–2021",
    "summary": "Separate production Angular application with financial charts, staking profiles, market statistics and news administration.",
    "description": "Built a data-heavy Angular app with API-driven financial charts and overview widgets, user staking histories, BigNumber normalization, profile and market views, periodic refresh and an administrative news editor. Consumed existing REST services; this was a separate application from the Axion transaction frontend.",
    "tags": [
      "Angular",
      "TypeScript",
      "REST APIs",
      "Charts",
      "Financial Data",
      "Admin UI"
    ],
    "group": "product",
    "year": "2020–2021"
  },
  {
    "id": "token-protector",
    "title": "TokenProtector",
    "meta": "Rock’n’Block · Angular / Web3 · 2019–2020",
    "summary": "Angular/Web3 frontend built from first requirements through release for token protection and contract workflows.",
    "description": "Implemented the frontend from an initial product brief, including wallet connection, contract-creation UI, token approval, status presentation, transaction progress and localization. The work involved integration with existing smart contracts, not writing the underlying protocol.",
    "tags": [
      "Angular",
      "Web3",
      "WalletConnect",
      "Token Approvals",
      "Product Delivery"
    ],
    "group": "product",
    "year": "2019–2020"
  },
  {
    "id": "connect-wallet-sdk",
    "title": "AMFI Connect Wallet SDK",
    "meta": "Rock’n’Block / Open source · TypeScript library · 2021",
    "summary": "Reusable TypeScript/RxJS wallet provider connection library used by commercial Web3 applications.",
    "description": "Created a wallet-connection abstraction for applications using browser wallets and WalletConnect, including provider availability, connection state and chain/account handling. The library was integrated into Minto Finance and designed to reduce repeated wallet setup across projects.",
    "tags": [
      "TypeScript",
      "RxJS",
      "Web3",
      "WalletConnect",
      "SDK"
    ],
    "group": "product",
    "year": "2021"
  },
  {
    "id": "nodamatics-platform",
    "title": "Staking Frontend Platform",
    "meta": "Nodamatics · Angular / infrastructure integration · 2022",
    "summary": "Angular/Nx monorepo and gRPC integrations for staking-oriented Ethereum services.",
    "description": "Restructured an Nx frontend workspace into modules and shared packages, integrated generated gRPC clients and worked with backend services connected to an Ethereum-related node. Coordinated a two-person team and supported CI delivery.",
    "tags": [
      "Angular",
      "Nx",
      "gRPC",
      "TypeScript",
      "Ethereum"
    ],
    "group": "product",
    "year": "2022"
  },
  {
    "id": "gms-commerce",
    "title": "Custom E-commerce & CMS Applications",
    "meta": "Grand Media Service · Full-stack web · 2016–2019",
    "summary": "Custom PHP/Laravel/October CMS websites with MySQL, catalog, checkout and business integrations.",
    "description": "Delivered more than ten client websites and maintained over thirty, including custom CMS admin tools, ORM-based data models, catalogs, carts, discounts, checkout/payment integrations, CRM connections and server-side business logic. Work covered requirements, frontend development, database migrations, deployment and maintenance.",
    "tags": [
      "PHP",
      "Laravel",
      "October CMS",
      "MySQL",
      "Eloquent",
      "E-commerce"
    ],
    "group": "commercial",
    "year": "2016–2019"
  },
  {
    "id": "wallarm-marketing",
    "title": "Wallarm Marketing Platform",
    "meta": "Wallarm · Web integrations · 2019",
    "summary": "Localized campaign pages, CMS-backed content and lead-generation integrations for cybersecurity marketing.",
    "description": "Built and maintained marketing pages with JavaScript, LESS and Webpack, integrated Contentful and HubSpot lead forms and configured analytics for campaign attribution and lead tracking. This was marketing/web platform work, not the core security product.",
    "tags": [
      "JavaScript",
      "Webpack",
      "LESS",
      "HubSpot",
      "Contentful",
      "Analytics"
    ],
    "group": "commercial",
    "year": "2019"
  },
  {
    "id": "gravity-hub",
    "title": "Gravity Hub Website",
    "meta": "Rock’n’Block · Vue / Nuxt · 2020",
    "summary": "Client website delivered with Nuxt/Vue, reusable sections, responsive layouts and informational registration flows.",
    "description": "Built the Nuxt/Vue site from supplied designs and tasks with responsive page sections, navigation and community-related interactions. This commercial project complements the larger transactional Web3 applications; its registration surface is primarily informational.",
    "tags": [
      "Vue",
      "Nuxt",
      "SCSS",
      "Responsive UI"
    ],
    "group": "commercial",
    "year": "2020"
  }
];
