"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/content/site";

const mapEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4717.774109132816!2d-75.664231!3d4.5537702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f4fb7fb4e289%3A0xb8266769b9fd95da!2sEmdecob!5e1!3m2!1ses-419!2sco!4v1764276622673!5m2!1ses-419!2sco";

function ContactContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "empleo" || searchParams.get("tab") === "talento" ? "empleo" : "comercial";

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conecte con nuestro equipo."
        description="En EMDECOB valoramos la comunicación directa y transparente. Nuestro equipo está disponible para asesorarlo en temas jurídicos, financieros, tecnológicos o de cobranza."
        crumbs={[{ label: "Contacto" }]}
        chips={["Comercial", "Talento", "Armenia, Quindío"]}
      />

      <section className="section section--white">
        <div className="container contact-grid">
          <div className="contact-intro" data-reveal>
            <span className="eyebrow">Hablemos</span>
            <h2 className="h2">Cuéntenos qué necesita.</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              Complete el formulario y un ejecutivo se pondrá en contacto para
              ofrecerle una asesoría inicial. Si prefiere, escríbanos
              directamente por WhatsApp.
            </p>

            <div className="contact-info">
              <div className="contact-info__item">
                <MapPin aria-hidden="true" />
                <div>
                  <span>Oficina</span>
                  <strong>{company.address}</strong>
                </div>
              </div>
              <div className="contact-info__item">
                <Phone aria-hidden="true" />
                <div>
                  <span>Teléfono</span>
                  <a href={company.phoneHref}>{company.phone}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <Mail aria-hidden="true" />
                <div>
                  <span>Correo</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </div>
              <div className="contact-info__item">
                <Clock aria-hidden="true" />
                <div>
                  <span>Horario</span>
                  <strong>{company.hours}</strong>
                </div>
              </div>
            </div>

            <div className="contact-social">
              {company.social.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>

            <div className="map-card">
              <iframe
                src={mapEmbed}
                title="Ubicación de EMDECOB en Armenia, Quindío"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="map-card__label"
                href={company.map}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin aria-hidden="true" />
                Abrir en Maps
              </a>
            </div>
          </div>

          <div data-reveal>
            <ContactForm initialTab={initialTab} />
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="contact-talent" data-reveal>
            <div>
              <span className="eyebrow">Talento</span>
              <h2 className="h3">¿Busca hacer parte del equipo?</h2>
              <p>
                En la pestaña Talento puede compartir su experiencia y adjuntar
                su hoja de vida. También puede escribirnos por WhatsApp.
              </p>
            </div>
            <div className="contact-talent__actions">
              <Link className="btn btn--primary" href="/contacto/?tab=empleo">
                Enviar hoja de vida
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="section section--white"><div className="container"><div className="contact-intro" data-reveal><span className="eyebrow">Contacto</span><h2 className="h2">Cuéntenos qué necesita.</h2><p className="lede" style={{marginTop:18}}>Cargando...</p></div></div></div>}>
      <ContactContent />
    </Suspense>
  );
}
