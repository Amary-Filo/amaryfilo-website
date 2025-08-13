import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HomeLatestApi } from '@core/data/home-latest.api';

export const homeLatestResolver: ResolveFn<Promise<any>> = async () => {
  const api = inject(HomeLatestApi);
  const [designs, blog, projects, solutions, sandbox] = await Promise.all([
    api.latest('designs'),
    api.latest('blog'),
    api.latest('projects'),
    api.latest('solutions'),
    api.latest('sandbox'),
  ]);
  return { designs, blog, projects, solutions, sandbox };
};
