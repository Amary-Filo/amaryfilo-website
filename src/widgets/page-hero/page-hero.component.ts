// src/widgets/page-hero/page-hero.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconName } from '@shared/ui/kit/icon/types';

import { UIButton } from '@ui/kit';

export interface IHeroAction {
  label: string;
  href?: string;
  routerLink?: string;
  target?: '_blank' | '_self';
  rel?: string;
  icon?: IconName;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'extra-lg';
}

@Component({
  selector: 'widget-page-hero',
  standalone: true,
  imports: [RouterLink, UIButton],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetPageHero {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly eyebrow = input<string>('');
  readonly actions = input<IHeroAction[]>([]);
  readonly meta = input<string[]>([]);
  readonly align = input<'left' | 'center'>('left');
}
