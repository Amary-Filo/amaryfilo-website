import { ResolveFn } from '@angular/router';

/**
 * Объединяет несколько async‑загрузчиков в один объект для data.
 * Каждый loader должен быть функцией без аргументов (мы уже заинжектили внутри).
 */
export function combineResolvers<T extends Record<string, () => Promise<any>>>(
  loaders: T
): ResolveFn<Promise<{ [K in keyof T]: Awaited<ReturnType<T[K]>> }>> {
  return async () => {
    const entries = Object.entries(loaders) as [keyof T, () => Promise<any>][];
    const results = await Promise.all(entries.map(([, fn]) => fn()));
    return entries.reduce((acc, [key], idx) => {
      (acc as any)[key] = results[idx];
      return acc;
    }, {} as any);
  };
}
