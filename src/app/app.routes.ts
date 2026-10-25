import { Routes } from '@angular/router';
import { AppRouteSeo } from '@lib/seo.service';

// Route-level metadata feeds the canonical, Open Graph, Twitter and JSON-LD tags.
const landingSeo: AppRouteSeo = {
  title: 'Nikita Syreishchikov | Senior Software Engineer',
  description: 'Senior Software Engineer with 10+ years building web and mobile products using TypeScript, Angular, React, Node.js and modern backend technologies.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-main.png',
};
const aboutSeo: AppRouteSeo = {
  title: 'About & Experience | Nikita Syreishchikov',
  description: 'Hands-on software engineering across frontend architecture, backend services, mobile applications, product delivery and technical leadership.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-about.png',
};
const demosSeo: AppRouteSeo = {
  title: 'Engineering Demos | Nikita Syreishchikov',
  description: 'Interactive Angular demonstrations of reusable UI, application state, API integration and complex user workflows.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-demos.png',
};
const worksSeo: AppRouteSeo = {
  title: 'Selected Software Projects | Nikita Syreishchikov',
  description: 'Selected commercial and independent projects across Angular, React, Node.js, banking tools, web platforms and mobile development.',
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
  title: 'Transaction Workflows Demo | Nikita Syreishchikov',
  description: 'Angular interactive demo exploring account connections, multi-step transaction states, auctions and marketplace interface patterns.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-demos.png',
};
const dexToolsSeo: AppRouteSeo = {
  title: 'Financial Workflows Demo | Nikita Syreishchikov',
  description: 'Angular interface demo featuring dynamic forms, financial calculations, asynchronous states and validation workflows.',
  robots: 'index, follow',
  image: 'https://amaryfilo.com/og-demos.png',
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
    path: 'demos/transaction-workflows',
    data: { seo: walletToolsSeo },
    loadComponent: () =>
      import('../pages/demos/transaction-workflows/transaction-workflows.page').then((m) => m.TransactionWorkflowsPage),
  },
  {
    path: 'demos/financial-workflows',
    data: { seo: dexToolsSeo },
    loadComponent: () =>
      import('../pages/demos/financial-workflows/financial-workflows.page').then((m) => m.FinancialWorkflowsPage),
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
