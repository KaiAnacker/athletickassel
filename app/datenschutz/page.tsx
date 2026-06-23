import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutz · City Athletic Kassel",
  robots: { index: false },
};

export default function Datenschutz() {
  const c = CONFIG.contact;
  return (
    <section className="section section--paper">
      <div className="wrap legal">
        <p className="kicker"><span className="split">Rechtliches</span> Datenschutz</p>
        <h2 className="h2">Datenschutzerklärung</h2>

        <p className="legal__note">
          ⚠️ Vorlage / Platzhalter, noch nicht rechtsverbindlich. Vor dem Launch an die tatsächlich
          genutzten Dienste anpassen und juristisch prüfen lassen (z. B. mit einem DSGVO-Generator
          oder Datenschutzbeauftragten). Erst danach Cookie-/Consent-Banner aktivieren.
        </p>

        <h3>1. Verantwortlicher</h3>
        <p>
          Christian Tripp, City Athletic Kassel, Kurfürstenstraße 10, 34117 Kassel.<br />
          E-Mail: <a href={`mailto:${c.email}`}>{c.email}</a>
        </p>

        <h3>2. Hosting</h3>
        <p>
          Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch notwendige
          Server-Logdaten (z. B. IP-Adresse, Zeitpunkt, abgerufene Datei) verarbeitet
          (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter ist ein Auftragsverarbeitungsvertrag
          zu schließen.
        </p>

        <h3>3. Eingebundene Dienste</h3>
        <p>
          Je nach Nutzung kommen externe Dienste zum Einsatz, die eigene Daten verarbeiten können:
          Eversports (Kursbuchung), oneathlete (Trainings-Tracking), Cal.com (Terminbuchung),
          Stripe (Zahlung), Google Fonts &amp; Unsplash (Schriften/Bilder), Instagram, WhatsApp
          sowie ggf. Google Maps. Für jeden tatsächlich genutzten Dienst sind Zweck, Rechtsgrundlage
          und Datenübermittlung hier zu ergänzen.
        </p>

        <h3>4. Kontaktaufnahme</h3>
        <p>
          Bei Kontakt per E-Mail, Telefon, WhatsApp oder Formular werden deine Angaben zur
          Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b/f DSGVO) und nicht ohne
          Einwilligung weitergegeben.
        </p>

        <h3>5. Deine Rechte</h3>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit
          und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde.
        </p>

        <Link className="legal__back" href="/">← Zurück zur Startseite</Link>
      </div>
    </section>
  );
}
