import { useEffect, useRef } from "react";

export type ConfettiHandle = { fire: () => void };

export function Confetti({ triggerRef }: { triggerRef: React.MutableRefObject<ConfettiHandle | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#3b82f6", "#a855f7", "#22d3ee", "#f472b6", "#fde047"];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.life / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
        ctx.restore();
        p.life++;
      });
      particles = particles.filter((p) => p.life < 180 && p.y < canvas.height + 40);
      if (particles.length) raf = requestAnimationFrame(loop);
    };

    triggerRef.current = {
      fire: () => {
        const cx = canvas.width / 2;
        const cy = canvas.height / 3;
        for (let i = 0; i < 160; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 6 + Math.random() * 10;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed * devicePixelRatio,
            vy: Math.sin(angle) * speed * devicePixelRatio - 4 * devicePixelRatio,
            size: (6 + Math.random() * 8) * devicePixelRatio,
            color: colors[(Math.random() * colors.length) | 0],
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.4,
            life: 0,
          });
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      },
    };

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [triggerRef]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[300]" />;
}
