# EMDECOB Web – Prototipo de alta fidelidad

Sitio web institucional de **EMDECOB S.A.S.** (Contact Center BPS, recuperación de cartera, propiedad horizontal, servicios jurídicos y EMDATA) construido con **Next.js 16 App Router**, TypeScript y CSS personalizado (sin Tailwind runtime). Incluye arquitectura de información aprobada, redirecciones 301 heredadas, JSON-LD, formulario de contacto server-side con fallback estático, y capturas de pantalla automatizadas para documentación.

**Despliegue productivo:** https://innovacion-eam.github.io/emdecob/

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 (strict) |
| Estilos | CSS nativo con variables, `@media`, animaciones |
| Fuentes | Sora (títulos) + Manrope (cuerpo) — WOFF2 auto-hospedadas en `public/fonts` |
| Imágenes | `next/image` optimizado (WebP/AVIF), `unoptimized: true` para export estático |
| Lint | ESLint 9 (flat config) + `eslint-config-next` |
| Capturas | Puppeteer Core + Chromium del sistema (`/usr/bin/chromium`) |

---

## Requisitos previos

- **Node.js 20+** (recomendado 22 LTS)
- **Chromium instalado** (`/usr/bin/chromium` en Linux; ajusta `CHROME_PATH` si difiere)

---

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores necesarios.

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | **Sí** | URL canónica del sitio para metadata, sitemap, `robots.txt` y URLs absolutas en JSON-LD. En local: `http://localhost:3000` o dominio propio. En CI (GitHub Pages): `https://innovacion-eam.github.io/emdecob`. |
| `NEXT_PUBLIC_BASE_PATH` | No (inyectada por `next.config.ts`) | Prefijo de despliegue. **No editar manualmente**: `next.config.ts` la expone vía `env:` (`/emdecob` en GitHub Pages, `""` en local). La usa `src/lib/asset.ts` para prefijar rutas de `public/` en `next/image`, `<video>`, `poster`, etc. |
| `RESEND_API_KEY` | No | Clave de Resend para envío real de correos del formulario. Si **no** está definida → modo prototipo local (valida, loggea y responde `{ ok: true, mode: "local" }`). |
| `CONTACT_TO_EMAIL` | No | Destino de los correos del formulario. Default: `directoroperaciones@emdecob.com` (ver `src/content/site.ts`). |
| `CONTACT_FROM_EMAIL` | No | Remitente para Resend. Default: `EMDECOB Web <web@emdecob.com>`. |
| `CHROME_PATH` | No | Ruta a Chromium para scripts de captura (`scripts/capture.mjs`, `scripts/qa.mjs`, etc.). Default: `/usr/bin/chromium`. |
| `GITHUB_PAGES` | No (solo CI) | Bandera interna. `true` en el workflow → activa `basePath: "/emdecob"`, `assetPrefix: "/emdecob/"` y `NEXT_PUBLIC_BASE_PATH="/emdecob"`. |

> **Importante**: `NEXT_PUBLIC_BASE_PATH` se inyecta en el build desde `next.config.ts`. No la definas en `.env.local`; el build la sobrescribe según `GITHUB_PAGES`.

---

## Instalación y ejecución local

```bash
# 1) Clonar / entrar al proyecto
cd /home/payan/emdecob-web   # o tu directorio de trabajo

# 2) Instalar dependencias
npm ci

# 3) (Opcional) Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local si se desea envío real de correo (RESEND_API_KEY)

# 4) Desarrollo con Turbopack
npm run dev
# Abre http://localhost:3000

# 5) Build de producción (sin basePath, para dominio propio o revisión local)
npm run build
# El export estático queda en out/ (sirve esa carpeta con cualquier servidor estático)

# 6) Build + post-proceso completo para GitHub Pages (basePath /emdecob)
npm run build:pages

# 7) Verificación rápida de assets del export
npm run check:assets
```

> **Nota**: `next start` **no funciona** con `output: "export"`. Para revisar el build local:
> ```bash
> npx serve out
> # o
> python3 -m http.server -d out 3000
> # luego abre http://localhost:3000/emdecob/  (si build:pages) o http://localhost:3000/ (si build)
> ```

---

## Despliegue en GitHub Pages

El sitio se publica en **https://innovacion-eam.github.io/emdecob/**, así que el build usa `basePath: "/emdecob"` y `assetPrefix: "/emdecob/"`.

### El problema del `basePath`

Next.js **aplica `basePath` automáticamente solo a `next/link`**. Las rutas de `public/` usadas en:
- `next/image` (`src`, `srcSet`)
- `<video>`, `<source>`, `poster`
- `url()` del CSS (fuentes, fondos)
- payloads RSC y bundles de cliente

**NO** reciben el prefijo automáticamente. La solución implementada tiene dos capas:

#### 1. En el código: `asset()` (capa de render)
```ts
// src/lib/asset.ts
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
```
Todas las referencias a `public/` en componentes (`.tsx`) se envuelven con `asset()`:
```tsx
<Image src={asset("/images/hero.webp")} ... />
<video poster={asset("/images/poster.webp")}><source src={asset("/videos/hero.mp4")} /></video>
```
`next.config.ts` expone `NEXT_PUBLIC_BASE_PATH` vía `env:` para que esté disponible en cliente y servidor.

#### 2. Post-build: `scripts/fix-asset-paths.mjs` (capa de CSS)
Reescribe **solo** los `url()` del CSS compilado (`out/_next/static/chunks/*.css`):
```bash
url(/fonts/sora-latin.woff2)        → url(/emdecob/fonts/sora-latin.woff2)
url(/images/fondo.webp)             → url(/emdecob/images/fondo.webp)
```
**No toca** comillas, backticks ni paréntesis en HTML/JS/RSC para no duplicar prefijos en los payloads que reciben los componentes de cliente.

#### 3. Verificación: `scripts/check-assets.mjs`
Ejecuta tras el post-proceso y **falla el build** si:
- Queda algún `url(/images|videos|fonts/)` sin prefijo en HTML/CSS.
- Un asset referenciado (imagen, video, fuente) no existe en `out/`.
- Faltan assets críticos (logo, video hero, fuentes, etc.).

### Workflow CI (`.github/workflows/deploy.yml`)

```yaml
# Orden de ejecución:
1. npm ci
2. npm run lint
3. npm run build              (con GITHUB_PAGES=true)
4. node scripts/fix-asset-paths.mjs
5. node scripts/generate-redirects.mjs
6. node scripts/generate-seo.mjs
7. node scripts/check-assets.mjs
8. upload-pages-artifact
```

---

## Estructura del proyecto

```
emdecob-web/
├─ public/
│  ├─ fonts/          # Sora + Manrope WOFF2 (4 archivos)
│  ├─ images/         # 39 imágenes migradas/optimizadas
│  ├─ videos/         # hero.mp4, manifiesto.mp4
│  └─ og-emdecob.jpg  # Open Graph 1200×630
├─ src/
│  ├─ app/                    # App Router
│  │  ├─ api/contacto/route.ts    # Formulario server-side (Resend / modo local)
│  │  ├─ blog/                    # Listado + detalle + FAQ
│  │  ├─ servicios/[slug]/        # 4 páginas de servicio (SSG con generateStaticParams)
│  │  ├─ (emdata|nosotros|juricob|contacto|politica-*)/
│  │  ├─ layout.tsx               # Metadata, JSON-LD Organization, Header/Footer
│  │  ├─ not-found.tsx            # 404 amigable + script para redirecciones dinámicas
│  │  ├─ sitemap.ts / robots.ts   # SEO técnico (generados en build)
│  │  └─ globals.css              # Sistema de diseño completo (~4.6k líneas)
│  ├─ components/         # UI compartida
│  │  ├─ Header.tsx / Footer.tsx
│  │  ├─ PageHero.tsx, ServiceCard.tsx, PostCard.tsx, BlogExplorer.tsx
│  │  ├─ ContactForm.tsx           # Con fallback mailto/WhatsApp en hosting estático
│  │  ├─ CtaBand.tsx, JsonLd.tsx, SectionHeading.tsx, FaqList.tsx, DashboardMock.tsx
│  │  └─ ... (Icon, LinkArrow, etc.)
│  ├─ content/            # Modelos tipados (fuente única de verdad)
│  │  ├─ site.ts           # Empresa, nav, stats, aliados, testimonios, proceso, FAQ, valores, equipo, timeline, Juricob
│  │  ├─ services.ts       # 4 servicios con métricas, retos, pilares, portfolio, casos, EMDATA, FAQ, SEO
│  │  ├─ posts.ts          # 3 artículos + FAQ (slug, cover, bloques MDX-like)
│  │  └─ legal.ts          # Privacidad y cookies (actualizadas 29-oct-2026)
│  ├─ lib/
│  │  └─ asset.ts          # Helper basePath para rutas de public/
│  └─ middleware.ts        # (vacío, reservado)
├─ scripts/
│  ├─ base-path.mjs           # Detección de basePath desde out/index.html
│  ├─ fix-asset-paths.mjs     # Reescribe url() en CSS del export
│  ├─ check-assets.mjs        # Verificación estricta de assets
│  ├─ generate-redirects.mjs  # Genera páginas 301 estáticas + inyecta en 404.html
│  ├─ generate-seo.mjs        # robots.txt + sitemap.xml en out/
│  ├─ redirects.json          # Fuente única de redirecciones 301
│  ├─ capture.mjs             # Captura full-page + por sección (desktop/mobile)
│  ├─ qa.mjs                  # Auditoría visual (overflow, imágenes rotas, h1, enlaces, labels)
│  ├─ check-links.mjs         # Verificación enlaces internos (200/301)
│  ├─ interactions.mjs        # Pruebas interacción (dropdown, menú móvil, formulario, filtro blog)
│  ├─ measure.mjs             # Métricas de layout por ruta
│  ├─ nojs.mjs                # Verificación sin JS (contenido visible)
│  └─ layout.mjs              # Dump estructural de secciones
├─ next.config.ts          # output:export, trailingSlash, basePath condicional, redirects solo dev, env
├─ eslint.config.mjs       # ESLint flat config
├─ tsconfig.json
├─ .env.example
└─ package.json
```

---

## Rutas implementadas (16 URLs con trailing slash)

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero (video + poster), propuesta, 4 servicios + EMDATA, aliados (grid), stats, testimonios, proceso, blog destacado, FAQ, CTA |
| `/servicios/` | Hub con pestañas: 4 servicios, integración, stats, proceso, CTA |
| `/servicios/contact-center/` | Detalle completo (métricas, retos, pilares, portfolio, casos, EMDATA, FAQ, CTA) |
| `/servicios/recuperacion-de-cartera/` | Modelo integral, servicios, casos, tipos de gestión, resultados, CTA |
| `/servicios/propiedad-horizontal/` | Modelo, portafolio, propuesta de valor, casos, municipios, CTA |
| `/servicios/juridicos/` | Enfoque preventivo, áreas, pilares, resultados, empresas regionales, CTA |
| `/emdata/` | Dashboard mock, módulos, IA, seguridad, beneficios, demos, CTA |
| `/nosotros/` | Pilares, historia (timeline 2006–), stats, equipo (6 perfiles), valores, video, CTA |
| `/blog/` | Listado con filtro por categoría (client-side), artículo destacado, grid |
| `/blog/[slug]/` | 3 artículos reales + relacionados + JSON-LD BlogPosting |
| `/blog/preguntas-frecuentes/` | 4 grupos de FAQ + CTA |
| `/contacto/` | Info, mapa estático + enlace GMaps, formulario con tabs Comercial / Talento, validación, Resend opcional, **fallback mailto/WhatsApp en hosting estático** |
| `/juricob/` | Landing externa con accesos a Juricob (login, registro, recuperación) |
| `/politica-de-privacidad/` | Legal completa (Ley 1581, derechos, terceros, Juricob, Google Maps) |
| `/politica-de-cookies/` | Legal honesta: sin cookies propias no esenciales, mención a Maps/Juricob/sociales |
| `/sitemap.xml` / `/robots.txt` | Generados en build por `scripts/generate-seo.mjs` |

---

## Redirecciones heredadas (HTTP 301)

**Fuente única:** `scripts/redirects.json` (15 reglas).

| Contexto | Cómo se aplican |
|----------|-----------------|
| **Desarrollo (`npm run dev`)** | `next.config.ts` expone `async redirects()` (solo en `NODE_ENV === "development"`). |
| **Export estático (`build:pages` / CI)** | `scripts/generate-redirects.mjs` genera una página HTML por cada origen en `out/<origen>/index.html` con `<meta http-equiv="refresh">`, `<link rel="canonical">` y `window.location.replace`. |
| **Rutas dinámicas (`/dipi_testimonial/:slug`)** | No enumerables en estático. Se resuelven desde `out/404.html`: `scripts/generate-redirects.mjs` inyecta un script que detecta `location.pathname` y redirige a `/servicios/propiedad-horizontal/`. |

### Tabla completa

| Origen | Destino |
|--------|---------|
| `/inicio` | `/` |
| `/contact-center-armenia` | `/servicios/contact-center/` |
| `/recuperacion-de-cartera-armenia` | `/servicios/recuperacion-de-cartera/` |
| `/propiedad-horizontal-armenia` | `/servicios/propiedad-horizontal/` |
| `/servicios-juridicos-armenia` | `/servicios/juridicos/` |
| `/inteligencia-empresarial-power-bi-armenia` | `/emdata/` |
| `/unete-a-nuestro-equipo` | `/contacto/?tab=empleo` |
| `/portafolio` | `/servicios/` |
| `/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional` | `/blog/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional/` |
| `/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente-y-reduce-riesgos` | `/blog/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente-y-reduce-riesgos/` |
| `/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado-el-valor-de-la-etapa-prejuridica` | `/blog/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado/` |
| `/category/noticias` | `/blog/` |
| `/category/empresa` | `/blog/` |
| `/dipi_testimonial/:slug` | `/servicios/propiedad-horizontal/` (dinámico → 404.html) |
| `/dipi_popup_maker/menu-movil` | `/` |

---

## Formulario de contacto (`/api/contacto/`)

### Backend (`src/app/api/contacto/route.ts`)
- **Validación server-side**: campos obligatorios, formato email, longitudes, tipo de archivo (PDF/DOC/DOCX ≤ 5 MB).
- **Dos modos**:
  - `RESEND_API_KEY` definida → envía correo HTML a `CONTACT_TO_EMAIL` con `reply_to` del usuario.
  - Sin clave → **modo prototipo local**: valida, loggea en consola y responde `{ ok: true, mode: "local" }`.

### Frontend (`src/components/ContactForm.tsx`)
- **Pestañas accesibles**: `role="group"`, `aria-pressed`, navegación por teclado.
- **Checkbox** con enlace a política de privacidad (`aria-describedby`).
- **Estados**: `idle | sending | success | error`.
- **Fallback en hosting estático (GitHub Pages)**:
  - El endpoint `/api/contacto/` no existe (405/404 con HTML).
  - El formulario detecta `Content-Type !== application/json` en la respuesta.
  - Muestra mensaje explicativo y **dos botones**:
    1. **Enviar por correo** → `mailto:` prellenado con todos los datos del formulario.
    2. **Escribir por WhatsApp** → abre `https://wa.me/573246180051`.
  - Si la pestaña es "Talento" y hubo archivo, avisa: *"Si adjuntó hoja de vida, recuerde añadirla manualmente al correo."*
  - Los datos **no se pierden**; el usuario puede copiar/pegar o usar los botones.

---

## Capturas de pantalla (para documentación v2 / PDF)

```bash
# Desktop 1440 full-page
node scripts/capture.mjs http://localhost:3000/ shots/home-desktop.jpg 1440 1000 1

# Mobile 390 full-page
node scripts/capture.mjs http://localhost:3000/ shots/home-mobile.jpg 390 844 1

# Todas las rutas (ejemplo)
for route in / /servicios/ /servicios/contact-center/ /emdata/ /nosotros/ /blog/ /blog/preguntas-frecuentes/ /contacto/ /juricob/ /politica-de-privacidad/ /politica-de-cookies/; do
  node scripts/capture.mjs "http://localhost:3000${route}" "shots${route}desktop.jpg" 1440 1000 1
  node scripts/capture.mjs "http://localhost:3000${route}" "shots${route}mobile.jpg" 390 844 1
done
```

- El script desactiva animaciones `[data-reveal]`, hace scroll completo para lazy-load y espera fuentes (`document.fonts.ready`).
- Las capturas se usan en el PDF v2 (`/home/payan/emdecob-doc/scripts/build-report.js`) etiquetadas como **“prototipo de alta fidelidad”**.

---

## Comandos de calidad

```bash
# Lint + TypeScript (build ya ejecuta tsc)
npm run lint
npm run build

# Auditoría visual automatizada (overflow, imágenes rotas, h1, enlaces vacíos, labels)
node scripts/qa.mjs

# Verificación de enlaces internos (200/301)
node scripts/check-links.mjs

# Pruebas de interacción (dropdown, menú móvil con focus trap, formulario, filtro blog)
node scripts/interactions.mjs

# Métricas de layout por ruta
node scripts/measure.mjs

# Verificación sin JS (contenido visible, noscript)
node scripts/nojs.mjs
```

---

## Scripts de build y utilidades

| Script | Propósito |
|--------|-----------|
| `npm run build` | Export estático sin basePath (dominio propio / revisión local). |
| `npm run build:pages` | **Pipeline completo para GitHub Pages**: build con `GITHUB_PAGES=true` + fix-asset-paths + generate-redirects + generate-seo + check-assets. |
| `npm run check:assets` | Ejecuta solo `scripts/check-assets.mjs` sobre `out/` actual. |
| `scripts/fix-asset-paths.mjs` | Parchea `url(/images|videos|fonts/)` → `url(/emdecob/...)` en CSS del export. Idempotente. |
| `scripts/generate-redirects.mjs` | Genera 14 páginas de redirección estática + inyecta script para dinámicas en `404.html`. |
| `scripts/generate-seo.mjs` | Escribe `out/robots.txt` y `out/sitemap.xml` usando `NEXT_PUBLIC_SITE_URL`. |
| `scripts/check-assets.mjs` | Valida: 0 rutas sin prefijar, 0 assets referenciados faltantes, assets críticos presentes. |
| `scripts/base-path.mjs` | Detecta `basePath` leyendo `out/index.html` (`src="/emdecob/_next/...`); fallback a `GITHUB_PAGES`. |
| `scripts/redirects.json` | Fuente única de verdad para redirecciones 301 (consumida por `next.config.ts` y `generate-redirects.mjs`). |

---

## Accesibilidad y SEO

- **Skip link** (`#contenido`) + landmarks semánticos (`main`, `nav`, `header`, `footer`).
- **Encabezados jerárquicos**: un solo `h1` por página.
- **Focus visible** global (`outline: 2px solid var(--green-bright)`).
- **ARIA**: `aria-expanded`, `aria-controls`, `aria-pressed`, `aria-modal`, `role="dialog"`, `role="group"`, `aria-live` en formulario.
- **Focus trap** en menú móvil + cierre con `Escape` + restauración de foco.
- **JSON-LD**: `Organization` (home), `Service` (servicios), `Blog`/`BlogPosting` (blog), `FAQPage` (home + FAQ), `WebApplication` (Juricob), `AboutPage` → `mainEntity: Organization` (nosotros).
- **Canonical URLs** y `alternates` en cada página con `trailingSlash: true`.
- **Sitemap.xml** y `robots.txt` generados en build.
- **Open Graph / Twitter** con imagen real 1200×630 (`og-emdecob.jpg`).

---

## Contenido y modelos (fuente única)

Los textos viven en `src/content/` tipados con TypeScript:

- `site.ts`: empresa, nav, stats, aliados, testimonios, proceso, FAQ globales, valores, equipo, timeline, datos Juricob.
- `services.ts`: 4 servicios con métricas, retos, pilares, portfolio, casos, EMDATA, FAQ, SEO.
- `posts.ts`: 3 artículos reales (slug, título, extracto, fecha ISO, categoría, autor, tiempo, cover, bloques).
- `legal.ts`: política de privacidad y cookies actualizadas **29-oct-2026**, sin inventos.

> **Regla**: no hay lorem ipsum, métricas inventadas, testimonios falsos, clientes ficticios ni afirmaciones legales no verificadas. Lo que falte se marca como `TODO` en el código.

---

## Paleta y tipografía (aprobadas)

```css
:root {
  --green:       #01633A;  /* principal */
  --green-deep:  #004D2D;
  --green-bright:#00A53E;  /* acento / hover */
  --paper:       #F5F5F5;  /* fondo base */
  --paper-2:     #EEF1EF;
  --line:        #D3D3D3;  /* bordes / divisores */
  --ink:         #1D1E1F;  /* texto principal */
  --muted:       #5E6863;  /* texto secundario */
  --white:       #FFFFFF;
  --dark:        #0B1D14;  /* topbar */
}
```

- **Títulos**: Sora 600/700 (`font-family: "Sora"`).
- **Cuerpo**: Manrope 400–700 (`font-family: "Manrope"`).
- **Dorado retirado**: `#E09900` (no se usa; contraste insuficiente sobre blanco).

---

## Git local (primer commit)

```bash
cd /home/payan/emdecob-web
git init
git add .
git commit -m "chore: prototipo EMDECOB v1 – IA, UI, contenido, redirects, form, capturas"
# Remoto: añadir solo cuando se solicite explícitamente
```

---

## Próximos pasos (hacia v2 documentación)

1. **Capturas finales**: ejecutar `scripts/capture.mjs` en todas las rutas (desktop 1440 / mobile 390, full-page + por sección) → guardar en `/home/payan/emdecob-doc/assets/`.
2. **Actualizar `build-report.js`**: reemplazar placeholders de mockups por capturas reales, cambiar etiqueta “mockup” → “prototipo de alta fidelidad”.
3. **Regenerar PDF**: `cd /home/payan/emdecob-doc && node scripts/build-report.js` → validar 109 páginas, TOC clicable, texto buscable, metadatos correctos.
4. **Entregar**: `/home/payan/emdecob.pdf` (copia en `/home/payan/emdecob-doc/emdecob.pdf`).

---

## Notas importantes

- **Sin autenticación propia**: Juricob (`https://juricob.emdecob.com/`) es el único sistema de login/registro/recuperación. Este sitio solo enlaza.
- **Sin base de datos**: todo el contenido es estático (SSG) salvo el endpoint `/api/contacto/`.
- **`trailingSlash: true`**: todas las URLs canónicas terminan en `/`. `next/link` y redirects lo respetan.
- **Portafolio**: fuera de navegación; `/portafolio/` → 301 → `/servicios/`.
- **Logo nuevo**: pendiente; se usa wordmark provisional “EMDECOB” con marca “E” en verde.
- **Formulario en producción real**: requiere `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y dominio verificado en Resend.
- **No hay analítica / tracking**: la política de cookies refleja esto honestamente.
- **`redirects()` de Next.js**: **no funcionan** con `output: "export"`. En este proyecto se reemplazan por páginas estáticas + script en `404.html` (ver sección *Redirecciones heredadas*).
- **`asset()` obligatorio**: cualquier nueva referencia a `public/` en componentes **debe** usar `asset("/ruta")` para que funcione en GitHub Pages.

---

## Licencia y uso

Prototipo interno para EMDECOB S.A.S. No para distribución pública sin aprobación.