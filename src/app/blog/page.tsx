import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Check } from "lucide-react";
import { BlogExplorer } from "@/components/BlogExplorer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, análisis y tendencias sobre gestión, derecho, cartera, Contact Center y tecnología empresarial.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog · EMDECOB",
    description:
      "Conocimiento de alto valor para líderes, gerentes financieros, abogados corporativos y administradores.",
    url: "/blog/",
    images: [{ url: "/images/portadas-blog-emdecob-web-2.webp" }],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog de EMDECOB",
  description:
    "Artículos, análisis y tendencias sobre gestión, derecho y tecnología empresarial.",
  publisher: { "@type": "Organization", name: "EMDECOB S.A.S." },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.dateISO,
    url: `https://emdecob.com/blog/${post.slug}/`,
    author: { "@type": "Organization", name: post.author },
  })),
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Conocimiento"
        title={
          <>
            Ideas para operar{" "}
            <br />
            con más claridad.
          </>
        }
        description="El Blog de EMDECOB es un espacio para compartir conocimiento de alto valor con líderes, gerentes financieros, abogados corporativos y administradores."
        crumbs={[{ label: "Blog" }]}
        chips={["Cartera", "Contact Center", "Datos", "Jurídico"]}
        actions={
          <>
            <Link className="btn btn--primary" href="/blog/preguntas-frecuentes/">
              Preguntas frecuentes
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="btn btn--outline" href="/contacto/">
              Hablemos
            </Link>
          </>
        }
      />

      <section className="section section--white">
        <div className="container">
          <BlogExplorer posts={posts} />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Nuestro compromiso"
            title="Conocimiento que se puede aplicar."
            description="Cada artículo publicado por EMDECOB es elaborado por expertos en derecho, finanzas, analítica y gestión operativa."
            link={{ label: "Ver preguntas frecuentes", href: "/blog/preguntas-frecuentes/" }}
          />
          <div className="feature-grid">
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <BookOpen aria-hidden="true" />
              </span>
              <h3>Contexto, no titulares</h3>
              <p>
                Explicamos el porqué de cada proceso y cómo se conecta con la
                operación real de una empresa o copropiedad.
              </p>
            </div>
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <Check aria-hidden="true" />
              </span>
              <h3>Información confiable</h3>
              <p>
                Contenido revisado por el equipo que opera cartera, Contact
                Center y procesos jurídicos todos los días.
              </p>
            </div>
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <ArrowUpRight aria-hidden="true" />
              </span>
              <h3>Aplicable al contexto</h3>
              <p>
                Pensado para el contexto empresarial colombiano y
                latinoamericano, con ejemplos y criterios concretos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Tiene una pregunta que no está en el blog?"
        text="Escríbanos. Preferimos una conversación clara antes que una respuesta genérica."
        primaryLabel="Hablemos"
        secondaryLabel="WhatsApp"
      />
      <JsonLd data={blogJsonLd} />
    </>
  );
}
