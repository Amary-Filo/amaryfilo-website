import { Pipe, PipeTransform, inject } from '@angular/core';
import { Router } from '@angular/router';

const SUPPORTED_LANGS = ['ru', 'en', 'es', 'de'] as const;

@Pipe({
  name: 'withLang',
  standalone: true,
})
export class WithLangPipe implements PipeTransform {
  private router = inject(Router);

  transform(commands: string[] | string): string[] {
    const urlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children['primary']?.segments ?? [];
    const firstSeg = segments.length ? segments[0].path : null;

    const langPrefix = SUPPORTED_LANGS.includes(firstSeg as any)
      ? firstSeg
      : null;
    const arr = Array.isArray(commands) ? commands : [commands];

    // Добавляем язык в начало, если он есть
    return langPrefix ? ['/', langPrefix, ...arr] : ['/', ...arr];
  }
}
