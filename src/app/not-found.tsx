import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <p className="notfound__code">404</p>
        <h1>No encontramos esta página.</h1>
        <p>
          La página solicitada no existe o cambió de lugar. Puede volver al
          inicio o revisar nuestros servicios.
        </p>
        <div className="notfound__actions">
          <Link className="btn btn--primary" href="/">
            <ArrowLeft aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link className="btn btn--outline" href="/servicios/">
            Ver servicios
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
