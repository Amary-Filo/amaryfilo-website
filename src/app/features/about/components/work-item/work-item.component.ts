import { Component, input } from '@angular/core';
import { WorkGroup } from '../../about.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-item',
  imports: [CommonModule],
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
  standalone: true,
})
export class WorkItemComponent {
  item = input<WorkGroup>();
  isLast = input<boolean>();
}
