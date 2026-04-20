// src/features/dex-tools/ui/farm-summary/farm-summary.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FarmService } from '../../services/farm/farm.service';

@Component({
  selector: 'farm-summary',
  standalone: true,
  templateUrl: './farm-summary.component.html',
  styleUrl: './farm-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmSummaryComponent {
  private readonly farm = inject(FarmService);

  readonly loading = this.farm.loading;
  readonly error = this.farm.error;
  readonly summary = this.farm.summary;
}
