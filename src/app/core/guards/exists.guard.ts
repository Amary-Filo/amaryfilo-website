import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { SectionApi } from '@core/data/section.api';

type PageName =
  | 'designs'
  | 'projects'
  | 'solutions'
  | 'blog'
  | 'sandbox'
  | 'areas';

@Injectable({ providedIn: 'root' })
export class ExistsGuard implements CanActivate {
  constructor(private api: SectionApi, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const slug = route.paramMap.get('slug')!;
    const page = route.data['page'] as PageName | undefined;
    if (!page || !slug) return true;

    const res = await this.api.list<string | { slug: string }>(
      () => `/assets/${page}/index.json`,
      { cache: true, ttlMs: 30 * 60_000, key: `index::${page}` }
    );

    const slugs = (res.items ?? []).map((i) =>
      typeof i === 'string' ? i : i.slug
    );
    if (!slugs.includes(slug)) {
      await this.router.navigateByUrl('/404');
      return false;
    }
    return true;
  }
}
