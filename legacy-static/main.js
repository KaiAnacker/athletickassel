/* =========================================================================
   City Athletic Kassel — main.js
   Progressive enhancement: the page is readable without JS; this adds the
   schedule tabs, the PT focus widget, motion, and the mobile menu.
   ========================================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------------------------------------------------------------- data */
  const CONFIG = window.CITY_ATHLETIC_CONFIG || {};

  const FOCUS = [
    { label: "Hyrox-Vorbereitung", desc: "Gezieltes Training für alle 8 Stationen plus Lauf-Ökonomie. Wir simulieren das Renntempo und feilen an den Übergängen.",
      metrics: [
        { label: "WALL BALLS / MIN", range: "14 → 22", pct: 0.64 },
        { label: "SLED PUSH 50 m", range: "0:58 → 0:42", pct: 0.72 },
        { label: "1 KM LAUFPACE", range: "5:10 → 4:25", pct: 0.58 },
      ] },
    { label: "Kraft & Muskelaufbau", desc: "Progressives Langhanteltraining mit sauberer Technik. Mehr Maximalkraft, mehr Muskelmasse, belastbare Gelenke.",
      metrics: [
        { label: "KNIEBEUGE 1RM", range: "80 → 120 kg", pct: 0.66 },
        { label: "KREUZHEBEN 1RM", range: "100 → 150 kg", pct: 0.66 },
        { label: "BANKDRÜCKEN 1RM", range: "60 → 90 kg", pct: 0.66 },
      ] },
    { label: "Ausdauer & Laufen", desc: "Vom 5-km-Lauf bis zur Renndistanz: strukturiertes Intervall- und Grundlagentraining für mehr Tempo bei weniger Aufwand.",
      metrics: [
        { label: "5 KM ZEIT", range: "28:00 → 23:00", pct: 0.60 },
        { label: "VO2MAX", range: "42 → 52", pct: 0.70 },
        { label: "RUHEPULS", range: "64 → 52 bpm", pct: 0.55 },
      ] },
    { label: "Körperkomposition", desc: "Nachhaltige Veränderung mit Training und Ernährungsbegleitung: weniger Körperfett, mehr Magermasse, stabile Energie.",
      metrics: [
        { label: "KÖRPERFETT", range: "24 → 16 %", pct: 0.62 },
        { label: "MAGERMASSE", range: "58 → 63 kg", pct: 0.55 },
        { label: "TAILLE", range: "94 → 84 cm", pct: 0.60 },
      ] },
    { label: "Rückkehr & Stabilität", desc: "Behutsamer Wiedereinstieg nach Pause oder Reizung: Mobilität, Rumpfstabilität und sauberes Bewegungsmuster zuerst.",
      metrics: [
        { label: "SPRUNGGELENK ROM", range: "24 → 38°", pct: 0.63 },
        { label: "RUMPF-PLANK", range: "0:45 → 2:00", pct: 0.70 },
        { label: "EINBEINSTAND", range: "15 → 45 s", pct: 0.66 },
      ] },
  ];

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ----------------------------------------------- eversports (Kursplan) */
  // Bettet das Eversports-Stundenplan-Widget direkt ein, damit Kursplan und
  // Buchung auf DIESER Seite passieren (spart die Marktplatz-Provision).
  // Ist in config.js noch kein Widget-Code hinterlegt, zeigt ein sauberer
  // Fallback einen Link zu Eversports — bewusst KEINE erfundenen Kurszeiten.
  function initEversports() {
    const mount = $("[data-eversports-schedule]");
    if (!mount) return;

    const ev = CONFIG.eversports || {};
    const shop = ev.shopUrl || "https://www.eversports.de/s/city-athletic-kassel";

    if (ev.scheduleWidgetCode) {
      const frame = el("iframe", "ev-mount__frame");
      frame.src = "https://www.eversports.com/widget/w/" + encodeURIComponent(ev.scheduleWidgetCode);
      frame.title = "City Athletic Kassel — Kursplan & Buchung (Eversports)";
      frame.loading = "lazy";
      frame.setAttribute("scrolling", "no");
      mount.append(frame);
      return;
    }

    const fb = el("div", "ev-fallback");
    fb.innerHTML =
      '<p class="ev-fallback__kick"><span class="dot" aria-hidden="true"></span>Live-Kursplan · Eversports</p>' +
      '<p class="ev-fallback__lead">Kursplan, freie Plätze und Buchung laufen über Eversports — ' +
      'auf Wunsch direkt hier eingebettet, damit du die Seite nicht verlässt.</p>' +
      '<p class="ev-fallback__meta">Früh · Mittag · Abend &amp; Wochenende · Einheiten je 45 Min</p>';
    const cta = el("a", "btn btn--orange");
    cta.href = shop;
    cta.target = "_blank";
    cta.rel = "noopener";
    cta.innerHTML = 'Kursplan &amp; Buchung öffnen <span aria-hidden="true">→</span>';
    fb.append(cta);
    mount.append(fb);
  }

  /* --------------------------------------------------------- PT focus UI */
  function initFocus() {
    const chipWrap = $("[data-focus-chips]");
    const descEl = $("[data-focus-desc]");
    const meterWrap = $("[data-focus-meters]");
    if (!chipWrap || !descEl || !meterWrap) return;

    let active = 0;
    let revealed = false;

    FOCUS.forEach((f, i) => {
      const chip = el("button", "chip", f.label);
      chip.type = "button";
      chip.setAttribute("aria-pressed", String(i === active));
      chip.addEventListener("click", () => select(i));
      chipWrap.append(chip);
    });

    function buildMeters(focus, animate) {
      meterWrap.innerHTML = "";
      focus.metrics.forEach((m) => {
        const row = el("div", "meter");
        row.innerHTML =
          `<div class="meter__top"><span class="meter__label">${m.label}</span><span class="meter__range">${m.range}</span></div>` +
          `<div class="meter__track"><div class="meter__fill"></div></div>`;
        meterWrap.append(row);
        const fill = row.querySelector(".meter__fill");
        if (animate && !reduceMotion) {
          requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.transform = `scaleX(${m.pct})`; }));
        } else {
          fill.style.transform = `scaleX(${m.pct})`;
        }
      });
    }

    function select(i) {
      active = i;
      [...chipWrap.children].forEach((c, idx) => c.setAttribute("aria-pressed", String(idx === i)));
      descEl.style.opacity = "0";
      window.setTimeout(() => {
        descEl.textContent = FOCUS[i].desc;
        descEl.style.opacity = "1";
        buildMeters(FOCUS[i], true);
      }, reduceMotion ? 0 : 120);
    }

    // initial paint (bars flat until the widget scrolls into view)
    descEl.textContent = FOCUS[active].desc;
    buildMeters(FOCUS[active], false);

    const widget = $(".widget");
    if (widget && "IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !revealed) {
            revealed = true;
            buildMeters(FOCUS[active], true);
            obs.disconnect();
          }
        });
      }, { threshold: 0.35 });
      io.observe(widget);
    } else {
      buildMeters(FOCUS[active], false);
    }
  }

  /* ----------------------------------------------------------- counters */
  function animateCount(node) {
    const target = parseFloat(node.dataset.count);
    const decimals = parseInt(node.dataset.decimals || "0", 10);
    const suffix = node.dataset.suffix || "";
    if (reduceMotion) { node.textContent = target.toFixed(decimals) + suffix; return; }

    const dur = 1150;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      node.textContent = (target * eased).toFixed(decimals).replace(".", ",") + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else node.textContent = target.toFixed(decimals).replace(".", ",") + suffix;
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
    if (!("IntersectionObserver" in window)) { nums.forEach(animateCount); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------ reveals */
  function initReveals() {
    const items = $$("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((n) => {
      const d = n.dataset.revealDelay;
      if (d) n.style.setProperty("--reveal-delay", d);
      io.observe(n);
    });
  }

  /* ------------------------------------------------------------- ticker */
  function initTicker() {
    const track = $("[data-ticker]");
    if (track) track.innerHTML += track.innerHTML; // duplicate for a seamless loop
  }

  /* ---------------------------------------------------------- nav state */
  function initNav() {
    const nav = $("[data-nav]");
    const toggle = $("[data-nav-toggle]");
    const menu = $("#nav-menu");

    // scrolled border
    if (nav) {
      const onScroll = () => nav.toggleAttribute("data-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // mobile drawer
    if (toggle && menu) {
      const setOpen = (open) => {
        menu.toggleAttribute("data-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      };
      toggle.addEventListener("click", () => setOpen(!menu.hasAttribute("data-open")));
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
      window.addEventListener("resize", () => { if (window.innerWidth > 760) setOpen(false); });
    }

    // scrollspy
    const links = $$('.nav__links a[href^="#"]');
    const map = new Map();
    links.forEach((l) => { const t = document.getElementById(l.getAttribute("href").slice(1)); if (t) map.set(t, l); });
    if (map.size && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const link = map.get(e.target);
          if (!link) return;
          if (e.isIntersecting) {
            links.forEach((l) => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "true");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      map.forEach((_, section) => spy.observe(section));
    }
  }

  /* --------------------------------------------------- scroll progress */
  function initProgress() {
    const bar = $("[data-progress]");
    if (!bar) return;
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      const frac = max > 0 ? Math.min(root.scrollTop / max, 1) : 0;
      bar.style.transform = "scaleX(" + frac.toFixed(4) + ")";
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* --------------------------------------------------------------- misc */
  function initMisc() {
    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------- boot */
  function boot() {
    initNav();
    initEversports();
    initFocus();
    initTicker();
    initReveals();
    initCounters();
    initProgress();
    initMisc();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
