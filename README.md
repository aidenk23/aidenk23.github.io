# 303/AIDEN — Portfolio

Portfolio de desarrollador web y diseñador gráfico con estilo cyber/tech.
HTML, CSS y JavaScript puros: **sin frameworks ni build**. Se sube tal cual a
GitHub Pages, Netlify, Vercel o cualquier hosting estático.

## Estructura

```
portfolio/
├── index.html          Home: hero (monitor), proyectos, sobre mí, skills, experiencia
├── project.html        Ficha de proyecto (project.html?id=<id>)
├── data/
│   ├── profile.js      ← TUS DATOS: nombre, email, LinkedIn, skills, experiencia, estudios
│   └── projects.js     ← TUS PROYECTOS y las categorías del filtro
├── js/
│   ├── i18n.js         Textos fijos de la interfaz en ES / EN
│   ├── main.js         Idioma, cabecera, menú, footer y animaciones compartidas
│   ├── home.js         Lógica de la home (carrusel, filtros, contadores...)
│   └── project.js      Lógica de la ficha de proyecto + galería
├── css/style.css       Estilos (la paleta está en las variables de :root)
├── img/                Logo, favicon, foto, iconos de skills y capturas de proyectos
├── fonts/              Fuentes alojadas en local (Space Grotesk, JetBrains Mono, Caveat)
├── documentos/         Pon aquí tu CV en PDF
└── tools/new-project.mjs  Script para añadir proyectos
```

## Verlo en local

Abre `index.html` directamente en el navegador (doble clic), o levanta un
servidor desde la carpeta del proyecto:

```bash
npx http-server        # o: python3 -m http.server
```

## Publicación

Se publica con GitHub Pages desde la rama `main` (Settings → Pages).
Cada `git push` a `main` actualiza la web en unos minutos.

## Añadir un proyecto nuevo

```bash
node tools/new-project.mjs
```

Te pregunta título, categorías, fecha, herramientas y enlaces, añade el proyecto
a `data/projects.js` y crea `img/projects/<id>/` con una portada provisional.
Después solo tienes que:

1. Copiar tus imágenes a `img/projects/<id>/` (`cover.jpg`, `01.jpg`, `02.jpg`...).
2. Actualizar `cover` y `gallery` en `data/projects.js` y completar los textos en ES y EN.

También se puede usar sin preguntas:

```bash
node tools/new-project.mjs --id=cartel-festival --title="Cartel Festival" \
  --categories=graphic,branding --date=2025-09 --tools="Illustrator,Photoshop"
```

El proyecto aparece automáticamente en el carrusel (ordenado por fecha), en los
filtros, en el contador de proyectos de "Sobre mí" y en la navegación
anterior/siguiente de las fichas.

## Filtros / categorías

Las categorías están en `window.PROJECT_CATEGORIES` (`data/projects.js`):
`web`, `ui`, `ux`, `graphic`, `branding`. Añade o renombra las que quieras.
En la home solo aparecen los filtros que tienen algún proyecto. Las etiquetas
de cada ficha enlazan a la home con ese filtro aplicado (`index.html?filter=ui#projects`).

## Datos que se actualizan solos

- **Año del copyright**: `© <copyrightStart>–<año actual>`.
- **Años de experiencia**: se calculan desde `careerStart`.
- **Nº de proyectos y de herramientas**: se cuentan desde los datos.
- **Experiencia y estudios**: con `end: null` muestra "Actualidad / Present"
  y la duración ("1 año 3 meses") se calcula con la fecha de hoy.
- **Idioma**: se detecta el del navegador y se recuerda la elección.
  Se puede forzar con `?lang=en` o `?lang=es`.

## Idiomas

- Textos de la interfaz → `js/i18n.js`.
- Textos de perfil y proyectos → en los propios datos como `{ es: "...", en: "..." }`.
- CV distinto por idioma → `cv: { es: "...", en: "..." }` en `profile.js`.

## Pendiente de personalizar

- [ ] `data/profile.js`: LinkedIn, experiencia, estudios, idiomas y soft skills (ahora hay datos de ejemplo).
- [ ] `img/profile.svg` → tu foto (y cambia `photo` en `profile.js`).
- [ ] `documentos/AidenJimenez_CV.pdf` → tu CV.
- [ ] Proyecto "Diseño gráfico": sustituir por tus piezas reales.
- [ ] Las capturas de FitPup se hicieron en local sin la imagen de cabecera del hero
      (el banco de imágenes externo no cargaba); si quieres, cámbialas por capturas de la web en producción.
