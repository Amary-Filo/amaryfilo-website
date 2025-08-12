import { Injectable, inject } from '@angular/core';
import { DEFAULT_LANG, Lang } from '../i18n/i18n.model';
import { buildAssetsUrl, safeGetJson } from './json-loader';
import { CURRENT_LANG } from '../i18n/i18n.tokens';

@Injectable({ providedIn: 'root' })
export class ContentLoaderService {
  private lang = inject(CURRENT_LANG);

  async loadWithFallback<T>(
    buildPath: (lang: Lang) => string
  ): Promise<{ data: T|null; usedLang: Lang, requestedLang?: Lang, isFallback?: boolean }> {
    const currentLang = this.lang();

    // let data = await safeGetJson<T>(buildPath(currentLang));
    let data = await safeGetJson<T>(buildAssetsUrl(buildPath(currentLang)));

    if (!data && currentLang !== DEFAULT_LANG) {
      data = await safeGetJson<T>(buildPath(DEFAULT_LANG));
      return { data, usedLang: DEFAULT_LANG, requestedLang: currentLang, isFallback: true };
    }
    return { data, usedLang: currentLang };
  }
}