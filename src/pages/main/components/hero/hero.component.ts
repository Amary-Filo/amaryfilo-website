// src/pages/main/components/hero/hero.component.ts

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ScrollService } from '@lib/scroll.service';
import { UIButton } from '@ui/kit';

@Component({
  selector: 'section-hero',
  standalone: true,
  imports: [UIButton],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  private readonly scroll = inject(ScrollService);
  private readonly router = inject(Router);

  goToContact(): void {
    this.scroll.scrollTo('contact');
  }

  openDemos(): void {
    this.router.navigateByUrl('/demos');
  }
}
