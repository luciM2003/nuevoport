import { figure, table, evidence, decisions, swatches, contrast, metrics, ul } from '../lib/html.mjs';
import { phones } from '../lib/phones.mjs';
import { flow } from '../lib/diagrams.mjs';

export default {
  slug: 'padel-hub',
  kind: 'product',
  name: { en: 'Padel Hub Mendoza', es: 'Padel Hub Mendoza' },
  type: { en: 'Booking platform', es: 'Plataforma de reservas' },
  seo: {
    title: { en: 'Padel Hub: booking platform for players and clubs | Lucía Miranda', es: 'Padel Hub: plataforma de reservas para jugadores y clubes | Lucía Miranda' },
    description: {
      en: 'Case study: a court booking platform with a mobile app for players and a dashboard for clubs. Four-step booking with deposit, availability and open matches.',
      es: 'Caso de estudio: plataforma de reservas con app para jugadores y panel para clubes. Reserva en cuatro pasos con seña, disponibilidad y partidos abiertos.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const link = 'https://stitchpadelhubmendoza.vercel.app/';
    return {
      tagline: t(
        'From messaging the club to a booked court in four steps, and one view of the day for whoever runs it.',
        'Del mensaje al club a la cancha reservada en cuatro pasos, y una sola vista del día para quien lo gestiona.'
      ),
      coverAlt: t(
        'Padel Hub on a phone and a laptop: the player books a court in four steps while the club sees its court timeline, cash and daily overview.',
        'Padel Hub en un teléfono y una computadora: el jugador reserva en cuatro pasos y el club ve su grilla de canchas, la caja y el resumen del día.'
      ),
      overview: [
        [t('Industry', 'Industria'), t('Sports and bookings', 'Deporte y reservas')],
        [t('Product', 'Producto'), t('Responsive web platform: player app and club dashboard', 'Plataforma web responsive: app del jugador y panel del club')],
        [t('My role', 'Mi rol'), t('UX/UI and front-end development', 'UX/UI y desarrollo front-end')],
        [t('Responsibilities', 'Responsabilidades'), t('Booking flows, player and club experiences, tokens, React implementation and QA', 'Flujos de reserva, experiencia del jugador y del club, tokens, implementación en React y QA')],
        [t('Team', 'Equipo'), t('Two people: Lucía Miranda and Álvaro González, who wrote the initial build and the tournaments module', 'Dos personas: Lucía Miranda y Álvaro González, que escribió la base inicial y el módulo de torneos')],
        [t('Timeline', 'Duración'), t('August – October 2026', 'Agosto – octubre 2026')],
        [t('Tools', 'Herramientas'), 'React, Vite, Tailwind CSS, Supabase'],
        [t('Status', 'Estado'), t('Working demo with sample data. Payment is simulated and there is no club pilot yet', 'Demo funcional con datos de ejemplo. El pago está simulado y todavía no hay piloto con un club')]
      ],
      links: [{ href: link, label: t('Try the demo, no account needed', 'Probar la demo, sin cuenta') }],
      note: t(
        'In the demo the product appears under its working name, Padel Pro. Tournaments need a connected backend, so the demo shows them empty.',
        'En la demo el producto aparece con su nombre de trabajo, Padel Pro. Los torneos necesitan el backend conectado, por eso ahí se ven vacíos.'
      ),
      exec: {
        problem: t(
          'Bookings, registrations and delays were handled over WhatsApp, one person at a time. Players didn’t know what was free and clubs kept two versions of the same day.',
          'Reservas, inscripciones y demoras se resolvían por WhatsApp, de a una persona. El jugador no sabía qué estaba libre y el club llevaba el mismo día por duplicado.'
        ),
        approach: t(
          'Two connected experiences with one source of availability. The player makes one decision per step; the club sees who plays, who paid and which courts are blocked in the same grid.',
          'Dos experiencias conectadas con una misma fuente de disponibilidad. El jugador toma una decisión por paso; el club ve quién juega, quién pagó y qué canchas están bloqueadas en la misma grilla.'
        ),
        outcome: t(
          '25 screens built in React, light and dark themes and a demo anyone can use without an account. What isn’t built is listed as clearly as what is.',
          '25 pantallas construidas en React, tema claro y oscuro, y una demo que cualquiera puede usar sin cuenta. Lo que falta está tan a la vista como lo construido.'
        )
      },
      sections: [
        {
          id: 'challenge',
          label: t('The challenge', 'El desafío'),
          title: t('Padel in Mendoza runs on WhatsApp.', 'El pádel en Mendoza se organiza por WhatsApp.'),
          body: `<p class="lede">${t(
            'The systems in use fail at exactly what happens on a real court: a club with two venues enters everything twice, the back court has no signal and every delay is announced one person at a time.',
            'Los sistemas que se usan hoy fallan justo en lo que pasa en una cancha real: el club con dos sedes carga todo dos veces, la cancha del fondo no tiene señal y cada demora se avisa uno por uno.'
          )}</p>
          <div class="cols3"><div><h3>${t('Players', 'Jugadores')}</h3>${ul([t('Message to ask whether they are registered', 'Preguntan por mensaje si quedaron inscriptos'), t('Have no one to play with when they go alone', 'No encuentran con quién jugar si van solos'), t('Find tournament photos in folders shared over chat', 'Buscan las fotos del torneo en carpetas compartidas por chat')])}</div><div><h3>${t('Clubs', 'Clubes')}</h3>${ul([t('Build fixtures by hand in a spreadsheet', 'Arman el fixture a mano en una planilla'), t('Duplicate data across venues', 'Duplican datos entre sedes'), t('Chase payments and confirmations', 'Persiguen pagos y confirmaciones')])}</div><div><h3>${t('Constraints', 'Restricciones')}</h3>${ul([t('Used courtside: poor signal, at night', 'Se usa en la cancha: mala señal, de noche'), t('Small clubs and clubs with several venues', 'Clubes chicos y clubes con varias sedes'), t('Payments with Mercado Pago and transfer', 'Pagos con Mercado Pago y transferencia')])}</div></div>`
        },
        {
          id: 'research',
          label: t('Research & discovery', 'Investigación y descubrimiento'),
          title: t('Two questions, one product.', 'Dos preguntas, un producto.'),
          body: `<p class="lede">${t(
            'The player asks “when do I play, and with whom?”. The club asks “how do I organize without the back and forth?”. What one does feeds the other.',
            'El jugador pregunta “¿cuándo juego y con quién?”. El club, “¿cómo organizo sin el ida y vuelta?”. Lo que hace uno alimenta al otro.'
          )}</p>
          ${evidence(ctx, {
            known: [
              t('Bookings and changes are resolved by message', 'Reservas y cambios se resuelven por mensaje'),
              t('Each club applies its own criteria to set categories', 'Cada club aplica sus criterios para armar categorías'),
              t('Full payment in advance discourages booking; no payment leaves empty courts', 'Pedir el pago completo frena la reserva; no pedir nada deja canchas vacías')
            ],
            assumed: [
              t('A 30% deposit balances both sides', 'Una seña del 30% equilibra a las dos partes'),
              t('Showing the level makes open matches worth joining', 'Mostrar el nivel hace que valga la pena sumarse a un partido'),
              t('The next booking is what people open the app for', 'La gente abre la app para ver su próxima reserva')
            ],
            open: [
              t('Time to book, with real players', 'Cuánto se tarda en reservar, con jugadores reales'),
              t('The dashboard with an organizer’s real data', 'El panel con datos reales de un organizador'),
              t('A pilot with a club before opening it', 'Un piloto con un club antes de abrirla')
            ]
          })}`
        },
        {
          id: 'flows',
          label: t('User journeys & flows', 'Recorridos y flujos'),
          title: t('One decision per step.', 'Una decisión por paso.'),
          wide: flow(ctx, t('Booking a court', 'Reservar una cancha'), [
            { h: t('Step 1', 'Paso 1'), items: [{ b: t('Day and court', 'Día y cancha'), s: t('Covered or open, glass or wall', 'Techada o descubierta, cristal o muro') }] },
            { h: t('Step 2', 'Paso 2'), items: [{ b: t('Free slot', 'Turno libre'), s: t('Taken ones are dimmed, not hidden', 'Los ocupados se atenúan, no se ocultan') }] },
            { h: t('Step 3', 'Paso 3'), items: [{ b: 'Extras', s: t('Rackets and balls, optional', 'Paletas y pelotas, opcional') }] },
            { h: t('Step 4', 'Paso 4'), items: [{ b: t('30% deposit', 'Seña del 30%'), s: t('The rest is paid at the club, with the exact amount', 'El resto se abona en el club, con el monto exacto'), tone: 'ink' }] },
            { h: t('In the club', 'En el club'), items: [{ b: t('It appears in the timeline', 'Aparece en la grilla'), s: t('Player, level and payment state', 'Jugador, nivel y estado de pago') }] }
          ]),
          body: `<h3>${t('Two information architectures', 'Dos arquitecturas de información')}</h3>
          ${table(ctx, {
            caption: t('Player and club structure', 'Estructura del jugador y del club'),
            head: [t('Experience', 'Experiencia'), t('Sections', 'Secciones'), t('First thing on screen', 'Lo primero que se ve')],
            rows: [
              [t('Player, mobile first', 'Jugador, celular primero'), t('Home, Tournaments, Ranking, Matches, My bookings, Profile', 'Inicio, Torneos, Ranking, Partidos, Mis reservas, Perfil'), t('The next booking: venue, court and time', 'La próxima reserva: sede, cancha y hora')],
              [t('Club, desktop first', 'Club, escritorio primero'), t('Panel, Courts, Clients, Cash, Tournaments, Sponsors, Penalties, Settings', 'Panel, Canchas, Clientes, Caja, Torneos, Sponsors, Sanciones, Configuración'), t('Occupancy, income and next slots', 'Ocupación, ingresos y próximos turnos')]
            ]
          })}
          <h3>${t('Exceptions', 'Excepciones')}</h3>
          ${table(ctx, {
            caption: t('Exceptions and answers', 'Excepciones y respuestas'),
            head: [t('Situation', 'Situación'), t('Answer', 'Respuesta')],
            rows: [
              [t('The slot was taken', 'El turno ya está ocupado'), t('It stays visible and dimmed, so real availability is understood', 'Queda visible y atenuado, para entender la disponibilidad real')],
              [t('A court is under maintenance', 'Una cancha está en mantenimiento'), t('A solid block in the timeline, different from a booking', 'Un bloque pleno en la grilla, distinto de una reserva')],
              [t('The player only paid the deposit', 'El jugador sólo pagó la seña'), t('“Deposit paid” and “total paid” have their own label', '“Seña pagada” y “total pagado” tienen su propia etiqueta')],
              [t('A match runs late', 'Un partido se demora'), t('Following slots are rescheduled and players are notified', 'Se reprograman los turnos siguientes y se avisa a los jugadores')],
              [t('A client owes money', 'Un cliente debe'), t('The debt is written next to the name, with a direct WhatsApp contact', 'La deuda se lee junto al nombre, con contacto directo por WhatsApp')]
            ]
          })}`
        },
        {
          id: 'exploration',
          label: t('Design exploration', 'Exploración de diseño'),
          title: t('From static screens to a system that runs.', 'De pantallas estáticas a un sistema que funciona.'),
          body: `<p class="lede">${t(
            'The project started in August 2026 with a set of static screens. From there we consolidated one token set, rebuilt every screen in React and corrected what only shows up when it is used.',
            'El proyecto empezó en agosto de 2026 con un conjunto de pantallas estáticas. Desde ahí consolidamos un único set de tokens, reconstruimos cada pantalla en React y corregimos lo que sólo aparece al usarla.'
          )}</p>
          ${ul([
            t('Menus hidden under cards and a registration crash, found in a general QA pass', 'Menús tapados por tarjetas y un error en la inscripción, encontrados en un QA general'),
            t('Tournament dates shown a day early because of the time zone', 'Fechas de torneo mostradas un día antes por la zona horaria'),
            t('Notifications and settings redesigned as dropdowns, and dark mode corrected', 'Notificaciones y configuración rediseñadas como menús, y modo oscuro corregido')
          ])}
          ${decisions(ctx, [
            { p: t('Bookings nobody shows up for', 'Reservas que no se presentan'), pt: t('Charging everything slows booking; charging nothing leaves courts empty.', 'Cobrar todo frena la reserva; no cobrar nada deja canchas vacías.'), d: t('A 30% deposit online', 'Seña del 30% online'), dt: t('The club secures the slot and the player doesn’t pay everything up front. The screen separates total, deposit and balance.', 'El club asegura el turno y el jugador no adelanta todo. La pantalla separa total, seña y saldo.') },
            { p: t('Uneven matches', 'Partidos desparejos'), pt: t('Joining a match at another level spoils the game for four people.', 'Sumarse a un partido de otro nivel arruina el juego para cuatro.'), d: t('Required level on every card', 'Nivel requerido en cada tarjeta'), dt: t('Level range, price per player and spots left, with filters for “my level”, today and tomorrow.', 'Rango de nivel, precio por jugador y cuántos faltan, con filtros por “mi nivel”, hoy y mañana.') },
            { p: t('Opening the app just to remember', 'Abrir la app sólo para recordar'), pt: t('The most frequent question is “when do I play?”.', 'La pregunta más frecuente es “¿cuándo juego?”.'), d: t('The next booking takes the lead', 'La próxima reserva, protagonista'), dt: t('Home opens with it, followed by two large shortcuts: book or join a match.', 'El inicio abre con ella y sigue con dos accesos grandes: reservar o sumarse a un partido.') },
            { p: t('Every club ranks differently', 'Cada club ordena distinto'), pt: t('In practice each one applies its own criteria.', 'En la práctica cada uno aplica sus criterios.'), d: t('Two rankings', 'Doble ranking'), dt: t('The club chooses the official ranking or its own.', 'El club elige el ranking oficial o el propio.'), c: t('two sources to explain to players.', 'dos fuentes para explicarle al jugador.') }
          ])}`
        },
        {
          id: 'design-system',
          label: t('Design system', 'Sistema de diseño'),
          title: t('Lime marks what to do. Everything else stays quiet.', 'El lima marca qué hacer. El resto queda en silencio.'),
          body: `<p class="lede">${t(
            'One token set drives both experiences and both themes. The names describe the function, so the dark theme changes values and not components.',
            'Un mismo set de tokens mueve las dos experiencias y los dos temas. Los nombres describen la función: el tema oscuro cambia valores, no componentes.'
          )}</p>
          <h3>${t('Color', 'Color')}</h3>
          ${swatches([['primary-container', '#D4F84A'], ['primary', '#536600'], ['text-primary', '#111111'], ['on-surface-variant', '#454935'], ['surface', '#F9F9F9'], ['status-ok', '#27AE60'], ['status-pending', '#F2994A'], ['status-error', '#EB5757']])}
          <h3>${t('Contrast audit', 'Auditoría de contraste')}</h3>
          ${contrast(ctx, [
            [t('Ink on lime (main action)', 'Tinta sobre lima (acción principal)'), '#111111', '#D4F84A', '15.58'],
            [t('Olive on surface (links)', 'Oliva sobre superficie (enlaces)'), '#536600', '#F9F9F9', '6.10'],
            [t('Secondary text on surface', 'Texto secundario sobre superficie'), '#8A8A8A', '#F9F9F9', '3.28', t('Replace with on-surface-variant', 'Reemplazar por on-surface-variant')],
            [t('Status “ok” on white', 'Estado “ok” sobre blanco'), '#27AE60', '#ffffff', '2.87', t('Pair it with an icon and darker text', 'Acompañarlo con ícono y texto más oscuro')]
          ])}
          <h3>${t('Type and components', 'Tipografía y componentes')}</h3>
          ${ul([
            t('Hanken Grotesk for headings, Inter for reading', 'Hanken Grotesk para títulos, Inter para lectura'),
            t('Slot: free, selected, taken, with promotion. Four states that don’t rely on color alone', 'Turno: libre, seleccionado, ocupado, con promoción. Cuatro estados que no dependen sólo del color'),
            t('Fixed bar at the bottom with the amount and the main action', 'Barra fija al pie con el monto y la acción principal'),
            t('Court grid: one column per court, one row per half hour', 'Grilla de canchas: una columna por cancha, una fila por media hora')
          ])}`
        },
        {
          id: 'solution',
          label: t('Final solution', 'Solución final'),
          title: t('The player in four steps, the club in one view.', 'El jugador en cuatro pasos, el club en una vista.'),
          wide: phones(ctx, t('Player app', 'App del jugador'), [
            { img: 'padel-m-home', title: t('Next booking', 'Próxima reserva'), text: t('And two ways to play.', 'Y dos formas de jugar.'), alt: t('Home with the next booking and shortcuts to book or join', 'Inicio con la próxima reserva y accesos para reservar o sumarse') },
            { img: 'padel-m-slots', title: t('Time', 'Horario'), text: t('Free, taken and selected at a glance.', 'Libre, ocupado y elegido de un vistazo.'), alt: t('Day selector, court and time slots', 'Selector de día, cancha y turnos') },
            { img: 'padel-m-summary', title: t('Summary', 'Resumen'), text: t('Total, deposit and what is paid at the club.', 'Total, seña y lo que se paga en el club.'), alt: t('Booking summary with extras, total and 30% deposit', 'Resumen con extras, total y seña del 30%') },
            { img: 'padel-m-matches', title: t('Open matches', 'Partidos abiertos'), text: t('Level, price and spots left.', 'Nivel, precio y lugares.'), alt: t('Open matches with required level and price per player', 'Partidos abiertos con nivel requerido y precio por jugador') },
            { img: 'padel-m-bookings', title: t('My bookings', 'Mis reservas'), text: t('Invite from the same card.', 'Invitar desde la misma tarjeta.'), alt: t('Upcoming bookings with detail and invite buttons', 'Próximas reservas con detalle e invitar') }
          ], { bg: 'linear-gradient(160deg,#e6ff7a 0,#d0f53f 50%,#b2dc18 100%)' }),
          body: `${figure(ctx, 'padel-timeline', { url: 'stitchpadelhubmendoza.vercel.app', title: t('Court timeline', 'Grilla de canchas'), text: t('Who plays, at what level, whether they paid and which courts are blocked.', 'Quién juega, con qué nivel, si pagó y qué canchas están bloqueadas.'), alt: t('Timeline of six courts with bookings, a blocked tournament and one under maintenance', 'Grilla de seis canchas con reservas, un torneo bloqueado y una en mantenimiento') })}
          ${figure(ctx, 'padel-dashboard', { url: 'stitchpadelhubmendoza.vercel.app', title: t('Daily overview', 'Resumen del día'), text: t('What the manager checks on arrival.', 'Lo que el encargado mira al llegar.'), alt: t('Occupancy, income, active bookings and upcoming slots', 'Ocupación, ingresos, reservas activas y próximos turnos') })}
          ${figure(ctx, 'padel-cash', { url: 'stitchpadelhubmendoza.vercel.app', title: t('Cash', 'Caja'), text: t('Income by payment method and the last movements, with a manual entry always at hand.', 'Ingresos por medio de pago y últimos movimientos, con un ingreso manual siempre a mano.'), alt: t('Daily income split by payment method and list of transactions', 'Ingresos del día por medio de pago y lista de transacciones') })}
          ${figure(ctx, 'padel-clients', { url: 'stitchpadelhubmendoza.vercel.app', title: t('Clients', 'Clientes'), text: t('Level, matches and account status, one tap away from a message.', 'Nivel, partidos y estado de cuenta, a un toque de un mensaje.'), alt: t('Client list with level, matches and account status', 'Lista de clientes con nivel, partidos y estado de cuenta') })}`
        },
        {
          id: 'implementation',
          label: t('Implementation & collaboration', 'Implementación y colaboración'),
          title: t('Design QA on the running product.', 'Design QA sobre el producto andando.'),
          body: `<p class="lede">${t(
            'Being on both sides meant that a design fix and its implementation were the same conversation, and often the same commit.',
            'Estar de los dos lados hizo que un ajuste de diseño y su implementación fueran la misma conversación, y muchas veces el mismo commit.'
          )}</p>
          ${ul([
            t('React, Vite and Tailwind, with tokens as CSS variables for light and dark', 'React, Vite y Tailwind, con tokens como variables CSS para claro y oscuro'),
            t('Accounts, database and role permissions in Supabase: 12 migrations in the repository', 'Cuentas, base de datos y permisos por rol en Supabase: 12 migraciones en el repositorio'),
            t('A demo mode by default, so that anyone can review the product without an account or backend', 'Modo demo por defecto, para que cualquiera revise el producto sin cuenta ni backend')
          ])}
          <div class="cols2"><div><h3>${t('Built', 'Construido')}</h3>${ul([
            t('Bookings with deposit, open matches by level, match chat and profile', 'Reservas con seña, partidos abiertos por nivel, chat del partido y perfil'),
            t('Tournaments: calendar, registration, fixture and ranking', 'Torneos: calendario, inscripción, fixture y ranking'),
            t('Club: daily overview, court timeline, clients and cash', 'Club: resumen del día, grilla de canchas, clientes y caja')
          ])}</div><div><h3>${t('Not built yet', 'Todavía no construido')}</h3>${ul([
            t('Real Mercado Pago checkout (it is simulated)', 'Cobro real con Mercado Pago (está simulado)'),
            t('Offline score entry', 'Carga de resultados sin conexión'),
            t('WhatsApp notifications', 'Avisos por WhatsApp')
          ])}</div></div>`
        },
        {
          id: 'outcomes',
          label: t('Outcomes & impact', 'Resultados e impacto'),
          title: t('A product anyone can try.', 'Un producto que cualquiera puede probar.'),
          body: `${metrics([
            ['2', t('connected experiences: player and club', 'experiencias conectadas: jugador y club')],
            ['25', t('screens taken to React', 'pantallas llevadas a React')],
            ['4', t('steps to book a court', 'pasos para reservar una cancha')],
            ['2', t('themes with the same components', 'temas con los mismos componentes')]
          ])}
          <p class="aside">${t('There are no usage metrics: the platform hasn’t been piloted with a club.', 'No hay métricas de uso: la plataforma todavía no se probó con un club.')}</p>`
        },
        {
          id: 'learnings',
          label: t('Learnings & next steps', 'Aprendizajes y próximos pasos'),
          title: t('Think about the court, not about the screen.', 'Pensar en la cancha, no en la pantalla.'),
          body: `<div class="cols2"><div><h3>${t('Learnings', 'Aprendizajes')}</h3>${ul([
            t('What makes these platforms fail (signal, delays, several venues) doesn’t show up in a mockup', 'Lo que hace fracasar estas plataformas (señal, demoras, varias sedes) no aparece en un mockup'),
            t('Being explicit about what is done and what isn’t builds trust with the client', 'Ser explícita sobre qué está hecho y qué no genera confianza con el cliente'),
            t('A demo mode is a design tool: it lets someone else find the problem', 'Un modo demo es una herramienta de diseño: deja que otro encuentre el problema')
          ])}</div><div><h3>${t('Next steps', 'Próximos pasos')}</h3>${ul([
            t('Test the booking flow with players and measure how long it takes', 'Testear el flujo de reserva con jugadores y medir cuánto tardan'),
            t('Try it in a real tournament before opening it', 'Probarla en un torneo real antes de abrirla'),
            t('Fix secondary text contrast and unify the name Padel Hub in the interface', 'Corregir el contraste del texto secundario y unificar el nombre Padel Hub en la interfaz')
          ])}</div></div>`
        }
      ]
    };
  }
};
