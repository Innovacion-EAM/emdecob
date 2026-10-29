"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="notfound">
      <div className="container">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Error inesperado
        </p>
        <h1>Algo no salió como esperábamos.</h1>
        <p>
          Puede intentar de nuevo. Si el problema continúa, escríbanos por
          WhatsApp o al 324 618 0051.
        </p>
        <div className="notfound__actions">
          <button className="btn btn--primary" type="button" onClick={reset}>
            Intentar de nuevo
          </button>
          <a className="btn btn--outline" href="/contacto/">
            Ir a contacto
          </a>
        </div>
      </div>
    </section>
  );
}
