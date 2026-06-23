const MEMBERS = [
  { name: "Michaela", role: "Fitness · PT", src: "https://images.unsplash.com/photo-1552848031-326ec03fe2ec?auto=format&fit=crop&w=520&q=75", alt: "Trainerin Michaela mit der Langhantel" },
  { name: "Simon", role: "Laufen · Hyrox", src: "https://images.unsplash.com/photo-1704223523169-52feeed90365?auto=format&fit=crop&w=520&q=75", alt: "Trainer Simon, Laufen und Hyrox" },
  { name: "Julia", role: "Mobility · TRX", src: "https://images.unsplash.com/photo-1758875568800-29fb434c7b17?auto=format&fit=crop&w=520&q=75", alt: "Trainerin Julia bei der Kniebeuge im Rack" },
  { name: "Max", role: "Kraft · Langhantel", src: "https://images.unsplash.com/photo-1598575435247-2572be03bf6d?auto=format&fit=crop&w=520&q=75", alt: "Trainer Max an der Langhantelstation" },
  { name: "Tobe", role: "Functional · PT", src: "https://images.unsplash.com/photo-1606335543586-137481155deb?auto=format&fit=crop&w=520&q=75", alt: "Trainer Tobe, funktionelles Training" },
];

const AMENITIES = ["Duschen", "Umkleiden", "Parkplatz", "Klimaanlage", "Barrierefrei", "Kartenzahlung", "Shop", "Wellness"];

export default function Team() {
  return (
    <section className="section section--paper2" id="team" aria-labelledby="team-h">
      <div className="wrap">
        <p className="kicker" data-reveal><span className="split">Split 06</span> Team &amp; Räumlichkeiten</p>
        <h2 className="h2" id="team-h" data-reveal>Wer dich trainiert.</h2>

        <article className="lead-coach" data-reveal>
          <figure className="frame lead-coach__photo">
            <img
              src="https://images.unsplash.com/photo-1628935291759-bbaf33a66dc6?auto=format&fit=crop&w=900&q=80"
              alt="Christian Tripp, Inhaber und Head Coach, im abgedunkelten Studio"
              width={900}
              height={1080}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="lead-coach__body">
            <p className="kicker kicker--orange">Inhaber · Head Coach</p>
            <h3 className="lead-coach__name">Christian Tripp</h3>
            <p className="lead-coach__bio">
              Personal- und Hyrox-Trainer in Kassel. Sein Ansatz: intensive Betreuung wie im
              Personal Training, kombiniert mit der Energie einer Gruppe. Funktionell,
              athletisch, ergebnisorientiert.
            </p>
            <ul className="tags">
              <li>Hyrox</li><li>Athletik</li><li>Personal Training</li><li>Kraft</li>
            </ul>
          </div>
        </article>

        <ul className="team" data-reveal data-reveal-children>
          {MEMBERS.map((m) => (
            <li className="member" key={m.name}>
              <figure className="frame member__photo duotone">
                <img src={m.src} alt={m.alt} width={520} height={600} loading="lazy" decoding="async" />
              </figure>
              <h3 className="member__name">{m.name}</h3>
              <p className="member__role">{m.role}</p>
            </li>
          ))}
        </ul>

        <div className="amenities" data-reveal>
          <p className="amenities__label">Ausstattung · Kurfürstenstraße 10</p>
          <ul className="amenities__list">
            {AMENITIES.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
