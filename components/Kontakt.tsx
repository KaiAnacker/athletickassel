import { CONFIG } from "@/lib/config";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Kurf%C3%BCrstenstra%C3%9Fe+10+34117+Kassel";

export default function Kontakt() {
  const c = CONFIG.contact;
  return (
    <section className="section section--paper" id="kontakt" aria-labelledby="kontakt-h">
      <div className="wrap kontakt__grid">
        <div>
          <p className="kicker" data-reveal><span className="split">Split 07</span> Kontakt &amp; Anfahrt</p>
          <h2 className="h2" id="kontakt-h" data-reveal>Komm vorbei.<br />Erste Stunde gratis.</h2>
          <p className="section__intro section__intro--tight" data-reveal>
            Kostenlos schnuppern, danach entscheiden. Mitten in Kassel, nur wenige Minuten
            vom Hauptbahnhof.
          </p>

          <dl className="info" data-reveal data-reveal-children>
            <div className="info__cell">
              <dt>Adresse</dt>
              <dd>Kurfürstenstraße 10<br />34117 Kassel</dd>
            </div>
            <div className="info__cell">
              <dt>Telefon</dt>
              <dd><a href={`tel:${c.phone}`}>{c.phone}</a></dd>
            </div>
            <div className="info__cell">
              <dt>E-Mail</dt>
              <dd><a href={`mailto:${c.email}`}>{c.email}</a></dd>
            </div>
            <div className="info__cell">
              <dt>Zeiten</dt>
              <dd>Früh · Mittag · Abend<br />&amp; Wochenende</dd>
            </div>
          </dl>

          <div className="kontakt__actions" data-reveal>
            <a className="btn btn--orange btn--lg" href={CONFIG.eversports.shopUrl} target="_blank" rel="noopener">Probetraining buchen <span aria-hidden="true">→</span></a>
            <a className="btn btn--ghost-ink btn--lg" href={c.instagram} target="_blank" rel="noopener">Instagram</a>
          </div>
        </div>

        <figure className="frame frame--reveal kontakt__map" data-reveal>
          <img
            src="https://images.unsplash.com/photo-1671970922029-0430d2ae122c?auto=format&fit=crop&w=1100&q=80"
            alt="Trainingsfläche im City Athletic, abgedunkelt mit Funktionsequipment"
            width={1100}
            height={900}
            loading="lazy"
            decoding="async"
          />
          <a className="map-tag" href={MAPS_URL} target="_blank" rel="noopener">
            <span className="dot" aria-hidden="true" />Kurfürstenstraße 10 · 34117 Kassel<span className="map-tag__go" aria-hidden="true">Route →</span>
          </a>
        </figure>
      </div>
    </section>
  );
}
