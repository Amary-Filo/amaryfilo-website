import { Injectable, inject } from '@angular/core';
import { ContentLoaderService } from './content-loader.service';
import { Lang } from '@core/i18n/i18n.model';

export interface SectionResult<T> {
  items: T[];
  usedLang: string;
  requestedLang?: string;
  isFallback?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SectionApi {
  private loader = inject(ContentLoaderService);

  async list<T>(buildPath: (l: Lang) => string): Promise<SectionResult<T>> {
    const r = await this.loader.loadWithFallback<T[]>(buildPath);
    return {
      items: r.data ?? [],
      usedLang: r.usedLang,
      requestedLang: r.requestedLang,
      isFallback: !!r.isFallback,
    };
  }

  async item<T>(buildPath: (l: Lang) => string) {
    return this.loader.loadWithFallback<T>(buildPath);
  }
}
