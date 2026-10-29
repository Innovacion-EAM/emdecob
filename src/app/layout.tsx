import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd } from "@/components/JsonLd";
import { company } from "@/content/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emdecob.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EMDECOB · Contact Center BPS, cartera y jurídico",
    template: "%s · EMDECOB",
  },
  description:
    "Contact Center BPS, recuperación de cartera, propiedad horizontal y servicios jurídicos. Operamos desde Armenia, Quindío, con datos y respaldo legal.",
  applicationName: "EMDECOB",
  authors: [{ name: "EMDECOB S.A.S." }],
  creator: "EMDECOB S.A.S.",
  publisher: "EMDECOB S.A.S.",
  keywords: [
    "Contact Center Armenia",
    "recuperación de cartera",
    "propiedad horizontal",
    "servicios jurídicos",
    "EMDATA",
    "Juricob",
    "Quindío",
    "Colombia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "EMDECOB",
    title: "EMDECOB · Donde la estrategia se ejecuta",
    description:
      "Contact Center BPS, cartera, propiedad horizontal y jurídico con datos y respaldo legal.",
    images: [
      {
        url: "/images/og-emdecob.jpg",
        width: 1200,
        height: 630,
        alt: "EMDECOB · Donde la estrategia se ejecuta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EMDECOB · Donde la estrategia se ejecuta",
    description:
      "Contact Center BPS, cartera, propiedad horizontal y jurídico con datos y respaldo legal.",
    images: ["/images/og-emdecob.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#01633A",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: "EMDECOB",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.webp`,
  description:
    "Contact Center BPS, recuperación de cartera, propiedad horizontal y servicios jurídicos con analítica de datos.",
  telephone: "+57 324 618 0051",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cra 19 # 15 Norte - 40 Local 11",
    addressLocality: "Armenia",
    addressRegion: "Quindío",
    addressCountry: "CO",
  },
  areaServed: "Colombia",
  sameAs: company.social.map((item) => item.href),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+57 324 618 0051",
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: "Spanish",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <ScrollReveal />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
