import { InjectionToken, signal, WritableSignal, effect } from '@angular/core';
import { DEFAULT_LANG, Lang, SUPPORTED_LANGS } from './i18n.model';

function detectInitialLang(): Lang {
  // 1. URL-префикс: /ru/... /es/...
  const path = typeof location !== 'undefined' ? location.pathname : '';
  const seg = path.split('/')[1];
  if (SUPPORTED_LANGS.includes(seg as Lang)) return seg as Lang;

  // 2. localStorage (браузер)
  try {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
    if (saved && SUPPORTED_LANGS.includes(saved as Lang)) return saved as Lang;
  } catch {}

  // 3. navigator (браузер)
  if (typeof navigator !== 'undefined') {
    const browser = navigator.language.split('-')[0] as Lang;
    if (SUPPORTED_LANGS.includes(browser)) return browser;
  }

  // 4. Фолбэк
  return DEFAULT_LANG;
}

export const CURRENT_LANG = new InjectionToken<WritableSignal<Lang>>(
  'CURRENT_LANG',
  {
    factory: () => {
      const s = signal<Lang>(detectInitialLang());

      // Синхронизируем <html lang> и localStorage (только в браузере)
      if (typeof document !== 'undefined') {
        effect(() => {
          const l = s();
          document.documentElement.setAttribute('lang', l);
          try { localStorage.setItem('lang', l); } catch {}
        });
      }

      return s; // ВАЖНО: возвращаем сам сигнал, а не объект-обёртку
    }
  }
);