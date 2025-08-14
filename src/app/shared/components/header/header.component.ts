import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLinkWithLangDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  theme = inject(ThemeService);
}
