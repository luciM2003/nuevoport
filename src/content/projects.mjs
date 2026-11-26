// Proyectos de la página de inicio. Cada dato sale del caso, del producto publicado o del CV.
const R = { en: 'Role', es: 'Rol' };
const S = { en: 'Scope', es: 'Alcance' };
const T = { en: 'Team', es: 'Equipo' };
const E = { en: 'Status', es: 'Estado' };

export const FEATURED = [
  {
    slug: 'modo-ya',
    name: { en: 'MODO YA', es: 'MODO YA' },
    type: { en: 'Digital marketplace, mobile and web', es: 'Marketplace digital, móvil y web' },
    claim: { en: 'One order, four people who each need something different.', es: 'Un pedido, cuatro personas que necesitan cosas distintas.' },
    text: {
      en: 'A local commerce ecosystem for Malargüe, Argentina. Customers, restaurants, riders and an admin team work through two apps that share one delivery engine, with checkout, live tracking and access by role.',
      es: 'Un ecosistema de comercio local para Malargüe, Argentina. Clientes, locales, riders y administración operan en dos apps que comparten un mismo motor de envíos, con checkout, seguimiento en vivo y acceso por rol.'
    },
    facts: [
      [R, { en: 'Product, UX/UI and development', es: 'Producto, UX/UI y desarrollo' }],
      [T, { en: 'Two people', es: 'Dos personas' }],
      [S, { en: '2 apps, 4 roles, launch site', es: '2 apps, 4 roles, sitio de lanzamiento' }],
      [E, { en: 'Pre-launch', es: 'Prelanzamiento' }]
    ]
  },
  {
    slug: 'ucobot',
    name: { en: 'UcoBot', es: 'UcoBot' },
    type: { en: 'B2B SaaS, CRM and automation', es: 'SaaS B2B, CRM y automatización' },
    claim: { en: 'From a chat message to an order, a booking or a follow-up.', es: 'De un mensaje de chat a un pedido, una reserva o un seguimiento.' },
    text: {
      en: 'An AI and CRM platform for businesses that sell over chat. I designed an experience that centralizes contacts, automates follow-ups and streamlines sales, so a technical platform can be run without writing code.',
      es: 'Una plataforma de IA y CRM para negocios que venden por chat. Diseñé una experiencia que centraliza contactos, automatiza seguimientos y ordena las ventas, para operar una plataforma técnica sin escribir código.'
    },
    facts: [
      [R, { en: 'UX/UI design', es: 'Diseño UX/UI' }],
      [T, { en: 'Codea Desarrollos', es: 'Codea Desarrollos' }],
      [S, { en: 'Inbox, bots, automations, bookings, POS', es: 'Bandeja, bots, automatizaciones, reservas, caja' }],
      [E, { en: 'Live', es: 'Publicado' }]
    ]
  },
  {
    slug: 'byd-quality-portal',
    name: { en: 'BYD Quality Portal', es: 'Portal de Calidad BYD' },
    type: { en: 'Enterprise platform, automotive', es: 'Plataforma empresarial, automotriz' },
    claim: { en: 'Four dashboards and six spreadsheets, replaced by one portal.', es: 'Cuatro tableros y seis planillas, reemplazados por un portal.' },
    text: {
      en: 'Quality data for an official BYD dealership lived in files updated by hand. The portal reads those same files, shows each role only what it needs and moves unhappy customers to the top.',
      es: 'La información de calidad de un concesionario oficial BYD vivía en archivos que se actualizaban a mano. El portal lee esos mismos archivos, le muestra a cada rol lo que necesita y pone primero a los clientes disconformes.'
    },
    facts: [
      [R, { en: 'End-to-end UX/UI and development', es: 'UX/UI y desarrollo de punta a punta' }],
      [{ en: 'Users', es: 'Usuarios' }, { en: 'Six roles', es: 'Seis roles' }],
      [S, { en: '12 modules, desktop and mobile', es: '12 módulos, escritorio y celular' }],
      [E, { en: 'In use', es: 'En uso' }]
    ]
  },
  {
    slug: 'padel-hub',
    name: { en: 'Padel Hub', es: 'Padel Hub' },
    type: { en: 'Booking platform, sports', es: 'Plataforma de reservas, deporte' },
    claim: { en: 'From messaging the club to a booked court in four steps.', es: 'Del mensaje al club a la cancha reservada en cuatro pasos.' },
    text: {
      en: 'Two connected experiences: an app where players book courts and join matches at their level, and a dashboard where clubs manage availability, clients and payments.',
      es: 'Dos experiencias conectadas: una app donde el jugador reserva y se suma a partidos de su nivel, y un panel donde el club gestiona disponibilidad, clientes y cobros.'
    },
    facts: [
      [R, { en: 'UX/UI and front-end', es: 'UX/UI y front-end' }],
      [T, { en: 'Two people', es: 'Dos personas' }],
      [S, { en: '25 screens, 2 experiences', es: '25 pantallas, 2 experiencias' }],
      [E, { en: 'Working demo, payment simulated', es: 'Demo funcional, pago simulado' }]
    ]
  }
];

export const CONCEPTS = [
  {
    slug: 'turno',
    proto: 'turno',
    name: { en: 'Turno', es: 'Turno' },
    sector: { en: 'Healthcare', es: 'Salud' },
    claim: { en: 'A medical appointment in three taps, at 25 or at 75.', es: 'Un turno médico en tres toques, a los 25 o a los 75.' },
    skills: { en: 'accessibility, flows, heuristic evaluation', es: 'accesibilidad, flujos, evaluación heurística' }
  },
  {
    slug: 'ruta-del-vino',
    proto: 'ruta-del-vino',
    name: { en: 'Ruta del Vino', es: 'Ruta del Vino' },
    sector: { en: 'Tourism', es: 'Turismo' },
    claim: { en: 'A winery day planned as one route instead of ten tabs.', es: 'Un día de bodegas como un recorrido y no como diez pestañas.' },
    skills: { en: 'interaction design, itinerary logic, offline use', es: 'diseño de interacción, lógica de itinerario, uso sin conexión' }
  },
  {
    slug: 'alcancia',
    proto: 'alcancia',
    name: { en: 'Alcancía', es: 'Alcancía' },
    sector: { en: 'Fintech', es: 'Fintech' },
    claim: { en: 'Personal finance that shows one clear number at a time.', es: 'Finanzas personales que muestran un número claro por vez.' },
    skills: { en: 'behavioral design, data display, UX writing', es: 'diseño de comportamiento, visualización, UX writing' }
  }
];

export const ARCHIVE = [
  {
    name: 'Estudio AGV',
    img: 'x-agv',
    host: 'estudioagv.com',
    url: 'https://www.estudioagv.com/',
    tools: 'Next.js, Tailwind CSS',
    what: { en: 'Website for a law practice', es: 'Sitio para un estudio jurídico' },
    kind: { en: 'Client, live', es: 'Cliente, publicado' },
    text: {
      en: 'Design and development for a lawyer in Mendoza who had no professional presence online. Clear practice areas, quick contact and a working form, on any screen size.',
      es: 'Diseño y desarrollo para una abogada de Mendoza que no tenía presencia profesional online. Áreas de práctica claras, contacto rápido y formulario funcional, en cualquier pantalla.'
    }
  },
  {
    name: 'Codea',
    img: 'x-codea',
    host: 'codeadesarrollos.com',
    url: 'https://codeadesarrollos.com/',
    tools: 'Figma, HTML, CSS, JavaScript',
    what: { en: 'Website for a software studio', es: 'Sitio de un estudio de software' },
    kind: { en: 'Studio, live', es: 'Estudio, publicado' },
    text: {
      en: 'The studio behind MODO YA and UcoBot, where I combine design and code in digital products made to measure.',
      es: 'El estudio detrás de MODO YA y UcoBot, donde combino diseño y código en productos digitales a medida.'
    }
  },
  {
    name: 'Move',
    img: 'x-move',
    host: 'move',
    tall: 'x-move-tall',
    url: 'https://kaleidoscopic-pika-577f64.netlify.app/',
    tools: 'Figma, wireframes, prototyping',
    what: { en: 'Sportswear e-commerce', es: 'E-commerce de indumentaria deportiva' },
    kind: { en: 'Prototype', es: 'Prototipo' },
    text: {
      en: 'An exploration of shopping for sportswear: clear navigation, product pages that answer before being asked and a short checkout.',
      es: 'Exploración de compra de indumentaria deportiva: navegación clara, fichas que responden antes de que se pregunte y un checkout corto.'
    }
  },
  {
    name: 'Lithium',
    img: 'x-lithium',
    host: 'lithium',
    url: 'https://famous-trifle-7a5c4f.netlify.app/',
    tools: 'Figma, design system',
    what: { en: 'Web3 interface', es: 'Interfaz Web3' },
    kind: { en: 'Prototype', es: 'Prototipo' },
    text: {
      en: 'A visual prototype that tests how to present blockchain concepts to people without technical knowledge. The figures on screen are placeholders.',
      es: 'Prototipo visual que prueba cómo presentar conceptos de blockchain a personas sin conocimiento técnico. Las cifras en pantalla son de muestra.'
    }
  },
  {
    name: 'Stretch',
    img: 'x-stretch',
    host: 'stretch',
    tall: 'x-stretch-tall',
    url: 'https://www.codeadesarrollos.com/proyectos/stretch/index.html',
    tools: 'Branding, UI, responsive',
    what: { en: 'Natural cosmetics store', es: 'Tienda de cosmética natural' },
    kind: { en: 'Studio project', es: 'Proyecto de estudio' },
    text: {
      en: 'Store system and product pages for a beauty brand built around sustainability, with a responsive layout and a reusable product pattern.',
      es: 'Sistema de tienda y fichas de producto para una marca de belleza con foco en sustentabilidad, con layout responsive y un patrón de producto reutilizable.'
    }
  },
  {
    name: 'Creative Studio',
    img: 'x-studio',
    host: 'creative studio',
    url: 'https://www.codeadesarrollos.com/proyectos/creative-studio/hero-section.html',
    tools: 'Branding, UI',
    what: { en: 'Landing page for a creative collective', es: 'Landing de un colectivo creativo' },
    kind: { en: 'Studio project', es: 'Proyecto de estudio' },
    text: {
      en: 'Visual system and opening screen for a creative collective: identity, campaign direction and modular blocks. The figures on screen are placeholders.',
      es: 'Sistema visual y pantalla inicial para un colectivo creativo: identidad, dirección de campaña y bloques modulares. Las cifras en pantalla son de muestra.'
    }
  },
  {
    name: 'Bakery Facilities',
    img: 'x-bakery',
    host: 'bakery facilities',
    url: 'https://www.codeadesarrollos.com/proyectos/bakery/index.html',
    tools: 'Branding, UI',
    what: { en: 'Site for bakery professionals', es: 'Sitio para profesionales de la panadería' },
    kind: { en: 'Studio project', es: 'Proyecto de estudio' },
    text: {
      en: 'Visual identity and product presentation for a brand that supplies bakeries, with an appetising tone and a clear commercial path.',
      es: 'Identidad visual y presentación de productos para una marca que provee a panaderías, con un tono apetitoso y un recorrido comercial claro.'
    }
  }
];
