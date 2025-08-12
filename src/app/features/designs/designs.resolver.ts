import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ContentLoaderService } from '@core/data/content-loader.service';

export const designsIndexResolver: ResolveFn<any> = async () => {
  const loader = inject(ContentLoaderService);
  return loader.loadWithFallback((l) => `/assets/data/designs/index.${l}.json`);
};