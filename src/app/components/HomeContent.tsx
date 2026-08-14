import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Hero } from "./Hero";
import { Skills } from "./Skills";
import { Experience } from "./Experience";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { hideContactDetails } from "../buildVariant";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomeContentProps {
  view: "home" | "about";
}

export function HomeContent({ view }: HomeContentProps) {
  const storyRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const story = storyRef.current;
      if (!story) return;

      window.scrollTo({ top: 0, behavior: "auto" });
      const mountScrollFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop?: boolean;
            reduceMotion?: boolean;
          };
          if (!desktop) return;

          const panels = gsap.utils.toArray<HTMLElement>("[data-home-panel]", story);
          if (panels.length < 2) return;
          const cleanups: Array<() => void> = [];

          if (!reduceMotion) {
            panels.slice(1).forEach((panel) => {
              const content = panel.querySelector<HTMLElement>("[data-home-panel-content]");
              if (!content) return;

              gsap.fromTo(
                content,
                { autoAlpha: 0.68, y: 64 },
                {
                  autoAlpha: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top 88%",
                    end: "top 52%",
                    scrub: 0.32,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });

            const snapTrigger = ScrollTrigger.create({
              id: "home-panel-snap",
              trigger: story,
              start: "top top",
              end: "bottom bottom",
              invalidateOnRefresh: true,
              refreshPriority: 20,
              snap: {
                snapTo: (progress, self) => {
                  if (
                    window.innerWidth < 1024 ||
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ) {
                    return progress;
                  }

                  const scrollRange = Math.max(1, story.scrollHeight - window.innerHeight);
                  const currentOffset = progress * scrollRange;
                  const readingLongPanel = panels.some((panel) => {
                    if (panel.offsetHeight <= window.innerHeight * 1.08) return false;

                    const panelStart = panel.offsetTop;
                    const readableStart = panelStart + 1;
                    const readableEnd = panelStart + panel.offsetHeight - window.innerHeight * 0.84;
                    return currentOffset > readableStart && currentOffset < readableEnd;
                  });

                  if (readingLongPanel) return progress;

                  const snapPoints = panels.map((panel) =>
                    gsap.utils.clamp(0, 1, panel.offsetTop / scrollRange)
                  );
                  const nearestPoint = gsap.utils.snap(snapPoints, progress);
                  if (Math.abs(nearestPoint - progress) < 0.006) {
                    return nearestPoint;
                  }

                  const direction = self?.direction ?? 1;
                  if (direction > 0) {
                    return snapPoints.find((point) => point > progress + 0.002) ?? 1;
                  }

                  return [...snapPoints].reverse().find((point) => point < progress - 0.002) ?? 0;
                },
                duration: { min: 0.18, max: 0.42 },
                delay: 0.06,
                ease: "power2.inOut",
                inertia: false,
              },
            });

            cleanups.push(() => snapTrigger.kill());
          }

          const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
          return () => {
            window.cancelAnimationFrame(refreshFrame);
            cleanups.forEach((cleanup) => cleanup());
          };
        }
      );

      return () => {
        window.cancelAnimationFrame(mountScrollFrame);
        media.revert();
      };
    },
    { scope: storyRef }
  );

  return (
    <div ref={storyRef} className="home-scroll-story">
      {view === "home" ? (
        <div className="home-scroll-panel" data-home-panel data-home-panel-name="intro">
          <div data-home-panel-content>
            <Hero />
          </div>
        </div>
      ) : (
        <>
          <div className="home-scroll-panel" data-home-panel data-home-panel-name="experience">
            <div data-home-panel-content>
              <Experience />
            </div>
          </div>

          <div className="home-scroll-panel" data-home-panel data-home-panel-name="skills">
            <div data-home-panel-content>
              <Skills />
            </div>
          </div>

          <div className="home-scroll-panel" data-home-panel data-home-panel-name="contact">
            <div data-home-panel-content>
              {!hideContactDetails && <Contact />}
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
