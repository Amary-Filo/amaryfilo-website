import { Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_LANG } from '@core/i18n/i18n.tokens';
import { TranslateService } from '@core/i18n/translate.service';
import { Lang } from '@core/i18n/i18n.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSig = inject(CURRENT_LANG);
  private t = inject(TranslateService);
  private router = inject(Router);
  private zone = inject(NgZone);

  get current() {
    return this.langSig();
  }

  async switch(lang: Lang) {
    if (this.langSig() === lang) return;

    await this.t.load(lang);

    const tree = this.router.parseUrl(this.router.url);
    const segs = tree.root.children['primary']?.segments ?? [];
    if (segs.length && ['en', 'ru', 'es', 'de'].includes(segs[0].path)) {
      segs[0].path = lang;
      const newUrl = '/' + segs.map((s) => s.path).join('/');
      await this.router.navigateByUrl(newUrl, { replaceUrl: true });
    }

    queueMicrotask(() => {
      this.zone.run(() => this.langSig.set(lang));
    });
  }
}
