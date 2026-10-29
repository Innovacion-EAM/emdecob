import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link
      className="service-card"
      href={`/servicios/${service.slug}/`}
      data-reveal
    >
      <div className="service-card__media">
        <Image
          src={service.image}
          alt={service.imageAlt}
          width={900}
          height={560}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
        <span className="service-card__number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="service-card__body">
        <span className="service-card__eyebrow">{service.eyebrow}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="service-card__footer">
          <div className="service-card__tags">
            {service.pillars.slice(0, 2).map((pillar) => (
              <span className="service-card__tag" key={pillar.title}>
                {pillar.title}
              </span>
            ))}
          </div>
          <span className="service-card__arrow" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
