import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-subscribe',
  imports: [TranslatePipe],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
  standalone: true,
})
export class SubscribeComponent {}
