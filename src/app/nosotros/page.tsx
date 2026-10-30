import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { asset } from "@/lib/asset";
import {
  company,
  stats,
  team,
  timeline,
  values,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos una empresa familiar del Quindío que integra Contact Center, tecnología y respaldo jurídico desde 2006.",
  alternates: { canonical: "/nosotros/" },
  openGraph: {
    title: "Nosotros · EMDECOB",
    description:
      "Una empresa familiar que fortalece la región desde 2006.",
    url: "/nosotros/",
    images: [{ url: "/images/img-apoyo-about-emdecob-web-2.webp" }],
  },
};

const pillars = [
  {
    icon: Headphones,
    title: "Contact Center como eje de la operación",
    text: "Desde aquí articulamos la gestión de cartera y propiedad horizontal con eficiencia, cercanía y enfoque en resultados.",
  },
  {
    icon: BarChart3,
    title: "Tecnología y datos que impulsan decisiones",
    text: "EMDATA, nuestro tablero de datos, permite trazabilidad, control en tiempo real y análisis inteligente para optimizar cada proceso.",
  },
  {
    icon: ShieldCheck,
    title: "Respaldo jurídico y confianza",
    text: "Nuestro acompañamiento legal brinda seguridad, transparencia y soluciones integrales que respaldan cada gestión.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Nosotros · EMDECOB",
  description:
    "Historia, pilares y equipo de EMDECOB, empresa familiar del Quindío con operación desde 2006.",
  mainEntity: {
    "@type": "Organization",
    name: company.legalName,
    foundingDate: "2006",
    foundingLocation: "Armenia, Quindío, Colombia",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title={
          <>
            Una empresa familiar que fortalece la región desde 2006.
          </>
        }
        description="Nacimos en el Quindío con la convicción de transformar la cobranza en un proceso humano, transparente y respaldado por la innovación."
        image="/images/img-apoyo-about-emdecob-web-2.webp"
        imageAlt="Equipo EMDECOB en sus oficinas de Armenia"
        crumbs={[{ label: "Nosotros" }]}
        chips={["Empresa familiar", "Armenia, Quindío", "Desde 2006"]}
        actions={
          <>
            <Link className="btn btn--primary" href="/contacto/">
              Hablemos
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link className="btn btn--outline" href="/emdata/">
              Conoce EMDATA
            </Link>
          </>
        }
      />

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

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Nuestra historia"
            title="Crecer también es aprender a sostener."
            description="Desde 2006: evolución, decisiones difíciles y una convicción: la cercanía y el rigor pueden ir juntos."
          />
          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline__item" key={item.period} data-reveal>
                <span className="timeline__period">{item.period}</span>
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Pilares"
            title="Lo que sostiene nuestra identidad."
            description="No son valores de pared. Son las decisiones que tomamos cuando la operación se pone difícil."
          />
          <div className="feature-grid">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div className="feature-card" key={pillar.title} data-reveal>
                  <span className="feature-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              );
            })}
          </div>

          <div className="values-block" data-reveal>
            <div>
              <span className="eyebrow">Valores</span>
              <h3 className="h3">Cómo trabajamos.</h3>
            </div>
            <div className="value-grid">
              {values.map((value, index) => (
                <div className="value-card" key={value.title}>
                  <span className="value-card__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container about-grid">
          <div className="about-media" data-reveal>
            <div className="about-media__image">
              <Image
                src={asset("/images/img-apoyo-about-emdecob-web-1.webp")}
                alt="Equipo de EMDECOB"
                width={900}
                height={800}
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            </div>
            <div className="about-media__badge">
              <strong>2006</strong>
              <span>el año en que empezó esta historia</span>
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow">Propósito</span>
            <h2 className="h2">
              Aportar a la región con una gestión responsable, cercana y
              orientada a resultados.
            </h2>
            <p className="lede">
              EMDECOB nació con recursos limitados y el deseo de emprender de
              los hermanos Escobar. Con disciplina, cercanía y profesionalismo
              se consolidó un modelo de servicio que hoy integra personas,
              tecnología y respaldo jurídico.
            </p>
            <p className="muted" style={{ marginTop: 16, fontSize: 13 }}>
              Después de cuatro años en el edificio Bancafé, las dificultades
              financieras llevaron a trasladar las oficinas a una vivienda
              familiar. Ese espacio se convirtió en el nuevo centro de
              operaciones y demostró que la resiliencia y la capacidad de
              adaptación hacen parte de nuestra identidad.
            </p>
            <div className="about-points">
              <div className="about-point">
                <strong>Disciplina</strong>
                <span>Procesos claros, medición y seguimiento.</span>
              </div>
              <div className="about-point">
                <strong>Cercanía</strong>
                <span>Relaciones de largo plazo con clientes y equipos.</span>
              </div>
              <div className="about-point">
                <strong>Resiliencia</strong>
                <span>Capacidad de adaptarse sin perder el propósito.</span>
              </div>
              <div className="about-point">
                <strong>Innovación</strong>
                <span>EMDATA y Juricob como herramientas propias.</span>
              </div>
            </div>
            <div className="actions">
              <Link className="btn btn--outline" href="/contacto/">
                Conversemos
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Equipo"
            title="Personas que responden por la operación."
            description="Un equipo directivo con frentes claros: operación, datos, jurídico, cartera, propiedad horizontal y tesorería."
          />
          <div className="team-grid">
            {team.map((person) => (
              <div className="team-card" key={person.name} data-reveal>
                <div className="team-card__avatar" aria-hidden="true">
                  {person.initials}
                </div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="manifesto" data-reveal>
            <span className="eyebrow">Nuestro compromiso</span>
            <p className="manifesto__text">
              “La confianza no se declara. Se construye con cada gestión bien
              hecha, cada dato claro y cada conversación respetuosa.”
            </p>
            <div className="manifesto__foot">
              <span>
                <Sparkles aria-hidden="true" />
                EMDECOB S.A.S.
              </span>
              <span>
                <Check aria-hidden="true" />
                Armenia, Quindío
              </span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Quiere conocer al equipo?"
        text="Estamos en Armenia, Quindío. También podemos reunirnos por el canal que prefiera."
        primaryLabel="Hablemos"
        secondaryLabel="WhatsApp"
      />
      <JsonLd data={aboutJsonLd} />
    </>
  );
}
