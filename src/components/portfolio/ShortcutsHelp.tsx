import { useEffect, useState } from "react";
import { Keyboard, X } from "lucide-react";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["?"], label: "Toggle this shortcuts panel" },
  { keys: ["G", "H"], label: "Go to Home" },
  { keys: ["G", "E"], label: "Go to Experience" },
  { keys: ["G", "P"], label: "Go to Projects" },
  { keys: ["G", "A"], label: "Go to Achievements" },
  { keys: ["G", "C"], label: "Go to Contact" },
  { keys: ["↑↑↓↓←→←→BA"], label: "Konami — launch confetti 🎉" },
  { keys: ["Esc"], label: "Close overlays" },
];

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false);
  const [prefix, setPrefix] = useState<string | null>(null);

  useEffect(() => {
    const scroll = (id: string) =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        setPrefix(null);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const k = e.key.toLowerCase();
      if (prefix === "g") {
        const map: Record<string, string> = { h: "home", e: "experience", p: "projects", a: "achievements", c: "contact" };
        if (map[k]) {
          scroll(map[k]);
          setPrefix(null);
          return;
        }
        setPrefix(null);
      } else if (k === "g") {
        setPrefix("g");
        setTimeout(() => setPrefix((p) => (p === "g" ? null : p)), 900);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prefix]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Keyboard shortcuts"
        className="fixed bottom-6 right-24 z-[90] hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition hover:text-foreground md:inline-flex"
      >
        <Keyboard className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-md animate-[fade-in_.2s_ease-out]" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl animate-[scale-in_.18s_ease-out]"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Keyboard className="h-4 w-4 text-[var(--electric)]" />
                Keyboard shortcuts
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="divide-y divide-border/60">
              {SHORTCUTS.map((s) => (
                <li key={s.label} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="flex gap-1">
                    {s.keys.map((k, i) => (
                      <kbd
                        key={i}
                        className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-mono text-foreground/80"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
