/* ==========================================================================
   PROYECTOS — cada objeto del array es un proyecto.
   Se pintan solos en el carrusel de la home y en project.html?id=<id>.
   Para añadir uno nuevo: `node tools/new-project.mjs` (ver README) o copia
   un bloque y cambia los valores. Se ordenan por `date` (más reciente primero).

   categories → claves de window.PROJECT_CATEGORIES (filtros de la web)
   ========================================================================== */
window.PROJECT_CATEGORIES = {
  web: { es: "Desarrollo web", en: "Web development" },
  ui: { es: "UI", en: "UI" },
  ux: { es: "UX", en: "UX" },
  graphic: { es: "Diseño gráfico", en: "Graphic design" },
  branding: { es: "Branding", en: "Branding" },
};

window.PROJECTS = [
  {
    "id": "fitpup-laravel",
    "date": "2025-06",
    "categories": ["web", "ui", "ux"],
    "title": { "es": "FitPup", "en": "FitPup" },
    "subtitle": { "es": "Plataforma web · versión Laravel", "en": "Web platform · Laravel version" },
    "summary": {
      "es": "Plataforma de entrenamiento, nutrición y enriquecimiento para perros, con cuentas de usuario, progreso y suscripción premium.",
      "en": "Training, nutrition and enrichment platform for dogs, with user accounts, progress tracking and a premium subscription."
    },
    "cover": "img/projects/fitpup-laravel/cover.jpg",
    "gallery": [
      { "src": "img/projects/fitpup-laravel/02.jpg", "caption": { "es": "Métodos de entrenamiento", "en": "Training methods" } },
      { "src": "img/projects/fitpup-laravel/03.jpg", "caption": { "es": "Planes premium con Stripe", "en": "Premium plans with Stripe" } },
      { "src": "img/projects/fitpup-laravel/04.jpg", "caption": { "es": "Comunidad", "en": "Community" } },
      { "src": "img/projects/fitpup-laravel/05.jpg", "caption": { "es": "Versión móvil", "en": "Mobile version" } }
    ],
    "time": { "es": "4 semanas · may – jun 2025", "en": "4 weeks · May – Jun 2025" },
    "role": { "es": "Diseño y desarrollo full-stack", "en": "Full-stack design & development" },
    "tools": ["Laravel 12", "PHP 8", "MySQL", "Blade", "Alpine.js", "Tailwind", "Stripe", "Docker", "Render"],
    "goal": {
      "es": "El objetivo era convertir el prototipo estático de FitPup en una aplicación real: registro con verificación por email, perfiles de perro, cursos con seguimiento de progreso, planes de nutrición, comunidad y un plan premium con pagos mediante Stripe, desplegada con Docker en Render.",
      "en": "The goal was to turn the static FitPup prototype into a real application: sign-up with email verification, dog profiles, courses with progress tracking, nutrition plans, a community and a premium plan with Stripe payments, deployed with Docker on Render."
    },
    "highlights": [
      { "es": "Autenticación con Laravel Breeze y recuperación de contraseña", "en": "Authentication with Laravel Breeze and password recovery" },
      { "es": "Modelo de datos con migraciones y seeders para todo el contenido", "en": "Data model with migrations and seeders for all content" },
      { "es": "Checkout y webhooks de Stripe para el plan premium", "en": "Stripe checkout and webhooks for the premium plan" }
    ],
    "links": { "live": "https://fitpup.onrender.com" }
  },
  {
    "id": "fitpup-static",
    "date": "2025-04",
    "categories": ["web", "ui"],
    "title": { "es": "FitPup v1", "en": "FitPup v1" },
    "subtitle": { "es": "Prototipo · HTML, CSS y Bootstrap", "en": "Prototype · HTML, CSS & Bootstrap" },
    "summary": {
      "es": "Primera versión de FitPup: landing y páginas de producto maquetadas a mano para validar la idea y la identidad visual.",
      "en": "First version of FitPup: hand-coded landing and product pages to validate the idea and the visual identity."
    },
    "cover": "img/projects/fitpup-static/cover.jpg",
    "gallery": [
      { "src": "img/projects/fitpup-static/02.jpg", "caption": { "es": "Página premium", "en": "Premium page" } },
      { "src": "img/projects/fitpup-static/03.jpg", "caption": { "es": "Beneficios premium", "en": "Premium benefits" } }
    ],
    "time": { "es": "2 semanas", "en": "2 weeks" },
    "role": { "es": "Diseño UI y maquetación", "en": "UI design & front-end" },
    "tools": ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "Figma"],
    "goal": {
      "es": "El objetivo era definir la estructura de la plataforma y su identidad (paleta verde oliva, tipografía y tono) con un prototipo navegable y responsive antes de pasar al back-end.",
      "en": "The goal was to define the platform structure and its identity (olive green palette, typography and tone) with a clickable, responsive prototype before moving on to the back-end."
    },
    "highlights": [
      { "es": "Sistema de color con variables CSS", "en": "Colour system with CSS custom properties" },
      { "es": "Diseño responsive con Bootstrap", "en": "Responsive layout with Bootstrap" }
    ],
    "links": {}
  },
  {
    "id": "diseno-grafico",
    "date": "2024-12",
    "categories": ["graphic", "branding"],
    "title": { "es": "Diseño gráfico", "en": "Graphic design" },
    "subtitle": { "es": "Selección de piezas", "en": "Selected pieces" },
    "summary": {
      "es": "Selección de trabajos de identidad visual, cartelería y piezas para redes sociales.",
      "en": "A selection of visual identity, poster and social media work."
    },
    "cover": "img/projects/diseno-grafico/cover.svg",
    "gallery": [
      { "src": "img/projects/diseno-grafico/cover.svg", "caption": { "es": "Sustituye por tus piezas", "en": "Replace with your pieces" } }
    ],
    "time": { "es": "2024", "en": "2024" },
    "role": { "es": "Diseño gráfico", "en": "Graphic design" },
    "tools": ["Illustrator", "Photoshop", "InDesign", "Figma"],
    "goal": {
      "es": "Texto de ejemplo: explica aquí el encargo, a quién iba dirigido y qué decisiones de diseño tomaste. Sustituye este proyecto por tus trabajos reales.",
      "en": "Sample text: explain the brief, who it was for and which design decisions you made. Replace this project with your real work."
    },
    "highlights": [],
    "links": {}
  }
];
