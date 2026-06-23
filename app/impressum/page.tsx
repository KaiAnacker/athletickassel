import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum · City Athletic Kassel",
  robots: { index: false },
};

export default function Impressum() {
  const c = CONFIG.contact;
  return (
    <section className="section section--paper">
      <div className="wrap legal">
        <p className="kicker"><span className="split">Rechtliches</span> Impressum</p>
        <h2 className="h2">Impressum</h2>

        <p className="legal__note">
          ⚠️ Entwurf / Platzhalter. Vor dem Launch von Christian Tripp prüfen und vervollständigen
          (USt-IdNr., ggf. Berufshaftpflicht/Aufsichtsbehörde); am besten juristisch absichern lassen.
        </p>

        <h3>Angaben gemäß § 5 TMG</h3>
        <p>
          Christian Tripp<br />
          City Athletic Kassel<br />
          Kurfürstenstraße 10<br />
          34117 Kassel
        </p>

        <h3>Kontakt</h3>
        <p>
          Telefon: <a href={`tel:${c.phone}`}>{c.phone}</a><br />
          E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>
        </p>

        <h3>Umsatzsteuer-ID</h3>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: [bitte ergänzen]</p>

        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
        <p>Christian Tripp, Anschrift wie oben.</p>

        <Link className="legal__back" href="/">← Zurück zur Startseite</Link>
      </div>
    </section>
  );
}
