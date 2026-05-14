// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AppRouteSeo } from '@lib/seo.service';

const landingSeo: AppRouteSeo = {
  title: 'Nikita S. · Senior Frontend Engineer / Frontend Lead',
  description:
    'Senior Product-Minded Frontend Engineer. I specialize in Angular, scalable architectures, and turning complex business requirements into seamless Enterprise and Web3 interfaces.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-main.png',
};

const aboutSeo: AppRouteSeo = {
  title: 'About · Nikita S.',
  description:
    'About Nikita S. — Senior Frontend Engineer driving features from vague concepts to production. Explore my engineering approach, technical profile, and focus on product delivery.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-about.png',
};

const demosSeo: AppRouteSeo = {
  title: 'Demos · Nikita S.',
  description:
    'Interactive showcases demonstrating production-grade Angular architecture, Web3 mechanics, and complex UI systems in practice. Not just visual mockups.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-demos.png',
};

const worksSeo: AppRouteSeo = {
  title: 'Work · Nikita S.',
  description:
    'A curated selection of flagship products and platforms across Fintech, Enterprise B2B, and Web3 ecosystems built for scale and reliability.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-works.png',
};

const termsSeo: AppRouteSeo = {
  title: 'Terms of Use · Nikita S.',
  description:
    'Terms of Use for the Nikita S. website, including information about content usage, materials, and general site terms.',
  robots: 'noindex, follow',
  image: 'https://amaryfilo.com/og-main.png',
};

const privacySeo: AppRouteSeo = {
  title: 'Privacy Policy · Nikita S.',
  description:
    'Privacy Policy for the Nikita S. website, including information about contact form data, communication, and data handling.',
  robots: 'noindex, follow',
  image: 'https://amaryfilo.com/og-main.png',
};

const notFoundSeo: AppRouteSeo = {
  title: 'Page Not Found · Nikita S.',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow',
  image: 'https://amaryfilo.com/og-main.png',
};

const walletToolsSeo: AppRouteSeo = {
  title: 'Wallet Tools · Nikita S.',
  description:
    'Technical demo showcasing a scalable Angular and Web3 architecture for staking, decentralized auctions, marketplace logic, and robust wallet connections.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-wallet-tools.png',
};

const dexToolsSeo: AppRouteSeo = {
  title: 'DEX Tools · Nikita S.',
  description:
    'Technical demo highlighting advanced AMM mechanics in Angular, including automated swaps, liquidity pools, yield farming, and state-heavy DeFi product flows.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-dex-tools.png',
};

export const routes: Routes = [
  {
    path: '',
    data: { seo: landingSeo },
    loadComponent: () => import('../pages/main/main.page').then((m) => m.MainPage),
  },
  {
    path: 'about',
    data: { seo: aboutSeo },
    loadComponent: () => import('../pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'demos',
    data: { seo: demosSeo },
    loadComponent: () => import('../pages/demos/demos.page').then((m) => m.DemosPage),
  },
  {
    path: 'demos/wallet-tools',
    data: { seo: walletToolsSeo },
    loadComponent: () =>
      import('../pages/demos/wallet-tools/wallet-tools.page').then((m) => m.WalletToolsPage),
  },
  {
    path: 'demos/dex-tools',
    data: { seo: dexToolsSeo },
    loadComponent: () =>
      import('../pages/demos/dex-tools/dex-tools.page').then((m) => m.DexToolsPage),
  },
  {
    path: 'works',
    data: { seo: worksSeo },
    loadComponent: () => import('../pages/works/works.page').then((m) => m.WorksPage),
  },
  {
    path: 'terms',
    data: { seo: termsSeo },
    loadComponent: () => import('../pages/terms/terms.page').then((m) => m.TermsPage),
  },
  {
    path: 'privacy',
    data: { seo: privacySeo },
    loadComponent: () =>
      import('../pages/privacy-policy/privacy-policy.page').then((m) => m.PrivacyPolicyPage),
  },
  {
    path: '404',
    data: { seo: notFoundSeo },
    loadComponent: () => import('../pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    data: { seo: notFoundSeo },
    loadComponent: () => import('../pages/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
