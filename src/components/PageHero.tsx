import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      <Link href="/">Inicio</Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`} style={{ display: "contents" }}>
          <ChevronRight aria-hidden="true" />
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  actions?: ReactNode;
  chips?: ReactNode;
  theme?: "paper" | "dark" | "green";
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  crumbs,
  actions,
  chips,
  theme = "paper",
}: PageHeroProps) {
  return (
    <section className={`page-hero${theme === "dark" ? " page-hero--dark" : ""}${theme === "green" ? " page-hero--green" : ""}`}>
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className={`page-hero__grid${image ? "" : " page-hero__grid--no-image"}`}>
          <div className="page-hero__copy">
            <span className={`eyebrow${theme !== "paper" ? " eyebrow--light" : ""}`}>
              {eyebrow}
            </span>
            <h1 className="display">{title}</h1>
            {description && <p className="lede page-hero__lede">{description}</p>}
            {chips && <div className="chip-row">{chips}</div>}
            {actions && <div className="actions">{actions}</div>}
          </div>
          {image && (
            <div className="page-hero__media">
              <Image
                src={image}
                alt={imageAlt}
                width={900}
                height={760}
                priority
                sizes="(max-width: 980px) 100vw, 46vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
