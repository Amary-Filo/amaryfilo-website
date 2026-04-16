// src/pages/main/components/experience/experience.component.ts

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { UIButton } from '@ui/kit';
import { ExperienceFacade, ExperienceList } from '@entities';

@Component({
  selector: 'widget-experience',
  standalone: true,
  imports: [UIButton, RouterLink, ExperienceList],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  // host: {
  //   '[attr.data-list]': 'onlyList() ? "" : null',
  // },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetExperience {
  private readonly experienceFacade = inject(ExperienceFacade);

  readonly variant = input<'preview' | 'full'>('preview');
  readonly onlyList = input(false, { transform: booleanAttribute });
  readonly list = computed(() =>
    this.variant() === 'full'
      ? this.experienceFacade.getAll()
      : this.experienceFacade.getFeatured(3),
  );
}
