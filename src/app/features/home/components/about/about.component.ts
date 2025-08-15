import { Component } from '@angular/core';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLinkWithLangDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent {}
