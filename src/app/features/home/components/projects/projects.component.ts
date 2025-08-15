import { Component, input } from '@angular/core';
import { ProjectLatest } from '@core/data/latest.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
})
export class ProjectsComponent {
  projects = input<ProjectLatest[]>();
}
