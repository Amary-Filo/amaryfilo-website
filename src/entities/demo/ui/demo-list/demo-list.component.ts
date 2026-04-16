// src/entities/demo/ui/demo-list/demo-list.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IDemoItem } from '../../model/demo.types';
import { DemoItem } from '../demo-item/demo-item.component';

@Component({
  selector: 'demo-list',
  standalone: true,
  imports: [DemoItem],
  templateUrl: './demo-list.component.html',
  styleUrl: './demo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoList {
  readonly list = input<IDemoItem[]>([]);
}
