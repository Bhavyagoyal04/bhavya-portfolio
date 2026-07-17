import { useEffect, useRef, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { TypeCycle } from "./TypeCycle";


export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Animated grid background */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      {/* Cursor-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--electric) 25%, transparent), transparent 60%)`,
        }}
      />
      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[var(--electric)] opacity-20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute right-[10%] bottom-[15%] h-96 w-96 rounded-full bg-[var(--neon)] opacity-20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm animate-reveal">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--electric)]" />
          </span>
          Available for opportunities · 2026
        </div>

        <h1
          className="mt-6 text-6xl font-bold leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl lg:text-[9rem] animate-reveal"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-gradient animate-gradient">Bhavya Goyal</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl md:text-2xl animate-reveal"
          style={{ animationDelay: "0.3s" }}
        >
          Building{" "}
          <TypeCycle
            className="font-semibold text-foreground"
            words={[
              "high-performance full-stack apps",
              "real-time WebRTC systems",
              "Spring Boot microservices",
              "AI-powered platforms",
            ]}
          />
        </p>


        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-reveal"
          style={{ animationDelay: "0.45s" }}
        >
          <MagneticButton
            href="#projects"
            className="btn-glow shine-on-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            View My Work <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="glow-border inline-flex items-center gap-2 rounded-full bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-card"
          >
            Get In Touch
          </MagneticButton>

        </div>

        <div
          className="mt-12 flex items-center justify-center gap-3 animate-reveal"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { icon: Github, href: "https://github.com/", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:bhavyagoyal30122005@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }, i) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="group grid h-12 w-12 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition hover:-translate-y-1 hover:border-[var(--electric)] hover:text-foreground hover:shadow-[0_0_20px_var(--electric)] animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <Icon className="h-5 w-5 transition group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-[var(--electric)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
