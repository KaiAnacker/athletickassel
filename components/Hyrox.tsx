const STATIONS = [
  { no: "01", spec: "1.000 m", name: "SkiErg", note: "Ganzkörper-Zug am Ski-Ergometer." },
  { no: "02", spec: "50 m", name: "Sled Push", note: "Schlitten schieben, Beinkraft pur." },
  { no: "03", spec: "50 m", name: "Sled Pull", note: "Schlitten ziehen, Rücken und Griff." },
  { no: "04", spec: "80 m", name: "Burpee Broad Jumps", note: "Burpee mit Weitsprung nach vorn." },
  { no: "05", spec: "1.000 m", name: "Rudern", note: "Rudergerät auf Zeit." },
  { no: "06", spec: "200 m", name: "Farmers Carry", note: "Schweres Tragen, beidhändig." },
  { no: "07", spec: "100 m", name: "Sandbag Lunges", note: "Ausfallschritte mit Sandsack." },
  { no: "08", spec: "100 Wdh.", name: "Wall Balls", note: "Medizinball an die Zielmarke." },
];

const RUN_X = [120, 240, 360, 480, 600, 720, 840, 960];
const ST_X = [175.5, 295.5, 415.5, 535.5, 655.5, 775.5, 895.5, 1015.5];

export default function Hyrox() {
  return (
    <section className="section section--paper" id="hyrox" aria-labelledby="hyrox-h">
      <div className="wrap">
        <div className="section__head">
          <div>
            <p className="kicker" data-reveal><span className="split">Split 01</span> Was ist Hyrox</p>
            <h2 className="h2" id="hyrox-h" data-reveal>Hyrox: der Fitness-Wettkampf,<br />für den wir dich fit machen.</h2>
          </div>
          <p className="section__intro" data-reveal>
            Hyrox kombiniert Laufen mit funktionellem Krafttraining: <strong>8&nbsp;×&nbsp;1&nbsp;km Lauf</strong>,
            dazwischen <strong>8&nbsp;Stationen</strong>. Weltweit dieselbe Strecke, eine Gesamtzeit.
            Im City&nbsp;Athletic bereiten wir dich auf jede Station vor.
          </p>
        </div>

        <figure className="racemap" data-reveal aria-label="Streckenschema: Start, dann acht mal ein Kilometer Lauf mit je einer Station dazwischen, danach das Ziel.">
          <figcaption className="racemap__cap">
            <span className="racemap__kick">Die Strecke</span>
            8&nbsp;km Lauf + 8&nbsp;Stationen = eine Gesamtzeit
          </figcaption>
          <div className="racemap__track">
            <svg className="racemap__svg" viewBox="0 0 1200 132" role="img" preserveAspectRatio="xMidYMid meet">
              <path className="racemap__line" d="M60 70 H1140" pathLength={1} />
              <line className="racemap__node racemap__start" x1={60} y1={56} x2={60} y2={84} />
              <text className="racemap__node racemap__cap-label" x={60} y={106} textAnchor="start">START</text>
              <g className="racemap__runs">
                {RUN_X.map((x, i) => (
                  <text key={i} className="racemap__node racemap__run" x={x} y={94}>1 KM</text>
                ))}
              </g>
              <g className="racemap__stations">
                {ST_X.map((x, i) => (
                  <g key={i} className="racemap__st">
                    <rect x={x} y={65.5} width={9} height={9} />
                    <text x={x + 4.5} y={46} textAnchor="middle">{STATIONS[i].no}</text>
                  </g>
                ))}
              </g>
              <rect className="racemap__node racemap__finish" x={1134} y={64} width={12} height={12} />
              <text className="racemap__node racemap__cap-label racemap__cap-label--goal" x={1140} y={106} textAnchor="end">ZIEL</text>
            </svg>
          </div>
        </figure>

        <div className="hyrox__layout">
          <figure className="frame frame--reveal hyrox__photo" data-reveal>
            <img
              src="https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?auto=format&fit=crop&w=900&q=80"
              alt="Athletin schiebt den schwer beladenen Sled über die Trainingsbahn"
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="frame__cap">Station 02 · Sled Push</figcaption>
          </figure>

          <div className="protocol">
            <div className="protocol__bar" data-reveal>
              <span className="protocol__arrow" aria-hidden="true">↔</span>
              8 × 1 km Lauf · dazwischen 8 Stationen · eine Gesamtzeit
            </div>
            <ol className="stations" data-reveal data-reveal-children>
              {STATIONS.map((s) => (
                <li className="station" key={s.no}>
                  <span className="station__no">{s.no}</span>
                  <span className="station__spec">{s.spec}</span>
                  <h3 className="station__name">{s.name}</h3>
                  <p className="station__note">{s.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
