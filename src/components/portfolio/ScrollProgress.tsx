import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setP(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[var(--electric)] via-[var(--neon)] to-[var(--electric)] shadow-[0_0_12px_var(--electric)] transition-[width] duration-100"
        style={{ width: `${p}%`, backgroundSize: "200% 100%", animation: "gradient-shift 3s linear infinite" }}
      />
    </div>
  );
}
