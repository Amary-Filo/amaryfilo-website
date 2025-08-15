import { Injectable, inject } from '@angular/core';
import { DEFAULT_LANG, Lang } from '../i18n/i18n.model';
import { buildAssetsUrl, safeGetJson } from './json-loader';
import { CURRENT_LANG } from '../i18n/i18n.tokens';

export type LoadOpts = {
  cache?: boolean;
  ttlMs?: number;
  key?: string;
  langOverride?: Lang;
};

type LoadResult<T> = {
  data: T | null;
  usedLang: Lang;
  requestedLang?: Lang;
  isFallback?: boolean;
};

@Injectable({ providedIn: 'root' })
export class ContentLoaderService {
  private lang = inject(CURRENT_LANG);

  private memory =
    typeof window !== 'undefined'
      ? new Map<string, { ts: number; data: any }>()
      : null;

  private makeKey(url: string, lang: Lang, key?: string) {
    return key ?? `${lang}::${url}`;
  }

  private fromMemory<T>(key: string, ttlMs: number | undefined): T | null {
    if (!this.memory) return null;

    const rec = this.memory.get(key);
    if (!rec) return null;

    if (ttlMs && Date.now() - rec.ts > ttlMs) {
      this.memory.delete(key);
      return null;
    }
    return rec.data as T;
  }

  private saveMemory(key: string, data: any) {
    if (!this.memory) return;
    this.memory.set(key, { ts: Date.now(), data });
  }

  async loadWithFallback<T>(
    buildPath: (lang: Lang) => string,
    opts: LoadOpts = {}
  ): Promise<LoadResult<T>> {
    const { cache = true, ttlMs = 5 * 60_000, key } = opts;
    const currentLang = this.lang();

    const urlCur = buildAssetsUrl(buildPath(currentLang));
    const urlDef = buildAssetsUrl(buildPath(DEFAULT_LANG));

    const kCur = this.makeKey(urlCur, currentLang, key);
    const kDef = this.makeKey(urlDef, DEFAULT_LANG, key);

    if (cache) {
      const hit = this.fromMemory<T>(kCur, ttlMs);
      if (hit) return { data: hit, usedLang: currentLang };
    }

    let data = await safeGetJson<T>(urlCur);
    if (data) {
      if (cache) this.saveMemory(kCur, data);
      return { data, usedLang: currentLang };
    }

    if (currentLang !== DEFAULT_LANG) {
      if (cache) {
        const hit2 = this.fromMemory<T>(kDef, ttlMs);
        if (hit2)
          return {
            data: hit2,
            usedLang: DEFAULT_LANG,
            requestedLang: currentLang,
            isFallback: true,
          };
      }

      data = await safeGetJson<T>(urlDef);
      if (data) {
        if (cache) this.saveMemory(kDef, data);
        return {
          data,
          usedLang: DEFAULT_LANG,
          requestedLang: currentLang,
          isFallback: true,
        };
      }
    }

    return { data: null, usedLang: currentLang };
  }
}
