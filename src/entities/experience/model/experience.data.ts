// src/entities/experience/model/experience.data.ts

import { IExperienceItem } from './experience.types';

export const EXPERIENCE_ITEMS: IExperienceItem[] = [
  {
    title: 'Independent Frontend Consultant',
    summary:
      'Designed production-ready Angular boilerplates that reduce architecture setup time by 70% across Fintech, Web3, and Enterprise ecosystems.',
    period: 'Sep 2025 – Present',
    location: 'Valencia, Spain',
    text: 'Architected production-ready Angular boilerplates for Enterprise, Fintech, and Web3 ecosystems, covering 10+ complex product modules. Designed scalable frontend foundations to reduce architecture setup time by 70%, standardizing SSR configurations, strict API boundaries, predictable data flows, and secure blockchain integrations.',
    featured: true,
  },
  {
    company: 'Unlimit',
    title: 'Frontend Team Lead',
    summary:
      'Led Angular modernizations, prevented high-risk platform rewrites, and launched stalled B2B portals.',
    period: 'Nov 2023 – Sep 2025',
    location: 'Remote',
    bullets: [
      'Prevented a high-risk core banking rewrite by rapidly integrating React engineers into the Angular ecosystem, saving 36+ man-months of effort and accelerating Time-to-Market (TTM) by 20-25%.',
      'Rescued and launched a stalled B2B KYB/KYC onboarding portal MVP in just 4 weeks, replacing monolithic forms with automated Sumsub identity flows and cutting manual processing by 90%.',
      'Led the migration of the core banking platform (1,500 DAU) from Angular 14 to 19 (Signals), eliminating 70% of legacy duplicate logic.',
      'Advocated and implemented a Backend-For-Frontend (BFF) layer to consolidate complex queries, reducing frontend integration bugs by 30%.',
    ],
    featured: true,
  },
  {
    company: 'Unlimit',
    title: 'Senior Frontend Engineer',
    summary:
      'Built non-custodial Web3 extensions from scratch and drove R&D modernization strategy.',
    period: 'Aug 2022 – Nov 2023',
    location: 'Limassol, Cyprus',
    bullets: [
      'Acted as the sole frontend owner for a high-complexity non-custodial crypto wallet browser extension, launching it from scratch to production in 3 months.',
      'Developed custom browser APIs to bridge the wallet with external Web3 ecosystems, enabling MetaMask-like connection behaviors for third-party dApps.',
      'Engineered a Smart Wallet POC (using Biconomy/ZeroDev) to expose legacy bottlenecks, laying the strategic roadmap for a company-wide Angular modernization.',
    ],
    featured: false,
  },
  {
    company: 'Nodamatics',
    title: 'Frontend Team Lead',
    summary:
      'Time-critical Angular migrations, gRPC integrations, and establishing delivery flows.',
    period: 'Feb 2022 – May 2022',
    location: 'Remote',
    bullets: [
      'Led a time-critical architectural migration of a crypto platform to a modern Angular stack, establishing strict delivery processes for the team.',
      'Integrated generated gRPC clients to enforce type-safe backend communication and improve data reliability.',
      'Connected the frontend UI to a custom Ethereum node to enable secure, seamless transaction signing.',
    ],
    featured: false,
  },
  {
    company: 'Rock’n’Block',
    title: 'Frontend Team Lead',
    summary:
      'Scaled the frontend team to 15 engineers, built open-source Web3 libraries, and orchestrated parallel DApp delivery.',
    period: 'Feb 2021 – Jan 2022',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Scaled the frontend department to 15 engineers during rapid company expansion, establishing standardized hiring and code-quality matrices.',
      'Orchestrated parallel delivery across multiple Web3 products, releasing 5–7 production React applications while managing strict timelines and budgets.',
      'Engineered an open-source, framework-agnostic Web3 connection library (@amfi/connect-wallet), accelerating new project setup by 80%.',
    ],
    featured: true,
  },
  {
    company: 'Rock’n’Block',
    title: 'Software Engineer',
    summary:
      'Engineered high-TVL DApps and cross-platform mobile wallets with hardware NFC signing.',
    period: 'Dec 2019 – Feb 2021',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Engineered and launched multiple high-stakes DApps, including a Web3 ecosystem that processed over $500k in token volume.',
      'Architected a cross-platform mobile crypto wallet (20k+ downloads) with a custom Cordova bridge for NFC hardware signing.',
      'Streamlined end-to-end mobile release pipelines by resolving iOS/Android build bottlenecks, enabling self-serve app publishing.',
    ],
    featured: false,
  },
  {
    company: 'Wallarm',
    title: 'Software Engineer',
    summary:
      'Delivered localized lead-generation platforms and cross-border marketing tech integrations.',
    period: 'Feb 2019 – Aug 2019',
    location: 'Moscow, Russia',
    bullets: [
      'Built localized cybersecurity marketing pages and HubSpot lead-generation workflows for US-based marketing campaigns.',
      'Established reliable analytics tracking to support funnel visibility and performance analysis across the marketing platform.',
    ],
    featured: false,
  },
  {
    company: 'Grand Media Service',
    title: 'Web Developer',
    summary:
      'Autonomously engineered full-cycle commercial platforms and e-commerce architectures.',
    period: 'Sep 2016 – Aug 2019',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Autonomously engineered 10+ full-cycle e-commerce websites and maintained 30+ existing client platforms as the sole developer.',
      'Handled end-to-end delivery, from direct client scope estimation to CMS development and marketing analytics integrations.',
    ],
    featured: false,
  },
];
