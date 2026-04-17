// src/pages/works/works.page.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WorkFacade, WorkList } from '@entities';
import { WidgetPageHero } from '@widgets';
import { UISeparator } from '@shared/ui/kit';

@Component({
  selector: 'page-works',
  standalone: true,
  imports: [WorkList, WidgetPageHero, UISeparator],
  templateUrl: './works.page.html',
  styleUrl: './works.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksPage {
  private readonly workFacade = inject(WorkFacade);

  readonly featured = this.workFacade.getByGroup('featured');
  readonly additional = this.workFacade.getByGroup('product');
  readonly earlier = this.workFacade.getByGroup('commercial');

  readonly heroMeta = [
    'Product delivery',
    'Wallet-connected interfaces',
    'Reusable frontend systems',
    'Commercial work',
  ];
}
