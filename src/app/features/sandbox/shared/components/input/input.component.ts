import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'ui-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class UIInputComponent {
  value = model<string>('');

  type = input<'text' | 'number' | 'token'>('text');
  name = input<string>('');
  id = input<string | undefined>(undefined);
  label = input<string>('');
  placeholder = input<string>(' ');
  required = input(false);
  disabled = input(false);
  readonly = input(false);

  prefix = input<boolean>(false);
  suffix = input<boolean>(false);

  decimals = input<number>(18);
  min = input<number | undefined>(undefined);
  max = input<number | string | undefined>(undefined);

  validators = input<Array<(v: string) => string | null>>([]);

  blur = output<void>();
  enter = output<void>();

  private normalizeToken(raw: string): string {
    let s = raw.replace(/,/g, '.').replace(/[^\d.]/g, '');

    const parts = s.split('.');
    if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');

    const [int = '', frac = ''] = s.split('.');
    const fi = int.replace(/^0+(?=\d)/, '0');
    const cleanedInt = fi.replace(/^0+(\d)/, '$1');
    const finalInt = cleanedInt === '' ? '0' : cleanedInt;

    const finalFrac = (frac ?? '').slice(0, this.decimals());

    if (s.startsWith('.') && finalFrac) return '0.' + finalFrac;
    if (s.endsWith('.') && this.type() === 'token') return `${finalInt}.`;
    return finalFrac ? `${finalInt}.${finalFrac}` : finalInt;
  }

  private normalizeNumber(raw: string): string {
    let s = raw.replace(/,/g, '.').replace(/[^\d.]/g, '');
    const parts = s.split('.');
    if (parts.length > 2) s = parts[0] + '.' + parts.slice(1).join('');

    const [int = '', frac = ''] = s.split('.');
    const cleanedInt = int.replace(/^0+(\d)/, '$1');
    const finalInt = cleanedInt === '' ? '0' : cleanedInt;

    if (s.startsWith('.') && frac) return '0.' + frac;
    if (s.endsWith('.')) return `${finalInt}.`;

    return frac ? `${finalInt}.${frac}` : finalInt;
  }

  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    let next = v;

    if (this.type() === 'token') next = this.normalizeToken(v);
    else if (this.type() === 'number') next = this.normalizeNumber(v);

    if (
      (this.type() === 'number' || this.type() === 'token') &&
      !next.endsWith('.')
    ) {
      const n = Number(next || 0);
      if (this.min() != null && n < this.min()!) next = String(this.min());
      if (this.max() != null && n > Number(this.max())!)
        next = String(this.max());
    }

    this.value.set(next);
  }

  onKeyDown(ev: KeyboardEvent) {
    if (this.type() === 'text') return;

    const allowed =
      [
        'Backspace',
        'Delete',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
        'Enter',
      ].includes(ev.key) ||
      ev.ctrlKey ||
      ev.metaKey;

    if (allowed) return;
    if (/^\d$/.test(ev.key)) return;

    if (ev.key === '.') {
      const curr = this.value();
      if (this.type() === 'token' || this.type() === 'number') {
        if (curr.includes('.')) {
          ev.preventDefault();
          return;
        }
        return;
      }
    }

    ev.preventDefault();
  }

  onBlur() {
    if (
      (this.type() === 'token' || this.type() === 'number') &&
      this.value().endsWith('.')
    ) {
      this.value.set(this.value().slice(0, -1));
    }
    this.blur.emit();
  }

  private builtinValidators(): Array<(v: string) => string | null> {
    const req = this.required();
    const type = this.type();
    const min = this.min();
    const max = this.max();
    const decs = this.decimals();

    return [
      (v) => (req && !v ? 'Value is required' : null),
      (v) => {
        if (type === 'text' || v === '' || v === '.') {
          return null;
        }
        const n = Number(v);
        if (Number.isNaN(n)) return 'Not a number';
        return null;
      },
      (v) => {
        if (!(type === 'number' || type === 'token')) return null;
        if (!v || v === '.') {
          return null;
        }
        if (min != null && Number(v) < min) return `Min is ${min}`;
        if (max != null && Number(v) > Number(max)) return `Max is ${max}`;
        return null;
      },
      (v) => {
        if (type !== 'token') return null;
        const [, frac = ''] = v.split('.');
        return frac.length > decs ? `Max ${decs} decimals` : null;
      },
    ];
  }

  errors = computed(() => {
    const v = this.value();
    const all = [...this.builtinValidators(), ...this.validators()];
    return all.map((fn) => fn(v)).filter((e): e is string => !!e);
  });

  invalid = computed(() => this.errors().length > 0);
}
