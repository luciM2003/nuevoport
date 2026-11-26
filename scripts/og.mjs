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
const mark = (bg, r) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg}<circle cx="32" cy="32" r="${r}" fill="#0f6a3a"/><path fill="#f3f4f1" d="M9.1 42.7L9.1 40.97L11.85 40.32L11.85 23.08L9.1 22.43L9.1 20.7L18.84 20.7L18.84 22.5L15.99 23.08L15.99 40.12L18.3 40.39L22.24 40.39L23.08 36.62L25.12 36.62L25.12 42.7ZM26.45 42.7L26.45 40.97L29.03 40.36L29.03 23.01L26.85 22.57L26.85 20.7L34.73 20.7L39.45 36.05L39.86 37.98L39.99 37.98L40.43 36.05L45.08 20.7L53.23 20.7L53.23 22.6L50.75 23.04L50.75 40.36L53.5 40.93L53.5 42.7L43.9 42.7L43.9 40.93L46.61 40.36L46.61 26.98L46.71 26.06L46.34 26.06L41.08 42.7L37.68 42.7L32.22 26.06L31.84 26.06L31.91 26.95L31.91 40.36L34.63 40.97L34.63 42.7Z"/></svg>`;
fs.writeFileSync(path.join(ROOT, 'favicon.svg'), mark('', 32) + '\n');
const png = (svg, size, file) => sharp(Buffer.from(svg), { density: 72 * (size / 64) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(path.join(ROOT, file));
await png(mark('', 32), 32, 'favicon-32.png');
const full = mark('<rect width="64" height="64" fill="#0f6a3a"/>', 32);
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
      `<div class="og" style="background:${bg};color:${ink}"><div class="tx" style="width:470px"><p class="by" style="margin:0">${c.kind === 'concept' ? t('Concept project', 'Proyecto conceptual') : t('Case study', 'Caso de estudio')}</p><h1 style="font-size:${name.length > 12 ? 68 : 90}px;margin-top:14px">${name}</h1><p style="font-size:29px;margin-top:22px">${c.type[lang]}</p><p class="by">Lucía Miranda<span>${t('Senior UX/UI & Product Designer', 'Diseñadora Senior UX/UI y de Producto')}</span></p></div><div style="position:absolute;left:${c.kind === "concept" ? 556 : 505}px;top:${c.kind === "concept" ? 40 : 20}px;width:${c.kind === "concept" ? 660 : 1080}px">${cover(ctx, c.slug, { alt: '', eager: true, vt: false, scale: 1 }).replace('style="', 'style="aspect-ratio:1.2;')}</div></div>`,
      `${c.slug}-${lang}`
    );
  }
}
fs.unlinkSync(tmp);
await browser.close();
console.log('Imágenes para compartir e íconos listos.');
