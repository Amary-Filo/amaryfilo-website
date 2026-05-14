// src/entities/demo/ui/demo-item/demo-item.component.ts

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UIButton } from '@ui/kit';
import { IDemoItem } from '../../model/demo.types';
import { NgpDialogManager } from 'ng-primitives/dialog';
import { DemoInfoDialog } from '../demo-info-dialog/demo-info-dialog.component';

@Component({
  selector: 'demo-item',
  standalone: true,
  imports: [RouterLink, UIButton],
  templateUrl: './demo-item.component.html',
  styleUrl: './demo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoItem {
  protected readonly dialogManager = inject(NgpDialogManager);
  readonly item = input.required<IDemoItem>();

  openDialog(): void {
    this.dialogManager.open(DemoInfoDialog, { data: this.item() });
  }
}
