import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  number: string;
  title: string;
  role: string;
  description: string;
  highlights: string[];
  accent: string;
  index: number;
  href?: string;
  onIntent?: () => void;
  visual?: "previewStack" | "qixinPreviewStack" | "imagePreview";
  previewImage?: string;
  previewAlt?: string;
  previewImageWidth?: string;
  previewImageLeft?: string;
  previewImageTop?: string;
  previewMoveX?: number;
  previewMoveY?: number;
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

function ProjectPreviewCompact({ tone }: { tone: "green" | "blue" }) {
  const cards =
    tone === "blue"
      ? [
          { key: "map", node: <QixinScreenshotPlaceholder variant="map" />, className: "-rotate-[7deg] translate-y-4 z-[1]" },
          { key: "monitor", node: <QixinScreenshotPlaceholder variant="monitor" />, className: "z-[3]" },
          { key: "cluster", node: <QixinScreenshotPlaceholder variant="cluster" />, className: "rotate-[7deg] translate-y-5 z-[2]" },
        ]
      : [
          { key: "list", node: <ScreenshotPlaceholder variant="list" />, className: "-rotate-[7deg] translate-y-4 z-[1]" },
          { key: "report", node: <ScreenshotPlaceholder variant="report" />, className: "z-[3]" },
          { key: "chart", node: <ScreenshotPlaceholder variant="chart" />, className: "rotate-[7deg] translate-y-5 z-[2]" },
        ];

  return (
    <div data-preview-compact className="relative mb-6 h-[clamp(260px,24vw,380px)] overflow-hidden rounded-[22px] border border-[#E6E7EB] bg-[#FAFBFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(203,205,212,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(203,205,212,0.24) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute bottom-[-10px] left-1/2 flex w-[min(104%,560px)] -translate-x-1/2 items-end justify-center -space-x-6">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`relative h-[clamp(210px,19vw,310px)] w-[40%] min-w-[154px] max-w-[214px] shrink-0 origin-bottom overflow-hidden rounded-[20px] border-[6px] border-white bg-white shadow-[0_12px_28px_rgba(26,28,36,0.08)] ${card.className}`}
          >
            {card.node}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectImagePreview({
  src,
  alt,
  imageWidth = "100%",
  imageLeft = "0px",
  imageTop = "0px",
  moveX = 40,
  moveY = 26,
}: {
  src: string;
  alt: string;
  imageWidth?: string;
  imageLeft?: string;
  imageTop?: string;
  moveX?: number;
  moveY?: number;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const image = frame.querySelector<HTMLImageElement>("img");
    if (!image) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      image.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        raf = window.requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    const start = () => {
      if (!raf) raf = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent | PointerEvent) => {
      if ("pointerType" in event && event.pointerType === "touch") return;

      const rect = frame.getBoundingClientRect();
      const xRatio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const yRatio = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

      targetX = (xRatio - 0.5) * moveX;
      targetY = (yRatio - 0.5) * moveY;
      start();
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    image.style.transform = "translate3d(0, 0, 0)";
    frame.addEventListener("mousemove", handleMove);
    frame.addEventListener("pointermove", handleMove);
    frame.addEventListener("mouseleave", handleLeave);
    frame.addEventListener("pointercancel", handleLeave);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      frame.removeEventListener("mousemove", handleMove);
      frame.removeEventListener("pointermove", handleMove);
      frame.removeEventListener("mouseleave", handleLeave);
      frame.removeEventListener("pointercancel", handleLeave);
    };
  }, [moveX, moveY]);

  return (
    <div
      ref={frameRef}
      data-preview-compact
      className="relative mb-6 h-[clamp(220px,20vw,330px)] overflow-hidden rounded-[18px]"
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="absolute h-auto max-w-none select-none"
        style={{
          left: imageLeft,
          top: imageTop,
          width: imageWidth,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "rgba(248,249,252,0.34)",
          backdropFilter: "blur(3.5px)",
          WebkitBackdropFilter: "blur(3.5px)",
          maskImage:
            "radial-gradient(ellipse 66% 50% at 55% 48%, transparent 0%, transparent 56%, rgba(0,0,0,0.42) 70%, #000 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 66% 50% at 55% 48%, transparent 0%, transparent 56%, rgba(0,0,0,0.42) 70%, #000 100%)",
        }}
      />
    </div>
  );
}

export function ProjectCard({
  number,
  title,
  role,
  description,
  highlights,
  accent,
  index,
  href,
  onIntent,
  visual,
  previewImage,
  previewAlt,
  previewImageWidth,
  previewImageLeft,
  previewImageTop,
  previewMoveX,
  previewMoveY,
}: ProjectCardProps) {
  const MotionWrapper: any = href ? motion.a : motion.div;
  const hasPreviewVisual = visual === "previewStack" || visual === "qixinPreviewStack";
  const hasImagePreview = visual === "imagePreview" && Boolean(previewImage);
  const previewTone = visual === "qixinPreviewStack" ? "blue" : "green";

  const handlePreviewEnter = () => {
    onIntent?.();
  };

  return (
    <MotionWrapper
      {...(href ? { href } : {})}
      onMouseEnter={handlePreviewEnter}
      onFocus={handlePreviewEnter}
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
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-7 lg:p-8">
        {/* Top: number + arrow */}
        <div className="mb-5 flex items-start justify-between">
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

        <div className="mb-5">
          <h3 className="text-xl lg:text-2xl tracking-tight text-[#1A1C24] mb-1.5">{title}</h3>
          <div className="text-sm text-[#696D7A]">
            <span>{role}</span>
          </div>
        </div>

        {hasImagePreview && (
          <ProjectImagePreview
            src={previewImage!}
            alt={previewAlt ?? `${title}系统截图`}
            imageWidth={previewImageWidth}
            imageLeft={previewImageLeft}
            imageTop={previewImageTop}
            moveX={previewMoveX}
            moveY={previewMoveY}
          />
        )}
        {hasPreviewVisual && <ProjectPreviewCompact tone={previewTone} />}

        <div>
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
