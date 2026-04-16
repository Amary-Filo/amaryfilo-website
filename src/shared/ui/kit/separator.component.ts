// src/shared/ui/kit/separator/separator.component.ts

import { Component } from '@angular/core';
import { NgpSeparator } from 'ng-primitives/separator';

@Component({
  selector: '[ui-separator]',
  hostDirectives: [{ directive: NgpSeparator, inputs: ['ngpSeparatorOrientation:orientation'] }],
  template: ``,
  styles: `
    :host {
      background-color: var(--ui-sem-border-2);
      height: var(--ui-border-1);
    }
  `,
})
export class UISeparator {}
