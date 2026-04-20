// src/shared/ui/kit/form-field/form-field.component.ts

import { Component, input } from '@angular/core';
import { NgpFormField, NgpLabel } from 'ng-primitives/form-field';

@Component({
  selector: 'ui-form-field',
  hostDirectives: [NgpFormField],
  imports: [NgpLabel],
  template: `
    <ng-content />
    @if (label()) {
      <label ngpLabel class="label">{{ label() }}</label>
    }
    <ng-content />
  `,
  styles: `
    @use 'styles/mixins' as mx;

    :host {
      display: flex;
      flex-direction: column;
      gap: var(--ui-spacing-2xs);
      width: 100%;
      @include mx.ui-text('paragraph-medium');
    }

    [ngpLabel] {
      color: var(--ui-sem-muted-fg);
    }
  `,
})
export class UIFormField {
  readonly label = input<string>();
}
