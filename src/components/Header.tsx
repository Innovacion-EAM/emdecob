"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { company, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);

    if (mobileOpen) {
      closeRef.current?.focus();
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !mobileOpen || !menuRef.current) {
        return;
      }

      const focusables = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__group">
            <span className="topbar__item">
              <MapPin aria-hidden="true" />
              {company.city}
            </span>
            <span className="topbar__item topbar__group--right">
              <Clock aria-hidden="true" />
              {company.hours}
            </span>
          </div>
          <div className="topbar__group topbar__group--right">
            <a className="topbar__item" href={company.phoneHref}>
              <Phone aria-hidden="true" />
              {company.phone}
            </a>
            <a
              className="topbar__item"
              href={company.juricob}
              target="_blank"
              rel="noopener noreferrer"
            >
              Juricob
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header__inner">
          <Logo />

          <nav className="nav-desktop" aria-label="Navegación principal">
            {nav.map((item) =>
              item.children ? (
                <div
                  className="nav-item"
                  key={item.href}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    className={`nav-link${isActive(item.href) ? " is-active" : ""}`}
                    href={item.href}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onFocus={() => setServicesOpen(true)}
                    onClick={closeMenus}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" />
                  </Link>
                  <div
                    className="nav-panel"
                    id="services-menu"
                    data-open={servicesOpen}
                  >
                    {item.children.map((child) => (
                      <Link
                        className="nav-panel__item"
                        href={child.href}
                        key={child.href}
                        onClick={closeMenus}
                      >
                        <strong>{child.label}</strong>
                        <span>{child.note}</span>
                      </Link>
                    ))}
                    <Link className="nav-panel__all" href="/servicios/" onClick={closeMenus}>
                      Ver todos los servicios
                      <ArrowUpRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  className={`nav-link${isActive(item.href) ? " is-active" : ""}`}
                  href={item.href}
                  key={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn--outline btn--sm"
              href={company.juricob}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
            >
              Ingresar a Juricob
              <ArrowUpRight aria-hidden="true" />
            </a>
            <Link className="btn btn--primary btn--sm" href="/contacto/" onClick={closeMenus}>
              Hablemos
            </Link>
          </div>

          <button
            className="mobile-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            ref={toggleRef}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú principal" ref={menuRef}>
          <div className="mobile-menu__top">
            <Logo onClick={closeMenus} />
            <button
              className="mobile-menu__close"
              type="button"
              aria-label="Cerrar menú"
              onClick={() => {
                setMobileOpen(false);
                toggleRef.current?.focus();
              }}
              ref={closeRef}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Navegación móvil">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <Link className="mobile-nav__link" href={item.href} onClick={closeMenus}>
                    {item.label}
                    <ChevronRight aria-hidden="true" />
                  </Link>
                  <div className="mobile-nav__children">
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href} onClick={closeMenus}>
                        {child.label}
                        <ChevronRight aria-hidden="true" size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  className="mobile-nav__link"
                  href={item.href}
                  key={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                  <ChevronRight aria-hidden="true" />
                </Link>
              ),
            )}
          </nav>

          <div className="mobile-menu__actions">
            <Link className="btn btn--primary" href="/contacto/" onClick={closeMenus}>
              Hablemos
            </Link>
            <a
              className="btn btn--outline"
              href={company.juricob}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
            >
              Ingresar a Juricob
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className="mobile-menu__meta">
            <p>{company.address}</p>
            <p>
              <a href={company.phoneHref}>{company.phone}</a>
              {" · "}
              {company.hours}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
