import { Injectable, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: Theme = 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _theme = signal<Theme>(DEFAULT_THEME);
  theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const t = this._theme();
      if (!this.isBrowser) return;

      const body = this.doc.body as HTMLBodyElement;
      if (t === 'dark') body.id = 'dark';
      else body.removeAttribute('id');

      try {
        localStorage.setItem(THEME_STORAGE_KEY, t);
      } catch {
        /* noop */
      }
    });
  }

  init() {
    if (!this.isBrowser) return;

    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        this._theme.set(saved);
        return;
      }
    } catch {}

    const prefersDark = this.doc.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches;
    this._theme.set(prefersDark ? 'dark' : 'light');
  }

  set(theme: Theme) {
    this._theme.set(theme);
  }

  toggle() {
    this._theme.set(this._theme() === 'dark' ? 'light' : 'dark');
  }
}
