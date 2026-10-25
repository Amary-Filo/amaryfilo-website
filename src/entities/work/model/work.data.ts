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
    "summary": "Reusable Angular 21 SSR foundation with headless UI, admin dashboards and optional interactive modules.",
    "description": "Built an Angular 21 standalone/Signals SSR and hydration foundation with design tokens, accessible primitives, data tables, filters, charts and dashboards. Optional interactive modules demonstrate external connections, approval workflows and asynchronous states. Authentication/admin endpoints are mocked; this is a technical showcase, not a launched SaaS product.",
    "tags": [
      "Angular 21",
      "SSR",
      "Signals",
      "Headless UI",
      "Design Tokens",
      "Data Tables"
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
    "title": "Ducatus Cross-Platform Applications",
    "meta": "Rock’n’Block · Web, mobile & backend · 2019–2022",
    "summary": "Financial applications across web, iOS and Android with product releases, native integrations and backend features.",
    "description": "Owned Angular/Ionic frontend and app releases for Ducatus (~10,000 users). Implemented vouchers, time-based deposits, asset integrations and transaction status flows. Extended Node.js/Express services with MongoDB-backed REST endpoints and SDK methods; developed a Cordova NFC hardware-card bridge.",
    "tags": [
      "Angular",
      "Ionic",
      "Cordova",
      "Node.js",
      "Express",
      "MongoDB",
      "NFC"
    ],
    "group": "featured",
    "year": "2019–2022"
  },
  {
    "id": "minto-finance",
    "title": "Minto Finance",
    "meta": "Rock’n’Block · React application · 2021",
    "summary": "Production React/TypeScript/MobX application with account operations, purchasing, time-based positions and rewards.",
    "description": "Built a commercial React frontend and UI/UX using MobX for account connections, purchasing, approvals, time-based positions, withdrawals, reward calculations and statistics. The app launched; later contributors maintained external integration configuration.",
    "tags": [
      "React",
      "TypeScript",
      "MobX",
      "Account Flows",
      "State Management"
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
    "title": "Internal Browser Extension",
    "meta": "Unlimit · Browser engineering · 2022–2023",
    "summary": "Internal prototype for secure browser-based account connections, custom APIs and mobile pairing; not publicly released.",
    "description": "Built an internal browser extension with injected scripts, service workers, origin-based permissions, session state and QR/WebSocket mobile pairing. Designed browser-facing integration APIs and cross-context synchronization. The initiative was not publicly launched.",
    "tags": [
      "TypeScript",
      "Browser APIs",
      "Service Workers",
      "Permissions",
      "WebSockets"
    ],
    "group": "product",
    "year": "2022–2023"
  },
  {
    "id": "less-bridge",
    "title": "LESS Bridge",
    "meta": "Rock’n’Block · React application · 2021",
    "summary": "Production React/Redux frontend for multi-network account operations, fee validation and asynchronous transfer states.",
    "description": "Built network selection, external provider adapters, balances, authorization checks, fee calculation, operation submission and pending/error handling using React/Redux. Integrated existing backend APIs; my role was frontend engineering, not implementation of the underlying protocol.",
    "tags": [
      "React",
      "Redux",
      "TypeScript",
      "Integration",
      "Form Validation",
      "Async State"
    ],
    "group": "product",
    "year": "2021"
  },
  {
    "id": "axion-dapps",
    "title": "Axion Interactive Platform",
    "meta": "Rock’n’Block · Angular frontend · 2020–2021",
    "summary": "Production Angular user journeys for financial positions, auctions, approvals and multi-step transaction states.",
    "description": "Developed Angular/TypeScript interfaces for deposits, time-based positions, claims, auctions and withdrawals. Integrated external account and operation states with RxJS and precision-safe calculations. The role involved frontend integrations rather than implementation of the underlying protocol.",
    "tags": [
      "Angular",
      "RxJS",
      "TypeScript",
      "State Management",
      "Auctions",
      "BigNumber"
    ],
    "group": "product",
    "year": "2020–2021"
  },
  {
    "id": "axion-dashboard",
    "title": "Axion Analytics Dashboard",
    "meta": "Rock’n’Block · Angular / REST · 2020–2021",
    "summary": "Separate production Angular application with REST-driven financial charts, account profiles and news administration.",
    "description": "Built a data-heavy Angular application with API-driven charts, market widgets, user histories, numerical formatting, profiles, scheduled refresh and an admin news editor. This was separate from Axion's transactional frontend.",
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
    "title": "Angular Approval Workflow Application",
    "meta": "Rock’n’Block · Angular application · 2019–2020",
    "summary": "Angular frontend delivered from requirements through release, with multi-step configuration and approval workflows.",
    "description": "Implemented an Angular frontend from an initial product brief through release, including account connection, configuration screens, approval steps, operation status and localization. Integrated existing service interfaces rather than authoring the underlying protocol.",
    "tags": [
      "Angular",
      "TypeScript",
      "Product Delivery",
      "Approval Flows",
      "Integration"
    ],
    "group": "product",
    "year": "2019–2020"
  },
  {
    "id": "connect-wallet-sdk",
    "title": "AMFI Connection SDK",
    "meta": "Rock’n’Block / Open source · TypeScript library · 2021",
    "summary": "Reusable TypeScript/RxJS provider-connection library used across commercial frontend applications.",
    "description": "Created a TypeScript/RxJS abstraction for external provider availability, connection state, account handling and network state. Integrated in Minto Finance and designed to reduce repeated provider-setup work.",
    "tags": [
      "TypeScript",
      "RxJS",
      "SDK",
      "State Management",
      "Reusable Integrations"
    ],
    "group": "product",
    "year": "2021"
  },
  {
    "id": "nodamatics-platform",
    "title": "Angular Integration Platform",
    "meta": "Nodamatics · Angular integration · 2022",
    "summary": "Angular/Nx monorepo architecture and generated gRPC client integration for a financial frontend.",
    "description": "Restructured an Nx frontend workspace into application modules and shared packages. Integrated generated gRPC clients for typed backend communication, led a two-person frontend team and supported CI delivery.",
    "tags": [
      "Angular",
      "Nx",
      "gRPC",
      "TypeScript",
      "CI/CD"
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
    "description": "Built a Nuxt/Vue website from supplied designs and tasks, with responsive sections, navigation and community-facing interactions. The commercial project complements larger transactional products; its registration surface was primarily informational.",
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
