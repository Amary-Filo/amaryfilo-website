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
    { title: 'Frontend engineering', text: 'TypeScript, JavaScript, Angular, RxJS, Signals, React, Next.js, MobX, Redux, TanStack Query, SSR/hydration, SCSS and design systems.' },
    { title: 'Backend & data', text: 'Node.js, Express, NestJS, REST APIs, GraphQL, PostgreSQL, Prisma, MongoDB, MySQL and PHP/Laravel. Production backend contributions and an in-development independent product.' },
    { title: 'Cross-platform development', text: 'Ionic, Cordova, Capacitor, browser extensions, native mobile SDK integrations, signing and app-store releases.' },
    { title: 'Web3 & financial systems', text: 'Web3.js, wagmi, viem, EVM, TronWeb, wallet SDKs, WalletConnect, staking, approvals and transaction state management.' },
    { title: 'Delivery & quality', text: 'API contracts, reusable UI components, accessibility, Nx, CI/CD, Vitest, Playwright, code reviews and team mentoring.' },
  ];
}
