// Datos generales del sitio. Los datos profesionales salen del CV vigente (carpeta /cv).
export const SITE = {
  origin: 'https://lucim2003.github.io',
  base: '/nuevoport/',
  name: 'Lucía Miranda',
  email: 'luciacmiranda9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucia-miranda-6569841b9',
  year: 2026,
  cv: {
    en: { file: 'cv/Lucia-Miranda-CV-EN.pdf', download: 'Lucia-Miranda-UX-UI-Product-Designer-Resume.pdf' },
    es: { file: 'cv/Lucia-Miranda-CV-ES.pdf', download: 'Lucia-Miranda-Disenadora-UX-UI-Producto-CV.pdf' }
  }
};

// Trayectoria: mismas fechas y cargos que el CV.
export const EXPERIENCE = [
  {
    when: { en: '2023 – Present', es: '2023 – Actualidad' },
    role: { en: 'UX/UI Designer & Front-End Developer', es: 'Diseñadora UX/UI y Desarrolladora Front-End' },
    where: { en: 'Freelance, remote', es: 'Freelance, remoto' },
    text: {
      en: 'Design and development of responsive web applications, from research and client requirements to wireframes, prototypes, reusable components and implemented interfaces in React, TypeScript and Tailwind CSS.',
      es: 'Diseño y desarrollo de aplicaciones web responsive: de la investigación y los requerimientos del cliente a wireframes, prototipos, componentes reutilizables e interfaces implementadas en React, TypeScript y Tailwind CSS.'
    }
  },
  {
    when: { en: '2022 – 2025', es: '2022 – 2025' },
    role: { en: 'Product Manager', es: 'Product Manager' },
    where: { en: 'Freelance, remote', es: 'Freelance, remoto' },
    text: {
      en: 'Requirements gathering with clients and development teams, roadmaps, backlog prioritization and delivery tracking with Scrum and Kanban.',
      es: 'Relevamiento de requerimientos con clientes y equipos de desarrollo, roadmaps, priorización de backlog y seguimiento de entregas con Scrum y Kanban.'
    }
  }
];

// El certificado de Data Science no se enlaza: el PDF muestra el número de documento.
export const EDUCATION = [
  { title: { en: 'Diploma in UX/UI Design', es: 'Diplomatura en Diseño UX/UI' }, where: 'Universidad Abierta Interamericana (UAI)', when: { en: 'Jan – Jun 2025', es: 'Ene – jun 2025' }, cert: 'certifictes/diplomatura uxui.pdf' },
  { title: { en: 'Data Science', es: 'Ciencia de Datos' }, where: 'UTN Buenos Aires', when: { en: 'Oct 2025', es: 'Oct 2025' } },
  { title: { en: 'UX Writing', es: 'UX Writing' }, where: 'Coderhouse', when: { en: 'Feb 2025', es: 'Feb 2025' } },
  { title: { en: 'UI: User Interface', es: 'UI: Interfaz de Usuario' }, where: 'EducaciónIT', when: { en: 'Oct 2024', es: 'Oct 2024' }, cert: 'certifictes/ui interfaz.pdf' },
  { title: { en: 'Web Development with HTML', es: 'Desarrollo Web con HTML' }, where: 'EducaciónIT', when: { en: 'Jun 2024', es: 'Jun 2024' }, cert: 'certifictes/desarrollo web con html.pdf' },
  { title: { en: 'Product Management', es: 'Product Management' }, where: 'Coderhouse', when: { en: 'Apr 2024', es: 'Abr 2024' } },
  { title: { en: 'Web Development', es: 'Desarrollo Web' }, where: 'Universidad Tecnológica Nacional (UTN)', when: { en: 'Completed', es: 'Finalizado' } }
];
