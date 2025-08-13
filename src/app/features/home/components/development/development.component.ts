import { Component } from '@angular/core';
import { AreasComponent } from '../areas/areas.component';

@Component({
  selector: 'app-development',
  imports: [AreasComponent],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss',
  standalone: true,
})
export class DevelopmentComponent {}
