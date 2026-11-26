import { SITE, EXPERIENCE, EDUCATION } from '../content/site.mjs';
import { FEATURED, CONCEPTS, ARCHIVE } from '../content/projects.mjs';
import { IMAGES, picture, icon, ext, dl, homePath, esc } from '../lib/html.mjs';
import { phone, laptop, browser } from '../lib/device.mjs';
import { cover, coverControls } from '../covers.mjs';
import { page, cvLink, PERSON } from './layout.mjs';
import { stateDemo } from './state-demo.mjs';

const pick = (ctx, o) => o[ctx.lang];

function hero(ctx) {
  const { t } = ctx;
  const ref = (n, label) => {
    const words = label.split(' ');
    const last = words.pop();
    const head = words.length ? `<span class="rf">${words.join(' ')} </span>` : '';
    return `${head}<span class="nb"><span class="rf">${last}</span><sup><a href="#proof-${n}" aria-label="${t(`Proof ${n}`, `Prueba ${n}`)}">${n}</a></sup></span>`;
  };
  const proofs = [
    [t('Four roles in every order: customer, restaurant, rider and admin.', 'Cuatro roles en cada pedido: cliente, local, rider y administración.'), 'MODO YA', ctx.caseUrl('modo-ya'), 'linear-gradient(150deg,#ffe07a,#f5c518 60%,#e0a800)', phone(ctx, 'modoya-c-way', { sizes: '150px', eager: true })],
    [t('Four dashboards and six spreadsheets became one portal.', 'Cuatro tableros y seis planillas pasaron a ser un portal.'), t('BYD Quality Portal', 'Portal de Calidad BYD'), ctx.caseUrl('byd-quality-portal'), 'linear-gradient(150deg,#6db3ee,#2a72bb 55%,#174b83)', laptop(ctx, 'byd-overview', { sizes: '260px', eager: true }), 'pf-w'],
    [t('25 screens taken from design to React, in a team of two.', '25 pantallas llevadas del diseño a React, en un equipo de dos.'), 'Padel Hub', ctx.caseUrl('padel-hub'), 'linear-gradient(150deg,#e6ff7a,#d0f53f 55%,#a9d40f)', phone(ctx, 'padel-m-slots', { sizes: '150px', eager: true })]
  ];
  const facts = [
    [t('Experience', 'Experiencia'), t('5 years', '5 años'), t('across product, UX/UI and front-end', 'entre producto, UX/UI y front-end')],
    [t('Portfolio', 'Portfolio'), t('14 projects', '14 proyectos'), t('seven told as full case studies', 'siete contados como casos completos')],
    [t('Scope', 'Alcance'), t('End-to-end product design', 'Diseño de producto de punta a punta'), t('from discovery to design QA', 'del descubrimiento al design QA')],
    [t('Strengths', 'Perfil'), t('UX/UI, product strategy, front-end', 'UX/UI, estrategia de producto, front-end'), t('design first, with technical depth', 'primero diseño, con base técnica')],
    [t('Availability', 'Disponibilidad'), t('Open to international roles', 'Disponible para roles internacionales'), t('remote, from Argentina (UTC−3)', 'remoto, desde Argentina (UTC−3)')]
  ];
  return `<section class="hero"><div class="wrap">
<div class="hero-g">
<h1 class="hero-h"><span class="hero-nm">Lucía Miranda<span class="vh">, </span></span><span class="hero-ro">${t('Senior UX/UI & <br class="br-d"/>Product Designer', 'Diseñadora Senior <br class="br-d"/>UX/UI y de Producto')}</span></h1>
<figure class="hero-ph">${picture(ctx, 'portrait', { alt: t('Portrait of Lucía Miranda', 'Retrato de Lucía Miranda'), sizes: '(min-width: 1101px) 420px, (min-width: 701px) 30vw, 84px', eager: true })}</figure>
<div class="hero-tx"><p class="hero-st">${t(
    `I design intuitive, scalable digital experiences that connect ${ref(1, 'user needs')}, ${ref(2, 'business goals')} and ${ref(3, 'technology')}.`,
    `Diseño experiencias digitales intuitivas y escalables que conectan ${ref(1, 'necesidades de usuarios')}, ${ref(2, 'objetivos de negocio')} y ${ref(3, 'tecnología')}.`
  )}</p>
<p class="hero-sb">${t(
    'Five years across product management, UX/UI and front-end. I work on products with many roles and many edge cases, from research to implementation. Writing code keeps my designs honest about what can be built.',
    'Cinco años entre gestión de producto, UX/UI y front-end. Trabajo en productos con muchos roles y muchos casos límite, de la investigación a la implementación. Escribir código mantiene mis diseños honestos sobre lo que se puede construir.'
  )}</p>
<p class="hero-ct"><a class="btn" href="#work">${t('Explore my work', 'Explorar mi trabajo')}</a>${cvLink(ctx, t('Download résumé', 'Descargar CV'), 'btn btn-o')}<a class="tl" href="#contact">${t('Get in touch', 'Contactarme')}${icon('arrow')}</a></p></div>
</div>
<ol class="pfs" aria-label="${t('Proof for each claim', 'Prueba de cada afirmación')}">${proofs.map(([x, n, u, bg, dev, cls = ''], i) => `<li id="proof-${i + 1}" class="pf"><a href="${u}"><span class="pf-th ${cls}" aria-hidden="true" style="background:${bg}">${dev}</span><span class="pf-tx"><span class="pf-n" aria-hidden="true">${i + 1}</span><span class="pf-c">${x}</span><span class="pf-l">${n}${icon('arrow')}</span></span></a></li>`).join('')}</ol>
<dl class="facts">${facts.map(([k, v, s]) => `<div><dt>${k}</dt><dd><b>${v}</b><span>${s}</span></dd></div>`).join('')}</dl>
</div></section>`;
}

function work(ctx) {
  const { t } = ctx;
  const feats = FEATURED.map((p, i) => {
    const url = ctx.caseUrl(p.slug);
    const name = pick(ctx, p.name);
    return `<li class="ft-p${i === 0 ? ' ft-first' : i % 2 ? '' : ' ft-rev'}"><article>
<div class="ft-md"><a class="ft-cv" href="${url}" tabindex="-1" aria-hidden="true">${cover(ctx, p.slug, { alt: name, scale: i === 0 ? 1 : 0.66, play: true })}</a>${coverControls(ctx, p.slug)}</div>
<div class="ft-bd">
<p class="ft-ty">${pick(ctx, p.type)}</p>
<h3><a href="${url}">${name}</a></h3>
<p class="ft-cl">${pick(ctx, p.claim)}</p>
<p class="ft-tx">${pick(ctx, p.text)}</p>
${dl(p.facts.map(([k, v]) => [pick(ctx, k), pick(ctx, v)]), 'ft-fa')}
<a class="tl tl-b" href="${url}">${t(`Read the ${name} case`, `Leer el caso ${name}`)}${icon('arrow')}</a>
</div></article></li>`;
  });
  const concepts = CONCEPTS.map((p) => {
    const name = pick(ctx, p.name);
    const url = ctx.caseUrl(p.slug);
    return `<li class="cp"><article>
<div class="cp-md"><a class="cp-cv" href="${url}" tabindex="-1" aria-hidden="true">${cover(ctx, p.slug, { alt: name, play: true, tall: true })}</a>${coverControls(ctx, p.slug, { steps: false })}</div>
<p class="ft-ty"><span class="tag">${t('Concept', 'Concepto')}</span> ${pick(ctx, p.sector)}</p>
<h3><a href="${url}">${name}</a></h3>
<p class="cp-cl">${pick(ctx, p.claim)}</p>
<p class="cp-sk"><b>${t('Shows:', 'Demuestra:')}</b> ${pick(ctx, p.skills)}</p>
<p class="cp-ln"><a class="btn btn-s" href="${ctx.root}casos/prototipos/${p.proto}.html?lang=${ctx.lang}" data-live="${name}">${icon('hand')}${t('Use the prototype', 'Usar el prototipo')}<span class="vh"> ${t('of', 'de')} ${name}</span></a><a class="tl" href="${url}">${t(`Read the case`, `Leer el caso`)}<span class="vh">: ${name}</span>${icon('arrow')}</a></p>
</article></li>`;
  });
  const archive = ARCHIVE.map((p) => {
    const tall = p.tall && IMAGES[p.tall];
    const frame = tall ? { img: p.tall, scroll: `${(-(1 - 0.625 / (tall.h / tall.w)) * 100).toFixed(2)}%` } : p.img;
    return `<li class="ar-c"><article>${browser(ctx, frame, { ratio: '16/10', url: p.host, alt: t(`Screenshot of ${p.name}`, `Captura de ${p.name}`), sizes: '(min-width: 1101px) 420px, (min-width: 701px) 46vw, 78vw' })}<h3><a href="${p.url}" target="_blank" rel="noopener">${p.name}<span class="vh"> (${t('opens in a new tab', 'se abre en otra pestaña')})</span>${icon('up')}</a></h3><p class="ar-w">${pick(ctx, p.what)}</p><p class="ar-x">${pick(ctx, p.text)}</p><p class="ar-k">${pick(ctx, p.kind)} · ${p.tools}</p></article></li>`;
  });
  return `<section class="sec" id="work" aria-labelledby="work-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Selected work', 'Trabajo seleccionado')}</p><h2 id="work-h">${t('Products with many roles, many rules and real constraints.', 'Productos con muchos roles, muchas reglas y restricciones reales.')}</h2></header>
<ol class="feats">${feats.join('')}</ol>
</div></section>
<section class="sec sec-tint" id="concepts" aria-labelledby="con-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Concept work', 'Trabajo conceptual')}</p><div><h2 id="con-h">${t('Three concepts, each to go deeper into a skill.', 'Tres conceptos para profundizar una habilidad.')}</h2><p class="sh-p">${t('No client and no launch behind them. Each one goes from research to validation and ends in a prototype you can use.', 'Sin cliente ni lanzamiento detrás. Cada uno va de la investigación a la validación y termina en un prototipo que se puede usar.')}</p></div></header>
<ul class="cps snap" role="list">${concepts.join('')}</ul>
</div></section>
<section class="sec" id="archive" aria-labelledby="arc-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Archive', 'Archivo')}</p><div><h2 id="arc-h">${t('Interface and web work.', 'Interfaces y sitios web.')}</h2><p class="sh-p">${t('Smaller pieces: client sites, studio work and prototypes.', 'Piezas más chicas: sitios para clientes, trabajos de estudio y prototipos.')}</p></div></header>
<ul class="ars snap" role="list">${archive.join('')}</ul>
</div></section>`;
}

// Cada etapa muestra un fragmento de un entregable real.
function approach(ctx) {
  const { t } = ctx;
  const steps = [
    {
      n: '01', h: t('Discover', 'Descubrir'),
      p: t('I look at what people already use: tools, spreadsheets, messages. The output is a list of questions ranked by how much they block.', 'Miro lo que la gente ya usa: herramientas, planillas, mensajes. El resultado es una lista de preguntas ordenadas por cuánto bloquean.'),
      a: `<ol class="ar ar-q"><li><span>${t('Is delivery paid in cash or digitally?', '¿El envío se paga en efectivo o digital?')}</span><i style="--w:100%"></i></li><li><span>${t('Which documents does a rider need?', '¿Qué documentación necesita un rider?')}</span><i style="--w:78%"></i></li><li><span>${t('What happens to a canceled order?', '¿Qué pasa con un pedido cancelado?')}</span><i style="--w:62%"></i></li></ol>`,
      l: [t('MODO YA, client questions', 'MODO YA, preguntas a la clienta'), ctx.caseUrl('modo-ya', '#research')]
    },
    {
      n: '02', h: t('Define', 'Definir'),
      p: t('I reduce findings to one problem, the roles involved and the rules that can’t break. What each person must not see counts as much as what they see.', 'Reduzco los hallazgos a un problema, los roles y las reglas que no se pueden romper. Lo que alguien no debe ver cuenta tanto como lo que ve.'),
      a: `<table class="ar ar-m"><caption class="vh">${t('Access per role', 'Acceso por rol')}</caption><thead><tr><td></td><th scope="col">${t('See', 'Ver')}</th><th scope="col">${t('Edit', 'Editar')}</th></tr></thead><tbody><tr><th scope="row">${t('Quality', 'Calidad')}</th><td>${t('All', 'Todo')}</td><td>${t('Operations', 'Operativo')}</td></tr><tr><th scope="row">${t('Salesperson', 'Vendedor')}</th><td>${t('Own', 'Lo suyo')}</td><td>${t('Own', 'Lo suyo')}</td></tr><tr><th scope="row">${t('Management', 'Gerencia')}</th><td>${t('All', 'Todo')}</td><td>${t('None', 'Nada')}</td></tr></tbody></table>`,
      l: [t('BYD, roles and permissions', 'BYD, roles y permisos'), ctx.caseUrl('byd-quality-portal', '#flows')]
    },
    {
      n: '03', h: t('Design', 'Diseñar'),
      p: t('Structure before style: flow, states and exceptions first, then interface and tokens. Each step asks for a single decision.', 'Estructura antes que estilo: primero flujo, estados y excepciones; después interfaz y tokens. Cada paso pide una sola decisión.'),
      a: `<ol class="ar ar-f"><li>${t('Day', 'Día')}</li><li>${t('Slot', 'Turno')}</li><li>Extras</li><li class="on">${t('Deposit', 'Seña')}</li></ol><ul class="ar ar-s" aria-label="${t('Slot states', 'Estados del turno')}"><li class="s1">11:00</li><li class="s2">12:30</li><li class="s3"><s>09:30</s></li></ul>`,
      l: [t('Padel Hub, booking flow', 'Padel Hub, flujo de reserva'), ctx.caseUrl('padel-hub', '#flows')]
    },
    {
      n: '04', h: t('Validate', 'Validar'),
      p: t('I review against heuristics, tasks and the real system, and rate each finding by severity. What isn’t tested is written down as open.', 'Reviso contra heurísticas, tareas y el sistema real, y califico cada hallazgo por gravedad. Lo que no se probó queda escrito como pendiente.'),
      a: `<ul class="ar ar-v"><li><b>3</b><span class="d"></span><span class="d"></span></li><li><b>2</b><span class="d"></span><span class="d"></span></li><li><b>1</b><span class="d"></span><span class="d o"></span></li></ul><p class="ar-n">${t('Severity. 6 issues found, 5 fixed, 1 open', 'Gravedad. 6 problemas, 5 corregidos, 1 pendiente')}</p>`,
      l: [t('Turno, heuristic evaluation', 'Turno, evaluación heurística'), ctx.caseUrl('turno', `#${t('validation', 'validacion')}`)]
    },
    {
      n: '05', h: t('Deliver', 'Entregar'),
      p: t('I agree components, permissions and edge cases with whoever builds them, and often build them myself. Design QA happens on the running product.', 'Acuerdo componentes, permisos y casos límite con quien los construye, y muchas veces los construyo. El design QA se hace sobre el producto andando.'),
      a: `<ul class="ar ar-t"><li><i style="background:#d4f84a"></i><code>primary-container</code></li><li><i style="background:#536600"></i><code>primary</code></li><li><i style="background:#f9f9f9"></i><code>surface</code></li></ul>`,
      l: [t('Padel Hub, tokens in code', 'Padel Hub, tokens en código'), ctx.caseUrl('padel-hub', '#design-system')]
    },
    {
      n: '06', h: t('Iterate', 'Iterar'),
      p: t('Small releases, each one closing something. I prefer knowing what is missing to announcing that it is finished.', 'Versiones chicas, cada una cierra algo. Prefiero saber qué falta antes que anunciar que está terminado.'),
      a: `<div class="ar ar-b" role="img" aria-label="${t('15 builds in two months', '15 versiones en dos meses')}">${'<i></i>'.repeat(15)}</div><p class="ar-n">${t('15 builds, September to October 2026', '15 versiones, septiembre a octubre de 2026')}</p>`,
      l: [t('MODO YA, releases', 'MODO YA, versiones'), ctx.caseUrl('modo-ya', '#implementation')]
    }
  ];
  return `<section class="sec" id="approach" aria-labelledby="app-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('How I work', 'Cómo trabajo')}</p><div><h2 id="app-h">${t('How a project moves from question to release.', 'Cómo avanza un proyecto, de la pregunta a la versión publicada.')}</h2><p class="sh-p">${t('Six stages, each with a piece of a real deliverable.', 'Seis etapas, cada una con un fragmento de un entregable real.')}</p></div></header>
<ol class="stg snap" role="list">${steps.map((s) => `<li><p class="stg-n" aria-hidden="true">${s.n}</p><h3>${s.h}</h3><p>${s.p}</p><div class="stg-a">${s.a}</div><a class="tl" href="${s.l[1]}">${s.l[0]}${icon('arrow')}</a></li>`).join('')}</ol>
</div></section>`;
}

function bridge(ctx) {
  const { t } = ctx;
  const items = [
    [t('Feasible interfaces', 'Interfaces viables'), t('Two apps instead of one, because background location would most likely have been rejected by the stores.', 'Dos apps en lugar de una, porque las tiendas probablemente habrían rechazado la ubicación en segundo plano.'), 'MODO YA', ctx.caseUrl('modo-ya', '#exploration')],
    [t('Component architecture', 'Arquitectura de componentes'), t('One design system in shared packages, used by two apps.', 'Un sistema de diseño en paquetes compartidos, usado por dos apps.'), 'MODO YA', ctx.caseUrl('modo-ya', '#implementation')],
    [t('APIs and limits', 'APIs y límites'), t('Platform rules read as interface states, such as a 24-hour reply window.', 'Reglas de la plataforma leídas como estados de interfaz, como una ventana de respuesta de 24 horas.'), 'UcoBot', ctx.caseUrl('ucobot', '#research')],
    [t('Data and permissions', 'Datos y permisos'), t('Access rules that live in the database and not only in hidden buttons.', 'Reglas de acceso que viven en la base de datos y no sólo en botones ocultos.'), 'BYD', ctx.caseUrl('byd-quality-portal', '#exploration')],
    [t('Design QA', 'Design QA'), t('Time-zone errors, covered menus and broken dark mode found and fixed on the running product.', 'Errores de zona horaria, menús tapados y modo oscuro corregidos sobre el producto andando.'), 'Padel Hub', ctx.caseUrl('padel-hub', '#exploration')]
  ];
  return `<section class="sec sec-dark" id="design-and-code" aria-labelledby="br-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Design and code', 'Diseño y código')}</p><div><h2 id="br-h">${t('Bridging the gap between design and development.', 'Un puente entre el diseño y el desarrollo.')}</h2><p class="sh-p">${t('Knowing how it is built changes what I draw: what happens while it loads, when it fails and when someone gets it wrong is designed before the ideal case is polished.', 'Saber cómo se construye cambia lo que dibujo: qué pasa mientras carga, cuando falla y cuando alguien se equivoca se diseña antes de pulir el caso ideal.')}</p></div></header>
<ul class="brs">${items.map(([h, p, n, u]) => `<li><h3>${h}</h3><p>${p}</p><a href="${u}">${n}</a></li>`).join('')}</ul>
${stateDemo(ctx)}
</div></section>`;
}

function skills(ctx) {
  const { t } = ctx;
  const c = (slug, hash = '') => ctx.caseUrl(slug, hash);
  const an = (en, es) => `#${t(en, es)}`;
  const groups = [
    [t('Product & UX', 'Producto y UX'), [
      [t('UX research', 'Investigación UX'), 'Turno', c('turno', an('research', 'investigacion'))],
      [t('User journeys', 'Recorridos de usuario'), 'MODO YA', c('modo-ya', '#flows')],
      [t('Information architecture', 'Arquitectura de información'), 'UcoBot', c('ucobot', '#flows')],
      [t('User flows', 'Flujos de usuario'), 'Padel Hub', c('padel-hub', '#flows')],
      [t('Interaction design', 'Diseño de interacción'), 'Ruta del Vino', c('ruta-del-vino', an('decisions', 'decisiones'))],
      [t('Product strategy', 'Estrategia de producto'), 'MODO YA', c('modo-ya', '#exploration')],
      [t('Usability', 'Usabilidad'), 'Turno', c('turno', an('validation', 'validacion'))]
    ]],
    [t('UI & design systems', 'UI y sistemas de diseño'), [
      ['Figma', 'UcoBot', c('ucobot')],
      [t('Prototyping', 'Prototipado'), 'Alcancía', c('alcancia', an('final-ui', 'ui'))],
      [t('Design systems', 'Sistemas de diseño'), 'Padel Hub', c('padel-hub', '#design-system')],
      [t('Component libraries', 'Librerías de componentes'), 'BYD', c('byd-quality-portal', '#design-system')],
      [t('Responsive design', 'Diseño responsive'), 'BYD', c('byd-quality-portal', '#solution')],
      [t('Accessibility', 'Accesibilidad'), t('Contrast audits', 'Auditorías de contraste'), c('ucobot', '#design-system')]
    ]],
    [t('Development', 'Desarrollo'), [
      ['React, TypeScript', 'BYD', c('byd-quality-portal', '#implementation')],
      ['Tailwind CSS', 'Padel Hub', c('padel-hub', '#implementation')],
      ['Next.js', 'Estudio AGV', '#archive'],
      ['JavaScript', t('Prototypes', 'Prototipos'), `${ctx.root}casos/prototipos/turno.html?lang=${ctx.lang}`],
      ['HTML, CSS', 'Estudio AGV', '#archive'],
      ['Supabase', 'MODO YA', c('modo-ya', '#implementation')],
      [t('REST APIs', 'APIs REST'), t('Résumé', 'CV'), `${ctx.root}${SITE.cv[ctx.lang].file}`]
    ]],
    [t('Collaboration & delivery', 'Colaboración y entrega'), [
      ['Agile, Scrum, Kanban', t('Résumé', 'CV'), `${ctx.root}${SITE.cv[ctx.lang].file}`],
      [t('Stakeholder management', 'Gestión de stakeholders'), 'MODO YA', c('modo-ya', '#research')],
      [t('Product management', 'Gestión de producto'), t('Career', 'Trayectoria'), '#career'],
      [t('Design handoff', 'Handoff de diseño'), 'Padel Hub', c('padel-hub', '#implementation')],
      [t('Adoption and guides', 'Adopción y guías'), 'BYD', c('byd-quality-portal', '#implementation')]
    ]]
  ];
  return `<section class="sec" id="skills" aria-labelledby="sk-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Skills', 'Habilidades')}</p><h2 id="sk-h">${t('Each skill, with a place to check it.', 'Cada habilidad, con un lugar donde comprobarla.')}</h2></header>
<div class="sks">${groups.map(([h, list]) => `<details class="sk" open><summary><h3>${h}</h3>${icon('plus')}</summary><ul>${list.map(([n, l, u]) => `<li><span>${n}</span><a href="${u}"><span class="vh">${n}: </span>${l}</a></li>`).join('')}</ul></details>`).join('')}</div>
</div></section>`;
}

function about(ctx) {
  const { t } = ctx;
  const cert = (c) => `${ctx.root}${encodeURI(c)}`;
  return `<section class="sec sec-tint" id="about" aria-labelledby="ab-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('About', 'Sobre mí')}</p><h2 id="ab-h">${t('I came to design through product.', 'Llegué al diseño desde producto.')}</h2></header>
<div class="ab">${dl([[t('Languages', 'Idiomas'), t('Spanish (native), English (intermediate)', 'Español (nativo), inglés (intermedio)')], [t('Location', 'Ubicación'), t('Mendoza, Argentina (UTC−3)', 'Mendoza, Argentina (UTC−3)')], [t('Looking for', 'Busco'), t('Senior UX/UI, Product Designer or Design Engineer roles', 'Roles Senior UX/UI, Product Designer o Design Engineer')]], 'ab-dl')}<div class="ab-tx">
<p class="lede">${t(
    'I started in 2022 as a freelance product manager: gathering requirements, ordering priorities and keeping clients and developers talking about the same thing. In 2023 I moved into UX/UI and front-end, to decide not only what gets built but how it works.',
    'Empecé en 2022 como product manager freelance: relevar requerimientos, ordenar prioridades y lograr que clientes y desarrolladores hablaran de lo mismo. En 2023 pasé a UX/UI y front-end, para decidir no sólo qué se construye sino cómo funciona.'
  )}</p>
<p>${t(
    'I approach a problem by looking at how people already work. In the BYD portal that meant keeping the spreadsheets the team trusted. In MODO YA, letting restaurants keep selling on WhatsApp. Several times the best decision was to change less.',
    'Para encarar un problema miro cómo trabaja hoy la gente. En el portal de BYD eso significó mantener las planillas en las que el equipo confiaba. En MODO YA, dejar que los locales siguieran vendiendo por WhatsApp. Varias veces la mejor decisión fue cambiar menos.'
  )}</p>
<p>${t(
    'I like products that have to work every day for people who didn’t choose them: a quality team, whoever runs a club, a rider between two deliveries. I enjoy sitting with the different areas involved, agreeing on the rules and then seeing the interface hold up.',
    'Me gustan los productos que tienen que funcionar todos los días para personas que no los eligieron: un equipo de calidad, quien gestiona un club, un rider entre dos envíos. Disfruto sentarme con las distintas áreas, acordar las reglas y después ver que la interfaz se sostiene.'
  )}</p>
<p>${t(
    'I work from Mendoza, Argentina, and I’m looking for a product team, remote and international, where design takes part in deciding what to build.',
    'Trabajo desde Mendoza, Argentina, y busco un equipo de producto, remoto e internacional, donde diseño participe en decidir qué construir.'
  )}</p>
</div>
<div class="ab-cv" id="career"><h3>${t('Experience', 'Experiencia')}</h3><ol class="tm">${EXPERIENCE.map((e) => `<li><p class="tm-w">${pick(ctx, e.when)}</p><h4>${pick(ctx, e.role)}</h4><p class="tm-p">${pick(ctx, e.where)}</p><p>${pick(ctx, e.text)}</p></li>`).join('')}</ol>
<h3>${t('Education', 'Formación')}</h3><ul class="ed">${EDUCATION.map((e) => `<li><span class="ed-t">${pick(ctx, e.title)}</span><span class="ed-w">${e.where}</span><span class="ed-d">${pick(ctx, e.when)}</span>${e.cert ? `<a href="${cert(e.cert)}" target="_blank" rel="noopener">${t('Certificate', 'Certificado')}<span class="vh">: ${pick(ctx, e.title)} (${t('PDF, opens in a new tab', 'PDF, se abre en otra pestaña')})</span></a>` : ''}</li>`).join('')}</ul>
<p class="ab-dw">${cvLink(ctx, t('Download résumé', 'Descargar CV'), 'btn btn-o')}</p></div></div>
</div></section>`;
}

function contact(ctx) {
  const { t } = ctx;
  const other = ctx.lang === 'en' ? 'es' : 'en';
  const cvOther = SITE.cv[other];
  return `<section class="sec sec-dark ctc" id="contact" aria-labelledby="ct-h"><div class="wrap">
<header class="sh"><p class="sh-l">${t('Contact', 'Contacto')}</p><h2 id="ct-h">${t('Let’s build meaningful digital experiences together.', 'Construyamos juntos experiencias digitales con sentido.')}</h2></header>
<div class="ctc-g"><div class="ctc-m"><a class="ctc-e" href="mailto:${SITE.email}">${SITE.email.replace('@', '<wbr/>@')}</a>
<p class="ctc-a"><button type="button" class="btn btn-l" data-copy="${SITE.email}" data-ok="${t('Email copied', 'Correo copiado')}">${icon('copy')}${t('Copy email', 'Copiar correo')}</button>${ext(ctx, SITE.linkedin, 'LinkedIn', 'btn btn-lo')}${cvLink(ctx, t('Résumé in English', 'CV en español'), 'btn btn-lo')}<a class="btn btn-lo" href="${ctx.root}${cvOther.file}" download="${cvOther.download}" type="application/pdf" hreflang="${other}">${t('Résumé in Spanish', 'CV en inglés')}${icon('down')}</a></p></div>
<dl class="ctc-d"><div><dt>${t('Location', 'Ubicación')}</dt><dd>Mendoza, Argentina</dd></div><div><dt>${t('Work', 'Modalidad')}</dt><dd>${t('Remote, open to international opportunities', 'Remoto, con apertura a oportunidades internacionales')}</dd></div><div><dt>${t('Time zone', 'Zona horaria')}</dt><dd data-overlap data-one="${esc(t('It’s {time} in Mendoza. With your time zone we share about {h} working hours a day.', 'En Mendoza son las {time}. Con tu zona horaria compartimos unas {h} horas laborales por día.'))}" data-same="${esc(t('It’s {time} in Mendoza, the same time as where you are.', 'En Mendoza son las {time}, la misma hora que en tu zona.'))}">${t('UTC−3. Seven to eight shared working hours with New York, four to five with Central Europe.', 'UTC−3. Siete a ocho horas laborales en común con Nueva York, cuatro a cinco con Europa Central.')}</dd></div></dl></div>
</div></section>`;
}

export function homePage(ctx, versions) {
  const { t } = ctx;
  const title = t('Lucía Miranda | Senior UX/UI & Product Designer', 'Lucía Miranda | Diseñadora Senior UX/UI y de Producto');
  const description = t(
    'Senior UX/UI & Product Designer in Argentina. SaaS, marketplaces and enterprise platforms, designed end to end with front-end knowledge. Open to international roles.',
    'Diseñadora Senior UX/UI y de Producto en Argentina. SaaS, marketplaces y plataformas empresariales de punta a punta, con base front-end. Abierta a roles internacionales.'
  );
  return page(ctx, {
    title,
    description,
    paths: { en: homePath('en'), es: homePath('es') },
    og: 'home',
    versions,
    cls: 'p-home',
    jsonld: {
      '@context': 'https://schema.org',
      '@graph': [
        PERSON(ctx),
        { '@type': 'WebSite', '@id': SITE.origin + SITE.base + '#website', url: SITE.origin + SITE.base, name: 'Lucía Miranda', inLanguage: ['en', 'es'], author: { '@id': SITE.origin + SITE.base + '#lucia-miranda' } },
        { '@type': 'ProfilePage', url: ctx.abs(ctx.pagePath), name: title, description, inLanguage: ctx.lang, mainEntity: { '@id': SITE.origin + SITE.base + '#lucia-miranda' }, isPartOf: { '@id': SITE.origin + SITE.base + '#website' } }
      ]
    },
    body: hero(ctx) + work(ctx) + approach(ctx) + bridge(ctx) + skills(ctx) + about(ctx) + contact(ctx)
  });
}
