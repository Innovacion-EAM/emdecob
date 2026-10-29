import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  light?: boolean;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  light = false,
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <span className={`eyebrow${light ? " eyebrow--light" : ""}`}>
          {eyebrow}
        </span>
        <h2 className={`section-head__title h2 ${titleClassName}`}>{title}</h2>
      </div>
      <div className="section-head__aside">
        {description && (
          <div className={`lede${light ? " lede--light" : ""}`}>{description}</div>
        )}
        {link && (
          <Link className="link-arrow section-head__link" href={link.href}>
            {link.label}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
