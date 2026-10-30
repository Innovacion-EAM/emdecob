"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { company } from "@/content/site";
import { asset } from "@/lib/asset";

type Tab = "comercial" | "empleo";

function buildMailto(data: FormData): string {
  const fields: Array<[string, FormDataEntryValue | null]> = [
    ["Tipo", data.get("tipo")],
    ["Nombre", data.get("nombre")],
    ["Empresa", data.get("empresa")],
    ["Cargo", data.get("cargo")],
    ["Correo", data.get("correo")],
    ["Teléfono", data.get("telefono")],
    ["Servicio", data.get("servicio")],
    ["LinkedIn", data.get("linkedin")],
    ["Mensaje", data.get("mensaje")],
  ];

  const body = fields
    .filter(([, value]) => typeof value === "string" && value.trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const kind = data.get("tipo") === "empleo" ? "talento" : "comercial";
  const subject = `Solicitud desde el sitio web (${kind})`;

  return `mailto:${company.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

type ContactFormProps = {
  initialTab?: Tab;
};

export function ContactForm({ initialTab = "comercial" }: ContactFormProps) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [mailto, setMailto] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("tipo", tab);
    setStatus("sending");
    setError("");
    setMailto(null);

    try {
      const response = await fetch(asset("/api/contacto/"), {
        method: "POST",
        body: formData,
      });
      const contentType = response.headers.get("content-type") ?? "";
      // En hosting estático (GitHub Pages) el endpoint no existe y la respuesta
      // no es JSON. En ese caso ofrecemos enviar el mismo contenido por correo.
      if (!contentType.includes("application/json")) {
        throw new Error("static-hosting");
      }
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "No pudimos enviar la solicitud.");
      }
      setStatus("success");
      form.reset();
    } catch (submitError) {
      setStatus("error");
      if (submitError instanceof Error && submitError.message === "static-hosting") {
        setMailto(buildMailto(formData));
        setError(
          "Este sitio no tiene servidor de correo, así que el formulario no puede enviarse automáticamente. Puede mandarnos la misma información por correo o WhatsApp:",
        );
      } else {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "No pudimos enviar la solicitud.",
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div className="form-card">
        <div className="form-success" aria-live="polite">
          <div className="form-success__icon">
            <Check aria-hidden="true" />
          </div>
          <h3>Recibimos su solicitud.</h3>
          <p>
            Gracias por escribirnos. El equipo de EMDECOB revisará su mensaje y
            se pondrá en contacto por el canal que indicó.
          </p>
          <button
            className="btn btn--outline btn--sm"
            type="button"
            onClick={() => setStatus("idle")}
            style={{ marginTop: 24 }}
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="tabs" role="group" aria-label="Tipo de solicitud">
        <button
          className="tab"
          type="button"
          aria-pressed={tab === "comercial"}
          onClick={() => setTab("comercial")}
        >
          Comercial
        </button>
        <button
          className="tab"
          type="button"
          aria-pressed={tab === "empleo"}
          onClick={() => setTab("empleo")}
        >
          Talento
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="tipo" value={tab} />
        <div className="form-grid">
          <div className="field">
            <label htmlFor="nombre">Nombre completo *</label>
            <input id="nombre" name="nombre" type="text" required autoComplete="name" />
          </div>

          {tab === "comercial" ? (
            <div className="field">
              <label htmlFor="empresa">Empresa o copropiedad</label>
              <input id="empresa" name="empresa" type="text" autoComplete="organization" />
            </div>
          ) : (
            <div className="field">
              <label htmlFor="cargo">Cargo de interés</label>
              <input id="cargo" name="cargo" type="text" />
            </div>
          )}

          <div className="field">
            <label htmlFor="correo">Correo electrónico *</label>
            <input id="correo" name="correo" type="email" required autoComplete="email" />
          </div>

          <div className="field">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+57"
            />
          </div>

          {tab === "comercial" ? (
            <div className="field field--full">
              <label htmlFor="servicio">Servicio de interés</label>
              <select id="servicio" name="servicio" defaultValue="">
                <option value="">Selecciona una opción</option>
                <option value="contact-center">Contact Center</option>
                <option value="recuperacion-de-cartera">Recuperación de cartera</option>
                <option value="propiedad-horizontal">Propiedad horizontal</option>
                <option value="juridicos">Servicios jurídicos</option>
                <option value="emdata">EMDATA</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor="linkedin">LinkedIn o portafolio</label>
                <input id="linkedin" name="linkedin" type="url" placeholder="https://" />
              </div>
              <div className="field">
                <label htmlFor="hojaDeVida">Hoja de vida (PDF)</label>
                <input
                  id="hojaDeVida"
                  name="hojaDeVida"
                  type="file"
                  accept=".pdf,.doc,.docx"
                />
                <span className="field-hint">PDF, DOC o DOCX · máximo 5 MB</span>
              </div>
            </>
          )}

          <div className="field field--full">
            <label htmlFor="mensaje">
              {tab === "comercial" ? "Cuéntenos qué necesita *" : "Cuéntenos sobre usted *"}
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              placeholder={
                tab === "comercial"
                  ? "Describa brevemente su operación o el reto que quiere resolver."
                  : "Cuéntenos su experiencia y el rol que le interesa."
              }
            />
          </div>

          <label className="form-check" htmlFor="consentimiento">
            <input id="consentimiento" type="checkbox" name="consentimiento" required />
            <span>
              Autorizo el tratamiento de mis datos personales conforme a la{" "}
              <Link
                href="/politica-de-privacidad/"
                onClick={(event) => event.stopPropagation()}
              >
                política de privacidad
              </Link>{" "}
              de EMDECOB. *
            </span>
          </label>

          <div className="form-submit">
            <p className="form-note">
              <ShieldCheck
                aria-hidden="true"
                size={13}
                style={{ display: "inline", marginRight: 5, verticalAlign: -2, color: "var(--green)" }}
              />
              Sus datos se usan únicamente para responder su solicitud.
            </p>
            <button
              className="btn btn--primary"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 aria-hidden="true" className="animate-spin" />
                  Enviando
                </>
              ) : (
                <>
                  Enviar solicitud
                  <ArrowUpRight aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        {status === "error" && (
          <>
            <p className="form-status" role="alert" style={{ color: "#a12d2d" }}>
              {error}
            </p>
            {mailto && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                <a className="btn btn--primary btn--sm" href={mailto}>
                  Enviar por correo
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a
                  className="btn btn--outline btn--sm"
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            )}
            {mailto && tab === "empleo" && (
              <p className="field-hint" style={{ marginTop: 8 }}>
                Si adjuntó hoja de vida, recuerde añadirla manualmente al correo.
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}
