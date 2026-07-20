import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-4 z-50 mx-auto flex max-w-4xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6 ${
        scrolled
          ? "border border-border bg-card/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          : "border border-transparent"
      }`}
      style={{ width: "calc(100% - 2rem)" }}
    >
      <a href="#home" className="flex items-center gap-2 font-semibold">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--electric)] to-[var(--neon)] text-sm text-white shadow-[0_0_20px_var(--electric)]">
          BG
        </span>
        <span className="hidden sm:inline">Bhavya</span>
      </a>
      <div className="hidden items-center gap-1 md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          className="hidden items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex"
          aria-label="Open command palette"
        >
          <span>Quick nav</span>
          <span className="kbd-hint">⌘K</span>
        </button>
        <a
          href="#contact"
          className="btn-glow inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm"
        >
          Hire me
        </a>
      </div>
    </nav>
  );
}
