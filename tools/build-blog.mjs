// tools/build-blog.mjs
import { promises as fs } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPPORTED_LANGS = ["en", "ru", "es", "de"];
const DEFAULT_LANG = "en";

// ── ВХОД ──────────────────────────────────────────────────────────────────────
const CONTENT_DIR = join(process.cwd(), "content", "blog");
const ARTICLES_DIR = join(CONTENT_DIR, "articles");
const CATEGORIES_DIR = join(CONTENT_DIR, "categories");

// ── ВЫХОД ─────────────────────────────────────────────────────────────────────
const OUT_ROOT = join(process.cwd(), "src", "assets", "blog");

// статьи
const OUT_ART_INDEX = join(OUT_ROOT, "index.json");
const OUT_ART_INDEX_LANG = (lang) => join(OUT_ROOT, `index.${lang}.json`);
const OUT_ART_LATEST_LANG = (lang) => join(OUT_ROOT, `latest.${lang}.json`);
const OUT_ART_DETAIL_LANG = (lang, slug) =>
  join(OUT_ROOT, "data", lang, `${slug}.${lang}.json`);

// категории
const OUT_CAT_ROOT = join(OUT_ROOT, "categories");
const OUT_CAT_INDEX = join(OUT_CAT_ROOT, "index.json");
const OUT_CAT_INDEX_LANG = (lang) => join(OUT_CAT_ROOT, `index.${lang}.json`);
const OUT_CAT_DETAIL_LANG = (lang, slug) =>
  join(OUT_CAT_ROOT, "data", lang, `${slug}.${lang}.json`);
// ──────────────────────────────────────────────────────────────────────────────

function ensureDate(d) {
  if (!d) return new Date(0);
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split(".").map((x) => parseInt(x, 10));
    return new Date(yyyy, mm - 1, dd);
  }
  const t = Date.parse(d);
  return Number.isNaN(t) ? new Date(0) : new Date(t);
}

function latestDate(meta = {}) {
  // meta.date + meta.updates[]
  const dates = [];
  if (meta.date) dates.push(ensureDate(meta.date));
  if (Array.isArray(meta.updates)) {
    for (const u of meta.updates) dates.push(ensureDate(u));
  }
  if (!dates.length) return new Date(0);
  dates.sort((a, b) => +b - +a);
  return dates[0];
}

function slugify(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_]/g, "");
}

async function readJson(path) {
  const text = await fs.readFile(path, "utf8");
  return JSON.parse(text);
}
async function writeJson(path, obj) {
  await fs.mkdir(dirname(path), { recursive: true });
  const json = JSON.stringify(obj, null, 2);
  await fs.writeFile(path, json, "utf8");
}

// ── Категории ────────────────────────────────────────────────────────────────
async function loadCategories() {
  let files = [];
  try {
    files = (await fs.readdir(CATEGORIES_DIR)).filter((f) =>
      f.endsWith(".json")
    );
  } catch (e) {
    // категорий может не быть — это ок
    return { list: [], bySlug: new Map() };
  }

  const list = [];
  const bySlug = new Map();

  for (const f of files) {
    const full = join(CATEGORIES_DIR, f);
    try {
      const cat = await readJson(full);
      const slug = cat?.slug || slugify(f.replace(/\.json$/i, ""));
      const base = cat?.base ?? {};
      const data = cat?.data ?? {};
      const record = { slug, base, data, file: f };
      list.push(record);
      bySlug.set(slug.toLowerCase(), record);
    } catch (e) {
      console.warn("[build-blog] skip invalid category:", f, e.message);
    }
  }

  return { list, bySlug };
}

function localizedCategory(cat, lang) {
  const base = cat?.base ?? {};
  const L = cat?.data?.[lang] ?? {};
  return {
    slug: cat.slug,
    title: (L.title ?? base.title ?? cat.slug) || "",
    description: (L.description ?? base.description) || "",
    icon: base.icon || "",
    color: base.color || "",
  };
}

// ── Статьи ───────────────────────────────────────────────────────────────────
function localizedArticleMeta(article, lang, catsBySlug) {
  const meta = article?.metadata ?? {};
  const base = article?.base ?? {};
  const L = article?.data?.[lang] ?? {};

  // основная категория (string либо объект)
  const mainCat =
    typeof meta.category === "string"
      ? meta.category
      : meta.category?.title ?? "";

  const mainCatSlug = slugify(mainCat);
  const catMeta = catsBySlug.get(mainCatSlug);

  return {
    slug: meta.slug || "",
    date: meta.date || "",
    updates: Array.isArray(meta.updates) ? meta.updates.slice() : [],
    category: mainCat || null,
    category_list: Array.isArray(meta.category_list)
      ? meta.category_list.slice()
      : [],
    tags: Array.isArray(meta.tags) ? meta.tags.slice() : [],
    title: (L.title ?? base.title ?? meta.title) || "",
    anonce: (L.anonce ?? base.anonce) || "",
    thumbnail: (L.thumbnail ?? meta.thumbnail) || "",
    // добавляем икон/цвет основной категории (если нашли по slug)
    icon: catMeta?.base?.icon || "",
    color: catMeta?.base?.color || "",
  };
}

function overlayContent(baseArr = [], langArr = []) {
  const base = Array.isArray(baseArr) ? baseArr : [];
  const loc = Array.isArray(langArr) ? langArr : [];

  const hasIds =
    base.some((b) => b && typeof b === "object" && "id" in b) ||
    loc.some((b) => b && typeof b === "object" && "id" in b);

  if (!hasIds) {
    const max = Math.max(base.length, loc.length);
    const res = new Array(max);
    for (let i = 0; i < max; i++) res[i] = loc[i] ?? base[i] ?? null;
    return res.filter(Boolean);
  }

  const byId = new Map();
  for (const b of base) {
    const id = b?.id;
    if (id != null) byId.set(String(id), b);
  }
  for (const b of loc) {
    const id = b?.id;
    if (id != null) byId.set(String(id), b);
  }

  const result = base.map((b) => {
    const id = b?.id;
    if (id != null && byId.has(String(id))) return byId.get(String(id));
    return b;
  });

  for (const b of loc) {
    const id = b?.id;
    if (id == null) continue;
    const existed = base.some((x) => x?.id === id);
    if (!existed) result.push(b);
  }
  return result.filter(Boolean);
}

// Menu
function buildMenuAndPatchContent(blocks = []) {
  const out = [];
  const menu = [];
  const seen = new Set();

  for (const b of blocks || []) {
    if (!b || typeof b !== "object") {
      out.push(b);
      continue;
    }

    if (b.type === "h2" || b.type === "h3") {
      const level = b.type === "h2" ? 2 : 3;
      let id = b.id || slugify(b.text || "");

      // гарантируем уникальность id
      let base = id || "section";
      let n = 1;
      while (seen.has(id)) id = `${base}-${n++}`;
      seen.add(id);

      menu.push({ id, title: b.text || "", level });
      out.push({ ...b, id }); // ПАТЧИМ контент тем же id
    } else {
      out.push(b);
    }
  }

  return { menu, content: out };
}

async function build() {
  // 0) Категории
  const { list: categories, bySlug: catsBySlug } = await loadCategories();

  // 1) Статьи — читаем файлы
  let files = [];
  try {
    files = (await fs.readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".json"));
  } catch (e) {
    console.error("[build-blog] Articles folder not found:", ARTICLES_DIR);
    process.exit(1);
  }

  const articles = [];
  for (const file of files) {
    const full = join(ARTICLES_DIR, file);
    try {
      const data = await readJson(full);
      const isActive = data?.is_active !== false;
      const slug = data?.metadata?.slug;
      if (!slug || typeof slug !== "string") continue;

      articles.push({ file, full, data, slug, isActive });
    } catch (e) {
      console.warn("[build-blog] skip invalid article:", file, e.message);
    }
  }

  // 2) index.json (только активные slug)
  const activeSlugs = articles.filter((x) => x.isActive).map((x) => x.slug);
  await writeJson(OUT_ART_INDEX, activeSlugs);

  // 3) per-lang индексы + latest.{lang}.json (по последней дате/апдейту)
  for (const lang of SUPPORTED_LANGS) {
    const cards = articles.map(({ data, slug, isActive }) => {
      const meta = localizedArticleMeta(data, lang, catsBySlug);
      const card = {
        slug,
        date: meta.date,
        updates: meta.updates,
        title: meta.title,
        anonce: meta.anonce,
        thumbnail: meta.thumbnail,
        category: meta.category,
        category_list: meta.category_list,
        icon: meta.icon,
        color: meta.color,
        tags: meta.tags,
      };
      if (isActive === false) card.is_active = false;
      return card;
    });

    const activeCards = cards.filter((c) => c.is_active !== false);

    // sort by max(date, updates[*])
    activeCards.sort((a, b) => +latestDate(b) - +latestDate(a));

    await writeJson(OUT_ART_INDEX_LANG(lang), activeCards);
    await writeJson(OUT_ART_LATEST_LANG(lang), activeCards.slice(0, 6));
  }

  // 4) Детали статей per lang
  for (const { data, slug, isActive } of articles) {
    if (!isActive) continue;

    const base = data?.base ?? {};
    const baseContent = Array.isArray(base.content) ? base.content : [];
    const baseLinks = Array.isArray(base.links) ? base.links : [];

    for (const lang of SUPPORTED_LANGS) {
      const L = data?.data?.[lang] ?? {};
      const meta = localizedArticleMeta(data, lang, catsBySlug);

      const merged = overlayContent(
        baseContent,
        Array.isArray(L.content) ? L.content : []
      );
      const { menu, content } = buildMenuAndPatchContent(merged);
      const links = Array.isArray(L.links) ? L.links : baseLinks;

      const detail = {
        slug: meta.slug || slug,
        title: meta.title,
        date: meta.date,
        updates: meta.updates,
        anonce: meta.anonce,
        thumbnail: meta.thumbnail,
        category: meta.category,
        category_list: meta.category_list,
        icon: meta.icon,
        color: meta.color,
        tags: meta.tags,
        links,
        menu,
        content,
      };

      await writeJson(OUT_ART_DETAIL_LANG(lang, slug), detail);
    }
  }

  // 5) Категории: посчитать count из статей
  // Собираем все принадлежности статей: main + list
  const freq = new Map(); // slug -> count
  for (const { data, isActive } of articles) {
    if (!isActive) continue;
    const meta = data?.metadata ?? {};
    const main = meta.category ? [meta.category] : [];
    const list = Array.isArray(meta.category_list) ? meta.category_list : [];
    const all = [...main, ...list];
    const uniq = new Set(
      all.map((c) => slugify(typeof c === "string" ? c : c?.title ?? c))
    );
    for (const s of uniq) {
      if (!s) continue;
      freq.set(s, (freq.get(s) || 0) + 1);
    }
  }

  // index категорий
  const catSlugs = categories.map((c) => c.slug);
  await writeJson(OUT_CAT_INDEX, catSlugs);

  for (const lang of SUPPORTED_LANGS) {
    const records = categories.map((cat) => {
      const L = localizedCategory(cat, lang);
      return {
        slug: L.slug,
        title: L.title,
        description: L.description,
        icon: L.icon,
        color: L.color,
        count: freq.get(cat.slug.toLowerCase()) || 0,
      };
    });

    await writeJson(OUT_CAT_INDEX_LANG(lang), records);

    // detail на будущее (тот же payload)
    for (const rec of records) {
      await writeJson(OUT_CAT_DETAIL_LANG(lang, rec.slug), rec);
    }
  }

  console.log(
    "[build-blog] OK:",
    `articles: index.json=${activeSlugs.length}, index.{${SUPPORTED_LANGS.join(
      ","
    )}}.json, latest.*, details.*`,
    `categories: index.json=${catSlugs.length}, index.{${SUPPORTED_LANGS.join(
      ","
    )}}.json, details.* → ${OUT_ROOT}`
  );
}

build().catch((e) => {
  console.error("[build-blog] FAILED", e);
  process.exit(1);
});
