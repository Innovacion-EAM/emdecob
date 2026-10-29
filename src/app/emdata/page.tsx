import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BellRing,
  Building2,
  Check,
  Database,
  FileText,
  Headphones,
  Landmark,
  Layers,
  LineChart,
  Scale,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { DashboardMock } from "@/components/DashboardMock";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "EMDATA · Inteligencia empresarial para decidir",
  description:
    "EMDATA integra cartera, Contact Center, gestión jurídica y finanzas en un solo tablero. Visualización clara, acceso seguro y reportes en tiempo real.",
  alternates: { canonical: "/emdata/" },
  openGraph: {
    title: "EMDATA · Inteligencia empresarial para decidir",
    description:
      "Un tablero que convierte información de cartera, Contact Center, jurídico y finanzas en decisiones.",
    url: "/emdata/",
    images: [{ url: "/images/portadas-blog-emdecob-web-2.webp" }],
  },
};

const modules = [
  {
    icon: Wallet,
    title: "Cartera y recaudo",
    text: "Estado de la cartera, acuerdos, recaudos y proyecciones en una sola lectura.",
  },
  {
    icon: Headphones,
    title: "Contact Center",
    text: "Interacciones, tiempos de respuesta, canales y satisfacción del cliente.",
  },
  {
    icon: Scale,
    title: "Gestión jurídica",
    text: "Expedientes, actuaciones, audiencias y fechas críticas conectadas con Juricob.",
  },
  {
    icon: LineChart,
    title: "Finanzas",
    text: "Indicadores de liquidez, recuperación y flujo de caja para dirección.",
  },
  {
    icon: BellRing,
    title: "Alertas y seguimiento",
    text: "Señales tempranas para actuar antes de que un caso o una cuenta se deteriore.",
  },
  {
    icon: FileText,
    title: "Reportes para comités",
    text: "Información lista para juntas, consejos de administración y comités de cartera.",
  },
];

const sources = [
  "Excel",
  "CRM",
  "ERP",
  "Contabilidad",
  "Bases de cartera",
  "Juricob",
  "Contact Center",
  "Formularios",
];

const implementation = [
  {
    number: "01",
    title: "Diagnóstico de fuentes",
    text: "Identificamos dónde vive la información y cuál es la calidad de los datos.",
  },
  {
    number: "02",
    title: "Conexión y validación",
    text: "Integramos las fuentes necesarias y acordamos las reglas de lectura.",
  },
  {
    number: "03",
    title: "Tableros a la medida",
    text: "Configuramos las vistas que necesita cada rol: dirección, operación y comité.",
  },
  {
    number: "04",
    title: "Acompañamiento y evolución",
    text: "Ajustamos indicadores y nuevas fuentes a medida que la operación cambia.",
  },
];

const audiences = [
  {
    icon: Building2,
    title: "Empresas",
    text: "Direcciones financieras y comerciales que necesitan ver cartera, operación y riesgo en una sola vista.",
  },
  {
    icon: Landmark,
    title: "Copropiedades",
    text: "Administradores y consejos que quieren explicar la gestión con datos claros y trazables.",
  },
  {
    icon: Layers,
    title: "Entidades financieras",
    text: "Equipos de cobranza y riesgo que necesitan priorizar la gestión y anticipar el deterioro.",
  },
];

const emdataJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EMDATA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Tablero de inteligencia empresarial que integra cartera, Contact Center, gestión jurídica y finanzas.",
  provider: { "@type": "Organization", name: company.legalName },
};

export default function EmdataPage() {
  return (
    <>
      <section className="page-hero page-hero--dark emdata-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "EMDATA" }]} />
          <div className="page-hero__grid">
            <div className="page-hero__copy">
              <span className="eyebrow eyebrow--light">EMDATA · Inteligencia empresarial</span>
              <h1 className="display">
                Sus datos ya están hablando. La diferencia está en escucharlos.
              </h1>
              <p className="lede page-hero__lede">
                EMDATA integra información de cartera, gestión jurídica,
                Contact Center y finanzas en un solo tablero. Una lectura clara
                para saber qué pasa y qué decidir.
              </p>
              <div className="chip-row">
                {["Tiempo real", "Acceso seguro 24/7", "Personalizable"].map((chip) => (
                  <span className="chip" key={chip}>
                    <Check aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>
              <div className="actions">
                <Link className="btn btn--bright" href="/contacto/">
                  Solicita una demo
                  <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link className="btn btn--ghost" href="/blog/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional/">
                  Leer el artículo
                </Link>
              </div>
            </div>
            <div data-reveal>
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="La diferencia"
            title="No es un software más."
            description="Un software tradicional suele entregar reportes. EMDATA entrega una lectura de la operación para que dirección y equipos tomen decisiones sobre la misma información."
          />
          <div className="compare">
            <div className="compare__col" data-reveal>
              <h3>Software tradicional</h3>
              <p>Información fragmentada y reportes que llegan tarde.</p>
              <ul className="compare__list">
                {[
                  "Datos en hojas y sistemas separados.",
                  "Reportes estáticos para cumplir.",
                  "Poca conexión entre cartera, atención y jurídico.",
                  "Cada área arma su propia versión de la verdad.",
                ].map((item) => (
                  <li key={item}>
                    <X aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare__col" data-reveal>
              <h3>EMDATA</h3>
              <p>Una lectura integrada, accionable y personalizable.</p>
              <ul className="compare__list">
                {[
                  "Cartera, Contact Center, jurídico y finanzas en un solo lugar.",
                  "Métricas pensadas para tomar decisiones.",
                  "Visualización clara y dinámica en tiempo real.",
                  "Acceso seguro 24/7 y reportes para cada rol.",
                ].map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Módulos"
            title="La operación completa, en una sola vista."
            description="EMDATA se adapta a la operación de cada cliente. Estos son los frentes que puede integrar."
          />
          <div className="module-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div className="module-card" key={module.title} data-reveal>
                  <div className="module-card__top">
                    <Icon aria-hidden="true" />
                    <span className="module-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.text}</p>
                </div>
              );
            })}
          </div>

          <div className="source-block" data-reveal>
            <div>
              <span className="eyebrow">Fuentes</span>
              <h3 className="h3">Conecta lo que ya usa.</h3>
              <p className="muted">
                EMDATA no reemplaza sus sistemas: integra la información para
                leerla mejor.
              </p>
            </div>
            <div className="source-row">
              {sources.map((source) => (
                <span key={source}>{source}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Implementación"
            title="De los datos a una decisión."
            description="Un proceso ordenado para que el tablero no sea un adorno, sino una herramienta de trabajo."
          />
          <div className="process-grid">
            {implementation.map((step) => (
              <div className="process-step" key={step.number} data-reveal>
                <span className="process-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section data-feature">
        <div className="container data-feature__grid">
          <div data-reveal>
            <span className="eyebrow eyebrow--light">Seguridad</span>
            <h2 className="h2">Información sensible, acceso controlado.</h2>
            <p className="lede lede--light">
              EMDATA se diseñó para operar con información de cartera, jurídica
              y financiera. El acceso se gestiona por roles y la visualización
              se ajusta a cada cliente.
            </p>
            <ul className="data-feature__list">
              {[
                "Acceso seguro 24/7.",
                "Roles y permisos por usuario.",
                "Información personalizable por operación.",
                "Reportes en tiempo real.",
              ].map((item) => (
                <li key={item}>
                  <ShieldCheck aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link className="btn btn--bright" href="/contacto/">
                Hablemos de EMDATA
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="emdata-audience" data-reveal>
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <div className="emdata-audience__item" key={audience.title}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{audience.title}</h3>
                    <p>{audience.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Para quién"
            title="Si la información no se puede leer, no se puede decidir."
            description="EMDATA sirve a equipos que necesitan una versión compartida de la operación."
            link={{ label: "Solicitar una demo", href: "/contacto/" }}
          />
          <div className="feature-grid">
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <Database aria-hidden="true" />
              </span>
              <h3>Dirección y finanzas</h3>
              <p>Cartera, liquidez, recuperación y riesgo en una lectura ejecutiva.</p>
            </div>
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <Headphones aria-hidden="true" />
              </span>
              <h3>Operación y Contact Center</h3>
              <p>Tiempos, canales, calidad y satisfacción para ajustar la gestión.</p>
            </div>
            <div className="feature-card" data-reveal>
              <span className="feature-card__icon">
                <BarChart3 aria-hidden="true" />
              </span>
              <h3>Comités y consejos</h3>
              <p>Reportes claros para decidir en equipo y dejar trazabilidad.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Vea su operación con otros ojos."
        text="Solicite una demo de EMDATA y le mostramos cómo se vería su información integrada."
        primaryLabel="Solicitar demo"
        secondaryLabel="WhatsApp"
      />
      <JsonLd data={emdataJsonLd} />
    </>
  );
}
