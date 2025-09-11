import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DEMO_CONFIG, DEMO_THEME } from '@sandbox/shared/utils/tokens';
import { FormsModule } from '@angular/forms';

type Theme = 'light' | 'dark';

@Component({
  selector: 'books-controls',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class BooksControlsComponent {
  config = inject<WritableSignal<any>>(DEMO_CONFIG);
  theme = inject<WritableSignal<Theme>>(DEMO_THEME);

  genTick = signal(0);

  get cfg() {
    return this.config();
  }

  toggleFlag(key: 'showAuthor' | 'showDate' | 'showDescription') {
    const c = { ...this.config() };
    c[key] = !c[key];
    this.config.set(c);
  }

  setTheme(next: Theme) {
    this.theme.set(next);
  }

  triggerAutoGenerate() {
    this.config.set({ ...this.config(), __autoGen__: Date.now() });
  }
}
