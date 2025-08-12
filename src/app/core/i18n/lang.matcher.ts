import { UrlSegment, UrlMatchResult } from '@angular/router';
import { SUPPORTED_LANGS, Lang } from './i18n.model';

export function langMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (!segments.length) return null;
  const first = segments[0].path as Lang;
  if (SUPPORTED_LANGS.includes(first)) {
    return {
      consumed: [segments[0]],
      posParams: { lang: segments[0] }
    };
  }
  return null;
}