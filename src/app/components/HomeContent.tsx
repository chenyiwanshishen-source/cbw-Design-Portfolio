import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import type { preloadProjectDetailAssets } from "../projectPreload";

interface HomeContentProps {
  onProjectIntent: typeof preloadProjectDetailAssets;
}

export function HomeContent({ onProjectIntent }: HomeContentProps) {
  return (
    <>
      <Hero />
      <Projects onProjectIntent={onProjectIntent} />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
