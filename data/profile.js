/* ==========================================================================
   PERFIL — edita aquí tus datos personales, skills y experiencia.
   Todo el texto que cambia con el idioma va en { es: "...", en: "..." }.
   Las fechas usan formato "AAAA-MM"; deja `end: null` si sigue en curso
   y la web mostrará "Actualidad / Present" y calculará la duración sola.
   ========================================================================== */
window.PROFILE = {
  handle: "303/AIDEN",
  name: "Aiden Jiménez",
  role: {
    es: "Desarrollador web & diseñador gráfico",
    en: "Web developer & graphic designer",
  },
  // Rotan en la pantalla del monitor del hero
  titles: {
    es: ["Desarrollador web", "Diseñador gráfico"],
    en: ["Web developer", "Graphic designer"],
  },
  location: { es: "España", en: "Spain" },
  available: true, // muestra el indicador "disponible para trabajar"

  // Año en el que empezaste a programar/diseñar → calcula los "años de experiencia"
  careerStart: "2023-09",
  // Año de inicio del copyright (el año final se calcula solo)
  copyrightStart: 2025,

  email: "cybr303@gmail.com",
  linkedin: "https://www.linkedin.com/in/tu-usuario/",
  github: "https://github.com/aidenk23",
  cv: {
    es: "documentos/AidenJimenez_CV.pdf",
    en: "documentos/AidenJimenez_CV.pdf",
  },
  photo: "img/profile.svg", // sustituye por tu foto (p. ej. img/profile.jpg)

  stickyNote: {
    es: "¡Hola! Diseño lo que programo y programo lo que diseño :)",
    en: "Hi! I design what I code and code what I design :)",
  },

  about: {
    hello: { es: "Hola,", en: "Hello," },
    lead: {
      es: "soy Aiden, desarrollador web y diseñador gráfico.",
      en: "I'm Aiden, a web developer and graphic designer.",
    },
    body: {
      es: "Me muevo entre el código y el diseño: construyo aplicaciones web completas con Laravel y JavaScript, y cuido que cada interfaz sea clara, accesible y con personalidad. Me gusta entender el problema antes de abrir el editor, prototipar rápido en Figma y pulsar el detalle hasta que todo encaja.",
      en: "I work between code and design: I build full web applications with Laravel and JavaScript, and I make sure every interface is clear, accessible and has personality. I like to understand the problem before opening the editor, prototype quickly in Figma and polish the details until everything clicks.",
    },
  },

  // Iconos: `icon` es el nombre del SVG en img/icons/ (sacados de https://simpleicons.org).
  // Si no hay icono o falla, se muestra `abbr` como monograma.
  skills: [
    { name: "HTML5", icon: "html5", abbr: "H5" },
    { name: "CSS3", icon: "css3", abbr: "C3" },
    { name: "JavaScript", icon: "javascript", abbr: "JS" },
    { name: "PHP", icon: "php", abbr: "PHP" },
    { name: "Laravel", icon: "laravel", abbr: "Lv" },
    { name: "Blade", icon: "blade", abbr: "{{ }}" },
    { name: "MySQL", icon: "mysql", abbr: "SQL" },
    { name: "Bootstrap", icon: "bootstrap", abbr: "Bs" },
    { name: "Tailwind", icon: "tailwindcss", abbr: "Tw" },
    { name: "Git", icon: "git", abbr: "Git" },
    { name: "GitHub", icon: "github", abbr: "GH" },
    { name: "Figma", icon: "figma", abbr: "Fg" },
    { name: "Photoshop", icon: "adobephotoshop", abbr: "Ps" },
    { name: "Illustrator", icon: "adobeillustrator", abbr: "Ai" },
    { name: "InDesign", icon: "adobeindesign", abbr: "Id" },
    { name: "Canva", icon: "canva", abbr: "Cv" },
  ],

  softSkills: [
    { es: "Comunicación con cliente y equipo", en: "Client & team communication" },
    { es: "Pensamiento visual", en: "Visual thinking" },
    { es: "Resolución de problemas", en: "Problem solving" },
    { es: "Autonomía y organización", en: "Autonomy & organisation" },
    { es: "Atención al detalle", en: "Attention to detail" },
    { es: "Aprendizaje continuo", en: "Continuous learning" },
  ],

  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "Avanzado", en: "Advanced" } },
  ],

  // Cosas que me gustan / hobbies (página "Sobre mí"). EJEMPLOS: cámbialos por los tuyos.
  // `icon` es un carácter o emoji corto que se muestra en el cuadrado azul.
  hobbies: [
    {
      icon: "♪",
      title: { es: "Música", en: "Music" },
      text: { es: "Texto de ejemplo: qué escuchas mientras programas o diseñas.", en: "Sample text: what you listen to while coding or designing." },
    },
    {
      icon: "▶",
      title: { es: "Videojuegos", en: "Video games" },
      text: { es: "Texto de ejemplo: tus juegos favoritos y qué te inspiran.", en: "Sample text: your favourite games and what inspires you." },
    },
    {
      icon: "◎",
      title: { es: "Fotografía", en: "Photography" },
      text: { es: "Texto de ejemplo: qué te gusta fotografiar.", en: "Sample text: what you like to photograph." },
    },
    {
      icon: "文",
      title: { es: "Cultura japonesa", en: "Japanese culture" },
      text: { es: "Texto de ejemplo: diseño editorial, anime, tipografía...", en: "Sample text: editorial design, anime, typography..." },
    },
  ],

  // Experiencia laboral — la más reciente primero
  experience: [
    {
      title: { es: "Desarrollador web (prácticas)", en: "Web developer (internship)" },
      place: "Nombre de la empresa · Ciudad",
      start: "2025-03",
      end: "2025-06",
      tasks: [
        { es: "Maquetación responsive", en: "Responsive layouts" },
        { es: "Back-end en Laravel", en: "Laravel back-end" },
        { es: "Mantenimiento de webs", en: "Website maintenance" },
      ],
    },
    {
      title: { es: "Diseñador gráfico freelance", en: "Freelance graphic designer" },
      place: "Autónomo · Remoto",
      start: "2024-01",
      end: null,
      tasks: [
        { es: "Identidad visual", en: "Visual identity" },
        { es: "Cartelería y RRSS", en: "Posters & social media" },
        { es: "Prototipos en Figma", en: "Figma prototypes" },
      ],
    },
  ],

  // Formación
  studies: [
    {
      title: {
        es: "CFGS Desarrollo de Aplicaciones Web (DAW)",
        en: "Higher Diploma in Web Application Development",
      },
      place: "Nombre del centro · Ciudad",
      start: "2023-09",
      end: "2025-06",
      tasks: [
        { es: "Full-stack", en: "Full-stack" },
        { es: "Proyecto final: FitPup", en: "Final project: FitPup" },
      ],
    },
    {
      title: { es: "Curso de diseño gráfico", en: "Graphic design course" },
      place: "Nombre del centro · Online",
      start: "2022-10",
      end: "2023-06",
      tasks: [
        { es: "Adobe Suite", en: "Adobe Suite" },
        { es: "Tipografía y color", en: "Typography & colour" },
      ],
    },
  ],
};
