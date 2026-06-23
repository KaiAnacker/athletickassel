const RESULTS = [
  { sport: "Hyrox", tag: "Pro · M", value: "1:08:42", who: "M., Finish im Single Pro" },
  { sport: "Hyrox", tag: "AG · W", value: "1:21:15", who: "A., Age-Group-Podium" },
  { sport: "Transformation", tag: "12 Wo.", value: "−9,4 kg", who: "T., Körperfett halbiert" },
];

const REVIEWS = [
  { text: "Tolles Training, sehr empfehlenswert. Intensiv und trotzdem persönlich.", who: "Katja · Eversports" },
  { text: "Great courses, great people. Komme jede Woche gerne wieder.", who: "Jan · Eversports" },
  { text: "Top betreut, klare Ansagen, echte Fortschritte. Genau das wollte ich.", who: "Anja · Eversports" },
];

export default function Erfolge() {
  return (
    <section className="section section--paper" id="erfolge" aria-labelledby="erfolge-h">
      <div className="wrap">
        <p className="kicker" data-reveal><span className="split">Split 05</span> Erfolge &amp; Ergebnisse</p>
        <h2 className="h2" id="erfolge-h" data-reveal>Zahlen, die zählen.</h2>

        <div className="results" data-reveal data-reveal-children>
          {RESULTS.map((r, i) => (
            <article className="result" key={i}>
              <header className="result__head"><span>{r.sport}</span><span className="result__tag">{r.tag}</span></header>
              <p className="result__value">{r.value}</p>
              <p className="result__who">{r.who}</p>
            </article>
          ))}
        </div>

        <div className="reviews" data-reveal data-reveal-children>
          {REVIEWS.map((r, i) => (
            <blockquote className="review" key={i}>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <p>{r.text}</p>
              <cite>{r.who}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
