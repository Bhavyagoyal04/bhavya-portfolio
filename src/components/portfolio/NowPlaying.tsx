import { Code2, BookOpen, Headphones, Coffee } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

const ITEMS = [
  {
    icon: Code2,
    label: "Building",
    title: "Xebia Exam Platform",
    sub: "Scaling submissions · Node + Postgres",
    glow: "var(--electric)",
    pulse: true,
  },
  {
    icon: BookOpen,
    label: "Reading",
    title: "Designing Data-Intensive Apps",
    sub: "Martin Kleppmann · Ch. 7",
    glow: "var(--neon)",
  },
  {
    icon: Headphones,
    label: "Listening",
    title: "Lo-fi Focus · Deep Work",
    sub: "Late night commits playlist",
    glow: "var(--electric)",
  },
  {
    icon: Coffee,
    label: "Fueled by",
    title: "Filter coffee · 3rd cup",
    sub: "Because ship > sleep",
    glow: "var(--neon)",
  },
];

export function NowPlaying() {
  return (
    <section className="relative px-6 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-mono uppercase tracking-widest text-[var(--neon)]">
              — Now
            </div>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What I'm <span className="text-gradient">up to</span> right now.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--electric)]" />
            </span>
            Live
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <SpotlightCard
              key={it.label}
              glowColor={it.glow}
              className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm"
            >
              <div className="shine-on-hover relative overflow-hidden rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-white shadow-[0_0_20px_var(--electric)]"
                  >
                    <it.icon className="h-5 w-5" />
                  </div>
                  {it.pulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon)]" />
                    </span>
                  )}
                </div>
                <div className="mt-5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {it.label}
                </div>
                <div className="mt-1 text-lg font-semibold leading-snug">{it.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{it.sub}</div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
