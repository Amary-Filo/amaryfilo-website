// src/pages/about/components/value/value.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section-value',
  standalone: true,
  templateUrl: './value.component.html',
  styleUrl: './value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueSection {
  readonly list: string[] = [
    'a product needs structure, not just implementation',
    'a frontend has to move from “working” to “maintainable”',
    'a team needs reusable UI foundations instead of fragmented screens',
    'complex product logic has to be translated into clear interfaces',
    'an Angular codebase needs cleanup, consistency, and stronger technical direction',
  ];
}
