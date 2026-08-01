import { useEffect, useRef } from "react";

/**
 * Lenis-style inertial smooth scroll for the whole page.
 * Intercepts wheel / keyboard scroll and lerps the scroll position toward
 * the target with easing, producing a slow, delayed, premium feel.
 */
export function SmoothScroll() {
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Skip on touch devices where native momentum scrolling feels better.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    target.current = window.scrollY;
    current.current = window.scrollY;

    const LERP = 0.075; // lower = slower, more delayed glide

    const step = () => {
      const diff = target.current - current.current;
      if (Math.abs(diff) < 0.4) {
        current.current = target.current;
        raf.current = null; // idle until next input
        return;
      }
      current.current += diff * LERP;
      window.scrollTo(0, current.current);
      raf.current = requestAnimationFrame(step);
    };

    const launch = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      // let scrollable inner elements (overflow containers) handle their own scroll
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        const style = getComputedStyle(el);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          el.scrollHeight > el.clientHeight + 1
        )
          return;
        el = el.parentElement;
      }
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = Math.max(0, Math.min(max, target.current + e.deltaY));
      launch();
    };


    const onKey = (e: KeyboardEvent) => {
      const code = e.code;
      const stepAmt = window.innerHeight * 0.9;
      let delta = 0;
      if (code === "PageDown" || code === "Space") delta = stepAmt;
      else if (code === "PageUp") delta = -stepAmt;
      else if (code === "ArrowDown") delta = stepAmt * 0.2;
      else if (code === "ArrowUp") delta = -stepAmt * 0.2;
      else if (code === "Home") delta = -target.current;
      else if (code === "End") delta = document.documentElement.scrollHeight;
      else return;
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = Math.max(0, Math.min(max, target.current + delta));
      launch();
    };

    // Sync target when the browser scrolls via other means (e.g. anchor jumps).
    const onScroll = () => {
      if (raf.current == null) {
        target.current = window.scrollY;
        current.current = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  return null;
}
