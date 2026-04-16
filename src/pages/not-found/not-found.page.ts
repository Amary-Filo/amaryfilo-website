// src/pages/not-found/not-found.page.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UIButton } from '@ui/kit';

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [RouterLink, UIButton],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
