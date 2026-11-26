// Casos conceptuales. El cuerpo está en concepts/*.html, en los dos idiomas a la vez
// (<span data-lang="es|en">): acá se separa por idioma y se integra a la plantilla de casos.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc } from '../lib/html.mjs';
import { phones } from '../lib/phones.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

// Deja sólo el idioma pedido. Respeta los <span> anidados.
export function onlyLang(html, lang) {
  const open = /<span data-lang="(es|en)">/g;
  let out = '';
  let pos = 0;
  let m;
  while ((m = open.exec(html))) {
    out += html.slice(pos, m.index);
    let depth = 1;
    let i = open.lastIndex;
    const tag = /<span\b[^>]*>|<\/span>/g;
    tag.lastIndex = i;
    let k;
    while (depth && (k = tag.exec(html))) depth += k[0] === '</span>' ? -1 : 1;
    const inner = html.slice(i, k.index);
    if (m[1] === lang) out += inner;
    pos = k.index + k[0].length;
    open.lastIndex = pos;
  }
  return out + html.slice(pos);
}

const IDS_EN = { contexto: 'context', investigacion: 'research', definicion: 'definition', arquitectura: 'architecture', wireframes: 'wireframes', decisiones: 'decisions', sistema: 'design-system', ui: 'final-ui', validacion: 'validation', aprendizajes: 'learnings' };
export const conceptId = (lang, id) => (lang === 'en' ? IDS_EN[id] : id);

const LABELS_EN = {
  'Carga de un gasto con teclado numérico y categoría sugerida': 'Logging an expense with a numeric keypad and a suggested category',
  'Detalle de bodega con experiencias y horarios': 'Winery detail with experiences and time slots',
  'Detalle de la meta de ahorro con progreso y proyección': 'Savings goal detail with progress and projection',
  'Inicio con el disponible del mes, la meta y los movimientos': 'Home with the available amount, the goal and the transactions',
  'Pago del recorrido con resumen y moneda': 'Route payment with summary and currency',
  'Pantalla de inicio con el próximo turno y cuatro accesos': 'Home with the next appointment and four shortcuts',
  'Pantalla de éxito: turno reservado': 'Success screen: appointment booked',
  'Pantalla para descubrir bodegas por zona': 'Screen to discover wineries by area',
  'Paso 1: búsqueda de especialidad y profesionales': 'Step 1: search for a specialty and doctors',
  'Paso 2: calendario de dos semanas y horarios disponibles': 'Step 2: two-week calendar and available times',
  'Paso 3: resumen del turno y recordatorio por WhatsApp': 'Step 3: appointment summary and WhatsApp reminder',
  'Presupuesto del mes por categoría con un consejo': 'Monthly budget by category with a tip',
  'Recorrido del día en una línea de tiempo con traslado': 'Route of the day as a timeline with transport',
  'Resumen del mes con gasto por semana y principales categorías': 'Monthly summary with spending per week and main categories',
  'Voucher del día con código QR disponible sin conexión': 'Day voucher with a QR code available offline',
  'Wireframe de búsqueda de profesional': 'Wireframe: doctor search',
  'Wireframe de carga de gasto': 'Wireframe: logging an expense',
  'Wireframe de confirmación': 'Wireframe: confirmation',
  'Wireframe de explorar bodegas': 'Wireframe: exploring wineries',
  'Wireframe de selección de día y horario': 'Wireframe: choosing day and time',
  'Wireframe del detalle de bodega': 'Wireframe: winery detail',
  'Wireframe del detalle de meta': 'Wireframe: goal detail',
  'Wireframe del inicio': 'Wireframe: home',
  'Wireframe del presupuesto': 'Wireframe: budget',
  'Wireframe del recorrido del día': 'Wireframe: route of the day',
  'Wireframe del voucher': 'Wireframe: voucher'
};

// Evita saltos de nivel (h2 → h4). El estilo viaja en la clase, no en la etiqueta.
function fixHeadings(html, start) {
  let cur = start;
  const stack = [];
  return html.replace(/<(\/?)h([2-6])([^>]*)>/g, (all, close, n, attrs) => {
    if (close) return `</h${stack.pop()}>`;
    const want = Number(n);
    const real = Math.min(want, cur + 1);
    cur = real;
    stack.push(real);
    const a = /class="/.test(attrs) ? attrs.replace(/class="/, `class="as-h${want} `) : `${attrs} class="as-h${want}"`;
    return `<h${real}${a}>`;
  });
}

// Pantallas del prototipo que reemplazan a las dibujadas en la sección de interfaz final.
const FINAL = {
  turno: {
    bg: 'linear-gradient(165deg,#eaf1ff 0,#cfe0ff 52%,#a9c8ff 100%)',
    items: (t) => [
      ['turno-home', t('Home', 'Inicio'), t('Next appointment and check-in, always in view.', 'Próximo turno y check-in, siempre a la vista.'), t('Home with the next appointment and four shortcuts', 'Inicio con el próximo turno y cuatro accesos')],
      ['turno-doctor', t('Step 1, who with', 'Paso 1, con quién'), t('Next slot and coverage without opening the detail.', 'Próximo horario y cobertura sin abrir el detalle.'), t('Step 1: search for a specialty and doctors', 'Paso 1: búsqueda de especialidad y profesionales')],
      ['turno-slot', t('Step 2, day and time', 'Paso 2, día y horario'), t('Days without slots and taken times, dimmed.', 'Días sin turnos y horarios ocupados, atenuados.'), t('Step 2: two-week calendar and available times', 'Paso 2: calendario de dos semanas y horarios disponibles')],
      ['turno-review', t('Step 3, confirmation', 'Paso 3, confirmación'), t('The whole appointment, and how to get there.', 'El turno completo y cómo llegar.'), t('Step 3: appointment summary, map and WhatsApp reminder', 'Paso 3: resumen del turno, mapa y recordatorio por WhatsApp')],
      ['turno-done', t('Booked', 'Reservado'), t('A confirmation you can’t miss.', 'Una confirmación imposible de no ver.'), t('Success screen: appointment booked', 'Pantalla de éxito: turno reservado')]
    ]
  },
  'ruta-del-vino': {
    bg: 'linear-gradient(165deg,#fbeef0 0,#f1d3d9 55%,#dfa9b4 100%)',
    items: (t) => [
      ['vino-home', t('Discover', 'Descubrir'), t('Price and first free slot before opening anything.', 'Precio y primer horario libre antes de abrir nada.'), t('Wineries by area with photo, price and next slot', 'Bodegas por zona con foto, precio y próximo horario')],
      ['vino-winery', t('Choose', 'Elegir'), t('Experience and time on the same screen.', 'Experiencia y horario en la misma pantalla.'), t('Winery detail with experiences and time slots', 'Detalle de bodega con experiencias y horarios')],
      ['vino-route', t('Plan', 'Armar'), t('Stops, travel time and transport on one line.', 'Paradas, tiempo de viaje y traslado en una línea.'), t('Route of the day with map, stops and travel times', 'Recorrido del día con mapa, paradas y tiempos de viaje')],
      ['vino-pay', t('Pay once', 'Pagar una vez'), t('Everything in a single payment.', 'Todo en un solo pago.'), t('Payment with the summary of the day', 'Pago con el resumen del día')],
      ['vino-voucher', t('Go', 'Salir'), t('A voucher that works without signal.', 'Un voucher que funciona sin señal.'), t('Day voucher with a code available offline', 'Voucher del día con un código disponible sin conexión')]
    ]
  },
  alcancia: {
    bg: 'linear-gradient(165deg,#f1efff 0,#d9d4fb 50%,#b4abf3 100%)',
    items: (t) => [
      ['alcancia-home', t('Home', 'Inicio'), t('What is available, how it evolves and the goal.', 'Lo disponible, cómo evoluciona y la meta.'), t('Home with the available amount, its evolution and the goal', 'Inicio con el disponible, su evolución y la meta')],
      ['alcancia-log', t('Log', 'Cargar'), t('Amount first; the category is suggested.', 'Primero el monto; la categoría se sugiere.'), t('Logging an expense with a keypad and a suggested category', 'Carga de un gasto con teclado y categoría sugerida')],
      ['alcancia-nudge', t('Nudge', 'Aviso'), t('It explains the consequence, without scolding.', 'Explica la consecuencia, sin retar.'), t('Notice after going over a category, with a way to make up for it', 'Aviso al pasarse en una categoría, con una forma de compensarlo')],
      ['alcancia-budget', t('Budget', 'Presupuesto'), t('Per category, with its limit in view.', 'Por categoría, con el límite a la vista.'), t('Monthly budget by category', 'Presupuesto del mes por categoría')],
      ['alcancia-goal', t('Goal', 'Meta'), t('Progress and when you get there.', 'Avance y cuándo se llega.'), t('Savings goal with progress and projection', 'Meta de ahorro con avance y proyección')]
    ]
  }
};

// Cambia el primer bloque <div class="screens"…>…</div> por otro contenido.
function swapScreens(html, next) {
  const i = html.indexOf('<div class="screens"');
  if (i < 0) return html;
  const tag = /<div\b[^>]*>|<\/div>/g;
  tag.lastIndex = i;
  let depth = 0;
  let k;
  while ((k = tag.exec(html))) {
    depth += k[0] === '</div>' ? -1 : 1;
    if (!depth) return html.slice(0, i) + next + html.slice(k.index + k[0].length);
  }
  return html;
}

function parseSections(ctx, slug) {
  const { t, lang } = ctx;
  let html = onlyLang(fs.readFileSync(path.join(here, `concepts/${slug}.html`), 'utf8').replace(/\r\n/g, '\n'), lang);
  if (lang === 'en') {
    html = html.replace(/aria-label="([^"]+)"/g, (all, l) => {
      if (!LABELS_EN[l]) throw new Error(`Sin traducción: aria-label="${l}"`);
      return `aria-label="${LABELS_EN[l]}"`;
    });
  }
  let screens = 0;
  let tables = 0;
  const region = (label) => `tabindex="0" role="region" aria-label="${esc(label)}"`;
  html = html
    .replace(/href="prototipos\/([a-z-]+)\.html"/g, (a, s) => `href="${ctx.root}casos/prototipos/${s}.html?lang=${lang}"`)
    .replace(/<div class="screens">/g, () => `<div class="screens" ${region(t(`Screens, group ${++screens}`, `Pantallas, grupo ${screens}`))}>`)
    .replace(/<div class="scroll-x rv">/g, () => `<div class="scroll-x" ${region(t(`Table ${++tables}, scrollable`, `Tabla ${tables}, con desplazamiento`))}>`)
    .replace(/<thead><tr><th><\/th>/g, '<thead><tr><td></td>')
    .replace(/<!--[\s\S]*?-->/g, '');
  // Pantallas sin barra inferior: llevan menos margen abajo.
  html = html.split('<div class="phone').map((part, i) => (i && !/class="[uw]-tab/.test(part.split('</figure>')[0]) ? part.replace('<div class="screen">', '<div class="screen no-tab">') : part)).join('<div class="phone');
  const out = [];
  for (const m of html.matchAll(/<section class="sec" id="([a-z]+)">([\s\S]*?)<\/section>/g)) {
    const inner = m[2];
    const label = inner.match(/<div class="sec-num">\d+<b>([\s\S]*?)<\/b><\/div>/)[1].trim();
    const title = inner.match(/<h2>([\s\S]*?)<\/h2>/)[1].trim();
    const lead = inner.match(/<p class="sec-lead">([\s\S]*?)<\/p>/);
    // El encabezado de la sección lo pone la plantilla: se saca el bloque original completo.
    const headStart = inner.indexOf('<div class="sec-head');
    let depth = 0;
    let end = headStart;
    const tag = /<div\b[^>]*>|<\/div>/g;
    tag.lastIndex = headStart;
    let k;
    while ((k = tag.exec(inner))) {
      depth += k[0] === '</div>' ? -1 : 1;
      if (!depth) {
        end = k.index + k[0].length;
        break;
      }
    }
    let rest = inner.slice(end);
    if (m[1] === 'ui') {
      const fin = FINAL[slug];
      rest = swapScreens(rest, phones(ctx, label, fin.items(t).map(([img, title, text, alt]) => ({ img: `${img}-${lang}`, title, text, alt })), { bg: fin.bg }));
      rest = rest.replace(/<a class="([^"]*)" href="([^"]*casos\/prototipos\/[^"]*)"/g, '<a class="$1" href="$2" data-live="' + esc(slug === 'ruta-del-vino' ? 'Ruta del Vino' : slug === 'turno' ? 'Turno' : 'Alcancía') + '"');
    }
    out.push({
      id: conceptId(lang, m[1]),
      label,
      title,
      raw: `${lead ? `<p class="lede">${lead[1].trim()}</p>` : ''}${fixHeadings(rest, 2)}`
    });
  }
  return out;
}

const common = (ctx) => ({
  role: [ctx.t('My role', 'Mi rol'), ctx.t('Research, UX, UI and prototype', 'Investigación, UX, UI y prototipo')],
  tools: [ctx.t('Tools', 'Herramientas'), 'Figma, FigJam, JavaScript'],
  status: [ctx.t('Status', 'Estado'), ctx.t('Concept, with a working prototype. Not launched', 'Concepto con prototipo funcional. No está publicado como producto')]
});

const proto = (ctx, slug) => [{ internal: true, href: `${ctx.root}casos/prototipos/${slug}.html?lang=${ctx.lang}`, label: ctx.t('Use the prototype', 'Usar el prototipo') }];

export const turno = {
  slug: 'turno',
  kind: 'concept',
  name: { en: 'Turno', es: 'Turno' },
  type: { en: 'Healthcare, mobile app', es: 'Salud, app móvil' },
  css: ':root{--brand:#1d6ae5;--brand-ink:#1558c0;--brand-soft:#e6efff;--brand-on-dark:#9fc2ff}',
  seo: {
    title: { en: 'Turno: accessible medical booking concept | Lucía Miranda', es: 'Turno: concepto de turnos médicos accesible | Lucía Miranda' },
    description: {
      en: 'Concept case study: booking a medical appointment in three taps. Research, architecture, wireframes, design system, prototype and heuristic evaluation.',
      es: 'Caso conceptual: sacar un turno médico en tres toques. Investigación, arquitectura, wireframes, sistema de diseño, prototipo y evaluación heurística.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const c = common(ctx);
    return {
      tagline: t('A medical appointment in three taps, designed for anyone, at 25 or at 75.', 'Un turno médico en tres toques, pensado para cualquier persona, a los 25 o a los 75.'),
      coverAlt: t('Three screens of the Turno prototype: review, home, and day and time.', 'Tres pantallas del prototipo de Turno: confirmación, inicio, y día y horario.'),
      overview: [[t('Industry', 'Industria'), t('Healthcare', 'Salud')], [t('Product', 'Producto'), t('Mobile app for patients', 'App móvil para pacientes')], c.role, [t('Timeline', 'Duración'), t('4 weeks', '4 semanas')], c.tools, c.status],
      links: proto(ctx, 'turno'),
      note: t(
        'Self-initiated, with no client. Research is secondary (benchmark, proto-personas and journey map) and figures are design targets, not measured results. The prototype was validated with a heuristic evaluation; user testing is planned. The prototype follows the language of this site.',
        'Proyecto propio, sin cliente. La investigación es secundaria (benchmark, proto-personas y journey map) y las cifras son objetivos de diseño, no resultados medidos. El prototipo se validó con una evaluación heurística; el test con usuarios está planificado.'
      ),
      exec: {
        problem: t('Booking means calling during office hours, waiting on hold and writing it down by hand. People forget, and the practice is left with gaps.', 'Sacar un turno implica llamar en horario de oficina, esperar y anotar a mano. La gente se olvida y el consultorio queda con huecos.'),
        approach: t('One decision per screen, progress always visible and the question “who is it for?” asked before starting. Accessibility set the rules, not the finishing touches.', 'Una decisión por pantalla, progreso siempre visible y la pregunta “¿para quién es?” antes de empezar. La accesibilidad puso las reglas.'),
        outcome: t('A working prototype where you can book, reschedule, cancel and check in. The review found six issues; five are fixed, one is open.', 'Un prototipo funcional donde se puede reservar, reprogramar, cancelar y hacer check-in. La revisión encontró seis problemas: cinco corregidos y uno pendiente.')
      },
      sections: parseSections(ctx, 'turno')
    };
  }
};

export const rutaDelVino = {
  slug: 'ruta-del-vino',
  kind: 'concept',
  name: { en: 'Ruta del Vino', es: 'Ruta del Vino' },
  type: { en: 'Tourism, mobile app', es: 'Turismo, app móvil' },
  css: ':root{--brand:#8a1c3a;--brand-ink:#8a1c3a;--brand-soft:#f8e6ea;--brand-on-dark:#f2a7b8}.vine{background:linear-gradient(180deg,#f6c79f 0,#f2a98a 34%,transparent 34%),repeating-linear-gradient(100deg,#5f7d36 0 7px,#4b6627 7px 15px)}.vine.b{background:linear-gradient(180deg,#e9b3a4 0,#d98c86 30%,transparent 30%),repeating-linear-gradient(80deg,#6b8740 0 6px,#546f2f 6px 13px)}.vine.c{background:linear-gradient(180deg,#f3d3a7 0,#eab27c 38%,transparent 38%),repeating-linear-gradient(95deg,#586f31 0 8px,#465a26 8px 16px)}.u-img .rate{position:absolute;top:8px;left:8px;background:#fff;border-radius:999px;padding:3px 8px;font-size:9.5px;font-weight:700}.qr{width:120px;height:120px;padding:8px;background:#fff;border-radius:12px;box-shadow:0 6px 18px -10px rgba(13,14,16,.3)}',
  seo: {
    title: { en: 'Ruta del Vino: winery route planning concept | Lucía Miranda', es: 'Ruta del Vino: concepto de planificación de bodegas | Lucía Miranda' },
    description: {
      en: 'Concept case study: planning a winery day as one route with confirmed bookings and transport. Research, architecture, wireframes, UI and prototype.',
      es: 'Caso conceptual: planificar un día de bodegas como un recorrido con reservas y traslado. Investigación, arquitectura, wireframes, UI y prototipo.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const c = common(ctx);
    return {
      tagline: t('A winery day planned as one route, with price, time and transport solved before leaving the hotel.', 'Un día de bodegas como un solo recorrido, con precio, horario y traslado resueltos antes de salir del hotel.'),
      coverAlt: t('Three screens of the Ruta del Vino prototype over a vineyard at sunset: winery, explore and route of the day.', 'Tres pantallas del prototipo de Ruta del Vino sobre un viñedo al atardecer: bodega, explorar y recorrido del día.'),
      overview: [[t('Industry', 'Industria'), t('Wine tourism', 'Turismo del vino')], [t('Product', 'Producto'), t('Mobile app for visitors, bilingual', 'App móvil para visitantes, bilingüe')], c.role, [t('Timeline', 'Duración'), t('3 weeks', '3 semanas')], c.tools, c.status],
      links: proto(ctx, 'ruta-del-vino'),
      note: t(
        'Self-initiated, with no client. Research is secondary (channel analysis, proto-personas and empathy map); wineries, prices and figures are fictional. The prototype was validated with a heuristic evaluation; user testing is planned. Photos are illustrative, from Wikimedia Commons under open licenses; credits are in the prototype.',
        'Proyecto propio, sin cliente. La investigación es secundaria (análisis de canales, proto-personas y mapa de empatía); bodegas, precios y cifras son ficticios. El prototipo se validó con una evaluación heurística; el test con usuarios está planificado. Las fotos son ilustrativas, de Wikimedia Commons con licencias abiertas; los créditos están en el prototipo.'
      ),
      exec: {
        problem: t('Visitors search several websites, message each winery and arrange transport on their own. The day comes together at the last minute.', 'Quien visita Mendoza busca en varios sitios, escribe a cada bodega y arregla el traslado por su cuenta. El día se arma a último momento.'),
        approach: t('The day is the unit, not the winery. Experiences are added like items in a cart and the app warns when two times can’t be reached.', 'La unidad es el día, no la bodega. Las experiencias se suman como en un carrito y la app avisa cuando dos horarios no son compatibles.'),
        outcome: t('A working prototype: choose an area, add wineries, see travel times, switch transport on and pay once.', 'Un prototipo funcional: elegir zona, sumar bodegas, ver tiempos de viaje, activar el traslado y pagar una sola vez.')
      },
      sections: parseSections(ctx, 'ruta-del-vino')
    };
  }
};

export const alcancia = {
  slug: 'alcancia',
  kind: 'concept',
  name: { en: 'Alcancía', es: 'Alcancía' },
  type: { en: 'Fintech, mobile app', es: 'Fintech, app móvil' },
  css: ':root{--brand:#5b4fd8;--brand-ink:#4a3fc0;--brand-soft:#ecebfd;--brand-on-dark:#b9b3ff}.neg{color:#c8362b}.pos{color:#0c7a50}.u-bar.warn i{background:#f5a524}.u-bar.ok i{background:#12a06a}.u-bar.bad i{background:#c8362b}.u-ring.lg{width:104px;height:104px}.u-ring.lg::before{width:80px;height:80px;font-size:20px}.amount{font-family:var(--display);font-weight:800;font-size:34px;letter-spacing:-.05em;text-align:center;line-height:1}.bars{display:flex;align-items:flex-end;gap:8px;height:74px;padding:0 4px}.bars i{flex:1;border-radius:6px 6px 3px 3px;background:#dcd8fb}.bars i.on{background:var(--brand)}.bars-l{display:flex;gap:8px;padding:4px 4px 0;font-size:9px;color:#8b9096}.bars-l span{flex:1;text-align:center}',
  seo: {
    title: { en: 'Alcancía: personal finance concept | Lucía Miranda', es: 'Alcancía: concepto de finanzas personales | Lucía Miranda' },
    description: {
      en: 'Concept case study: personal finance for young people. Behavioral principles, architecture, wireframes, design system, prototype and heuristic evaluation.',
      es: 'Caso conceptual: finanzas personales para jóvenes. Principios de comportamiento, arquitectura, wireframes, sistema de diseño, prototipo y evaluación heurística.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const c = common(ctx);
    return {
      tagline: t('What is left for the month, budgets and one goal, with no spreadsheets and no guilt.', 'Lo que queda del mes, presupuestos y una meta, sin planillas y sin culpa.'),
      coverAlt: t('Three screens of the Alcancía prototype: budget, home and savings goal.', 'Tres pantallas del prototipo de Alcancía: presupuesto, inicio y meta de ahorro.'),
      overview: [[t('Industry', 'Industria'), t('Personal finance', 'Finanzas personales')], [t('Product', 'Producto'), t('Mobile app for young people', 'App móvil para jóvenes')], c.role, [t('Timeline', 'Duración'), t('4 weeks', '4 semanas')], c.tools, c.status],
      links: proto(ctx, 'alcancia'),
      note: t(
        'Self-initiated, with no client. Research is secondary (benchmark, proto-persona, journey map and behavioral economics principles); amounts and targets are fictional. The prototype was validated with a heuristic evaluation; user testing is planned. The Bariloche photo is from Wikimedia Commons (CC BY-SA 4.0).',
        'Proyecto propio, sin cliente. La investigación es secundaria (benchmark, proto-persona, journey map y principios de economía del comportamiento); montos y objetivos son ficticios. La foto de Bariloche es de Wikimedia Commons (CC BY-SA 4.0). El prototipo se validó con una evaluación heurística; el test con usuarios está planificado.'
      ),
      exec: {
        problem: t('Many young people track spending in spreadsheets or not at all. Banking apps list transactions but don’t help anyone decide.', 'Mucha gente joven anota gastos en planillas o no los anota. Las apps bancarias muestran movimientos, pero no ayudan a decidir.'),
        approach: t('One clear number per screen, an expense logged in two taps and tips that come with a way out. Behavioral principles shaped the copy as much as the layout.', 'Un número claro por pantalla, un gasto en dos toques y consejos que vienen con una salida. Los principios de comportamiento definieron tanto los textos como la interfaz.'),
        outcome: t('A working prototype that recalculates with every expense, and a design system with tabular figures and states that don’t rely on color.', 'Un prototipo funcional que recalcula con cada gasto y un sistema de diseño con cifras tabulares y estados que no dependen del color.')
      },
      sections: parseSections(ctx, 'alcancia')
    };
  }
};
