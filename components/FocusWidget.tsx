"use client";

import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";

type Metric = { label: string; range: string; pct: number };
type Focus = { label: string; desc: string; metrics: Metric[] };

const FOCUS: Focus[] = [
  {
    label: "Hyrox-Vorbereitung",
    desc: "Gezieltes Training für alle 8 Stationen plus Lauf-Ökonomie. Wir simulieren das Renntempo und feilen an den Übergängen.",
    metrics: [
      { label: "WALL BALLS / MIN", range: "14 → 22", pct: 0.64 },
      { label: "SLED PUSH 50 m", range: "0:58 → 0:42", pct: 0.72 },
      { label: "1 KM LAUFPACE", range: "5:10 → 4:25", pct: 0.58 },
    ],
  },
  {
    label: "Kraft & Muskelaufbau",
    desc: "Progressives Langhanteltraining mit sauberer Technik. Mehr Maximalkraft, mehr Muskelmasse, belastbare Gelenke.",
    metrics: [
      { label: "KNIEBEUGE 1RM", range: "80 → 120 kg", pct: 0.66 },
      { label: "KREUZHEBEN 1RM", range: "100 → 150 kg", pct: 0.66 },
      { label: "BANKDRÜCKEN 1RM", range: "60 → 90 kg", pct: 0.66 },
    ],
  },
  {
    label: "Ausdauer & Laufen",
    desc: "Vom 5-km-Lauf bis zur Renndistanz: strukturiertes Intervall- und Grundlagentraining für mehr Tempo bei weniger Aufwand.",
    metrics: [
      { label: "5 KM ZEIT", range: "28:00 → 23:00", pct: 0.6 },
      { label: "VO2MAX", range: "42 → 52", pct: 0.7 },
      { label: "RUHEPULS", range: "64 → 52 bpm", pct: 0.55 },
    ],
  },
  {
    label: "Körperkomposition",
    desc: "Nachhaltige Veränderung mit Training und Ernährungsbegleitung: weniger Körperfett, mehr Magermasse, stabile Energie.",
    metrics: [
      { label: "KÖRPERFETT", range: "24 → 16 %", pct: 0.62 },
      { label: "MAGERMASSE", range: "58 → 63 kg", pct: 0.55 },
      { label: "TAILLE", range: "94 → 84 cm", pct: 0.6 },
    ],
  },
  {
    label: "Rückkehr & Stabilität",
    desc: "Behutsamer Wiedereinstieg nach Pause oder Reizung: Mobilität, Rumpfstabilität und sauberes Bewegungsmuster zuerst.",
    metrics: [
      { label: "SPRUNGGELENK ROM", range: "24 → 38°", pct: 0.63 },
      { label: "RUMPF-PLANK", range: "0:45 → 2:00", pct: 0.7 },
      { label: "EINBEINSTAND", range: "15 → 45 s", pct: 0.66 },
    ],
  },
];

export default function FocusWidget() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const f = FOCUS[active];

  return (
    <aside className="widget" aria-label="Fokus für dein Personal Training" data-reveal ref={ref}>
      <div className="widget__head">
        <span className="widget__status"><span className="dot dot--green" aria-hidden="true" />oneathlete · Tracking</span>
        <span className="widget__id">PT-01</span>
      </div>
      <div className="widget__body">
        <p className="widget__label">Dein Fokus</p>
        <div className="chips" role="group" aria-label="Trainingsfokus wählen">
          {FOCUS.map((x, i) => (
            <button
              key={x.label}
              type="button"
              className="chip"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {x.label}
            </button>
          ))}
        </div>
        <p className="widget__desc">{f.desc}</p>
        <div className="meters">
          {f.metrics.map((m) => (
            <div className="meter" key={m.label}>
              <div className="meter__top">
                <span className="meter__label">{m.label}</span>
                <span className="meter__range">{m.range}</span>
              </div>
              <div className="meter__track">
                <div className="meter__fill" style={{ transform: `scaleX(${revealed ? m.pct : 0})` }} />
              </div>
            </div>
          ))}
        </div>
        <a className="btn btn--orange btn--block" href={`https://wa.me/${CONFIG.contact.whatsapp}`} target="_blank" rel="noopener">
          Personal Training anfragen <span aria-hidden="true">→</span>
        </a>
        <p className="widget__alt">
          Fortschritt dokumentiert über <a href={CONFIG.pt.oneathleteUrl} target="_blank" rel="noopener">oneathlete</a>.
        </p>
      </div>
    </aside>
  );
}
