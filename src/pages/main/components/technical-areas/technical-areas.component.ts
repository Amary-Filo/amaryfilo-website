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
      list: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'SSR', 'React', 'Next.js', 'Node.js'],
    },
    {
      icon: 'flowChart',
      title: 'Systems',
      list: [
        'Backend-For-Frontend',
        'REST API',
        'Ethers.js',
        'Wagmi',
        'WalletConnect',
        'Smart Contract UI',
      ],
    },
    {
      icon: 'paletteFill',
      title: 'UI & Architecture',
      list: ['Headless UI', 'a11y', 'ARIA', 'Component Systems', 'State Management'],
    },
  ];
}
