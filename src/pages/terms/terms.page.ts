// src/pages/terms/terms.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-terms',
  standalone: true,
  templateUrl: './terms.page.html',
  styleUrl: './terms.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPage {}
