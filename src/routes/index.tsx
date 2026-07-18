import { createFileRoute } from "@tanstack/react-router";
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
import { MarqueeDivider } from "@/components/portfolio/MarqueeDivider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[60]" />
      <Cursor />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Stats />
        <Timeline />
        <MarqueeDivider />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}
