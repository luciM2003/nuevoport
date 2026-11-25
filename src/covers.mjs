// Portadas: interfaces reales sobre un campo de color del propio producto.
// Cada capa se ubica en unidades de ancho de contenedor (cqw), así la composición
// escala igual en la home, en el caso y en la imagen para compartir.
import { picture } from './lib/html.mjs';

// [imagen, tipo, x, y, ancho, x móvil, y móvil, ancho móvil]
const COVERS = {
  'modo-ya': {
    bg: '#f5c518',
    layers: [
      ['modoya-home', 'ph', 5.5, 8.5, 19.5, 5, 10, 42],
      ['modoya-cart', 'ph', 29, 13, 19.5, 0, 0, 0],
      ['modoya-pay', 'ph', 52, 6, 19.5, 0, 0, 0],
      ['modoya-track', 'ph', 75, 11, 19.5, 53, 22, 42]
    ]
  },
  ucobot: {
    bg: '#1c1c28',
    layers: [
      ['uco-dashboard', 'sc', 24, 8.5, 94, 42, 24, 150],
      ['uco-order', 'ph', 6, 14, 22, 6, 14, 44]
    ]
  },
  'byd-quality-portal': {
    bg: '#2166ab',
    layers: [
      ['byd-overview', 'sc', 6, 8.5, 90, 8, 16, 150],
      ['byd-m-early-detection', 'ph', 71, 15, 23, 48, 44, 44]
    ]
  },
  'padel-hub': {
    bg: '#d4f84a',
    layers: [
      ['padel-timeline', 'sc', 33, 8.5, 92, 30, 20, 150],
      ['padel-m-home', 'ph', 5, 13, 22, 6, 12, 40],
      ['padel-m-slots', 'ph', 30, 18, 22, 52, 46, 40]
    ]
  },
  turno: {
    bg: '#dfe9fb',
    layers: [
      ['turno-home', 'ph', 8, 8, 25, 8, 12, 40],
      ['turno-slot', 'ph', 37.5, 14, 25, 53, 24, 40],
      ['turno-done', 'ph', 67, 6, 25, 0, 0, 0]
    ]
  },
  'ruta-del-vino': {
    bg: '#f3dfe3',
    layers: [
      ['vino-home', 'ph', 8, 14, 25, 8, 12, 40],
      ['vino-winery', 'ph', 37.5, 6, 25, 53, 24, 40],
      ['vino-route', 'ph', 67, 12, 25, 0, 0, 0]
    ]
  },
  alcancia: {
    bg: '#e4e1fa',
    layers: [
      ['alcancia-home', 'ph', 8, 8, 25, 8, 12, 40],
      ['alcancia-goal', 'ph', 37.5, 14, 25, 53, 24, 40],
      ['alcancia-budget', 'ph', 67, 6, 25, 0, 0, 0]
    ]
  }
};

export const coverBg = (slug) => COVERS[slug].bg;

// `alt` describe la portada completa; las capas sueltas van como decorativas.
export function cover(ctx, slug, { alt, eager = false, cls = '', vt = true, scale = 1 }) {
  const c = COVERS[slug];
  const layers = c.layers.map(([img, kind, x, y, w, mx, my, mw], i) => {
    const px = Math.round(1312 * scale * (w / 100));
    const sizes = `(min-width: 1400px) ${px}px, (min-width: 701px) ${Math.ceil(w * scale)}vw, ${mw || 1}vw`;
    return picture(ctx, img, {
      sizes,
      eager: eager && i < 2,
      cls: `l ${kind}${mw === 0 ? ' no-m' : ''}`,
      style: `--x:${x};--y:${y};--w:${w};--mx:${mx};--my:${my};--mw:${mw};--i:${i}`
    });
  });
  const a11y = alt ? `role="img" aria-label="${alt.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  return `<div class="cover ${cls}" ${a11y} style="background:${c.bg}${vt ? `;view-transition-name:cover-${slug}` : ''}">${layers.join('')}</div>`;
}
