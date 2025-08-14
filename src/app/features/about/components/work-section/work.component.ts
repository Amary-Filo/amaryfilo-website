import { Component, input } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { WorkGroup } from '../../about.model';
import { WorkItemComponent } from '../work-item/work-item.component';

@Component({
  selector: 'app-work-section',
  imports: [WorkItemComponent, TranslatePipe],
  templateUrl: './work-section.component.html',
  styleUrl: './work-section.component.scss',
  standalone: true,
})
export class WorkComponent {
  items = input<WorkGroup[]>();
}
