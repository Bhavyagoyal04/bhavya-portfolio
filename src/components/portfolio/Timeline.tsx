import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

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
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll("[data-idx]") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        setActiveSet((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (e.isIntersecting) next.add(idx);
          });
          return next;
        });
      },
      { threshold: 0.5 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--neon)]">
            02 — Experience
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            A trail of <span className="text-gradient">shipped</span> systems.
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--electric)] via-[var(--neon)] to-transparent md:left-1/2" />

          <div className="space-y-14">
            {ITEMS.map((item, i) => {
              const active = activeSet.has(i);
              return (
                <div
                  key={item.company}
                  data-idx={i}
                  className={`relative grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  {/* Node */}
                  <div
                    className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 md:left-1/2"
                    style={{
                      borderColor: item.accent,
                      background: active ? item.accent : "var(--background)",
                      boxShadow: active ? `0 0 20px ${item.accent}` : "none",
                    }}
                  />

                  <div
                    className={`glow-border ml-12 rounded-2xl bg-card p-6 transition-all duration-700 md:ml-0 ${
                      active ? "opacity-100 translate-y-0" : "opacity-40 translate-y-6"
                    } ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{item.company}</h3>
                    <div className="text-sm text-muted-foreground">{item.role}</div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: item.accent }}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
