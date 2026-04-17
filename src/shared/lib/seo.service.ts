// src/shared/lib/seo.service.ts

import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface AppRouteSeo {
  title: string;
  description: string;
  robots?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export const DEFAULT_ROBOTS = 'index, follow';
const SITE_URL = 'https://amaryfilo.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-main.png`;

const DEFAULT_SEO: AppRouteSeo = {
  title: 'Nikita S. · Senior Frontend Engineer / Frontend Lead',
  description:
    'Senior Frontend Engineer / Frontend Lead focused on Angular, frontend architecture, reusable UI systems, and fintech / Web3 product interfaces.',
  robots: DEFAULT_ROBOTS,
  image: DEFAULT_OG_IMAGE,
  url: SITE_URL,
  type: 'website',
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    if (this.router.navigated) this.applyCurrentRouteSeo();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.applyCurrentRouteSeo());
  }

  private applyCurrentRouteSeo(): void {
    const seo = this.resolveSeo(this.router.routerState.snapshot.root);

    this.title.setTitle(seo.title);

    this.updateNamedMeta('description', seo.description);
    this.updateNamedMeta('robots', seo.robots ?? DEFAULT_ROBOTS);

    this.updatePropertyMeta('og:type', seo.type ?? 'website');
    this.updatePropertyMeta('og:title', seo.title);
    this.updatePropertyMeta('og:description', seo.description);
    this.updatePropertyMeta('og:image', seo.image ?? DEFAULT_OG_IMAGE);
    this.updatePropertyMeta('og:url', seo.url ?? SITE_URL);

    this.updateNamedMeta('twitter:card', 'summary_large_image');
    this.updateNamedMeta('twitter:title', seo.title);
    this.updateNamedMeta('twitter:description', seo.description);
    this.updateNamedMeta('twitter:image', seo.image ?? DEFAULT_OG_IMAGE);
  }

  private resolveSeo(snapshot: ActivatedRouteSnapshot): AppRouteSeo {
    let current = snapshot;

    while (current.firstChild) current = current.firstChild;

    const routeSeo = (current.data['seo'] as Partial<AppRouteSeo> | undefined) ?? {};
    const currentPath = this.router.url.split('?')[0].split('#')[0];

    return {
      ...DEFAULT_SEO,
      ...routeSeo,
      url: routeSeo.url ?? this.buildAbsoluteUrl(currentPath),
    };
  }

  private buildAbsoluteUrl(path: string): string {
    if (!path || path === '/') return SITE_URL;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private updateNamedMeta(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private updatePropertyMeta(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }
}
