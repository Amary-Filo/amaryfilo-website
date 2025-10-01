import { Component, input } from '@angular/core';
import { IconName } from '@sandbox/shared/icons/types';
import { UIIconComponent } from '../icon/icon.component';
import { UISpinnerComponent } from '../spinner/spinner.component';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

@Component({
  selector: 'ui-button, a[ui-button]',
  standalone: true,
  imports: [UIIconComponent, UISpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class UIButtonComponent {
  size = input<ButtonSize>('md');
  color = input<string>('button');
  spinnerColor = input<string>('button');

  isActive = input(false);
  fullWidth = input(false);
  isFilled = input(false);
  textColor = input(false);
  isStrong = input(false);
  disabled = input(false);
  isDropdown = input(false);
  onlyIcon = input(false);
  loading = input(false);

  rightIcon = input<IconName | undefined>(undefined);
  leftIcon = input<IconName | undefined>(undefined);
}
