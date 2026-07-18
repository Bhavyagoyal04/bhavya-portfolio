export function MarqueeDivider({ text = "Full-Stack · Real-Time · Microservices · AI · WebRTC · Cloud" }: { text?: string }) {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/30 py-6">
      <div className="pause-on-hover flex">
        <div className="marquee-track flex shrink-0 gap-10 whitespace-nowrap pr-10">
          {items.map((i) => (
            <span
              key={i}
              className="text-4xl font-bold uppercase tracking-tight sm:text-6xl"
              style={{
                WebkitTextStroke: "1px color-mix(in oklab, var(--electric) 60%, transparent)",
                color: i % 2 === 0 ? "transparent" : "var(--foreground)",
              }}
            >
              {text} ✦
            </span>
          ))}
        </div>
        <div className="marquee-track flex shrink-0 gap-10 whitespace-nowrap pr-10" aria-hidden>
          {items.map((i) => (
            <span
              key={i}
              className="text-4xl font-bold uppercase tracking-tight sm:text-6xl"
              style={{
                WebkitTextStroke: "1px color-mix(in oklab, var(--electric) 60%, transparent)",
                color: i % 2 === 0 ? "transparent" : "var(--foreground)",
              }}
            >
              {text} ✦
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
