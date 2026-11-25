// Genera las imágenes que se ven al compartir un enlace (LinkedIn, WhatsApp) y los íconos.
//
//   npm i --no-save sharp playwright-core
//   npm run og
//
// Usa el Chrome instalado. El resultado se versiona en assets/og.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: sharp } = await import('sharp');
const { chromium } = await import('playwright-core');
const { CASES, LANGS } = await import(pathToFileURL(path.join(ROOT, 'scripts/build.mjs')).href);
const { makeCtx, picture } = await import(pathToFileURL(path.join(ROOT, 'src/lib/html.mjs')).href);
const { cover, coverBg } = await import(pathToFileURL(path.join(ROOT, 'src/covers.mjs')).href);

// ---------------------------------------------------------------- íconos
const mark = (bg, r) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg}<circle cx="32" cy="32" r="${r}" fill="#0d0e10"/><path fill="#f3f4f1" d="M15.5 42V22h4.3v16.2h9.4V42zM32.6 42V22h5.9l5.6 13.2L49.7 22h5.9v20h-4.2V28.4L45.7 42h-3.3l-5.7-13.6V42z"/></svg>`;
fs.writeFileSync(path.join(ROOT, 'favicon.svg'), mark('', 32) + '\n');
const png = (svg, size, file) => sharp(Buffer.from(svg), { density: 72 * (size / 64) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(path.join(ROOT, file));
await png(mark('', 32), 32, 'favicon-32.png');
const full = mark('<rect width="64" height="64" fill="#0d0e10"/>', 32);
await png(full, 180, 'apple-touch-icon.png');
await png(full, 192, 'icon-192.png');
await png(full, 512, 'icon-512.png');

// ---------------------------------------------------------------- previsualizaciones
fs.mkdirSync(path.join(ROOT, 'assets/og'), { recursive: true });
const css = fs.readFileSync(path.join(ROOT, 'assets/css/site.css'), 'utf8').replace(/url\("\.\.\/fonts/g, 'url("./assets/fonts');
const light = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 140;
};
const base = `<meta charset="utf-8"/><style>${css}
html,body{width:1200px;height:630px;overflow:hidden;background:#f3f4f1}
.og{width:1200px;height:630px;position:relative;overflow:hidden}
.og .tx{position:absolute;left:64px;top:56px;bottom:56px;width:520px;display:flex;flex-direction:column;z-index:2}
.og h1{font-weight:400;letter-spacing:-.04em;line-height:.98;margin-left:-.04em}
.og p{font-family:var(--serif);line-height:1.22}
.og .by{margin-top:auto;font-family:var(--sans);font-size:24px;line-height:1.3;font-weight:500}
.og .by span{display:block;font-weight:400;opacity:.8}
</style>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const tmp = path.join(ROOT, '.og-tmp.html');

async function shot(html, name) {
  fs.writeFileSync(tmp, `<!doctype html><html>${base}<body>${html}</body></html>`);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); })));
  await page.waitForTimeout(250);
  const buf = await page.screenshot({ type: 'png' });
  await sharp(buf).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(ROOT, `assets/og/${name}.jpg`));
}

for (const lang of LANGS) {
  const ctx = makeCtx(lang, '');
  const { t } = ctx;
  await shot(
    `<div class="og"><div style="position:absolute;right:0;top:0;width:430px;height:630px;overflow:hidden">${picture(ctx, 'portrait', { alt: '', sizes: '960px', eager: true }).replace('<img', '<img style="width:100%;height:100%;object-fit:cover;object-position:50% 18%"').replace('<picture', '<picture style="display:block;height:100%"')}</div>
    <div class="tx" style="width:650px"><h1 style="font-size:${lang === 'es' ? 76 : 88}px">${t('Senior UX/UI &<br/>Product Designer', 'Diseñadora Senior<br/>UX/UI y de Producto')}</h1><p style="font-size:33px;margin-top:30px;max-width:600px">${t('Intuitive, scalable digital experiences that connect user needs, business goals and technology.', 'Experiencias digitales intuitivas y escalables que conectan usuarios, negocio y tecnología.')}</p><p class="by">Lucía Miranda<span>${t('Mendoza, Argentina. Open to international roles', 'Mendoza, Argentina. Abierta a roles internacionales')}</span></p></div></div>`,
    `home-${lang}`
  );
  for (const c of CASES) {
    const bg = coverBg(c.slug);
    const ink = light(bg) ? '#0d0e10' : '#ffffff';
    const name = c.name[lang];
    await shot(
      `<div class="og" style="background:${bg};color:${ink}"><div class="tx" style="width:470px"><p class="by" style="margin:0">${c.kind === 'concept' ? t('Concept project', 'Proyecto conceptual') : t('Case study', 'Caso de estudio')}</p><h1 style="font-size:${name.length > 12 ? 68 : 90}px;margin-top:14px">${name}</h1><p style="font-size:29px;margin-top:22px">${c.type[lang]}</p><p class="by">Lucía Miranda<span>${t('Senior UX/UI & Product Designer', 'Diseñadora Senior UX/UI y de Producto')}</span></p></div><div style="position:absolute;left:${c.kind === 'concept' ? 500 : 505}px;top:${c.kind === 'concept' ? 40 : 20}px;width:${c.kind === 'concept' ? 720 : 1080}px">${cover(ctx, c.slug, { alt: '', eager: true, vt: false, scale: 1 }).replace('style="', 'style="aspect-ratio:1.2;')}</div></div>`,
      `${c.slug}-${lang}`
    );
  }
}
fs.unlinkSync(tmp);
await browser.close();
console.log('Imágenes para compartir e íconos listos.');
