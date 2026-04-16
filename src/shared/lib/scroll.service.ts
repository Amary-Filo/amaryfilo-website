// src/shared/lib/scroll.service.ts

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly headerOffset = signal(80);

  setHeaderOffset(px: number): void {
    this.headerOffset.set(px);
  }

  scrollTo(id: string, behavior: ScrollBehavior = 'smooth'): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const el = document.getElementById(id);
    if (!el) return;

    const top = window.scrollY + el.getBoundingClientRect().top - this.headerOffset() - 16;

    window.scrollTo({ top, behavior });
  }
}
