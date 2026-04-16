// src/entities/demo/ui/demo-item/demo-item.component.ts

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UIButton } from '@ui/kit';
import { IDemoItem } from '../../model/demo.types';

@Component({
  selector: 'demo-item',
  standalone: true,
  imports: [RouterLink, UIButton],
  templateUrl: './demo-item.component.html',
  styleUrl: './demo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoItem {
  readonly item = input.required<IDemoItem>();
}
