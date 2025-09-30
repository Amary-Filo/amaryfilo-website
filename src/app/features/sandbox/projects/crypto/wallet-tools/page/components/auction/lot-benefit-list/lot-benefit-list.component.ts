import { Component, input, output } from '@angular/core';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIBenefitItemComponent } from '@sandbox/shared/components/benefit-item/benefit-item.component';

@Component({
  selector: 'ui-lot-benefit-list',
  standalone: true,
  imports: [UIBenefitItemComponent, UIButtonComponent],
  templateUrl: './lot-benefit-list.component.html',
  styleUrl: './lot-benefit-list.component.scss',
})
export class UILotBenefitListComponent {
  dateEnd = input<string>('');
  endIn = input<string>('');
  lot = input<string>('');
  showWithdraw = input<boolean>(false);
  isWithdrawn = input<boolean>(false);
  ended = input<boolean>(false);

  withdraw = output<void>();

  onWithdraw() {
    this.withdraw.emit();
  }
}
