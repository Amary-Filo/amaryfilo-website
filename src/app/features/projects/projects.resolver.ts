import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { ProjectIndexItem } from './projects.model';

export const projectsIndexResolver: ResolveFn<
  SectionResult<ProjectIndexItem>
> = async () => {
  const api = inject(SectionApi);
  const build = (l: Lang) => `/assets/projects/index.${l}.json`;
  return api.list<ProjectIndexItem>(build);
};
