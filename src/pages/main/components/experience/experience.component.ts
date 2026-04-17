// src/pages/main/components/experience/experience.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UIButton } from '@ui/kit';
import { ExperienceFacade, ExperienceList } from '@entities';

@Component({
  selector: 'section-experience',
  standalone: true,
  imports: [UIButton, RouterLink, ExperienceList],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSection {
  private readonly experienceFacade = inject(ExperienceFacade);

  readonly list = this.experienceFacade.getFeatured(3);
}
