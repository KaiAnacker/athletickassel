"use client";

import { useEffect, useState } from "react";
import Brand from "@/components/Brand";
import { CONFIG } from "@/lib/config";

const LINKS = [
  { href: "#hyrox", label: "Hyrox" },
  { href: "#kurse", label: "Kurse" },
  { href: "#pt", label: "Personal Training" },
  { href: "#rentabell", label: "Rent a Bell" },
  { href: "#team", label: "Team" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // scrollspy → aria-current on the matching nav link
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.nav__links a[href^="#"]')
    );
    const map = new Map<Element, HTMLAnchorElement>();
    links.forEach((l) => {
      const t = document.getElementById(l.getAttribute("href")!.slice(1));
      if (t) map.set(t, l);
    });
    let spy: IntersectionObserver | undefined;
    if (map.size && "IntersectionObserver" in window) {
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const link = map.get(e.target);
            if (!link) return;
            if (e.isIntersecting) {
              links.forEach((l) => l.removeAttribute("aria-current"));
              link.setAttribute("aria-current", "true");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      map.forEach((_, sec) => spy!.observe(sec));
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      spy?.disconnect();
    };
  }, []);

  return (
    <header className="nav" id="top" data-nav data-scrolled={scrolled ? "" : undefined}>
      <div className="wrap nav__inner">
        <Brand size={30} />

        <nav
          className="nav__links"
          id="nav-menu"
          aria-label="Hauptnavigation"
          data-open={open ? "" : undefined}
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--orange nav__cta"
            href={CONFIG.eversports.shopUrl}
            target="_blank"
            rel="noopener"
          >
            Probetraining <span aria-hidden="true">→</span>
          </a>
        </nav>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
          data-nav-toggle
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
