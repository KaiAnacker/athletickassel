import { CONFIG } from "@/lib/config";

const BELLS = [6, 8, 12, 16, 20, 24];

const CONCEPT = [
  { no: "01", title: "Mieten statt kaufen", text: "Hochwertige Competition-Kettlebells flexibel zu Hause, ohne sie gleich kaufen zu müssen." },
  { no: "02", title: "Tauschen jederzeit", text: "Wirst du stärker, tauschst du einfach in ein schwereres Gewicht. Dein Training wächst mit." },
  { no: "03", title: "Optional kaufen", text: "Gefällt dir deine Bell, machen wir dir ein individuelles Kaufangebot. Miete wird angerechnet." },
];

function wa(text: string) {
  return `https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function RentABell() {
  const rb = CONFIG.rentABell;
  const bookingUrl = rb.calcomUser
    ? `https://cal.com/${rb.calcomUser}/${rb.calcomEvent}`
    : wa("Hi Christian, ich möchte einen Termin für das rent-a-bell Kettlebelltraining (45 Min, online) buchen.");
  const tenCardUrl = rb.tenCardPaymentLink || wa("Hi Christian, ich möchte die rent-a-bell 10er-Karte (29,90 €).");
  const trialUrl = rb.calcomUser ? bookingUrl : wa("Hi Christian, ich möchte das kostenlose rent-a-bell Probetraining buchen.");

  return (
    <section className="section section--paper2" id="rentabell" aria-labelledby="rab-h">
      <div className="wrap">
        <div className="section__head section__head--between">
          <div>
            <p className="kicker" data-reveal><span className="split">Split 04</span> Rent a Bell</p>
            <h2 className="h2" id="rab-h" data-reveal>Kettlebells mieten.<br />Online mittrainieren.</h2>
            <p className="section__intro section__intro--tight" data-reveal>
              Competition-Kettlebells flexibel mieten: tauschen, wenn du stärker wirst, kaufen,
              wenn du willst. Dazu interaktives Live-Training per Zoom, von überall.
            </p>
          </div>
          <a className="btn btn--ink" href={bookingUrl} target="_blank" rel="noopener" data-reveal>
            Live-Training buchen <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="rab-concept" data-reveal data-reveal-children>
          {CONCEPT.map((c) => (
            <li className="rab-concept__item" key={c.title}>
              <span className="rab-concept__no">{c.no}</span>
              <h3 className="rab-concept__title">{c.title}</h3>
              <p className="rab-concept__text">{c.text}</p>
            </li>
          ))}
        </ul>

        <div className="rab-offers" data-reveal>
          <article className="rab-live">
            <p className="kicker kicker--orange">Online-Live-Training</p>
            <h3 className="rab-live__title">Kettlebelltraining · 45 Min</h3>
            <p className="rab-live__text">Interaktiv per Zoom: gemeinsam, angeleitet, von überall mittrainieren.</p>
            <p className="rab-live__price">4,99&nbsp;€<span>/ Einheit</span></p>
            <a className="btn btn--orange btn--block" href={bookingUrl} target="_blank" rel="noopener">
              Termin buchen <span aria-hidden="true">→</span>
            </a>
          </article>

          <div className="rab-plans">
            <article className="rab-plan">
              <h4 className="rab-plan__name">10er-Karte</h4>
              <p className="rab-plan__price">29,90&nbsp;€</p>
              <p className="rab-plan__note">10 Einheiten · gültig 3 Monate</p>
              <a className="btn btn--ink btn--block" href={tenCardUrl} target="_blank" rel="noopener">10er-Karte holen</a>
            </article>
            <article className="rab-plan rab-plan--free">
              <h4 className="rab-plan__name">Probetraining</h4>
              <p className="rab-plan__price">0&nbsp;€</p>
              <p className="rab-plan__note">Einmalig &amp; unverbindlich</p>
              <a className="btn btn--orange btn--block" href={trialUrl} target="_blank" rel="noopener">Gratis buchen</a>
            </article>
          </div>
        </div>

        <div className="rab-catalog" data-reveal>
          <p className="amenities__label">Verfügbar zur Miete</p>
          <ul className="rab-grid" data-reveal data-reveal-children>
            {BELLS.map((kg) => (
              <li className="rab-item" key={kg}>
                <span className="rab-item__spec">Kettlebell</span>
                <span className="rab-item__weight">{kg}<small>kg</small></span>
                <a className="rab-item__link" href={wa(`Hi Christian, ich möchte eine ${kg} kg Kettlebell mieten.`)} target="_blank" rel="noopener">
                  Miete anfragen <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
            <li className="rab-item rab-item--wide">
              <span className="rab-item__spec">Rudergerät</span>
              <span className="rab-item__weight rab-item__weight--text">Concept2<small>Rower Model D</small></span>
              <a className="rab-item__link" href={wa("Hi Christian, ich möchte den Concept2 Rower Model D mieten.")} target="_blank" rel="noopener">
                Miete anfragen <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
