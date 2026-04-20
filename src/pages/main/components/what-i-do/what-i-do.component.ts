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
    {
      icon: 'stackFill',
      title: 'Frontend Architecture',
      text: 'Scalable product structure for teams that need a frontend that stays maintainable as scope grows.',
    },
    {
      icon: 'layoutGridFill',
      title: 'Reusable UI Systems',
      text: 'Token-based foundations, reusable components, and consistent product surfaces built for long-term use.',
    },
    {
      icon: 'expandHorizontalSLine',
      title: 'Wallet & Transaction Flows',
      text: 'Product interfaces for wallet connection, stateful transactions, network switching, and user-facing blockchain actions.',
    },
    {
      icon: 'spaceShip2Fill',
      title: 'Product Delivery',
      text: 'From prototype and validation to MVP-ready frontend structure that does not need to be rebuilt from scratch.',
    },
    {
      icon: 'equalizer2Fill',
      title: 'Admin & Internal Tools',
      text: 'Clear interfaces for data-heavy workflows, actions, filters, states, and operational surfaces.',
    },
    {
      icon: 'dashboard2Fill',
      title: 'Performance & Maintainability',
      text: 'Practical frontend systems focused on clarity, controlled complexity, and long-term support.',
    },
  ];
}
