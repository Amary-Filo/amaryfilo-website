// src/shared/lib/form/mode/form.model.ts

import { inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormSubmitService } from '../api/form-submit.service';
import { DataCollectorService } from './data-collector.service';
import { FormFactoryResult, TControlsMap } from './form.utils';

export abstract class BaseFormModel<T extends TControlsMap<T>> {
  private readonly formSubmit = inject(FormSubmitService);
  private readonly dataCollector = inject(DataCollectorService);

  readonly isSubmitting = signal(false);
  readonly formSent = signal(false);
  readonly submitError = signal<string | null>(null);

  protected abstract formFactory: FormFactoryResult<T>;

  get form(): FormGroup<T> {
    return this.formFactory.form;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);

    const payload = {
      ...this.form.getRawValue(),
      meta: this.dataCollector.collectMetaData(),
    };

    this.formSubmit.submit<{ ok: boolean }>(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.formFactory.resetDefaults();
        this.formSent.set(true);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.formSent.set(false);
        this.submitError.set('Something went wrong. Please try again later.');
      },
    });
  }
}
