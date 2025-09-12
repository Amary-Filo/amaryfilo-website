import { Component, input, model } from '@angular/core';
import { UIButtonComponent } from '../button/button.component';
import { UISkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'sbx-accordion-component',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  imports: [UIButtonComponent, UISkeletonComponent],
})
export class UIAccordionComponent {
  isOpen = model(false);
  bottomShowButtons = model(true);
  isSkeleton = model(false);
  fullBorder = input(false);
  showBottom = input(true);
  showHeadButtons = input(false);
  showHeadContent = input(false);
  showToggle = input(true);

  title = input('');
  text = input('');
  content = input('');
  bottomText = input('');
  skeletHeaderText = input('Connect wallet to see information');

  toggle() {
    this.isOpen.update((v) => !v);
  }
}
