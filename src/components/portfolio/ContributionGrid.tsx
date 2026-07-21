import { useEffect, useMemo, useRef, useState } from "react";
import { GitCommit, Flame, Calendar, Zap } from "lucide-react";

const WEEKS = 52;
const DAYS = 7;

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function ContributionGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const cells = useMemo(() => {
    const rand = seededRand(42);
    const arr: number[] = [];
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < DAYS; d++) {
        const r = rand();
        // Weight for a nicer distribution + a hot streak in the middle
        const boost = w > 20 && w < 40 ? 0.35 : 0;
        const v = Math.min(4, Math.floor(Math.pow(r + boost, 1.6) * 5));
        arr.push(v);
      }
    }
    return arr;
  }, []);

  const total = cells.reduce((a, b) => a + b * 3 + (b > 0 ? 1 : 0), 0);
  const streak = 27;
  const best = 14;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shade = (v: number) => {
    if (v === 0) return "bg-secondary/50";
    if (v === 1) return "bg-[color-mix(in_oklab,var(--electric)_20%,transparent)]";
    if (v === 2) return "bg-[color-mix(in_oklab,var(--electric)_45%,transparent)]";
    if (v === 3) return "bg-[color-mix(in_oklab,var(--electric)_70%,transparent)]";
    return "bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]";
  };

  return (
    <section className="relative px-6 py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-sm font-mono uppercase tracking-widest text-[var(--electric)]">
              — Momentum
            </div>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Shipping every day — <span className="text-gradient">a year in code</span>.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <Stat icon={GitCommit} label="Contributions" value={`${total}+`} />
            <Stat icon={Flame} label="Current streak" value={`${streak}d`} />
            <Stat icon={Zap} label="Best streak" value={`${best}d`} />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(10px, 1fr))` }}
          >
            {Array.from({ length: WEEKS }).map((_, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {Array.from({ length: DAYS }).map((_, d) => {
                  const idx = w * DAYS + d;
                  const v = cells[idx];
                  const delay = inView ? (w * 12 + d * 6) : 0;
                  return (
                    <div
                      key={d}
                      title={`${v} contribution${v === 1 ? "" : "s"}`}
                      className={`aspect-square rounded-[3px] transition-all duration-500 hover:scale-[1.6] hover:z-10 ${
                        inView ? shade(v) : "bg-secondary/30"
                      }`}
                      style={{
                        transitionDelay: `${delay}ms`,
                        opacity: inView ? 1 : 0,
                        transform: inView ? "scale(1)" : "scale(0.4)",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> Last 52 weeks
            </span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((v) => (
                <span key={v} className={`h-2.5 w-2.5 rounded-[2px] ${shade(v)}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 px-3 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3 text-[var(--electric)]" />
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}
