/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

bootstrapApplication(App, appConfig)
  .then(() => {
    const isBrowser =
      typeof window !== 'undefined' && typeof document !== 'undefined';
    if (isBrowser && !isDevMode()) {
      injectAnalytics();
      injectSpeedInsights();
    }
  })
  .catch((err) => console.error(err));
