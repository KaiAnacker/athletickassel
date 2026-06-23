import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import PreviewNotice from "@/components/PreviewNotice";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "City Athletic Kassel · Hyrox, TRX & Functional Fitness | Christian Tripp",
  description:
    "Hyrox-Vorbereitung, TRX und funktionelles Fitnesstraining, dazu Personal Training mitten in Kassel. Bei Christian Tripp im City Athletic: kurz, intensiv, messbar. 4,9/5 auf Eversports.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    title: "City Athletic Kassel · Hyrox, TRX & Fitness",
    description:
      "Hyrox-Vorbereitung, TRX, funktionelles Gruppentraining und 1:1 Personal Training in Kassel. Kurz, intensiv, messbar.",
    images: [SITE.ogImage],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#16130e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: SITE.name,
  description:
    "Hyrox-Coaching, TRX, funktionelles Gruppentraining und 1:1 Personal Training in Kassel mit Christian Tripp.",
  image: SITE.ogImage,
  url: SITE.url + "/",
  telephone: "+49 176 62906589",
  email: "christian@personal-trainer.pt",
  founder: SITE.founder,
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    postalCode: SITE.address.postalCode,
    addressLocality: SITE.address.city,
    addressCountry: SITE.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.latitude, longitude: SITE.geo.longitude },
  sameAs: ["https://www.instagram.com/cityathletickassel/"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating.value,
    reviewCount: SITE.rating.count,
    bestRating: "5",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="js" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Archivo+Expanded:wght@700;800;900&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <noscript>
          {/* Ohne JS: Reveal-Animationen aus, damit alle Inhalte sichtbar bleiben */}
          <style>{`.js [data-reveal],.js [data-reveal-children]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#hyrox">Zum Inhalt springen</a>
        <PreviewNotice />
        <div className="progress" aria-hidden="true"><span className="progress__bar" data-progress /></div>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
