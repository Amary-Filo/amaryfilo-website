// src/pages/main/main.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HeroSection,
  WhatIDoSection,
  DemoSection,
  AboutExperienceSection,
  WorkSection,
  ContactsSection,
} from './components';
import { UISeparator } from '@ui/kit';
import { WidgetTechnicalAreas } from '@widgets';

@Component({
  selector: 'page-main',
  standalone: true,
  imports: [
    HeroSection,
    WhatIDoSection,
    DemoSection,
    AboutExperienceSection,
    WorkSection,
    ContactsSection,
    UISeparator,
    WidgetTechnicalAreas,
  ],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
