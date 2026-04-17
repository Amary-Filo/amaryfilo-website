//src/shared/ui/kit/switch.components.ts

import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { injectSwitchState, NgpSwitch, NgpSwitchThumb } from 'ng-primitives/switch';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Component({
  selector: 'ui-switch',
  hostDirectives: [
    {
      directive: NgpSwitch,
      inputs: ['ngpSwitchChecked:checked', 'ngpSwitchDisabled:disabled'],
      outputs: ['ngpSwitchCheckedChange:checkedChange'],
    },
  ],
  imports: [NgpSwitchThumb],
  template: ` <span ngpSwitchThumb></span> `,
  styles: `
    :host {
      position: relative;

      box-sizing: border-box;
      display: inline-flex;
      align-items: center;

      width: var(--ui-spacing-3xl);
      height: var(--ui-spacing-xl);
      padding: 0;

      border-radius: var(--ui-radius-full);
      border: var(--ui-border-1) solid var(--ui-sem-border-2);
      background-color: var(--ui-sem-secondary);

      outline: none;
      transition-property:
        color, background-color, border-color, text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }

    :host[data-focus-visible] {
      outline: 2px solid var(--ngp-focus-ring);
    }

    :host[data-checked] {
      background-color: var(--ui-sem-primary);
      border-color: var(--ui-sem-primary);
    }

    [ngpSwitchThumb] {
      display: block;

      height: 1.25rem;
      width: 1.25rem;

      border-radius: var(--ui-radius-full);
      box-shadow: var(--ngp-button-shadow);

      background-color: white;
      outline: none;

      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateX(1px);
      box-sizing: border-box;
    }

    [ngpSwitchThumb][data-checked] {
      transform: translateX(17px);
    }
  `,
  providers: [provideValueAccessor(IUSwitch)],
  host: {
    '(focusout)': 'onTouched?.()',
  },
})
export class IUSwitch implements ControlValueAccessor {
  private readonly switch = injectSwitchState();
  private onChange?: ChangeFn<boolean>;
  protected onTouched?: TouchedFn;

  constructor() {
    this.switch()
      .checkedChange.pipe(takeUntilDestroyed())
      .subscribe((value) => this.onChange?.(value));
  }

  writeValue(value: boolean): void {
    this.switch().setChecked(value);
  }

  registerOnChange(fn: ChangeFn<boolean>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.switch().setDisabled(isDisabled);
  }
}
