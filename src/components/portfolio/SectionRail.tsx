import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group relative flex items-center justify-end gap-3"
          aria-label={s.label}
        >
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-border bg-card/80 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground opacity-0 backdrop-blur-md transition group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className={`h-2 rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-8 bg-[var(--electric)] shadow-[0_0_12px_var(--electric)]"
                : "w-2 bg-border group-hover:w-4 group-hover:bg-muted-foreground"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
