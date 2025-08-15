// tools/build-designs.mjs
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPPORTED_LANGS = ['en', 'ru', 'es', 'de'];
const DEFAULT_LANG = 'en';

// ВХОД и ВЫХОД
const CONTENT_DIR = join(process.cwd(), 'content', 'designs');
const OUT_ROOT = join(process.cwd(), 'src', 'assets', 'designs');
const OUT_INDEX = join(OUT_ROOT, 'index.json');
// per-lang
const OUT_INDEX_LANG = (lang) => join(OUT_ROOT, `index.${lang}.json`);
const OUT_LATEST_LANG = (lang) => join(OUT_ROOT, `latest.${lang}.json`);
const OUT_DETAIL_LANG = (lang, slug) =>
  join(OUT_ROOT, 'data', lang, `${slug}.${lang}.json`);

function ensureDate(d) {
  // Поддержим "dd.mm.yyyy" и ISO
  if (!d) return new Date(0);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split('.').map((x) => parseInt(x, 10));
    return new Date(yyyy, mm - 1, dd);
  }
  const t = Date.parse(d);
  return isNaN(t) ? new Date(0) : new Date(t);
}

function extractOrdinal(name) {
  // поддержка имени без расширения и с ним
  const s = String(name || '');
  const m =
    /(?:-|_)(\d+)(?:-[a-z]{2,}|@[\dx]+)?(?:\.[a-z0-9]+)?$/i.exec(s);
  return m ? parseInt(m[1], 10) : NaN;
}

function overlayImages(baseArr = [], langArr = []) {
  if (!Array.isArray(baseArr)) baseArr = [];
  if (!Array.isArray(langArr)) langArr = [];

  // карта замен из локали: ordinal -> filename
  const overrides = new Map();
  for (const f of langArr) {
    const n = extractOrdinal(f);
    if (!Number.isNaN(n)) overrides.set(n, f);
  }

  // если ничего не распознали — мягкий фолбэк на позиционный merge
  if (overrides.size === 0) {
    const maxLen = Math.max(baseArr.length, langArr.length);
    const res = new Array(maxLen);
    for (let i = 0; i < maxLen; i++)
      res[i] = langArr[i] ?? baseArr[i] ?? null;
    return res.filter(Boolean);
  }

  // строим результат по базе, подменяя совпадающие порядковые номера
  const result = baseArr.slice(); // копия
  for (let i = 0; i < result.length; i++) {
    const n = extractOrdinal(result[i]);
    if (!Number.isNaN(n) && overrides.has(n)) {
      result[i] = overrides.get(n);
    }
  }

  // добавить локальные изображения без номера в конец
  for (const f of langArr) {
    const n = extractOrdinal(f);
    if (Number.isNaN(n)) result.push(f);
  }

  return result.filter(Boolean);
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
    title: (langData.title ?? base.title) || '',
    thumbnail: (langData.thumbnail ?? meta.thumbnail) || ''
  };
}

async function build() {
  // 1) собрать все файлы дизайнов
  let files = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((f) =>
      f.endsWith('.json')
    );
  } catch (e) {
    console.error('[build-designs] Content folder not found:', CONTENT_DIR);
    process.exit(1);
  }

  const items = [];
  for (const file of files) {
    const full = join(CONTENT_DIR, file);
    try {
      const data = await readJson(full);
      const isActive = data?.is_active !== false; // по умолчанию true
      const slug = data?.metadata?.slug;
      if (!slug || typeof slug !== 'string') continue;

      items.push({ file, full, data, slug, isActive });
    } catch (e) {
      console.warn(
        '[build-designs] skip invalid JSON:',
        file,
        e.message
      );
    }
  }

  // 2) index.json (только slug активных)
  const activeSlugs = items.filter((x) => x.isActive).map((x) => x.slug);
  await writeJson(OUT_INDEX, activeSlugs);

  // 3) per-lang индексы и latest
  for (const lang of SUPPORTED_LANGS) {
    // Сформировать карточки
    const cards = items.map(({ data, slug, isActive }) => {
      const meta = localizedMeta(data, lang);
      const card = {
        slug,
        date: meta.date,
        category: meta.category,
        title: meta.title,
        thumbnail: meta.thumbnail
      };
      if (isActive === false) card.is_active = false;
      return card;
    });

    // отфильтровать неактивные для индекса
    const cardsActive = cards.filter((c) => c.is_active !== false);

    // сортировка по дате desc
    cardsActive.sort(
      (a, b) => +ensureDate(b.date) - +ensureDate(a.date)
    );

    await writeJson(OUT_INDEX_LANG(lang), cardsActive);

    // latest.{lang}.json (4 штуки)
    await writeJson(OUT_LATEST_LANG(lang), cardsActive.slice(0, 4));
  }

  // 4) детали per design per lang
  for (const { data, slug, isActive } of items) {
    if (!isActive) continue; // не генерим detail для неактивных

    const base = data?.base ?? {};
    const baseDesc = base.description || '';
    const baseImages = Array.isArray(base.images) ? base.images : [];
    const baseLinks = Array.isArray(base.links) ? base.links : [];

    for (const lang of SUPPORTED_LANGS) {
      const langData = data?.data?.[lang] ?? {};
      const meta = localizedMeta(data, lang);

      const description = langData.description ?? baseDesc;
      const images = overlayImages(
        baseImages,
        Array.isArray(langData.images) ? langData.images : []
      );
      const links = Array.isArray(langData.links)
        ? langData.links
        : baseLinks;

      const detail = {
        slug: meta.slug || slug,
        title: meta.title,
        date: meta.date,
        category: meta.category,
        thumbnail: meta.thumbnail,
        description,
        images,
        links
      };

      await writeJson(OUT_DETAIL_LANG(lang, slug), detail);
    }
  }

  console.log(
    '[build-designs] OK:',
    `index.json=${activeSlugs.length},`,
    `index.{${SUPPORTED_LANGS.join(',')}}.json,`,
    `latest.*, details.* generated → ${OUT_ROOT}`
  );
}

build().catch((e) => {
  console.error('[build-designs] FAILED', e);
  process.exit(1);
});