import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";

const HINTS = [
  "Try pressing ⌘K to jump anywhere",
  "Press ? to see all keyboard shortcuts",
  "Vim style: press G then P to fly to Projects",
  "Psst — the Konami code launches confetti 🎉",
  "Switch the accent color from the bottom-right dial",
  "Hover the project cards — they tilt in 3D",
];

export function HintRotator() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const show = setTimeout(() => setVisible(true), 4000);
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((n) => (n + 1) % HINTS.length);
        setVisible(true);
      }, 400);
    }, 7500);
    return () => {
      clearTimeout(show);
      clearInterval(cycle);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 text-xs shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        style={{ boxShadow: "0 10px 40px -15px color-mix(in oklab, var(--electric) 30%, transparent)" }}
      >
        <Sparkles className="h-3.5 w-3.5 text-[var(--electric)]" />
        <span key={i} className="animate-[fade-in_.4s_ease-out] text-foreground/85">
          {HINTS[i]}
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          aria-label="Dismiss tip"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
