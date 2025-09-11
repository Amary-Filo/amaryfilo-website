import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FrameService {
  readonly frameless = signal(false);

  setFrameless(v: boolean) {
    this.frameless.set(v);
  }

  toggleFrameless() {
    this.frameless.update((v) => !v);
  }
}
