import type { NextConfig } from "next";
import redirects from "./scripts/redirects.json";

const isGithubPages = process.env.GITHUB_PAGES === "true";

// En GitHub Pages el sitio se publica bajo /emdecob. El resto de entornos
// (dev, local, dominio propio) se sirve desde la raíz.
const basePath = isGithubPages ? "/emdecob" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: true,
  // Se expone al cliente para poder prefijar rutas de public/ (ver src/lib/asset.ts).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // GitHub Pages config
  ...(isGithubPages && {
    basePath: "/emdecob",
    assetPrefix: "/emdecob/",
  }),
  // `redirects()` no se aplica con `output: "export"`, así que en el build de
  // GitHub Pages se generan páginas estáticas equivalentes con
  // scripts/generate-redirects.mjs. En dev sí se usan las reglas nativas.
  ...(process.env.NODE_ENV === "development" && {
    async redirects() {
      return redirects;
    },
  }),
};

export default nextConfig;
