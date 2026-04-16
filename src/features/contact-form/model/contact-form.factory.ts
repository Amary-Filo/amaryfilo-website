// src/features/contact-form/model/contact-form.factory.ts

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFactoryResult, markFormFresh } from '@lib/form';
import { ContactFormControls } from './contact-form.types';

export function createContactForm(): FormFactoryResult<ContactFormControls> {
  const form = new FormGroup<ContactFormControls>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(2000)],
    }),
    website: new FormControl('', {
      nonNullable: true,
    }),
  });

  const resetDefaults = () => {
    form.reset({
      name: '',
      email: '',
      message: '',
      website: '',
    });
    markFormFresh(form);
  };

  return { form, resetDefaults };
}
