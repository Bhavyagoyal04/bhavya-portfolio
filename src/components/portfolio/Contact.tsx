import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Send, Github, Linkedin } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contact" className="relative px-6 py-24">
      <div ref={ref} className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="text-sm font-mono uppercase tracking-widest text-[var(--electric)]">
            05 — Contact
          </div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            Let's build something <span className="text-gradient">together</span>.
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            window.dispatchEvent(new CustomEvent("portfolio:confetti"));
            setTimeout(() => setSent(false), 3000);
          }}
          className={`glow-border rounded-3xl bg-card p-6 sm:p-10 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Name
              </span>
              <input
                required
                className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--electric)_25%,transparent)]"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Email
              </span>
              <input
                required
                type="email"
                className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--electric)_25%,transparent)]"
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Message
            </span>
            <textarea
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--electric)_25%,transparent)]"
              placeholder="Tell me about your project..."
            />
          </label>
          <button
            type="submit"
            onClick={(e) => {
              const btn = e.currentTarget;
              const rect = btn.getBoundingClientRect();
              const r = document.createElement("span");
              const size = Math.max(rect.width, rect.height);
              r.className = "ripple";
              r.style.width = r.style.height = `${size}px`;
              r.style.left = `${e.clientX - rect.left - size / 2}px`;
              r.style.top = `${e.clientY - rect.top - size / 2}px`;
              btn.appendChild(r);
              setTimeout(() => r.remove(), 700);
            }}
            className="btn-glow shine-on-hover relative overflow-hidden mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            {sent ? "Sent! I'll reply soon." : (<>Send message <Send className="h-4 w-4" /></>)}
          </button>


          <div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
            <a
              href="mailto:bhavyagoyal30122005@gmail.com"
              className="group flex items-center gap-2 transition hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-[var(--electric)] transition group-hover:scale-110" />
              bhavyagoyal30122005@gmail.com
            </a>
            <a
              href="tel:+917454094320"
              className="group flex items-center gap-2 transition hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-[var(--neon)] transition group-hover:scale-110" />
              +91 74540 94320
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 transition hover:text-foreground">
              <Github className="h-4 w-4 transition group-hover:scale-110" /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 transition hover:text-foreground">
              <Linkedin className="h-4 w-4 transition group-hover:scale-110" /> LinkedIn
            </a>
          </div>
        </form>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          © 2026 Bhavya Goyal · Crafted with care.
        </footer>
      </div>
    </section>
  );
}
