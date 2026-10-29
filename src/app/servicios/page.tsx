import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Headphones,
  Scale,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceTabs } from "@/components/ServiceTabs";
import { services } from "@/content/services";
import { process, stats } from "@/content/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Contact Center, recuperación de cartera, propiedad horizontal y servicios jurídicos. Cuatro capacidades integradas por EMDATA.",
  alternates: { canonical: "/servicios/" },
};

const capabilities = [
  {
    icon: Headphones,
    title: "Atención y relación",
    text: "Contact Center omnicanal para atender, cobrar, fidelizar y leer la voz del cliente.",
  },
  {
    icon: Wallet,
    title: "Recuperación y liquidez",
    text: "Cartera preventiva, administrativa y jurídica con acuerdos que sostienen la relación.",
  },
  {
    icon: Scale,
    title: "Respaldo jurídico",
    text: "Prevención, representación y defensa para empresas y copropiedades.",
  },
  {
    icon: BarChart3,
    title: "Datos y control",
    text: "EMDATA conecta la operación con tableros claros para decidir con evidencia.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title={
          <>
            Cuatro servicios.{" "}
            <br />
            Una sola operación.
          </>
        }
        description="No vendemos piezas sueltas. Diseñamos una operación que integra atención, cartera, jurídico y datos para que cada área entienda a la otra."
        crumbs={[{ label: "Servicios" }]}
        chips={[
          "Contact Center",
          "Recuperación de cartera",
          "Propiedad horizontal",
          "Servicios jurídicos",
        ]}
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
      <ServiceTabs current="" />

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Portafolio"
            title="El servicio empieza por entender el contexto."
            description="Cada línea resuelve un frente distinto, pero comparte el mismo principio: operar con rigor, comunicar con claridad y medir el resultado."
          />
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Integración"
            title="Un sistema, no cuatro silos."
            description="La ventaja de EMDECOB está en conectar lo que normalmente se contrata por separado. La misma conversación puede terminar en un acuerdo de pago, un expediente jurídico y un indicador en EMDATA."
          />

          <div className="integration">
            <div className="integration__core" data-reveal>
              <div>
                <span className="eyebrow eyebrow--light">EMDECOB</span>
                <h3 className="h3">Una operación conectada.</h3>
                <p>
                  Un solo equipo lee la atención, la cartera, el riesgo jurídico
                  y los datos. La decisión deja de viajar por áreas separadas.
                </p>
              </div>
              <div className="integration__core-tags">
                <span>Gestión</span>
                <span>Datos</span>
                <span>Respaldo legal</span>
              </div>
            </div>

            <div className="integration__list">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <div className="integration__item" key={capability.title} data-reveal>
                    <span className="integration__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{capability.title}</h3>
                      <p>{capability.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="integration__callout" data-reveal>
            <Check aria-hidden="true" />
            <p>
              EMDATA es la capa transversal: conecta los cuatro servicios y
              convierte la operación en información útil para dirección,
              comités y clientes.
            </p>
            <Link className="link-arrow" href="/emdata/">
              Ver EMDATA
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Por qué EMDECOB">
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
            eyebrow="Método"
            title="De la lectura a la operación."
            description="Un proceso claro para no improvisar sobre la marcha."
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

      <CtaBand
        title="¿Por dónde empezamos?"
        text="Cuéntenos qué frente quiere ordenar primero: atención, cartera, copropiedad o riesgo jurídico. Le proponemos una ruta."
      />
    </>
  );
}
