// Diagramas hechos con listas y grillas: se leen en orden con lector de pantalla,
// se traducen con el resto del texto y en el celular se apilan.
import { esc, icon } from './html.mjs';

// Columnas unidas por flechas. cols: [{ h, items: [{ b, s, tone }] }]
export function flow(ctx, label, cols, { cls = '' } = {}) {
  const li = cols.map((c) => {
    const items = c.items.map((i) => `<div class="fl-b${i.tone ? ` fl-${i.tone}` : ''}"><b>${i.b}</b>${i.s ? `<span>${i.s}</span>` : ''}</div>`).join('');
    return `<li class="fl-c">${c.h ? `<p class="fl-h">${c.h}</p>` : ''}<div class="fl-i">${items}</div></li>`;
  });
  return `<div class="fl ${cls}" style="--n:${cols.length}"><ol aria-label="${esc(label)}">${li.join(`<li class="fl-a" aria-hidden="true">${icon('arrow')}</li>`)}</ol></div>`;
}

// Carriles por rol. steps: [{ lane, col, span, n, b, s, tone }]
export function lanes(ctx, label, names, cols, steps) {
  const heads = names.map((n, i) => `<div class="ln-h" aria-hidden="true" style="--r:${i + 1}">${n}</div>`).join('');
  const li = steps.map((s) => `<li class="ln-s${s.tone ? ` ln-${s.tone}` : ''}" style="--r:${s.lane + 1};--c:${s.col};--sp:${s.span || 1}">${s.n ? `<i>${s.n}</i>` : ''}<span class="ln-w">${names[s.lane]}</span><b>${s.b}</b>${s.s ? `<span class="ln-t">${s.s}</span>` : ''}</li>`).join('');
  return `<div class="ln" style="--rows:${names.length};--cols:${cols}">${heads}<ol aria-label="${esc(label)}">${li}</ol></div>`;
}
