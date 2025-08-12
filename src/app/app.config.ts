import { APP_INITIALIZER, ApplicationConfig, inject, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, WritableSignal } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CURRENT_LANG } from '@core/i18n/i18n.tokens';

import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@core/i18n/translate.service';
import { Lang } from '@core/i18n/i18n.model';

registerLocaleData(localeRu);
registerLocaleData(localeEn);
registerLocaleData(localeEs);
registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const translate = inject(TranslateService);
        const currentLang = inject(CURRENT_LANG);
        return () => translate.load(currentLang());
      }
    },
    {
      provide: LOCALE_ID,
      deps: [CURRENT_LANG],
      useFactory: (i18n: WritableSignal<Lang>) => i18n()
    },
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ), 
  ]
};
