// src/features/contact-form/model/contact-form.types.ts

import { FormControl } from '@angular/forms';

export interface ContactFormControls {
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
  website: FormControl<string>;
}
