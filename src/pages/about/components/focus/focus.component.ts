// src/pages/about/components/focus/focus.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section-focus',
  standalone: true,
  templateUrl: './focus.component.html',
  styleUrl: './focus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusSection {
  readonly list: { title: string; text: string }[] = [
    {
      title: 'Frontend architecture',
      text: 'I build frontend systems that stay understandable, maintainable, and extensible as products grow in scope, team size, and implementation complexity.',
    },
    {
      title: 'Reusable UI foundations',
      text: 'I prefer reusable patterns, clear component boundaries, and design-system thinking over one-off implementation that becomes expensive to maintain.',
    },
    {
      title: 'Product-facing interfaces',
      text: 'A large part of my work sits close to real product complexity: dashboards, admin surfaces, forms, filters, wallet-connected flows, and transaction-heavy user journeys.',
    },
    {
      title: 'Delivery beyond MVP',
      text: 'I care not only about getting a product shipped, but about how well it survives the next stage — scaling, iteration, cleanup, and long-term support.',
    },
  ];
}
