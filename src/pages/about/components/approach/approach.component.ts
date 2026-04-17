// src/pages/about/components/approach/approach.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section-approach',
  standalone: true,
  templateUrl: './approach.component.html',
  styleUrl: './approach.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachSection {
  readonly list: { title: string; text: string }[] = [
    {
      title: 'Reusable over one-off',
      text: 'I prefer systems that can be extended and reused instead of local solutions that solve one screen and create long-term maintenance cost.',
    },
    {
      title: 'Clarity before abstraction',
      text: 'I value clear structure and practical implementation over unnecessary abstraction introduced too early.',
    },
    {
      title: 'Product structure matters',
      text: 'A good frontend is not just UI. It is routing, states, reuse, rendering strategy, maintainability, and a structure that helps a team move faster.',
    },
    {
      title: 'Simplicity scales better',
      text: 'The easier a frontend is to understand, the easier it is to grow, debug, hand over, and improve over time.',
    },
  ];
}
