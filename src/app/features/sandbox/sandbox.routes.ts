import { Routes } from '@angular/router';

export const SANDBOX_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./sandbox.page').then((m) => m.SandboxPage),
  },
  {
    path: ':kind/:slug',
    loadComponent: () =>
      import('./demo-host/demo-host.page').then((m) => m.DemoHostPage),
  },
];
