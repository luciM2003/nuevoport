import { figure, table, evidence, decisions, swatches, contrast, metrics, ul } from '../lib/html.mjs';
import { phones, showcase } from '../lib/phones.mjs';
import { lanes } from '../lib/diagrams.mjs';

export default {
  slug: 'modo-ya',
  kind: 'product',
  name: { en: 'MODO YA', es: 'MODO YA' },
  type: { en: 'Digital marketplace', es: 'Marketplace digital' },
  seo: {
    title: { en: 'MODO YA: designing a four-role local marketplace | Lucía Miranda', es: 'MODO YA: diseño de un marketplace local con cuatro roles | Lucía Miranda' },
    description: {
      en: 'Case study: a delivery marketplace for Malargüe, Argentina. Two apps, four roles, checkout, live tracking and exceptions, designed and built by a team of two.',
      es: 'Caso de estudio: marketplace de delivery para Malargüe, Argentina. Dos apps, cuatro roles, checkout, seguimiento en vivo y excepciones, en un equipo de dos personas.'
    }
  },
  build(ctx) {
    const { t } = ctx;
    const link = 'https://modoya-landing.vercel.app/';
    return {
      tagline: t(
        'One order, four people who each need something different. The design work was making them agree.',
        'Un pedido, cuatro personas que necesitan cosas distintas. El trabajo de diseño fue ponerlas de acuerdo.'
      ),
      coverAlt: t(
        'The same MODO YA order on four devices: the customer’s phone, the restaurant’s tablet, the rider’s phone and the admin’s live map.',
        'El mismo pedido de MODO YA en cuatro dispositivos: el teléfono del cliente, la tableta del local, el teléfono del rider y el mapa en vivo de administración.'
      ),
      overview: [
        [t('Industry', 'Industria'), t('Local commerce and logistics', 'Comercio local y logística')],
        [t('Product', 'Producto'), t('Multi-sided marketplace: two apps and a launch site', 'Marketplace de varios lados: dos apps y sitio de lanzamiento')],
        [t('My role', 'Mi rol'), t('Product, UX/UI and development', 'Producto, UX/UI y desarrollo')],
        [t('Responsibilities', 'Responsabilidades'), t('Requirements, roles and permissions, flows, UI and design system, launch site, pre-launch review', 'Requerimientos, roles y permisos, flujos, UI y sistema de diseño, sitio de lanzamiento, revisión previa')],
        [t('Team', 'Equipo'), t('Two people: Lucía Miranda and Álvaro González, at Codea Desarrollos, for a client in Malargüe', 'Dos personas: Lucía Miranda y Álvaro González, en Codea Desarrollos, para una clienta de Malargüe')],
        [t('Timeline', 'Duración'), t('September – October 2026', 'Septiembre – octubre 2026')],
        [t('Tools', 'Herramientas'), 'Flutter, Supabase, Mercado Pago'],
        [t('Status', 'Estado'), t('Pre-launch. Builds run on Android and Windows; restaurants and riders can pre-register', 'Prelanzamiento. Las apps corren en Android y Windows; locales y riders pueden preinscribirse')]
      ],
      links: [{ href: link, label: t('Visit the launch site', 'Ver el sitio de lanzamiento') }],
      note: t(
        'Screens captured from the real apps with sample data: restaurants, people and orders are fictional. The product is in Spanish because its audience is local.',
        'Pantallas capturadas de las apps reales con datos de ejemplo: los locales, las personas y los pedidos son ficticios.'
      ),
      exec: {
        problem: t(
          'In Malargüe, restaurants sell over WhatsApp or the phone and each one solves delivery alone. Customers can’t see what is open, pay without cash or know where their order is.',
          'En Malargüe, los locales venden por WhatsApp o teléfono y cada uno resuelve el envío solo. El cliente no puede ver qué está abierto, pagar sin efectivo ni saber dónde está su pedido.'
        ),
        approach: t(
          'I treated each order as a system with four roles. Two apps share one delivery engine, the server decides who is who, and every rule the client hadn’t settled became a setting instead of a guess.',
          'Traté cada pedido como un sistema con cuatro roles. Dos apps comparten un mismo motor de envíos, el servidor decide quién es quién y cada regla que la clienta no había definido pasó a ser configurable en lugar de inventada.'
        ),
        outcome: t(
          'Two apps and a launch site on one design system, 15 builds in two months and a full review with 15 findings ranked by severity before opening to the public.',
          'Dos apps y un sitio de lanzamiento sobre un mismo sistema de diseño, 15 versiones en dos meses y una revisión completa con 15 hallazgos ordenados por gravedad antes de abrir al público.'
        )
      },
      sections: [
        {
          id: 'challenge',
          label: t('The challenge', 'El desafío'),
          title: t('A town ready to order, with no app to do it.', 'Un pueblo con ganas de pedir, y sin app para hacerlo.'),
          body: `<p class="lede">${t(
            'The client wanted one local platform for two things: letting neighbors order from an app, and letting restaurants use a rider fleet for the orders they already receive by phone or WhatsApp.',
            'La clienta quería una plataforma local para dos cosas: que los vecinos pidan desde una app y que los locales usen una flota de riders para los pedidos que ya reciben por teléfono o WhatsApp.'
          )}</p>
          <p>${t(
            'Treating it as “a delivery app” would have solved the customer’s screen and left the other three people improvising. Each order passes through a customer, a restaurant, a rider and the admin team, and the account’s role decides which screens each one sees.',
            'Pensarlo como “una app de delivery” habría resuelto la pantalla del cliente y dejado a las otras tres personas improvisando. Cada pedido pasa por un cliente, un local, un rider y la administración, y el rol de la cuenta decide qué pantallas ve cada uno.'
          )}</p>
          ${table(ctx, {
            caption: t('Who takes part in an order', 'Quiénes participan en un pedido'),
            head: [t('Role', 'Rol'), t('What they need', 'Qué necesita'), t('Where', 'Dónde'), t('How they join', 'Cómo entra')],
            rows: [
              [t('Customer', 'Cliente'), t('Order food or an errand, pay without cash, track it live', 'Pedir comida o un mandado, pagar sin efectivo, seguirlo en vivo'), 'MODO YA', t('Signs up alone', 'Se registra solo')],
              [t('Restaurant', 'Local'), t('Receive orders, or request a rider for its own; update menu and prices quickly', 'Recibir pedidos o pedir un rider para los propios; actualizar menú y precios rápido'), 'MODO YA', t('Created by the admin team', 'Lo da de alta la administración')],
              ['Rider', t('Accept nearby deliveries and know how much to collect', 'Aceptar envíos cercanos y saber cuánto cobrar'), 'MODO YA Rider', t('Created by the admin team', 'Lo da de alta la administración')],
              [t('Admin', 'Administración'), t('Approve accounts, set fees and oversee operations', 'Aprobar cuentas, fijar tarifas y ver la operación'), 'MODO YA', t('Created manually', 'Se crea a mano')]
            ]
          })}
          <div class="cols2"><div><h3>${t('Business goals', 'Objetivos de negocio')}</h3>${ul([
            t('One local platform for orders and for delivery', 'Una sola plataforma local para pedidos y envíos'),
            t('Restaurants join without giving up WhatsApp', 'Que los locales se sumen sin dejar WhatsApp'),
            t('Rules the client can change without a developer', 'Reglas que la clienta pueda cambiar sin un desarrollador')
          ])}</div><div><h3>${t('Constraints', 'Restricciones')}</h3>${ul([
            t('A two-person team', 'Un equipo de dos personas'),
            t('Background location for riders: the permission app stores scrutinize most', 'Ubicación del rider en segundo plano: el permiso que más revisan las tiendas'),
            t('Business rules still undefined when work began', 'Reglas de negocio sin definir al empezar')
          ])}</div></div>`
        },
        {
          id: 'research',
          label: t('Research & discovery', 'Investigación y descubrimiento'),
          title: t('Ask first about what is most expensive to change.', 'Preguntar primero por lo más caro de cambiar.'),
          body: `<p class="lede">${t(
            'Before building, every open question went to the client in one document, ranked by how much it blocked.',
            'Antes de construir, todas las preguntas abiertas fueron a un documento para la clienta, ordenadas por cuánto bloqueaba cada una.'
          )}</p>
          <p>${t(
            'First came the ones that change how the product is built: is delivery paid in cash or digitally? Which documents does a rider need? What happens to a canceled order? Then the numbers that could be tuned later from the panel. Each question explained why it mattered and compared the options, so the client decided first on what was hardest to undo.',
            'Primero, las que cambian cómo se construye: ¿el envío se paga en efectivo o digital?, ¿qué documentación se le pide a un rider?, ¿qué pasa con un pedido cancelado? Después, los números que se podían ajustar desde el panel. Cada pregunta explicaba por qué importaba y comparaba las opciones, así la clienta decidió primero lo más difícil de deshacer.'
          )}</p>
          ${evidence(ctx, {
            known: [
              t('Restaurants already sell by WhatsApp and phone', 'Los locales ya venden por WhatsApp y teléfono'),
              t('Each one handles delivery however it can', 'Cada uno resuelve el envío como puede'),
              t('Stores are likely to reject background location inside a customer app', 'Es probable que las tiendas rechacen la ubicación en segundo plano dentro de una app de clientes')
            ],
            assumed: [
              t('Restaurants won’t drop WhatsApp for a new app', 'Los locales no van a dejar WhatsApp por una app nueva'),
              t('Seeing time and delivery cost early helps people choose', 'Ver tiempo y costo de envío desde el principio ayuda a elegir'),
              t('A proof of delivery prevents disputes', 'Una prueba de entrega evita discusiones')
            ],
            open: [
              t('How long riders take to accept a delivery', 'Cuánto tarda un rider en aceptar un envío'),
              t('The right search radius and per-kilometer fee', 'El radio de búsqueda y la tarifa por kilómetro correctos'),
              t('Behavior with real orders: the platform is in pre-launch', 'El comportamiento con pedidos reales: la plataforma está en prelanzamiento')
            ]
          })}`
        },
        {
          id: 'flows',
          label: t('User journeys & flows', 'Recorridos y flujos'),
          title: t('Four people in every order.', 'Cuatro personas en cada pedido.'),
          wide: lanes(
            ctx,
            t('Journey of an order across four roles', 'Recorrido de un pedido entre cuatro roles'),
            [t('Customer', 'Cliente'), t('Restaurant', 'Local'), 'Rider', t('Admin', 'Administración')],
            6,
            [
              { lane: 3, col: 1, span: 2, b: t('Before', 'Antes'), s: t('Approves accounts, sets fees and search radius', 'Aprueba cuentas, fija tarifas y radio de búsqueda'), tone: 'q' },
              { lane: 0, col: 1, n: 1, b: t('Builds the order', 'Arma el pedido'), s: t('Time and delivery fee visible from the first list', 'Tiempo y costo de envío visibles desde el primer listado') },
              { lane: 0, col: 2, n: 2, b: t('Confirms and pays', 'Confirma y paga'), s: t('Address and payment on one screen', 'Dirección y medio de pago en una pantalla') },
              { lane: 1, col: 3, n: 3, b: t('Prepares it', 'Lo prepara'), s: t('Order states update for everyone', 'Los estados se actualizan para todos') },
              { lane: 1, col: 1, span: 2, b: t('Second way in', 'Segunda entrada'), s: t('Requests a rider for an order that came by WhatsApp', 'Pide un rider para un pedido que llegó por WhatsApp'), tone: 'alt' },
              { lane: 2, col: 4, n: 4, b: t('Accepts a nearby delivery', 'Acepta un envío cercano'), s: t('Knows how much to collect', 'Sabe cuánto cobrar') },
              { lane: 1, col: 4, b: t('Hands it over', 'Lo entrega al rider'), s: t('With a pickup code', 'Con un código de retiro') },
              { lane: 2, col: 5, n: 5, b: t('On the way', 'En camino'), s: t('Visible on the customer’s map', 'Visible en el mapa del cliente') },
              { lane: 0, col: 5, b: t('Follows it live', 'Lo sigue en vivo'), s: t('Four clear states', 'Cuatro estados claros') },
              { lane: 0, col: 6, n: 6, b: t('Gives the 4-digit code', 'Da el código de 4 dígitos'), s: t('Then rates the delivery', 'Después califica la entrega') },
              { lane: 2, col: 6, b: t('Closes the delivery', 'Cierra la entrega'), s: t('Only with the code', 'Sólo con el código') },
              { lane: 3, col: 3, span: 4, b: t('During', 'Durante'), s: t('Oversees the operation', 'Supervisa la operación'), tone: 'q' }
            ]
          ),
          body: `<h3>${t('When something goes wrong', 'Cuando algo sale mal')}</h3>
          <p>${t(
            'Most of the trust in a delivery product is won or lost outside the ideal path. These are the situations the design had to answer, and the gaps the review found.',
            'En un producto de envíos, la confianza se gana o se pierde fuera del camino ideal. Estas son las situaciones que el diseño tenía que responder y los huecos que encontró la revisión.'
          )}</p>
          ${table(ctx, {
            caption: t('Exceptions and how the product handles them', 'Excepciones y cómo las resuelve el producto'),
            head: [t('Situation', 'Situación'), t('Answer', 'Respuesta'), t('State', 'Estado')],
            rows: [
              [t('It says delivered, but it never arrived', 'Figura entregado, pero no llegó'), t('The rider can only close the order with the customer’s code', 'El rider sólo cierra el pedido con el código del cliente'), `<span class="ok">${t('Designed', 'Diseñado')}</span>`],
              [t('Nobody accepts a delivery', 'Nadie acepta un envío'), t('Search radius and time to accept change from the panel, without a new version', 'Radio y tiempo para aceptar se cambian desde el panel, sin otra versión'), `<span class="ok">${t('Configurable', 'Configurable')}</span>`],
              [t('Someone registers as a restaurant or admin', 'Alguien se registra como local o administración'), t('The role comes from the server, never from the sign-up form', 'El rol viene del servidor, nunca del formulario de registro'), `<span class="ok">${t('Designed', 'Diseñado')}</span>`],
              [t('The customer picks bank transfer', 'El cliente elige transferencia'), t('The app promised to send an alias that no screen showed', 'La app prometía pasar un alias que ninguna pantalla mostraba'), `<span class="warn">${t('Found in review', 'Hallado en la revisión')}</span>`],
              [t('The network drops on the admin dashboard', 'Se corta la red en el panel de administración'), t('It showed zeros and a green banner, with no error', 'Mostraba ceros y un cartel verde, sin ningún error'), `<span class="warn">${t('Found in review', 'Hallado en la revisión')}</span>`],
              [t('One to three digits in the delivery code', 'Uno a tres dígitos en el código de entrega'), t('“Confirm” looked active and did nothing', '“Confirmar” se veía activo y no hacía nada'), `<span class="warn">${t('Found in review', 'Hallado en la revisión')}</span>`]
            ]
          })}
          <p class="aside">${t('I rebuilt that last one, with all its states, ', 'Ese último lo reconstruí, con todos sus estados, ')}<a href="${ctx.home('#design-and-code')}">${t('on the home page', 'en la página de inicio')}</a>.</p>`
        },
        {
          id: 'exploration',
          label: t('Design exploration', 'Exploración de diseño'),
          title: t('The alternatives we discarded, and what each choice cost.', 'Las alternativas que descartamos y lo que costó cada elección.'),
          body: decisions(ctx, [
            {
              p: t('One app for everyone?', '¿Una sola app para todos?'),
              pt: t('Riders need location in the background. Inside a customer app, publication would most likely be rejected.', 'El rider necesita ubicación en segundo plano. Dentro de una app de clientes, lo más probable es que rechacen la publicación.'),
              d: t('Two apps on one system', 'Dos apps sobre un sistema'),
              dt: t('MODO YA for customers, restaurants and admins; MODO YA Rider on its own. Design system and logic live in shared packages.', 'MODO YA para clientes, locales y administración; MODO YA Rider aparte. El sistema de diseño y la lógica viven en paquetes compartidos.'),
              c: t('two builds to publish and keep in step.', 'dos apps para publicar y mantener a la par.')
            },
            {
              p: t('App orders only?', '¿Sólo pedidos por la app?'),
              pt: t('Asking restaurants to leave the channels they already sell through meant losing them.', 'Pedirles a los locales que dejen los canales por los que ya venden era perderlos.'),
              d: t('Marketplace and courier on one engine', 'Marketplace y cadetería en un mismo motor'),
              dt: t('A restaurant receives in-app orders or requests a rider for an order that came from elsewhere. Both use the same assignment by proximity.', 'El local recibe pedidos por la app o pide un rider para uno que llegó por otro lado. Los dos usan la misma asignación por cercanía.')
            },
            {
              p: t('Who confirms that it arrived?', '¿Quién confirma que llegó?'),
              pt: t('Without proof, a “delivered” order that never arrived ends in an argument.', 'Sin una prueba, un pedido “entregado” que no llegó termina en discusión.'),
              d: t('A code at each handover', 'Un código en cada entrega'),
              dt: t('A pickup code between restaurant and rider, and a 4-digit code between customer and rider.', 'Un código de retiro entre local y rider, y uno de 4 dígitos entre cliente y rider.'),
              c: t('one more step at the door.', 'un paso más en la puerta.')
            },
            {
              p: t('Let people choose their role?', '¿Que cada uno elija su rol?'),
              pt: t('Anyone could claim to be a restaurant or an admin and see what isn’t theirs.', 'Cualquiera podría decir que es local o administración y ver lo que no le corresponde.'),
              d: t('The server assigns it', 'Lo asigna el servidor'),
              dt: t('Customers sign up alone. Restaurants and riders receive generated credentials from the admin team.', 'Los clientes se registran solos. Locales y riders reciben credenciales generadas por la administración.'),
              c: t('restaurants and riders can’t register on their own.', 'locales y riders no pueden darse de alta solos.')
            },
            {
              p: t('Guess the missing numbers?', '¿Inventar los números que faltan?'),
              pt: t('Fee per kilometer, search radius and time to accept hadn’t been decided.', 'Tarifa por kilómetro, radio de búsqueda y tiempo para aceptar no estaban decididos.'),
              d: t('Everything configurable', 'Todo configurable'),
              dt: t('The values change from the panel. The extra-kilometer fee started at $0 on purpose, to avoid inventing a charge nobody had defined.', 'Los valores se cambian desde el panel. El kilómetro adicional arrancó en $0 a propósito, para no inventar un cobro que nadie había definido.'),
              c: t('more settings to explain to the admin team.', 'más ajustes para explicarle a la administración.')
            }
          ])
        },
        {
          id: 'design-system',
          label: t('Design system', 'Sistema de diseño'),
          title: t('Black, yellow and an order in plain sight.', 'Negro, amarillo y un pedido a la vista.'),
          body: `<p class="lede">${t(
            'The redesign moved the brand identity into tokens, so the two apps and the site could change together.',
            'El rediseño llevó la identidad de la marca a tokens, para que las dos apps y el sitio cambien juntos.'
          )}</p>
          <h3>${t('Color', 'Color')}</h3>
          ${swatches([[t('Yellow', 'Amarillo'), '#FFC800'], [t('Pale yellow', 'Amarillo pálido'), '#FFF3C4'], [t('Amber, for prices', 'Ámbar, para precios'), '#8A6100'], [t('Black', 'Negro'), '#141416'], [t('Gray text', 'Texto gris'), '#5C5C66'], [t('Surface', 'Superficie'), '#F1F1F4'], [t('Error', 'Error'), '#C22C2C'], [t('Success', 'Éxito'), '#2E9E5B']])}
          <h3>${t('Contrast audit', 'Auditoría de contraste')}</h3>
          ${contrast(ctx, [
            [t('Black on yellow (buttons)', 'Negro sobre amarillo (botones)'), '#171200', '#FFC800', '12.03'],
            [t('Yellow on black', 'Amarillo sobre negro'), '#FFC800', '#141416', '11.83'],
            [t('Amber prices on white', 'Precios en ámbar sobre blanco'), '#8A6100', '#ffffff', '5.54'],
            [t('Gray text on white', 'Texto gris sobre blanco'), '#5C5C66', '#ffffff', '6.60'],
            [t('Error on white', 'Error sobre blanco'), '#C22C2C', '#ffffff', '5.69'],
            [t('Success on white', 'Éxito sobre blanco'), '#2E9E5B', '#ffffff', '3.41', t('Text uses a darker green on a pale one', 'El texto usa un verde más oscuro sobre uno pálido')]
          ])}
          <h3>${t('Rules that keep it consistent', 'Reglas que lo mantienen consistente')}</h3>
          ${ul([
            t('Yellow carries actions, prices and progress; everything else stays in grays', 'El amarillo lleva acciones, precios y avance; el resto queda en grises'),
            t('One primary button per step, at the bottom of the screen', 'Un botón principal por paso, al pie de la pantalla'),
            t('The same four order states in both apps: confirmed, preparing, on the way, delivered', 'Los mismos cuatro estados en las dos apps: confirmado, en preparación, en camino, entregado'),
            t('Every line of copy needs a flow behind it that delivers what it says', 'Cada texto necesita un flujo detrás que cumpla lo que dice')
          ])}`
        },
        {
          id: 'solution',
          label: t('Final solution', 'Solución final'),
          title: t('From opening the app to knowing who is at the door.', 'De abrir la app a saber quién está en la puerta.'),
          wide: phones(ctx, t('Customer flow in MODO YA', 'Flujo del cliente en MODO YA'), [
            { img: 'modoya-c-home', title: t('Choose', 'Elegir'), text: t('The delivery address is always in view; today’s deals come first.', 'La dirección de entrega siempre a la vista; primero, las ofertas de hoy.'), alt: t('Customer home with address, food categories and today’s deals', 'Inicio del cliente con dirección, comidas y ofertas del día') },
            { img: 'modoya-c-cart', title: t('Confirm', 'Confirmar'), text: t('Products, address on a map and the total with delivery, on one screen.', 'Productos, dirección en el mapa y total con envío, en una pantalla.'), alt: t('Cart with two products, delivery address on a map and total', 'Carrito con dos productos, dirección en el mapa y total') },
            { img: 'modoya-c-kitchen', title: t('Wait', 'Esperar'), text: t('State, estimated time and map from the first minute.', 'Estado, tiempo estimado y mapa desde el primer minuto.'), alt: t('Order being prepared with map and four steps', 'Pedido en preparación con mapa y cuatro pasos') },
            { img: 'modoya-c-way', title: t('Follow', 'Seguir'), text: t('The rider’s route and the code to hand over.', 'El recorrido del rider y el código para entregar.'), alt: t('Order on the way with route, delivery code and rider', 'Pedido en camino con recorrido, código de entrega y rider') },
            { img: 'modoya-c-done', title: t('Close', 'Cerrar'), text: t('The receipt stays, with a way to file a claim.', 'El detalle queda, con una forma de reclamar.'), alt: t('Delivered order with receipt and claim button', 'Pedido entregado con detalle y botón para reclamar') }
          ], { bg: 'radial-gradient(70% 120% at 30% 0,#ffe07a 0,#f7c81c 50%,#e8b000 100%)' }),
          body: `<h3>${t('The same order, seen by the restaurant', 'El mismo pedido, visto por el local')}</h3>
          <p>${t('Orders move through three groups: in the kitchen, ready and on the way. Each card has a single button, and it says the next step.', 'Los pedidos pasan por tres grupos: en cocina, listos y en camino. Cada tarjeta tiene un solo botón, que dice el paso siguiente.')}</p>
          ${showcase(ctx, 'tb', 'modoya-l-kitchen', { bg: '#f2f2f4', title: t('Orders', 'Pedidos'), text: t('“Ready: call a rider” starts the delivery from the same card.', '“Listo: llamar rider” inicia el envío desde la misma tarjeta.'), alt: t('Restaurant order board with orders in the kitchen and one action per card', 'Tablero del local con pedidos en cocina y una acción por tarjeta') })}
          ${showcase(ctx, 'tb', 'modoya-l-menu', { bg: '#f2f2f4', title: t('Menu', 'Menú'), text: t('Running out of something is one switch on the product itself.', 'Que algo se termine es un interruptor en el mismo producto.'), alt: t('Menu editor with photos, prices and an availability switch per product', 'Editor del menú con fotos, precios e interruptor de disponibilidad por producto') })}
          <h3>${t('The rider, one action at a time', 'El rider, una acción por vez')}</h3>
          <p>${t('Four steps: go, pick up, leave, deliver. Until a rider accepts, the customer’s details stay hidden.', 'Cuatro pasos: ir, retirar, salir, entregar. Hasta que el rider acepta, los datos del cliente no se muestran.')}</p>
          ${phones(ctx, t('Rider app', 'App del rider'), [
            { img: 'modoya-r-home', title: t('Connected', 'Conectado'), text: t('Location is shared only while connected.', 'La ubicación se comparte sólo mientras está conectado.'), alt: t('Rider home with the delivery in progress', 'Inicio del rider con el envío en curso') },
            { img: 'modoya-r-pickup', title: t('Pick up', 'Retirar'), text: t('Where, what and how to get there.', 'Dónde, qué y cómo llegar.'), alt: t('Step one of four: go to the restaurant, with map', 'Paso uno de cuatro: ir al local, con mapa') },
            { img: 'modoya-r-way', title: t('Deliver', 'Entregar'), text: t('The app says to ask for the 4 digits.', 'La app avisa que hay que pedir los 4 números.'), alt: t('Step four of four: deliver, with map and confirm button', 'Paso cuatro de cuatro: entregar, con mapa y botón de confirmar') },
            { img: 'modoya-r-done', title: t('Done', 'Listo'), text: t('Earnings recorded on the spot.', 'La ganancia queda registrada en el momento.'), alt: t('Delivery completed with the amount earned', 'Entrega completada con lo ganado') }
          ])}
          <h3>${t('Admin, what is happening now', 'Administración, qué está pasando ahora')}</h3>
          ${showcase(ctx, 'lt', 'modoya-a-live', { bg: 'radial-gradient(80% 120% at 30% 0,#3a3a40 0,#1d1d21 55%,#111114 100%)', title: t('Live map', 'Mapa en vivo'), text: t('Deliveries, open restaurants, connected riders and a list of what needs a decision.', 'Envíos, locales abiertos, riders conectados y una lista de lo que necesita una decisión.'), alt: t('Admin overview with indicators, live map of riders and attention panel', 'Resumen de administración con indicadores, mapa en vivo de riders y panel de atención') })}
          <div class="cols2"><div><h3>${t('Payments', 'Pagos')}</h3><p>${t('Card inside the app with Mercado Pago. Bank transfer was removed after the review found a promise the flow couldn’t keep.', 'Tarjeta dentro de la app con Mercado Pago. La transferencia se sacó después de que la revisión encontró una promesa que el flujo no podía cumplir.')}</p></div><div><h3>MODO YA Plus</h3><p>${t('Monthly subscription with free delivery that renews itself and is canceled with one tap.', 'Suscripción mensual con envío gratis, que se renueva sola y se da de baja de un toque.')}</p></div><div><h3>${t('Notifications', 'Avisos')}</h3><p>${t('Push messages, a different sound per role and abandoned-cart reminders.', 'Notificaciones push, un sonido por rol y recordatorios de carrito abandonado.')}</p></div><div><h3>${t('Errands', 'Mandados')}</h3><p>${t('A customer can also request a rider to drop off or pick up something.', 'El cliente también puede pedir un rider para llevar o buscar algo.')}</p></div></div>
          <h3>${t('A launch site you travel like a delivery', 'Un sitio de lanzamiento que se recorre como un envío')}</h3>
          <p>${t(
            'The site speaks to three audiences: neighbors, restaurants and people with a motorbike. It is organized as a rider’s route: a dashed line follows the scroll and each section is a stop.',
            'El sitio le habla a tres públicos: vecinos, locales y personas con moto. Está organizado como la ruta de un rider: una línea punteada acompaña el scroll y cada sección es una parada.'
          )}</p>
          ${figure(ctx, 'modoya-landing', { url: 'modoya-landing.vercel.app', title: t('Three paths from the first screen', 'Tres caminos desde la primera pantalla'), text: t('Customer, restaurant or rider. The main button says “coming soon” because the platform is in pre-launch.', 'Cliente, local o rider. El botón principal dice “Próximamente” porque la plataforma está en prelanzamiento.'), alt: t('MODO YA launch site: headline, phone with the app and food around it', 'Sitio de MODO YA: titular, teléfono con la app y comida alrededor') })}
          ${figure(ctx, 'modoya-landing-services', { url: 'modoya-landing.vercel.app', title: t('Services split by audience', 'Servicios separados por público'), text: t('Every card ends in an action.', 'Cada tarjeta termina en una acción.'), alt: t('Services for customers and for restaurants, and a yellow band for riders', 'Servicios para clientes y locales, y una franja amarilla para riders') })}
          ${figure(ctx, 'modoya-landing-join', { url: 'modoya-landing.vercel.app', title: t('Pre-registration', 'Preinscripción'), text: t('A switch between restaurant and rider, benefits on the left, a short form on the right. Follow-up happens on WhatsApp, the channel they already use.', 'Un selector entre local y rider, beneficios a la izquierda y un formulario corto a la derecha. El contacto sigue por WhatsApp, el canal que ya usan.'), alt: t('Pre-registration form for restaurants with benefits on the left', 'Formulario de preinscripción de locales con beneficios a la izquierda') })}`
        },
        {
          id: 'implementation',
          label: t('Implementation & collaboration', 'Implementación y colaboración'),
          title: t('Two people, one pipeline, one list of findings.', 'Dos personas, un mismo proceso de publicación y una lista de hallazgos.'),
          body: `<p class="lede">${t(
            'Design and development shared the same source: tokens and components in common packages, and access rules in the database.',
            'Diseño y desarrollo compartieron la misma fuente: tokens y componentes en paquetes comunes, y reglas de acceso en la base de datos.'
          )}</p>
          ${ul([
            t('Each new version is published automatically from the repository, and the apps update themselves on Android and Windows', 'Cada versión nueva se publica automáticamente desde el repositorio y las apps se actualizan solas en Android y Windows'),
            t('55 database migrations, with permissions defined per role', '55 migraciones de base de datos, con permisos definidos por rol'),
            t('Before launch we went through the whole app looking for gaps between what the screens say and what the system can do: 15 findings, ranked by severity', 'Antes de lanzar recorrimos toda la app buscando huecos entre lo que dicen las pantallas y lo que el sistema puede cumplir: 15 hallazgos, ordenados por gravedad')
          ])}
          <blockquote class="pull"><p>${t(
            'What is unfinished is rarely half-written code. It is the gap between what a screen promises and what the system does.',
            'Lo incompleto casi nunca está en el código a medio escribir, sino en el hueco entre lo que la pantalla promete y lo que el sistema hace.'
          )}</p></blockquote>`
        },
        {
          id: 'outcomes',
          label: t('Outcomes & impact', 'Resultados e impacto'),
          title: t('What can be verified today.', 'Lo que se puede verificar hoy.'),
          body: `${metrics([
            ['2 + 1', t('apps and a launch site on one design system', 'apps y un sitio de lanzamiento, con un solo sistema de diseño')],
            ['4', t('roles with their own screens and permissions', 'roles con pantallas y permisos propios')],
            ['15', t('builds released between September and October 2026', 'versiones publicadas entre septiembre y octubre de 2026')],
            ['15', t('review findings ranked by severity before launch', 'hallazgos ordenados por gravedad antes del lanzamiento')]
          ])}
          <p class="aside">${t(
            'Orders, delivery times and retention aren’t here because the platform hasn’t opened to the public. They are the first thing to measure.',
            'No hay pedidos, tiempos de entrega ni retención porque la plataforma todavía no abrió al público. Es lo primero a medir.'
          )}</p>`
        },
        {
          id: 'learnings',
          label: t('Learnings & next steps', 'Aprendizajes y próximos pasos'),
          title: t('What I would do earlier next time.', 'Lo que haría antes la próxima vez.'),
          body: `<div class="cols2"><div><h3>${t('Learnings', 'Aprendizajes')}</h3>${ul([
            t('A marketplace has four users, not one: every decision is checked from the four sides', 'Un marketplace tiene cuatro usuarios, no uno: cada decisión se mira desde los cuatro lados'),
            t('Ranking questions by how much they block moved the client to decide first on what was most expensive to change', 'Ordenar las preguntas por cuánto bloquean hizo que la clienta decidiera primero lo más caro de cambiar'),
            t('I would run the screen-versus-system review at each milestone, not only before launch', 'Haría la revisión de pantallas contra sistema en cada hito, no sólo antes de lanzar')
          ])}</div><div><h3>${t('Next steps', 'Próximos pasos')}</h3>${ul([
            t('Close the remaining findings, starting with high severity', 'Cerrar los hallazgos pendientes, empezando por los de gravedad alta'),
            t('Measure how long riders take to accept and tune the search radius', 'Medir cuánto tarda un rider en aceptar y ajustar el radio de búsqueda'),
            t('Add screens for complaints and for riders and restaurants to see their payouts', 'Sumar pantallas para reclamos y para que riders y locales vean sus liquidaciones')
          ])}</div></div>`
        }
      ]
    };
  }
};
