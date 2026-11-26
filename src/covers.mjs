// Portadas: interfaces reales dentro de dispositivos, sobre una escena con el color del producto.
// Cada capa se ubica en unidades de ancho de contenedor (cqw), así la composición
// escala igual en la home, en el caso y en la imagen para compartir.
import { icon } from './lib/html.mjs';
import { DEVICES } from './lib/device.mjs';

// [dispositivo, cuadros, x, y, ancho, x móvil, y móvil, ancho móvil, opciones]
// Los cuadros dicen en qué pasos se ven: f('imagen', 0, 1). Sin pasos, se ve siempre.
const f = (img, ...on) => ({ img, on });
const L = (base) => (ctx) => `${base}-${ctx.lang}`;

// Fondos dibujados: calles para el delivery, líneas de cancha, piso de salón.
const DECO = {
  streets: '<svg class="deco" viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#b98600" stroke-opacity=".2"><path d="M-20 96h1040M-20 190h1040M-20 372h1040M96-20v520M214-20v520M452-20v520M566-20v520M792-20v520M906-20v520" stroke-width="7"/><path d="M-20 280 1020 246M330-20l14 520M676-20l-8 520" stroke-width="15"/></g><path d="M344 372V262l328-12V96h234" fill="none" stroke="#0d0e10" stroke-opacity=".26" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=".1 13"/></svg>',
  court: '<svg class="deco" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="7" stroke-opacity=".75"><path d="M150-30 20 600M850-30 980 600M110 168h780M500 168v260M62 428h876"/></g><path d="M120-20h760l-12 60H132z" fill="#fff" fill-opacity=".16"/></svg>',
  floor: '<i class="deco deco-fl"></i>',
  glow: '<i class="deco deco-gl"></i>',
  soft: '<svg class="deco" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><circle cx="330" cy="90" r="170" fill="#fff" fill-opacity=".5"/><circle cx="40" cy="420" r="150" fill="#fff" fill-opacity=".38"/></svg>'
};

const COVERS = {
  'modo-ya': {
    bg: 'radial-gradient(80% 120% at 22% 0,#ffe07a 0,#f7c81c 46%,#e6ac00 100%)',
    solid: '#f5c518',
    deco: 'streets',
    ms: 3000,
    steps: [
      { en: 'The customer confirms the order', es: 'El cliente confirma el pedido' },
      { en: 'The restaurant prepares it', es: 'El local lo prepara' },
      { en: 'A rider picks it up', es: 'Un rider lo retira' },
      { en: 'Everyone follows the delivery', es: 'Todos siguen el envío' },
      { en: 'A 4-digit code closes it', es: 'Un código de 4 dígitos lo cierra' }
    ],
    layers: [
      ['lt', ['modoya-a-live'], 25, 4.6, 50, 17, 8, 116, { tag: ['Admin', 'Administración'], on: [3] }],
      ['tb', [f('modoya-l-kitchen', 0, 1), f('modoya-l-ready', 2), f('modoya-l-sent', 3, 4)], 36.6, 25, 26.8, 24, 62, 70, { tag: ['Restaurant', 'Local'], on: [1] }],
      ['ph', [f('modoya-c-cart', 0), f('modoya-c-kitchen', 1, 2), f('modoya-c-way', 3), f('modoya-c-done', 4)], 9.5, 8.2, 15.2, 5, 30, 41, { tag: ['Customer', 'Cliente'], on: [0, 3] }],
      ['ph', [f('modoya-r-home', 0, 1), f('modoya-r-pickup', 2), f('modoya-r-way', 3), f('modoya-r-done', 4)], 75.6, 8.2, 15.2, 54, 20, 41, { tag: ['Rider', 'Rider'], on: [2, 4] }]
    ]
  },
  ucobot: {
    bg: 'radial-gradient(90% 120% at 84% 0,#3a3a52 0,#22222f 44%,#14141c 100%)',
    solid: '#1c1c28',
    deco: 'glow',
    ms: 3400,
    steps: [
      { en: 'Every chat, one inbox', es: 'Todos los chats, una bandeja' },
      { en: 'A chat becomes an order', es: 'Un chat pasa a ser un pedido' },
      { en: 'The team sees it in the panel', es: 'El equipo lo ve en el panel' }
    ],
    layers: [
      ['lt', [f('uco-dashboard', 0), f('uco-bookings', 1), f('uco-pos', 2)], 25, 7, 68, 30, 34, 128],
      ['ph', [f('uco-inbox', 0), f('uco-order', 1, 2)], 8.5, 11, 18.8, 8, 14, 46]
    ]
  },
  'byd-quality-portal': {
    bg: 'radial-gradient(90% 130% at 20% 0,#6db3ee 0,#2a72bb 42%,#174b83 100%)',
    solid: '#2166ab',
    deco: 'floor',
    ms: 3400,
    steps: [
      { en: 'One overview, one set of filters', es: 'Un resumen, los mismos filtros' },
      { en: 'Unhappy customers first', es: 'Primero, quien quedó disconforme' },
      { en: 'Audits with their detail', es: 'Auditorías con su detalle' }
    ],
    layers: [
      ['lt', [f('byd-overview', 0), f('byd-early-detection', 1), f('byd-audits', 2)], 8, 6.4, 70, 8, 22, 124],
      ['ph', [f('byd-m-overview', 0), f('byd-m-early-detection', 1, 2)], 74.5, 12.5, 18.6, 47, 44, 44]
    ]
  },
  'padel-hub': {
    bg: 'linear-gradient(160deg,#e6ff7a 0,#d0f53f 46%,#a9d40f 100%)',
    solid: '#d4f84a',
    deco: 'court',
    ms: 3000,
    steps: [
      { en: 'Pick a place', es: 'Elegir dónde' },
      { en: 'Pick a time', es: 'Elegir horario' },
      { en: 'Pay the deposit', es: 'Pagar la seña' },
      { en: 'Booked', es: 'Reservado' }
    ],
    layers: [
      ['lt', [f('padel-timeline', 0, 1), f('padel-cash', 2), f('padel-dashboard', 3)], 30, 6.2, 63, 22, 30, 128],
      ['ph', [f('padel-m-home', 0), f('padel-m-slots', 1), f('padel-m-summary', 2), f('padel-m-bookings', 3)], 10, 9.5, 19.4, 8, 14, 46]
    ]
  },
  turno: {
    bg: 'linear-gradient(165deg,#eaf1ff 0,#cfe0ff 52%,#a9c8ff 100%)',
    solid: '#dfe9fb',
    deco: 'soft',
    ms: 2200,
    steps: [{ en: 'Home', es: 'Inicio' }, { en: 'Who with', es: 'Con quién' }, { en: 'Day and time', es: 'Día y horario' }, { en: 'Booked', es: 'Reservado' }],
    layers: [
      ['ph', [L('turno-home'), [L('turno-doctor'), 1], [L('turno-slot'), 2], [L('turno-done'), 3]], 36, 5.4, 28, 24, 9, 52],
      ['ph', [L('turno-review')], 7.5, 12, 23, 0, 0, 0, { back: true }],
      ['ph', [L('turno-slot')], 69.5, 12, 23, 0, 0, 0, { back: true }]
    ]
  },
  'ruta-del-vino': {
    bg: "linear-gradient(180deg,rgba(60,14,28,.1) 0,rgba(60,14,28,.46) 100%),image-set(url('FOTO/atardecer.avif') type('image/avif'),url('FOTO/atardecer.webp') type('image/webp')) center/cover",
    solid: '#f3dfe3',
    ms: 2400,
    steps: [{ en: 'Discover', es: 'Descubrir' }, { en: 'Choose', es: 'Elegir' }, { en: 'Plan the route', es: 'Armar el recorrido' }, { en: 'Voucher', es: 'Voucher' }],
    layers: [
      ['ph', [L('vino-home'), [L('vino-winery'), 1], [L('vino-route'), 2], [L('vino-voucher'), 3]], 36, 5.4, 28, 24, 9, 52],
      ['ph', [L('vino-winery')], 7.5, 12, 23, 0, 0, 0, { back: true }],
      ['ph', [L('vino-route')], 69.5, 12, 23, 0, 0, 0, { back: true }]
    ]
  },
  alcancia: {
    bg: 'linear-gradient(165deg,#f1efff 0,#d9d4fb 50%,#b4abf3 100%)',
    solid: '#e4e1fa',
    deco: 'soft',
    ms: 2400,
    steps: [{ en: 'One clear number', es: 'Un número claro' }, { en: 'Log in seconds', es: 'Cargar en segundos' }, { en: 'Budget', es: 'Presupuesto' }, { en: 'Goal', es: 'Meta' }],
    layers: [
      ['ph', [L('alcancia-home'), [L('alcancia-log'), 1], [L('alcancia-budget'), 2], [L('alcancia-goal'), 3]], 36, 5.4, 28, 24, 9, 52],
      ['ph', [L('alcancia-budget')], 7.5, 12, 23, 0, 0, 0, { back: true }],
      ['ph', [L('alcancia-goal')], 69.5, 12, 23, 0, 0, 0, { back: true }]
    ]
  }
};

export const coverBg = (slug) => COVERS[slug].solid;

const img = (ctx, x) => (typeof x === 'function' ? x(ctx) : x);
const toFrames = (ctx, list) =>
  list.map((x, i) => {
    if (Array.isArray(x)) return { img: img(ctx, x[0]), on: x.slice(1) };
    if (typeof x === 'object') return x;
    const r = { img: img(ctx, x) };
    return list.length > 1 && i === 0 ? { ...r, on: [0] } : r;
  });

// `alt` describe la portada completa; las capas sueltas van como decorativas.
// tall: versión vertical para las tarjetas de conceptos. play: se anima cuando está a la vista.
export function cover(ctx, slug, { alt, eager = false, cls = '', vt = true, scale = 1, play = false, tall = false }) {
  const c = COVERS[slug];
  const layers = c.layers
    .filter((l) => !(tall && (l[8] || {}).back))
    .map(([kind, list, x, y, w, mx, my, mw, o = {}], i) => {
      const px = Math.round(1312 * scale * (w / 100));
      const sizes = tall ? '(min-width: 900px) 230px, 46vw' : `(min-width: 1400px) ${px}px, (min-width: 701px) ${Math.ceil(w * scale)}vw, ${mw || 1}vw`;
      const tag = o.tag ? `<span class="dv-tag">${ctx.t(...o.tag)}</span>` : '';
      const fr = toFrames(ctx, list);
      return `<span class="l${mw === 0 ? ' no-m' : ''}${o.back ? ' l-bk' : ''}"${o.on ? ` data-hot="${o.on.join(' ')}"` : ''} style="--x:${x};--y:${y};--w:${w};--mx:${mx};--my:${my};--mw:${mw};--i:${i}">${DEVICES[kind](ctx, play ? fr : fr.slice(0, 1), { sizes, eager: eager && i < 3 })}${tag}</span>`;
    });
  const a11y = alt ? `role="img" aria-label="${alt.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  const bg = c.bg.replace(/FOTO/g, `${ctx.root}assets/fotos`);
  const data = play ? ` data-play="${c.steps.length}" data-ms="${c.ms}"` : '';
  return `<div class="cover ${tall ? 'cover-t ' : ''}${cls}" ${a11y}${data} style="background:${bg}${vt ? `;view-transition-name:cover-${slug}` : ''}">${c.deco ? DECO[c.deco] : ''}${layers.join('')}</div>`;
}

// Controles de una portada animada: pausa general y los pasos de la historia.
export function coverControls(ctx, slug, { steps = true } = {}) {
  const c = COVERS[slug];
  const list = steps ? `<ol class="stp" aria-hidden="true">${c.steps.map((s, i) => `<li${i === 0 ? ' class="on"' : ''}>${s[ctx.lang]}</li>`).join('')}</ol>` : '';
  return `<div class="cvc">${list}<button type="button" class="pl" data-motion data-l-on="${ctx.t('Pause animations', 'Pausar animaciones')}" data-l-off="${ctx.t('Play animations', 'Reproducir animaciones')}" aria-label="${ctx.t('Pause animations', 'Pausar animaciones')}">${icon('pause')}${icon('play')}</button></div>`;
}
