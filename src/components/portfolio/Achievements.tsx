import { Award, Trophy, HeartHandshake } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";


const CERTS = [
  { name: "AWS Cloud Quest: Cloud Practitioner", year: "2026" },
  { name: "Google Cloud Fundamentals: Core Infrastructure", year: "2026" },
  { name: "Prompt Design in Vertex AI", year: "2026" },
  { name: "Generative AI & Responsible AI Badges", year: "2026" },
  { name: "Amazon Connect Development Fundamentals", year: "2026" },
  { name: "Full Stack Web Development (MERN) — Apna College", year: "2024" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto mb-14 max-w-6xl px-6">
        <div className="text-sm font-mono uppercase tracking-widest text-[var(--neon)]">
          04 — Achievements
        </div>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
          Certified & <span className="text-gradient">recognized</span>.
        </h2>
      </div>

      {/* Marquee */}
      <div className="pause-on-hover relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-4">
          {[...CERTS, ...CERTS].map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium whitespace-nowrap"
            >
              <Award className="h-4 w-4 text-[var(--electric)]" />
              {c}
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">
                2026
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-6 md:grid-cols-2">
        <SpotlightCard className="rounded-2xl border border-border bg-card" glowColor="var(--electric)">
          <div className="shine-on-hover rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Hackathon
                </div>
                <div className="font-semibold">Smart India Hackathon 2025</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Built <span className="text-foreground">EDUBhasha</span>, a multilingual
              chatbot designed to bridge language barriers in education.
            </p>
          </div>
        </SpotlightCard>
        <SpotlightCard className="rounded-2xl border border-border bg-card" glowColor="var(--neon)">
          <div className="shine-on-hover rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon)] to-[var(--electric)] text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Community
                </div>
                <div className="font-semibold">NGO Volunteer</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Volunteering with local NGOs on education & digital-literacy initiatives.
            </p>
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
