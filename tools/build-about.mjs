import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPPORTED_LANGS = ['en', 'ru', 'es', 'de'];
const DEFAULT_LANG = 'en';

const CONTENT_DIR = join(process.cwd(), 'content', 'pages', 'about');

const OUT_ROOT = join(process.cwd(), 'src', 'assets', 'pages', 'about');
const OUT_PATH = (name, lang) => join(OUT_ROOT, `${name}.${lang}.json`);


async function readJson(path) {
  const text = await fs.readFile(path, 'utf8');
  return JSON.parse(text);
}
async function writeJson(path, obj) {
  await fs.mkdir(dirname(path), { recursive: true });
  const json = JSON.stringify(obj, null, 2);
  await fs.writeFile(path, json, 'utf8');
}
function mapById(arr) {
  const m = new Map();
  for (const it of arr || []) {
    if (it && typeof it.id !== 'undefined') m.set(String(it.id), it);
  }
  return m;
}
function deepMerge(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) return b ?? a;
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    const res = { ...a };
    for (const k of Object.keys(b)) {
      res[k] = deepMerge(a?.[k], b[k]);
    }
    return res;
  }
  return b ?? a;
}


function mergeSkillsArray(baseSkills = [], langSkills = []) {
  if (!Array.isArray(baseSkills)) baseSkills = [];
  if (!Array.isArray(langSkills)) langSkills = [];
  const map = mapById(baseSkills);

  for (const ov of langSkills) {
    if (ov?.id == null) continue;
    const id = String(ov.id);
    const base = map.get(id) || {};
    map.set(id, { ...base, ...ov });
  }

  const merged = baseSkills.map(s => map.get(String(s.id)) || s);
  return merged;
}


async function buildWork() {
  const src = join(CONTENT_DIR, 'work.json');
  const { base = [], data = {} } = await readJson(src);

  const results = {};
  for (const lang of SUPPORTED_LANGS) {

    const overrides = mapById(data?.[lang] || []);
    const merged = base.map(item => {
      const ov = overrides.get(String(item.id));

      const next = { ...item };
      if (ov) {

        for (const k of Object.keys(ov)) {
          if (k === 'areas' || k === 'positions') continue;
          next[k] = deepMerge(next[k], ov[k]);
        }
        if (Array.isArray(ov.positions)) next.positions = ov.positions;
        if (Array.isArray(ov.areas)) next.areas = ov.areas;
      }
      return next;
    });

    results[lang] = merged;
  }


  await Promise.all(
    Object.entries(results).map(([lang, arr]) =>
      writeJson(OUT_PATH('work', lang), arr)
    )
  );
}

async function buildSkills() {
  const src = join(CONTENT_DIR, 'skills.json');
  const { base = [], data = {} } = await readJson(src);

  const results = {};
  for (const lang of SUPPORTED_LANGS) {
    const ovMap = mapById(data?.[lang] || []);
    const merged = base.map(group => {
      const ov = ovMap.get(String(group.id));
      if (!ov) return group;

      const copy = { ...group };

      for (const k of Object.keys(ov)) {
        if (k === 'skills') continue;
        copy[k] = deepMerge(copy[k], ov[k]);
      }

      if (Array.isArray(ov.skills)) {
        copy.skills = mergeSkillsArray(copy.skills, ov.skills);
      }
      return copy;
    });

    results[lang] = merged;
  }

  await Promise.all(
    Object.entries(results).map(([lang, arr]) =>
      writeJson(OUT_PATH('skills', lang), arr)
    )
  );
}

async function buildAreas() {
  const src = join(CONTENT_DIR, 'areas.json');
  const { base = [], data = {} } = await readJson(src);

  if (data && data.du && !data.de) {
    data.de = data.du;
    delete data.du;
  }

  const results = {};
  for (const lang of SUPPORTED_LANGS) {
    const loc = Array.isArray(data?.[lang]) ? data[lang] : [];
    const merged = base.map((item, i) => {
      const ov = loc[i];
      if (!ov) return item;

      const next = { ...item, ...ov };
      return next;
    });
    results[lang] = merged;
  }

  await Promise.all(
    Object.entries(results).map(([lang, arr]) =>
      writeJson(OUT_PATH('areas', lang), arr)
    )
  );
}

async function run() {
  await buildWork();
  await buildSkills();
  await buildAreas();
  console.log(
    `[build-about] OK: work|skills|areas → ${OUT_ROOT} (langs: ${SUPPORTED_LANGS.join(', ')})`
  );
}

run().catch(e => {
  console.error('[build-about] FAILED', e);
  process.exit(1);
});