# EMDECOB Web – Prototipo de alta fidelidad

Sitio web institucional de EMDECOB S.A.S. (Contact Center BPS, recuperación de cartera, propiedad horizontal, servicios jurídicos y EMDATA) construido con Next.js 16 App Router, TypeScript y CSS personalizado (sin Tailwind runtime). Incluye arquitectura de información aprobada, redirecciones 301 heredadas, JSON-LD, formulario de contacto server-side y capturas de pantalla automatizadas para documentación.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 (strict) |
| Estilos | CSS nativo con variables, `@media`, animaciones |
| Fuentes | Sora (títulos) + Manrope (cuerpo) — WOFF2 auto-hospedadas en `public/fonts` |
| Imágenes | `next/image` optimizado (WebP/AVIF) |
| Lint | ESLint 9 (flat config) + `eslint-config-next` |
| Capturas | Puppeteer Core + Chromium del sistema |

---

## Requisitos previos

- Node.js 20+ (recomendado 22 LTS)
- Chromium instalado (`/usr/bin/chromium` en Linux; ajusta `CHROME_PATH` si difiere)

---

## Instalación y ejecución local

```bash
# 1) Clonar / entrar al proyecto
cd /home/payan/emdecob-web

# 2) Instalar dependencias
npm ci

# 3) (Opcional) Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local si se desea envío real de correo (RESEND_API_KEY)

# 4) Desarrollo con Turbopack
npm run dev
# Abre http://localhost:3000

# 5) Build de producción
npm run build
# El export estático queda en out/ (sirve esa carpeta con cualquier servidor estático)

# 6) Build + post-proceso para GitHub Pages (basePath /emdecob)
npm run build:pages
```

> `next start` no funciona con `output: "export"`. Para revisar el build local:
> `npx serve out` o `python3 -m http.server -d out 3000`.

---

## Despliegue en GitHub Pages

El sitio se publica en `https://innovacion-eam.github.io/emdecob/`, así que el
build usa `basePath: "/emdecob"`. Next.js **no** prefija automáticamente las
rutas de `public/` que se usan en `next/image`, `<video>`, `poster` o `url()`
del CSS. Por eso:

- En el código, todas las rutas de `public/` se envuelven con `asset()` de
  `src/lib/asset.ts` (usa `NEXT_PUBLIC_BASE_PATH`, definido en `next.config.ts`).
- `scripts/fix-asset-paths.mjs` reescribe los `url()` del CSS compilado.
- `scripts/generate-redirects.mjs` genera páginas 301 estáticas (los
  `redirects()` de Next no se aplican con `output: "export"`).
- `scripts/check-assets.mjs` falla el build si queda una ruta sin prefijar o si
  una imagen/video/fuente referenciada no existe en `out/`.

El workflow `.github/workflows/deploy.yml` ejecuta todo en ese orden.

---

## Estructura del proyecto

```
emdecob-web/
├─ public/
│  ├─ fonts/          # Sora + Manrope WOFF2
│  ├─ images/         # Activos migrados del sitio original
│  └─ og-emdecob.jpg  # Open Graph 1200×630 generado
├─ src/
│  ├─ app/            # App Router (páginas, API, layout raíz)
│  │  ├─ api/contacto/route.ts    # Formulario server-side
│  │  ├─ blog/                    # Listado + detalle + FAQ
│  │  ├─ servicios/[slug]/        # 4 páginas de servicio dinámicas
│  │  ├─ (emdata|nosotros|juricob|contacto|politica-*)/
│  │  ├─ layout.tsx               # Metadata, JSON-LD Organization, Header/Footer
│  │  ├─ not-found.tsx            # 404 amigable
│  │  ├─ sitemap.ts / robots.ts   # SEO técnico
│  │  └─ globals.css              # Sistema de diseño completo (~4.6k líneas)
│  ├─ components/     # UI compartida (Header, Footer, Form, Cards, etc.)
│  ├─ content/        # Modelos tipados (site.ts, services.ts, posts.ts, legal.ts)
│  └─ middleware.ts   # (vacío, reservado)
├─ scripts/
│  ├─ capture.mjs     # Captura full-page + por sección (desktop 1440 / mobile 390)
│  ├─ qa.mjs          # Auditoría visual automatizada (overflow, imágenes, h1, enlaces)
│  ├─ check-links.mjs # Verificación de enlaces internos
│  ├─ interactions.mjs# Pruebas de interacción (dropdown, menú móvil, formulario, filtro blog)
│  ├─ measure.mjs     # Métricas de layout por ruta
│  ├─ nojs.mjs        # Verificación sin JavaScript (contenido visible)
│  └─ layout.mjs      # Dump estructural de secciones
├─ next.config.ts     # trailingSlash, redirects 301, headers
├─ eslint.config.mjs  # ESLint flat config
├─ tsconfig.json
└─ .env.example
```

---

## Rutas implementadas (16 URLs con trailing slash)

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero, aliados, servicios, stats, testimonios, proceso, EMDATA, blog destacado, FAQ, CTA |
| `/servicios/` | Hub de 4 servicios con pestañas, integración, stats, proceso, CTA |
| `/servicios/contact-center/` | Detalle completo (métricas, retos, pilares, portfolio, casos, EMDATA, FAQ, CTA) |
| `/servicios/recuperacion-de-cartera/` | — |
| `/servicios/propiedad-horizontal/` | — |
| `/servicios/juridicos/` | — |
| `/emdata/` | Módulos, audiencia, características, seguridad, demo CTA |
| `/nosotros/` | Pilares, historia (timeline 2006–), stats, equipo, valores, CTA |
| `/blog/` | Listado con filtro por categoría (client-side), artículo destacado, grid |
| `/blog/[slug]/` | 3 artículos reales + relacionados + JSON-LD BlogPosting |
| `/blog/preguntas-frecuentes/` | 4 grupos de FAQ + CTA |
| `/contacto/` | Info, mapa, formulario con pestañas Comercial / Talento, validación, Resend opcional |
| `/juricob/` | Landing externa con accesos a Juricob (login, registro, recuperación) |
| `/politica-de-privacidad/` | Legal completa (Ley 1581, derechos, terceros, Juricob, Google Maps) |
| `/politica-de-cookies/` | Legal honesta: sin cookies propias no esenciales, mención a Maps/Juricob/sociales |
| `/sitemap.xml` / `/robots.txt` | Generados en build |

---

## Redirecciones heredadas (HTTP 301)

Definidas en `scripts/redirects.json` (fuente única). En desarrollo las aplica
`next.config.ts`; en el export estático `scripts/generate-redirects.mjs` crea una
página de redirección por cada origen (y las rutas dinámicas se resuelven desde
`404.html`).

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
| URLs raíz de blog antiguas | `/blog/<slug>/` |
| `/category/noticias` y `/category/empresa` | `/blog/` |
| Testimonios y popup Divi | `/` o servicio correspondiente |

---

## Formulario de contacto (`/api/contacto/`)

- **Validación server-side**: campos obligatorios, email, longitudes, tipo de archivo (PDF/DOC/DOCX ≤ 5 MB).
- **Dos modos**:
  - `RESEND_API_KEY` configurado → envía correo HTML a `CONTACT_TO_EMAIL` con `reply_to` del usuario.
  - Sin clave → modo **prototipo local**: valida, loggea en consola y responde `{ ok: true, mode: "local" }`.
- **Frontend**: pestañas accesibles (`role="group"`, `aria-pressed`), checkbox con enlace a política de privacidad, estados `idle | sending | success | error`.
- **En GitHub Pages (estático)**: el endpoint no existe. El formulario detecta la
  respuesta no-JSON y ofrece enviar la misma información por correo (`mailto:`)
  o WhatsApp, sin perder los datos escritos.

---

## Capturas de pantalla (para documentación v2)

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

- El script desactiva animaciones `[data-reveal]`, hace scroll completo para lazy-load y espera fuentes.
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
- `legal.ts`: política de privacidad y cookies actualizadas 29-oct-2026, sin inventos.

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
- **Dorado retirado**: `#E09900` (no se usa).

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
- **Formulario en producción**: requiere `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y dominio verificado en Resend.
- **No hay analítica / tracking**: la política de cookies refleja esto honestamente.

---

## Licencia y uso

Prototipo interno para EMDECOB S.A.S. No para distribución pública sin aprobación.
