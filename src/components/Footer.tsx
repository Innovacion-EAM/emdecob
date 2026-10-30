import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { company } from "@/content/site";
import { Logo } from "./Logo";

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
} as const;

const footerNav = [
  {
    title: "Servicios",
    links: [
      { label: "Contact Center", href: "/servicios/contact-center/" },
      { label: "Recuperación de cartera", href: "/servicios/recuperacion-de-cartera/" },
      { label: "Propiedad horizontal", href: "/servicios/propiedad-horizontal/" },
      { label: "Servicios jurídicos", href: "/servicios/juridicos/" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", href: "/nosotros/" },
      { label: "EMDATA", href: "/emdata/" },
      { label: "Blog", href: "/blog/" },
      { label: "Preguntas frecuentes", href: "/blog/preguntas-frecuentes/" },
      { label: "Contacto", href: "/contacto/" },
      { label: "Juricob ↗", href: company.juricob },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>
              Contact Center BPS, cartera, propiedad horizontal y servicios
              jurídicos. Operamos desde Armenia, Quindío, con datos y respaldo
              legal.
            </p>

            <div className="footer-contact">
              <span>
                <MapPin aria-hidden="true" />
                {company.address}
              </span>
              <a href={company.phoneHref}>
                <Phone aria-hidden="true" />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`}>
                <Mail aria-hidden="true" />
                {company.email}
              </a>
              <span>
                <Clock aria-hidden="true" />
                {company.hours}
              </span>
            </div>

            <div className="footer-social" aria-label="Redes sociales">
              {company.social.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-social__link"
                  >
                    {Icon && <Icon aria-hidden="true" size={18} />}
                  </a>
                );
              })}
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="footer-social__link"
              >
                <MessageCircle aria-hidden="true" size={18} />
              </a>
            </div>
          </div>

          {footerNav.map((column) => (
            <div className="footer-col" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Armenia, Quindío.
          </p>
          <div className="footer-bottom__links">
            <Link href="/politica-de-privacidad/">Privacidad</Link>
            <Link href="/politica-de-cookies/">Cookies</Link>
            <a
              href="https://cstbusiness.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aliado CST Business
              <ArrowUpRight aria-hidden="true" size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
