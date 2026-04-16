// src/pages/main/components/work/work.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WorkFacade, WorkList } from '@entities';
import { UIButton } from '@ui/kit';

@Component({
  selector: 'section-work',
  standalone: true,
  imports: [UIButton, RouterLink, WorkList],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkSection {
  private readonly workFacade = inject(WorkFacade);

  readonly list = this.workFacade.getFeatured(4);
}
