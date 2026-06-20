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
  const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const SCHEDULE = {
    Mo: [
      { time: "06:00", name: "Athletik · Functional", trainer: "Christian", level: "Alle Level", spots: "4 frei" },
      { time: "07:00", name: "Hyrox Prep", trainer: "Simon", level: "Fortgeschritten", spots: "2 frei" },
      { time: "12:00", name: "HIIT · 45", trainer: "Michaela", level: "Alle Level", spots: "6 frei" },
      { time: "18:00", name: "Hyrox Simulation", trainer: "Christian", level: "Fortgeschritten", spots: "3 frei" },
      { time: "19:00", name: "Kraft · Langhantel", trainer: "Max", level: "Einsteiger", spots: "5 frei" },
    ],
    Di: [
      { time: "06:30", name: "Mobility & Core", trainer: "Julia", level: "Alle Level", spots: "6 frei" },
      { time: "12:00", name: "Kettlebell", trainer: "Tobe", level: "Alle Level", spots: "4 frei" },
      { time: "17:30", name: "Hyrox Prep", trainer: "Simon", level: "Fortgeschritten", spots: "2 frei" },
      { time: "19:00", name: "Athletik · Functional", trainer: "Christian", level: "Alle Level", spots: "3 frei" },
    ],
    Mi: [
      { time: "06:00", name: "HIIT · 45", trainer: "Michaela", level: "Alle Level", spots: "5 frei" },
      { time: "12:00", name: "TRX & Schlingen", trainer: "Julia", level: "Alle Level", spots: "6 frei" },
      { time: "18:00", name: "Hyrox Simulation", trainer: "Christian", level: "Fortgeschritten", spots: "1 frei" },
      { time: "19:00", name: "Kraft · Langhantel", trainer: "Max", level: "Einsteiger", spots: "4 frei" },
    ],
    Do: [
      { time: "06:30", name: "Athletik · Functional", trainer: "Christian", level: "Alle Level", spots: "4 frei" },
      { time: "12:00", name: "Tabata", trainer: "Michaela", level: "Alle Level", spots: "6 frei" },
      { time: "17:30", name: "Hyrox Prep", trainer: "Simon", level: "Fortgeschritten", spots: "3 frei" },
      { time: "19:00", name: "Animal Flow & Mobility", trainer: "Julia", level: "Alle Level", spots: "5 frei" },
    ],
    Fr: [
      { time: "06:00", name: "HIIT · 45", trainer: "Michaela", level: "Alle Level", spots: "5 frei" },
      { time: "12:00", name: "Kettlebell", trainer: "Tobe", level: "Alle Level", spots: "6 frei" },
      { time: "17:00", name: "Hyrox Simulation", trainer: "Christian", level: "Fortgeschritten", spots: "2 frei" },
    ],
    Sa: [
      { time: "09:00", name: "Hyrox Team Workout", trainer: "Christian", level: "Alle Level", spots: "8 frei" },
      { time: "10:30", name: "Kraft & Athletik", trainer: "Max", level: "Alle Level", spots: "6 frei" },
    ],
    So: [
      { time: "10:00", name: "Open Gym · Lauf-ABC", trainer: "Simon", level: "Alle Level", spots: "10 frei" },
    ],
  };

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

  /* ------------------------------------------------------- schedule tabs */
  function initSchedule() {
    const tablist = $("[data-day-tabs]");
    const panel = $("[data-schedule-panel]");
    if (!tablist || !panel) return;

    let current = "Mo";

    DAYS.forEach((day) => {
      const tab = el("button", "day", day);
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", String(day === current));
      tab.addEventListener("click", () => select(day));
      tab.addEventListener("keydown", (e) => {
        const i = DAYS.indexOf(day);
        if (e.key === "ArrowRight") { e.preventDefault(); focusTab(DAYS[(i + 1) % DAYS.length]); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); focusTab(DAYS[(i - 1 + DAYS.length) % DAYS.length]); }
      });
      tablist.append(tab);
    });

    function focusTab(day) {
      const tab = [...tablist.children][DAYS.indexOf(day)];
      tab.focus();
      select(day);
    }

    function render(day) {
      panel.innerHTML = "";
      SCHEDULE[day].forEach((c) => {
        const row = el("div", "class-row");
        row.append(
          el("span", "class-row__time", c.time),
          el("div", "class-row__main",
            `<div class="class-row__name">${c.name}</div><div class="class-row__trainer">${c.trainer}</div>`),
          el("span", "class-row__level", c.level),
          el("span", "class-row__spots", c.spots),
        );
        panel.append(row);
      });
      const foot = el("div", "schedule__foot");
      foot.append(
        el("span", null, `${SCHEDULE[day].length} Einheiten · ${day} · je 45 Min`),
        el("a", null, "Platz reservieren →"),
      );
      const link = foot.querySelector("a");
      link.href = "https://www.eversports.de/s/city-athletic-kassel";
      link.target = "_blank"; link.rel = "noopener";
      panel.append(foot);
    }

    function select(day) {
      if (day === current) return;
      current = day;
      [...tablist.children].forEach((t, i) =>
        t.setAttribute("aria-selected", String(DAYS[i] === day)));

      if (reduceMotion) { render(day); return; }
      panel.setAttribute("data-swapping", "");
      window.setTimeout(() => {
        render(day);
        requestAnimationFrame(() => panel.removeAttribute("data-swapping"));
      }, 150);
    }

    render(current);
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

  /* --------------------------------------------------------------- misc */
  function initMisc() {
    const year = $("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------- boot */
  function boot() {
    initNav();
    initSchedule();
    initFocus();
    initTicker();
    initReveals();
    initCounters();
    initMisc();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
