import { ArrowUpRight, Video, Phone, FileText, Boxes, GraduationCap, UtensilsCrossed } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

const FEATURED = [
  {
    title: "DevStream",
    icon: Video,
    tag: "Real-Time · Full-Stack",
    desc: "A full-stack coding interview platform with real-time video calls, a collaborative code editor powered by the Judge0 API, and Inngest for async scalability.",
    stack: ["Next.js", "WebRTC", "Judge0", "Inngest"],
    glow: "var(--electric)",
  },
  {
    title: "Friend's Call",
    icon: Phone,
    tag: "WebRTC · Socket.IO",
    desc: "Real-time WebRTC and Socket.IO video calling platform with an automated room cleanup mechanism that improved stability by 30%.",
    stack: ["WebRTC", "Socket.IO", "Node.js"],
    glow: "var(--neon)",
  },
  {
    title: "Prescription Analyzer",
    icon: FileText,
    tag: "AI · OCR",
    desc: "An AI-powered analyzer using the Gemini API and OCR to extract 5+ key medical attributes from prescription images.",
    stack: ["Gemini API", "OCR", "React"],
    glow: "var(--neon)",
  },
  {
    title: "Mobile Store Inventory",
    icon: Boxes,
    tag: "Microservices",
    desc: "Distributed e-commerce microservices built with Spring Boot, Spring Cloud, and Netflix Eureka for service discovery.",
    stack: ["Spring Boot", "Spring Cloud", "Eureka"],
    glow: "var(--electric)",
  },
];

const MINOR = [
  { title: "School Management System", icon: GraduationCap, tag: "Java · MySQL" },
  { title: "Restaurant Finder", icon: UtensilsCrossed, tag: "React · APIs" },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--electric)]">
            03 — Selected work
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Projects with <span className="text-gradient">real users</span>.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Scroll — each project stacks on the last.
          </p>
        </div>

        {/* Sticky stacked cards */}
        <div className="relative">
          {FEATURED.map((p, i) => (
            <div
              key={p.title}
              className="sticky-card"
              style={{
                top: `calc(12vh + ${i * 28}px)`,
                zIndex: 10 + i,
                marginBottom: i === FEATURED.length - 1 ? 0 : "18vh",
              }}
            >
              <SpotlightCard
                glowColor={p.glow}
                className="rounded-3xl border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              >
                <article
                  className="shine-on-hover relative overflow-hidden rounded-3xl p-8 sm:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-white shadow-[0_0_30px_var(--electric)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        <p.icon className="h-6 w-6" />
                      </div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {String(i + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}
                      </div>
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--electric)]" />
                  </div>

                  <div className="mt-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </div>
                  <h3
                    className="mt-2 text-3xl sm:text-4xl font-semibold transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--electric)] group-hover:to-[var(--neon)]"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--electric)] hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 gap-5 sm:grid-cols-2 pb-24">
          {MINOR.map((m, i) => (
            <div
              key={m.title}
              className="hover-ring shine-on-hover group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-card"
              style={{ animation: `reveal-up 0.6s ease-out ${(i + 4) * 0.08}s both` }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-[var(--electric)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <m.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{m.title}</div>
                <div className="text-xs text-muted-foreground">{m.tag}</div>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--electric)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
