import { useEffect, useRef, useState } from "react";

export function MeshBackground() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tx = 50, ty = 50, cx = 50, cy = 50;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      setPos({ x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -inset-40 opacity-70"
        style={{
          background: `
            radial-gradient(600px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--electric) 22%, transparent), transparent 55%),
            radial-gradient(700px circle at ${100 - pos.x}% ${100 - pos.y}%, color-mix(in oklab, var(--neon) 18%, transparent), transparent 55%)
          `,
          filter: "blur(40px)",
        }}
      />
      <div className="aurora absolute -inset-40 opacity-30" />
    </div>
  );
}
