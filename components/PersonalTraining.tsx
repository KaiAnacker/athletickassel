import { CONFIG } from "@/lib/config";
import FocusWidget from "@/components/FocusWidget";

const STEPS = [
  { no: "01", title: "Standortbestimmung", text: "Baseline: Kraft, Ausdauer, Mobilität, Hyrox-Stationen." },
  { no: "02", title: "Plan & Training", text: "Wöchentliche 1:1-Einheiten, vor Ort in Kassel oder online, abgestimmt auf dein Ziel." },
  { no: "03", title: "Retest & Fortschritt", text: "Sichtbare Entwicklung über Zeit in deinem oneathlete-Profil." },
];

export default function PersonalTraining() {
  return (
    <section className="section section--ink" id="pt" aria-labelledby="pt-h">
      <div className="wrap pt__grid">
        <div className="pt__copy">
          <p className="kicker kicker--orange" data-reveal><span className="split">Split 03</span> Vor Ort &amp; online</p>
          <h2 className="h2 h2--light" id="pt-h" data-reveal>1:1 Personal Training<br />in Kassel.</h2>
          <p className="pt__lead" data-reveal>
            Individuelles Coaching mit klarem Plan, vor Ort im Studio oder online. Baseline-Test,
            Zielwerte, regelmäßige Retests. Deine Entwicklung wird über oneathlete dokumentiert.
            Kein Bauchgefühl, sondern Zahlen.
          </p>
          <ol className="steps" data-reveal data-reveal-children>
            {STEPS.map((s) => (
              <li className="step" key={s.no}>
                <span className="step__no">{s.no}</span>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
              </li>
            ))}
          </ol>

          <div className="oa-promo" data-reveal>
            <div className="oa-promo__copy">
              <p className="kicker kicker--orange">Powered by oneathlete</p>
              <h3 className="oa-promo__title">Deine Zahlen, dokumentiert.</h3>
              <p className="oa-promo__text">
                Baseline, Zielwerte und Retests laufen über oneathlete: du siehst deinen
                Fortschritt schwarz auf weiß, jederzeit abrufbar.
              </p>
            </div>
            <a className="btn btn--ghost btn--lg" href={CONFIG.pt.oneathleteUrl} target="_blank" rel="noopener">
              oneathlete entdecken <span aria-hidden="true">→</span>
            </a>
          </div>

          <figure className="frame frame--reveal pt__photo" data-reveal>
            <img
              src="https://images.unsplash.com/photo-1571732154690-f6d1c3e5178a?auto=format&fit=crop&w=1000&q=80"
              alt="Coach korrigiert die Kniebeuge einer Athletin im 1:1-Training"
              width={1000}
              height={750}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <FocusWidget />
      </div>
    </section>
  );
}
