import { CONFIG } from "@/lib/config";

// Priority-ordered focus of the studio: 1. Hyrox, 2. TRX, 3. general fitness.
const DISCIPLINES = [
  { name: "Hyrox", desc: "Wettkampfvorbereitung: 8 Stationen plus Lauf, auf eine Gesamtzeit.", tags: ["Hyrox Prep", "Simulation", "Lauf"] },
  { name: "TRX & Functional", desc: "Schlingentraining, Rumpfkraft und Stabilität, sauberes Bewegungsmuster.", tags: ["TRX", "Functional", "Mobility"] },
  { name: "Fitness & Kraft", desc: "HIIT, Langhantel und Athletik für deine allgemeine Fitness in der Gruppe.", tags: ["HIIT", "Kraft", "Athletik"] },
];

/* Pillar 1 — group courses, booked via Eversports (it stays the booking system).
   The Stundenplan-Widget is embedded so booking happens on this domain (avoids
   the 25 % marketplace commission). Until a widget code is set in lib/config.ts
   an honest fallback links to Eversports — no invented class times. */
export default function Kurse() {
  const ev = CONFIG.eversports;
  return (
    <section className="section section--paper2" id="kurse" aria-labelledby="kurse-h">
      <div className="wrap">
        <div className="section__head section__head--between">
          <div>
            <p className="kicker" data-reveal><span className="split">Split 02</span> Kurse · Eversports</p>
            <h2 className="h2" id="kurse-h" data-reveal>Gruppenkurse in Kassel</h2>
            <p className="section__intro section__intro--tight" data-reveal>
              Kleingruppen mit hoher Betreuungsqualität, kein Herumtrainieren.
              Buchung, Schnupperstunde und Tarife laufen direkt über Eversports.
            </p>
          </div>
          <a className="btn btn--ink" href={ev.shopUrl} target="_blank" rel="noopener" data-reveal>
            Alle Kurse auf Eversports <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="amenities__label disc__label" data-reveal>Was wir trainieren</p>
        <div className="disc" data-reveal data-reveal-children>
          {DISCIPLINES.map((d, i) => (
            <div className="disc__row" key={d.name}>
              <span className="disc__rank">{String(i + 1).padStart(2, "0")}</span>
              <div className="disc__main">
                <h3 className="disc__name">{d.name}</h3>
                <p className="disc__desc">{d.desc}</p>
              </div>
              <ul className="disc__tags">
                {d.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="schedule" data-reveal>
          <div className="ev-mount">
            {ev.scheduleWidgetCode ? (
              <iframe
                className="ev-mount__frame"
                src={`https://www.eversports.com/widget/w/${ev.scheduleWidgetCode}`}
                title="City Athletic Kassel · Kursplan & Buchung (Eversports)"
                loading="lazy"
              />
            ) : (
              <div className="ev-fallback">
                <p className="ev-fallback__kick"><span className="dot" aria-hidden="true" />Live-Kursplan · Eversports</p>
                <p className="ev-fallback__lead">
                  Kursplan, freie Plätze und Buchung laufen über Eversports, auf Wunsch direkt
                  hier eingebettet, damit du die Seite nicht verlässt.
                </p>
                <p className="ev-fallback__meta">Früh · Mittag · Abend &amp; Wochenende · Einheiten je 45 Min</p>
                <a className="btn btn--orange" href={ev.shopUrl} target="_blank" rel="noopener">
                  Kursplan &amp; Buchung öffnen <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
