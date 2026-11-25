// Control de calidad del sitio generado. Sin dependencias: `npm test`.
// Falla si hay enlaces rotos, imágenes sin alternativa, idiomas sin par o metadatos incompletos.
import fs from 'node:fs';
import path from 'node:path';
import { build, ROOT, CASES, LANGS } from './build.mjs';
import { SITE } from '../src/content/site.mjs';
import { casePath, homePath } from '../src/lib/html.mjs';

const errors = [];
const fail = (page, msg) => errors.push(`${page || '/'}: ${msg}`);

// 1. Lo versionado tiene que ser lo que genera el código.
const pagesList = [...LANGS.map(homePath), ...LANGS.flatMap((l) => CASES.map((c) => casePath(l, c.slug)))].map((p) => p + 'index.html');
const tracked = [...pagesList, '404.html', 'assets/css/site.css', 'assets/css/concept.css', 'assets/js/site.js'];
const before = Object.fromEntries(tracked.map((p) => [p, fs.existsSync(path.join(ROOT, p)) ? fs.readFileSync(path.join(ROOT, p), 'utf8') : null]));
build();
for (const p of tracked) if (before[p] !== null && before[p].replace(/\r\n/g, '\n') !== fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r\n/g, '\n')) fail(p, 'estaba desactualizado: correr `npm run build` y versionar el resultado');

const html = Object.fromEntries(pagesList.map((p) => [p, fs.readFileSync(path.join(ROOT, p), 'utf8')]));
const ids = (s) => new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

function resolveLocal(page, url) {
  let [clean] = url.split('#');
  [clean] = clean.split('?');
  const base = clean.startsWith(SITE.base) ? path.join(ROOT, clean.slice(SITE.base.length)) : path.join(ROOT, path.dirname(page), clean);
  let f = decodeURI(base);
  if (clean === '') f = path.join(ROOT, page);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  return f;
}

for (const [p, s] of Object.entries(html)) {
  const lang = p.startsWith('es/') ? 'es' : 'en';

  // 2. Metadatos.
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = attr(s.match(/<meta name="description"[^>]*>/)?.[0] || '', 'content') || '';
  if (!title || title.length > 75) fail(p, `title de ${title.length} caracteres`);
  if (desc.length < 70 || desc.length > 185) fail(p, `description de ${desc.length} caracteres`);
  if (!s.includes(`<html lang="${lang}"`)) fail(p, 'lang incorrecto');
  for (const need of ['rel="canonical"', 'property="og:image"', 'hreflang="x-default"', 'application/ld+json', 'name="viewport"']) if (!s.includes(need)) fail(p, `falta ${need}`);
  const og = attr(s.match(/<meta property="og:image"[^>]*>/)[0], 'content').replace(SITE.origin + SITE.base, '');
  if (!fs.existsSync(path.join(ROOT, og))) fail(p, `no existe ${og}`);
  JSON.parse(s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

  // 3. hreflang recíproco.
  for (const l of LANGS) {
    const href = attr(s.match(new RegExp(`<link rel="alternate" hreflang="${l}"[^>]*>`))[0], 'href');
    const other = href.replace(SITE.origin + SITE.base, '') + 'index.html';
    if (!html[other]) fail(p, `hreflang ${l} apunta a ${other}`);
  }

  // 4. Encabezados: un h1 y sin saltos.
  const hs = [...s.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  if (hs.filter((h) => h === 1).length !== 1) fail(p, 'tiene que haber un solo h1');
  hs.forEach((h, i) => i && h - hs[i - 1] > 1 && fail(p, `salto de h${hs[i - 1]} a h${h}`));

  // 5. Imágenes.
  for (const [tag] of s.matchAll(/<img\b[^>]*>/g)) {
    if (attr(tag, 'alt') === undefined) fail(p, `img sin alt: ${tag.slice(0, 80)}`);
    if (!attr(tag, 'width') || !attr(tag, 'height')) fail(p, `img sin dimensiones: ${tag.slice(0, 80)}`);
  }
  for (const [tag] of s.matchAll(/<(?:img|source)\b[^>]*>/g)) {
    const all = [attr(tag, 'src'), ...(attr(tag, 'srcset') || '').split(',').map((x) => x.trim().split(' ')[0])].filter(Boolean);
    for (const u of all) if (!fs.existsSync(resolveLocal(p, u))) fail(p, `imagen inexistente ${u}`);
  }

  // 6. Enlaces internos y anclas.
  const own = ids(s);
  const dup = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]).filter((x, i, a) => a.indexOf(x) !== i);
  if (dup.length) fail(p, `ids repetidos: ${dup.join(', ')}`);
  for (const [tag] of s.matchAll(/<(?:a|link)\b[^>]*>/g)) {
    const href = attr(tag, 'href');
    if (!href) {
      fail(p, `enlace sin href: ${tag.slice(0, 80)}`);
      continue;
    }
    if (/^(https?:|mailto:|data:)/.test(href)) {
      if (/target="_blank"/.test(tag) && !/rel="noopener"/.test(tag)) fail(p, `falta rel=noopener en ${href}`);
      continue;
    }
    const hash = href.split('#')[1];
    const f = resolveLocal(p, href);
    if (!fs.existsSync(f)) {
      fail(p, `enlace roto ${href}`);
      continue;
    }
    if (hash && f.endsWith('.html')) {
      const target = f === path.join(ROOT, p) ? own : ids(fs.readFileSync(f, 'utf8'));
      if (!target.has(hash)) fail(p, `ancla inexistente ${href}`);
    }
  }
  for (const m of s.matchAll(/aria-(?:labelledby|describedby)="([^"]+)"/g)) for (const id of m[1].split(' ')) if (!own.has(id)) fail(p, `referencia aria inexistente #${id}`);

  // 7. Textos.
  const bad = s.match(/>\s*undefined|="[^"]*undefined|\[object |\bNaN\b|\bTODO\b|[Ll]orem ipsum/);
  if (bad) fail(p, `texto sin completar: ${bad[0].slice(0, 60)}`);
  if (/data-lang="(?:es|en)">[A-ZÁ-Ú]/.test(s.replace(/<a [^>]*data-lang[^>]*>/g, ''))) fail(p, 'quedó texto bilingüe sin separar');
}

// 8. Las dos versiones de cada página tienen la misma estructura.
for (const c of CASES) {
  const [a, b] = LANGS.map((l) => html[casePath(l, c.slug) + 'index.html']);
  for (const re of [/<section class="cs"/g, /<figure/g, /<table/g, /<h3/g, /<li/g]) if ((a.match(re) || []).length !== (b.match(re) || []).length) fail(c.slug, `distinta cantidad de ${re.source} entre idiomas: ${(a.match(re) || []).length} y ${(b.match(re) || []).length}`);
}

// 9. El CV corresponde al idioma.
for (const l of LANGS) {
  const s = html[homePath(l) + 'index.html'];
  if (!fs.existsSync(path.join(ROOT, SITE.cv[l].file))) fail(l, 'falta el CV');
  const hero = s.slice(s.indexOf('class="hero"'), s.indexOf('id="work"'));
  if (!hero.includes(SITE.cv[l].file)) fail(l, 'el CV del inicio no es el del idioma');
}

// 10. Redirecciones y prototipos.
for (const f of fs.readdirSync(path.join(ROOT, 'casos')).filter((x) => x.endsWith('.html'))) {
  const s = fs.readFileSync(path.join(ROOT, 'casos', f), 'utf8');
  const to = (s.match(/url=([^"]+)"/) || [])[1];
  if (!to || !fs.existsSync(path.join(ROOT, 'casos', to, 'index.html'))) fail(`casos/${f}`, 'redirección rota');
}
for (const f of fs.readdirSync(path.join(ROOT, 'casos/prototipos')).filter((x) => x.endsWith('.html'))) {
  const s = fs.readFileSync(path.join(ROOT, 'casos/prototipos', f), 'utf8');
  for (const m of s.matchAll(/(?:href|src|data-href-en|data-href-es)="(?!https?:|#|data:)([^"]+)"/g)) {
    const [clean, hash] = m[1].split('#');
    let t = path.join(ROOT, 'casos/prototipos', clean);
    if (fs.existsSync(t) && fs.statSync(t).isDirectory()) t = path.join(t, 'index.html');
    if (!fs.existsSync(t)) fail(`prototipos/${f}`, `roto ${m[1]}`);
    else if (hash && !ids(fs.readFileSync(t, 'utf8')).has(hash)) fail(`prototipos/${f}`, `ancla ${m[1]}`);
  }
}

if (errors.length) {
  console.error(`${errors.length} problemas:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Sin problemas: ${pagesList.length} páginas, ${LANGS.length} idiomas.`);
