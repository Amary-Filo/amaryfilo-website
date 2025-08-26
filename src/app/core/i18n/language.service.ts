import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_LANG } from '@core/i18n/i18n.tokens';
import { TranslateService } from '@core/i18n/translate.service';
import { Lang } from '@core/i18n/i18n.model';

const SUP = ['en', 'ru', 'es', 'de'] as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSig = inject(CURRENT_LANG);
  private t = inject(TranslateService);
  private router = inject(Router);

  get current() {
    return this.langSig();
  }

  async switch(lang: Lang) {
    if (this.langSig() === lang) return;
    this.langSig.set(lang);

    const loadPromise = this.t.load(lang).catch(() => {});

    const tree = this.router.parseUrl(this.router.url);
    const primary = tree.root.children['primary'];
    const segs = primary?.segments ?? [];

    let commands: any[];
    if (segs.length && SUP.includes(segs[0].path as Lang)) {
      commands = ['/', lang, ...segs.slice(1).map((s) => s.path)];
    } else {
      commands = ['/', lang, ...segs.map((s) => s.path)];
    }

    await this.router.navigate(commands, { replaceUrl: true });

    await loadPromise;
  }
}
