// src/pages/demos/demos.page.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DemoFacade, DemoList } from '@entities';
import { WidgetPageHero } from '@widgets';
import { UISeparator } from '@shared/ui/kit';

@Component({
  selector: 'page-demos',
  standalone: true,
  templateUrl: './demos.page.html',
  styleUrl: './demos.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WidgetPageHero, DemoList, UISeparator],
})
export class DemosPage {
  private readonly demoFacade = inject(DemoFacade);

  readonly list = this.demoFacade.getAll();

  readonly heroMeta = ['Angular', 'Web3', 'Complex UI Systems', 'Smart Contract Integration'];
}
