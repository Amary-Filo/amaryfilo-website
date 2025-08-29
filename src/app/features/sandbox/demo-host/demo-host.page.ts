import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  input,
  signal,
  createEnvironmentInjector,
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { SbxFrameComponent } from '../shared/frame/sbx-frame.component';
import { DEMO_CONFIG, DEMO_THEME, Manifest } from '../shared/utils/tokens';

@Component({
  selector: 'app-demo-host',
  standalone: true,
  imports: [NgComponentOutlet, SbxFrameComponent, CommonModule],
  templateUrl: './demo-host.page.html',
  styleUrl: './demo-host.page.scss',
})
export class DemoHostPage {
  readonly manifest = input<Manifest | null>(null);

  readonly theme = signal<'light' | 'dark'>('light');
  readonly config = signal<any>({});

  private parentEnv = inject(EnvironmentInjector);

  readonly demoInjector = computed(() =>
    createEnvironmentInjector(
      [
        { provide: DEMO_CONFIG, useValue: this.config },
        { provide: DEMO_THEME, useValue: this.theme },
      ],
      this.parentEnv
    )
  );

  constructor() {
    effect(() => {
      const m = this.manifest();
      if (!m) return;
      this.config.set({ ...(m.defaultConfig ?? {}) });
      this.theme.set('light');
    });
  }
}
