import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-under-construction',
  imports: [TranslatePipe],
  templateUrl: './under-construction.component.html',
  styleUrl: './under-construction.component.scss',
  standalone: true,
})
export class UnderConstructionComponent {}
