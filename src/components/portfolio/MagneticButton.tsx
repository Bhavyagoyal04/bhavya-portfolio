import { useRef, ReactNode, MouseEvent, ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: ElementType;
  strength?: number;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  as,
  strength = 0.35,
  type,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const Comp: ElementType = as || (href ? "a" : "button");
  const extra: Record<string, unknown> = href
    ? { href }
    : { type: type || "button", onClick };

  return (
    <Comp
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform transition-transform duration-300 ease-out ${className}`}
      {...extra}
    >
      {children}
    </Comp>
  );
}
