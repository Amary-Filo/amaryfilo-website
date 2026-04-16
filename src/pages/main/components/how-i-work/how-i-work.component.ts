// src/pages/main/components/how-i-work/how-i-work.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIIcon } from '@shared/ui/kit';

@Component({
  selector: 'section-how-i-work',
  standalone: true,
  imports: [UIIcon],
  templateUrl: './how-i-work.component.html',
  styleUrl: './how-i-work.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowIWorkSection {}
