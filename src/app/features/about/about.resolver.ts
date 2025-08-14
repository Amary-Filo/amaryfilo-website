import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { AreaGroup, SkillsGroup, WorkGroup } from './about.model';

export interface AboutVM {
  areas: SectionResult<AreaGroup>;
  skills: SectionResult<SkillsGroup>;
  work: SectionResult<WorkGroup>;
}

export const aboutResolver: ResolveFn<AboutVM> = async () => {
  const api = inject(SectionApi);
  const build = (name: string) => (l: Lang) =>
    `/assets/pages/about/${name}.${l}.json`;

  const [areas, skills, work] = await Promise.all([
    api.list<AreaGroup>(build('areas')),
    api.list<SkillsGroup>(build('skills')),
    api.list<WorkGroup>(build('work')),
  ]);

  return { areas, skills, work };
};

// import { combineResolvers } from '@core/routing/resolve.helper';
// import { SectionApi } from '@core/data/section.api';
// import { Lang } from '@core/i18n/i18n.model';
// import { inject } from '@angular/core';

// export const aboutResolver = combineResolvers({
//   areas:  () => inject(SectionApi).list((l: Lang) => `/assets/pages/about/areas.${l}.json`),
//   skills: () => inject(SectionApi).list((l: Lang) => `/assets/pages/about/skills.${l}.json`),
//   work:   () => inject(SectionApi).list((l: Lang) => `/assets/pages/about/work.${l}.json`),
// });
