// src/pages/about/about.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IHeroAction, WidgetPageHero } from '@widgets';
import {
  ExperienceSection,
  IntroSection,
  FocusSection,
  ApproachSection,
  TechnicalProfileSection,
} from './components';
import { UISeparator } from '@shared/ui/kit';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [
    WidgetPageHero,
    ExperienceSection,
    IntroSection,
    FocusSection,
    ApproachSection,
    TechnicalProfileSection,
    UISeparator,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly heroActions: IHeroAction[] = [
    {
      label: 'Download resume',
      href: '/Nikita_Syreishchikov_Senior_Software_Engineer.pdf',
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: 'arrowRightUpLine',
      variant: 'secondary',
      size: 'extra-lg',
    },
  ];

  readonly heroMeta = [
    'TypeScript', 'Angular / React', 'Node.js / NestJS',
    'PostgreSQL', 'Product Engineering', 'Technical Leadership',
  ];
}
