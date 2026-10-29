import fs from 'fs';
import path from 'path';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innovacion-eam.github.io/emdecob';
const outDir = path.join(process.cwd(), 'out');

const staticRoutes = [
  '',
  'servicios/',
  'servicios/contact-center/',
  'servicios/recuperacion-de-cartera/',
  'servicios/propiedad-horizontal/',
  'servicios/juridicos/',
  'emdata/',
  'nosotros/',
  'blog/',
  'blog/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional/',
  'blog/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado/',
  'blog/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente/',
  'blog/preguntas-frecuentes/',
  'contacto/',
  'juricob/',
  'politica-de-privacidad/',
  'politica-de-cookies/',
];

// robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);

// sitemap.xml
const today = new Date().toISOString().split('T')[0];
const urls = staticRoutes.map(route => `  <url>
    <loc>${siteUrl}/${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

console.log('Generated robots.txt and sitemap.xml in out/');
