// src/shared/lib/form/api/form-submit.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class FormSubmitService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = environment.contactApiUrl;

  submit<T>(payload: Record<string, unknown>): Observable<T> {
    if (!this.endpoint) return throwError(() => new Error('Form endpoint is not configured'));

    return this.http.post<T>(this.endpoint, payload).pipe(
      retry({
        count: 2,
        delay: (_, retryCount) => timer(retryCount * 300),
      }),
      catchError((error) => {
        console.error('Form submission failed', error);
        return throwError(() => error);
      }),
    );
  }
}
