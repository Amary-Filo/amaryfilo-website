import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmService } from '@sandbox/projects/crypto/dao-tools/services/farm.service';
import { UISkeletonComponent } from '@sandbox/shared/components/skeleton/skeleton.component';

@Component({
  selector: 'ui-farming-summary',
  templateUrl: './farming-summary.component.html',
  styleUrl: './farming-summary.component.scss',
  imports: [CommonModule, UISkeletonComponent],
  standalone: true,
})
export class UIFarmSummaryComponent implements OnInit, OnDestroy {
  private farm = inject(FarmService);
  readonly loading = computed(() => this.farm.loading());
  readonly summary = computed(() => this.farm.summary());
  private tick?: number;

  ngOnInit(): void {
    this.tick = window.setInterval(() => this.farm.refresh(), 30000);
  }

  ngOnDestroy(): void {
    if (this.tick) clearInterval(this.tick);
  }
}
