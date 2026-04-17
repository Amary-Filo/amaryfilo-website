// src/pages/about/components/experience/experience.component.ts

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExperienceFacade, ExperienceList } from '@entities';
import { UIFormField, IUSwitch } from '@ui/kit';

@Component({
  selector: 'section-experience',
  standalone: true,
  imports: [ExperienceList, UIFormField, IUSwitch, FormsModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceSection {
  private readonly experienceFacade = inject(ExperienceFacade);

  readonly list = this.experienceFacade.getAll();
  readonly isFull = signal<boolean>(false);
}
