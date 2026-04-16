// src/shared/lib/form/mode/form0-meta.types.ts

import { FormControl, FormGroup } from '@angular/forms';

export type FormMetaValue = {
  timezone: string;
  timezoneOffset: number;
  timezoneGMT: string;
  currentDateTime: string;

  browserLanguage: string;
  userAgent: string;

  referrerUrl: string;
  currentUrl: string;
  pageTitle: string;

  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
};

export type FormMetaControls = {
  timezone: FormControl<string>;
  timezoneOffset: FormControl<number>;
  timezoneGMT: FormControl<string>;
  currentDateTime: FormControl<string>;

  browserLanguage: FormControl<string>;
  userAgent: FormControl<string>;

  referrerUrl: FormControl<string>;
  currentUrl: FormControl<string>;
  pageTitle: FormControl<string>;

  utmSource: FormControl<string | null>;
  utmMedium: FormControl<string | null>;
  utmCampaign: FormControl<string | null>;
  utmContent: FormControl<string | null>;
  utmTerm: FormControl<string | null>;
};

export type FormMetaGroup = FormGroup<FormMetaControls>;
