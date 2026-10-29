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
      <section className="hero">
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
                Hablemos de tu operación
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

          <div className="hero__visual" data-reveal>
            <div className="hero__frame" aria-hidden="true" />
            <div className="hero__sticker" aria-hidden="true">
              <strong>2006</strong>
              <span>desde entonces</span>
            </div>
            <div className="hero__image">
              <Image
                src="/images/founders-emdecob-web.webp"
                alt="Fundadores y equipo directivo de EMDECOB"
                width={901}
                height={701}
                priority
                sizes="(max-width: 980px) 92vw, 44vw"
              />
            </div>
            <div className="hero__caption">
              <div>
                <strong>Un equipo. Cuatro capacidades.</strong>
                <span>Contact center · cartera · jurídico · datos</span>
              </div>
              <Link href="/servicios/" aria-label="Ver los servicios de EMDECOB">
                <ArrowUpRight aria-hidden="true" />
              </Link>
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

      <section className="stats-band" aria-label="EMDECOB en cifras">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div className="stat" key={stat.label} data-reveal>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <p>{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section trust-section">
        <div className="container">
          <SectionHeading
            eyebrow="Resultados"
            title="La confianza se construye con resultados."
            description="Nuestros clientes destacan la efectividad de la gestión, el acompañamiento cercano y la tranquilidad de tener una operación ordenada."
            light
          />

          <div className="trust-grid">
            {testimonials.map((testimonial) => (
              <div className="testimonial" key={testimonial.name} data-reveal>
                <div className="stars" aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <footer>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                  <Check aria-hidden="true" />
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section data-feature">
        <div className="container data-feature__grid">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">EMDATA</span>
            <h2 className="h2 data-feature__title">
              Los datos no sirven si no se convierten en decisiones.
            </h2>
            <p className="lede lede--light">
              EMDATA integra cartera, gestión jurídica, Contact Center y
              finanzas en un solo tablero. Una lectura clara para saber qué
              está pasando y qué mover.
            </p>
            <ul className="data-feature__list">
              {[
                "Cartera, recaudo y acuerdos en tiempo real.",
                "Gestión de Contact Center y tiempos de respuesta.",
                "Procesos jurídicos y fechas críticas.",
                "Reportes claros para dirección y comités.",
              ].map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link className="btn btn--bright" href="/emdata/">
                Conoce EMDATA
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="btn btn--ghost" href="/contacto/">
                Solicita una demo
              </Link>
            </div>
          </div>

          <div data-reveal>
            <DashboardMock />
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

      <section className="section section--white">
        <div className="container about-grid">
          <div className="about-media" data-reveal>
            <div className="about-media__image">
              <Image
                src="/images/cover-video-presentacion-emdecob-web.webp"
                alt="Equipo de EMDECOB en Armenia, Quindío"
                width={1200}
                height={900}
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            </div>
            <div className="about-media__badge">
              <strong>2006</strong>
              <span>fortaleciendo la región desde el Quindío</span>
            </div>
          </div>

          <div className="about-copy" data-reveal>
            <span className="eyebrow">Nosotros</span>
            <h2 className="h2">
              Una empresa familiar que opera como un aliado estratégico.
            </h2>
            <p className="lede">
              Nacimos en 2006 con la convicción de transformar la cobranza
              en un proceso humano, transparente y respaldado por la innovación.
            </p>
            <p className="muted" style={{ marginTop: 16, fontSize: 13 }}>
              Hoy integramos Contact Center, tecnología y respaldo jurídico para
              acompañar a empresas y copropiedades con soluciones eficientes y
              humanas. Operamos desde Armenia para Colombia.
            </p>
            <div className="about-points">
              <div className="about-point">
                <strong>Contact Center como eje</strong>
                <span>Articulamos cartera y propiedad horizontal con cercanía y resultados.</span>
              </div>
              <div className="about-point">
                <strong>Tecnología con propósito</strong>
                <span>EMDATA da trazabilidad, control y análisis a cada proceso.</span>
              </div>
              <div className="about-point">
                <strong>Respaldo jurídico</strong>
                <span>Seguridad, transparencia y soluciones integrales.</span>
              </div>
              <div className="about-point">
                <strong>Visión de región</strong>
                <span>Talento local, estándares nacionales y relaciones de largo plazo.</span>
              </div>
            </div>
            <div className="actions">
              <Link className="btn btn--outline" href="/nosotros/">
                Conoce nuestra historia
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
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
