// src/app/core/data/home-latest.api.ts
import { Injectable, inject } from '@angular/core';
import { ContentLoaderService } from './content-loader.service';
import { Lang } from '@core/i18n/i18n.model';
import { LatestMap, LatestResult, Section } from './latest.model';

@Injectable({ providedIn: 'root' })
export class HomeLatestApi {
  private loader = inject(ContentLoaderService);

  async latest<K extends keyof LatestMap>(
    section: K
  ): Promise<LatestResult<LatestMap[K]>> {
    const r = await this.loader.loadWithFallback<LatestMap[K][]>(
      (l) => `/assets/${section}/latest.${l}.json`
    );
    return {
      items: r.data ?? [],
      usedLang: r.usedLang as Lang,
      requestedLang: r.requestedLang as Lang | undefined,
      isFallback: !!r.isFallback,
    };
  }
}
