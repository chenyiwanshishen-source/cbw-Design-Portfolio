import { useEffect } from "react";
import { Hero } from "./Hero";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { hideContactDetails } from "../buildVariant";

interface HomeContentProps {
  view: "home" | "about";
}

export function HomeContent({ view }: HomeContentProps) {
  useEffect(() => {
    const mountScrollFrame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(mountScrollFrame);
  }, [view]);

  return (
    <div className={view === "about" ? "about-scroll-flow" : undefined}>
      {view === "home" ? (
        <Hero />
      ) : (
        <>
          <div className="about-overview-flow">
            <Experience />
            <Skills />
          </div>

          {!hideContactDetails && <Contact />}
        </>
      )}
    </div>
  );
}
