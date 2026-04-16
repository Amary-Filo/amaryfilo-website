// src/features/question-form/ui/question-form.component.ts

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BaseFormModel } from '@lib/form';
import { UIButton, UIInput, UITextarea, UIFormField } from '@ui/kit';

import { ContactFormControls } from '../model/contact-form.types';
import { createContactForm } from '../model/contact-form.factory';

@Component({
  selector: 'contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    UIButton,
    UIInput,
    UITextarea,
    UIFormField,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm extends BaseFormModel<ContactFormControls> {
  protected override formFactory = computed(() => createContactForm())();
}
