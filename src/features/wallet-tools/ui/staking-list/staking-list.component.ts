// src/features/wallet-tools/ui/staking-list/staking-list.component.ts

import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { StakingService } from '../../services/staking/staking.service';
import { StakeViewUI } from '../../services/staking/staking.types';
import { StakingItemComponent } from '../staking-item/staking-item.component';

@Component({
  selector: 'wallet-tools-staking-list',
  standalone: true,
  imports: [CommonModule, StakingItemComponent],
  templateUrl: './staking-list.component.html',
  styleUrl: './staking-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StakingListComponent {
  private readonly staking = inject(StakingService);
  readonly items = input<StakeViewUI[] | null>(null);
  readonly isPending = input(false, { transform: booleanAttribute });
  readonly data = computed(() => this.items() ?? []);
  readonly isListLoading = this.staking.isListLoading;
}
