import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-form-order',
  imports: [TranslatePipe],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss',
  standalone: true,
})
export class FormOrderComponent {}
