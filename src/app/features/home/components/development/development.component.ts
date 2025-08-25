import { Component } from '@angular/core';
import { AreasComponent } from '../areas/areas.component';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-development',
  imports: [AreasComponent, TranslatePipe],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss',
  standalone: true,
})
export class DevelopmentComponent {}
