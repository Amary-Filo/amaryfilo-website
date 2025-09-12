import { Component, effect, input, model, computed } from '@angular/core';

export interface InputChooseValues {
  title: string;
  value: string;
  text?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-input-choose',
  standalone: true,
  templateUrl: './input-choose.component.html',
  styleUrls: ['./input-choose.component.scss'],
})
export class UIInputChooseComponent {
  values = model<InputChooseValues[]>([]);
  value = model<string>('');

  label = input<string>('');
  name = input<string>('');
  disabled = input(false);

  initialValue = input<string | undefined>(undefined);

  constructor() {
    effect(() => {
      const list = this.values();
      const curr = this.value();
      const init = this.initialValue();

      if (!list?.length) return;

      if (!curr && init && list.some((i) => i.value === init)) {
        this.value.set(init);
        return;
      }

      if (!curr) {
        this.value.set(list[0].value);
      } else if (!list.some((i) => i.value === curr)) {
        this.value.set(list[0].value);
      }
    });
  }

  onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
  }

  setValue(v: string) {
    this.value.set(v);
  }
}
