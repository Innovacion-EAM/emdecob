import fs from "fs";
import path from "path";
import { detectBasePath } from "./base-path.mjs";

/**
 * Next.js no prefija con `basePath` las rutas de `public/` que aparecen en el
 * CSS (`url("/images/...")`, `url("/fonts/...")`), así que este paso las
 * reescribe en el export ya compilado.
 *
 * El resto de rutas (next/image, <video>, bundles de cliente) se resuelven en
 * el código con `asset()` (ver src/lib/asset.ts), por lo que aquí NO se tocan
 * cadenas entre comillas: hacerlo duplicaría el prefijo en los payloads RSC
 * que reciben los componentes de cliente.
 */
const outDir = path.join(process.cwd(), "out");
const basePath = detectBasePath(outDir);
const folders = ["images", "videos", "fonts"];
const extensions = new Set([".css", ".html"]);

if (!fs.existsSync(outDir)) {
  console.error("❌ No existe out/. Ejecuta `next build` antes.");
  process.exit(1);
}

if (!basePath) {
  console.log("ℹ️  basePath vacío: no hay rutas que prefijar (build sin GitHub Pages).");
  process.exit(0);
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, visit);
    else visit(fullPath);
  }
}

let patchedFiles = 0;
let patchedRefs = 0;

walk(outDir, (filePath) => {
  if (!extensions.has(path.extname(filePath))) return;

  const original = fs.readFileSync(filePath, "utf8");
  let patched = original;

  for (const folder of folders) {
    // url(/images/...), url("/images/...), url('/images/...)
    patched = patched.split(`(/${folder}/`).join(`(${basePath}/${folder}/`);
  }

  if (patched === original) return;

  const count = (original.match(new RegExp(`\\(/(?:${folders.join("|")})/`, "g")) ?? []).length;
  patchedRefs += count;
  patchedFiles += 1;
  fs.writeFileSync(filePath, patched, "utf8");
});

console.log(`✅ Prefixed ${patchedRefs} CSS asset paths in ${patchedFiles} files`);

// Verificación: no debe quedar ningún url(/images|videos|fonts/ sin prefijo.
const leftovers = [];
walk(outDir, (filePath) => {
  if (!extensions.has(path.extname(filePath))) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const folder of folders) {
    if (content.includes(`(/${folder}/`)) {
      leftovers.push(`${path.relative(outDir, filePath)}: (/${folder}/`);
    }
  }
});

if (leftovers.length > 0) {
  console.error("❌ Quedaron rutas CSS sin prefijar:");
  for (const item of leftovers.slice(0, 20)) console.error(`   ${item}`);
  process.exit(1);
}

console.log("✅ No unprefixed CSS asset paths remain");
