import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  { name: "Electric", electric: "#3b82f6", neon: "#a855f7" },
  { name: "Emerald", electric: "#10b981", neon: "#22d3ee" },
  { name: "Sunset", electric: "#f97316", neon: "#ec4899" },
  { name: "Aurora", electric: "#22d3ee", neon: "#84cc16" },
  { name: "Crimson", electric: "#ef4444", neon: "#f59e0b" },
];

export function AccentSwitcher() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem("accent-idx") ?? "0");
    setIdx(saved);
  }, []);

  useEffect(() => {
    const t = THEMES[idx];
    const root = document.documentElement;
    root.style.setProperty("--electric", t.electric);
    root.style.setProperty("--neon", t.neon);
    localStorage.setItem("accent-idx", String(idx));
  }, [idx]);

  return (
    <div className="fixed bottom-6 left-6 z-[90]">
      <div className="relative">
        {open && (
          <div className="absolute bottom-14 left-0 flex flex-col gap-2 rounded-2xl border border-border bg-card/90 p-2 shadow-xl backdrop-blur-md animate-[scale-in_.15s_ease-out]">
            {THEMES.map((t, i) => (
              <button
                key={t.name}
                onClick={() => { setIdx(i); setOpen(false); }}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-medium transition hover:bg-background/60 ${
                  i === idx ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="flex gap-1">
                  <span className="h-4 w-4 rounded-full ring-1 ring-border" style={{ background: t.electric }} />
                  <span className="h-4 w-4 rounded-full ring-1 ring-border" style={{ background: t.neon }} />
                </span>
                {t.name}
              </button>
            ))}
          </div>
        )}
        <button
          aria-label="Change accent color"
          onClick={() => setOpen((o) => !o)}
          className="glow-border flex h-12 w-12 items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition hover:scale-110"
        >
          <Palette className="h-5 w-5 text-[var(--electric)]" />
        </button>
      </div>
    </div>
  );
}
