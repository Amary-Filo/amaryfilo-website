// src/pages/main/components/about-experience/about-experience.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HowIWorkSection } from '../how-i-work/how-i-work.component';
import { ExperienceSection } from '../experience/experience.component';

@Component({
  selector: 'section-about-experience',
  standalone: true,
  imports: [HowIWorkSection, ExperienceSection],
  templateUrl: './about-experience.component.html',
  styleUrl: './about-experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutExperienceSection {}
