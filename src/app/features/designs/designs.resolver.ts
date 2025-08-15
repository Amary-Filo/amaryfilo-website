import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { SectionApi, SectionResult } from '@core/data/section.api';
import { Lang } from '@core/i18n/i18n.model';
import { DesignIndexItem } from '@core/data/designs.api';

export const designsIndexResolver: ResolveFn<
  SectionResult<DesignIndexItem>
> = async () => {
  const api = inject(SectionApi);
  const build = (l: Lang) => `/assets/designs/index.${l}.json`;
  return api.list<DesignIndexItem>(build);
};
