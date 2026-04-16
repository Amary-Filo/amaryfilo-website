// src/pages/main/components/about-experience/about-experience.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HowIWorkSection } from '../how-i-work/how-i-work.component';
import { WidgetExperience } from '@widgets';

@Component({
  selector: 'section-about-experience',
  standalone: true,
  imports: [HowIWorkSection, WidgetExperience],
  templateUrl: './about-experience.component.html',
  styleUrl: './about-experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutExperienceSection {}
