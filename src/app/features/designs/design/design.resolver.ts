import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { DesignsApi } from '@data-access/designs.api';

export const designResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const api = inject(DesignsApi);
  const slug = route.paramMap.get('slug')!;
  return api.detail(slug);
};