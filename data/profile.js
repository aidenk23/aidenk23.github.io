/* ==========================================================================
   PERFIL — edita aquí tus datos personales, skills y experiencia.
   Todo el texto que cambia con el idioma va en { es: "...", en: "..." }.
   Las fechas usan formato "AAAA-MM"; deja `end: null` si sigue en curso
   y la web mostrará "Actualidad / Present" y calculará la duración sola.
   ========================================================================== */
window.PROFILE = {
  handle: "303/AIDEN",
  name: "Aiden Jiménez",
  // Rotan en la pantalla del monitor del hero
  titles: {
    es: ["Desarrollador web", "Diseñador gráfico"],
    en: ["Web developer", "Graphic designer"],
  },
  location: { es: "España", en: "Spain" },
  available: true, // muestra el indicador "disponible para trabajar"

  careerStart: "2022-09",
  // Año de inicio del copyright 
  copyrightStart: 2025,

  email: "cybr303@gmail.com",
  linkedin: "https://www.linkedin.com/in/tu-usuario/",
  github: "https://github.com/aidenk23",
  cv: {
    es: "documentos/AidenJimenez_CV.pdf",
    en: "documentos/AidenJimenez_CV.pdf",
  },
  photo: "img/profile.svg", 

  stickyNote: {
    es: "¡Hola! Diseño lo que programo y programo lo que diseño :)",
    en: "Hi! I design what I code and code what I design :)",
  },

  about: {
    hello: { es: "Hola,", en: "Hello," },
    name: { es: "soy Aiden!", en: "I'm Aiden!" },
    // Etiquetas que flotan sobre la foto
    tags: [
      { es: "Madrid, España", en: "Madrid, Spain" },
    ],
    lead: { es: "Desarrollador web & diseñador gráfico", en: "Web developer & graphic designer" },
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

  // Proceso de trabajo (página "Sobre mí"). `icon`: search | design | code | launch
  process: [
    {
      icon: "search",
      title: { es: "Descubrir", en: "Discover" },
      text: { es: "Entiendo el proyecto, el público y los objetivos antes de abrir el editor.", en: "I get to know the project, the audience and the goals before opening the editor." },
    },
    {
      icon: "design",
      title: { es: "Diseñar", en: "Design" },
      text: { es: "Moodboard, wireframes y prototipo en Figma para validar la idea.", en: "Moodboard, wireframes and a Figma prototype to validate the idea." },
    },
    {
      icon: "code",
      title: { es: "Desarrollar", en: "Build" },
      text: { es: "Maquetación responsive y código limpio, probando en cada paso.", en: "Responsive layouts and clean code, testing at every step." },
    },
    {
      icon: "launch",
      title: { es: "Entregar", en: "Deliver" },
      text: { es: "Lanzamiento, ajustes finales y soporte para que todo funcione.", en: "Launch, final tweaks and support so everything keeps working." },
    },
  ],

  // Cosas que me gustan: se muestran en un carrusel de fotos con un texto corto.
  // EJEMPLOS genéricos: cambia `image` por tus fotos (p. ej. img/hobbies/musica.jpg) y los textos.
  hobbies: [
    { image: "img/hobbies/hobby-1.svg", title: { es: "Hobby 1", en: "Hobby 1" }, text: { es: "Texto corto explicando este hobby.", en: "Short text explaining this hobby." } },
    { image: "img/hobbies/hobby-2.svg", title: { es: "Hobby 2", en: "Hobby 2" }, text: { es: "Texto corto explicando este hobby.", en: "Short text explaining this hobby." } },
    { image: "img/hobbies/hobby-3.svg", title: { es: "Hobby 3", en: "Hobby 3" }, text: { es: "Texto corto explicando este hobby.", en: "Short text explaining this hobby." } },
    { image: "img/hobbies/hobby-4.svg", title: { es: "Hobby 4", en: "Hobby 4" }, text: { es: "Texto corto explicando este hobby.", en: "Short text explaining this hobby." } },
    { image: "img/hobbies/hobby-5.svg", title: { es: "Hobby 5", en: "Hobby 5" }, text: { es: "Texto corto explicando este hobby.", en: "Short text explaining this hobby." } },
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
