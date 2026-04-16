// src/shared/lib/form/model/data-collector.service.ts

import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormMetaControls, FormMetaGroup, FormMetaValue } from './form-meta.types';

@Injectable({ providedIn: 'root' })
export class DataCollectorService {
  private cachedData?: FormMetaValue;

  collectMetaData(): FormMetaValue {
    if (this.cachedData) return this.cachedData;

    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const offset = -now.getTimezoneOffset();
    const hours = Math.trunc(offset / 60);
    const minutes = Math.abs(offset % 60);
    const sign = offset >= 0 ? '+' : '-';
    const timezoneGMT = `GMT${sign}${Math.abs(hours)}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`;

    const search = typeof window !== 'undefined' ? window.location.search : '';
    const params = new URLSearchParams(search);

    this.cachedData = {
      timezone,
      timezoneOffset: offset,
      timezoneGMT,
      currentDateTime: now.toISOString(),

      browserLanguage:
        typeof navigator !== 'undefined' ? navigator.language || 'unknown' : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent || 'unknown' : 'unknown',

      referrerUrl: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
      currentUrl: typeof window !== 'undefined' ? window.location.href : '',
      pageTitle: typeof document !== 'undefined' ? document.title || '' : '',

      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      utmContent: params.get('utm_content'),
      utmTerm: params.get('utm_term'),
    };

    return this.cachedData;
  }

  getMetaFormGroup(): FormMetaGroup {
    const data = this.collectMetaData();

    return new FormGroup<FormMetaControls>({
      timezone: new FormControl(data.timezone, { nonNullable: true }),
      timezoneOffset: new FormControl(data.timezoneOffset, { nonNullable: true }),
      timezoneGMT: new FormControl(data.timezoneGMT, { nonNullable: true }),
      currentDateTime: new FormControl(data.currentDateTime, { nonNullable: true }),

      browserLanguage: new FormControl(data.browserLanguage, { nonNullable: true }),
      userAgent: new FormControl(data.userAgent, { nonNullable: true }),

      referrerUrl: new FormControl(data.referrerUrl, { nonNullable: true }),
      currentUrl: new FormControl(data.currentUrl, { nonNullable: true }),
      pageTitle: new FormControl(data.pageTitle, { nonNullable: true }),

      utmSource: new FormControl(data.utmSource),
      utmMedium: new FormControl(data.utmMedium),
      utmCampaign: new FormControl(data.utmCampaign),
      utmContent: new FormControl(data.utmContent),
      utmTerm: new FormControl(data.utmTerm),
    });
  }
}
