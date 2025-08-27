import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const LANGS = ['en', 'ru', 'es', 'de'];
type PagePrefix = 'designs' | 'projects' | 'blog';

const langMap = () => LANGS.map((lang) => ({ lang }));

const prerenderParamsWithLang = (page: PagePrefix) => {
  const idxPath = join(process.cwd(), `src/assets/${page}/index.json`);
  const list = JSON.parse(readFileSync(idxPath, 'utf8')) as string[];
  const slugs = (Array.isArray(list) ? list : []).filter(
    (s) => typeof s === 'string' && s.trim().length > 0
  );

  const res: Array<Record<string, string>> = [];
  for (const lang of LANGS) {
    for (const slug of slugs) res.push({ lang, slug });
  }

  return res;
};

const prerenderParams = (page: PagePrefix) => {
  const idxPath = join(process.cwd(), `src/assets/${page}/index.json`);
  const list = JSON.parse(readFileSync(idxPath, 'utf8')) as string[];
  return (Array.isArray(list) ? list : [])
    .filter((s) => typeof s === 'string' && s.trim().length > 0)
    .map((slug) => ({ slug }));
};

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'designs', renderMode: RenderMode.Prerender },
  {
    path: 'designs/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParams('designs'),
  },
  { path: 'projects', renderMode: RenderMode.Prerender },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParams('projects'),
  },
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParams('blog'),
  },

  // LANGUAGE PREFIX
  {
    path: ':lang',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  // PAGE ABOUT
  {
    path: ':lang/about',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },

  // PAGE DESIGNS
  {
    path: ':lang/designs',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },
  {
    path: ':lang/designs/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParamsWithLang('designs'),
  },

  // PAGE PROJECTS
  {
    path: ':lang/projects',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },
  {
    path: ':lang/projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParamsWithLang('projects'),
  },

  // PAGE BLOG
  {
    path: ':lang/blog',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => langMap(),
  },
  {
    path: ':lang/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => prerenderParamsWithLang('blog'),
  },

  // OTHER CSR
  { path: '**', renderMode: RenderMode.Client },
];
