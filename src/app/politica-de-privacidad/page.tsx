import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de EMDECOB S.A.S. Cómo recopilamos, usamos y protegemos la información personal.",
  alternates: { canonical: "/politica-de-privacidad/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow={privacy.eyebrow}
      title={privacy.title}
      updated={privacy.updated}
      intro={privacy.intro}
      sections={privacy.sections}
      contact={privacy.contact}
    />
  );
}
