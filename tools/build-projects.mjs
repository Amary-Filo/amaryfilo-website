// tools/build-projects.mjs
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPPORTED_LANGS = ['en', 'ru', 'es', 'de'];
const DEFAULT_LANG = 'en';

// ВХОД и ВЫХОД
const CONTENT_DIR = join(process.cwd(), 'content', 'projects');
const OUT_ROOT = join(process.cwd(), 'src', 'assets', 'projects');
const OUT_INDEX = join(OUT_ROOT, 'index.json');
// per-lang
const OUT_INDEX_LANG = (lang) => join(OUT_ROOT, `index.${lang}.json`);
const OUT_LATEST_LANG = (lang) => join(OUT_ROOT, `latest.${lang}.json`);
const OUT_DETAIL_LANG = (lang, slug) =>
  join(OUT_ROOT, 'data', lang, `${slug}.${lang}.json`);

function ensureDate(d) {
  if (!d) return new Date(0);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split('.').map((x) => parseInt(x, 10));
    return new Date(yyyy, mm - 1, dd);
  }
  const t = Date.parse(d);
  return isNaN(t) ? new Date(0) : new Date(t);
}

async function readJson(path) {
  const text = await fs.readFile(path, 'utf8');
  return JSON.parse(text);
}

async function writeJson(path, obj) {
  await fs.mkdir(dirname(path), { recursive: true });
  const json = JSON.stringify(obj, null, 2);
  await fs.writeFile(path, json, 'utf8');
}

function localizedMeta(data, lang) {
  const meta = data?.metadata ?? {};
  const base = data?.base ?? {};
  const langData = data?.data?.[lang] ?? {};

  return {
    slug: meta.slug || '',
    date: meta.date || '',
    category: Array.isArray(meta.category) ? meta.category : [],
    title: meta.title || '',
    anonce: langData.anonce ?? base.anonce ?? '',
    logo: base.logo || '',
    instruments: Array.isArray(base.instruments) ? base.instruments : []
  };
}

async function build() {
  let files = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((f) =>
      f.endsWith('.json')
    );
  } catch (e) {
    console.error('[build-projects] Content folder not found:', CONTENT_DIR);
    process.exit(1);
  }

  const items = [];
  for (const file of files) {
    const full = join(CONTENT_DIR, file);
    try {
      const data = await readJson(full);
      const isActive = data?.is_active !== false;
      const slug = data?.metadata?.slug;
      if (!slug || typeof slug !== 'string') continue;

      items.push({ file, full, data, slug, isActive });
    } catch (e) {
      console.warn('[build-projects] skip invalid JSON:', file, e.message);
    }
  }

  const activeSlugs = items.filter((x) => x.isActive).map((x) => x.slug);
  await writeJson(OUT_INDEX, activeSlugs);

  for (const lang of SUPPORTED_LANGS) {
    const cards = items.map(({ data, slug, isActive }) => {
      const meta = localizedMeta(data, lang);
      const card = {
        slug,
        date: meta.date,
        category: meta.category,
        title: meta.title,
        anonce: meta.anonce,
        logo: meta.logo,
        instruments: meta.instruments
      };
      if (isActive === false) card.is_active = false;
      return card;
    });

    const cardsActive = cards.filter((c) => c.is_active !== false);
    cardsActive.sort((a, b) => +ensureDate(b.date) - +ensureDate(a.date));

    await writeJson(OUT_INDEX_LANG(lang), cardsActive);
    await writeJson(OUT_LATEST_LANG(lang), cardsActive.slice(0, 4));
  }

  for (const { data, slug, isActive } of items) {
    if (!isActive) continue;

    const base = data?.base ?? {};
    for (const lang of SUPPORTED_LANGS) {
      const langData = data?.data?.[lang] ?? {};
      const meta = localizedMeta(data, lang);

      const detail = {
        slug: meta.slug || slug,
        title: meta.title,
        date: meta.date,
        category: meta.category,
        anonce: meta.anonce,
        description: langData.description ?? base.description ?? '',
        logo: meta.logo,
        instruments: meta.instruments,
        images: Array.isArray(base.images) ? base.images : [],
        links: Array.isArray(base.links) ? base.links : [],
        features: Array.isArray(base.features) ? base.features : []
      };

      await writeJson(OUT_DETAIL_LANG(lang, slug), detail);
    }
  }

  console.log(
    '[build-projects] OK:',
    `index.json=${activeSlugs.length},`,
    `index.{${SUPPORTED_LANGS.join(',')}}.json,`,
    `latest.*, details.* generated → ${OUT_ROOT}`
  );
}

build().catch((e) => {
  console.error('[build-projects] FAILED', e);
  process.exit(1);
});