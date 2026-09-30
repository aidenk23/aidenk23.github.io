#!/usr/bin/env node
/* ==========================================================================
   Crea un proyecto nuevo en data/projects.js y su carpeta de imágenes.

   Uso interactivo:   node tools/new-project.mjs
   Sin preguntas:     node tools/new-project.mjs --id=cartel-festival \
                        --title="Cartel Festival" --categories=graphic,branding \
                        --date=2025-09 --tools="Illustrator,Photoshop"

   Después solo tienes que meter las imágenes en img/projects/<id>/
   (cover.jpg, 01.jpg, 02.jpg...) y repasar los textos en data/projects.js.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "data", "projects.js");
const MARKER = "window.PROJECTS = [";

// Carga el archivo de datos igual que lo haría el navegador
function loadData() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA, "utf8"), sandbox);
  return { projects: sandbox.window.PROJECTS, categories: sandbox.window.PROJECT_CATEGORIES };
}

function parseArgs() {
  const out = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const list = (s) => (s || "").split(",").map((x) => x.trim()).filter(Boolean);

async function main() {
  const { projects, categories } = loadData();
  const args = parseArgs();
  const interactive = !args.id && !args.title;
  const rl = interactive ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;
  const ask = async (q, def = "") => {
    if (!rl) return def;
    const a = (await rl.question(`${q}${def ? ` (${def})` : ""}: `)).trim();
    return a || def;
  };

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const titleEs = args.title || args["title-es"] || (await ask("Título (ES)"));
  if (!titleEs) throw new Error("El título es obligatorio.");
  const titleEn = args["title-en"] || (await ask("Título (EN)", titleEs));
  const id = slugify(args.id || (await ask("Id / URL del proyecto", slugify(titleEs))));
  if (!id) throw new Error("Id no válido.");
  if (projects.some((p) => p.id === id)) throw new Error(`Ya existe un proyecto con id "${id}".`);

  const catKeys = Object.keys(categories);
  const cats = list(args.categories || (await ask(`Categorías separadas por coma [${catKeys.join(", ")}]`, "web")));
  const unknown = cats.filter((c) => !catKeys.includes(c));
  if (unknown.length) throw new Error(`Categorías desconocidas: ${unknown.join(", ")}. Añádelas antes en PROJECT_CATEGORIES.`);

  const date = args.date || (await ask("Fecha AAAA-MM", thisMonth));
  if (!/^\d{4}-\d{2}$/.test(date)) throw new Error("La fecha debe tener formato AAAA-MM.");
  const summaryEs = args.summary || (await ask("Mini descripción (ES)", "Descripción corta del proyecto."));
  const tools = list(args.tools || (await ask("Herramientas separadas por coma", "Figma")));
  const live = args.live || (await ask("URL pública (opcional)"));
  const repo = args.repo || (await ask("URL del código (opcional)"));
  rl?.close();

  const dir = `img/projects/${id}`;
  const project = {
    id,
    date,
    categories: cats,
    title: { es: titleEs, en: titleEn || titleEs },
    subtitle: { es: "Subtítulo", en: "Subtitle" },
    summary: { es: summaryEs, en: "Short description of the project." },
    cover: `${dir}/cover.svg`,
    gallery: [{ src: `${dir}/cover.svg`, caption: { es: "Portada", en: "Cover" } }],
    time: { es: "X semanas", en: "X weeks" },
    role: { es: "Tu rol", en: "Your role" },
    tools,
    goal: { es: "El objetivo era...", en: "The goal was..." },
    highlights: [],
    links: Object.fromEntries(Object.entries({ live, repo }).filter(([, v]) => v)),
  };

  // Inserta el proyecto justo después del inicio del array (se ordenan por fecha en la web)
  const src = fs.readFileSync(DATA, "utf8");
  const at = src.indexOf(MARKER);
  if (at === -1) throw new Error(`No se encontró "${MARKER}" en data/projects.js`);
  const json = JSON.stringify(project, null, 2).replace(/\n/g, "\n  ");
  const updated = src.slice(0, at + MARKER.length) + `\n  ${json},` + src.slice(at + MARKER.length);

  // Comprueba que el archivo resultante sigue siendo válido antes de guardarlo
  vm.runInNewContext(updated, { window: {} });
  fs.writeFileSync(DATA, updated);

  // Carpeta de imágenes con una portada provisional
  const absDir = path.join(ROOT, dir);
  fs.mkdirSync(absDir, { recursive: true });
  const cover = path.join(absDir, "cover.svg");
  if (!fs.existsSync(cover)) {
    const safe = titleEs.replace(/[<&>]/g, "");
    fs.writeFileSync(cover, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900"><rect width="1440" height="900" fill="#0a0a0f"/><path d="M0 0h1440v900H0z" fill="none" stroke="#3380ff" stroke-opacity=".3" stroke-width="4" stroke-dasharray="16 12"/><text x="720" y="450" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="96" font-weight="700" fill="#f2f2f8">${safe}</text><text x="720" y="520" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="28" fill="#3380ff">${dir}/cover.jpg</text></svg>\n`);
  }

  console.log(`\n✔ Proyecto "${titleEs}" añadido a data/projects.js`);
  console.log(`✔ Carpeta de imágenes: ${dir}/`);
  console.log(`\nSiguientes pasos:`);
  console.log(`  1. Copia tus imágenes en ${dir}/ y actualiza "cover" y "gallery".`);
  console.log(`  2. Completa los textos (subtitle, time, role, goal...) en ES y EN.`);
  console.log(`  3. Ábrelo en: project.html?id=${id}\n`);
}

main().catch((e) => {
  console.error(`✖ ${e.message}`);
  process.exit(1);
});
