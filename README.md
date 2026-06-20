# City Athletic Kassel

Landing page for **City Athletic Kassel**, the Hyrox and personal-training studio of
Christian Tripp (Kurfürstenstraße 10, 34117 Kassel). Hand-built static site: one HTML
file, one stylesheet, one script. No build step, no framework, no dependencies.

It started as a Claude design concept (`design-source/`) and was rebuilt into a real,
responsive, accessible website, then taken over with the **Impeccable** and **Emil
Kowalski** design-engineering skills.

## Run it

It is a static site. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
index.html        Markup + content + SEO meta + JSON-LD (HealthClub schema)
styles.css        Design system (OKLCH tokens) + components + responsive + motion
main.js           Schedule tabs, PT focus widget, scroll reveals, counters, mobile nav
assets/favicon.svg
PRODUCT.md         Brand / audience / voice context (for the Impeccable skill)
DESIGN.md          The design system, documented
design-source/     The original Claude design concept + its runtime, kept for reference
```

## Design notes

- **Aesthetic:** athletic race-timing / industrial sport-spec. A strict, visible grid is
  the voice; monospace is used for data (times, splits, specs). Type pairing is Archivo
  Expanded (display) + Geist (body) + Geist Mono (data). The original concept's editorial
  serif (Newsreader) was dropped.
- **Color:** OKLCH, "Committed" strategy. Safety-orange carries the identity, warm
  near-black creates the drama, warm paper holds the content. No pure black or white.
- **Motion (Emil principles):** custom ease-out curves, staggered reveals, press-scale on
  buttons, data bars that grow with `transform` (not `width`), a pausable station ticker,
  count-up stats. Everything degrades under `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, skip link, keyboard-operable day tabs and focus
  chips, visible focus rings, voice-y alt text, AA contrast.

## ⚠️ Before launch

- **Photography is placeholder stock (Unsplash)**, art-directed as a mockup. Replace the
  hero, coach, team, and studio images with real City Athletic / Christian Tripp photos.
  Team images carry a duotone treatment so they read clearly as placeholders.
- Wire up real **Impressum** and **Datenschutz** pages (required in Germany; currently
  `#` placeholders in the footer).
- Confirm the live booking URLs (Eversports / oneathlete) and the studio geo-coordinates
  in the JSON-LD block.

## Deploy (GitHub Pages)

The site lives at the repository root, so Pages can serve it directly:
**Settings → Pages → Branch: `main` / root**.

---
Photos: [Unsplash](https://unsplash.com) · Fonts: Archivo, Geist (Google Fonts)
