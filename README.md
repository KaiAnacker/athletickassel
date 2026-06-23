# City Athletic Kassel

Website for **City Athletic Kassel** — the Hyrox, athletics and personal-training studio of
Christian Tripp (Kurfürstenstraße 10, 34117 Kassel). Replaces the old Wix site at
`personal-trainer.pt`. Built with **Next.js (App Router) + React + TypeScript**, deployed on
**Vercel**. No backend: all dynamic functions are wired through drop-in services.

## Three pillars

1. **Kurse / Gruppentraining** → booked via **Eversports** (stays the booking system). The
   Stundenplan-Widget is embedded so booking happens on this domain (avoids the Eversports
   marketplace commission). Until a widget code is set, an honest fallback links out.
2. **Personal Training** (vor Ort & online) → **oneathlete** featured as the progress-tracking
   platform; enquiries via WhatsApp/contact.
3. **Rent a Bell** → kettlebell rental + 45-min online live training (Zoom). Catalog +
   Cal.com booking + packages (10er-Karte, Probetraining).

## Run it

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # production build (also type-checks)
```

## Configure (the one file to edit)

All external services live in [`lib/config.ts`](lib/config.ts). Leave a value empty (`""`) and
the site shows a graceful fallback; fill it in to go live:

- `eversports.scheduleWidgetCode` — Stundenplan-Widget code (Eversports Manager → Einstellungen → Widgets).
- `rentABell.calcomUser` / `calcomEvent` — Cal.com booking for the live training.
- `rentABell.tenCardPaymentLink` — Stripe Payment Link for the 10er-Karte.
- `contact.web3formsKey` — Web3Forms key for the contact form.
- `contact.whatsapp` / `phone` / `email` / `instagram`, `pt.oneathleteUrl` — already set.

Brand/address/SEO constants live in [`lib/site.ts`](lib/site.ts).

## Structure

```
app/
  layout.tsx        Root layout: fonts, metadata, JSON-LD (HealthClub), Nav/Footer/Effects
  page.tsx          Home — composes the section components
  globals.css       Design system (OKLCH tokens) + components + responsive + motion
  impressum/        Legal pages (placeholders — see below)
  datenschutz/
components/          Brand, Nav, Footer, Effects, Hero, Hyrox, Kurse, PersonalTraining,
                    FocusWidget, RentABell, Erfolge, Team, Kontakt
lib/                config.ts (services) · site.ts (brand)
public/             favicon
legacy-static/      The previous hand-built static site, kept as design reference
```

## Design

Athletic race-timing / industrial sport-spec. OKLCH "Committed" palette (gold-yellow identity,
warm near-black, warm paper). Type: Archivo Expanded (display) + Archivo (sub) + Geist (body) +
Geist Mono (data). Motion follows Emil-Kowalski principles; everything degrades under
`prefers-reduced-motion`. See [`DESIGN.md`](DESIGN.md).

## Deploy (Vercel)

Zero-config: import the repo in Vercel — Next.js is auto-detected, all routes prerender to static.

## ⚠️ Before launch

- **Plug the real service codes** into `lib/config.ts` (Eversports widget, Cal.com, Stripe, Web3Forms).
- **Replace placeholder photography** — all images are art-directed Unsplash stock.
- **Impressum & Datenschutz** are clearly-marked placeholders — complete them and have them legally
  reviewed, then add a cookie-consent banner.
