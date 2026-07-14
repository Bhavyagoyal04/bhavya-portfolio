import { ArrowUpRight, Video, Phone, FileText, Boxes, GraduationCap, UtensilsCrossed } from "lucide-react";

const FEATURED = [
  {
    title: "DevStream",
    icon: Video,
    tag: "Real-Time · Full-Stack",
    desc: "A full-stack coding interview platform with real-time video calls, a collaborative code editor powered by the Judge0 API, and Inngest for async scalability.",
    stack: ["Next.js", "WebRTC", "Judge0", "Inngest"],
  },
  {
    title: "Friend's Call",
    icon: Phone,
    tag: "WebRTC · Socket.IO",
    desc: "Real-time WebRTC and Socket.IO video calling platform with an automated room cleanup mechanism that improved stability by 30%.",
    stack: ["WebRTC", "Socket.IO", "Node.js"],
  },
  {
    title: "Prescription Analyzer",
    icon: FileText,
    tag: "AI · OCR",
    desc: "An AI-powered analyzer using the Gemini API and OCR to extract 5+ key medical attributes from prescription images.",
    stack: ["Gemini API", "OCR", "React"],
  },
  {
    title: "Mobile Store Inventory",
    icon: Boxes,
    tag: "Microservices",
    desc: "Distributed e-commerce microservices built with Spring Boot, Spring Cloud, and Netflix Eureka for service discovery.",
    stack: ["Spring Boot", "Spring Cloud", "Eureka"],
  },
];

const MINOR = [
  { title: "School Management System", icon: GraduationCap, tag: "Java · MySQL" },
  { title: "Restaurant Finder", icon: UtensilsCrossed, tag: "React · APIs" },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--electric)]">
            03 — Selected work
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Projects with <span className="text-gradient">real users</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURED.map((p, i) => (
            <article
              key={p.title}
              className="card-tilt group relative overflow-hidden rounded-2xl border border-border bg-card p-7"
              style={{ animation: `reveal-up 0.6s ease-out ${i * 0.08}s both` }}
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--electric)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--neon)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-white shadow-[0_0_20px_var(--electric)]">
                  <p.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--electric)]" />
              </div>

              <div className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {MINOR.map((m, i) => (
            <div
              key={m.title}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition hover:border-[var(--electric)]/50 hover:bg-card"
              style={{ animation: `reveal-up 0.6s ease-out ${(i + 4) * 0.08}s both` }}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-[var(--electric)]">
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
