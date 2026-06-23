# DESIGN.md — City Athletic Kassel

> The design system behind the site. Tokens live in `styles.css` (`:root`); this
> documents the decisions so they stay consistent.

## Aesthetic lane

**Athletic race-timing / industrial sport-spec.** Reference points: a Hyrox race
protocol sheet, a stadium scoreboard, the stencilled lane numbers of a running track,
a stopwatch split readout. A strict, visible grid is the voice (Swiss / tech-spec),
not decoration. Mono is used for *data* (times, splits, specs), which is motivated
here, not costume.

Explicitly **not** editorial-magazine (display serif + italic). That was the first
concept's reflex; we left it.

## Color — OKLCH, "Committed" strategy

A gold-yellow accent carries the identity; warm near-black creates the drama; warm paper holds the
content. We exceed the "one accent ≤ 10%" rule on purpose (brand permission).

| Token | OKLCH | Role |
| --- | --- | --- |
| `--paper` | `oklch(0.955 0.011 79)` | primary light background (warm off-white) |
| `--paper-2` | `oklch(0.905 0.018 78)` | recessed panels, alternating sections |
| `--ink` | `oklch(0.185 0.012 67)` | text on paper; background of dark sections |
| `--ink-soft` | `oklch(0.50 0.016 72)` | secondary text, labels |
| `--orange` | `oklch(0.74 0.155 85)` | brand accent (gold-yellow): CTAs, data, the dot. Button/selection text is `--ink` for contrast |
| `--orange-press` | `oklch(0.66 0.145 82)` | pressed/hover accent |
| `--cream` | `oklch(0.955 0.011 79)` | text/marks on dark sections |
| `--green` | `oklch(0.60 0.115 155)` | availability ("frei") only |

Never `#000` / `#fff`; every neutral is tinted warm (hue ~70–80). Hairlines are
`color-mix` alpha tints of `--ink` (light) or `--cream` (dark).

## Typography — deliberate pairing (no reflex fonts)

- **Archivo Expanded** (700–900) — display. Athletic, signage-like grotesque with a
  wide cut. Carries the big headlines and the giant numbers. The voice.
- **Archivo** (500–800) — sub-display / section heads.
- **Geist** (400–600) — body. Clean, neutral; lets display + data carry character.
- **Geist Mono** (400–500) — data: times, splits, specs, kickers. Tabular numbers.

Newsreader (reflex-reject, wrong register) was removed.

Scale is modular with fluid `clamp()`, ratio ≥ 1.25. Light-on-dark gets +0.05 line-height.

## Layout

- Strict 12-ish column feel via a visible hairline grid; tabular alignment.
- Content max-width 1280px; fluid `clamp()` gutters and section padding.
- Asymmetric hero (oversize type left, image right with a data overlay).
- Breakpoint-free grids (`auto-fit minmax`) where possible; targeted breakpoints at
  960px (hero/columns stack) and 640px (schedule rows → stacked, nav → drawer).
- Small radii (3–6px): sharp, industrial. No pill-rounding except chips.

## Motion (Emil principles)

- Easing tokens: `--ease-out-quint cubic-bezier(0.22,1,0.36,1)`, `--ease-out-expo`,
  `--ease-drawer cubic-bezier(0.32,0.72,0,1)`. No `ease-in`, no bounce.
- One orchestrated page-load: hero reveals stagger (kicker → headline → sub → CTAs →
  stats), 40–70ms apart.
- Scroll reveals via `IntersectionObserver` (`once`): `translateY(14px)` + opacity,
  `--ease-out-quint`, staggered. Only `transform`/`opacity` animate.
- Pressables: `scale(0.97)` on `:active`, 160ms. Hover behind `(hover:hover)`.
- Data bars grow with `transform: scaleX()` (origin left) on reveal, not `width`.
- Stat counters count up once on reveal.
- A thin station "ticker" marquee (linear, infinite, pausable) for kinetic energy.
- `prefers-reduced-motion`: reveals resolve instantly, counters jump to final,
  marquee and image clip-reveals are disabled. Opacity/color transitions stay.

## Imagery

Stock (Unsplash), hand-picked and verified, art-directed:
- Hero: dark Hyrox competition floor, spotlit athlete (lives on near-black).
- Sections: sled push, 1:1 coaching, kettlebell work, dark studio interior.
- Team: duotone (ink → orange) treatment unifies disparate sources and reads clearly
  as stylized placeholder, not literal headshots. **Swap for real photos before launch.**
- Alt text is voice: "Athletin schiebt den Sled über die Bahn", not "woman in gym".
