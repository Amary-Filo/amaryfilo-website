import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { WithLangPipe } from '@core/i18n/with-lang.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterModule, WithLangPipe, RouterLinkWithLangDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {}
