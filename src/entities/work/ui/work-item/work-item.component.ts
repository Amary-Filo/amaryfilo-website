// src/entities/work/ui/work-item/work-item.component.ts

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgpDialogManager } from 'ng-primitives/dialog';

import { UIButton } from '@ui/kit';
import { IWorkItem } from '../../model/work.types';
import { WorkInfoDialog } from '../work-info-dialog/work-info-dialog.component';

@Component({
  selector: 'work-item',
  standalone: true,
  imports: [UIButton],
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkItem {
  protected readonly dialogManager = inject(NgpDialogManager);
  readonly item = input.required<IWorkItem>();

  openDialog(): void {
    this.dialogManager.open(WorkInfoDialog, { data: this.item() });
  }
}
