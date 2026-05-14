// src/pages/main/components/what-i-do/what-i-do.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIIcon } from '@ui/kit';
import { IconName } from '@ui/kit/icon/types';

@Component({
  selector: 'section-what-i-do',
  standalone: true,
  imports: [UIIcon],
  templateUrl: './what-i-do.component.html',
  styleUrl: './what-i-do.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIDoSection {
  readonly list: { icon: IconName; title: string; text: string }[] = [
    {
      icon: 'stackFill',
      title: 'Product Engineering',
      text: 'Driving features from vague concepts to production. I align cross-functional teams, clarify requirements, and take full ownership of delivery.',
    },
    {
      icon: 'expandDiagonalLine',
      title: 'Scalable Architecture',
      text: 'Building modular frontend foundations with clear boundaries. Designed to keep codebases clean and maintainable as products and teams grow.',
    },
    {
      icon: 'equalizer2Fill',
      title: 'Enterprise-Grade Interfaces',
      text: 'Handling high-density data, multi-step workflows, and strict business rules. I translate heavy operational requirements into secure, performant, and intuitive product surfaces.',
    },
    {
      icon: 'foldersFill',
      title: 'Reusable Systems',
      text: 'Building architectural leverage for the entire team. I design reusable system foundations from shared product logic to consistent design patterns that multiply development speed and keep the product cohesive as it scales.',
    },
    {
      icon: 'expandHorizontalSLine',
      title: 'End-to-End Integration',
      text: 'Working across frontend and API boundaries to translate complex business rules into seamless interfaces. I shape data models and manage application states to ensure reliable product experiences.',
    },
  ];
}
