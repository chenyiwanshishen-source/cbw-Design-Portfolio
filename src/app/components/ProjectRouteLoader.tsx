import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(useGSAP, Draggable);

interface ProjectRouteLoaderProps {
  route: string;
  durationMs?: number;
  onComplete?: () => void;
}

const loadingCopy = "页面正在加载中-";

const routeLabels: Record<string, string> = {
  "#/project/ai-report": "AI报告生成",
  "#/project/qixin-brain": "启信产业大脑",
};

export function ProjectRouteLoader({ route, durationMs = 5000, onComplete }: ProjectRouteLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  const [typedLength, setTypedLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const routeLabel = routeLabels[route] ?? "项目详情";

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const displayText = useMemo(() => {
    const prefix = loadingCopy.slice(0, typedLength);
    if (typedLength < loadingCopy.length) return prefix;
    return `${prefix}${progress}%`;
  }, [progress, typedLength]);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      const box = boxRef.current;
      if (!root || !box) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const state = { typedLength: 0, progress: 0 };
      const updateText = contextSafe(() => {
        setTypedLength(Math.round(state.typedLength));
        setProgress(Math.round(state.progress));
      });
      const completeLoading = contextSafe(() => {
        onCompleteRef.current?.();
      });
      let completeCall: gsap.core.Tween | null = null;

      gsap.set(root, { autoAlpha: 0 });
      gsap.set(box, { y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.985 });

      const tl = gsap.timeline();
      tl.to(root, { autoAlpha: 1, duration: reduceMotion ? 0 : 0.22, ease: "power2.out" })
        .to(box, { y: 0, scale: 1, duration: reduceMotion ? 0 : 0.48, ease: "expo.out" }, "<")
        .to(
          state,
          {
            typedLength: loadingCopy.length,
            duration: reduceMotion ? 0 : 0.78,
            ease: "none",
            snap: { typedLength: 1 },
            onUpdate: updateText,
          },
          "<0.08"
        )
        .to(
          state,
          {
            progress: 100,
            duration: reduceMotion ? 0 : Math.max(1.2, (durationMs - 900) / 1000),
            ease: "power1.inOut",
            snap: { progress: 1 },
            onUpdate: updateText,
            onComplete: () => {
              if (onCompleteRef.current) {
                completeCall = gsap.delayedCall(reduceMotion ? 0 : 0.18, completeLoading);
              }
            },
          },
          ">-0.08"
        );

      let draggables: Draggable[] = [];
      if (!reduceMotion) {
        draggables = Draggable.create(box, {
          type: "x,y",
          bounds: root,
          edgeResistance: 0.84,
          dragResistance: 0.06,
          cursor: "grab",
          activeCursor: "grabbing",
          onPress: () => {
            box.dataset.dragging = "true";
          },
          onDragStart: () => {
            box.dataset.dragging = "true";
            gsap.to(box, {
              scale: 1.012,
              duration: 0.14,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
          onDragEnd: () => {
            box.dataset.dragging = "false";
            gsap.to(box, {
              scale: 1,
              duration: 0.24,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onRelease: () => {
            box.dataset.dragging = "false";
          },
        });
      }

      updateText();

      return () => {
        tl.kill();
        completeCall?.kill();
        draggables.forEach((draggable) => draggable.kill());
      };
    },
    { scope: rootRef, dependencies: [route, durationMs], revertOnUpdate: true }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-30 flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFBFF]/92 px-6 pt-24 text-[#1A1C24] backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label={`${routeLabel}正在加载`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          background:
            "radial-gradient(circle at 50% 44%, rgba(34,88,244,0.11), transparent 32%), linear-gradient(180deg, rgba(250,251,255,0.94) 0%, rgba(244,247,255,0.9) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,88,244,0.15) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(circle at 50% 50%, #1A1C24 0%, transparent 64%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #1A1C24 0%, transparent 64%)",
        }}
      />

      <div
        ref={boxRef}
        data-hero-drag-frame
        tabIndex={0}
        className="hero-drag-frame route-loader-frame relative z-10 inline-flex max-w-[calc(100vw-48px)] touch-none select-none items-center px-7 py-4 outline-none will-change-transform lg:cursor-grab lg:px-8 lg:py-5 lg:active:cursor-grabbing"
      >
        <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tl" />
        <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tr" />
        <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-bl" />
        <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-br" />
        <span className="project-route-loader-text block min-w-0 whitespace-nowrap text-[34px] font-semibold leading-none tracking-normal text-[#1A1C24] sm:text-[52px] lg:text-[64px]">
          {displayText}
          <span aria-hidden="true" className="project-route-loader-caret ml-1 inline-block w-[0.08em] bg-[#2258F4] align-[-0.05em]">
            &nbsp;
          </span>
        </span>
      </div>
    </div>
  );
}
