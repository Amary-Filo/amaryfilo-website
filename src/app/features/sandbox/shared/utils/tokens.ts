import { InjectionToken, Type } from '@angular/core';
import { WritableSignal } from '@angular/core';

export const DEMO_CONFIG = new InjectionToken<WritableSignal<any>>(
  'DEMO_CONFIG'
);
export const DEMO_THEME = new InjectionToken<'light' | 'dark'>('DEMO_THEME');

export type DemoKind = 'app' | 'crypto' | 'ui';

export interface Manifest<Cfg = unknown> {
  id: string;
  slug: string;
  kind: DemoKind;
  title: string;
  description: string;
  tags: string[];
  component: Type<any>;
  controls?: Type<any>;
  defaultConfig?: Cfg;
}
