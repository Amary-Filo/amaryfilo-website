// src/app/app.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetHeader, WidgetFooter } from '@widgets';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WidgetHeader, WidgetFooter],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
