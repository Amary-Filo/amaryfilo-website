import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { BlogIndexItem } from './blog.model';

export const blogIndexResolver: ResolveFn<
  SectionResult<BlogIndexItem>
> = async () => {
  const api = inject(SectionApi);
  const build = (l: Lang) => `/assets/blog/index.${l}.json`;
  return api.list<BlogIndexItem>(build);
};
