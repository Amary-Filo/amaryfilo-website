import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  standalone: true,
})
export class NotFoundPage {}
