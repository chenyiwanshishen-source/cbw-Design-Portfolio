import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProjectCardProps {
  number: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  highlights: string[];
  accent: string;
  index: number;
  href?: string;
  onIntent?: () => void;
  visual?: "previewStack" | "qixinPreviewStack";
}

function ScreenshotPlaceholder({ variant }: { variant: "list" | "report" | "chart" }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px] bg-[#FAFBFF]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#E6E7EB] px-4">
        <span className="size-2 rounded-full bg-[#0D800D]" />
        <span className="size-2 rounded-full bg-[#64BC64]" />
        <span className="size-2 rounded-full bg-[#E3F5E3]" />
        <span className="ml-4 h-2.5 w-24 rounded-full bg-[#E6E7EB]" />
      </div>
      {variant === "list" && (
        <div className="grid h-[calc(100%-2rem)] grid-cols-[56px_1fr]">
          <div className="border-r border-[#E6E7EB] bg-[#F5F5F7] px-3 py-4">
            <div className="mb-4 h-2 w-7 rounded-full bg-[#0D800D]" />
            <div className="space-y-3">
              <div className="h-2 w-8 rounded-full bg-[#CBCDD4]" />
              <div className="h-2 w-6 rounded-full bg-[#E6E7EB]" />
              <div className="h-2 w-9 rounded-full bg-[#E6E7EB]" />
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4 h-3 w-28 rounded-full bg-[#4E525E]/20" />
            <div className="space-y-2.5">
              {[0, 1, 2].map((item) => (
                <div key={item} className="grid grid-cols-[14px_1fr_38px] items-center gap-2 rounded-lg bg-[#F5F5F7] px-2.5 py-2">
                  <span className="size-3 rounded-full border border-[#64BC64] bg-[#E3F5E3]" />
                  <span className="h-2 rounded-full bg-[#DDE6DD]" />
                  <span className="h-2 rounded-full bg-[#64BC64]/55" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {variant === "report" && (
        <div className="p-4">
          <div className="mb-4 space-y-2">
            <div className="h-3 w-28 rounded-full bg-[#4E525E]/18" />
            <div className="h-2.5 w-36 rounded-full bg-[#E6E7EB]" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="h-10 rounded-xl bg-[#E3F5E3]" />
            <div className="h-10 rounded-xl bg-[#F5F5F7]" />
            <div className="h-10 rounded-xl bg-[#F5F5F7]" />
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="h-2.5 w-full rounded-full bg-[#DDE6DD]" />
            <div className="h-2.5 w-[82%] rounded-full bg-[#64BC64]/45" />
            <div className="h-2.5 w-[62%] rounded-full bg-[#E6E7EB]" />
          </div>
        </div>
      )}
      {variant === "chart" && (
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-[#4E525E]/18" />
            <div className="h-5 w-12 rounded-full bg-[#E3F5E3]" />
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-[#E6E7EB] bg-white p-3">
              <div className="mb-3 h-2.5 w-20 rounded-full bg-[#CBCDD4]" />
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-[#64BC64]/45" />
                <div className="h-2.5 w-[76%] rounded-full bg-[#E6E7EB]" />
                <div className="h-2.5 w-[58%] rounded-full bg-[#E6E7EB]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="h-9 rounded-xl bg-[#E3F5E3]" />
              <div className="h-9 rounded-xl bg-[#F5F5F7]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QixinScreenshotPlaceholder({ variant }: { variant: "map" | "monitor" | "cluster" }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[20px] bg-[#FAFBFF]">
      <div className="flex h-8 items-center gap-1.5 border-b border-[#E6E7EB] px-4">
        <span className="size-2 rounded-full bg-[#2258F4]" />
        <span className="size-2 rounded-full bg-[#618AFF]" />
        <span className="size-2 rounded-full bg-[#DDE7FF]" />
        <span className="ml-4 h-2.5 w-24 rounded-full bg-[#E6E7EB]" />
      </div>

      {variant === "map" && (
        <div className="grid h-[calc(100%-2rem)] grid-cols-[58px_1fr]">
          <div className="border-r border-[#E6E7EB] bg-[#F5F5F7] px-3 py-4">
            <div className="mb-4 h-2 w-7 rounded-full bg-[#2258F4]" />
            <div className="space-y-3">
              <div className="h-2 w-8 rounded-full bg-[#B9C8FF]" />
              <div className="h-2 w-6 rounded-full bg-[#E6E7EB]" />
              <div className="h-2 w-9 rounded-full bg-[#E6E7EB]" />
            </div>
          </div>
          <div className="relative p-4">
            <div className="mb-3 h-3 w-28 rounded-full bg-[#4E525E]/18" />
            <div className="grid grid-cols-2 gap-2.5">
              <div className="h-11 rounded-xl bg-[#DDE7FF]" />
              <div className="h-11 rounded-xl bg-[#F5F5F7]" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <span className="h-14 rounded-xl bg-[#EEF3FF]" />
              <span className="h-14 rounded-xl bg-[#DDE7FF]" />
              <span className="h-14 rounded-xl bg-[#EEF3FF]" />
            </div>
          </div>
        </div>
      )}

      {variant === "monitor" && (
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-[#4E525E]/18" />
            <div className="h-5 w-12 rounded-full bg-[#DDE7FF]" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="h-10 rounded-xl bg-[#DDE7FF]" />
            <div className="h-10 rounded-xl bg-[#F5F5F7]" />
            <div className="h-10 rounded-xl bg-[#F5F5F7]" />
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="h-2.5 w-full rounded-full bg-[#B9C8FF]" />
            <div className="h-2.5 w-[84%] rounded-full bg-[#618AFF]/55" />
            <div className="h-2.5 w-[68%] rounded-full bg-[#E6E7EB]" />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_42px] gap-2.5">
            <div className="h-8 rounded-xl bg-[#EEF3FF]" />
            <div className="h-8 rounded-xl bg-[#2258F4]/15" />
          </div>
        </div>
      )}

      {variant === "cluster" && (
        <div className="p-4">
          <div className="mb-4 space-y-2">
            <div className="h-3 w-28 rounded-full bg-[#4E525E]/18" />
            <div className="h-2.5 w-36 rounded-full bg-[#E6E7EB]" />
          </div>
          <div className="grid grid-cols-[52px_1fr] gap-3">
            <div className="space-y-2.5">
              <div className="h-8 rounded-xl bg-[#2258F4]" />
              <div className="h-8 rounded-xl bg-[#DDE7FF]" />
              <div className="h-8 rounded-xl bg-[#F5F5F7]" />
            </div>
            <div className="space-y-2.5">
              {[0, 1, 2].map((item) => (
                <div key={item} className="rounded-xl border border-[#E6E7EB] bg-white px-3 py-2">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#618AFF]" />
                    <span className="h-2.5 flex-1 rounded-full bg-[#DDE7FF]" />
                  </div>
                  <div className="h-2 w-[70%] rounded-full bg-[#E6E7EB]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectPreviewStack({ active, tone = "green" }: { active: boolean; tone?: "green" | "blue" }) {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = stackRef.current;

      if (!root) return;

      const leftCard = root.querySelector<HTMLElement>("[data-preview-card='left']");
      const centerCard = root.querySelector<HTMLElement>("[data-preview-card='center']");
      const rightCard = root.querySelector<HTMLElement>("[data-preview-card='right']");

      if (!leftCard || !centerCard || !rightCard) return;

      const cards = [leftCard, centerCard, rightCard];
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const initialShadow = "0 6px 16px rgba(26,28,36,0.04)";
      const activeShadow = tone === "blue" ? "0 16px 34px rgba(34,88,244,0.14)" : "0 16px 34px rgba(13,128,13,0.14)";

      gsap.set(cards, {
        force3D: true,
        transformOrigin: "50% 112%",
        boxShadow: initialShadow,
      });

      gsap.set(leftCard, { xPercent: -78, y: 8, rotation: -10, scale: 1 });
      gsap.set(centerCard, { xPercent: -50, y: -18, rotation: 0, scale: 1 });
      gsap.set(rightCard, { xPercent: -22, y: 8, rotation: 10, scale: 1 });

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          overwrite: "auto",
        },
      });

      tl.addLabel("fan", 0)
        .to(cards, { boxShadow: activeShadow, duration: prefersReducedMotion ? 0 : 0.24, ease: "power2.out" }, "fan")
        .to(
          centerCard,
          {
            y: -26,
            rotation: 0,
            scale: 1,
            duration: prefersReducedMotion ? 0 : 0.26,
            ease: "expo.out",
          },
          "fan"
        )
        .to(
          leftCard,
          {
            xPercent: -88,
            y: 6,
            rotation: -15,
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "back.out(1.2)",
          },
          "fan+=0.04"
        )
        .to(
          rightCard,
          {
            xPercent: -12,
            y: 6,
            rotation: 15,
            duration: prefersReducedMotion ? 0 : 0.52,
            ease: "back.out(1.2)",
          },
          "fan+=0.07"
        );

      timelineRef.current = tl;

      return () => {
        timelineRef.current?.kill();
        timelineRef.current = null;
      };
    },
    { scope: stackRef, dependencies: [tone] }
  );

  useGSAP(
    () => {
      const timeline = timelineRef.current;

      if (!timeline) return;

      if (active) {
        timeline.timeScale(1).play();
      } else {
        timeline.timeScale(1.35).reverse();
      }
    },
    { scope: stackRef, dependencies: [active] }
  );

  const cardBase =
    "absolute bottom-0 left-1/2 h-[204px] w-[256px] origin-bottom overflow-hidden rounded-[24px] border-[7px] border-white bg-white shadow-[0_6px_16px_rgba(26,28,36,0.04)] will-change-transform";
  const layer = tone === "blue" ? { left: "z-[3]", center: "z-[2]", right: "z-[1]" } : { left: "z-[1]", center: "z-[3]", right: "z-[2]" };

  return (
    <div ref={stackRef} data-preview-stack className="pointer-events-none absolute right-16 top-24 z-0 hidden h-[262px] w-[430px] xl:block">
      <div data-preview-card="left" className={`${cardBase} ${layer.left}`}>
        {tone === "blue" ? <QixinScreenshotPlaceholder variant="map" /> : <ScreenshotPlaceholder variant="list" />}
      </div>
      <div data-preview-card="center" className={`${cardBase} ${layer.center}`}>
        {tone === "blue" ? <QixinScreenshotPlaceholder variant="monitor" /> : <ScreenshotPlaceholder variant="report" />}
      </div>
      <div data-preview-card="right" className={`${cardBase} ${layer.right}`}>
        {tone === "blue" ? <QixinScreenshotPlaceholder variant="cluster" /> : <ScreenshotPlaceholder variant="chart" />}
      </div>
    </div>
  );
}

export function ProjectCard({
  number,
  title,
  subtitle,
  role,
  description,
  highlights,
  accent,
  index,
  href,
  onIntent,
  visual,
}: ProjectCardProps) {
  const MotionWrapper: any = href ? motion.a : motion.div;
  const hasPreviewVisual = visual === "previewStack" || visual === "qixinPreviewStack";
  const previewTone = visual === "qixinPreviewStack" ? "blue" : "green";
  const [previewActive, setPreviewActive] = useState(false);

  const handlePreviewEnter = () => {
    if (hasPreviewVisual) setPreviewActive(true);
    onIntent?.();
  };

  const handlePreviewLeave = () => {
    if (hasPreviewVisual) setPreviewActive(false);
  };

  return (
    <MotionWrapper
      {...(href ? { href } : {})}
      onMouseEnter={handlePreviewEnter}
      onMouseLeave={handlePreviewLeave}
      onFocus={handlePreviewEnter}
      onBlur={handlePreviewLeave}
      onTouchStart={handlePreviewEnter}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[24px] border border-[#E6E7EB] flex flex-col bg-white shadow-[0_1px_2px_rgba(26,28,36,0.04)] hover:border-[#CBCDD4] hover:shadow-lg transition-all duration-500 ${href ? "cursor-pointer" : ""}`}
    >
      {/* Corner accent glow */}
      <div
        className={`pointer-events-none absolute -top-32 -right-32 size-80 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${accent}`}
      />
      <div
        className={`pointer-events-none absolute -bottom-40 -left-40 size-80 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${accent}`}
      />
      {hasPreviewVisual && <ProjectPreviewStack active={previewActive} tone={previewTone} />}
      <div className={`relative z-10 flex h-full flex-col p-7 lg:p-8 ${hasPreviewVisual ? "xl:min-h-[420px]" : ""}`}>
        {/* Top: number + arrow */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`leading-none tracking-tighter bg-gradient-to-br ${accent} bg-clip-text text-transparent text-[clamp(3rem,5vw,5rem)]`}
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
          <div
            className={`size-10 rounded-full border border-[#E6E7EB] flex items-center justify-center group-hover:border-transparent group-hover:bg-gradient-to-br ${accent} group-hover:rotate-45 transition-[background,border-color,transform,box-shadow] duration-500`}
          >
            <ArrowUpRight className="size-4 text-[#1A1C24] transition-colors duration-75 ease-out group-hover:text-white" />
          </div>
        </div>

        <div className={hasPreviewVisual ? "xl:max-w-[54%]" : ""}>
          {/* Title */}
          <h3 className="text-xl lg:text-2xl tracking-tight text-[#1A1C24] mb-1.5">{title}</h3>
          <p className="text-sm text-[#696D7A] mb-5">{subtitle}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-5 text-sm text-[#696D7A]">
            <span>{role}</span>
          </div>

          {/* Description */}
          <p className="text-base text-[#4E525E] leading-relaxed mb-5">{description}</p>

          {/* Highlights */}
          <ul className="space-y-2 border-l border-[#E6E7EB] pl-4">
            {highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="text-sm text-[#4E525E] leading-relaxed relative">
                <span className="absolute -left-[18px] top-1.5 size-1 rounded-full bg-[#CBCDD4]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionWrapper>
  );
}
