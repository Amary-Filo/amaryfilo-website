import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output } from '@angular/core';

import {
  AuctionPoolStatus,
  BidPoolStatus,
} from '@sandbox/projects/crypto/wallet-tools/services/types';

import { UIBenefitItemComponent } from '@sandbox/shared/components/benefit-item/benefit-item.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';

@Component({
  selector: 'ui-pull-content',
  standalone: true,
  imports: [
    CommonModule,
    UIBenefitItemComponent,
    UIInputComponent,
    UIButtonComponent,
  ],
  templateUrl: './pull-content.component.html',
  styleUrl: './pull-content.component.scss',
})
export class UIPullContentComponent {
  id = input<string>('');
  status = input<AuctionPoolStatus>('active');
  bidStatus = input<BidPoolStatus>('empty');

  date = input<string>('');
  topBidHuman = input<string>('0');
  minToOutbidHuman = input<string>('0');
  iAmHighest = input<boolean>(false);

  validators = input<Array<(v: string) => string | null>>([]);
  amount = model<string>('');
  max = input<string>('0');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  buttonBid = output<string>();

  readonly allValidators = computed(() => {
    const ext = this.validators() ?? [];
    return [...ext];
  });

  onSendMax() {
    this.amount.set(this.max());
  }

  clickBid() {
    this.buttonBid.emit(this.amount());
  }
}
