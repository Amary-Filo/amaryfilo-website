import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Icons, IconName } from '@sandbox/shared/icons/types';

@Component({
  selector: 'ui-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  imports: [NgIcon],
  providers: [provideIcons(Icons)],
})
export class UIIconComponent {
  name = input<IconName>();
  size = input<string>('1em');
}
