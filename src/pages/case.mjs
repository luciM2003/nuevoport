import { SITE } from '../content/site.mjs';
import { casePath, dl, esc, ext, icon, plain } from '../lib/html.mjs';
import { cover } from '../covers.mjs';
import { page, PERSON } from './layout.mjs';

const pick = (ctx, o) => o[ctx.lang];

export function casePage(ctx, c, next, versions) {
  const { t } = ctx;
  const d = c.build(ctx);
  const name = pick(ctx, c.name);
  const concept = c.kind === 'concept';
  const total = d.sections.length;
  const num = (i) => String(i + 1).padStart(2, '0');
  const toc = d.sections.map((s, i) => `<li><a href="#${s.id}"><span>${num(i)}</span>${s.label}</a></li>`).join('');
  const links = (d.links || [])
    .map((l, i) => (l.internal ? `<a class="btn${i ? ' btn-o' : ''}" href="${l.href}">${l.label}${icon('up')}</a>` : ext(ctx, l.href, l.label, `btn${i ? ' btn-o' : ''}`)))
    .join('');
  const exec = `<section class="ex" aria-labelledby="ex-h"><div class="wrap"><h2 id="ex-h" class="ex-h">${t('In one minute', 'En un minuto')}</h2><div class="ex-g"><div><h3>${t('Problem', 'Problema')}</h3><p>${d.exec.problem}</p></div><div><h3>${t('Approach', 'Enfoque')}</h3><p>${d.exec.approach}</p></div><div><h3>${t('Outcome', 'Resultado')}</h3><p>${d.exec.outcome}</p></div></div></div></section>`;
  const sections = d.sections
    .map((s, i) => `<section class="cs" id="${s.id}" aria-labelledby="${s.id}-h" data-label="${esc(plain(s.label))}"><div class="wrap"><div class="cs-g"><p class="cs-l"><span>${num(i)}</span>${s.label}</p><h2 id="${s.id}-h">${s.title}</h2>${s.raw ? '' : `${s.wide && !s.wideAfter ? `<div class="cs-w">${s.wide}</div>` : ''}<div class="cs-b">${s.body || ''}</div>`}${s.raw ? `<div class="cs-raw">${s.raw}</div>` : ''}</div></div></section>`)
    .join('\n');
  const nx = next.build(ctx);
  const nextName = pick(ctx, next.name);
  const body = `<article>
<header class="ch"><div class="wrap">
<p class="ch-bk"><a class="tl" href="${ctx.home(concept ? '#concepts' : '#work')}">${icon('back')}${t('All work', 'Todos los proyectos')}</a></p>
<p class="ch-ty">${concept ? `<span class="tag">${t('Concept project', 'Proyecto conceptual')}</span> ` : ''}${pick(ctx, c.type)}</p>
<h1>${name}</h1>
<p class="ch-tg">${d.tagline}</p>
</div>
<div class="wrap ch-cv">${cover(ctx, c.slug, { alt: d.coverAlt, eager: true })}</div>
<div class="wrap ch-ov"><section aria-labelledby="ov-h"><h2 id="ov-h" class="vh">${t('Project overview', 'Resumen del proyecto')}</h2>${dl(d.overview, 'ov')}</section>
<div class="ch-ln">${links}</div>${d.note ? `<p class="ch-nt">${d.note}</p>` : ''}</div></header>
<nav class="cb" aria-label="${t('Case sections', 'Secciones del caso')}"><div class="wrap cb-in"><details class="cb-d"><summary><span class="cb-n">${name}</span><span class="cb-s" data-current>${t('Contents', 'Contenido')}</span>${icon('plus')}</summary><ol>${toc}</ol></details><span class="cb-p" aria-hidden="true"><i></i></span></div></nav>
${exec}
${sections}
</article>
<aside class="nx" aria-label="${t('Next case', 'Siguiente caso')}"><div class="wrap"><a class="nx-a" href="${ctx.caseUrl(next.slug)}"><span class="nx-t"><span class="nx-k">${t('Next case', 'Siguiente caso')}</span><span class="nx-n">${nextName}</span><span class="nx-d">${nx.tagline}</span></span>${cover(ctx, next.slug, { alt: '', scale: 0.5, vt: true })}</a></div></aside>`;
  const person = PERSON(ctx);
  const url = ctx.abs(ctx.pagePath);
  return page(ctx, {
    title: pick(ctx, c.seo.title),
    description: pick(ctx, c.seo.description),
    paths: { en: casePath('en', c.slug), es: casePath('es', c.slug) },
    og: c.slug,
    ogType: 'article',
    ogAlt: d.coverAlt,
    versions,
    current: 'case',
    cls: `p-case p-${c.slug}`,
    styles: concept ? ['concept'] : undefined,
    css: c.css,
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'CreativeWork',
          name,
          headline: pick(ctx, c.seo.title).split(' | ')[0],
          description: pick(ctx, c.seo.description),
          url,
          inLanguage: ctx.lang,
          image: ctx.abs(`assets/og/${c.slug}-${ctx.lang}.jpg`),
          genre: concept ? t('Concept case study', 'Caso de estudio conceptual') : t('Case study', 'Caso de estudio'),
          creativeWorkStatus: concept ? 'Concept' : undefined,
          author: { '@id': person['@id'] },
          isPartOf: { '@id': SITE.origin + SITE.base + '#website' }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Lucía Miranda', item: ctx.abs(ctx.lang === 'es' ? 'es/' : '') },
            { '@type': 'ListItem', position: 2, name, item: url }
          ]
        }
      ]
    },
    body
  });
}
