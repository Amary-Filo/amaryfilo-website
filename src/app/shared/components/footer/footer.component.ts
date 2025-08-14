import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { RouterModule } from '@angular/router';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, RouterModule, RouterLinkWithLangDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {}
