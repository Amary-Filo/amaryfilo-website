// src/entities/work/ui/work-list/work-list.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IWorkItem } from '../../model/work.types';
import { WorkItem } from '../work-item/work-item.component';

@Component({
  selector: 'work-list',
  standalone: true,
  imports: [WorkItem],
  templateUrl: './work-list.component.html',
  styleUrl: './work-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkList {
  readonly list = input.required<IWorkItem[]>();
}
