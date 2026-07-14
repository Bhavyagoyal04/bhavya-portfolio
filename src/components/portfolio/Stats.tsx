import { useEffect, useRef, useState } from "react";
import { Code2, Trophy, GraduationCap } from "lucide-react";

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.floor(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);

  return { value, ref };
}

const CATEGORIES = [
  {
    label: "Languages",
    items: ["Java", "C", "C++", "Python"],
  },
  {
    label: "Frameworks & Architecture",
    items: [
      "Express.js",
      "Next.js",
      "Spring Boot",
      "Spring Cloud",
      "Microservices",
      "Event-Driven",
    ],
  },
  {
    label: "Full-Stack & Tools",
    items: [
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Node.js",
      "WebRTC",
      "Socket.IO",
      "AWS",
      "GCP",
      "MongoDB",
    ],
  },
];

export function Stats() {
  const problems = useCountUp(700);
  const rank = useCountUp(48);
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--electric)]">
            01 — At a glance
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Numbers that <span className="text-gradient">move</span>.
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div
            ref={problems.ref}
            className="glow-border relative col-span-1 overflow-hidden rounded-2xl bg-card p-8 md:col-span-3"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Code2 className="h-5 w-5 text-[var(--electric)]" />
              <span className="text-sm font-medium">DSA Problems Solved</span>
            </div>
            <div className="mt-6 text-7xl font-bold tabular-nums text-gradient">
              {problems.value}+
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Across LeetCode, GFG & competitive platforms.
            </p>
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[var(--electric)] opacity-10 blur-3xl" />
          </div>

          <div
            ref={rank.ref}
            className="glow-border relative col-span-1 overflow-hidden rounded-2xl bg-card p-8 md:col-span-3"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Trophy className="h-5 w-5 text-[var(--neon)]" />
              <span className="text-sm font-medium">College Rank</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <div className="text-7xl font-bold tabular-nums text-gradient">
                #{rank.value}
              </div>
              <div className="text-sm text-muted-foreground">on GeeksforGeeks</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Ranked among top problem solvers at UPES.
            </p>
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[var(--neon)] opacity-10 blur-3xl" />
          </div>

          <div className="glow-border relative col-span-1 overflow-hidden rounded-2xl bg-card p-8 md:col-span-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <GraduationCap className="h-5 w-5 text-[var(--electric)]" />
              <span className="text-sm font-medium">Education</span>
            </div>
            <div className="mt-4 text-2xl font-semibold sm:text-3xl">
              B.Tech in Computer Science Engineering
            </div>
            <div className="mt-1 text-muted-foreground">
              UPES Dehradun · Specialization in Full-Stack Development
            </div>
          </div>
        </div>

        {/* Tech tabs */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold">Tech Stack</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active === i
                    ? "border-transparent bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-white shadow-[0_0_20px_var(--electric)]"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {CATEGORIES[active].items.map((item, i) => (
              <div
                key={item}
                className="group relative rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition hover:-translate-y-1 hover:border-[var(--electric)]"
                style={{
                  animation: `reveal-up 0.4s ease-out ${i * 0.04}s both`,
                }}
              >
                <span className="relative z-10">{item}</span>
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--electric)]/10 to-[var(--neon)]/10 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
