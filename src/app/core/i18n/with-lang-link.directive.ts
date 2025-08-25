import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router, UrlSerializer, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter, Subscription } from 'rxjs';

const SUPPORTED_LANGS = ['ru', 'en', 'es', 'de'] as const;

type Cmds = string | any[];

@Directive({
  selector: '[routerLinkWithLang]',
  standalone: true,
})
export class RouterLinkWithLangDirective implements OnChanges, OnDestroy {
  private router = inject(Router);
  private serializer = inject(UrlSerializer);
  private location = inject(Location);
  private cdr = inject(ChangeDetectorRef);

  @Input('routerLinkWithLang') link!: Cmds;
  @Input() queryParams?: Record<string, any>;
  @Input() fragment?: string;

  @HostBinding('attr.href') href?: string;

  private sub: Subscription;

  constructor() {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.updateHref());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['link'] || changes['queryParams'] || changes['fragment']) {
      this.updateHref();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0)
      return;
    ev.preventDefault();
    const commands = this.buildCommands();
    this.router.navigate(commands, {
      queryParams: this.queryParams,
      fragment: this.fragment,
    });
  }

  private updateHref() {
    try {
      const commands = this.buildCommands();
      const tree = this.router.createUrlTree(commands, {
        queryParams: this.queryParams,
        fragment: this.fragment,
      });
      const serialized = this.serializer.serialize(tree);
      const prepared = this.location.prepareExternalUrl(serialized);

      setTimeout(() => {
        this.href = prepared;
        this.cdr.markForCheck();
      }, 0);
    } catch {
      setTimeout(() => {
        this.href = undefined;
        this.cdr.markForCheck();
      }, 0);
    }
  }

  private buildCommands(): any[] {
    const arr = Array.isArray(this.link) ? this.link : [this.link];
    const cmds = arr
      .filter(Boolean)
      .map((c) => (typeof c === 'string' ? c.replace(/^\/+/, '') : c));

    const tree = this.router.parseUrl(this.router.url);
    const firstSeg = tree.root.children['primary']?.segments[0]?.path;
    const hasPrefix =
      !!firstSeg && (SUPPORTED_LANGS as readonly string[]).includes(firstSeg);

    return hasPrefix ? ['/', firstSeg, ...cmds] : ['/', ...cmds];
  }
}
