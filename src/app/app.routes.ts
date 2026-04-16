// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AppRouteSeo } from '@lib/seo.service';

const landingSeo: AppRouteSeo = {
  title: 'Nikita S. · Senior Frontend Engineer / Frontend Lead',
  description:
    'Senior Frontend Engineer / Frontend Lead focused on Angular, frontend architecture, reusable UI systems, and fintech / Web3 product interfaces.',
  robots: 'index, follow',
};

const aboutSeo: AppRouteSeo = {
  title: 'About · Nikita S.',
  description:
    'About Nikita S. — Senior Frontend Engineer focused on Angular, frontend architecture, reusable UI systems, and fintech / Web3 product delivery.',
  robots: 'index, follow',
};

const demosSeo: AppRouteSeo = {
  title: 'Demos · Nikita S.',
  description:
    'Technical demos built with Angular and Web3, covering wallet connection, staking, marketplace, swaps, liquidity, and transaction-heavy product flows.',
  robots: 'index, follow',
};

const worksSeo: AppRouteSeo = {
  title: 'Work · Nikita S.',
  description:
    'Selected product and platform work across wallet-connected interfaces, commercial frontend delivery, dashboards, and reusable frontend systems.',
  robots: 'index, follow',
};

const termsSeo: AppRouteSeo = {
  title: 'Terms of Use · Nikita S.',
  description:
    'Terms of Use for the Nikita S. website, including information about content usage, materials, and general site terms.',
  robots: 'noindex, follow',
};

const privacySeo: AppRouteSeo = {
  title: 'Privacy Policy · Nikita S.',
  description:
    'Privacy Policy for the Nikita S. website, including information about contact form data, communication, and data handling.',
  robots: 'noindex, follow',
};

const notFoundSeo: AppRouteSeo = {
  title: 'Page Not Found · Nikita S.',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow',
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
