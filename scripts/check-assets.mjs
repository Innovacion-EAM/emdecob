import fs from "fs";
import path from "path";
import { detectBasePath } from "./base-path.mjs";

/**
 * Verificación del export estático:
 *   1. Que no queden rutas de public/ sin el prefijo del despliegue en HTML/CSS.
 *   2. Que cada imagen/video/fuente referenciada exista realmente en out/.
 *   3. Que los assets críticos estén presentes.
 *
 * Los payloads RSC (.txt) y los bundles de cliente se generan con `asset()`
 * en el código, así que aquí solo se auditan las referencias renderizadas.
 */
const outDir = path.join(process.cwd(), "out");
const basePath = detectBasePath(outDir);
const folders = ["images", "videos", "fonts"];
const extensions = new Set([".html", ".css"]);

if (!fs.existsSync(outDir)) {
  console.error("❌ No existe out/. Ejecuta `next build` antes.");
  process.exit(1);
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, visit);
    else visit(fullPath);
  }
}

const errors = [];
const missing = new Set();

walk(outDir, (filePath) => {
  if (!extensions.has(path.extname(filePath))) return;
  const content = fs.readFileSync(filePath, "utf8");
  const relative = path.relative(outDir, filePath);

  // 1) Rutas sin prefijar (solo aplica cuando el sitio se publica en subcarpeta)
  if (basePath) {
    for (const folder of folders) {
      if (content.includes(`(/${folder}/`)) {
        errors.push(`${relative}: url(/${folder}/) sin prefijar`);
      }
      if (path.extname(filePath) === ".html") {
        for (const attribute of ["src", "poster", "href", "content"]) {
          if (content.includes(`${attribute}="/${folder}/`)) {
            errors.push(`${relative}: ${attribute}="/${folder}/" sin prefijar`);
          }
        }
      }
    }
  }

  // 2) Referencias a media que deben existir
  const candidates = new Set();
  const attributePattern = /(?:src|poster|href|content)\s*=\s*"([^"]+)"/g;
  const cssPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/g;

  for (const match of content.matchAll(attributePattern)) candidates.add(match[1]);
  for (const match of content.matchAll(cssPattern)) candidates.add(match[1]);

  for (const candidate of candidates) {
    if (!candidate.startsWith(`${basePath}/`)) continue;
    const assetPath = candidate.slice(basePath.length + 1).split(/[?#]/)[0];
    if (!folders.some((folder) => assetPath.startsWith(`${folder}/`))) continue;
    if (assetPath.includes("${")) continue;
    if (!fs.existsSync(path.join(outDir, assetPath))) {
      missing.add(candidate);
    }
  }
});

for (const assetPath of [...missing].sort()) {
  errors.push(`asset referenciado pero inexistente: ${assetPath}`);
}

const critical = [
  "index.html",
  "404.html",
  "videos/hero.mp4",
  "videos/manifiesto.mp4",
  "fonts/sora-latin.woff2",
  "fonts/sora-latin-ext.woff2",
  "fonts/manrope-latin.woff2",
  "fonts/manrope-latin-ext.woff2",
  "images/founders-emdecob-web.webp",
  "images/cover-video-presentacion-emdecob-web.webp",
  "images/modelo-cta-pie-de-pagina-emdecob-web.webp",
  "images/logo.webp",
];

for (const file of critical) {
  if (!fs.existsSync(path.join(outDir, file))) {
    errors.push(`falta el asset crítico: ${file}`);
  }
}

const images = fs.readdirSync(path.join(outDir, "images")).length;
const fonts = fs.readdirSync(path.join(outDir, "fonts")).length;
const videos = fs.readdirSync(path.join(outDir, "videos")).length;

console.log(`📊 images: ${images} · fonts: ${fonts} · videos: ${videos}`);

if (errors.length > 0) {
  console.error(`❌ ${errors.length} problema(s) en el export:`);
  for (const error of errors.slice(0, 40)) console.error(`   ${error}`);
  process.exit(1);
}

console.log("✅ All assets verified");
