import { Component } from '@angular/core';
import { SocialLinksComponent } from '@shared/components';

@Component({
  selector: 'app-hero',
  imports: [SocialLinksComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  standalone: true,
})
export class HeroComponent {}
