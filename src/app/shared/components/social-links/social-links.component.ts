import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-social-links',
  imports: [TranslatePipe],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  standalone: true,
})
export class SocialLinksComponent {}
