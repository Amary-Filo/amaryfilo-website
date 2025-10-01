import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const LANGS = ['en', 'ru', 'es', 'de'] as const;
type PagePrefix = 'designs' | 'projects' | 'blog';

const langMap = () => LANGS.map((lang) => ({ lang }));

const slugs = (page: PagePrefix) => {
  const p = join(process.cwd(), `src/assets/${page}/index.json`);
  const list = JSON.parse(readFileSync(p, 'utf8')) as string[];
  return (Array.isArray(list) ? list : []).filter(
    (s) => typeof s === 'string' && s.trim().length > 0
  );
};

const langSlugParams = (page: PagePrefix) => {
  const list = slugs(page);
  const res: Array<{ lang: string; slug: string }> = [];
  for (const lang of LANGS) for (const slug of list) res.push({ lang, slug });
  return res;
};

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'designs', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },

  {
    path: 'designs/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => slugs('designs').map((slug) => ({ slug })),
  },

  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => slugs('projects').map((slug) => ({ slug })),
  },

  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => slugs('blog').map((slug) => ({ slug })),
  },

  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  {
    path: ':lang/about',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  {
    path: ':lang/designs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  {
    path: ':lang/designs/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langSlugParams('designs'),
  },

  {
    path: ':lang/projects',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  {
    path: ':lang/projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langSlugParams('projects'),
  },

  {
    path: ':lang/blog',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  {
    path: ':lang/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langSlugParams('blog'),
  },

  { path: '**', renderMode: RenderMode.Client },
];
