// src/app/data-access/designs.api.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CURRENT_LANG } from '@core/i18n/i18n.tokens';
import { DEFAULT_LANG, Lang } from '@core/i18n/i18n.model';

export interface DesignIndexItem { slug: string; title: string; date: string; cover?: string; }
export interface DesignDetail { slug: string; title: string; date: string; body?: string; images?: string[]; }

export interface DesignsResult<T> {
  items: T[];
  lang: Lang;
  requestedLang?: Lang;
  isFallback: boolean;  
}

@Injectable({ providedIn: 'root' })
export class DesignsApi {
  private http = inject(HttpClient);
  private i18n = inject(CURRENT_LANG);

  async index(langOverride?: Lang): Promise<DesignsResult<DesignIndexItem>> {
    const requested = (langOverride ?? this.i18n()) as Lang;
    const primaryUrl = `/assets/data/designs/index.${requested}.json`;

    try {
      const items = await firstValueFrom(
        this.http.get<DesignIndexItem[]>(primaryUrl)
      );
      return { items, lang: requested, isFallback: false };
    } catch {
      const fallback = DEFAULT_LANG as Lang;
      const fbUrl = `/assets/data/designs/index.${fallback}.json`;
      const items = await firstValueFrom(
        this.http.get<DesignIndexItem[]>(fbUrl)
      );
      return { items, lang: fallback, requestedLang: requested, isFallback: true };
    }
  }

  async detail(slug: string, langOverride?: string): Promise<DesignsResult<DesignDetail>> {
    const requested = (langOverride ?? this.i18n()) as Lang;
    const primaryUrl = `/assets/data/designs/${requested}/${slug}.json`;

    try {
      const items = await firstValueFrom(
        this.http.get<DesignDetail[]>(primaryUrl)
      );
      return { items, lang: requested, isFallback: false };
    } catch {
      const fallback = DEFAULT_LANG as Lang;
      const fbUrl = `/assets/data/designs/${fallback}/${slug}.json`;
      const items = await firstValueFrom(
        this.http.get<DesignDetail[]>(fbUrl)
      );
      return { items, lang: fallback, requestedLang: requested, isFallback: true };
    }
  }
}
