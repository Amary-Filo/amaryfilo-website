// src/pages/main/components/contacts/contacts.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactForm } from '@features/contact-form';
import { UIButton, UIIcon } from '@ui/kit';

@Component({
  selector: 'section-contacts',
  standalone: true,
  imports: [ContactForm, UIIcon, UIButton],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsSection {}
