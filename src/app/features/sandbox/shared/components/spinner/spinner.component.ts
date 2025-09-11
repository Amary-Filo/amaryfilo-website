import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SpinnerType = 'white' | 'black';

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UISpinnerComponent {
  type = input<SpinnerType>('black');
  color = input<string>('gray-900');
  size = input<string>('28px');
}
