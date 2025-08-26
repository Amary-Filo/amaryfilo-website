import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { RouterModule } from '@angular/router';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [
    SocialLinksComponent,
    RouterModule,
    RouterLinkWithLangDirective,
    TranslatePipe,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
