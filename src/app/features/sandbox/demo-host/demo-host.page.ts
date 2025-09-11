import {
  Component,
  computed,
  effect,
  EnvironmentInjector,
  inject,
  input,
  signal,
  createEnvironmentInjector,
  OnDestroy,
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { SbxFrameComponent } from '../shared/frame/sbx-frame.component';
import { DEMO_CONFIG, DEMO_THEME, Manifest } from '../shared/utils/tokens';
import { FrameService } from '@sandbox/shared/frame/frame.service';

@Component({
  selector: 'app-demo-host',
  standalone: true,
  imports: [NgComponentOutlet, SbxFrameComponent, CommonModule],
  templateUrl: './demo-host.page.html',
  styleUrl: './demo-host.page.scss',
})
export class DemoHostPage implements OnDestroy {
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

  readonly layout = inject(FrameService);

  constructor() {
    effect(() => {
      const m = this.manifest();
      if (!m) return;

      this.config.set({ ...(m.defaultConfig ?? {}) });
      this.theme.set('light');

      const ui = (m.defaultConfig as any)?.ui ?? {};
      this.layout.setFrameless(!!ui.frameless);
    });

    effect(() =>
      document.body.classList.toggle('sbx-frameless', this.layout.frameless())
    );
  }

  changeLayout(): void {
    this.layout.setFrameless(!this.layout.frameless());
  }

  ngOnDestroy() {
    this.layout.setFrameless(false);
    document.body.classList.remove('sbx-frameless');
  }
}
