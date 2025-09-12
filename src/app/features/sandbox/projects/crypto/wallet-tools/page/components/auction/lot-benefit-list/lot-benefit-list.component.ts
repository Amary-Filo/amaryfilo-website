import { Component, input } from '@angular/core';
import { UIBenefitItemComponent } from '@sandbox/shared/components/benefit-item/benefit-item.component';

@Component({
  selector: 'ui-lot-benefit-list',
  standalone: true,
  imports: [UIBenefitItemComponent],
  templateUrl: './lot-benefit-list.component.html',
  styleUrl: './lot-benefit-list.component.scss',
})
export class UILotBenefitListComponent {
  dateStart = input('');
  dateEnd = input('');
  endTime = input('');
  lot = input('');
}
