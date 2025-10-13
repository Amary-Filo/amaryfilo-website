import {
  Component,
  signal,
  model,
  input,
  output,
  HostListener,
  ElementRef,
  ContentChild,
  TemplateRef,
  effect,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type UiSelectItem<T extends string | number> = {
  value: T;
  label: string;
};

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class UISelectComponent<T extends string | number = string>
  implements AfterViewInit
{
  value = model<T | undefined>(undefined);

  items = input.required<UiSelectItem<T>[]>();
  label = input<string>('');
  placeholder = input<string>('Select…');
  disabled = input<boolean>(false);
  clearable = input<boolean>(false);
  color = input<string>('button');

  changed = output<T | undefined>();

  @ContentChild('option', { read: TemplateRef })
  optionTpl?: TemplateRef<{ $implicit: UiSelectItem<T> }>;

  @ViewChild('dropdown', { read: ElementRef })
  dropdownRef?: ElementRef<HTMLElement>;

  open = signal(false);

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      const list = this.items();
      const v = this.value();
      if (v !== undefined && !list.some((i) => i.value === v)) {
        this.value.set(undefined);
      }
    });

    effect(() => {
      if (this.open() && this.dropdownRef) {
        this.positionDropdown();
      }
    });
  }

  ngAfterViewInit() {
    if (this.open() && this.dropdownRef) {
      setTimeout(() => this.positionDropdown(), 0);
    }
  }

  private positionDropdown() {
    if (!this.dropdownRef) return;

    const dropdown = this.dropdownRef.nativeElement;
    const field = this.el.nativeElement.querySelector('.field') as HTMLElement;

    if (!field) return;

    const fieldRect = field.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = dropdown.offsetHeight;

    const spaceBelow = viewportHeight - fieldRect.bottom;
    const spaceAbove = fieldRect.top;

    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      dropdown.style.top = '100%';
      dropdown.style.bottom = 'auto';
    } else {
      dropdown.style.top = 'auto';
      dropdown.style.bottom = '100%';
      dropdown.style.marginTop = '0';
      dropdown.style.marginBottom = '4px';
    }
  }

  toggle() {
    if (this.disabled()) return;
    this.open.update((v) => !v);
  }

  select(v: T) {
    this.value.set(v);
    this.changed.emit(v);
    this.open.set(false);
  }

  clear(ev: MouseEvent) {
    ev.stopPropagation();
    this.value.set(undefined);
    this.changed.emit(undefined);
  }

  isSelected(v: T) {
    return this.value() === v;
  }

  currentLabel() {
    const v = this.value();
    if (v === undefined) return null;
    const it = this.items().find((i) => i.value === v);
    return it?.label ?? String(v);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.open()) return;
    const host = this.el.nativeElement;
    if (!host.contains(e.target as Node)) this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.open.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.open()) {
      this.positionDropdown();
    }
  }
}
