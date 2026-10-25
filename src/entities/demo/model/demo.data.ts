import { IDemoItem } from './demo.types';

export const DEMO_ITEMS: IDemoItem[] = [
  {
    "slug": "angular-ui-architecture-showcase",
    "img": "/enterprise-ui.png",
    "title": "Angular SSR & UI Foundation",
    "text": "Angular 21 reusable SSR, headless UI and data-rich admin components with optional interactive modules.",
    "summary": "A working technical foundation and UI showcase; not a publicly launched SaaS product.",
    "description": "Built with Angular 21 standalone components, Signals, SSR/hydration, design tokens and headless UI patterns. Includes reusable tables, filters, charts and admin layouts, alongside optional interactive connection and transaction examples. Authentication and admin APIs use mock data; the showcase is not a production customer system.",
    "tags": [
      "Angular 21",
      "SSR",
      "Signals",
      "UI Components",
      "Data Tables",
      "State Management"
    ],
    "link": "https://demo.amaryfilo.com/",
    "featured": true
  },
  {
    "slug": "transaction-workflows",
    "img": "/transaction-workflows.svg",
    "title": "Transaction Workflows",
    "text": "Interactive Angular UI examples with account connections, state transitions, auctions and marketplace screens.",
    "summary": "Complex user journeys, asynchronous status updates and browser integration patterns.",
    "description": "Hands-on Angular examples of connected-account journeys, multi-step transaction states, auction interfaces and marketplace UI. Demonstrations are for technical exploration; they are not customer financial systems or independently audited services.",
    "tags": [
      "Angular",
      "TypeScript",
      "State Management",
      "Browser APIs",
      "Complex Workflows"
    ],
    "liveUrl": "https://amaryfilo.com/demos/transaction-workflows",
    "featured": true
  },
  {
    "slug": "financial-workflows",
    "img": "/financial-workflows.svg",
    "title": "Financial UI Workflows",
    "text": "Angular interactive forms with dynamic calculations, validation and multi-step operation states.",
    "summary": "A frontend-focused showcase of complex financial forms and state-management patterns.",
    "description": "Demonstrates conditional form state, dynamic amount and fee calculations, validation, connection-dependent UI and asynchronous operation progress. The interactive examples are illustrative rather than a standalone production financial service.",
    "tags": [
      "Angular",
      "TypeScript",
      "Complex Forms",
      "Validation",
      "Async State"
    ],
    "liveUrl": "https://amaryfilo.com/demos/financial-workflows",
    "featured": true
  }
];
