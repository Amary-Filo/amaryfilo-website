import { Component, Inject, WritableSignal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEMO_CONFIG, DEMO_THEME } from '@sandbox/shared/utils/tokens';
import type { AccordionConfig } from '../manifest';

@Component({
  selector: 'sbx-accordion-controls-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class AccordionControlsComponent {
  constructor(
    @Inject(DEMO_CONFIG) public config: WritableSignal<AccordionConfig>,
    @Inject(DEMO_THEME) public theme: WritableSignal<'light' | 'dark'>
  ) {}

  cfg = computed(() => this.config());

  set<K extends keyof AccordionConfig>(key: K, value: AccordionConfig[K]) {
    this.config.update((c) => ({ ...c, [key]: value }));
  }

  toggle<K extends keyof AccordionConfig>(key: K) {
    const curr = this.cfg()[key];
    if (typeof curr === 'boolean') this.set(key, !curr as any);
  }
}
