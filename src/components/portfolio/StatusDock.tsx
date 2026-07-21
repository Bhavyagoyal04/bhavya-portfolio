import { useEffect, useState } from "react";
import { Clock, Wifi } from "lucide-react";

export function StatusDock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[90] hidden items-center gap-3 rounded-full border border-border bg-card/70 px-3 py-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
      </span>
      <span className="text-foreground/80">Available for work</span>
      <span className="h-3 w-px bg-border" />
      <Clock className="h-3 w-3 text-[var(--electric)]" />
      <span className="tabular-nums text-foreground/70">{time} IST</span>
      <span className="h-3 w-px bg-border" />
      <Wifi className="h-3 w-3 text-[var(--neon)]" />
      <span>online</span>
    </div>
  );
}
