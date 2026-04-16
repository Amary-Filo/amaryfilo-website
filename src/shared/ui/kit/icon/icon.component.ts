import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { Icons, IconName } from './types';

let NEXT_ID = 0;

type GradientInput = string | string[] | null | undefined;

@Component({
  selector: 'ui-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [NgIcon],
  providers: [provideIcons(Icons)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UIIcon implements AfterViewInit, OnChanges, OnDestroy {
  readonly name = input<IconName>();
  readonly size = input<string>('16px');
  readonly gradient = input<GradientInput>(null);
  readonly gradientId = `ui-icon-grad-${++NEXT_ID}`;

  readonly stop1 = signal<string>('#000');
  readonly stop2 = signal<string>('#000');

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly r = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private observer?: MutationObserver;

  constructor() {
    effect(() => {
      const g = this.gradient();
      const [c1, c2] = this.normalizeGradient(g);

      this.stop1.set(c1);
      this.stop2.set(c2);

      if (this.isBrowser) {
        this.applyFill();
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || typeof MutationObserver === 'undefined') {
      return;
    }

    const host = this.el.nativeElement;

    this.observer = new MutationObserver(() => this.applyFill());
    this.observer.observe(host, { childList: true, subtree: true });

    queueMicrotask(() => this.applyFill());
  }

  ngOnChanges(_: SimpleChanges): void {
    if (!this.isBrowser) {
      return;
    }

    queueMicrotask(() => this.applyFill());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private normalizeGradient(g: GradientInput): [string, string] {
    if (!g) return ['#000000', '#000000'];

    if (Array.isArray(g)) {
      const a = g[0]?.trim() || '#000000';
      const b = g[1]?.trim() || a;

      return [a, b];
    }

    const parts = g
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length >= 2) return [parts[0], parts[1]];

    const single = parts[0] || '#000000';
    return [single, single];
  }

  private getSvgRoot(): SVGElement | null {
    return this.el.nativeElement.querySelector('ng-icon svg');
  }

  private applyFill(): void {
    const svg = this.getSvgRoot();
    if (!svg) return;

    const hasGradient = !!this.gradient();

    const nodes = svg.querySelectorAll<SVGElement>(
      'path, rect, circle, ellipse, polygon, polyline, line, g, use',
    );

    nodes.forEach((node) => {
      if (hasGradient) {
        this.r.setAttribute(node, 'fill', `url(#${this.gradientId})`);
      } else {
        this.r.setAttribute(node, 'fill', 'currentColor');
      }
    });
  }
}
