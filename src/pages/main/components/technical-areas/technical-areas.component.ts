// src/pages/main/components/technical-areas/technical-areas.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIIcon, UISeparator } from '@shared/ui/kit';
import { IconName } from '@ui/kit/icon/types';

interface ITechnicalAreas {
  icon: IconName;
  title: string;
  list: string[];
}

@Component({
  selector: 'section-technical-areas',
  standalone: true,
  imports: [UISeparator, UIIcon],
  templateUrl: './technical-areas.component.html',
  styleUrl: './technical-areas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalAreasSection {
  readonly list: ITechnicalAreas[] = [
    {
      icon: 'cpuLine',
      title: 'Core',
      list: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'Signals',
        'RxJS',
        'Node.js',
        'Ionic',
        'SSR and rendering strategy',
      ],
    },
    {
      icon: 'flowChart',
      title: 'Systems',
      list: [
        'Design systems',
        'Web3 interfaces',
        'Wallet flows',
        'Contract-connected UI',
        'Reusable UI foundations',
      ],
    },
    {
      icon: 'paletteFill',
      title: 'UI',
      list: [
        'Product interfaces',
        'Tables',
        'Filters',
        'Forms',
        'Themes',
        'Localization',
        'Feedback states',
      ],
    },
  ];
}
