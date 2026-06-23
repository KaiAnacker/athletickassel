"use client";

import { useEffect } from "react";

/* Ported from the legacy main.js: scroll reveals, count-up stats, and the
   reading-progress bar. Runs once for the whole page. Interactive widgets
   (nav drawer, Eversports embed, PT focus) live in their own components. */
export default function Effects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const all = (sel: string) => Array.from(document.querySelectorAll(sel));
    const cleanups: Array<() => void> = [];

    /* reveals */
    {
      const items = all("[data-reveal]") as HTMLElement[];
      if (reduceMotion || !("IntersectionObserver" in window)) {
        items.forEach((n) => n.classList.add("is-in"));
      } else {
        const io = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-in");
                obs.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        items.forEach((n) => {
          const d = n.dataset.revealDelay;
          if (d) n.style.setProperty("--reveal-delay", d);
          io.observe(n);
        });
        cleanups.push(() => io.disconnect());
      }
    }

    /* count-up stats */
    {
      const nums = all("[data-count]") as HTMLElement[];
      const animate = (node: HTMLElement) => {
        const target = parseFloat(node.dataset.count || "0");
        const decimals = parseInt(node.dataset.decimals || "0", 10);
        const suffix = node.dataset.suffix || "";
        const fmt = (v: number) => v.toFixed(decimals).replace(".", ",") + suffix;
        if (reduceMotion) {
          node.textContent = fmt(target);
          return;
        }
        const dur = 1150;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          node.textContent = fmt(target * eased);
          if (t < 1) requestAnimationFrame(tick);
          else node.textContent = fmt(target);
        };
        requestAnimationFrame(tick);
      };
      if (nums.length) {
        if (!("IntersectionObserver" in window)) {
          nums.forEach(animate);
        } else {
          const io = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  animate(e.target as HTMLElement);
                  obs.unobserve(e.target);
                }
              });
            },
            { threshold: 0.6 }
          );
          nums.forEach((n) => io.observe(n));
          cleanups.push(() => io.disconnect());
        }
      }
    }

    /* reading-progress bar */
    {
      const bar = document.querySelector("[data-progress]") as HTMLElement | null;
      if (bar) {
        const root = document.documentElement;
        let ticking = false;
        const update = () => {
          const max = root.scrollHeight - root.clientHeight;
          const frac = max > 0 ? Math.min(root.scrollTop / max, 1) : 0;
          bar.style.transform = "scaleX(" + frac.toFixed(4) + ")";
          ticking = false;
        };
        const onScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
