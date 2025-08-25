import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-areas',
  imports: [TranslatePipe],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss',
  standalone: true,
})
export class AreasComponent {}
