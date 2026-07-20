import { useEffect, useState } from "react";
import { Search, ArrowRight, Github, Linkedin, Mail, Home, Briefcase, FolderGit2, Award, Send, Sparkles } from "lucide-react";

type Item = {
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string;
};

export function CommandPalette({ onConfetti }: { onConfetti: () => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const items: Item[] = [
    { label: "Home", icon: Home, action: () => go("home"), keywords: "top hero" },
    { label: "Experience", icon: Briefcase, action: () => go("experience"), keywords: "work timeline" },
    { label: "Projects", icon: FolderGit2, action: () => go("projects"), keywords: "portfolio" },
    { label: "Achievements", icon: Award, action: () => go("achievements"), keywords: "certifications" },
    { label: "Contact", icon: Send, action: () => go("contact"), keywords: "email message" },
    { label: "Email Bhavya", hint: "mailto", icon: Mail, action: () => { window.location.href = "mailto:bhavyagoyal30122005@gmail.com"; setOpen(false); } },
    { label: "GitHub", hint: "external", icon: Github, action: () => { window.open("https://github.com", "_blank"); setOpen(false); } },
    { label: "LinkedIn", hint: "external", icon: Linkedin, action: () => { window.open("https://linkedin.com", "_blank"); setOpen(false); } },
    { label: "Launch confetti 🎉", hint: "fun", icon: Sparkles, action: () => { onConfetti(); setOpen(false); } },
  ];

  const filtered = items.filter(
    (i) => (i.label + " " + (i.keywords ?? "")).toLowerCase().includes(q.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (open && e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (open && e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (open && e.key === "Enter") {
        filtered[active]?.action();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, active, filtered]);

  useEffect(() => setActive(0), [q, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md animate-[fade-in_.2s_ease-out]" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl animate-[scale-in_.18s_ease-out]"
        style={{ boxShadow: "0 30px 80px -20px color-mix(in oklab, var(--electric) 30%, transparent)" }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a section, link, or action…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results</li>
          )}
          {filtered.map((it, i) => (
            <li key={it.label}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={it.action}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  i === active ? "bg-[color-mix(in_oklab,var(--electric)_15%,transparent)] text-foreground" : "text-muted-foreground"
                }`}
              >
                <it.icon className="h-4 w-4 text-[var(--electric)]" />
                <span className="flex-1">{it.label}</span>
                {it.hint && <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">{it.hint}</span>}
                <ArrowRight className="h-3.5 w-3.5 opacity-40" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>↑ ↓ to navigate · ↵ to select</span>
          <span>⌘K</span>
        </div>
      </div>
    </div>
  );
}
