// src/features/dex-tools/ui/farm-tab/farm-tab.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FarmService } from '../../services/farm/farm.service';
import { FarmSummaryComponent } from '../farm-summary/farm-summary.component';
import { FarmFormComponent } from '../farm-form/farm-form.component';

@Component({
  selector: 'farm-tab',
  standalone: true,
  imports: [FarmSummaryComponent, FarmFormComponent],
  templateUrl: './farm-tab.component.html',
  styleUrl: './farm-tab.component.scss',
  providers: [FarmService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmTabComponent {
  readonly notes: { title: string; text: string }[] = [
    {
      title: 'Stake LP to earn APT',
      text: 'The farm accepts LP tokens from the AST / APT pool and distributes APT rewards over time.',
    },
    {
      title: 'Pending rewards grow while staked',
      text: 'As long as LP remains deposited, your position accrues pending APT that can be harvested separately.',
    },
    {
      title: 'Deposit, harvest, withdraw',
      text: 'You can add LP to the farm, harvest rewards without exiting, or withdraw the staked LP later.',
    },
    {
      title: 'This is still Sepolia only',
      text: 'All farming balances, LP tokens, and rewards are testnet-only and exist to demonstrate DeFi product flow.',
    },
  ];
}
