import { useRef, ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glowColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  tilt = true,
  glowColor = "var(--electric)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    el.style.setProperty("--mx", `${px}%`);
    el.style.setProperty("--my", `${py}%`);
    if (tilt) {
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 8;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          transform:
            "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition: "transform 0.3s cubic-bezier(0.2,0.8,0.2,1)",
          transformStyle: "preserve-3d",
          "--glow": glowColor,
        } as React.CSSProperties
      }
      className={`spotlight-card group relative ${className}`}
    >
      {children}
    </div>
  );
}
