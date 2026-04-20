import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import {
  NgpSelect,
  NgpSelectDropdown,
  NgpSelectOption,
  NgpSelectPortal,
} from 'ng-primitives/select';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

import { UIIcon } from './icon/icon.component';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [NgpSelect, NgpSelectDropdown, NgpSelectOption, NgpSelectPortal, UIIcon],
  providers: [provideValueAccessor(UISelect)],
  template: `
    <div
      [(ngpSelectValue)]="value"
      [ngpSelectDisabled]="disabled() || formDisabled()"
      (ngpSelectValueChange)="onValueChange($event)"
      ngpSelect
    >
      @if (value(); as value) {
        <span class="select-value">{{ value }}</span>
      } @else {
        <span class="select-placeholder">{{ placeholder() }}</span>
      }
      @if (arrow()) {
        <div class="arrow">
          <ui-icon name="arrowDownSFill" size="10px" />
        </div>
      }

      <div *ngpSelectPortal ngpSelectDropdown>
        @for (option of options(); track option) {
          <div [ngpSelectOptionValue]="option" ngpSelectOption>
            {{ option }}
          </div>
        } @empty {
          <div class="empty-message">No options found</div>
        }
      </div>
    </div>
  `,
  styles: `
    @use 'styles/mixins' as mx;

    :host {
      max-width: var(--kit-select-max-width);
      width: 100%;
    }

    :host.ng-invalid.ng-touched [ngpSelect] {
      outline: var(--ui-border-2) solid var(--ui-sem-destructive-border);
      outline-offset: var(--ui-spacing-4xs);
    }

    [ngpSelect] {
      display: flex;
      justify-content: space-between;
      align-items: center;

      max-width: var(--kit-select-max-width);
      width: 100%;

      @include mx.ui-text('paragraph-small-medium');
      padding: var(--ui-spacing-sm) var(--ui-spacing-sm) var(--ui-spacing-sm) var(--ui-spacing-lg);

      border-radius: var(--ui-radius-xl);
      border: var(--ui-border-1) solid var(--ui-sem-border-2);
      background-color: var(--ui-sem-input);
      box-sizing: border-box;
    }

    .select-placeholder {
      color: var(--ui-sem-muted-fg);
    }

    .arrow {
      padding: var(--ui-spacing-3xs);
      // background-color: var(--ui-sem-accent-0);
      border-radius: var(--ui-radius-full);

      ui-icon {
        transition: 0.3s ease-in-out;
      }
    }

    [ngpSelect][data-open] {
      ui-icon {
        transition: 0.3s ease-in-out;
        transform: rotate(180deg);
      }
    }

    [ngpSelect][data-focus] {
      outline: var(--ui-border-2) solid rgba(var(--cl-main-rgb, #4d4d74), 0.6);
      outline-offset: 2px;
    }

    .select-placeholder {
      color: var(--ui-sem-muted-fg);
    }

    [ngpSelectDropdown] {
      position: absolute;

      width: var(--ngp-select-width);
      max-height: 240px;

      padding: var(--ui-spacing-xs);
      margin-top: var(--ui-spacing-3xs);
      @include mx.ui-text('paragraph-small-medium');

      border: var(--ui-border-1) solid var(--ui-sem-border-2);
      border-radius: var(--ui-radius);
      // box-shadow: var(--ngp-shadow-lg);
      background-color: var(--ui-sem-input);

      animation: popover-show 0.1s ease-out;
      transform-origin: var(--ngp-select-transform-origin);
      box-sizing: border-box;

      overflow-y: auto;
      outline: none;
      z-index: 999;
    }

    [ngpSelectDropdown][data-enter] {
      animation: select-show 0.1s ease-out;
    }

    [ngpSelectDropdown][data-exit] {
      animation: select-hide 0.1s ease-out;
    }

    [ngpSelectOption] {
      display: flex;
      align-items: center;
      gap: var(--ui-spacing-xs);

      height: 36px;
      width: 100%;

      padding: var(--ui-spacing-sm) var(--ui-spacing-md);
      @include mx.ui-text('paragraph-small-medium');

      border-radius: var(--ui-radius-md);
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }

    [ngpSelectOption][data-hover],
    [ngpSelectOption][data-press],
    [ngpSelectOption][data-active] {
      background-color: var(--ui-sem-secondary);
    }

    .empty-message {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--ui-spacing-md);
      color: var(--ui-sem-muted-fg);
      text-align: center;
    }

    @keyframes select-show {
      0% {
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes select-hide {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-10px) scale(0.9);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UISelect implements ControlValueAccessor {
  readonly options = input<string[]>([]);
  readonly arrow = input<boolean>(true);
  readonly placeholder = input<string>('');

  readonly disabled = input(false, {
    transform: booleanAttribute,
  });

  readonly value = model<string | undefined>();
  protected readonly formDisabled = signal(false);
  private onChange?: ChangeFn<string>;
  protected onTouched?: TouchedFn;

  writeValue(value: string | undefined): void {
    this.value.set(value);
  }

  registerOnChange(fn: ChangeFn<string | undefined>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected onValueChange(value: string): void {
    this.onChange?.(value);
  }
}
