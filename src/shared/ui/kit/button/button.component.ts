// src/shared/ui/kit/button/button.component.ts

import {
  Component,
  computed,
  input,
  booleanAttribute,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgpButton } from 'ng-primitives/button';

import { UIIcon } from '../icon/icon.component';
import { IconName } from '../icon/types';
import { UISpinner } from '../spinner.component';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'extra-lg';
export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'link';

@Component({
  selector: 'button[ui-button], a[ui-button]',
  standalone: true,
  hostDirectives: [{ directive: NgpButton, inputs: ['disabled'] }],
  imports: [UISpinner, UIIcon],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-pill]': 'pill() ? "" : null',
    '[attr.data-icon-only]': 'iconOnly() ? "" : null',
    '[attr.data-loading]': 'loading() ? "" : null',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.data-full]': 'fill() ? "" : null',
    '[attr.data-uppercase]': 'uppercase() ? "" : null',
    '[attr.data-gradient]': 'gradient() ? "" : null',
    '[attr.data-active]': 'active() ? "" : null',

    '[style.--cp-btn-gradient-from]': 'resolvedGradientFrom()',
    '[style.--cp-btn-gradient-to]': 'resolvedGradientTo()',
    '[style.--cp-btn-gradient-hover-angle]': 'resolvedGradientHoverAngle()',
    '[style.--cp-btn-gradient-active-angle]': 'resolvedGradientActiveAngle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UIButton {
  readonly pill = input(false, { transform: booleanAttribute });
  readonly uppercase = input(false, { transform: booleanAttribute });
  readonly icon = input<IconName | null>(null);
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly fill = input(false, { transform: booleanAttribute });
  readonly loading = input(false);
  readonly active = input(false, { transform: booleanAttribute });
  readonly size = input<ButtonSize>('md');
  readonly variant = input<ButtonVariant>('primary');

  readonly gradient = input(false, { transform: booleanAttribute });

  // optional overrides
  readonly gradientFrom = input<string>('rgb(var(--cp-btn-base) / 1)');
  readonly gradientTo = input<string>('rgb(var(--cp-btn-base) / 0.82)');
  readonly gradientHoverAngle = input<string>('35deg');
  readonly gradientActiveAngle = input<string>('-15deg');

  readonly showLeadingIcon = computed(() => !this.loading() && !!this.icon() && !this.iconOnly());
  readonly resolvedGradientFrom = computed(() => (this.gradient() ? this.gradientFrom() : null));
  readonly resolvedGradientTo = computed(() => (this.gradient() ? this.gradientTo() : null));
  readonly resolvedGradientHoverAngle = computed(() =>
    this.gradient() ? this.gradientHoverAngle() : null,
  );

  readonly resolvedGradientActiveAngle = computed(() =>
    this.gradient() ? this.gradientActiveAngle() : null,
  );
}
