// src/widgets/footer/footer.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UIButton } from '@ui/kit';

@Component({
  selector: 'widget-footer',
  standalone: true,
  imports: [RouterLink, UIButton],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetFooter {}
