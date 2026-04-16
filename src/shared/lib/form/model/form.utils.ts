// src/shared/lib/form/mode/form.utils.ts

import { AbstractControl, FormGroup } from '@angular/forms';

export type TControlsMap<T> = { [K in keyof T]: AbstractControl<any, any> };

export interface FormFactoryResult<TControls extends TControlsMap<TControls>> {
  form: FormGroup<TControls>;
  resetDefaults(): void;
}

export function markFormFresh(form: FormGroup): void {
  form.markAsPristine();
  form.markAsUntouched();
  form.updateValueAndValidity({ onlySelf: true, emitEvent: false });
}
