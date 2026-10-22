// src/pages/main/components/what-i-do/what-i-do.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIIcon } from '@ui/kit';
import { IconName } from '@ui/kit/icon/types';

@Component({
  selector: 'section-what-i-do',
  standalone: true,
  imports: [UIIcon],
  templateUrl: './what-i-do.component.html',
  styleUrl: './what-i-do.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatIDoSection {
  readonly list: { icon: IconName; title: string; text: string }[] = [
    { icon: 'stackFill', title: 'Product Engineering', text: 'Building features across web clients, APIs and data models, from requirements through integration, testing, releases and maintenance.' },
    { icon: 'expandDiagonalLine', title: 'Frontend Architecture', text: 'Angular and React applications with reusable UI systems, SSR, accessible components and complex state management.' },
    { icon: 'equalizer2Fill', title: 'Backend & Integrations', text: 'Commercial Node.js/Express features, current NestJS/PostgreSQL development and REST, GraphQL and gRPC integrations.' },
    { icon: 'foldersFill', title: 'Web & Mobile', text: 'Delivering browser and mobile applications, including Ionic/Cordova wallets, native integrations and app-store releases.' },
    { icon: 'expandHorizontalSLine', title: 'Technical Leadership', text: 'Planning, code review, mentoring and practical architecture decisions that support predictable product delivery.' },
  ];
}
