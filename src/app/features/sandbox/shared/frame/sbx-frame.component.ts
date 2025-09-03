import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sbx-frame',
  standalone: true,
  templateUrl: './sbx-frame.component.html',
  styleUrls: ['./sbx-frame.component.scss'],
})
export class SbxFrameComponent {
  @Input() title? = '';
  @Input() description? = '';
  @Input() tags?: string[] = [];
  @Input() controls?: boolean = false;

  @Input() theme: 'light' | 'dark' = 'light';
  @Output() themeToggle = new EventEmitter<'light' | 'dark'>();

  @Input() showAside = false;
  @Output() showAsideChange = new EventEmitter<boolean>();

  toggleTheme() {
    const next = this.theme === 'dark' ? 'light' : 'dark';
    this.themeToggle.emit(next);
  }

  toggleAside() {
    this.showAside = !this.showAside;
    this.showAsideChange.emit(this.showAside);
  }
}
