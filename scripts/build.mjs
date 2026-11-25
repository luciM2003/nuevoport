// Genera el sitio estático en la raíz del repositorio, que es lo que publica GitHub Pages.
// Sin dependencias: `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE } from '../src/content/site.mjs';
import { makeCtx, homePath, casePath } from '../src/lib/html.mjs';
import { homePage } from '../src/pages/home.mjs';
import { casePage } from '../src/pages/case.mjs';
import { page } from '../src/pages/layout.mjs';
import modoya from '../src/cases/modo-ya.mjs';
import ucobot from '../src/cases/ucobot.mjs';
import byd from '../src/cases/byd-quality-portal.mjs';
import padel from '../src/cases/padel-hub.mjs';
import { turno, rutaDelVino, alcancia, conceptId } from '../src/cases/concepts.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CASES = [modoya, ucobot, byd, padel, turno, rutaDelVino, alcancia];
export const LANGS = ['en', 'es'];

// Direcciones del sitio anterior que pueden estar compartidas.
const OLD = {
  'casos/modo-ya.html': 'modo-ya',
  'casos/byd-calidad.html': 'byd-quality-portal',
  'casos/padel-hub.html': 'padel-hub',
  'casos/turno.html': 'turno',
  'casos/ruta-del-vino.html': 'ruta-del-vino',
  'casos/alcancia.html': 'alcancia'
};

// Git en Windows entrega las fuentes con CRLF: se normalizan para que el resultado sea el mismo en cualquier equipo.
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r\n/g, '\n');
const write = (p, s) => {
  const f = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s.replace(/\r\n/g, '\n'));
};
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);

const minCss = (s) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/ ?([{};,]) ?/g, '$1')
    .replace(/;}/g, '}')
    .replace(/: /g, ':')
    .trim();
const minJs = (s) =>
  s
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/^\s+/gm, '')
    .replace(/\n{2,}/g, '\n')
    .trim() + '\n';

export function build() {
  const css = minCss(read('src/styles/site.css'));
  const concept = minCss(read('src/styles/concept.css'));
  const js = minJs(read('src/client/site.js'));
  write('assets/css/site.css', css);
  write('assets/css/concept.css', concept);
  write('assets/js/site.js', js);
  const versions = { css: hash(css), concept: hash(concept), js: hash(js) };
  const urls = [];

  for (const lang of LANGS) {
    const p = homePath(lang);
    write(`${p}index.html`, homePage(makeCtx(lang, p), versions));
    CASES.forEach((c, i) => {
      const cp = casePath(lang, c.slug);
      write(`${cp}index.html`, casePage(makeCtx(lang, cp), c, CASES[(i + 1) % CASES.length], versions));
    });
  }
  urls.push({ en: homePath('en'), es: homePath('es') });
  CASES.forEach((c) => urls.push({ en: casePath('en', c.slug), es: casePath('es', c.slug) }));

  // 404: GitHub Pages lo sirve desde cualquier ruta, por eso usa rutas absolutas.
  const nf = page(makeCtx('en', ''), {
    title: 'Page not found | Lucía Miranda',
    description: 'This page doesn’t exist or has moved.',
    paths: { en: '', es: 'es/' },
    og: 'home',
    versions,
    cls: 'p-404',
    body: `<section class="nf"><div class="wrap"><h1>This page isn’t here.</h1><p>It may have moved with the redesign. The work, the résumé and the contact details are one step away.</p><p lang="es">Esta página no existe o cambió de lugar.</p><p><a class="btn" href="./">Go to the home page</a> <a class="btn btn-o" href="./es/" lang="es" hreflang="es">Ir al inicio</a></p></div></section>`
  })
    .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex"/>')
    .replace(/<link rel="canonical"[^>]*>\n?/, '')
    .replace(/<link rel="alternate"[^>]*>\n?/g, '')
    .replace(/(href|src|data-alt)="\.\/([^"]*)"/g, (a, k, r) => `${k}="${SITE.base}${r}"`)
    .replace(/<script>\(function\(\)\{var d[\s\S]*?<\/script>/, '');
  write('404.html', nf);

  // Redirecciones desde las direcciones anteriores, conservando el idioma y la sección.
  for (const [old, slug] of Object.entries(OLD)) {
    const en = `../${casePath('en', slug)}`;
    const es = `../${casePath('es', slug)}`;
    const name = CASES.find((c) => c.slug === slug).name.en;
    const ids = JSON.stringify(Object.fromEntries(['contexto', 'investigacion', 'definicion', 'arquitectura', 'wireframes', 'decisiones', 'sistema', 'ui', 'validacion', 'aprendizajes'].map((i) => [i, conceptId('en', i)])));
    write(
      old,
      `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${name} | Lucía Miranda</title>
<meta name="robots" content="noindex"/><link rel="canonical" href="${SITE.origin}${SITE.base}${casePath('en', slug)}"/>
<script>(function(){var q=new URLSearchParams(location.search).get('lang'),p=null;try{p=localStorage.getItem('lm-lang')||localStorage.getItem('language')}catch(e){}var es=(q||p||(navigator.language||'').slice(0,2))==='es',h=location.hash.slice(1),m=${ids};location.replace((es?'${es}':'${en}')+(h?'#'+(es?h:(m[h]||h)):''))})()</script>
<meta http-equiv="refresh" content="0; url=${en}"/></head>
<body><p><a href="${en}">${name}</a></p></body></html>
`
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const loc = (p) => SITE.origin + SITE.base + p;
  write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .flatMap((u) => LANGS.map((l) => `<url><loc>${loc(u[l])}</loc><lastmod>${today}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${loc(u.en)}"/><xhtml:link rel="alternate" hreflang="es" href="${loc(u.es)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${loc(u.en)}"/></url>`))
  .join('\n')}
</urlset>
`
  );
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: ${SITE.base}src/\nDisallow: ${SITE.base}scripts/\n\nSitemap: ${SITE.origin}${SITE.base}sitemap.xml\n`);
  write('site.webmanifest', JSON.stringify({ name: 'Lucía Miranda', short_name: 'Lucía Miranda', start_url: SITE.base, scope: SITE.base, display: 'browser', background_color: '#f3f4f1', theme_color: '#f3f4f1', icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2) + '\n');
  // Sin Jekyll: GitHub Pages publica los archivos tal cual.
  write('.nojekyll', '');
  return { pages: urls.length * 2, versions };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = build();
  console.log(`${r.pages} páginas generadas en ${LANGS.length} idiomas.`);
}
