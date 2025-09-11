import {
  Injectable,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CodepenScriptService {
  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(this.platformId);
  private loaded = false;
  private readonly SCRIPT_ID = 'codepen-embed-script';

  ensureLoaded() {
    if (!this.isBrowser || this.loaded) return;

    afterNextRender({
      write: () => {
        if (this.loaded) return;
        if (this.doc.getElementById(this.SCRIPT_ID)) {
          this.loaded = true;
          return;
        }
        const s = this.doc.createElement('script');
        s.id = this.SCRIPT_ID;
        s.async = true;
        s.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
        this.doc.body.appendChild(s);
        this.loaded = true;
      },
    });
  }
}
