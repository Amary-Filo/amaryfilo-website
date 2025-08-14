import { Component, input } from '@angular/core';
import { AreaGroup } from '../../about.model';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { AreaItemComponent } from '../area-item/area-item.component';

@Component({
  selector: 'app-area-section',
  imports: [TranslatePipe, AreaItemComponent],
  templateUrl: './area-section.component.html',
  styleUrl: './area-section.component.scss',
  standalone: true,
})
export class AreaSectionComponent {
  areas = input<AreaGroup[]>();
}
