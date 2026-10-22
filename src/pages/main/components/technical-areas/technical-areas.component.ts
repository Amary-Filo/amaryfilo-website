// src/pages/main/components/technical-areas/technical-areas.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIIcon, UISeparator } from '@shared/ui/kit';
import { IconName } from '@ui/kit/icon/types';

interface ITechnicalAreas {
  icon: IconName;
  title: string;
  list: string[];
}

@Component({
  selector: 'section-technical-areas',
  standalone: true,
  imports: [UISeparator, UIIcon],
  templateUrl: './technical-areas.component.html',
  styleUrl: './technical-areas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalAreasSection {
  readonly list: ITechnicalAreas[] = [
    { icon: 'cpuLine', title: 'Frontend', list: ['TypeScript', 'JavaScript', 'Angular', 'React', 'Next.js', 'RxJS', 'Signals', 'MobX', 'Redux', 'TanStack Query', 'SSR', 'SCSS'] },
    { icon: 'flowChart', title: 'Backend & Data', list: ['Node.js', 'Express', 'NestJS', 'REST', 'GraphQL', 'PostgreSQL', 'Prisma', 'MongoDB', 'PHP / Laravel', 'MySQL', 'gRPC'] },
    { icon: 'paletteFill', title: 'Architecture & Quality', list: ['API Contracts', 'Design Systems', 'Headless UI', 'Accessibility', 'SSR / Hydration', 'Vitest', 'Playwright', 'CI/CD', 'Code Review'] },
    { icon: 'stackFill', title: 'Mobile & Web3', list: ['Ionic', 'Cordova', 'Capacitor', 'Web3.js', 'wagmi', 'viem', 'WalletConnect', 'EVM', 'TronWeb', 'Wallet SDKs', 'NFC'] },
  ];
}
