// src/pages/about/about.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IHeroAction, WidgetPageHero } from '@widgets';
import {
  ExperienceSection,
  IntroSection,
  FocusSection,
  ApproachSection,
  TechnicalProfileSection,
  ValueSection,
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
    ValueSection,
    UISeparator,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly heroActions: IHeroAction[] = [
    {
      label: 'View resume',
      href: '/Nikita-Syreishchikov-Senior-Frontend-Engineer.pdf',
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: 'arrowRightUpLine',
      variant: 'secondary',
      size: 'extra-lg',
    },
  ];

  readonly heroMeta = ['Angular', 'Frontend architecture', 'Reusable UI systems', 'Fintech / Web3'];
}
