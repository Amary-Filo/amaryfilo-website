import { inject } from '@angular/core';
import { SectionApi } from './section.api';
import { Lang } from '@core/i18n/i18n.model';

export type PathBuilder = (lang: Lang) => string;

export function makeListLoader<T>(path: PathBuilder) {
  return () => {
    const api = inject(SectionApi);
    return api.list<T>(path);
  };
}

export function makeItemLoader<T>(path: PathBuilder) {
  return () => {
    const api = inject(SectionApi);
    return api.item<T>(path);
  };
}
