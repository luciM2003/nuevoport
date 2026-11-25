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
const SCREEN = [720, 1200, 1800];
const THUMB = [480, 960];

// Las capturas de los prototipos traen una barra de 32 px del visor: se recorta.
const proto = { left: 0, top: 96, width: 1170, height: 2436 };
// Pantallas de MODO YA: vienen de a cuatro en una misma lámina.
const flow = (left) => ({ left, top: 13, width: 403, height: 875 });

const MANIFEST = {
  portrait: { src: 'images/lucia.jpg', widths: [320, 480, 720, 960] },

  'modoya-home': { src: 'images/casos/modoya-flujo-a.jpg', crop: flow(527), widths: [300, 403] },
  'modoya-cart': { src: 'images/casos/modoya-flujo-a.jpg', crop: flow(1553), widths: [300, 403] },
  'modoya-pay': { src: 'images/casos/modoya-flujo-b.jpg', crop: flow(14), widths: [300, 403] },
  'modoya-confirmed': { src: 'images/casos/modoya-flujo-b.jpg', crop: flow(528), widths: [300, 403] },
  'modoya-track': { src: 'images/casos/modoya-flujo-b.jpg', crop: flow(1041), widths: [300, 403] },
  'modoya-landing': { src: CAP + 'modoya-landing.webp', crop: { left: 0, top: 80, width: 2880, height: 1546 }, widths: SCREEN },
  'modoya-landing-services': { src: CAP + 'modoya-landing-services.webp', widths: SCREEN },
  'modoya-landing-steps': { src: CAP + 'modoya-landing-steps.webp', crop: { left: 0, top: 0, width: 2880, height: 1440 }, widths: SCREEN },
  'modoya-landing-join': { src: CAP + 'modoya-landing-join.webp', widths: SCREEN },

  'uco-dashboard': { src: CAP + 'uco-dashboard.webp', widths: SCREEN },
  'uco-bookings': { src: CAP + 'uco-bookings.webp', widths: SCREEN },
  'uco-pos': { src: CAP + 'uco-pos.webp', widths: SCREEN },
  'uco-promotions': { src: CAP + 'uco-promotions.webp', widths: SCREEN },
  'uco-inbox': { src: CAP + 'uco-inbox.webp', widths: PHONE },
  'uco-order': { src: CAP + 'uco-order.webp', widths: PHONE },
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

  'turno-home': { src: CAP + 'turno-home.webp', crop: proto, widths: PHONE },
  'turno-slot': { src: CAP + 'turno-slot.webp', crop: proto, widths: PHONE },
  'turno-review': { src: CAP + 'turno-review.webp', crop: proto, widths: PHONE },
  'turno-done': { src: CAP + 'turno-done.webp', crop: proto, widths: PHONE },
  'vino-home': { src: CAP + 'vino-home.webp', crop: proto, widths: PHONE },
  'vino-winery': { src: CAP + 'vino-winery.webp', crop: proto, widths: PHONE },
  'vino-route': { src: CAP + 'vino-route.webp', crop: proto, widths: PHONE },
  'alcancia-home': { src: CAP + 'alcancia-home.webp', crop: proto, widths: PHONE },
  'alcancia-budget': { src: CAP + 'alcancia-budget.webp', crop: proto, widths: PHONE },
  'alcancia-goal': { src: CAP + 'alcancia-goal.webp', crop: proto, widths: PHONE },

  'x-lithium': { src: CAP + 'x-lithium.webp', widths: THUMB },
  'x-codea': { src: CAP + 'x-codea.webp', widths: THUMB },
  'x-move': { src: CAP + 'x-move.webp', widths: THUMB },
  'x-agv': { src: CAP + 'x-agv.webp', widths: THUMB },
  'x-stretch': { src: CAP + 'x-stretch.webp', widths: THUMB },
  'x-studio': { src: CAP + 'x-studio.webp', widths: THUMB },
  'x-bakery': { src: CAP + 'x-bakery.webp', widths: THUMB }
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
