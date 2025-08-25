import { Component, input } from '@angular/core';
import { ProjectLatest } from '@core/data/latest.model';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-projects',
  imports: [RouterLinkWithLangDirective, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
})
export class ProjectsComponent {
  projects = input<ProjectLatest[]>();
}
