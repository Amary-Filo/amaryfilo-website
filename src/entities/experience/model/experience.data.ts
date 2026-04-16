// src/entities/experience/model/experience.data.ts

import { IExperienceItem } from './experience.types';

export const EXPERIENCE_ITEMS: IExperienceItem[] = [
  {
    title: 'Independent Frontend Consultant',
    summary: 'Architecture, reusable frontend foundations, demos, product direction.',
    period: 'Sep 2025 – Present',
    location: 'Valencia, Spain',
    bullets: [
      'Help fintech and Web3 teams accelerate frontend delivery through architecture consulting and reusable Angular foundations.',
      'Build demo product modules and frontend systems for wallet-connected and transaction-heavy user flows.',
      'Support product direction, reusable UI structure, SSR strategy, and maintainable frontend delivery.',
    ],
    featured: true,
  },
  {
    company: 'Unlimit',
    title: 'Frontend Team Lead',
    summary: 'Crypto/fintech platform, Angular modernization, reusable UI, delivery ownership.',
    period: 'Nov 2023 – Sep 2025',
    location: 'Remote',
    bullets: [
      'Led the frontend stream for a crypto/fintech platform, owning architecture, Angular modernization, and reusable UI systems.',
      'Improved internal tools and admin functionality to support maintainability and faster delivery.',
      'Built a reusable UI foundation shared across multiple product areas.',
      'Delivered wallet-related and transaction-heavy product flows, including authentication, crypto payments, and balance features.',
      'Supported delivery through mentoring, documentation, technical interviews, and team collaboration.',
    ],
    featured: true,
  },
  {
    company: 'Unlimit',
    title: 'Senior JS/TS Developer',
    summary: 'Customer-facing product areas, internal tools, Angular interfaces, platform growth.',
    period: 'Aug 2022 – Nov 2023',
    location: 'Limassol, Cyprus',
    bullets: [
      'Worked on a crypto/fintech platform, contributing to customer-facing product features and internal product areas.',
      'Developed and maintained Angular-based frontend functionality for transaction-heavy user journeys.',
      'Collaborated with backend, product, and design teams on scalable product delivery.',
      'Contributed to frontend consistency, maintainability, and architecture evolution across the platform.',
    ],
    featured: false,
  },
  {
    company: 'Nodamatics',
    title: 'Frontend Team Lead',
    summary: 'Crypto web platform, Angular structure, architecture cleanup, delivery flow.',
    period: 'Feb 2022 – Apr 2022',
    location: 'Remote',
    bullets: [
      'Joined a crypto web platform project to improve frontend structure and delivery flow.',
      'Simplified the frontend architecture with clearer module boundaries and a cleaner Angular structure.',
      'Supported delivery of crypto product features and high-performance landing pages.',
      'Improved workflow through planning, code reviews, mentoring, and design collaboration.',
    ],
    featured: false,
  },
  {
    company: 'Rock’n’Block',
    title: 'Frontend Team Lead',
    summary: 'Web3 products, wallet flows, reusable interfaces, delivery coordination.',
    period: 'Feb 2022 – Apr 2022',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Led frontend delivery across Web3-oriented web and mobile products.',
      'Built reusable frontend solutions and shared component patterns to accelerate delivery across projects.',
      'Delivered wallet-connected user flows and contract-related interfaces for dApp products.',
      'Contributed to planning, estimation, CI/CD, documentation, and cross-team collaboration.',
    ],
    featured: true,
  },
  {
    company: 'Rock’n’Block',
    title: 'Software Engineer',
    summary: 'Crypto web/mobile products, wallet UX, transaction flows, delivery support.',
    period: 'Dec 2019 – Jan 2022',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Delivered web and mobile product features for crypto-focused applications, including wallet-related flows and transaction-based user experiences.',
      'Built crypto wallet interfaces for iOS, Android, and web environments.',
      'Implemented token and transaction flows, including claim, deposit, and staking features.',
      'Contributed to performance and SEO improvements where needed.',
      'Collaborated closely with backend and design teams on implementation and delivery.',
    ],
    featured: false,
  },
  {
    company: 'Wallarm',
    title: 'Software Engineer',
    summary:
      'Marketing/web platform delivery, CMS integrations, analytics, content-driven frontend.',
    period: 'Feb 2019 – Aug 2019',
    location: 'Moscow, Russia',
    bullets: [
      'Worked on marketing and web platform initiatives involving CMS integrations and frontend delivery.',
      'Built and maintained CMS-driven pages, forms, and marketing-related frontend components.',
      'Integrated analytics and event tracking to support funnel visibility and performance analysis.',
      'Contributed across frontend delivery and infrastructure-adjacent tasks.',
    ],
    featured: false,
  },
  {
    company: 'Grand Media Service',
    title: 'Web Developer',
    summary:
      'Commercial websites, e-commerce, CMS platforms, frontend delivery from start to launch.',
    period: 'Sep 2016 – Aug 2019',
    location: 'St. Petersburg, Russia',
    bullets: [
      'Built and launched commercial web projects end-to-end, including e-commerce sites, landing pages, CMS-based platforms, and marketing assets.',
      'Delivered websites from implementation to launch, including frontend development and CMS setup.',
      'Worked with payment integrations, order flows, analytics setup, and practical client-facing product requirements.',
      'Improved site performance through frontend optimization and basic server-side configuration.',
    ],
    featured: false,
  },
];
