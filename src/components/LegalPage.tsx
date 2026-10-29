import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LegalSection } from "@/content/legal";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  contact: string;
};

function anchorId(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  contact,
}: LegalPageProps) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <ChevronRight aria-hidden="true" />
            <span>{title}</span>
          </nav>
          <div className="page-hero__grid page-hero__grid--no-image">
            <div className="page-hero__copy">
              <span className="eyebrow">{eyebrow}</span>
              <h1 className="display">{title}</h1>
              <p className="lede page-hero__lede">{intro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-shell">
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Contenido de la política">
            <a href="#introduccion">Introducción</a>
            {sections.map((section) => (
              <a href={`#${anchorId(section.title)}`} key={section.title}>
                {section.title}
              </a>
            ))}
            <a href="#contacto">Contacto</a>
          </nav>

          <div className="legal-content">
            <p className="legal-meta">Última actualización: {updated}</p>

            <div id="introduccion">
              <h2>Introducción</h2>
              <p>{intro}</p>
            </div>

            {sections.map((section) => (
              <section id={anchorId(section.title)} key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section id="contacto">
              <h2>Contacto</h2>
              <p>{contact}</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
