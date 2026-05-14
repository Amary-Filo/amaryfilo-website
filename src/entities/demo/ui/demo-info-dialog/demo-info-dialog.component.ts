// src/entities/demo/ui/demo-info-dialog/ui/demo-info-dialog.component.ts

import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { injectDialogRef, NgpDialog, NgpDialogOverlay } from 'ng-primitives/dialog';

import { UIButton } from '@ui/kit';
import { IDemoItem } from '../../model/demo.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'demo-info-dialog',
  standalone: true,
  imports: [NgpDialog, NgpDialogOverlay, UIButton, RouterLink],
  templateUrl: './demo-info-dialog.component.html',
  styleUrl: './demo-info-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoInfoDialog {
  protected readonly dialogRef = injectDialogRef<IDemoItem>();
  protected readonly item = computed<IDemoItem>(() => this.dialogRef.data);

  close(): void {
    this.dialogRef.close();
  }
}
