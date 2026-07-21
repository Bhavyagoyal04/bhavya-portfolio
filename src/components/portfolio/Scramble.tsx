import { useEffect, useRef, useState, ReactNode } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCXYZ";

export function Scramble({ text, className, as: Tag = "span" }: { text: string; className?: string; as?: keyof JSX.IntrinsicElements }) {
  const ref = useRef<HTMLElement>(null);
  const [out, setOut] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();

    function run() {
      const target = text;
      const duration = 900;
      const start = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(p * target.length);
        let s = "";
        for (let i = 0; i < target.length; i++) {
          if (i < revealed || target[i] === " ") s += target[i];
          else s += CHARS[(Math.random() * CHARS.length) | 0];
        }
        setOut(s);
        if (p < 1) requestAnimationFrame(frame);
        else setOut(target);
      };
      requestAnimationFrame(frame);
    }
  }, [text]);

  const Component: any = Tag;
  return (
    <Component ref={ref} className={className}>
      {out as ReactNode}
    </Component>
  );
}
