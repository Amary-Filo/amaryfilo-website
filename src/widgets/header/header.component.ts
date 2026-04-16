// src/widgets/header/header.component.ts

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { UIIcon, UIButton } from '@shared/ui/kit';
import { HeaderBase } from '@shared/ui/header/model/header-base';

interface NavItem {
  id: string;
  label: string;
  type: 'route' | 'anchor' | 'file';
  route?: string;
  anchorId?: string;
  href?: string;
}

@Component({
  selector: 'widget-header',
  standalone: true,
  imports: [RouterLink, UIIcon, UIButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetHeader extends HeaderBase implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);

  private observer?: IntersectionObserver;

  readonly navItems: NavItem[] = [
    { id: 'about', label: 'About', type: 'route', route: '/about' },
    { id: 'demos', label: 'Demos', type: 'route', route: '/demos' },
    { id: 'work', label: 'Work', type: 'route', route: '/works' },
    {
      id: 'resume',
      label: 'Resume',
      type: 'file',
      href: '/Nikita-Syreishchikov-Senior-Frontend-Engineer.pdf',
    },
    { id: 'contact', label: 'Contact', type: 'anchor', anchorId: 'contact' },
  ];

  readonly activePage = signal<string | null>(null);
  readonly activeSection = signal<string | null>(null);

  constructor() {
    super();

    this.setActivePage(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setActivePage(event.urlAfterRedirects);
        this.setupSectionObserver();
      });
  }

  ngAfterViewInit(): void {
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  isItemActive(item: NavItem): boolean {
    if (item.type === 'route') return this.activePage() === item.route;

    if (item.type === 'anchor') {
      return this.activePage() === '/' && this.activeSection() === item.anchorId;
    }

    return false;
  }

  async onNavItemClick(item: NavItem): Promise<void> {
    if (item.type === 'file' && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      this.closeMenuOnMobile();
      return;
    }

    if (item.type === 'route' && item.route) {
      await this.router.navigateByUrl(item.route);
      this.closeMenuOnMobile();
      return;
    }

    if (item.type === 'anchor' && item.anchorId) {
      if (this.activePage() !== '/') {
        await this.router.navigateByUrl('/');
        setTimeout(() => this.scroll.scrollTo(item.anchorId!), 0);
      } else this.scroll.scrollTo(item.anchorId);

      this.activeSection.set(item.anchorId);
      this.closeMenuOnMobile();
    }
  }

  private setActivePage(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0] || '/';
    this.activePage.set(cleanUrl === '' ? '/' : cleanUrl);
  }

  private setupSectionObserver(): void {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    )
      return;

    this.observer?.disconnect();
    this.observer = undefined;

    if (this.activePage() !== '/') {
      this.activeSection.set(null);
      return;
    }

    const anchorItems = this.navItems.filter((item) => item.type === 'anchor' && item.anchorId);

    this.observer = new IntersectionObserver(
      (entries) => {
        let best: { id: string; ratio: number } | null = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const id = (entry.target as HTMLElement).id;
          if (!id) continue;

          if (!best || entry.intersectionRatio > best.ratio)
            best = { id, ratio: entry.intersectionRatio };
        }

        if (best) this.activeSection.set(best.id);
      },
      {
        root: null,
        threshold: 0.35,
      },
    );

    for (const item of anchorItems) {
      const el = document.getElementById(item.anchorId!);
      if (el) this.observer.observe(el);
    }
  }
}
