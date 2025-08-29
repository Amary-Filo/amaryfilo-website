import { ResolveFn } from '@angular/router';
import { Manifest } from './shared/utils/tokens';
import { DEMOS } from './registry';

export const demoManifestResolver: ResolveFn<Manifest> = (route) => {
  const kind = route.paramMap.get('kind');
  const slug = route.paramMap.get('slug');
  const mf = DEMOS.find((d) => d.kind === kind && d.slug === slug);
  if (!mf) throw new Error(`Demo not found: ${kind}/${slug}`);
  return mf;
};
