import { Component, input } from '@angular/core';

type Preset =
  | 'none'
  | 'title'
  | 'paragraph'
  | 'avatarTitle'
  | 'accordionHead'
  | 'accordionBody';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class UISkeletonComponent {
  preset = input<Preset>('none');

  lines = input<number>(0);
  widths = input<string[] | null>(null);
  height = input<string>('14px');
  gap = input<string>('8px');

  circle = input<boolean>(false);
  circleSize = input<string>('32px');

  message = input<string | null>(null);

  get lineWidths(): string[] {
    const custom = this.widths();
    if (custom && custom.length) return custom;

    switch (this.preset()) {
      case 'title':
        return ['70%'];
      case 'paragraph':
        return ['90%', '80%', '60%'];
      case 'avatarTitle':
        return ['60%', '40%'];
      case 'accordionHead':
        return ['40%', '60%'];
      case 'accordionBody':
        return ['90%', '70%', '50%'];
      default:
        const n = this.lines();
        if (!n) return [];

        const arr: string[] = [];

        for (let i = 0; i < n; i++) {
          const w = 90 - i * Math.min(20, Math.floor(60 / Math.max(1, n - 1)));
          arr.push(`${Math.max(30, w)}%`);
        }

        return arr;
    }
  }

  get showCircle(): boolean {
    return this.circle() || this.preset() === 'avatarTitle';
  }
}
