import { Component, input } from '@angular/core';
import { DesignsLatest } from '@core/data/latest.model';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { getImagePath } from '@helpers/index';

@Component({
  selector: 'app-designs',
  imports: [RouterLinkWithLangDirective],
  templateUrl: './designs.component.html',
  styleUrl: './designs.component.scss',
  standalone: true,
})
export class DesignsComponent {
  designs = input<DesignsLatest[]>();

  imagePath(item: DesignsLatest): string {
    return getImagePath(item.thumbnail, item.slug, 'designs');
  }
}
