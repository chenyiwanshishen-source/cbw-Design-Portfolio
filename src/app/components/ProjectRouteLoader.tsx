import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { curveSwipeStates, getCurveSwipePath, setCurveSwipePath } from "../curveSwipe";
import { preloadRouteAssetsWithProgress } from "../projectPreload";

gsap.registerPlugin(useGSAP, Draggable);

const MIN_ROUTE_LOADER_DURATION_MS = 5000;

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

export function ProjectRouteLoader({
  route,
  durationMs = MIN_ROUTE_LOADER_DURATION_MS,
  onComplete,
}: ProjectRouteLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const swipeBasePathRef = useRef<SVGPathElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  const exitStartedRef = useRef(false);
  const [typedLength, setTypedLength] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const [pacedProgress, setPacedProgress] = useState(0);
  const routeLabel = routeLabels[route] ?? "项目详情";
  const progressReady = rawProgress >= 1 && pacedProgress >= 1;
  const displayProgress = progressReady ? 1 : Math.min(rawProgress, pacedProgress, 0.99);
  const progress = progressReady ? 100 : Math.min(99, Math.floor(displayProgress * 100));

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    exitStartedRef.current = false;
    setTypedLength(0);
    setRawProgress(0);
    setPacedProgress(0);

    void preloadRouteAssetsWithProgress(route, (nextProgress) => {
      if (!cancelled) setRawProgress(Math.max(0, Math.min(1, nextProgress)));
    });

    return () => {
      cancelled = true;
    };
  }, [route]);

  useEffect(() => {
    const progressState = { value: 0 };
    const tween = gsap.to(progressState, {
      value: 1,
      duration: durationMs / 1000,
      ease: "none",
      onUpdate: () => setPacedProgress(progressState.value),
      onComplete: () => setPacedProgress(1),
    });

    return () => {
      tween.kill();
    };
  }, [durationMs, route]);

  const displayText = useMemo(() => {
    const prefix = loadingCopy.slice(0, typedLength);
    if (typedLength < loadingCopy.length) return prefix;
    return `${prefix}${progress}%`;
  }, [progress, typedLength]);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      const contentLayer = contentLayerRef.current;
      const box = boxRef.current;
      const swipeBasePath = swipeBasePathRef.current;
      if (!root || !contentLayer || !box) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const typeState = { typedLength: 0 };
      const updateTypedText = contextSafe(() => {
        setTypedLength(Math.round(typeState.typedLength));
      });

      setCurveSwipePath(swipeBasePath, curveSwipeStates.baseCover);
      gsap.set(root, { autoAlpha: 0 });
      gsap.set(contentLayer, { autoAlpha: 1, y: 0 });
      gsap.set(box, { y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.985 });

      const tl = gsap.timeline();
      tl.to(root, { autoAlpha: 1, duration: reduceMotion ? 0 : 0.22, ease: "power2.out" })
        .to(box, { y: 0, scale: 1, duration: reduceMotion ? 0 : 0.48, ease: "expo.out" }, "<")
        .to(
          typeState,
          {
            typedLength: loadingCopy.length,
            duration: reduceMotion ? 0 : 0.78,
            ease: "none",
            snap: { typedLength: 1 },
            onUpdate: updateTypedText,
            onComplete: updateTypedText,
          },
          "<0.08"
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

      updateTypedText();

      return () => {
        tl.kill();
        draggables.forEach((draggable) => draggable.kill());
      };
    },
    { scope: rootRef, dependencies: [route], revertOnUpdate: true }
  );

  useEffect(() => {
    const root = rootRef.current;
    const contentLayer = contentLayerRef.current;
    const box = boxRef.current;
    const swipeBasePath = swipeBasePathRef.current;
    if (
      typedLength < loadingCopy.length ||
      progress < 100 ||
      exitStartedRef.current ||
      !root ||
      !contentLayer ||
      !box ||
      !swipeBasePath
    ) {
      return;
    }

    exitStartedRef.current = true;
    const completeLoading = () => onCompleteRef.current?.();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.to(root, { autoAlpha: 0, duration: 0.1, onComplete: completeLoading });
      return;
    }

    const curveState = { ...curveSwipeStates.baseCover };
    const renderCurve = () => setCurveSwipePath(swipeBasePath, curveState);
    renderCurve();
    gsap.killTweensOf([root, contentLayer, box, swipeBasePath]);

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: completeLoading,
    });

    tl.to(box, { y: -12, scale: 0.99, autoAlpha: 0, duration: 0.16, ease: "power2.out" })
      .to(contentLayer, { y: -12, autoAlpha: 0, duration: 0.2, ease: "power2.out" }, "<")
      .to(
        curveState,
        {
          ...curveSwipeStates.baseExit,
          duration: 0.98,
          ease: "back.inOut(0.85)",
          onUpdate: renderCurve,
          onComplete: renderCurve,
        },
        "<0.08"
      )
      .to(root, { autoAlpha: 0, duration: 0.06, ease: "power1.out" }, ">-0.06");

    return () => {
      tl.kill();
    };
  }, [progress, typedLength]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-30 min-h-screen overflow-hidden bg-transparent px-6 pt-24 text-[#1A1C24]"
      role="status"
      aria-live="polite"
      aria-label={`${routeLabel}正在加载`}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path ref={swipeBasePathRef} fill="#FEFEFD" d={getCurveSwipePath(curveSwipeStates.baseCover)} />
      </svg>

      <div
        ref={contentLayerRef}
        className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-6 pt-24 backdrop-blur-[2px]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-65"
          style={{
            background:
              "linear-gradient(180deg, rgba(254,254,253,0.98) 0%, rgba(254,254,253,0.95) 100%)",
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
    </div>
  );
}
