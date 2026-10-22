import { Routes } from '@angular/router';
import { AppRouteSeo } from '@lib/seo.service';

// Route-level metadata feeds the canonical, Open Graph, Twitter and JSON-LD tags.
const landingSeo: AppRouteSeo = {
  title: 'Nikita Syreishchikov | Senior Software Engineer',
  description: 'Senior Software Engineer with 10+ years building TypeScript, Angular and React applications, Node.js services, mobile products and fintech/Web3 systems.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-main.png',
};
const aboutSeo: AppRouteSeo = {
  title: 'About & Experience | Nikita Syreishchikov',
  description: 'Engineering experience across Angular, React, Node.js, NestJS, PostgreSQL, mobile wallets, fintech, Web3 and technical leadership.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-about.png',
};
const demosSeo: AppRouteSeo = {
  title: 'Engineering Demos | Nikita Syreishchikov',
  description: 'Angular SSR UI foundation, reusable B2B dashboard components and interactive Web3 wallet and DeFi frontend demonstrations.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-demos.png',
};
const worksSeo: AppRouteSeo = {
  title: 'Selected Software Projects | Nikita Syreishchikov',
  description: 'Selected software work including NestJS fitness APIs, Angular and React fintech products, mobile wallets, banking tools and Web3 integrations.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-works.png',
};
const termsSeo: AppRouteSeo = {
  title: 'Terms of Use | Nikita Syreishchikov',
  description: 'Terms of use for amaryfilo.com.',
  robots: 'noindex, follow',
  image: 'https://amaryfilo.com/og-main.png',
};
const privacySeo: AppRouteSeo = {
  title: 'Privacy Policy | Nikita Syreishchikov',
  description: 'Contact form privacy and data handling information for amaryfilo.com.',
  robots: 'noindex, follow',
  image: 'https://amaryfilo.com/og-main.png',
};
const notFoundSeo: AppRouteSeo = {
  title: 'Page Not Found | Nikita Syreishchikov',
  description: 'The requested page was not found.',
  robots: 'noindex, nofollow',
  image: 'https://amaryfilo.com/og-main.png',
};
const walletToolsSeo: AppRouteSeo = {
  title: 'Wallet & Staking Demo | Nikita Syreishchikov',
  description: 'Angular/Web3 interactive wallet, staking, marketplace and auction demo with transaction states and testnet integrations.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-wallet-tools.png',
};
const dexToolsSeo: AppRouteSeo = {
  title: 'DEX Interaction Demo | Nikita Syreishchikov',
  description: 'Angular DeFi interface demo for swap, liquidity and farming interactions, with wallet state and amount validation.',
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
