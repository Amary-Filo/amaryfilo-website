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
    { title: 'Hands-On Engineering', text: 'I contribute to implementation, debugging and review as well as technical planning. Leadership does not replace writing and understanding code.' },
    { title: 'API Collaboration', text: 'I define contracts early, use mocks where appropriate and test integration behavior against running services.' },
    { title: 'AI-Assisted, Human-Reviewed', text: 'AI coding agents help with exploration and implementation; I remain responsible for decisions, review and validation.' },
    { title: 'Pragmatic Delivery', text: 'I choose maintainable approaches suited to the team and deadline rather than introducing complexity without a clear benefit.' },
  ];
}
