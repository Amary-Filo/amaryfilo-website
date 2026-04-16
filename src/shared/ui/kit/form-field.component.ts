// src/shared/ui/kit/form-field/form-field.component.ts

import { Component } from '@angular/core';
import { NgpFormField } from 'ng-primitives/form-field';

@Component({
  selector: 'ui-form-field',
  hostDirectives: [NgpFormField],
  template: ` <ng-content /> `,
  styles: `
    @use 'styles/mixins' as mx;

    :host {
      display: flex;
      flex-direction: column;
      gap: var(--ui-spacing-2xs);
      width: 100%;
      @include mx.ui-text('paragraph-small-medium');
      color: var(--ui-sem-muted-fg);
    }
  `,
})
export class UIFormField {}
