import { InjectionToken, signal, WritableSignal, effect } from '@angular/core';
import { DEFAULT_LANG, Lang, SUPPORTED_LANGS } from './i18n.model';

function detectInitialLang(): Lang {
  const path = typeof location !== 'undefined' ? location.pathname : '';
  const seg = path.split('/')[1];
  if (SUPPORTED_LANGS.includes(seg as Lang)) return seg as Lang;

  try {
    const saved =
      typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    if (saved && SUPPORTED_LANGS.includes(saved as Lang)) return saved as Lang;
  } catch {}

  if (typeof navigator !== 'undefined') {
    const browser = navigator.language.split('-')[0] as Lang;
    if (SUPPORTED_LANGS.includes(browser)) return browser;
  }

  return DEFAULT_LANG;
}

export const CURRENT_LANG = new InjectionToken<WritableSignal<Lang>>(
  'CURRENT_LANG',
  {
    factory: () => {
      const s = signal<Lang>(detectInitialLang());

      if (typeof document !== 'undefined') {
        effect(() => {
          const l = s();
          document.documentElement.setAttribute('lang', l);
          try {
            localStorage.setItem('lang', l);
          } catch {}
        });
      }

      return s;
    },
  }
);
