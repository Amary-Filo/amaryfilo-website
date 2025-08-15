import { Component } from '@angular/core';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';

@Component({
  selector: 'app-project-page',
  imports: [SubscribeComponent, FormOrderComponent],
  templateUrl: './project.page.html',
  styleUrl: './project.page.scss',
  standalone: true,
})
export class ProjectPage {}
