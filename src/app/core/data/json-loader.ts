// src/app/core/data/json-loader.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

export async function safeGetJson<T>(path: string): Promise<T | null> {
  // dev-server иногда возвращает index.html с 200 → ловим по content-type
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) return null;
  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) return null;
  try { return await res.json() as T; } catch { return null; }
}

export function buildAssetsUrl(rel: string) {
  const platformId = inject(PLATFORM_ID);
  // Абсолютный URL на SSR (чтобы не упасть на сервере)
  if (isPlatformServer(platformId)) {
    const origin = process.env['PUBLIC_ORIGIN'] ?? 'http://localhost:4200';
    return origin + rel;
  }
  return rel;
}