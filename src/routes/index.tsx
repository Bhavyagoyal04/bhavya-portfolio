import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { Timeline } from "@/components/portfolio/Timeline";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Cursor } from "@/components/portfolio/Cursor";
import { MeshBackground } from "@/components/portfolio/MeshBackground";
import { Reveal } from "@/components/portfolio/Reveal";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Confetti, type ConfettiHandle } from "@/components/portfolio/Confetti";
import { AccentSwitcher } from "@/components/portfolio/AccentSwitcher";
import { SectionRail } from "@/components/portfolio/SectionRail";
import { PageLoader } from "@/components/portfolio/PageLoader";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const confettiRef = useRef<ConfettiHandle | null>(null);
  const fire = () => confettiRef.current?.fire();

  useEffect(() => {
    // Global confetti event (used by Contact form)
    const handler = () => fire();
    window.addEventListener("portfolio:confetti", handler);

    // Konami code easter egg
    const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let idx = 0;
    const key = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === code[idx].toLowerCase()) {
        idx++;
        if (idx === code.length) { fire(); idx = 0; }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("portfolio:confetti", handler);
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageLoader />
      <MeshBackground />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[60]" />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <SectionRail />

      <main className="relative z-10">
        <Hero />
        <Reveal><Stats /></Reveal>
        <Reveal><Timeline /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Achievements /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>

      <BackToTop />
      <AccentSwitcher />
      <CommandPalette onConfetti={fire} />
      <Confetti triggerRef={confettiRef} />
    </div>
  );
}
