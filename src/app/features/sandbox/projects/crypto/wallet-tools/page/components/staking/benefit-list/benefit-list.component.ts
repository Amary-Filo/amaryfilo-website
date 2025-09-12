import { Component, input } from '@angular/core';
import { UIBenefitItemComponent } from '@sandbox/shared/components/benefit-item/benefit-item.component';

@Component({
  selector: 'ui-benefit-list',
  standalone: true,
  imports: [UIBenefitItemComponent],
  templateUrl: './benefit-list.component.html',
  styleUrl: './benefit-list.component.scss',
})
export class UIBenefitListComponent {
  date = input('');
  staked = input('');
  percent = input('');
  get = input('');
  choose = input('');
}
