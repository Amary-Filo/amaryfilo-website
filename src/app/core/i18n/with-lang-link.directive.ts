import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

const SUPPORTED_LANGS = ['ru', 'en', 'es', 'de'] as const;

@Directive({
  selector: '[routerLinkWithLang]',
  standalone: true,
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink', 'queryParams', 'fragment'],
    },
  ],
})
export class RouterLinkWithLangDirective implements OnChanges {
  @Input('routerLinkWithLang') link!: string | string[];

  private router = inject(Router);
  private routerLink = inject(RouterLink);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['link']) {
      const urlTree = this.router.parseUrl(this.router.url);
      const segments = urlTree.root.children['primary']?.segments ?? [];
      const firstSeg = segments.length ? segments[0].path : null;

      const langPrefix = SUPPORTED_LANGS.includes(firstSeg as any)
        ? firstSeg
        : null;
      const arr = Array.isArray(this.link) ? this.link : [this.link];

      this.routerLink.routerLink = langPrefix
        ? ['/', langPrefix, ...arr]
        : ['/', ...arr];
    }
  }
}
