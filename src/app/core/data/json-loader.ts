export async function safeGetJson<T>(path: string): Promise<T | null> {
  // dev-server иногда возвращает index.html с 200 → ловим по content-type
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) return null;

  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) return null;

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function buildAssetsUrl(path: string): string {
  if (typeof window !== 'undefined') return path;

  const origin =
    (globalThis as any).__APP_ORIGIN__ ??
    process.env['APP_ORIGIN'] ??
    'http://localhost:4200';

  return new URL(path, origin).toString();
}
