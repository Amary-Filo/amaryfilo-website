import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEMOS } from './registry';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.page.html',
  styleUrls: ['./sandbox.page.scss'],
  imports: [RouterLink],
  standalone: true,
})
export class SandboxPage {
  demos = computed(() => DEMOS);
}
