// src/entities/experience/ui/experience-item/experience-item.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IExperienceItem } from '../../model/experience.types';

@Component({
  selector: 'experience-item',
  standalone: true,
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItem {
  readonly item = input.required<IExperienceItem>();
  readonly variant = input<'preview' | 'full'>('preview');
}
