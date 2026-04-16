// src/pages/main/components/demo/demo.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DemoFacade, DemoList } from '@entities';
import { UIButton } from '@ui/kit';

@Component({
  selector: 'section-demo',
  standalone: true,
  imports: [UIButton, RouterLink, DemoList],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSection {
  private readonly demoFacade = inject(DemoFacade);

  readonly list = this.demoFacade.getFeatured(2);
}
