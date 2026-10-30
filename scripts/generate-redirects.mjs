import fs from "fs";
import path from "path";
import redirects from "./redirects.json" with { type: "json" };
import { detectBasePath } from "./base-path.mjs";

/**
 * `output: "export"` no soporta `redirects()` de next.config, así que en el
 * build estático generamos una página HTML por cada redirección 301 heredada.
 * GitHub Pages la sirve en /<source>/ y el navegador salta al destino.
 */
const outDir = path.join(process.cwd(), "out");
const basePath = detectBasePath(outDir);

function splitDestination(destination) {
  const url = new URL(destination, "https://example.com");
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  };
}

function renderRedirect(target) {
  const href = `${basePath}${target.pathname}${target.search}${target.hash}`;
  return `<!DOCTYPE html>
<html lang="es-CO">
<head>
<meta charset="utf-8"/>
<title>Redirigiendo…</title>
<link rel="canonical" href="${href}"/>
<meta name="robots" content="noindex"/>
<meta http-equiv="refresh" content="0; url=${href}"/>
<script>window.location.replace(${JSON.stringify(href)} + window.location.hash);</script>
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;color:#0c281b}a{color:#01633a}</style>
</head>
<body>
<p>Esta página se trasladó a <a href="${href}">${href}</a>.</p>
</body>
</html>
`;
}

let generated = 0;
const skipped = [];

for (const rule of redirects) {
  if (rule.source.includes(":")) {
    // Patrón dinámico: no es enumerable en un export estático.
    skipped.push(rule);
    continue;
  }

  const source = rule.source.replace(/^\/+|\/+$/g, "");
  const dir = path.join(outDir, source);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    renderRedirect(splitDestination(rule.destination)),
    "utf8",
  );
  generated += 1;
}

console.log(`✅ Generated ${generated} static redirect pages in out/`);

/**
 * Los patrones dinámicos (`:slug`) no se pueden enumerar. GitHub Pages sirve
 * out/404.html para cualquier ruta desconocida, así que añadimos ahí un script
 * que redirige las rutas heredadas con prefijo.
 */
if (skipped.length > 0) {
  const notFoundFile = path.join(outDir, "404.html");
  if (fs.existsSync(notFoundFile)) {
    const rules = skipped.map((rule) => {
      const prefix = rule.source.split("/:")[0];
      const target = splitDestination(rule.destination);
      return [
        `${basePath}${prefix}/`,
        `${basePath}${target.pathname}${target.search}${target.hash}`,
      ];
    });

    const script = `<script>(function(){var rules=${JSON.stringify(
      rules,
    )};for(var i=0;i<rules.length;i++){if(location.pathname.indexOf(rules[i][0])===0){location.replace(rules[i][1]);return;}}})();</script>`;
    const html = fs.readFileSync(notFoundFile, "utf8");
    fs.writeFileSync(
      notFoundFile,
      html.includes("</body>")
        ? html.replace("</body>", `${script}</body>`)
        : html + script,
      "utf8",
    );
    console.log(
      `ℹ️  Dynamic redirect patterns handled in 404.html: ${skipped
        .map((rule) => rule.source)
        .join(", ")}`,
    );
  }
}
