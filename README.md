# 303/AIDEN — Portfolio

Portfolio de desarrollador web y diseñador gráfico con estilo cyber/tech.
HTML, CSS y JavaScript puros: **sin frameworks ni build**.
Publicado con GitHub Pages en **https://aidenk23.github.io**.

## Páginas

| Archivo           | Contenido                                           |
| ----------------- | --------------------------------------------------- |
| `index.html`      | Home: monitor, carrusel de proyectos y contacto     |
| `about.html`      | Sobre mí                                            |
| `skills.html`     | Software y soft skills                              |
| `experience.html` | Experiencia y estudios                              |
| `project.html`    | Ficha de cada proyecto (`project.html?id=<id>`)     |

La cabecera, el menú y el footer (contacto) son comunes y se generan desde `js/main.js`.

## Cómo editar cosas

Puedes editar directamente en GitHub (abre el archivo → icono del lápiz → *Commit changes*)
o en tu ordenador y hacer `git push`. Cada cambio en `main` se publica solo en 1–2 minutos
(el progreso se ve en la pestaña **Actions**).

| Quiero cambiar…                                       | Dónde                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Nombre, email, LinkedIn, GitHub, textos de "Sobre mí" | `data/profile.js`                                            |
| Títulos que se escriben en el monitor                 | `data/profile.js` → `titles`                                 |
| Texto del post-it                                     | `data/profile.js` → `stickyNote`                             |
| Skills, soft skills, experiencia, estudios, idiomas   | `data/profile.js`                                            |
| Proyectos y categorías del filtro                     | `data/projects.js` (o `node tools/new-project.mjs`)          |
| Textos fijos (menú, botones, footer…) en ES/EN        | `js/i18n.js`                                                 |
| Colores                                               | `css/style.css` → variables de `:root` al principio          |
| Velocidad del carrusel                                | `js/sections.js` → `SECONDS_PER_CARD` (más alto = más lento) |
| **Icono de la pestaña (favicon)**                     | Sustituye `img/battery.svg` (ver abajo)                      |
| Logo del monitor                                      | Sustituye `img/logo.svg`                                     |
| Foto de perfil                                        | Sube tu foto a `img/` y cambia `photo` en `data/profile.js`  |
| CV                                                    | Sube el PDF a `documentos/` con el nombre de `cv` en `data/profile.js` |

### Cambiar el favicon

- **Lo más fácil:** sube tu icono en formato SVG con el mismo nombre, `img/battery.svg`,
  y no tienes que tocar nada más.
- **Si es PNG u otro nombre:** súbelo a `img/` y cambia esta línea en los 5 archivos `.html`:
  ```html
  <link rel="icon" href="img/battery.svg" type="image/svg+xml">
  ```
  por, por ejemplo:
  ```html
  <link rel="icon" href="img/favicon.png" type="image/png">
  ```
- El navegador guarda el favicon en caché: si no ves el cambio, recarga con `Ctrl+F5`.

### Iconos de skills

Cada skill usa `img/icons/<icon>.svg`. Los iconos salen de https://simpleicons.org;
para que tengan el degradado de la web, copia el `<defs>…</defs>` y el `fill="url(#g)"`
de cualquiera de los que ya hay. Si una skill no tiene icono, se muestra su `abbr`.

## Añadir un proyecto nuevo

```bash
node tools/new-project.mjs
```

Te pregunta título, categorías, fecha, herramientas y enlaces, añade el proyecto
a `data/projects.js` y crea `img/projects/<id>/` con una portada provisional.
Después copia tus imágenes a esa carpeta, actualiza `cover` y `gallery` y completa
los textos en ES y EN. Sin Node, también puedes copiar un bloque de `data/projects.js`
a mano y cambiar los valores.

El proyecto aparece automáticamente en el carrusel (si hay pocos, se repiten hasta
llenarlo), en los filtros, en el contador de "Sobre mí" y en la navegación de las fichas.

## Datos que se actualizan solos

- Año del copyright: `© <copyrightStart>–<año actual>`.
- Años de experiencia: se calculan desde `careerStart`.
- Nº de proyectos y de herramientas.
- Duración de trabajos y estudios; con `end: null` muestra "Actualidad / Present".
- Idioma: se detecta el del navegador y se recuerda la elección (`?lang=en` lo fuerza).

## Verlo en local

Abre `index.html` con doble clic, o levanta un servidor en la carpeta:

```bash
npx http-server        # o: python3 -m http.server
```

## Pendiente de personalizar

- [ ] `data/profile.js`: LinkedIn, experiencia, estudios, idiomas y soft skills (ahora hay datos de ejemplo).
- [ ] `img/profile.svg` → tu foto.
- [ ] `documentos/AidenJimenez_CV.pdf` → tu CV.
- [ ] Proyecto "Diseño gráfico": sustituir por tus piezas reales.
