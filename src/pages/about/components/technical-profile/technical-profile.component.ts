// src/pages/about/components/technical-profile/technical-profile.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UISeparator } from '@shared/ui/kit';

@Component({
  selector: 'section-technical-profile',
  standalone: true,
  imports: [UISeparator],
  templateUrl: './technical-profile.component.html',
  styleUrl: './technical-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalProfileSection {
  readonly list: { title: string; text: string }[] = [
    {
      title: 'Core stack',
      text: 'Angular, (RxJS, Signals, SSR), TypeScript, JavaScript, React / Next.js, Node.js.',
    },
    {
      title: 'Web3 Ecosystems',
      text: 'Ethers.js, Wagmi, WalletConnect, Account Abstraction (Biconomy / ZeroDev), Smart Contract Interaction, Blockchain Integration.',
    },
    {
      title: 'Architecture & Systems',
      text: 'Feature-Sliced Design (FSD), Backend-For-Frontend (BFF), Headless UI, REST API, a11y / ARIA, Component Systems, State Management.',
    },
  ];
}
