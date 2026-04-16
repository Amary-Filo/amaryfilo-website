// src/shared/ui/kit/spinner/spinner.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from './icon/types';
import { UIIcon } from './icon/icon.component';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [UIIcon],
  template: `<ui-icon class="icon" [size]="size()" [name]="icon()" /> `,
  styles: `
    :host {
      --cp-spn-fg: var(--ui-sem-muted-rgb);
      --cp-spn-fg-a: var(--ui-alpha-100);
      --cp-spn-speed: 1.4s;

      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--cp-spn-fg-a) / var(--cp-spn-fg-a));
    }

    .icon {
      animation: spinner-rotate var(--cp-spn-speed) linear infinite;
      transform-origin: 50% 50%;
    }

    @keyframes spinner-rotate {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spinner',
    'aria-hidden': 'true',
    '[style.--spinner-speed.s]': 'speed()',
    '[style.--spinner-color]': 'color() ?? null',
  },
})
export class UISpinner {
  color = input<string | null>(null);
  size = input<string>('28');
  speed = input<string>('1.4');
  icon = input<IconName>('loader2Line');
}
