import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionItemResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { DesignDetail } from '../designs.model';

export const designResolver: ResolveFn<SectionItemResult<DesignDetail>> = (
  route: ActivatedRouteSnapshot
) => {
  const api = inject(SectionApi);
  const slug = route.paramMap.get('slug')!;
  const build = (l: Lang) => `/assets/designs/data/${l}/${slug}.${l}.json`;
  return api.detail<DesignDetail>(build);
};
