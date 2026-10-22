// src/pages/main/main.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HeroSection,
  WhatIDoSection,
  DemoSection,
  WorkSection,
  ContactsSection,
  TechnicalAreasSection,
} from './components';
import { UISeparator } from '@ui/kit';

@Component({
  selector: 'page-main',
  standalone: true,
  imports: [
    HeroSection,
    WhatIDoSection,
    DemoSection,
    WorkSection,
    ContactsSection,
    UISeparator,
    TechnicalAreasSection,
  ],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
