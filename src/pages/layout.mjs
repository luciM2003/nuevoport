import { SITE } from '../content/site.mjs';
import { esc, icon } from '../lib/html.mjs';

// Monograma: "LM" en Faustina SemiBold pasado a contornos y centrado a ojo (la M pesa más que la L).
const MARK = '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="32" r="32" fill="currentColor"/><path fill="#f3f4f1" d="M11.69 41.49L11.69 39.96L14.13 39.38L14.13 24.1L11.69 23.52L11.69 21.99L20.33 21.99L20.33 23.58L17.8 24.1L17.8 39.2L19.84 39.44L23.34 39.44L24.09 36.1L25.89 36.1L25.89 41.49ZM27.07 41.49L27.07 39.96L29.35 39.41L29.35 24.04L27.43 23.65L27.43 21.99L34.41 21.99L38.59 35.59L38.95 37.31L39.07 37.31L39.46 35.59L43.59 21.99L50.81 21.99L50.81 23.68L48.61 24.07L48.61 39.41L51.05 39.93L51.05 41.49L42.53 41.49L42.53 39.93L44.94 39.41L44.94 27.56L45.03 26.74L44.7 26.74L40.04 41.49L37.03 41.49L32.18 26.74L31.85 26.74L31.91 27.53L31.91 39.41L34.32 39.96L34.32 41.49Z"/></svg>';

export function cvLink(ctx, label, cls) {
  const cv = SITE.cv[ctx.lang];
  return `<a class="${cls}" href="${ctx.root}${cv.file}" download="${cv.download}" type="application/pdf">${label}${icon('down')}</a>`;
}

function header(ctx, altUrl, current) {
  const { t, lang } = ctx;
  const items = [
    ['work', t('Work', 'Proyectos')],
    ['approach', t('Approach', 'Proceso')],
    ['about', t('About', 'Sobre mí')],
    ['contact', t('Contact', 'Contacto')]
  ];
  const self = (l) => (l === lang ? '' : altUrl);
  const langs = [['en', 'EN', 'English'], ['es', 'ES', 'Español']]
    .map(([l, s, n]) => (l === lang ? `<span class="lang-on" aria-current="true">${s}<span class="vh"> ${n}</span></span>` : `<a href="${self(l)}" hreflang="${l}" lang="${l}" data-lang="${l}">${s}<span class="vh"> ${n}</span></a>`))
    .join('');
  return `<a class="skip" href="#main">${t('Skip to content', 'Ir al contenido')}</a>
<header class="hd${current === 'case' ? ' hd-static' : ''}"><div class="wrap hd-in">
<a class="hd-b" href="${ctx.home()}">${MARK}<span>Lucía Miranda<span class="vh">, ${t('home', 'inicio')}</span></span></a>
<nav class="hd-n" aria-label="${t('Main', 'Principal')}"><ul>${items.map(([id, n]) => `<li><a href="${ctx.home('#' + id)}">${n}</a></li>`).join('')}</ul></nav>
<div class="hd-r"><div class="lang" role="group" aria-label="${t('Language', 'Idioma')}">${langs}</div>${cvLink(ctx, t('Résumé', 'CV'), 'btn btn-s hd-cv')}<details class="mn"><summary><span>${t('Menu', 'Menú')}</span>${icon('menu')}</summary><div class="mn-p"><nav aria-label="${t('Main', 'Principal')}"><ul>${items.map(([id, n]) => `<li><a href="${ctx.home('#' + id)}">${n}${icon('arrow')}</a></li>`).join('')}</ul></nav><p class="mn-a">${cvLink(ctx, t('Download résumé', 'Descargar CV'), 'btn')}<a class="btn btn-o" href="mailto:${SITE.email}">${t('Email', 'Correo')}</a></p></div></details></div>
</div></header>`;
}

function footer(ctx) {
  const { t } = ctx;
  return `<footer class="ft"><div class="wrap ft-in">
<p>© ${SITE.year} Lucía Miranda</p>
<p class="ft-c">${t('Set in Chivo and Faustina, by Omnibus-Type, Buenos Aires.', 'Compuesto en Chivo y Faustina, de Omnibus-Type, Buenos Aires.')}</p>
<ul><li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn<span class="vh"> (${t('opens in a new tab', 'se abre en otra pestaña')})</span></a></li><li><a href="mailto:${SITE.email}">${t('Email', 'Correo')}</a></li><li><a href="#top">${t('Back to top', 'Volver arriba')}</a></li></ul>
</div></footer>`;
}

// Antes de pintar: si la persona ya eligió el otro idioma, va directo a esa versión.
// `?lang=` se respeta para los enlaces que ya circulaban con el sitio anterior.
const PREF = `(function(){var d=document.documentElement,q=new URLSearchParams(location.search).get('lang'),p=null;try{p=localStorage.getItem('lm-lang')}catch(e){}var w=q==='en'||q==='es'?q:p;if(w&&w!==d.lang&&d.dataset.alt)location.replace(d.dataset.alt+location.hash);d.classList.add('js')})()`;

export function page(ctx, o) {
  const { t, lang, root } = ctx;
  const canonical = ctx.abs(ctx.pagePath);
  const en = ctx.abs(o.paths.en);
  const es = ctx.abs(o.paths.es);
  const altUrl = root + (lang === 'en' ? o.paths.es : o.paths.en) || './';
  const og = ctx.abs(`assets/og/${o.og}-${lang}.jpg`);
  const v = o.versions;
  const ld = o.jsonld ? `<script type="application/ld+json">${JSON.stringify(o.jsonld)}</script>` : '';
  return `<!doctype html>
<html lang="${lang}" data-alt="${altUrl}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}"/>
<meta name="author" content="Lucía Miranda"/>
<meta name="robots" content="index, follow, max-image-preview:large"/>
<link rel="canonical" href="${canonical}"/>
<link rel="alternate" hreflang="en" href="${en}"/>
<link rel="alternate" hreflang="es" href="${es}"/>
<link rel="alternate" hreflang="x-default" href="${en}"/>
<meta property="og:type" content="${o.ogType || 'website'}"/>
<meta property="og:site_name" content="Lucía Miranda"/>
<meta property="og:title" content="${esc(o.ogTitle || o.title)}"/>
<meta property="og:description" content="${esc(o.description)}"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:image" content="${og}"/>
<meta property="og:image:type" content="image/jpeg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="${esc(o.ogAlt || o.title)}"/>
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'es_AR'}"/>
<meta property="og:locale:alternate" content="${lang === 'en' ? 'es_AR' : 'en_US'}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="theme-color" content="#f3f4f1"/>
<meta name="color-scheme" content="light"/>
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml"/>
<link rel="icon" href="${root}favicon-32.png" sizes="32x32" type="image/png"/>
<link rel="apple-touch-icon" href="${root}apple-touch-icon.png"/>
<link rel="manifest" href="${root}site.webmanifest"/>
<link rel="preload" href="${root}assets/fonts/chivo.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="preload" href="${root}assets/fonts/faustina.woff2" as="font" type="font/woff2" crossorigin/>
<script>${PREF}</script>
<link rel="stylesheet" href="${root}assets/css/site.css?v=${v.css}"/>${o.styles ? o.styles.map((s) => `\n<link rel="stylesheet" href="${root}assets/css/${s}.css?v=${v[s]}"/>`).join('') : ''}${o.css ? `\n<style>${o.css}</style>` : ''}
${ld}
</head>
<body id="top" class="${o.cls || ''}">
${header(ctx, altUrl, o.current)}
<main id="main" tabindex="-1">
${o.body}
</main>
${footer(ctx)}
<div class="toast" role="status" aria-live="polite" data-close="${t('Close', 'Cerrar')}" data-full="${t('Open full screen', 'Abrir en pantalla completa')}" data-note="${t('Working prototype. Nothing leaves this browser.', 'Prototipo funcional. Nada sale de este navegador.')}"></div>
<script src="${root}assets/js/site.js?v=${v.js}" defer></script>
</body>
</html>
`.replace(/\n{2,}/g, '\n');
}

export const PERSON = (ctx) => ({
  '@type': 'Person',
  '@id': SITE.origin + SITE.base + '#lucia-miranda',
  name: 'Lucía Miranda',
  jobTitle: ctx.t('Senior UX/UI & Product Designer', 'Diseñadora Senior UX/UI y de Producto'),
  url: SITE.origin + SITE.base,
  image: ctx.abs('assets/img/portrait-960.webp'),
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.linkedin],
  address: { '@type': 'PostalAddress', addressLocality: 'Mendoza', addressCountry: 'AR' },
  knowsLanguage: ['es', 'en'],
  knowsAbout: ['UX design', 'UI design', 'Product design', 'Design systems', 'Information architecture', 'Interaction design', 'Accessibility', 'SaaS', 'Front-end development', 'React', 'TypeScript']
});
