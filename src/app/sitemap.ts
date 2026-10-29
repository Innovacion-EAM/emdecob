import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { posts } from "@/content/posts";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emdecob.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/servicios/",
    "/emdata/",
    "/nosotros/",
    "/blog/",
    "/blog/preguntas-frecuentes/",
    "/contacto/",
    "/juricob/",
    "/politica-de-privacidad/",
    "/politica-de-cookies/",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date("2026-10-29"),
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/servicios/${service.slug}/`,
      lastModified: new Date("2026-10-29"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.dateISO),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
