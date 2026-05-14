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
      title: 'Clarity in Complex Projects',
      text: 'I don’t wait for perfect specifications. I take unclear requirements, break them down into deliverable steps, agree on API contracts with the backend early, and start building working solutions.',
    },
    {
      title: 'Scalable Architecture',
      text: 'I design scalable frontend foundations with clear boundaries and predictable data flows. Isolating complex logic keeps the codebase clean, bug-resistant, and easy to scale without over-engineering.',
    },
    {
      title: 'Simplifying Complex Flows',
      text: 'I specialize in translating heavy business logic, whether it`s an enterprise client platform, a B2B operational workflow, or Web3 security steps into secure, intuitive, and effortless user journeys.',
    },
    {
      title: 'Delivery beyond MVP',
      text: 'I care not only about getting a product shipped, but about how well it survives the next stage: scaling, iteration, cleanup, and long-term support.',
    },
  ];
}
