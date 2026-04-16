// src/pages/about/about.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IHeroAction, WidgetExperience, WidgetPageHero, WidgetTechnicalAreas } from '@widgets';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [WidgetExperience, WidgetPageHero, WidgetTechnicalAreas],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  readonly heroActions: IHeroAction[] = [
    {
      label: 'View resume',
      href: '/Nikita-Syreishchikov-Senior-Frontend-Engineer.pdf',
      target: '_blank' as const,
      rel: 'noopener noreferrer',
      icon: 'arrowRightUpLine',
      variant: 'secondary' as const,
      size: 'extra-lg' as const,
    },
  ];

  readonly heroMeta = ['Angular', 'Frontend architecture', 'Reusable UI systems', 'Fintech / Web3'];
}
