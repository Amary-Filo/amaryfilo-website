import { Component, input } from '@angular/core';
import { AreaGroup } from '../../about.model';

@Component({
  selector: 'app-area-item',
  imports: [],
  templateUrl: './area-item.component.html',
  styleUrl: './area-item.component.scss',
  standalone: true,
})
export class AreaItemComponent {
  area = input<AreaGroup>();
}
