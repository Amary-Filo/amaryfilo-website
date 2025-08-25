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

    // 1) мгновенно обновляем сигнал (UI сразу подхватит текущий язык)
    this.langSig.set(lang);

    // 2) грузим переводы параллельно (не блокируя навигацию)
    const loadPromise = this.t.load(lang).catch(() => {
      /* no-op fallback */
    });

    // 3) аккуратно перестраиваем URL с префиксом языка
    const tree = this.router.parseUrl(this.router.url);
    const primary = tree.root.children['primary'];
    const segs = primary?.segments ?? [];

    let commands: any[];
    if (segs.length && SUP.includes(segs[0].path as Lang)) {
      // заменяем существующий префикс
      commands = ['/', lang, ...segs.slice(1).map((s) => s.path)];
    } else {
      // добавляем префикс
      commands = ['/', lang, ...segs.map((s) => s.path)];
    }

    await this.router.navigate(commands, { replaceUrl: true });

    // 4) дожидаемся перевода (к этому времени UI уже на нужном URL)
    await loadPromise;
  }
}
