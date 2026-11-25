import { figure, phones, table, evidence, decisions, swatches, contrast, metrics, ul } from '../lib/html.mjs';
import { flow } from '../lib/diagrams.mjs';

export default {
  slug: 'byd-quality-portal',
  kind: 'product',
  name: { en: 'BYD Quality Portal', es: 'Portal de Calidad BYD' },
  type: { en: 'Enterprise platform', es: 'Plataforma empresarial' },
  seo: {
    title: { en: 'BYD Quality Portal: enterprise dashboard redesign | Lucía Miranda', es: 'Portal de Calidad BYD: rediseño de tableros empresariales | Lucía Miranda' },
    description: {
      en: 'Case study: four Power BI dashboards and six spreadsheets replaced by one quality portal for a BYD dealership, with six roles and automatic updates.',
      es: 'Caso de estudio: cuatro tableros de Power BI y seis planillas reemplazados por un portal de calidad para un concesionario BYD, con seis roles y actualización automática.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const link = 'https://lucim2003.github.io/byd-calidad-demo/';
    return {
      tagline: t(
        'Four dashboards and six spreadsheets, replaced by one portal that updates itself and shows each person only what they need.',
        'Cuatro tableros y seis planillas, reemplazados por un portal que se actualiza solo y le muestra a cada persona lo que necesita.'
      ),
      coverAlt: t(
        'Overview of the quality portal on desktop and the early detection screen on a phone.',
        'Resumen general del portal de calidad en escritorio y la pantalla de detección temprana en un celular.'
      ),
      overview: [
        [t('Industry', 'Industria'), t('Automotive, quality and customer experience', 'Automotriz, calidad y experiencia de cliente')],
        [t('Product', 'Producto'), t('Internal web app, installable on desktop and mobile', 'Aplicación web interna, instalable en escritorio y celular')],
        [t('My role', 'Mi rol'), t('End-to-end UX/UI design and development', 'Diseño UX/UI y desarrollo de punta a punta')],
        [t('Responsibilities', 'Responsabilidades'), t('Audit of sources, roles and permissions, information architecture, dashboards, front-end, adoption guide', 'Relevamiento de fuentes, roles y permisos, arquitectura de información, dashboards, front-end, guía de adopción')],
        [t('Stakeholders', 'Stakeholders'), t('The Quality team of an official BYD dealership in Mendoza, Argentina', 'El equipo de Calidad de un concesionario oficial BYD en Mendoza, Argentina')],
        [t('Timeline', 'Duración'), t('Since September 2026', 'Desde septiembre de 2026')],
        [t('Tools', 'Herramientas'), 'Figma, React, TypeScript, Supabase, Recharts'],
        [t('Status', 'Estado'), t('In use. A public demo runs on sample data', 'En uso. Hay una demo pública con datos de ejemplo')]
      ],
      links: [{ href: link, label: t('Open the public demo', 'Abrir la demo pública') }],
      note: t(
        'Every screen comes from the public demo. Names, phone numbers and figures are sample data, and no internal information is shown.',
        'Todas las pantallas son de la demo pública. Los nombres, teléfonos y cifras son datos de ejemplo y no se muestra información interna.'
      ),
      exec: {
        problem: t(
          'Quality data lived in six Excel files and four Power BI dashboards kept up to date by hand. Unhappy customers surfaced in a survey weeks after delivery.',
          'La información de calidad vivía en seis planillas y cuatro tableros de Power BI que se actualizaban a mano. Los clientes disconformes aparecían en una encuesta, semanas después de la entrega.'
        ),
        approach: t(
          'I kept the spreadsheets the team already used as the source and designed around roles: what each person has to do, see and not see. Urgent cases come before any chart.',
          'Mantuve como fuente las planillas que el equipo ya usaba y diseñé a partir de los roles: qué tiene que hacer, ver y no ver cada persona. Lo urgente aparece antes que cualquier gráfico.'
        ),
        outcome: t(
          'One portal instead of four dashboards, six files that sync on their own, six roles with their own permissions, and seconds between saving an Excel file and seeing it on screen.',
          'Un portal en lugar de cuatro tableros, seis planillas que se sincronizan solas, seis roles con permisos propios y segundos entre guardar un Excel y verlo en pantalla.'
        )
      },
      sections: [
        {
          id: 'challenge',
          label: t('The challenge', 'El desafío'),
          title: t('Four dashboards, six spreadsheets and nobody looking at the same thing.', 'Cuatro tableros, seis planillas y nadie mirando lo mismo.'),
          body: `<p class="lede">${t(
            'The Quality team follows factory NPS, workshop NPS, call-center surveys, Mystery Shopper visits, deliveries and audits. Each source lived in its own file and somebody had to keep the dashboards alive.',
            'El equipo de Calidad sigue el NPS de fábrica, el NPS del taller, las encuestas del call center, las visitas de Mystery Shopper, las entregas y las auditorías. Cada fuente vivía en su archivo y alguien tenía que mantener vivos los tableros.'
          )}</p>
          <div class="cols3"><div><h3>${t('Scattered data', 'Datos dispersos')}</h3>${ul([t('Six separate Excel files', 'Seis planillas de Excel distintas'), t('Four Power BI dashboards', 'Cuatro tableros de Power BI'), t('Updating depended on one person', 'Actualizar dependía de una persona')])}</div><div><h3>${t('Late complaints', 'Reclamos tardíos')}</h3>${ul([t('An unhappy customer showed up in a survey weeks after delivery', 'Un cliente disconforme aparecía en la encuesta semanas después de la entrega'), t('By then the problem was harder to fix', 'Para entonces el problema era más difícil de resolver')])}</div><div><h3>${t('Constraints', 'Restricciones')}</h3>${ul([t('How the spreadsheets are filled could not change', 'No se podía cambiar cómo se cargan las planillas'), t('Busy people, often on their phones', 'Personas con poco tiempo, muchas veces desde el celular'), t('Each role must see only what is theirs', 'Cada rol debe ver sólo lo que le corresponde')])}</div></div>
          <blockquote class="pull"><p>${t(
            'How might we get the whole team looking at the same numbers, always up to date, and have an unhappy customer handled before they appear in a survey?',
            '¿Cómo podríamos lograr que todo el equipo vea los mismos números, siempre al día, y que un cliente disconforme se atienda antes de aparecer en una encuesta?'
          )}</p></blockquote>`
        },
        {
          id: 'research',
          label: t('Research & discovery', 'Investigación y descubrimiento'),
          title: t('Start from the files people already trust.', 'Empezar por los archivos en los que la gente ya confía.'),
          body: `<p class="lede">${t(
            'The audit of the existing sources found two problems: where the data lived, and what people typed into it.',
            'El relevamiento de las fuentes encontró dos problemas: dónde vivían los datos y qué escribían las personas en ellos.'
          )}</p>
          <p>${t(
            'Comments written in numeric columns and salespeople entered as “Others” were skewing results without anyone noticing. A faster dashboard with the same doubts would have solved nothing.',
            'Comentarios escritos en columnas numéricas y vendedores cargados como “Otros” distorsionaban los resultados sin que nadie lo notara. Un tablero más rápido con las mismas dudas no habría resuelto nada.'
          )}</p>
          ${evidence(ctx, {
            known: [
              t('Six files feed every metric the team follows', 'Seis planillas alimentan todos los indicadores que sigue el equipo'),
              t('Typing errors were changing the results', 'Los errores de carga cambiaban los resultados'),
              t('Sharing a dashboard meant sharing it whole, with everyone’s results', 'Compartir un tablero era compartirlo entero, con los resultados de todos')
            ],
            assumed: [
              t('A salesperson will report a problem if it takes seconds from the phone', 'Un vendedor avisa un problema si le lleva segundos desde el celular'),
              t('A number with its sample size is trusted more than a number alone', 'Un número con su base genera más confianza que un número solo')
            ],
            open: [
              t('How long Quality takes to call after a report', 'Cuánto tarda Calidad en llamar desde que se reporta'),
              t('How many survey answers are recovered by cleaning the sources', 'Cuántas respuestas se recuperan al corregir las planillas')
            ]
          })}
          <h3>${t('Three principles', 'Tres principios')}</h3>
          <div class="cols3"><div><h4>${t('Nobody enters data twice', 'Nadie carga dos veces')}</h4><p>${t('The portal adapts to the spreadsheets in use, not the other way round.', 'El portal se adapta a las planillas en uso, no al revés.')}</p></div><div><h4>${t('Every number in context', 'Cada número, con contexto')}</h4><p>${t('Each metric says how many cases it is based on and how it compares with the previous month.', 'Cada indicador dice sobre cuántos casos se calcula y cómo viene contra el mes anterior.')}</p></div><div><h4>${t('Urgent first', 'Lo urgente, primero')}</h4><p>${t('A customer nobody has called yet is seen before any chart.', 'Un cliente sin atender se ve antes que cualquier gráfico.')}</p></div></div>`
        },
        {
          id: 'flows',
          label: t('User journeys & flows', 'Recorridos y flujos'),
          title: t('One portal, six ways of using it.', 'Un mismo portal, seis maneras de usarlo.'),
          wide: flow(ctx, t('From the spreadsheets to each role', 'De las planillas a cada rol'), [
            { h: t('Sources that stay as they are', 'Fuentes que no cambian'), items: [{ b: t('Sales', 'Ventas') }, { b: t('BYD app surveys', 'Encuestas app BYD') }, { b: t('Internal surveys', 'Encuestas internas') }, { b: 'Mystery Shopper' }, { b: t('Workshop NPS', 'NPS del taller') }, { b: t('Workshop entries', 'Ingresos al taller') }] },
            { h: t('Automatic sync', 'Sincronización automática'), items: [{ b: t('Watches the folder', 'Vigila la carpeta'), s: t('Seconds after saving', 'Segundos después de guardar'), tone: 'ink' }, { b: t('Never duplicates', 'Nunca duplica'), s: t('Sales by VIN, surveys by ID', 'Ventas por VIN, encuestas por ID'), tone: 'ink' }, { b: t('Discards what it can’t read', 'Descarta lo que no entiende'), s: t('It doesn’t invent a value', 'No inventa un valor'), tone: 'ink' }] },
            { h: t('Portal', 'Portal'), items: [{ b: t('12 modules', '12 módulos'), s: t('Month and salesperson filters that follow you', 'Filtros de mes y vendedor que te siguen') }, { b: t('Early detection', 'Detección temprana'), s: t('Report, call, resolve', 'Avisar, llamar, resolver') }, { b: t('Monthly report', 'Informe del mes'), s: 'PDF' }] },
            { h: t('Permissions per role', 'Permisos por rol'), items: [{ b: t('Quality', 'Calidad') }, { b: t('Salesperson', 'Vendedor') }, { b: t('Auditor', 'Auditor') }, { b: t('Area lead', 'Responsable') }, { b: t('Management', 'Gerencia') }, { b: t('Admin', 'Administrador') }] }
          ]),
          body: `${table(ctx, {
            caption: t('Roles, needs and permissions', 'Roles, necesidades y permisos'),
            head: [t('Role', 'Rol'), t('What they need', 'Qué necesita'), t('What they can do', 'Qué puede hacer')],
            rows: [
              [t('Quality', 'Calidad'), t('See every metric and act fast on unhappy customers', 'Ver todos los indicadores y actuar rápido sobre los disconformes'), t('All operations, every area', 'Todo lo operativo, todos los sectores')],
              [t('Salesperson', 'Vendedor'), t('Flag a problem on the spot and follow their own performance', 'Avisar un problema en el momento y seguir su desempeño'), t('Only their own deliveries, NPS and reports', 'Sólo sus entregas, su NPS y sus avisos')],
              [t('Auditor', 'Auditor'), t('Record audits and Mystery Shopper visits', 'Registrar auditorías y Mystery Shopper'), t('Enter data and see results', 'Cargar y ver resultados')],
              [t('Area lead', 'Responsable'), t('Follow the results of their sector', 'Seguir los resultados de su sector'), t('Works on the sector assigned to them', 'Trabaja sobre el sector que tiene asignado')],
              [t('Management', 'Gerencia'), t('Understand the month without asking for a report', 'Entender el mes sin pedir un informe'), t('See everything, change nothing', 'Ver todo, no modificar nada')],
              [t('Admin', 'Administrador'), t('Onboard people and assign roles', 'Dar de alta personas y asignar roles'), t('Everything, including users', 'Todo, incluidos los usuarios')]
            ]
          })}
          <h3>${t('Early detection, step by step', 'Detección temprana, paso a paso')}</h3>
          <ol class="steps"><li><b>${t('A salesperson notices it', 'El vendedor lo nota')}</b> ${t('and logs it from the showroom floor, with name and phone.', 'y lo carga desde el salón, con nombre y teléfono.')}</li><li><b>${t('Quality sees it first', 'Calidad lo ve primero')}</b> ${t('Unattended cases sit on top, in red and in words.', 'Los casos sin atender quedan arriba, en rojo y escritos.')}</li><li><b>${t('One tap calls', 'Un toque llama')}</b> ${t('The main button is the phone call, not the form.', 'El botón principal es la llamada, no el formulario.')}</li><li><b>${t('The case moves', 'El caso avanza')}</b> ${t('Unattended, in progress, resolved or canceled.', 'Sin atender, en gestión, resuelta o anulada.')}</li></ol>`
        },
        {
          id: 'exploration',
          label: t('Design exploration', 'Exploración de diseño'),
          title: t('Five changes to the team’s daily work.', 'Cinco cambios en el trabajo diario del equipo.'),
          body: decisions(
            ctx,
            [
              { p: t('Updating was a chore', 'Actualizar era una tarea'), pt: t('Someone exported the spreadsheets and refreshed the dashboards. If they didn’t, the numbers went stale.', 'Alguien exportaba las planillas y refrescaba los tableros. Si no lo hacía, los números quedaban viejos.'), d: t('It updates when the Excel is saved', 'Se actualiza al guardar el Excel'), dt: t('A background process uploads changes within seconds. Uploading the same file again never duplicates anything.', 'Un proceso sube los cambios en segundos. Volver a subir un archivo no duplica nada.'), c: t('it depends on a process running on one computer, so there is a manual fallback screen.', 'depende de un proceso en una computadora, por eso hay una pantalla de respaldo manual.') },
              { p: t('A complaints module', 'Un módulo de reclamos'), pt: t('A complaint was recorded once the customer had already said so in a survey.', 'El reclamo se registraba cuando el cliente ya lo había dicho en una encuesta.'), d: t('Early detection, from the phone', 'Detección temprana, desde el celular'), dt: t('Whoever notices an unhappy customer logs it on the spot, and Quality calls.', 'Quien nota a un cliente disconforme lo carga en el momento, y Calidad llama.') },
              { p: t('Filtering on every dashboard', 'Filtrar en cada tablero'), pt: t('Looking at September in sales and then in surveys meant choosing the month again.', 'Mirar septiembre en ventas y después en encuestas implicaba elegir el mes otra vez.'), d: t('Filters that follow you', 'Filtros que te siguen'), dt: t('Month and salesperson persist between screens, and several months can be added up.', 'Mes y vendedor se mantienen entre pantallas y se pueden sumar varios meses.'), c: t('the PDF report asks for a single month, because with several it isn’t clear what to compare with.', 'el informe en PDF pide un mes solo, porque con varios no queda claro contra qué comparar.') },
              { p: t('Everyone saw everything', 'Todos veían todo'), pt: t('Sharing a dashboard meant sharing every salesperson’s results.', 'Compartir un tablero era compartir los resultados de todos los vendedores.'), d: t('Permissions in the database', 'Permisos en la base de datos'), dt: t('The rules live in the data, not only in which buttons are shown. A new account sees nothing until it is activated.', 'Las reglas viven en los datos, no sólo en qué botones se muestran. Una cuenta nueva no ve nada hasta que la activan.'), c: t('Quality has to activate each person.', 'Calidad tiene que activar a cada persona.') },
              { p: t('Messy data, doubtful numbers', 'Datos sucios, números dudosos'), pt: t('Typing errors distorted results without anyone noticing.', 'Los errores de carga distorsionaban los resultados sin que nadie lo notara.'), d: t('Don’t guess, explain', 'No adivinar, explicar'), dt: t('The portal discards what it can’t read and each metric shows how many cases it uses. The guide explains what to fix in the Excel.', 'El portal descarta lo que no entiende y cada indicador muestra sobre cuántos casos se calcula. La guía explica qué corregir en el Excel.') }
            ].map((r) => ({ ...r, kp: t('Before', 'Antes'), kd: t('After', 'Después') }))
          )
        },
        {
          id: 'design-system',
          label: t('Design system', 'Sistema de diseño'),
          title: t('Color says state, size says priority.', 'El color dice estado, el tamaño dice prioridad.'),
          body: `<p class="lede">${t(
            'A small set of tokens with the same names in light and dark themes, and components that repeat in the twelve modules.',
            'Un conjunto chico de tokens con los mismos nombres en tema claro y oscuro, y componentes que se repiten en los doce módulos.'
          )}</p>
          <h3>${t('Color', 'Color')}</h3>
          ${swatches([[t('Blue · action', 'Azul · acción'), '#2166AB'], [t('Background', 'Fondo'), '#F0F2F5'], [t('Ink', 'Tinta'), '#1B1C1E'], [t('Secondary text', 'Texto secundario'), '#5C6167'], [t('Faint text', 'Texto tenue'), '#8B9096'], [t('Dark background', 'Fondo oscuro'), '#111316'], [t('Dark · improves', 'Oscuro · mejora'), '#4CC285'], [t('Dark · alert', 'Oscuro · alerta'), '#F0962A']])}
          <h3>${t('Contrast audit', 'Auditoría de contraste')}</h3>
          ${contrast(ctx, [
            [t('Ink on white', 'Tinta sobre blanco'), '#1B1C1E', '#ffffff', '17.05'],
            [t('White on blue', 'Blanco sobre azul'), '#ffffff', '#2166AB', '5.91'],
            [t('Secondary text on background', 'Texto secundario sobre fondo'), '#5C6167', '#F0F2F5', '5.57'],
            [t('Faint text on white', 'Texto tenue sobre blanco'), '#8B9096', '#ffffff', '3.22', t('To replace in the “out of how many” captions', 'A reemplazar en las leyendas “sobre cuántos”')]
          ])}
          <h3>${t('Components', 'Componentes')}</h3>
          ${ul([
            t('Indicator: name, value and base (“out of 319 surveys”). Only the main one per screen is filled with color', 'Indicador: nombre, valor y base (“sobre 319 encuestas”). Sólo el principal de cada pantalla va con color pleno'),
            t('Month filter: chips that can be combined, always in the same place', 'Filtro de mes: chips combinables, siempre en el mismo lugar'),
            t('Case row: state, what happened, who it is and one action', 'Fila de caso: estado, qué pasó, quién es y una acción'),
            t('Charts with their objective line, so a value can be judged without asking', 'Gráficos con su línea de objetivo, para juzgar un valor sin preguntar')
          ])}`
        },
        {
          id: 'solution',
          label: t('Final solution', 'Solución final'),
          title: t('The screens the team uses.', 'Las pantallas que usa el equipo.'),
          body: `${figure(ctx, 'byd-overview', { title: t('Overview', 'Resumen general'), text: t('What was spread over four dashboards, on one screen and with the same filters.', 'Lo que estaba repartido en cuatro tableros, en una sola pantalla y con los mismos filtros.'), alt: t('Overview with factory NPS, aftersales NPS, complaints, Mystery Shopper, deliveries and audits', 'Resumen con NPS de fábrica, NPS de postventa, reclamos, Mystery Shopper, entregas y auditorías') })}
          ${figure(ctx, 'byd-early-detection', { title: t('Early detection', 'Detección temprana'), text: t('Acting matters more than logging: the main button is a call.', 'La acción importa más que el registro: el botón principal es llamar.'), alt: t('Reported cases with state, description and a button to call the customer', 'Casos reportados con estado, descripción y botón para llamar al cliente') })}
          ${phones(ctx, t('The portal on the phone', 'El portal en el celular'), [
            { img: 'byd-m-early-detection', title: t('From the showroom floor', 'Desde el salón'), text: t('Salespeople report without going back to a desk.', 'El vendedor avisa sin volver a un escritorio.'), alt: t('Early detection on a phone', 'Detección temprana en un celular') },
            { img: 'byd-m-overview', title: t('The same overview', 'El mismo resumen'), text: t('Installed on the home screen like any other app.', 'Instalado en la pantalla de inicio como una app más.'), alt: t('Overview on a phone', 'Resumen general en un celular') }
          ])}
          ${figure(ctx, 'byd-surveys', { title: t('Surveys', 'Encuestas'), text: t('The NPS formula is written at the top, so nobody has to guess where the number comes from.', 'La fórmula del NPS está escrita arriba, para que nadie adivine de dónde sale el número.'), alt: t('BYD app surveys with NPS, promoters, passives, detractors and monthly chart', 'Encuestas de la app BYD con NPS, promotores, neutros, detractores y gráfico mensual') })}
          ${figure(ctx, 'byd-aftersales', { title: t('Aftersales', 'Postventa'), text: t('The comments sit next to the score that explains them.', 'Los comentarios están junto al puntaje que los explica.'), alt: t('Aftersales with NPS, distribution bar and comments grouped by score', 'Postventa con NPS, barra de distribución y comentarios por puntaje') })}
          ${figure(ctx, 'byd-sync', { title: t('Sync', 'Sincronización'), text: t('It starts by saying that nobody needs to use it. It is the fallback if the automatic process stops.', 'Empieza aclarando que no hace falta usarla. Es el respaldo si el proceso automático se detiene.'), alt: t('Sync screen with the six spreadsheets the portal recognizes', 'Pantalla de sincronización con las seis planillas que reconoce el portal') })}`
        },
        {
          id: 'implementation',
          label: t('Implementation & collaboration', 'Implementación y colaboración'),
          title: t('Adoption was part of the design.', 'La adopción fue parte del diseño.'),
          body: `<p class="lede">${t(
            'I designed the interface and implemented it in React and TypeScript over Supabase, so each decision reached production without a translation step.',
            'Diseñé la interfaz y la implementé en React y TypeScript sobre Supabase, así cada decisión llegó a producción sin un paso de traducción.'
          )}</p>
          <div class="cols3"><div><h3>${t('Getting in', 'Entrar')}</h3><p>${t('A QR code opens the portal on the phone and three steps install it.', 'Un código QR abre el portal en el celular y tres pasos lo instalan.')}</p></div><div><h3>${t('Joining', 'Darse de alta')}</h3><p>${t('Each person creates their account and Quality activates it with a role. No shared passwords.', 'Cada persona crea su cuenta y Calidad la activa con un rol. Sin contraseñas compartidas.')}</p></div><div><h3>${t('If something fails', 'Si algo falla')}</h3><p>${t('A “what you see, what it means” table and a file that checks whether sync is running.', 'Una tabla “qué ves, qué es” y un archivo que dice si la sincronización anda.')}</p></div></div>
          <p>${t(
            'I wrote the guide in the portal’s own words: how to get in, what each screen shows and what to do when something doesn’t work.',
            'Escribí la guía en el mismo lenguaje del portal: cómo entrar, qué muestra cada pantalla y qué hacer si algo no anda.'
          )}</p>`
        },
        {
          id: 'outcomes',
          label: t('Outcomes & impact', 'Resultados e impacto'),
          title: t('What changed.', 'Lo que cambió.'),
          body: `${metrics([
            ['4 → 1', t('dashboards replaced by a single portal', 'tableros reemplazados por un portal')],
            ['6', t('spreadsheets that sync on their own', 'planillas que se sincronizan solas')],
            ['6', t('roles with their own permissions', 'roles con permisos propios')],
            [t('Seconds', 'Segundos'), t('between saving an Excel file and seeing it', 'entre guardar un Excel y verlo')]
          ])}
          <p class="aside">${t(
            'Time saved and response times haven’t been measured yet. Both are on the list below.',
            'El tiempo ahorrado y los tiempos de respuesta todavía no se midieron. Los dos están en la lista de abajo.'
          )}</p>`
        },
        {
          id: 'learnings',
          label: t('Learnings & next steps', 'Aprendizajes y próximos pasos'),
          title: t('Respecting how people already work lowered the barrier.', 'Respetar cómo ya trabaja el equipo bajó la barrera.'),
          body: `<div class="cols2"><div><h3>${t('Learnings', 'Aprendizajes')}</h3>${ul([
            t('Nobody had to learn a new way of entering data', 'Nadie tuvo que aprender otra forma de cargar datos'),
            t('A number without context breeds distrust: “out of how many” is part of the design', 'Un número sin contexto genera desconfianza: “sobre cuántos” es parte del diseño'),
            t('Designing permissions is designing the experience: what someone doesn’t see also counts', 'Diseñar los permisos es diseñar la experiencia: lo que alguien no ve también cuenta')
          ])}</div><div><h3>${t('Next steps', 'Próximos pasos')}</h3>${ul([
            t('Measure how long Quality takes to call a customer after a report', 'Medir cuánto tarda Calidad en llamar a un cliente desde que se reporta'),
            t('Add alerts when a metric drops below its target', 'Sumar alertas cuando un indicador cae por debajo del objetivo'),
            t('Darken the faint captions so they pass AA', 'Oscurecer las leyendas tenues para que pasen AA'),
            t('Clean up the source spreadsheets with the team so that more answers count', 'Corregir las planillas de origen junto al equipo para que más respuestas cuenten')
          ])}</div></div>`
        }
      ]
    };
  }
};
