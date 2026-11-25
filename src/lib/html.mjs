// Utilidades de render. Cada página se genera dos veces (inglés y español) a partir del mismo
// archivo: `t('English', 'Español')` devuelve el texto del idioma que se está generando.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../content/site.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const IMAGES = JSON.parse(fs.readFileSync(path.join(here, '../content/images.json'), 'utf8'));

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

export const homePath = (lang) => (lang === 'es' ? 'es/' : '');
export const casePath = (lang, slug) => (lang === 'es' ? `es/proyectos/${slug}/` : `work/${slug}/`);

export function makeCtx(lang, pagePath) {
  const depth = pagePath.split('/').filter(Boolean).length;
  const root = depth ? '../'.repeat(depth) : './';
  const t = (en, es) => {
    const v = lang === 'es' ? es : en;
    if (v === undefined) throw new Error(`Falta la traducción (${lang}) de: ${en}`);
    return v;
  };
  return {
    lang,
    t,
    root,
    pagePath,
    home: (hash = '') => `${root}${homePath(lang)}${hash}`,
    caseUrl: (slug, hash = '') => `${root}${casePath(lang, slug)}${hash}`,
    abs: (p) => SITE.origin + SITE.base + p
  };
}

// <picture> con AVIF y WebP. `sizes` es obligatorio: evita bajar una imagen más grande que la necesaria.
export function picture(ctx, name, { alt = '', sizes, cls = '', eager = false, style = '' } = {}) {
  const im = IMAGES[name];
  if (!im) throw new Error(`Imagen inexistente: ${name}`);
  if (!sizes) throw new Error(`Falta sizes en ${name}`);
  const p = `${ctx.root}assets/img/${name}`;
  const set = (ext) => im.widths.map((w) => `${p}-${w}.${ext} ${w}w`).join(', ');
  const mid = im.widths[Math.min(1, im.widths.length - 1)];
  const load = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<picture${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"/><img src="${p}-${mid}.webp" srcset="${set('webp')}" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(alt)}" ${load}/></picture>`;
}

export const largest = (ctx, name) => `${ctx.root}assets/img/${name}-${IMAGES[name].widths.at(-1)}.webp`;

// Captura con epígrafe. Se puede ampliar: sin JavaScript, el enlace abre la imagen grande.
export function figure(ctx, name, { title, text = '', alt, cls = '', sizes = '(min-width: 1100px) 900px, 92vw' }) {
  const label = ctx.t('Enlarge', 'Ampliar');
  return `<figure class="fig ${cls}">
  <a class="fig-zoom" href="${largest(ctx, name)}" data-zoom aria-label="${esc(`${label}: ${plain(title)}`)}">${picture(ctx, name, { alt, sizes })}</a>
  <figcaption><b>${title}</b>${text ? ` <span>${text}</span>` : ''}</figcaption>
</figure>`;
}

// Fila de pantallas de teléfono. Se puede recorrer con teclado cuando no entra en el ancho.
export function phones(ctx, label, items) {
  const li = items.map((i) => `<li><figure>${picture(ctx, i.img, { alt: i.alt, sizes: '(min-width: 1100px) 200px, 58vw', cls: 'ph' })}<figcaption><b>${i.title}</b> <span>${i.text}</span></figcaption></figure></li>`);
  return `<div class="phones" role="region" aria-label="${esc(label)}" tabindex="0"><ol style="--n:${items.length}">${li.join('')}</ol></div>`;
}

const PATHS = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M7 17 17 7M8 7h9v9"/>',
  down: '<path d="M12 4v13M6 12l6 6 6-6M5 21h14"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>'
};
export const icon = (name) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;

// Enlace externo: avisa que abre otra pestaña, también a lectores de pantalla.
export const ext = (ctx, href, label, cls = '') =>
  `<a${cls ? ` class="${cls}"` : ''} href="${href}" target="_blank" rel="noopener">${label}${icon('up')}<span class="vh"> (${ctx.t('opens in a new tab', 'se abre en otra pestaña')})</span></a>`;

export const ul = (items, cls = 'list') => `<ul class="${cls}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
export const dl = (rows, cls = '') => `<dl${cls ? ` class="${cls}"` : ''}>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

export function table(ctx, { caption, head, rows, cls = '' }) {
  const th = head.map((h) => `<th scope="col">${h}</th>`).join('');
  const tr = rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('');
  return `<div class="tbl-x" role="region" aria-label="${esc(plain(caption))}" tabindex="0"><table class="tbl ${cls}"><caption class="vh">${caption}</caption><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

// Evidencia, supuesto y pendiente: separa lo que se sabe de lo que todavía es hipótesis.
export function evidence(ctx, { known, assumed, open }) {
  const c = (k, title, note, items) => `<div class="ev ev-${k}"><h3>${title}</h3><p class="ev-n">${note}</p>${ul(items)}</div>`;
  return `<div class="evs">${c('a', ctx.t('Evidence', 'Evidencia'), ctx.t('What was known', 'Lo que se sabía'), known)}${c('b', ctx.t('Assumptions', 'Supuestos'), ctx.t('What was designed as a hypothesis', 'Lo que se diseñó como hipótesis'), assumed)}${c('c', ctx.t('Still open', 'Pendiente'), ctx.t('What real use has to confirm', 'Lo que falta confirmar con uso real'), open)}</div>`;
}

export function decisions(ctx, rows) {
  const l = { p: ctx.t('Problem', 'Problema'), d: ctx.t('Decision', 'Decisión'), c: ctx.t('What it cost', 'Qué costó') };
  const li = rows.map((r) => `<li class="dec"><div class="dec-p"><p class="k">${r.kp || l.p}</p><h3>${r.p}</h3><p>${r.pt}</p></div><div class="dec-d"><p class="k">${r.kd || l.d}</p><h4>${r.d}</h4><p>${r.dt}</p>${r.c ? `<p class="dec-c"><b>${l.c}:</b> ${r.c}</p>` : ''}</div></li>`);
  return `<ol class="decs">${li.join('')}</ol>`;
}

export function swatches(list) {
  return `<ul class="sws">${list.map(([name, hex]) => `<li><i style="background:${hex}"></i><b>${name}</b><code>${hex}</code></li>`).join('')}</ul>`;
}

// Auditoría de contraste con los colores reales del producto.
export function contrast(ctx, rows) {
  return table(ctx, {
    caption: ctx.t('Contrast audit of the product colors', 'Auditoría de contraste de los colores del producto'),
    cls: 'tbl-c',
    head: [ctx.t('Pair', 'Combinación'), ctx.t('Sample', 'Muestra'), ctx.t('Ratio', 'Relación'), ctx.t('Result', 'Resultado')],
    rows: rows.map(([label, fg, bg, ratio, note]) => {
      const r = Number(ratio);
      const ok = r >= 4.5;
      const verdict = ok ? (r >= 7 ? 'AAA' : 'AA') : r >= 3 ? ctx.t('Large text and icons only', 'Sólo texto grande e íconos') : ctx.t('Not for text', 'No apto para texto');
      const shown = ctx.lang === 'es' ? ratio.replace('.', ',') : ratio;
      return [label, `<svg class="cs" viewBox="0 0 52 34" width="52" height="34" aria-hidden="true" focusable="false"><rect width="52" height="34" fill="${bg}"/><text x="26" y="23" text-anchor="middle" fill="${fg}">Aa</text></svg>`, `${shown}:1`, `<span class="${ok ? 'ok' : 'warn'}">${verdict}</span>${note ? ` <span class="nt">${note}</span>` : ''}`];
    })
  });
}

export function metrics(items) {
  return `<ul class="mets">${items.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul>`;
}
