import { IExperienceItem } from './experience.types';

export const EXPERIENCE_ITEMS: IExperienceItem[] = [
  {
    "title": "Independent Software Engineer",
    "summary": "Building independent web and mobile products, modern frontend foundations and locally tested backend services.",
    "period": "Sep 2025 – Present",
    "location": "Valencia, Spain / Remote",
    "bullets": [
      "Developing a fitness product with a NestJS/Prisma/PostgreSQL backend, Next.js/React authentication client and early Expo/React Native app; the product is still in development.",
      "Built an Angular 21 SSR frontend foundation with reusable headless UI, design tokens, tables, filters, charts, wallet integrations and transaction workflows.",
      "Working hands-on with AI coding agents while owning architecture, code review, local integration testing and technical decisions."
    ],
    "featured": true
  },
  {
    "company": "Unlimit",
    "title": "Frontend Team Lead",
    "summary": "Frontend ownership for KYB onboarding, banking operations and Angular modernization.",
    "period": "Nov 2023 – Sep 2025",
    "location": "Remote",
    "bullets": [
      "Delivered an Angular KYB/KYC MVP in three weeks; the onboarding product later served 300+ companies. A roughly 90% reduction in manual processing was estimated by the Product Owner.",
      "Owned delivery and Angular 19/Signals modernization of an internal banking backoffice, including reusable filtering, pagination and permission flows.",
      "Led an Angular 14-to-17 migration of a banking web app serving approximately 1,500 daily users; mentored a team of five frontend developers."
    ],
    "featured": true
  },
  {
    "company": "Unlimit",
    "title": "Senior Frontend Engineer",
    "summary": "Built complex Angular product flows and an internal browser wallet extension.",
    "period": "Aug 2022 – Nov 2023",
    "location": "Remote",
    "bullets": [
      "Developed an internal non-custodial browser wallet extension and custom dApp API, using injected scripts, service workers, origin permissions and QR/WebSocket pairing. The extension was not publicly launched.",
      "Implemented banking and KYC interfaces with RxJS-driven asynchronous verification, sequential document uploads, API contracts and mock API services."
    ],
    "featured": false
  },
  {
    "company": "Nodamatics",
    "title": "Frontend Team Lead",
    "summary": "Angular/Nx delivery for staking and Ethereum-related applications.",
    "period": "Feb 2022 – May 2022",
    "location": "Remote",
    "bullets": [
      "Reorganized an Nx monorepo into application modules and shared packages and integrated generated gRPC clients with Angular product workflows.",
      "Led a two-person frontend team, coordinated delivery and introduced application-level CI checks."
    ],
    "featured": false
  },
  {
    "company": "Rock’n’Block",
    "title": "Frontend Team Lead",
    "summary": "Led engineers while remaining hands-on with crypto wallets, React/Angular dApps and reusable SDKs.",
    "period": "Feb 2021 – Jan 2022",
    "location": "St. Petersburg, Russia / Hybrid",
    "bullets": [
      "Led a frontend team of up to 13 developers and participated in hiring 11 engineers.",
      "Built Minto Finance's core React/TypeScript/MobX staking and presale frontend; delivered LESS Bridge's React/Redux EVM/Tron transaction flows.",
      "Created a reusable TypeScript/RxJS wallet connector SDK used across commercial Web3 applications."
    ],
    "featured": true
  },
  {
    "company": "Rock’n’Block",
    "title": "Software Engineer",
    "summary": "Commercial web, mobile and backend contributions to non-custodial wallets and token platforms.",
    "period": "Dec 2019 – Feb 2021",
    "location": "St. Petersburg, Russia / Hybrid",
    "bullets": [
      "Owned Angular/Ionic development for Ducatus across web, iOS and Android (approximately 10,000 users), including local signing, voucher/deposit workflows and app-store releases.",
      "Extended Bitcore-derived Node.js/Express wallet services with REST endpoints, MongoDB address lookups and client SDK methods.",
      "Built the native Ionic/Cordova integration for Tangem NFC signing and developed Angular/Web3 token apps and separate Axion staking and analytics interfaces."
    ],
    "featured": false
  },
  {
    "company": "Wallarm",
    "title": "Software Engineer",
    "summary": "Localized web experiences and integrations for a cybersecurity marketing platform.",
    "period": "Feb 2019 – Aug 2019",
    "location": "Remote",
    "bullets": [
      "Built multilingual campaign pages and integrated HubSpot lead forms, Contentful and analytics using JavaScript, LESS and Webpack."
    ],
    "featured": false
  },
  {
    "company": "Grand Media Service",
    "title": "Web Developer (Full Stack)",
    "summary": "Full-cycle CMS, e-commerce and custom business website development.",
    "period": "Sep 2016 – Aug 2019",
    "location": "St. Petersburg, Russia",
    "bullets": [
      "Delivered 10+ business websites and maintained 30+ client sites, from requirements and frontend implementation through deployment and support.",
      "Developed PHP/Laravel and October CMS modules with MySQL/Eloquent, e-commerce catalogs, cart/checkout flows and CRM/payment integrations."
    ],
    "featured": false
  }
];
