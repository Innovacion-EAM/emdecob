import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company } from "@/content/site";

type CtaBandProps = {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  title = "Hablemos de su operación.",
  text = "Cuéntenos qué necesita resolver. Le ayudamos a encontrar la ruta más clara entre atención, cartera, jurídico y datos.",
  primaryLabel = "Hablemos",
  primaryHref = "/contacto/",
  secondaryLabel = "WhatsApp",
  secondaryHref = company.whatsapp,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <span className="eyebrow eyebrow--light">Siguiente paso</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--light" href={primaryHref}>
            {primaryLabel}
            <ArrowUpRight aria-hidden="true" />
          </Link>
          <a
            className="btn btn--ghost"
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
