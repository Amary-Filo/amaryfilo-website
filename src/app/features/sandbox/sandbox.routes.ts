import { Routes } from '@angular/router';
import { demoManifestResolver } from './demo-manifest.resolver';

export const SANDBOX_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./sandbox.page').then((m) => m.SandboxPage),
  },
  {
    path: ':kind/:slug',
    loadComponent: () =>
      import('./demo-host/demo-host.page').then((m) => m.DemoHostPage),
    resolve: { manifest: demoManifestResolver },
  },
];
