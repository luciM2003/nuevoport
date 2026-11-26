// Genera las versiones AVIF y WebP que usa el sitio a partir de los originales de /images.
//
//   npm i --no-save sharp
//   npm run images
//
// Sólo hace falta correrlo al agregar o cambiar una imagen: el resultado (assets/img y
// src/content/images.json) se versiona, así que `npm run build` no necesita dependencias.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: sharp } = await import('sharp');

const CAP = 'images/capturas/';
const PHONE = [320, 640];
const TABLET = [640, 1200];
const LAPTOP = [720, 1200, 1800];
const SCREEN = [720, 1200, 1800];
const THUMB = [480, 960, 1440];


const MANIFEST = {
  portrait: { src: 'images/lucia.jpg', widths: [320, 480, 720, 960] },

  // MODO YA: pantallas de las apps reales, con datos de muestra (ver README).
  'modoya-c-home': { src: CAP + 'modoya-c-home.webp', widths: PHONE },
  'modoya-c-cart': { src: CAP + 'modoya-c-cart.webp', widths: PHONE },
  'modoya-c-kitchen': { src: CAP + 'modoya-c-kitchen.webp', widths: PHONE },
  'modoya-c-way': { src: CAP + 'modoya-c-way.webp', widths: PHONE },
  'modoya-c-done': { src: CAP + 'modoya-c-done.webp', widths: PHONE },
  'modoya-r-home': { src: CAP + 'modoya-r-home.webp', widths: PHONE },
  'modoya-r-pickup': { src: CAP + 'modoya-r-pickup.webp', widths: PHONE },
  'modoya-r-way': { src: CAP + 'modoya-r-way.webp', widths: PHONE },
  'modoya-r-done': { src: CAP + 'modoya-r-done.webp', widths: PHONE },
  'modoya-l-kitchen': { src: CAP + 'modoya-l-kitchen.webp', widths: TABLET },
  'modoya-l-ready': { src: CAP + 'modoya-l-ready.webp', widths: TABLET },
  'modoya-l-sent': { src: CAP + 'modoya-l-sent.webp', widths: TABLET },
  'modoya-l-menu': { src: CAP + 'modoya-l-menu.webp', widths: TABLET },
  'modoya-a-live': { src: CAP + 'modoya-a-live.webp', widths: LAPTOP },
  'modoya-landing-tall': { src: CAP + 'modoya-landing-tall.webp', widths: [720, 1200] },
  'modoya-landing': { src: CAP + 'modoya-landing.webp', crop: { left: 0, top: 80, width: 2880, height: 1546 }, widths: SCREEN },
  'modoya-landing-services': { src: CAP + 'modoya-landing-services.webp', widths: SCREEN },
  'modoya-landing-steps': { src: CAP + 'modoya-landing-steps.webp', crop: { left: 0, top: 0, width: 2880, height: 1440 }, widths: SCREEN },
  'modoya-landing-join': { src: CAP + 'modoya-landing-join.webp', widths: SCREEN },

  'uco-dashboard': { src: CAP + 'uco-dashboard.webp', widths: SCREEN },
  'uco-bookings': { src: CAP + 'uco-bookings.webp', widths: SCREEN },
  'uco-pos': { src: CAP + 'uco-pos.webp', widths: SCREEN },
  'uco-promotions': { src: CAP + 'uco-promotions.webp', widths: SCREEN },
  'uco-inbox': { src: CAP + 'uco-inbox.webp', crop: { left: 5, top: 4, width: 645, height: 1380 }, widths: PHONE },
  'uco-order': { src: CAP + 'uco-order.webp', crop: { left: 5, top: 4, width: 645, height: 1380 }, widths: PHONE },
  'uco-bots': { src: CAP + 'uco-bots.webp', crop: { left: 8, top: 14, width: 1490, height: 716 }, widths: [720, 1200] },
  'uco-flows': { src: CAP + 'uco-flows.webp', crop: { left: 8, top: 8, width: 1484, height: 690 }, widths: [720, 1200] },

  'byd-overview': { src: CAP + 'byd-overview.webp', widths: SCREEN },
  'byd-early-detection': { src: CAP + 'byd-early-detection.webp', widths: SCREEN },
  'byd-surveys': { src: CAP + 'byd-surveys.webp', widths: SCREEN },
  'byd-aftersales': { src: CAP + 'byd-aftersales.webp', widths: SCREEN },
  'byd-audits': { src: CAP + 'byd-audits.webp', widths: SCREEN },
  'byd-sync': { src: CAP + 'byd-sync.webp', widths: SCREEN },
  'byd-users': { src: 'images/casos/byd-admin-usuarios.jpg', widths: SCREEN },
  'byd-m-overview': { src: CAP + 'byd-m-overview.webp', widths: PHONE },
  'byd-m-early-detection': { src: CAP + 'byd-m-early-detection.webp', widths: PHONE },

  'padel-m-home': { src: CAP + 'padel-m-home.webp', widths: PHONE },
  'padel-m-slots': { src: CAP + 'padel-m-slots.webp', widths: PHONE },
  'padel-m-summary': { src: CAP + 'padel-m-summary.webp', widths: PHONE },
  'padel-m-matches': { src: CAP + 'padel-m-matches.webp', widths: PHONE },
  'padel-m-bookings': { src: CAP + 'padel-m-bookings.webp', widths: PHONE },
  'padel-timeline': { src: CAP + 'padel-timeline.webp', widths: SCREEN },
  'padel-dashboard': { src: CAP + 'padel-dashboard.webp', widths: SCREEN },
  'padel-cash': { src: CAP + 'padel-cash.webp', widths: SCREEN },
  'padel-clients': { src: CAP + 'padel-clients.webp', widths: SCREEN },

  // Prototipos de los conceptos, en los dos idiomas.
  'turno-home-en': { src: CAP + 'turno-home-en.webp', widths: PHONE },
  'turno-home-es': { src: CAP + 'turno-home-es.webp', widths: PHONE },
  'turno-doctor-en': { src: CAP + 'turno-doctor-en.webp', widths: PHONE },
  'turno-doctor-es': { src: CAP + 'turno-doctor-es.webp', widths: PHONE },
  'turno-slot-en': { src: CAP + 'turno-slot-en.webp', widths: PHONE },
  'turno-slot-es': { src: CAP + 'turno-slot-es.webp', widths: PHONE },
  'turno-review-en': { src: CAP + 'turno-review-en.webp', widths: PHONE },
  'turno-review-es': { src: CAP + 'turno-review-es.webp', widths: PHONE },
  'turno-done-en': { src: CAP + 'turno-done-en.webp', widths: PHONE },
  'turno-done-es': { src: CAP + 'turno-done-es.webp', widths: PHONE },
  'vino-home-en': { src: CAP + 'vino-home-en.webp', widths: PHONE },
  'vino-home-es': { src: CAP + 'vino-home-es.webp', widths: PHONE },
  'vino-winery-en': { src: CAP + 'vino-winery-en.webp', widths: PHONE },
  'vino-winery-es': { src: CAP + 'vino-winery-es.webp', widths: PHONE },
  'vino-route-en': { src: CAP + 'vino-route-en.webp', widths: PHONE },
  'vino-route-es': { src: CAP + 'vino-route-es.webp', widths: PHONE },
  'vino-pay-en': { src: CAP + 'vino-pay-en.webp', widths: PHONE },
  'vino-pay-es': { src: CAP + 'vino-pay-es.webp', widths: PHONE },
  'vino-voucher-en': { src: CAP + 'vino-voucher-en.webp', widths: PHONE },
  'vino-voucher-es': { src: CAP + 'vino-voucher-es.webp', widths: PHONE },
  'alcancia-home-en': { src: CAP + 'alcancia-home-en.webp', widths: PHONE },
  'alcancia-home-es': { src: CAP + 'alcancia-home-es.webp', widths: PHONE },
  'alcancia-log-en': { src: CAP + 'alcancia-log-en.webp', widths: PHONE },
  'alcancia-log-es': { src: CAP + 'alcancia-log-es.webp', widths: PHONE },
  'alcancia-budget-en': { src: CAP + 'alcancia-budget-en.webp', widths: PHONE },
  'alcancia-budget-es': { src: CAP + 'alcancia-budget-es.webp', widths: PHONE },
  'alcancia-goal-en': { src: CAP + 'alcancia-goal-en.webp', widths: PHONE },
  'alcancia-goal-es': { src: CAP + 'alcancia-goal-es.webp', widths: PHONE },
  'alcancia-nudge-en': { src: CAP + 'alcancia-nudge-en.webp', widths: PHONE },
  'alcancia-nudge-es': { src: CAP + 'alcancia-nudge-es.webp', widths: PHONE },

  'x-lithium': { src: CAP + 'x-lithium.webp', widths: THUMB },
  'x-codea': { src: CAP + 'x-codea.webp', widths: THUMB },
  'x-move': { src: CAP + 'x-move.webp', widths: THUMB },
  'x-agv': { src: CAP + 'x-agv.webp', widths: THUMB },
  'x-stretch': { src: CAP + 'x-stretch.webp', widths: THUMB },
  'x-studio': { src: CAP + 'x-studio.webp', widths: THUMB },
  'x-bakery': { src: CAP + 'x-bakery.webp', widths: THUMB },
  'x-move-tall': { src: CAP + 'x-move-tall.webp', widths: [480, 960] },
  'x-stretch-tall': { src: CAP + 'x-stretch-tall.webp', widths: [480, 960] }
};

const OUT = path.join(ROOT, 'assets/img');
fs.mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const jsonPath = path.join(ROOT, 'src/content/images.json');
const index = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

for (const [name, def] of Object.entries(MANIFEST)) {
  if (only.length && !only.includes(name)) continue;
  let base = sharp(path.join(ROOT, def.src)).rotate();
  if (def.crop) base = base.extract(def.crop);
  const buf = await base.png().toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = def.widths.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  for (const w of widths) {
    const r = sharp(buf).resize({ width: w, kernel: 'lanczos3' });
    await r.clone().avif({ quality: 58, effort: 6, chromaSubsampling: '4:4:4' }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await r.clone().webp({ quality: 82, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  index[name] = { w: meta.width, h: meta.height, widths };
  process.stdout.write('.');
}
const sorted = Object.fromEntries(Object.keys(index).filter((k) => MANIFEST[k]).sort().map((k) => [k, index[k]]));
fs.writeFileSync(jsonPath, JSON.stringify(sorted, null, 2) + '\n');
console.log(`\n${Object.keys(sorted).length} imágenes`);
