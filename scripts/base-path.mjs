import fs from "fs";
import path from "path";

/**
 * Detecta el basePath con el que se generó el export leyendo el HTML ya
 * compilado. Así los scripts de post-proceso no dependen de que la variable
 * de entorno GITHUB_PAGES esté definida en cada paso del CI.
 */
export function detectBasePath(outDir = path.join(process.cwd(), "out")) {
  const indexFile = path.join(outDir, "index.html");
  if (fs.existsSync(indexFile)) {
    const html = fs.readFileSync(indexFile, "utf8");
    const match = html.match(/(?:src|href)="([^"]*)\/_next\/static\//);
    if (match) return match[1];
  }
  return process.env.GITHUB_PAGES === "true" ? "/emdecob" : "";
}
