import {
  Component,
  computed,
  effect,
  Inject,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { UIAccordionComponent } from '@sandbox/shared/components/accordion/accordion.component';
import { DEMO_CONFIG, DEMO_THEME } from '@sandbox/shared/utils/tokens';
import { AccordionConfig } from '../manifest';

@Component({
  selector: 'sbx-ui-accordion-component',
  imports: [UIAccordionComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  standalone: true,
})
export class AccordionComponent {
  constructor(
    @Inject(DEMO_CONFIG) public config: WritableSignal<AccordionConfig>,
    @Inject(DEMO_THEME) public theme: WritableSignal<'light' | 'dark'>
  ) {}

  cfg = computed(() => this.config());

  patch<K extends keyof AccordionConfig>(key: K, value: AccordionConfig[K]) {
    this.config.update((c) => ({ ...c, [key]: value }));
  }
}
