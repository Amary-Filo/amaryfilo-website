import { Component, input } from '@angular/core';
import { IconName } from '@sandbox/shared/icons/types';
import { UIIconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-benefit-item',
  standalone: true,
  imports: [UIIconComponent],
  templateUrl: './benefit-item.component.html',
  styleUrl: './benefit-item.component.scss',
})
export class UIBenefitItemComponent {
  title = input('');
  text = input('');
  iconSize = input('30px');
  icon = input<IconName | undefined>(undefined);
}
