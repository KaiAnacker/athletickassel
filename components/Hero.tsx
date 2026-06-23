const TICKER = [
  "SkiErg", "Sled Push", "Sled Pull", "Burpee Broad Jumps",
  "Rudern", "Farmers Carry", "Sandbag Lunges", "Wall Balls",
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__startline" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="kicker kicker--orange" data-reveal>
            <span className="dot" aria-hidden="true" />Hyrox · TRX · Fitness · Kassel
          </p>
          <h1 className="hero__title" id="hero-title" data-reveal data-reveal-delay="1">
            <span className="line">8&nbsp;km.</span>
            <span className="line">8&nbsp;Stationen.</span>
            <span className="line line--accent">Deine Zeit.</span>
          </h1>
          <p className="hero__lead" data-reveal data-reveal-delay="2">
            Hyrox-Vorbereitung, TRX und funktionelles Fitnesstraining, dazu Personal&nbsp;Training
            mitten in Kassel. Bei Christian&nbsp;Tripp im City&nbsp;Athletic: kurz, intensiv, messbar.
          </p>
          <div className="hero__actions" data-reveal data-reveal-delay="3">
            <a className="btn btn--orange btn--lg" href="#kurse">Kurse ansehen <span aria-hidden="true">→</span></a>
            <a className="btn btn--ghost btn--lg" href="#pt">Personal Training</a>
          </div>
          <p className="hero__rating" data-reveal data-reveal-delay="4">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span><strong>4,9 / 5</strong> · 51 Bewertungen auf Eversports</span>
          </p>
        </div>

        <div className="hero__media" data-reveal data-reveal-delay="3">
          <p className="hero__media-tag" aria-hidden="true"><span className="dot" />Studio · Kurfürstenstraße 10</p>
          <figure className="frame frame--reveal">
            <img
              src="https://images.unsplash.com/photo-1739283180407-21e27d5c0735?auto=format&fit=crop&w=1100&q=80"
              alt="Athlet:innen auf der ausgeleuchteten Hyrox-Wettkampfbahn, Bewegung im Halbdunkel"
              width={1100}
              height={1280}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
          <div className="clock-card" aria-hidden="true">
            <span className="clock-card__label">Einheit</span>
            <span className="clock-card__time">45<small>MIN</small></span>
            <span className="clock-card__note">kleine Gruppen · volle Betreuung</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="stats" data-reveal>
          <div className="stats__item">
            <dt className="stats__num" data-count="400" data-suffix="+">0</dt>
            <dd className="stats__label">Betreute Athlet:innen</dd>
          </div>
          <div className="stats__item">
            <dt className="stats__num"><span data-count="4.9" data-decimals="1">0</span><span className="stats__star">★</span></dt>
            <dd className="stats__label">51 Bewertungen</dd>
          </div>
          <div className="stats__item">
            <dt className="stats__num"><span data-count="12">0</span>+</dt>
            <dd className="stats__label">Jahre Erfahrung</dd>
          </div>
          <div className="stats__item">
            <dt className="stats__num"><span data-count="15">0</span>+</dt>
            <dd className="stats__label">Trainingsformen</dd>
          </div>
        </dl>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track" data-ticker>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              <span>{t}</span>
              <span className="ticker__sep">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
