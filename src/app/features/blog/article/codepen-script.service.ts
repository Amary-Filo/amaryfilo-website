import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CodepenScriptService {
  private loaded = false;

  ensureLoaded(): void {
    if (this.loaded) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
    document.body.appendChild(s);
    this.loaded = true;
  }
}
