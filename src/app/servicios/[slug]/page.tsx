import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  Clock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceTabs } from "@/components/ServiceTabs";
import { getService, services } from "@/content/services";
import { company } from "@/content/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Servicio no encontrado" };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/servicios/${service.slug}/` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/servicios/${service.slug}/`,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

const challengeIcons = [AlertTriangle, Clock, ShieldCheck];

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: company.legalName,
      url: "https://emdecob.com",
    },
    areaServed: "Colombia",
    url: `https://emdecob.com/servicios/${service.slug}/`,
  };

  return (
    <>
      <PageHero
        eyebrow={`${service.name} · ${service.eyebrow}`}
        title={service.promise}
        description={service.description}
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[
          { label: "Servicios", href: "/servicios/" },
          { label: service.name },
        ]}
        chips={service.pillars.slice(0, 3).map((pillar) => pillar.title)}
        actions={
          <>
            <Link className="btn btn--primary" href="/contacto/">
              Hablemos
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <a
              className="btn btn--outline"
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              WhatsApp
            </a>
          </>
        }
      />
      <ServiceTabs current={service.slug} />

      <div className="service-metrics">
        {service.metrics.map((metric) => (
          <div className="service-metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="El reto"
            title="Cuando la operación pierde contexto."
            description="Los problemas rara vez viven en una sola área. Estas son las señales que aparecen cuando la atención, la cartera y el respaldo legal van por caminos separados."
          />
          <div className="feature-grid">
            {service.challenges.map((challenge, index) => {
              const Icon = challengeIcons[index] ?? AlertTriangle;
              return (
                <div className="feature-card" key={challenge.title} data-reveal>
                  <span className="feature-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Cómo lo resolvemos"
            title="Una ruta con rigor y trazabilidad."
            description="Combinamos personas, protocolos, respaldo jurídico y datos. Cada frente tiene un responsable y cada gestión deja un registro."
          />
          <div className="pillar-grid">
            {service.pillars.map((pillar, index) => (
              <div className="pillar" key={pillar.title} data-reveal>
                <span className="pillar__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Qué incluye"
            title="Servicios diseñados para operar."
            description="El alcance se adapta al tamaño, el sector y el momento de cada organización. Esto es lo que podemos poner a funcionar."
          />
          <div className="portfolio-grid">
            {service.portfolio.map((item, index) => (
              <div className="portfolio-card" key={item.title} data-reveal>
                <span className="portfolio-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.benefit && (
                  <div className="portfolio-card__benefit">
                    <Check aria-hidden="true" />
                    {item.benefit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Resultados"
            title="Lo que hemos logrado."
            description="Casos y cifras que hacen parte de la experiencia de EMDECOB en empresas y copropiedades."
          />
          <div className="case-grid">
            {service.cases.map((item) => (
              <div className="case-card" key={item.title} data-reveal>
                <span className="case-card__tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {item.metric && (
                  <div className="case-card__metric">{item.metric}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section data-band">
        <div className="container data-band__grid">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">EMDATA</span>
            <h2>{service.dataTitle}</h2>
            <p>{service.dataText}</p>
            <div className="actions">
              <Link className="btn btn--light" href="/emdata/">
                Conoce EMDATA
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="data-band__list" data-reveal>
            {service.dataBullets.map((bullet, index) => (
              <div className="data-band__item" key={bullet}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container faq-layout">
          <div className="faq-intro" data-reveal>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="h2">Sobre este servicio.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Si su caso tiene particularidades, hablemos. La respuesta
              genérica no suele resolver operaciones complejas.
            </p>
            <Link className="link-arrow" href="/contacto/" style={{ marginTop: 24 }}>
              Hablemos
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div data-reveal>
            <FaqList items={service.faq} />
          </div>
        </div>
      </section>

      <CtaBand
        title={`¿Le damos forma a su ${service.shortName.toLowerCase()}?`}
        text="Cuéntenos qué está pasando y qué necesita lograr. Le ayudamos a construir una ruta concreta."
      />
      <JsonLd data={serviceJsonLd} />
    </>
  );
}
