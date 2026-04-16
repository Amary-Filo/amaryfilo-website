// src/entities/work/ui/work-info-dialog/ui/work-info-dialog.component.ts

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { injectDialogRef, NgpDialog, NgpDialogOverlay } from 'ng-primitives/dialog';

import { UIButton } from '@ui/kit';
import { IWorkItem } from '../../model/work.types';

@Component({
  selector: 'work-info-dialog',
  standalone: true,
  imports: [NgpDialog, NgpDialogOverlay, UIButton],
  templateUrl: './work-info-dialog.component.html',
  styleUrl: './work-info-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkInfoDialog {
  protected readonly dialogRef = injectDialogRef<IWorkItem>();
  protected readonly item = computed<IWorkItem>(() => this.dialogRef.data);

  close(): void {
    this.dialogRef.close();
  }
}
