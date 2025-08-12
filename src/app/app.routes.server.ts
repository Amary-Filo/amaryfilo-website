import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const serverRoutes: ServerRoute[] = [
  // Статические страницы — SSG
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'designs', renderMode: RenderMode.Prerender },
  // { path: 'projects', renderMode: RenderMode.Prerender },
  // { path: 'blog', renderMode: RenderMode.Prerender },
  // { path: 'areas', renderMode: RenderMode.Prerender },
  // { path: 'developments', renderMode: RenderMode.Prerender },
  // { path: 'projects', renderMode: RenderMode.Prerender },
  // { path: 'sandbox', renderMode: RenderMode.Prerender },

  // Пререндер параметризованных страниц (динамические slug’и):
  {
    path: 'designs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const idxPath = join(process.cwd(), 'src/assets/data/designs/index.en.json');
      const list = JSON.parse(readFileSync(idxPath, 'utf8')) as Array<{ slug: string }>;
      return list.map(x => ({ slug: x.slug }));
    },
  },

  // Всё остальное — CSR (SPA), чтобы не плодить лишних HTML
  { path: '**', renderMode: RenderMode.Client },
];
