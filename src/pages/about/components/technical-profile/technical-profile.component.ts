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
    { title: 'Cross-platform development', text: 'Ionic, Cordova, Capacitor, browser extensions, native SDK and NFC integrations, and app-store releases.' },
    { title: 'Platform integrations', text: 'API contracts, service workers, WebSockets, browser APIs, secure application state, approval flows and asynchronous transaction handling.' },
    { title: 'Delivery & quality', text: 'API contracts, reusable UI components, accessibility, Nx, CI/CD, Vitest, Playwright, code reviews and team mentoring.' },
  ];
}
