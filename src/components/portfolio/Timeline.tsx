import { Briefcase, Sparkles } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

const ITEMS = [
  {
    company: "Xebia",
    role: "Summer Intern",
    period: "Jun 2026 – Present",
    points: [
      "Built the centralized Xebia Exam Platform handling 5,000+ concurrent submissions.",
      "Optimized the LMS backend, reducing API latency by 25%.",
    ],
    accent: "var(--electric)",
    glow: "var(--electric)",
  },
  {
    company: "Universia Space Technology Pvt. Ltd.",
    role: "Summer Intern",
    period: "2025",
    points: [
      "Developed 5+ responsive front-end features shipped to production.",
      "Reduced overall page load time by 20% through targeted optimizations.",
    ],
    accent: "var(--neon)",
    glow: "var(--neon)",
  },
  {
    company: "State Bank of India",
    role: "Summer Intern",
    period: "2024",
    points: [
      "Evaluated weak loan accounts and proposed AI predictive models.",
      "Improved NPA identification efficiency by 25%.",
    ],
    accent: "var(--electric)",
    glow: "var(--electric)",
  },
];

export function Timeline() {
  return (
    <section id="experience" className="relative px-6 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--neon)]">
            02 — Experience
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            A trail of <span className="text-gradient animate-gradient">shipped</span> systems.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Scroll — each role stacks on the last.
          </p>
        </div>

        <div className="relative">
          {ITEMS.map((item, i) => (
            <div
              key={item.company}
              className="sticky-card"
              style={{
                top: `calc(14vh + ${i * 28}px)`,
                zIndex: 10 + i,
                marginBottom: i === ITEMS.length - 1 ? 0 : "60vh",
              }}
            >
              <SpotlightCard
                glowColor={item.glow}
                className="rounded-3xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              >
                <article className="shine-on-hover relative overflow-hidden rounded-3xl p-8 sm:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-white shadow-[0_0_30px_var(--electric)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      <Sparkles className="h-3 w-3" style={{ color: item.accent }} />
                      {item.period}
                    </div>
                  </div>

                  <div className="mt-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {item.role}
                  </div>
                  <h3
                    className="mt-2 text-3xl sm:text-4xl font-semibold transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--electric)] group-hover:to-[var(--neon)]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {item.company}
                  </h3>

                  <ul className="mt-6 space-y-3 text-base text-muted-foreground">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}` }}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
