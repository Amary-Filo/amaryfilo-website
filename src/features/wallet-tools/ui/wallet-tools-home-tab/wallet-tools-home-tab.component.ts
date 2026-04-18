// src/features/wallet-tools/ui/wallet-tools-home-tab/wallet-tools-home-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AccountFacade } from '@entities';
import { WALLET_TOOLS_CONFIG } from '../../wallet-tools.config';

@Component({
  selector: 'wallet-tools-home-tab',
  standalone: true,
  templateUrl: './wallet-tools-home-tab.component.html',
  styleUrl: './wallet-tools-home-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletToolsHomeTabComponent {
  readonly account = inject(AccountFacade);

  readonly contracts = Object.values(WALLET_TOOLS_CONFIG.contracts);
  readonly flowList: { title: string; text: string }[] = [
    {
      title: 'Connect wallet',
      text: 'The demo starts from wallet identity. Once connected on Sepolia, the app can load balances, positions, purchases, and contract-facing actions.',
    },
    {
      title: 'Get AST',
      text: 'AST acts as the main working token of the system. It is used in staking and later in auctions.',
    },
    {
      title: 'Win APT',
      text: 'APT is obtained through auction flows. It acts as the utility token that unlocks marketplace actions.',
    },
    {
      title: 'Spend in marketplace',
      text: 'Marketplace items are priced in APT and become available through connected wallet history and contract state.',
    },
  ];

  readonly concepts: { title: string; text: string }[] = [
    {
      title: 'AST token',
      text: 'AST is the working token of the demo. It can be used in staking to grow the balance and in auctions to compete for APT rewards.',
    },
    {
      title: 'APT token',
      text: 'APT is the utility token of the demo. It is not the starting token — it is earned through auctions and spent in the marketplace.',
    },
    {
      title: 'Staking',
      text: 'Staking lets you lock AST for a selected term and withdraw the initial amount plus reward when the position becomes ready.',
    },
    {
      title: 'Auction',
      text: 'Auctions connect AST and APT. Users place AST bids in timed pools, and the highest bidder can settle the reward after the pool ends.',
    },
    {
      title: 'Marketplace',
      text: 'Marketplace items are priced in APT and represent the final step of the demo flow: using earned utility to unlock content.',
    },
    {
      title: 'Why this exists',
      text: 'The demo is built to show how wallet state, contract reads and writes, token utility, and modular frontend structure can work together.',
    },
  ];

  readonly notesList: string[] = [
    'the demo runs on Ethereum Sepolia only',
    'wallet connection and selected network directly affect available actions',
    'ERC-20 approvals are expected before some contract writes',
    'balances, purchases, and positions depend on contract state and connected wallet history',
    'this is a product-flow and frontend showcase, not a production application',
  ];
}
