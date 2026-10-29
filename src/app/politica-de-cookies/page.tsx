import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookies } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de EMDECOB S.A.S. Tipos de cookies, administración y consentimiento.",
  alternates: { canonical: "/politica-de-cookies/" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow={cookies.eyebrow}
      title={cookies.title}
      updated={cookies.updated}
      intro={cookies.intro}
      sections={cookies.sections}
      contact={cookies.contact}
    />
  );
}
