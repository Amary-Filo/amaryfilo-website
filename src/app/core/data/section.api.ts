import { Injectable, inject } from '@angular/core';
import { ContentLoaderService, LoadOpts } from './content-loader.service';
import { Lang } from '@core/i18n/i18n.model';

interface SectionResultBase {
  usedLang: Lang;
  requestedLang?: Lang;
  isFallback?: boolean;
}

export interface SectionResult<T> extends SectionResultBase {
  items: T[] | null;
}

export interface SectionItemResult<T> extends SectionResultBase {
  item: T | null;
}

@Injectable({ providedIn: 'root' })
export class SectionApi {
  private loader = inject(ContentLoaderService);

  async list<T>(
    buildPath: (l: Lang) => string,
    opts: LoadOpts = {}
  ): Promise<SectionResult<T>> {
    const r = await this.loader.loadWithFallback<T[]>(buildPath, opts);
    return {
      items: r.data ?? null,
      usedLang: r.usedLang,
      requestedLang: r.requestedLang,
      isFallback: !!r.isFallback,
    };
  }

  async detail<T>(
    buildPath: (l: Lang) => string,
    opts: LoadOpts = {}
  ): Promise<SectionItemResult<T>> {
    const r = await this.loader.loadWithFallback<T>(buildPath, opts);
    return {
      item: r.data ?? null,
      usedLang: r.usedLang,
      requestedLang: r.requestedLang,
      isFallback: !!r.isFallback,
    };
  }
}
