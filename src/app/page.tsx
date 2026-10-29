import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { DashboardMock } from "@/components/DashboardMock";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/content/services";
import { posts } from "@/content/posts";
import {
  allies,
  faqs,
  process,
  stats,
  testimonials,
} from "@/content/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.slice(0, 5).map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HomePage() {
  return (
    <>
            <section className="hero hero--video">
        <div className="hero__video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/founders-emdecob-web.webp"
            preload="metadata"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container hero__grid">
          <div className="hero__copy" data-reveal>
            <span className="eyebrow">
              Contact Center BPS · Armenia, Quindío
            </span>
            <h1 className="display hero__title h1">
              Donde la <em>estrategia</em> se ejecuta.
            </h1>
            <p className="lede hero__lede">
              Ejecutamos la operación, apoyamos la estrategia y transformamos
              los datos en decisiones. Somos un Contact Center BPS que integra
              gestión, cobranza, jurídico y tableros de datos.
            </p>
            <div className="actions">
              <Link className="btn btn--primary" href="/contacto/">
                Hablemos
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="btn btn--outline" href="/nosotros/">
                Conoce EMDECOB
              </Link>
            </div>
            <div className="hero__meta">
              <span>
                <MapPin aria-hidden="true" />
                Desde el Quindío
              </span>
              <span>
                <Clock aria-hidden="true" />
                Desde 2006
              </span>
              <span>
                <Sparkles aria-hidden="true" />
                Datos + respaldo jurídico
              </span>
            </div>
          </div>
        </div>
      </section>

<section className="allies" aria-label="Aliados de EMDECOB">
        <div className="container allies__inner">
          <p className="allies__label">
            Aliados reconocidos en los sectores público, privado y mixto
          </p>
          <div className="marquee">
            <div className="marquee__track">
              {[...allies, ...allies].map((logo, index) => (
                <Image
                  key={`${logo.src}-${index}`}
                  src={logo.src}
                  alt={index < allies.length ? logo.alt : ""}
                  aria-hidden={index >= allies.length}
                  width={172}
                  height={84}
                  sizes="86px"
                  loading="eager"
                />
              ))}
            </div>
          </div>
        </div>
      


</section>


      

      <section className="section section--white" id="servicios">
        <div className="container">
          <SectionHeading
            eyebrow="Servicios"
            title={
              <>
                Una operación.{" "}
                <br />
                Cuatro capacidades.
              </>
            }
            description="En EMDECOB unimos Contact Center, gestión de cartera, soluciones jurídicas y tecnología para operar con precisión y decidir con datos."
            link={{ label: "Ver todos los servicios", href: "/servicios/" }}
          />

          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>

          <div className="services-foot" data-reveal>
            <p>
              EMDATA conecta la operación con la analítica. Menos reportes
              sueltos, más decisiones compartidas.
            </p>
            <Link className="link-arrow" href="/emdata/">
              Conoce EMDATA
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="manifiesto" aria-labelledby="manifiesto-title">
        <div className="manifiesto__video" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/cover-video-presentacion-emdecob-web.webp"
            preload="metadata"
          >
            <source src="/videos/manifiesto.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container manifiesto__grid">
          <div className="manifiesto__content" data-reveal>
            <span className="eyebrow">Manifiesto</span>
            <h2 id="manifiesto-title" className="display h2">
              Operar con convicción.<br /> Medir con honestidad.
            </h2>
            <p className="lede">
              No nos mueve el volumen, nos mueve el resultado bien hecho.
              Cada llamada, cada acuerdo, cada expediente tiene un nombre
              y una historia detrás. Por eso integramos operación, derecho
              y datos: para que la ejecución no sea ciega.
            </p>
            <div className="manifiesto__actions">
              <Link className="btn btn--primary" href="/nosotros/">
                Nuestra historia
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="btn btn--outline" href="/contacto/">
                Hablemos
              </Link>
            </div>
          </div>
        </div>
      </section>

<section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="De la lectura a la operación."
            description="No llegamos con una fórmula. Leemos el contexto, diseñamos la ruta y medimos lo que importa."
            link={{ label: "Hablemos", href: "/contacto/" }}
          />
          <div className="process-grid">
            {process.map((step) => (
              <div className="process-step" key={step.number} data-reveal>
                <span className="process-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Conocimiento"
            title="Ideas para operar mejor."
            description="Artículos, análisis y tendencias sobre gestión, derecho y tecnología empresarial."
            link={{ label: "Ver el blog", href: "/blog/" }}
          />
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container faq-layout">
          <div className="faq-intro" data-reveal>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="h2">Lo que suelen preguntarnos.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Si tu pregunta no está aquí, escríbenos. Preferimos una
              conversación clara antes que una respuesta genérica.
            </p>
            <Link
              className="link-arrow"
              href="/blog/preguntas-frecuentes/"
              style={{ marginTop: 24 }}
            >
              Ver todas las preguntas
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div data-reveal>
            <FaqList items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd data={faqJsonLd} />
    </>
  );
}
