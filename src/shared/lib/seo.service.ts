// src/shared/lib/seo.service.ts

import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
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
const SITE_NAME = 'Nikita S.';
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
  private readonly document = inject(DOCUMENT);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  private canonicalLink?: HTMLLinkElement;
  private jsonLdScript?: HTMLScriptElement;

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
    this.updatePropertyMeta('og:site_name', SITE_NAME);
    this.updatePropertyMeta('og:title', seo.title);
    this.updatePropertyMeta('og:description', seo.description);
    this.updatePropertyMeta('og:image', seo.image ?? DEFAULT_OG_IMAGE);
    this.updatePropertyMeta('og:url', seo.url ?? SITE_URL);

    this.updateNamedMeta('twitter:card', 'summary_large_image');
    this.updateNamedMeta('twitter:title', seo.title);
    this.updateNamedMeta('twitter:description', seo.description);
    this.updateNamedMeta('twitter:image', seo.image ?? DEFAULT_OG_IMAGE);

    this.updateCanonical(seo.url ?? SITE_URL);
    this.updateJsonLd(seo.url ?? SITE_URL, seo.image ?? DEFAULT_OG_IMAGE);
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

  private updateCanonical(url: string): void {
    if (!this.canonicalLink) {
      this.canonicalLink = this.renderer.createElement('link');
      this.renderer.setAttribute(this.canonicalLink, 'rel', 'canonical');
      this.renderer.appendChild(this.document.head, this.canonicalLink);
    }

    this.renderer.setAttribute(this.canonicalLink, 'href', url);
  }

  private updateJsonLd(pageUrl: string, imageUrl: string): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: 'en',
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Nikita S.',
          url: SITE_URL,
          image: imageUrl,
          jobTitle: 'Senior Frontend Engineer / Frontend Lead',
          sameAs: ['https://github.com/amaryfilo', 'https://www.linkedin.com/in/amary-filo'],
          knowsAbout: [
            'Angular',
            'TypeScript',
            'Frontend Architecture',
            'Reusable UI Systems',
            'Fintech Frontend',
            'Web3 Interfaces',
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: this.title.getTitle(),
          description: this.meta.getTag('name="description"')?.content ?? DEFAULT_SEO.description,
          isPartOf: {
            '@id': `${SITE_URL}/#website`,
          },
          about: {
            '@id': `${SITE_URL}/#person`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
        },
      ],
    };

    let script = this.jsonLdScript;

    if (!script) {
      script = this.renderer.createElement('script') as HTMLScriptElement;
      this.renderer.setAttribute(script, 'type', 'application/ld+json');
      this.renderer.appendChild(this.document.head, script);
      this.jsonLdScript = script;
    }

    script.text = JSON.stringify(structuredData);
  }
}
