import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionItemResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { ProjectDetail } from '../projects.model';

export const projectResolver: ResolveFn<SectionItemResult<ProjectDetail>> = (
  route: ActivatedRouteSnapshot
) => {
  const api = inject(SectionApi);
  const slug = route.paramMap.get('slug')!;
  const build = (l: Lang) => `/assets/projects/data/${l}/${slug}.${l}.json`;
  return api.detail<ProjectDetail>(build);
};
