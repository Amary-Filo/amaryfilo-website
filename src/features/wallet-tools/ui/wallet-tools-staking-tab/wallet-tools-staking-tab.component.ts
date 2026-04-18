// src/features/wallet-tools/ui/wallet-tools-staking-tab/wallet-tools-staking-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { StakingService } from '../../services/staking/staking.service';
import { StakingFormComponent } from '../staking-form/staking-form.component';
import { StakingListComponent } from '../staking-list/staking-list.component';

@Component({
  selector: 'wallet-tools-staking-tab',
  standalone: true,
  imports: [StakingFormComponent, StakingListComponent],
  templateUrl: './wallet-tools-staking-tab.component.html',
  styleUrl: './wallet-tools-staking-tab.component.scss',
  providers: [StakingService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletToolsStakingTabComponent {
  readonly staking = inject(StakingService);

  readonly notes: { title: string; text: string }[] = [
    {
      title: 'Lock AST for a selected term',
      text: 'Each staking position locks AST for a fixed duration. The longer the selected term, the higher the APR used for reward calculation.',
    },
    {
      title: 'Approval may happen first',
      text: 'If AST has not yet been approved for the staking contract, the wallet may ask for an ERC-20 approval before the actual stake transaction.',
    },
    {
      title: 'Withdraw only after maturity',
      text: 'A position becomes withdrawable only when the selected lock period ends. Until then it remains in the pending list.',
    },
    {
      title: 'Rewards stay on testnet',
      text: 'All balances and rewards in this demo exist on Sepolia only and are meant to illustrate product flow, not real asset usage.',
    },
  ];
}
