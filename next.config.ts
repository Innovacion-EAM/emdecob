import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/inicio", destination: "/", statusCode: 301 },
      { source: "/contact-center-armenia", destination: "/servicios/contact-center/", statusCode: 301 },
      { source: "/recuperacion-de-cartera-armenia", destination: "/servicios/recuperacion-de-cartera/", statusCode: 301 },
      { source: "/propiedad-horizontal-armenia", destination: "/servicios/propiedad-horizontal/", statusCode: 301 },
      { source: "/servicios-juridicos-armenia", destination: "/servicios/juridicos/", statusCode: 301 },
      { source: "/inteligencia-empresarial-power-bi-armenia", destination: "/emdata/", statusCode: 301 },
      { source: "/unete-a-nuestro-equipo", destination: "/contacto/?tab=empleo", statusCode: 301 },
      { source: "/portafolio", destination: "/servicios/", statusCode: 301 },
      { source: "/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional", destination: "/blog/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional/", statusCode: 301 },
      { source: "/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente-y-reduce-riesgos", destination: "/blog/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente-y-reduce-riesgos/", statusCode: 301 },
      { source: "/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado-el-valor-de-la-etapa-prejuridica", destination: "/blog/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado/", statusCode: 301 },
      { source: "/category/noticias", destination: "/blog/", statusCode: 301 },
      { source: "/category/empresa", destination: "/blog/", statusCode: 301 },
      { source: "/dipi_testimonial/:slug", destination: "/servicios/propiedad-horizontal/", statusCode: 301 },
      { source: "/dipi_popup_maker/menu-movil", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
