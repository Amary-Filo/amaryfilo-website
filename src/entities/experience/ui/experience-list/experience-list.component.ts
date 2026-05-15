// src/entities/experience/ui/experience-list/experience-list.component.ts

import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IExperienceItem } from '../../model/experience.types';
import { ExperienceItem } from '../experience-item/experience-item.component';
import { UISeparator } from '@ui/kit';

@Component({
  selector: 'experience-list',
  standalone: true,
  imports: [ExperienceItem, UISeparator],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceList {
  readonly list = input.required<IExperienceItem[]>();
  readonly isFull = input(false, { transform: booleanAttribute });
}
