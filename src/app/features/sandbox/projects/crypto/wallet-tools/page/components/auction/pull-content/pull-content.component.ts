import { Component, input, model } from '@angular/core';
import { UIBenefitItemComponent } from '@sandbox/shared/components/benefit-item/benefit-item.component';
import { UIButtonComponent } from '@sandbox/shared/components/button/button.component';
import { UIInputComponent } from '@sandbox/shared/components/input/input.component';

export type PullType = 'empty' | 'bit' | 'winner';

@Component({
  selector: 'ui-pull-content',
  standalone: true,
  imports: [UIBenefitItemComponent, UIInputComponent, UIButtonComponent],
  templateUrl: './pull-content.component.html',
  styleUrl: './pull-content.component.scss',
})
export class UIPullContentComponent {
  type = input<PullType>('empty');
  date = input('');
  bit = input('');
  validators = input<Array<(v: string) => string | null>>([]);

  amount = model('');
  max = input('');
}
