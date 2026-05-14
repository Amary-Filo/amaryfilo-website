// src/entities/work/model/work.data.ts

import { IWorkItem } from './work.types';

export const WORK_ITEMS: IWorkItem[] = [
  {
    id: 'kyb-onboarding-portal',
    title: 'B2B KYB/KYC Onboarding Portal',
    meta: 'Banking platform · Frontend delivery · 2025',
    summary:
      'Role-based onboarding platform featuring automated identity verification, dynamic document uploads, and multi-user invitation flows.',
    description:
      'A mission-critical B2B onboarding platform rescued and launched in just 4 weeks. Delivered a role-based frontend handling complex workflows: company stakeholder invitations, secure document uploads, and automated Sumsub KYC integration. Replaced monolithic forms with streamlined Angular Material interfaces, cutting manual processing overhead by 90% and successfully onboarding 300+ corporate clients.',
    tags: ['KYB / KYC', 'B2B Onboarding', 'Role-based routing', 'Sumsub', 'Angular'],
    liveUrl: 'https://kyb.unlimit.com',
    group: 'featured',
    year: '2024',
  },
  {
    id: 'ibanking-platform',
    title: 'iBanking Client Platform',
    meta: 'Banking product · Frontend architecture · 2023',
    summary:
      'High-load banking interface for corporate clients, focusing on account management, secure chats, and complex operational workflows.',
    description:
      'Led the frontend modernization and delivery of a core banking platform handling high daily active users (DAU). Focused on critical product domains including accounts management, secure client-bank chat interfaces, and transaction history. Prevented a high-risk framework rewrite by standardizing the Angular architecture and streamlining cross-team feature delivery.',
    tags: ['Banking UI', 'Accounts & Chat', 'Complex Data Grids', 'Angular', 'BFF'],
    liveUrl: 'https://onlinebank.unlimit.com',
    group: 'featured',
    year: '2024',
  },
  {
    id: 'web3-wallet-extension',
    title: 'Web3 Non-Custodial Extension',
    meta: 'Wallet product · Frontend owner · 2023',
    summary:
      'Browser-based crypto wallet featuring a custom QR-based connection model, cross-tab state syncing, and external dApp interaction APIs.',
    description:
      'Engineered a non-custodial browser wallet extension from scratch to production in 3 months. Bypassed traditional password-entry friction by implementing a seamless QR-based connection model. Delivered cross-tab synchronization for security states and developed custom browser APIs to bridge the wallet with external Web3 ecosystems, enabling MetaMask-like connection behaviors.',
    tags: ['Browser Extension', 'Web3 Wallet', 'QR-based Auth', 'State Sync', 'dApp API'],
    group: 'featured',
    year: '2023',
  },
  {
    id: 'internal-admin',
    title: 'Internal Banking Admin Panel',
    meta: 'Internal tool · Rapid delivery & modernization · 2025',
    summary:
      'Operational dashboard for managing banking entities, accounts, permissions, and internal workflows.',
    description:
      'An internal banking admin panel built under tight deadlines during a core system migration. Delivered the initial usable MVP in just one week, implementing complex data grids, entity linking, and filtering without full specifications. Later autonomously refactored the entire application to Angular 19 and Signals, eliminating 70% of duplicate logic and drastically improving UI maintainability.',
    tags: ['Internal Tools', 'Angular 19', 'Signals', 'Complex Tables', 'Rapid Delivery'],
    group: 'featured',
    year: '2024',
  },
  {
    id: 'amfi-connect',
    title: 'AMFI Connect',
    meta: 'Wallet connection package · Integration layer · 2022',
    summary:
      'Reusable wallet connection layer for browser extensions, mobile wallets, and QR-based connection flows across crypto products.',
    description:
      'AMFI Connect is a reusable wallet connection package designed to support browser wallet extensions, mobile wallet flows, and QR-based connection entry points. It was built as an integration layer to reduce repeated connection logic across crypto products and provide a cleaner foundation for wallet onboarding, network handling, and account access.',
    tags: ['Wallet entry', 'Connection UX', 'Network handling', 'Reusable layer'],
    codeUrl: 'https://github.com/amaryfilo/connect-wallet',
    liveUrl: 'https://www.npmjs.com/package/@amfi/connect-wallet',
    group: 'product',
    year: '2022',
  },
  {
    id: 'ducatus-wallet',
    title: 'Ducatus Wallet',
    meta: 'Wallet product · Frontend / product delivery · 2021',
    summary:
      'Wallet application for iOS, Android, and web, covering wallet-facing flows, token operations, and product modules for real user actions.',
    description:
      'Ducatus Wallet was a wallet product delivered across iOS, Android, and web. The work included wallet-facing product flows, transaction handling, token operations, API integration, and delivery of user-facing modules such as deposits, swap-related flows, and crypto purchase support. It represents practical work on a real wallet product with multi-platform delivery constraints.',
    tags: ['Wallet UX', 'Mobile/web product surfaces', 'Swap & deposit flows', 'Transactions'],
    codeUrl: 'https://github.com/DucatusX/ducatus-copay',
    liveUrl: 'https://apps.apple.com/ru/app/ducatus-wallet-2-0/id1489722627',
    group: 'product',
    year: '2021',
  },

  {
    id: 'axion-dashboard',
    title: 'Axion Dashboard',
    meta: 'Dashboard product · Angular frontend · 2021',
    summary:
      'Frontend dashboard for managing cryptocurrency balances, wallet-connected interactions, and account-facing token flows.',
    description:
      'Axion Dashboard was a frontend dashboard product focused on account-facing token operations, cryptocurrency balances, wallet-connected interactions, and product-facing dashboard UX. Processing significant token volumes, the work included Angular frontend implementation, product structure, theming, API and Web3 integration.',
    tags: ['Dashboard UI', 'Wallet-connected flows', 'Theming', 'API and Web3 integration'],
    group: 'product',
    year: '2021',
  },
  {
    id: 'rocknblock-website',
    title: 'Rocknblock Website',
    meta: 'Company platform · Frontend / website delivery · 2022',
    summary:
      'Official company website with multiple landing pages, SEO-oriented frontend work, content structure, and publishing support.',
    description:
      'Rocknblock Website was a company platform and marketing website with multiple landing pages, structured content delivery, lead-oriented forms, SEO-focused frontend implementation, and support for ongoing publishing. The work reflects commercial frontend delivery beyond pure UI — including content structure, form flows, and practical website scalability.',
    tags: ['SEO', 'Content structure', 'Forms', 'Publishing flows', 'Multi-page delivery'],
    liveUrl: 'https://rocknblock.io/',
    group: 'commercial',
    year: '2022',
  },
  {
    id: 'minto',
    title: 'Minto',
    meta: 'Crypto product · React / Web3 frontend · 2021',
    summary:
      'Token-oriented crypto product with staking flows, chart integration, account connection, and smart contract-facing interactions.',
    description:
      'Minto was a crypto product built with React and Web3-oriented frontend flows. The work included staking interactions, account connection, contract-facing actions, chart integration, and token-related product surfaces.',
    tags: ['Staking', 'Wallet connection', 'Chart integration', 'Contract-facing frontend'],
    liveUrl: 'http://minto.finance',
    group: 'product',
    year: '2021',
  },
  {
    id: 'rubic-exchange',
    title: 'Rubic Exchange',
    meta: 'Exchange product · Angular / Web3 frontend · 2020',
    summary:
      'Early crypto exchange frontend work focused on product launch, wallet-connected flows, and multi-chain-oriented interface delivery.',
    description:
      'Rubic Exchange involved frontend work on an early-stage exchange product in the crypto/Web3 space. The project focused on launch-oriented product delivery, wallet-connected interfaces, transaction-facing flows, and practical support for a product surface that later evolved into a larger standalone direction.',
    tags: ['Exchange UI', 'Wallet flows', 'Launch delivery', 'Multi-chain direction'],
    codeUrl: 'https://github.com/Cryptorubic/rubic-app',
    liveUrl: 'https://rubic.exchange',
    group: 'product',
    year: '2020',
  },
  {
    id: 'algovest',
    title: 'Algovest',
    meta: 'Crypto product · Angular / staking flows · 2021',
    summary:
      'Angular-based crypto product with staking flows, wallet-connected actions, and contract-facing account interactions.',
    description:
      'Algovest was a crypto product focused on staking-related flows, wallet-connected account actions, and contract-facing user interactions. The implementation included blockchain transactions, stake request handling, timed withdrawals, and MetaMask-based account access, later extended through AMFI Connect.',
    tags: ['Staking', 'Wallets', 'Transactions', 'Smart contracts', 'Multi-chain direction'],
    codeUrl: 'https://github.com/Am-Filo/algovest-cp',
    group: 'product',
    year: '2021',
  },
  {
    id: 'axion',
    title: 'Axion',
    meta: 'Token product · Angular / Web3 frontend · 2020',
    summary:
      'Token-oriented frontend for claim, auctions, deposits, and contract-facing crypto interactions.',
    description:
      'Axion was a Web3 product built around claim flows, auction participation, deposit mechanics, and smart contract interactions. The project included complex token logic, time-based product behaviour, API integration, wallet login through MetaMask, and multiple rounds of product redesign while preserving the core transaction model.',
    tags: ['Claim flows', 'Auctions', 'Deposits', 'Transactions', 'Smart contracts'],
    group: 'product',
    year: '2020',
  },
  {
    id: 'token-protector',
    title: 'Token Protector',
    meta: 'Web3 product · Angular / contract UI · 2019',
    summary:
      'Contract-oriented frontend for time-based token protection, wallet connection, and transaction-driven user flows.',
    description:
      'Token Protector was a Web3-oriented product for creating and managing contract-based token protection flows. The interface covered network selection, contract creation, token approval, wallet connection, transaction execution, contract status handling, and user-facing multi-step interaction around smart contract logic.',
    tags: ['Contract UI', 'Wallet connection', 'Stepper flow', 'Transactions', 'SEO'],
    codeUrl: 'https://github.com/swaps-network/tokenprotector-frontend',
    group: 'product',
    year: '2019',
  },
  {
    id: 'quras-wallet',
    title: 'Quras Wallet',
    meta: 'Wallet product · Angular / Ionic delivery · 2021',
    summary:
      'Multi-platform wallet application covering wallet modules, API integration, redesign work, and crypto purchase flows.',
    description:
      'Quras Wallet was delivered across iOS, Android, and web, with work spanning redesign, module delivery, API integration, wallet-related product flows, and fiat-to-crypto purchase support. The product also included backend-connected wallet functionality and real delivery constraints across mobile and web surfaces.',
    tags: ['Wallet UX', 'Ionic', 'Multi-platform delivery', 'Moonpay', 'Transactions'],
    group: 'product',
    year: '2021',
  },
  {
    id: 'census-wallet',
    title: 'Census Wallet',
    meta: 'Wallet product · Angular / Ionic delivery · 2020',
    summary:
      'Wallet application with transaction flows, redesign work, API integration, and multi-chain-oriented product delivery.',
    description:
      'Census Wallet was a multi-platform wallet product built around connected accounts, transactions, redesign work, API integration, and broader wallet functionality. The implementation included crypto purchase integration, server-side wallet work, and device-oriented integrations such as Tangem support through a custom Cordova plugin.',
    tags: ['Wallet UX', 'Tangem', 'Transactions', 'Multi-chain', 'Bridge / swap direction'],
    group: 'product',
    year: '2020',
  },
  {
    id: 'quras-wallet-client',
    title: 'Quras+ Wallet Client',
    meta: 'Wallet backend support · APIs / blockchain interfaces · 2021',
    summary:
      'Backend-side wallet support for blockchain integration, APIs, multi-chain logic, and transaction-oriented product infrastructure.',
    description:
      'Quras+ Wallet Client focused on the server-side support required for a wallet product, including blockchain integration, package updates, API creation, multi-chain support, and transaction-related backend infrastructure. It complements frontend wallet work by showing understanding of the broader wallet delivery surface.',
    tags: ['REST API', 'Multi-chain', 'Transactions', 'HD wallets', 'Blockchain interfaces'],
    group: 'product',
    year: '2021',
  },
  {
    id: 'ducatus-wallet-client',
    title: 'Ducatus Wallet Client',
    meta: 'Wallet backend support · APIs / blockchain interfaces · 2021',
    summary:
      'Backend-side wallet support for APIs, multi-chain integration, and product infrastructure around wallet delivery.',
    description:
      'Ducatus Wallet Client covered backend-side wallet infrastructure, including blockchain integration, package and server configuration, API creation, and support for wallet-related multi-chain behaviour. It is relevant as part of the broader product delivery story around the Ducatus wallet ecosystem.',
    tags: ['REST API', 'Transactions', 'Multi-chain', 'Smart contracts', 'Wallet infrastructure'],
    codeUrl: 'https://github.com/DucatusX/ducatus-bitcore',
    group: 'product',
    year: '2021',
  },
  {
    id: 'wallarm',
    title: 'Wallarm',
    meta: 'Marketing platform · CMS / frontend delivery · 2019',
    summary:
      'Marketing and web platform delivery involving CMS-based pages, forms, integrations, and content-driven frontend work.',
    description:
      'Wallarm involved frontend delivery for a marketing and web platform environment with CMS-backed pages, landing pages, forms, integrations, and content-oriented frontend implementation. It reflects practical delivery work in a product-marketing environment rather than purely static website building.',
    tags: ['CMS delivery', 'Forms', 'Integrations', 'Content platform', 'SEO'],
    liveUrl: 'https://wallarm.com',
    group: 'commercial',
    year: '2019',
  },
  {
    id: 'petrovskaya-akvatoria',
    title: 'Petrovskaya Akvatoria',
    meta: 'Commercial website · CMS / product delivery · 2018',
    summary:
      'Large multilingual museum website with ticketing, interactive content, navigation, and structured content surfaces.',
    description:
      'Petrovskaya Akvatoria was a large commercial website for a museum with multilingual content, ticketing, interactive map elements, event surfaces, navigation flows, and media-rich content. It reflects earlier commercial frontend delivery work with real business functionality and complex information structure.',
    tags: ['Multilingual', 'Ticketing', 'Interactive content', 'Structured navigation'],
    liveUrl: 'https://peteraqua.ru',
    group: 'commercial',
    year: '2018',
  },
  {
    id: 'tornhoff',
    title: 'Tornhoff',
    meta: 'Commercial website · CMS / multilingual delivery · 2018',
    summary:
      'Commercial website with multilingual support, SEO improvements, and structured product presentation.',
    description:
      'Tornhoff was a commercial website focused on multilingual content, country-based data handling, product presentation, and SEO improvements. The work reflects earlier business-oriented frontend delivery with practical CMS and catalog-related structure.',
    tags: ['Multilingual', 'Catalog', 'SEO', 'Navigation', 'CMS'],
    liveUrl: 'https://tornhoff.com',
    group: 'commercial',
    year: '2018',
  },
  {
    id: 'plastic-surgeon',
    title: 'Plastic Surgeon',
    meta: 'Commercial website · CMS / design-to-delivery · 2017',
    summary:
      'Business website delivered from design through implementation, content structure, and CMS-based publishing.',
    description:
      'Plastic Surgeon was a full website delivery project spanning design, layout, CMS integration, and support for content-driven modules such as comments, services, photos, and blog functionality. It represents an earlier end-to-end commercial website build.',
    tags: ['Design-to-delivery', 'CMS', 'Blog', 'Catalog', 'Feedback flows'],
    codeUrl: 'https://github.com/Am-Filo/maria-volokh-template',
    group: 'commercial',
    year: '2017',
  },
  {
    id: 'ducatus-centurion',
    title: 'Ducatus Centurion',
    meta: 'Landing page · Frontend delivery / SEO · 2021',
    summary:
      'Project landing page delivered from scratch with responsive implementation and SEO-focused optimization.',
    description:
      'Ducatus Centurion was a project landing page built from scratch with responsive delivery and SEO-focused frontend optimization. It fits as a lighter but still relevant example of structured landing-page delivery in a commercial environment.',
    tags: ['Landing page', 'Responsive delivery', 'SEO', 'Frontend implementation'],
    codeUrl: 'https://github.com/DucatusX/centurion',
    liveUrl: 'https://centuriongm.com',
    group: 'commercial',
    year: '2021',
  },
  {
    id: 'ducatus-emperor',
    title: 'Ducatus Emperor',
    meta: 'Landing page · React / frontend delivery · 2021',
    summary:
      'Landing page delivery built from scratch with React for a product-oriented commercial project.',
    description:
      'Ducatus Emperor was a commercial landing page built from scratch with React. It is a simpler project than the product systems above, but still useful as part of the broader picture of frontend delivery across product, marketing, and landing-page work.',
    tags: ['Landing page', 'React', 'Frontend delivery', 'Responsive implementation'],
    codeUrl: 'https://github.com/DucatusX/emperor',
    group: 'commercial',
    year: '2021',
  },
  {
    id: 'ducatus-website',
    title: 'Ducatus Website',
    meta: 'Crypto website · Angular / admin and wallet-facing frontend · 2021',
    summary:
      'Official blockchain website with admin functionality, wallet-connected flows, vouchers, exchange features, and structured product surfaces.',
    description:
      'Ducatus Website was the official blockchain website delivered with Angular, including wallet-connected functionality, admin-oriented tools, voucher-related flows, exchange-related modules, and structured user-facing product surfaces. It sits between commercial delivery and product work, but fits best in the earlier commercial section as a broader platform-like website rather than a single focused app surface.',
    tags: [
      'Angular',
      'Admin panel',
      'Wallet-connected frontend',
      'Vouchers',
      'Exchange-oriented modules',
    ],
    codeUrl: 'https://github.com/DucatusX/ducatus-site',
    liveUrl: 'https://www.ducatuscoins.com',
    group: 'commercial',
    year: '2021',
  },
];
