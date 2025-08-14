import { SectionApi } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const homeLatestResolver: ResolveFn<Promise<any>> = async () => {
  const api = inject(SectionApi);
  const build = (name: string) => (l: Lang) =>
    `/assets/${name}/latest.${l}.json`;

  const [designs, blog, projects, solutions, sandbox] = await Promise.all([
    api.list(build('designs')),
    api.list(build('blog')),
    api.list(build('projects')),
    api.list(build('solutions')),
    api.list(build('sandbox')),
  ]);

  return { designs, blog, projects, solutions, sandbox };
};
