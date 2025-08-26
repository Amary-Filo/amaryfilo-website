import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-share',
  imports: [TranslatePipe],
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
  standalone: true,
})
export class ShareComponent {}
