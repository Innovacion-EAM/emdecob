import Link from "next/link";
import { services } from "@/content/services";

export function ServiceTabs({ current }: { current: string }) {
  return (
    <div className="service-tabs">
      <div className="container service-tabs__inner" aria-label="Servicios">
        <Link className="service-tab" href="/servicios/">
          Todos
        </Link>
        {services.map((service) => (
          <Link
            className="service-tab"
            href={`/servicios/${service.slug}/`}
            key={service.slug}
            aria-current={current === service.slug ? "page" : undefined}
          >
            {service.shortName}
          </Link>
        ))}
      </div>
    </div>
  );
}
