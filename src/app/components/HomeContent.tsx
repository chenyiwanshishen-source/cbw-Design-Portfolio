import { useEffect } from "react";
import { Hero } from "./Hero";
import { AboutIntro } from "./AboutIntro";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { hideContactDetails } from "../buildVariant";

interface HomeContentProps {
  view?: "home" | "about";
}

export function HomeContent({ view }: HomeContentProps) {
  useEffect(() => {
    const mountScrollFrame = window.requestAnimationFrame(() => {
      if (view === "about" || window.location.hash === "#about") {
        const aboutEl = document.getElementById("about-intro");
        if (aboutEl) {
          aboutEl.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(mountScrollFrame);
  }, [view]);

  return (
    <div className="home-scroll-flow">
      {/* 1. Hero First Screen (Projects Carousel & Interactive Stage) */}
      <Hero />

      {/* 2. Full About Me, Work Experience & Capabilities directly below Hero */}
      <div id="about-section" className="about-overview-flow">
        <AboutIntro />
        <Experience />
        <Skills />
      </div>

      {!hideContactDetails && <Contact />}
    </div>
  );
}
