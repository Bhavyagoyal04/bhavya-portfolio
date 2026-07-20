import { useEffect, useState } from "react";

export function PageLoader() {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 900);
    const t2 = setTimeout(() => setGone(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;
  return (
    <div
      className={`fixed inset-0 z-[400] flex items-center justify-center bg-background transition-opacity duration-500 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="text-4xl font-bold tracking-tighter text-gradient animate-gradient">BG</div>
        <div className="mt-4 h-0.5 w-32 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--electric), var(--neon))",
              animation: "loader-bar 1s ease-out forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}
