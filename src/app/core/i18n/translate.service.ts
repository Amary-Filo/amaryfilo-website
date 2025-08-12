import { Injectable} from '@angular/core';
import { DEFAULT_LANG, Lang } from './i18n.model';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations: Record<string, string> = {};

  async load(lang: Lang): Promise<any> {
    try {
      this.translations = await fetch(`/assets/i18n/${lang}.json`).then(r => r.json());
    } catch {
      if (lang !== DEFAULT_LANG) {
        return this.load(DEFAULT_LANG);
      }
    }
  }

  t(key: string, params?: Record<string, any>): string {
    let s = this.translations[key] || key;
    if (params) {
      s = s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, p1) => {
        const v = params[p1];
        return v === undefined || v === null ? '' : String(v);
      });
    }
    return s;
  }
}