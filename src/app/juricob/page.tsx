import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BellRing,
  CalendarDays,
  FileText,
  FolderOpen,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { company, juricob } from "@/content/site";

export const metadata: Metadata = {
  title: "Juricob · Gestión jurídica",
  description:
    "Juricob es el sistema de gestión jurídica de EMDECOB. Ingrese, cree su cuenta o recupere su contraseña en el portal externo.",
  alternates: { canonical: "/juricob/" },
  openGraph: {
    title: "Juricob · Gestión jurídica de EMDECOB",
    description:
      "Expedientes, documentos, audiencias y notificaciones en un solo lugar.",
    url: "/juricob",
  },
};

const juricobJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Juricob",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Sistema de gestión jurídica de EMDECOB para expedientes, documentos, audiencias y notificaciones.",
  provider: { "@type": "Organization", name: company.legalName },
  url: company.juricob,
};

const features = [
  {
    icon: FolderOpen,
    title: "Expedientes",
    text: "Cada caso con su estado, actuaciones y responsables.",
  },
  {
    icon: FileText,
    title: "Documentos",
    text: "Archivos y soportes organizados por proceso.",
  },
  {
    icon: CalendarDays,
    title: "Audiencias",
    text: "Agenda y seguimiento de diligencias.",
  },
  {
    icon: BellRing,
    title: "Notificaciones",
    text: "Avisos y cambios relevantes del expediente.",
  },
];

export default function JuricobPage() {
  return (
    <>
      <section className="juricob-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Juricob" }]} />
          <div className="juricob-grid">
            <div>
              <span className="eyebrow eyebrow--light">Juricob · Portal externo</span>
              <h1 className="display">La gestión jurídica, en un solo lugar.</h1>
              <p>
                Juricob es el sistema de gestión jurídica de EMDECOB. Allí viven
                los expedientes, documentos, audiencias y notificaciones de cada
                proceso. La autenticación ocurre completamente en Juricob.
              </p>
              <div className="actions">
                <a
                  className="btn btn--light"
                  href={juricob.flows[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ingresar a Juricob
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a
                  className="btn btn--ghost"
                  href={juricob.flows[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crear cuenta
                </a>
              </div>
            </div>

            <div className="juricob-panel" aria-label="Vista ilustrativa de Juricob">
              <div className="juricob-panel__head">
                <strong>Juricob</strong>
                <span>Vista ilustrativa</span>
              </div>
              <div className="juricob-row">
                <span>
                  <FolderOpen aria-hidden="true" />
                  Expedientes activos
                </span>
                <strong>Gestión</strong>
              </div>
              <div className="juricob-row">
                <span>
                  <FileText aria-hidden="true" />
                  Documentos
                </span>
                <strong>Organizados</strong>
              </div>
              <div className="juricob-row">
                <span>
                  <CalendarDays aria-hidden="true" />
                  Audiencias
                </span>
                <strong>Agenda</strong>
              </div>
              <div className="juricob-row">
                <span>
                  <BellRing aria-hidden="true" />
                  Notificaciones
                </span>
                <strong>Alertas</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Qué encontrarás"
            title="El expediente, ordenado."
            description="Juricob centraliza la gestión jurídica para que cada caso tenga trazabilidad, responsables y fechas claras."
          />
          <div className="module-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div className="module-card" key={feature.title} data-reveal>
                  <div className="module-card__top">
                    <Icon aria-hidden="true" />
                    <span className="module-card__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionHeading
            eyebrow="Accesos"
            title="Elija su ruta."
            description="Los tres flujos se abren en el dominio de Juricob. EMDECOB no almacena contraseñas ni gestiona la autenticación desde esta web."
          />
          <div className="flow-grid">
            {juricob.flows.map((flow, index) => (
              <a
                className="flow-card"
                href={flow.href}
                target="_blank"
                rel="noopener noreferrer"
                key={flow.href}
                data-reveal
              >
                <span>{String(index + 1).padStart(2, "0")} · {flow.note}</span>
                <h3>{flow.label}</h3>
                <p>Abrir en juricob.emdecob.com</p>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="notice" style={{ marginTop: 24 }} data-reveal>
            <ShieldCheck aria-hidden="true" />
            <p>
              <strong>Seguridad:</strong> la autenticación es responsabilidad de
              Juricob. Si tiene problemas de acceso, use la recuperación de
              contraseña o contacte a su ejecutivo de EMDECOB.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="juricob-note" data-reveal>
            <span className="feature-card__icon">
              <LockKeyhole aria-hidden="true" />
            </span>
            <div>
              <h2 className="h3">No es el portal de EMDECOB.</h2>
              <p>
                Juricob es el sistema de gestión jurídica y autenticación. La web
                institucional solo enlaza a sus flujos; no replica login,
                registro ni recuperación de contraseñas.
              </p>
            </div>
            <Link className="btn btn--outline" href="/contacto/">
              Necesito ayuda
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Necesita acceso a Juricob?"
        text="Si es cliente de EMDECOB y aún no tiene sus credenciales, hable con nuestro equipo."
        primaryLabel="Contactar a EMDECOB"
        secondaryLabel="WhatsApp"
      />
      <JsonLd data={juricobJsonLd} />
    </>
  );
}
