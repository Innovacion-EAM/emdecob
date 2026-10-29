import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company, faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre servicios, cobertura, cartera, propiedad horizontal, EMDATA y Juricob.",
  alternates: { canonical: "/blog/preguntas-frecuentes/" },
};

const groups = [
  {
    title: "Servicios y cobertura",
    items: [
      faqs[0],
      faqs[2],
      {
        q: "¿Pueden combinar varios servicios?",
        a: "Sí. De hecho, ahí está la diferencia de EMDECOB: integrar Contact Center, cartera, propiedad horizontal, jurídico y EMDATA según lo que necesite la operación.",
      },
      {
        q: "¿Cómo empieza un proyecto?",
        a: "Con una conversación de diagnóstico. Revisamos el contexto, los frentes críticos y las fuentes de información. Después proponemos una ruta de trabajo.",
      },
    ],
  },
  {
    title: "Cartera y cobranza",
    items: [
      {
        q: "¿Trabajan cartera castigada?",
        a: "Sí. Analizamos la cartera, segmentamos por perfil y definimos una estrategia de recuperación según el estado de cada obligación.",
      },
      {
        q: "¿Cuándo se pasa a la etapa jurídica?",
        a: "Cuando la gestión administrativa no logra un acuerdo sostenible. La decisión se toma con criterio legal y financiero, no por defecto.",
      },
      {
        q: "¿Cómo garantizan un trato respetuoso?",
        a: "Aplicamos protocolos éticos, comunicación clara y respaldo jurídico. La recuperación no debe poner en riesgo la relación con el cliente ni la reputación de la empresa.",
      },
      faqs[1],
    ],
  },
  {
    title: "EMDATA y Juricob",
    items: [
      {
        q: "¿EMDATA reemplaza mis sistemas actuales?",
        a: "No. EMDATA integra información de cartera, Contact Center, procesos jurídicos y finanzas en una sola vista. Se conecta con contabilidad, CRM, ERP, Excel y otras fuentes.",
      },
      {
        q: "¿Qué necesita para implementar EMDATA?",
        a: "Identificar las fuentes de información, validar la calidad de los datos y definir los indicadores que necesita cada rol. El proceso se hace por etapas.",
      },
      {
        q: "¿Juricob es el portal de EMDECOB?",
        a: "Juricob es el sistema externo de gestión jurídica y autenticación. La web de EMDECOB solo enlaza a sus flujos de acceso; no replica login, registro ni contraseñas.",
      },
      {
        q: "¿Dónde ingreso a Juricob?",
        a: "En juricob.emdecob.com. Allí están los flujos de ingreso, registro y recuperación de contraseña. La autenticación ocurre completamente en Juricob.",
      },
    ],
  },
  {
    title: "Contacto",
    items: [
      {
        q: "¿Cómo puedo solicitar una asesoría?",
        a: "Puede escribirnos por el formulario de contacto, llamarnos al 324 618 0051 o escribir por WhatsApp. Respondemos en horario laboral: lunes a viernes, 8:00 AM a 5:30 PM.",
      },
      {
        q: "¿Atienden fuera de Armenia?",
        a: "Sí. Nuestra operación nace en Armenia, Quindío, y atiende clientes de diferentes regiones de Colombia. La gestión puede ser presencial o remota según el servicio.",
      },
      {
        q: "¿Puedo enviar mi hoja de vida?",
        a: "Sí. En la página de contacto, pestaña Talento, puede compartir tu información y adjuntar tu hoja de vida.",
      },
    ],
  },
];

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Respuestas claras antes de empezar."
        description="Reunimos las preguntas que más recibimos sobre servicios, cartera, propiedad horizontal, EMDATA y Juricob. Si su caso es distinto, hablemos."
        crumbs={[
          { label: "Blog", href: "/blog/" },
          { label: "Preguntas frecuentes" },
        ]}
        chips={["Servicios", "Cartera", "EMDATA", "Juricob"]}
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

      <section className="section section--white">
        <div className="container">
          <div className="faq-groups">
            {groups.map((group, index) => (
              <div className="faq-group" key={group.title} data-reveal>
                <div className="faq-group__intro">
                  <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="h3">{group.title}</h2>
                </div>
                <FaqList items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="notice" data-reveal>
            <MessageCircle aria-hidden="true" />
            <p>
              ¿No encontró su respuesta? Escríbanos a{" "}
              <a className="text-link" href={`mailto:${company.email}`}>
                {company.email}
              </a>{" "}
              o por WhatsApp al {company.phone}. También puede usar el
              formulario de contacto.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Hablemos de su caso."
        text="Cuéntenos qué necesita resolver y le respondemos con claridad."
      />
      <JsonLd data={faqPageJsonLd} />
    </>
  );
}
