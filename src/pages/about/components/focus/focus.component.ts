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
    { title: 'End-to-End Ownership', text: 'Connecting requirements and data contracts to frontend/backend implementation, integration testing, release and follow-up maintenance.' },
    { title: 'Clear System Boundaries', text: 'Keeping UI, domain logic, APIs and integrations understandable while evolving existing products without unnecessary rewrites.' },
    { title: 'Complex Business Workflows', text: 'Work across banking operations, corporate verification, data-heavy dashboards, mobile wallets and transaction-based systems.' },
    { title: 'Long-Term Maintenance', text: 'Code review, documentation and dependable interfaces that make future changes easier for the team.' },
  ];
}
