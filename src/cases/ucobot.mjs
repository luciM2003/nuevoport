import { figure, phones, table, evidence, swatches, contrast, metrics, ul } from '../lib/html.mjs';
import { flow } from '../lib/diagrams.mjs';

export default {
  slug: 'ucobot',
  kind: 'product',
  name: { en: 'UcoBot', es: 'UcoBot' },
  type: { en: 'B2B SaaS', es: 'SaaS B2B' },
  seo: {
    title: { en: 'UcoBot: UX for an AI, CRM and POS SaaS platform | Lucía Miranda', es: 'UcoBot: UX de una plataforma SaaS con IA y CRM | Lucía Miranda' },
    description: {
      en: 'Case study: UX/UI for a B2B SaaS platform that turns WhatsApp and Instagram conversations into orders, bookings and follow-ups, without writing code.',
      es: 'Caso de estudio: UX/UI de una plataforma SaaS B2B que convierte conversaciones de WhatsApp e Instagram en pedidos, reservas y seguimientos, sin escribir código.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const link = 'https://chatbot-sass-eight.vercel.app/';
    return {
      tagline: t(
        'From a chat message to an order, a booking or a follow-up, for people who have never configured a bot.',
        'De un mensaje de chat a un pedido, una reserva o un seguimiento, para personas que nunca configuraron un bot.'
      ),
      coverAlt: t(
        'UcoBot dashboard with metrics, assistants and automations, next to a WhatsApp conversation that ends in a confirmed order.',
        'Panel de UcoBot con métricas, asistentes y automatizaciones, junto a una conversación de WhatsApp que termina en un pedido confirmado.'
      ),
      overview: [
        [t('Industry', 'Industria'), t('SaaS for food, retail and services', 'SaaS para gastronomía, comercio y servicios')],
        [t('Product', 'Producto'), t('AI chatbots, CRM and operations: web panel, Windows and Android apps', 'Chatbots con IA, CRM y operación: panel web y apps para Windows y Android')],
        [t('My role', 'Mi rol'), t('UX/UI design', 'Diseño UX/UI')],
        [t('Responsibilities', 'Responsabilidades'), t('Experience for contacts, follow-ups and sales; dashboards and interface patterns', 'Experiencia de contactos, seguimientos y ventas; dashboards y patrones de interfaz')],
        [t('Team', 'Equipo'), t('A Codea Desarrollos product', 'Producto de Codea Desarrollos')],
        [t('Tools', 'Herramientas'), 'Figma'],
        [t('Status', 'Estado'), t('Live. Public site, API documentation and desktop and Android apps (version 1.2.5, October 2026)', 'Publicado. Sitio, documentación de API y apps de escritorio y Android (versión 1.2.5, octubre de 2026)')]
      ],
      links: [
        { href: link, label: t('Visit UcoBot', 'Ver UcoBot') },
        { href: link + 'docs/api', label: t('API documentation', 'Documentación de la API') }
      ],
      note: t(
        'Screens are the previews published on UcoBot’s public site, with sample data and sample business names. The commercial figures on that site are not used in this case.',
        'Las pantallas son las vistas previas publicadas en el sitio de UcoBot, con datos y nombres de negocio de ejemplo. Las cifras comerciales de ese sitio no se usan en este caso.'
      ),
      exec: {
        problem: t(
          'Small businesses sell through WhatsApp and Instagram. Managing customers by hand means missed messages, forgotten follow-ups and lost sales.',
          'Muchos negocios venden por WhatsApp e Instagram. Gestionar clientes a mano significa mensajes sin responder, seguimientos olvidados y ventas perdidas.'
        ),
        approach: t(
          'I designed an experience that centralizes contacts, automates follow-ups and streamlines the sales process, expressing a technical platform in verbs the team already uses: reply, confirm, charge, remind.',
          'Diseñé una experiencia que centraliza contactos, automatiza seguimientos y ordena el proceso de ventas, y que expresa una plataforma técnica con verbos que el equipo ya usa: responder, confirmar, cobrar, recordar.'
        ),
        outcome: t(
          'A live product where six modules share one visual language, from AI chat to point of sale, and are configured from a panel without writing code.',
          'Un producto publicado donde seis módulos comparten un mismo lenguaje visual, del chat con IA al punto de venta, y se configuran desde un panel sin escribir código.'
        )
      },
      sections: [
        {
          id: 'challenge',
          label: t('The challenge', 'El desafío'),
          title: t('Powerful technology for people with no time to learn it.', 'Tecnología potente para personas sin tiempo de aprenderla.'),
          body: `<p class="lede">${t(
            'Behind one answered message there is a language model, two Meta APIs, a catalog, an agenda, a cash register and a thermal printer. Whoever runs the business should see none of that.',
            'Detrás de un mensaje respondido hay un modelo de lenguaje, dos APIs de Meta, un catálogo, una agenda, una caja y una impresora térmica. Quien lleva el negocio no debería ver nada de eso.'
          )}</p>
          <p>${t(
            'The product lives in three contexts that share data but not attention. Each one needs a different amount of interface.',
            'El producto vive en tres contextos que comparten datos, pero no atención. Cada uno necesita una cantidad distinta de interfaz.'
          )}</p>
          ${table(ctx, {
            caption: t('Three contexts of use', 'Tres contextos de uso'),
            head: [t('Context', 'Contexto'), t('Who', 'Quién'), t('What matters', 'Qué importa'), t('Where', 'Dónde')],
            rows: [
              [t('The chat', 'El chat'), t('The business’s customer', 'El cliente del negocio'), t('A quick, human answer and a clear confirmation', 'Una respuesta rápida, humana y una confirmación clara'), 'WhatsApp, Instagram'],
              [t('The panel', 'El panel'), t('Whoever runs the business', 'Quien gestiona el negocio'), t('Knowing what needs attention, configuring once', 'Saber qué requiere atención y configurar una sola vez'), t('Web', 'Web')],
              [t('The counter', 'El mostrador'), t('Whoever takes orders and charges', 'Quien toma pedidos y cobra'), t('Speed, stock and printing without dialogs', 'Velocidad, stock e impresión sin diálogos'), 'Windows, Android']
            ]
          })}`
        },
        {
          id: 'research',
          label: t('Research & discovery', 'Investigación y descubrimiento'),
          title: t('The platform’s limits are part of the experience.', 'Los límites de la plataforma son parte de la experiencia.'),
          body: `<p class="lede">${t(
            'In a messaging product, the costly failure is a channel rule that surprises someone in the middle of a sale.',
            'En un producto de mensajería, la falla cara es una regla del canal que sorprende a alguien en medio de una venta.'
          )}</p>
          <p>${t(
            'Reading the public API documentation as a designer turns technical errors into situations someone has to understand at the counter.',
            'Leer la documentación pública de la API con ojos de diseño convierte errores técnicos en situaciones que alguien tiene que entender en el mostrador.'
          )}</p>
          ${table(ctx, {
            caption: t('Platform constraints and their design implication', 'Restricciones de la plataforma y su implicancia de diseño'),
            head: [t('Platform rule', 'Regla de la plataforma'), t('API code', 'Código de la API'), t('Design implication', 'Implicancia de diseño')],
            rows: [
              [t('After 24 hours without a message from the contact, free replies close', 'Pasadas 24 horas sin mensajes del contacto, se cierra la respuesta libre'), '<code>outside_24h_window</code>', t('Show how long the window stays open before someone writes, not after the send fails', 'Mostrar cuánto queda de ventana antes de escribir, no después de que falle el envío')],
              [t('A number or account can be disconnected', 'Un número o una cuenta puede desconectarse'), '<code>channel_not_connected</code>', t('Connection state visible in the inbox, with one action to reconnect', 'Estado de conexión visible en la bandeja, con una acción para reconectar')],
              [t('Meta can reject a message', 'Meta puede rechazar un mensaje'), '<code>channel_error</code>', t('The message stays in the thread with its state and a retry', 'El mensaje queda en el hilo con su estado y un reintento')],
              [t('UcoBot’s AI answers, or the business’s own software does', 'Contesta la IA de UcoBot o el software del negocio'), '<code>ai_mode</code>', t('Always say who is answering: the bot or a person', 'Decir siempre quién responde: el bot o una persona')]
            ]
          })}
          ${evidence(ctx, {
            known: [
              t('Customer management was manual and opportunities were being lost', 'La gestión de clientes era manual y se perdían oportunidades'),
              t('Business owners configure from a panel, without code', 'El negocio configura desde un panel, sin código'),
              t('Channel rules above, from the public documentation', 'Las reglas del canal de arriba, de la documentación pública')
            ],
            assumed: [
              t('People think in customers and orders, not in bots and flows', 'Las personas piensan en clientes y pedidos, no en bots y flujos'),
              t('Seeing who is answering builds trust in automation', 'Ver quién responde genera confianza en la automatización')
            ],
            open: [
              t('Usability during a real shift, with the counter full', 'Usabilidad en un turno real, con el local lleno'),
              t('How each business sector names the same concepts', 'Cómo nombra cada rubro los mismos conceptos')
            ]
          })}`
        },
        {
          id: 'flows',
          label: t('User journeys & flows', 'Recorridos y flujos'),
          title: t('One message, three possible outcomes.', 'Un mensaje, tres desenlaces posibles.'),
          wide: flow(ctx, t('From message to result', 'Del mensaje al resultado'), [
            { h: t('Entry', 'Entrada'), items: [{ b: t('The customer writes', 'El cliente escribe'), s: 'WhatsApp, Instagram' }] },
            { h: t('First reply', 'Primera respuesta'), items: [{ b: t('The AI answers', 'Responde la IA'), s: t('With the business’s catalog and tone', 'Con el catálogo y el tono del negocio'), tone: 'ink' }] },
            { h: t('Intent', 'Intención'), items: [{ b: t('Order', 'Pedido') }, { b: t('Booking', 'Reserva') }, { b: t('Needs a person', 'Necesita una persona'), tone: 'alt' }] },
            { h: t('In the panel', 'En el panel'), items: [{ b: t('Order card, then register', 'Tarjeta de pedido y caja') }, { b: t('Agenda: pending or confirmed', 'Agenda: pendiente o confirmada') }, { b: t('Handoff, with the whole history', 'Derivación, con todo el historial'), tone: 'alt' }] },
            { h: t('Result', 'Resultado'), items: [{ b: t('Kitchen ticket printed', 'Comanda impresa') }, { b: t('Automatic reminder', 'Recordatorio automático') }, { b: t('Conversation answered', 'Conversación atendida'), tone: 'alt' }] }
          ]),
          body: `<h3>${t('Information architecture', 'Arquitectura de información')}</h3>
          <p>${t(
            'Six modules, one shared object: the customer. Each module answers a single question.',
            'Seis módulos y un objeto en común: el cliente. Cada módulo responde una sola pregunta.'
          )}</p>
          ${table(ctx, {
            caption: t('Modules and the question each one answers', 'Módulos y la pregunta que responde cada uno'),
            head: [t('Module', 'Módulo'), t('Question it answers', 'Pregunta que responde'), t('Main action', 'Acción principal')],
            rows: [
              [t('AI chatbots', 'Chatbots con IA'), t('Who is answering on each channel?', '¿Quién responde en cada canal?'), t('Turn on, pause', 'Activar, pausar')],
              [t('Automations', 'Automatizaciones'), t('What happens without anyone doing it?', '¿Qué pasa sin que nadie lo haga?'), t('Define a trigger', 'Definir un disparador')],
              [t('Bookings', 'Reservas'), t('Who is coming and who still has to confirm?', '¿Quién viene y quién falta confirmar?'), t('Confirm, reschedule', 'Confirmar, reprogramar')],
              [t('Point of sale', 'Punto de venta'), t('What is being sold right now?', '¿Qué se está vendiendo ahora?'), t('Charge', 'Cobrar')],
              [t('Promotions', 'Promociones'), t('Which offers are running and until when?', '¿Qué promos corren y hasta cuándo?'), t('Create, pause', 'Crear, pausar')],
              [t('Analytics', 'Analítica'), t('What needs attention today?', '¿Qué requiere atención hoy?'), t('Open the detail', 'Abrir el detalle')]
            ]
          })}`
        },
        {
          id: 'exploration',
          label: t('Design exploration', 'Exploración de diseño'),
          title: t('From technical concept to everyday sentence.', 'Del concepto técnico a la frase de todos los días.'),
          body: `<p class="lede">${t(
            'The pattern that simplifies the most is verbal: each technical concept is translated into the words of whoever uses it.',
            'El patrón que más simplifica es verbal: cada concepto técnico se traduce a las palabras de quien lo usa.'
          )}</p>
          ${table(ctx, {
            caption: t('Technical concepts and how the interface says them', 'Conceptos técnicos y cómo los dice la interfaz'),
            head: [t('Technical concept', 'Concepto técnico'), t('In the interface', 'En la interfaz'), t('Why', 'Por qué')],
            rows: [
              [t('Scheduled trigger', 'Disparador programado'), t('“24 h before the appointment”', '“24 h antes de la cita”'), t('It reads as a sentence, not as a rule', 'Se lee como una frase, no como una regla')],
              [t('Inactivity event', 'Evento de inactividad'), t('“No purchase after 2 h”', '“Sin compra +2 h”'), t('Names what the business notices', 'Nombra lo que el negocio nota')],
              [t('Flow enabled or disabled', 'Flujo habilitado o no'), t('A switch on each row', 'Un interruptor en cada fila'), t('State and action in the same place', 'Estado y acción en el mismo lugar')],
              [t('Stock constraint', 'Restricción de stock'), t('“Sold out” and a locked button', '“Agotado” y un botón bloqueado'), t('It prevents the error instead of explaining it', 'Previene el error en lugar de explicarlo')]
            ]
          })}
          ${figure(ctx, 'uco-flows', { title: t('Automations as a readable list', 'Automatizaciones como una lista legible'), text: t('Name, trigger, volume and state. Nobody has to open a flow to know whether it is working.', 'Nombre, disparador, volumen y estado. No hace falta abrir un flujo para saber si está andando.'), alt: t('List of five automations with trigger, number of sends and on/off switch', 'Lista de cinco automatizaciones con disparador, cantidad de envíos e interruptor'), sizes: '(min-width: 1100px) 760px, 92vw' })}
          ${figure(ctx, 'uco-bots', { title: t('One bot per channel, one row per bot', 'Un bot por canal, una fila por bot'), text: t('Active or paused is written as well as colored.', 'Activo o pausado se lee además de verse por color.'), alt: t('List of four bots: sales, bookings, Instagram and a paused email bot', 'Lista de cuatro bots: ventas, reservas, Instagram y uno de email pausado'), sizes: '(min-width: 1100px) 760px, 92vw' })}`
        },
        {
          id: 'design-system',
          label: t('Design system', 'Sistema de diseño'),
          title: t('A dark frame, a light workspace and one color for action.', 'Un marco oscuro, un espacio claro y un color para la acción.'),
          body: `<p class="lede">${t(
            'The palette reaches the product as semantic tokens (primary, sidebar, muted, destructive, ring), so a color change is one value and not a search through screens.',
            'La paleta llega al producto como tokens semánticos (primary, sidebar, muted, destructive, ring): cambiar un color es cambiar un valor y no buscar por pantallas.'
          )}</p>
          <h3>${t('Color', 'Color')}</h3>
          ${swatches([[t('Lime · action', 'Lima · acción'), '#D1F366'], [t('Ink · frame', 'Tinta · marco'), '#1C1C28'], [t('Workspace', 'Espacio de trabajo'), '#F9FAFB'], [t('Text, secondary', 'Texto secundario'), '#64748B'], [t('Confirmed', 'Confirmado'), '#22C55E'], [t('Information', 'Información'), '#3B82F6'], [t('Pending', 'Pendiente'), '#F97316']])}
          <h3>${t('Contrast audit', 'Auditoría de contraste')}</h3>
          ${contrast(ctx, [
            [t('Ink on lime (buttons)', 'Tinta sobre lima (botones)'), '#1C1C28', '#D1F366', '13.42'],
            [t('Lime on ink (menu)', 'Lima sobre tinta (menú)'), '#D1F366', '#1C1C28', '13.42'],
            [t('Secondary text on white', 'Texto secundario sobre blanco'), '#64748B', '#ffffff', '4.76'],
            [t('Light gray labels on white', 'Etiquetas en gris claro sobre blanco'), '#9CA3AF', '#ffffff', '2.54', t('Replace with secondary text', 'Reemplazar por texto secundario')],
            [t('Lime on white', 'Lima sobre blanco'), '#D1F366', '#ffffff', '1.26', t('Only as a background', 'Sólo como fondo')]
          ])}
          <h3>${t('Reusable patterns', 'Patrones reutilizables')}</h3>
          ${ul([
            t('Metric card: icon, change, value and one sentence that says what to do with it', 'Tarjeta de métrica: ícono, variación, valor y una frase que dice qué hacer con eso'),
            t('Row with state: name, context, written state and the action on the right', 'Fila con estado: nombre, contexto, estado escrito y la acción a la derecha'),
            t('Order card inside the chat: item, total and state in one block', 'Tarjeta de pedido dentro del chat: producto, total y estado en un bloque'),
            t('One type family (Inter) and generous radii that separate modules without borders', 'Una familia tipográfica (Inter) y radios amplios que separan módulos sin bordes')
          ])}`
        },
        {
          id: 'solution',
          label: t('Final solution', 'Solución final'),
          title: t('The same grammar in every module.', 'La misma gramática en todos los módulos.'),
          body: `${figure(ctx, 'uco-dashboard', { title: t('Overview', 'Resumen'), text: t('Each figure comes with a recommendation in plain words: what changed and what to look at.', 'Cada cifra viene con una recomendación en palabras simples: qué cambió y qué mirar.'), alt: t('Dashboard with leads, interactions, sales, AI performance and critical automations', 'Panel con leads, interacciones, ventas, rendimiento de la IA y automatizaciones críticas') })}
          ${figure(ctx, 'uco-bookings', { title: t('Bookings', 'Reservas'), text: t('Pending appointments carry the solid button; confirmed ones step back.', 'Las citas pendientes llevan el botón lleno; las confirmadas quedan en segundo plano.'), alt: t('Calendar, branch filter and list of appointments with pending and confirmed states', 'Calendario, filtro por sucursal y lista de citas pendientes y confirmadas') })}
          ${figure(ctx, 'uco-pos', { title: t('Point of sale', 'Punto de venta'), text: t('Stock on every product, customer and total always in the same place.', 'Stock en cada producto; cliente y total, siempre en el mismo lugar.'), alt: t('Point of sale with product grid, customer, payment methods and total', 'Punto de venta con productos, cliente, medios de pago y total') })}
          ${figure(ctx, 'uco-promotions', { title: t('Promotions', 'Promociones'), text: t('Use limit, expiry and state on one line, readable without opening anything.', 'Límite de uso, vencimiento y estado en una línea, sin abrir nada.'), alt: t('Promotions with usage progress, expiry and switch', 'Promociones con avance de uso, vencimiento e interruptor') })}
          ${phones(ctx, t('Conversations on the phone', 'Conversaciones en el celular'), [
            { img: 'uco-inbox', title: t('One inbox', 'Una sola bandeja'), text: t('WhatsApp and Instagram together, with the channel on each contact.', 'WhatsApp e Instagram juntos, con el canal en cada contacto.'), alt: t('Inbox with five conversations and channel filters', 'Bandeja con cinco conversaciones y filtros por canal') },
            { img: 'uco-order', title: t('The order, inside the chat', 'El pedido, dentro del chat'), text: t('It says who is answering and closes with a summary that can be checked.', 'Dice quién atiende y cierra con un resumen que se puede revisar.'), alt: t('Conversation that ends in an order card with the total', 'Conversación que termina en una tarjeta de pedido con el total') }
          ])}`
        },
        {
          id: 'implementation',
          label: t('Implementation & collaboration', 'Implementación y colaboración'),
          title: t('Designing inside a product that other people build.', 'Diseñar dentro de un producto que construyen otras personas.'),
          body: `<p class="lede">${t(
            'UcoBot is developed by Codea Desarrollos. My contribution is the experience and interface; engineering, AI and infrastructure belong to the team.',
            'UcoBot es un desarrollo de Codea Desarrollos. Mi aporte es la experiencia y la interfaz; la ingeniería, la IA y la infraestructura son del equipo.'
          )}</p>
          ${ul([
            t('The public product runs on Next.js, with the palette implemented as CSS variables', 'El producto público corre en Next.js, con la paleta implementada como variables CSS'),
            t('Desktop and Android apps bring the panel to the register and print without opening a dialog', 'Las apps de escritorio y Android llevan el panel a la caja e imprimen sin abrir un diálogo'),
            t('Knowing React, CSS and REST APIs lets me discuss states, limits and cost before drawing the screen', 'Conocer React, CSS y APIs REST me permite discutir estados, límites y costos antes de dibujar la pantalla')
          ])}`
        },
        {
          id: 'outcomes',
          label: t('Outcomes & impact', 'Resultados e impacto'),
          title: t('What the product lets someone do today.', 'Lo que el producto permite hacer hoy.'),
          body: `${metrics([
            ['6', t('modules with one visual language', 'módulos con un mismo lenguaje visual')],
            ['2', t('messaging channels in one inbox', 'canales de mensajería en una bandeja')],
            ['0', t('lines of code to configure a bot', 'líneas de código para configurar un bot')],
            ['3', t('platforms: web, Windows and Android', 'plataformas: web, Windows y Android')]
          ])}
          <p class="aside">${t(
            'Adoption and conversion figures aren’t part of this case: they belong to the business and I can’t audit them.',
            'Las cifras de adopción y conversión no forman parte de este caso: son del negocio y no puedo auditarlas.'
          )}</p>`
        },
        {
          id: 'learnings',
          label: t('Learnings & next steps', 'Aprendizajes y próximos pasos'),
          title: t('In SaaS, the states are the product.', 'En SaaS, los estados son el producto.'),
          body: `<div class="cols2"><div><h3>${t('Learnings', 'Aprendizajes')}</h3>${ul([
            t('Automation is trusted when it says what it is doing and how to stop it', 'La automatización genera confianza cuando dice qué está haciendo y cómo frenarla'),
            t('A bright brand color needs a rule: in UcoBot, lime works as a background and not as text', 'Un color de marca muy brillante necesita una regla: en UcoBot, el lima funciona como fondo y no como texto'),
            t('Naming is interface: the right verb saves a tutorial', 'Nombrar es interfaz: el verbo correcto ahorra un tutorial')
          ])}</div><div><h3>${t('Next steps', 'Próximos pasos')}</h3>${ul([
            t('Test the register with whoever uses it, during a real shift', 'Probar la caja con quien la usa, en un turno real'),
            t('Replace light gray labels and lime text on white', 'Reemplazar las etiquetas en gris claro y el texto lima sobre blanco'),
            t('Design the empty and first-day state of each module', 'Diseñar el estado vacío y el primer día de cada módulo')
          ])}</div></div>`
        }
      ]
    };
  }
};
