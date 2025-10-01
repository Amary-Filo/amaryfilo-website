import { Component, computed, input, model, output } from '@angular/core';
import { formatUnits, parseUnits } from 'ethers';

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

  useWei = input<boolean>(false);
  clampOnBlur = input<boolean>(true);

  decimals = input<number>(18);
  limitNumberDecimals = input<number>();
  min = input<number | string>();
  max = input<number | string>();

  validators = input<Array<(v: string) => string | null>>([]);

  blur = output<void>();
  enter = output<void>();

  private fracLen(v: string) {
    const i = v.indexOf('.');
    return i === -1 ? 0 : v.length - i - 1;
  }

  private proposedValue(input: HTMLInputElement, data: string) {
    const { selectionStart, selectionEnd, value } = input;
    const s = selectionStart ?? value.length;
    const e = selectionEnd ?? value.length;
    return value.slice(0, s) + data + value.slice(e);
  }

  private validDecimals(v: string, decimals: number) {
    if (v === '' || v === '.') return true;
    if (!/^\d*\.?\d*$/.test(v)) return false;
    if (decimals === 0 && v.includes('.')) return false;
    return this.fracLen(v) <= decimals;
  }

  private tryParseWei(v: string): bigint | null {
    try {
      if (!v || v === '.' || Number.isNaN(Number(v))) return null;
      return parseUnits(v, this.decimals());
    } catch {
      return null;
    }
  }

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

  onBeforeInput(ev: InputEvent) {
    const t = this.type();
    if (t !== 'token' && t !== 'number') return;

    const el = ev.target as HTMLInputElement;
    const decs =
      t === 'token' ? this.decimals() : this.limitNumberDecimals() ?? 18;

    if (ev.inputType.startsWith('delete')) return;

    const data = ev.data ?? '';
    if (ev.inputType.startsWith('insert')) {
      const next = this.proposedValue(el, data);
      if (!this.validDecimals(next, decs)) {
        ev.preventDefault();
        return;
      }
    }
  }

  onPaste(ev: ClipboardEvent) {
    const t = this.type();
    if (t !== 'token' && t !== 'number') return;

    const el = ev.target as HTMLInputElement;
    const decs =
      t === 'token' ? this.decimals() : this.limitNumberDecimals() ?? 18;

    const text = ev.clipboardData?.getData('text') ?? '';
    let data = text.replace(/,/g, '.').replace(/[^\d.]/g, '');

    const parts = data.split('.');
    if (parts.length > 2) data = parts[0] + '.' + parts.slice(1).join('');

    const [i = '', f = ''] = data.split('.');
    const limited = f ? `${i}.${f.slice(0, decs)}` : i;

    const next = this.proposedValue(el, limited);
    if (!this.validDecimals(next, decs)) {
      ev.preventDefault();
      return;
    }

    ev.preventDefault();

    const s = el.selectionStart ?? el.value.length;
    const e = el.selectionEnd ?? el.value.length;
    const final = el.value.slice(0, s) + limited + el.value.slice(e);

    this.value.set(final);

    const pos = s + limited.length;
    queueMicrotask(() => el.setSelectionRange(pos, pos));
  }

  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    let next = v;

    if (this.type() === 'token') next = this.normalizeToken(v);
    else if (this.type() === 'number') next = this.normalizeNumber(v);

    this.value.set(next);
  }

  onKeyDown(ev: KeyboardEvent) {
    if (this.type() === 'text') return;

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Enter',
    ];
    if (allowedKeys.includes(ev.key) || ev.ctrlKey || ev.metaKey) return;
    if (/^\d$/.test(ev.key)) return;

    if (ev.key === '.') {
      const t = this.type();
      const decs =
        t === 'token' ? this.decimals() : this.limitNumberDecimals() ?? 18;
      const curr = (ev.target as HTMLInputElement).value;

      if (decs === 0 || curr.includes('.')) {
        ev.preventDefault();
        return;
      }
      return;
    }

    ev.preventDefault();
  }

  onBlur() {
    const t = this.type();
    let v = this.value();

    if ((t === 'token' || t === 'number') && v.endsWith('.')) {
      v = v.slice(0, -1);
    }

    if (
      this.clampOnBlur() &&
      (t === 'token' || t === 'number') &&
      v &&
      v !== '.'
    ) {
      if (this.useWei()) {
        const wei = this.tryParseWei(v);
        if (wei != null) {
          const minWei = this.tryParseWei(this.min() as string);
          const maxWei = this.tryParseWei(this.max() as string);
          if (minWei != null && wei < minWei)
            v = formatUnits(minWei, this.decimals());
          if (maxWei != null && wei > maxWei)
            v = formatUnits(maxWei, this.decimals());
        }
      } else {
        const n = Number(v);
        const min = this.min();
        const max = this.max();
        if (!Number.isNaN(n)) {
          if (min != null && n < Number(min)) v = String(min);
          if (max != null && n > Number(max)) v = String(max);
        }
      }
    }

    this.value.set(v);
    this.blur.emit();
  }

  private builtinValidators(): Array<(v: string) => string | null> {
    const req = this.required();
    const type = this.type();
    const decs = this.decimals();

    return [
      (v) => (req && !v ? 'Value is required' : null),
      (v) => {
        if (type === 'text' || v === '' || v === '.') return null;
        return Number.isNaN(Number(v)) ? 'Not a number' : null;
      },
      (v) => {
        if (!(type === 'number' || type === 'token') || !v || v === '.')
          return null;

        if (this.useWei()) {
          const wei = this.tryParseWei(v);
          if (wei == null) return 'Invalid amount';

          const minWei = this.tryParseWei(this.min() as string);
          const maxWei = this.tryParseWei(this.max() as string);

          if (minWei != null && wei < minWei)
            return `Min is ${formatUnits(minWei, decs)}`;
          if (maxWei != null && wei > maxWei)
            return `Max is ${formatUnits(maxWei, decs)}`;

          return null;
        } else {
          const n = Number(v);
          const min = this.min();
          const max = this.max();

          if (min != null && n < Number(min)) return `Min is ${min}`;
          if (max != null && n > Number(max)) return `Max is ${max}`;

          return null;
        }
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
