// src/features/dex-tools/ui/home-tab/home-tab.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AccountFacade } from '@entities';
import { DEX_TOOLS_CONFIG } from '../../dex-tools.config';

@Component({
  selector: 'home-tab',
  standalone: true,
  templateUrl: './home-tab.component.html',
  styleUrl: './home-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTabComponent {
  readonly account = inject(AccountFacade);

  readonly contracts = Object.values(DEX_TOOLS_CONFIG.contracts);

  readonly flowList: { title: string; text: string }[] = [
    {
      title: 'Connect wallet',
      text: 'The demo starts from wallet identity on Ethereum Sepolia. Once connected, the app can load balances, pool state, LP positions, and farm-related actions.',
    },
    {
      title: 'Swap tokens',
      text: 'You can swap between AST, APT, and WETH through AMM-based token pairs. This shows how routing, pool reserves, price impact, and ERC-20 approvals work together in a real flow.',
    },
    {
      title: 'Add liquidity',
      text: 'Liquidity can be added to AST/APT or AST/WETH pools. In return, the user receives LP tokens that represent a share of the pool and its trading fees.',
    },
    {
      title: 'Farm rewards',
      text: 'LP/AA tokens from the AST/APT pool can be deposited into the farm to earn APT over time, creating a second layer of utility on top of liquidity providing.',
    },
  ];

  readonly concepts: { title: string; text: string }[] = [
    {
      title: 'AST token',
      text: 'AST is the main working token of the demo. It is used in swaps, liquidity positions, and as one side of both supported token pairs.',
    },
    {
      title: 'APT token',
      text: 'APT acts as the reward and utility token in this demo. It can be obtained through farming or swaps and represents the value layer of the system.',
    },
    {
      title: 'WETH',
      text: 'WETH is the ERC-20 representation of ETH used in AMM flows. It makes ETH-compatible trading and liquidity math consistent inside token pools.',
    },
    {
      title: 'AMM swap',
      text: 'Swaps are powered by liquidity pools rather than order books. The output amount depends on reserves, pool ratio, slippage, and trading fee.',
    },
    {
      title: 'Liquidity pairs',
      text: 'Liquidity providers deposit two assets into a pool and receive LP tokens in return. These LP tokens represent pool ownership and fee participation.',
    },
    {
      title: 'Farm',
      text: 'The farm accepts LP/AA deposits and distributes APT rewards over time. This demonstrates how farming layers additional incentives on top of liquidity.',
    },
  ];

  readonly notesList: string[] = [
    'the demo runs on Ethereum Sepolia only',
    'wallet connection and selected network directly affect available actions',
    'ERC-20 approvals are expected before swaps, liquidity actions, and farming deposits',
    'swap output depends on live reserves, slippage tolerance, and price impact',
    'LP/AA comes from AST/APT liquidity, while LP/AW comes from AST/WETH liquidity',
    'the farm currently focuses on LP/AA as the reward-bearing liquidity token',
    'this is a DeFi and frontend architecture showcase, not a production exchange',
  ];
}
