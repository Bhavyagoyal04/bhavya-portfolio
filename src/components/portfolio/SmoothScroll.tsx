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

    const ease = (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t));

    const step = () => {
      current.current += (target.current - current.current) * ease(0.18);
      if (Math.abs(target.current - current.current) < 0.5) {
        current.current = target.current;
      } else {
        window.scrollTo(0, current.current);
        raf.current = requestAnimationFrame(step);
        return;
      }
      window.scrollTo(0, current.current);
    };

    const launch = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = Math.max(0, Math.min(max, target.current + e.deltaY));
      // keep current in sync if far behind to avoid huge catch-up lag
      if (Math.abs(target.current - current.current) > window.innerHeight * 2) {
        current.current = target.current - Math.sign(e.deltaY) * window.innerHeight;
      }
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
