// src/pages/about/components/technical-profile/technical-profile.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UISeparator } from '@shared/ui/kit';

@Component({
  selector: 'section-technical-profile',
  standalone: true,
  imports: [UISeparator],
  templateUrl: './technical-profile.component.html',
  styleUrl: './technical-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalProfileSection {
  readonly list: { title: string; text: string }[] = [
    {
      title: 'Core stack',
      text: 'Angular, TypeScript, JavaScript, Signals, RxJS, Node.js, Ionic, and frontend rendering strategy including SSR and prerendered delivery.',
    },
    {
      title: 'System design on the frontend',
      text: 'Reusable UI foundations, design systems, localization, rendering decisions, product structure, consistency, and maintainability across growing codebases.',
    },
    {
      title: 'Product implementation areas',
      text: 'Dashboards, admin interfaces, wallet-connected flows, contract-facing UI, tables, filters, forms, themes, feedback states, and transaction-heavy product surfaces.',
    },
  ];
}
