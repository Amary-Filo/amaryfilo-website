import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgpTextarea } from 'ng-primitives/textarea';

@Component({
  selector: 'textarea[ui-textarea]',
  standalone: true,
  hostDirectives: [{ directive: NgpTextarea, inputs: ['disabled'] }],
  template: ` <ng-content /> `,
  styles: `
    :host {
      // max-width: var(--kit-input-max-width);
      width: 100%;

      padding: var(--ui-spacing-xs) var(--ui-spacing-md);

      border-radius: var(--ui-radius-lg);
      border: var(--ui-border-1) solid var(--ui-sem-border-2);
      background-color: var(--ui-sem-input);

      box-sizing: border-box;

      outline: 2px solid transparent;
      outline-offset: 2px;
      transition: 0.3s ease-in-out;
    }

    :host[data-focus] {
      outline-color: rgba(var(--ui-sem-primary-rgb), var(--ui-alpha-60));
    }

    :host::placeholder {
      color: var(--ui-sem-muted-fg);
    }

    :host.ng-invalid.ng-touched {
      outline-color: var(--ui-sem-destructive-border);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UITextarea {}
