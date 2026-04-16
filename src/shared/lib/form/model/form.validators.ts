// src/shared/lib/form/mode/form.validators.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const TELEGRAM_RE = /^@?[a-zA-Z0-9_]{5,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function contactByTypeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    const type = parent?.get('formatContact')?.value as 'telegram' | 'email' | undefined;

    const raw = control.value ?? '';
    const value = typeof raw === 'string' ? raw.trim() : '';

    if (!value) return { required: true };
    if (!type) return null;

    if (type === 'telegram') {
      return TELEGRAM_RE.test(value) ? null : { contactInvalid: 'telegram' };
    }

    if (type === 'email') {
      return EMAIL_RE.test(value) ? null : { contactInvalid: 'email' };
    }

    return null;
  };
}
