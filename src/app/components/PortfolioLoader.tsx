import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { ArrowRight } from "lucide-react";
import { preloadPortfolioEntryAssets } from "../projectPreload";
import { curveSwipeStates, getCurveSwipePath, setCurveSwipePath } from "../curveSwipe";

gsap.registerPlugin(useGSAP, CustomEase, CustomBounce);

const MIN_ENTRY_LOADER_DURATION_MS = 5000;

interface PortfolioLoaderProps {
  route: string;
  onEntered?: () => void;
}

export function PortfolioLoader({ route, onEntered }: PortfolioLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const helloRef = useRef<HTMLDivElement | null>(null);
  const niceRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const percentTrackRef = useRef<HTMLSpanElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const swipeBasePathRef = useRef<SVGPathElement | null>(null);
  const initialRouteRef = useRef(route);
  const [rawProgress, setRawProgress] = useState(0);
  const [visualProgress, setVisualProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const progressReady = rawProgress >= 1 && visualProgress >= 1;
  const displayProgress = ready || progressReady ? 1 : Math.min(rawProgress, visualProgress, 0.995);
  const progressPercent = ready || progressReady ? 100 : Math.min(99, Math.floor(displayProgress * 100));
  const progressLabel = `${progressPercent}%`;

  useEffect(() => {
    let cancelled = false;

    void preloadPortfolioEntryAssets(initialRouteRef.current, (progress) => {
      if (!cancelled) setRawProgress(Math.max(0, Math.min(1, progress)));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const progressState = { value: 0 };
    const tween = gsap.to(progressState, {
      value: 1,
      duration: MIN_ENTRY_LOADER_DURATION_MS / 1000,
      ease: "none",
      onUpdate: () => setVisualProgress(progressState.value),
      onComplete: () => setVisualProgress(1),
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  useGSAP(
    (_, contextSafe) => {
      const hello = helloRef.current;
      const nice = niceRef.current;
      const button = buttonRef.current;
      const content = contentRef.current;
      const percentTrack = percentTrackRef.current;
      const percent = percentRef.current;
      const fill = fillRef.current;
      const swipeBasePath = swipeBasePathRef.current;
      if (!hello || !nice || !button || !content || !percentTrack || !percent || !fill) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const markIntroDone = contextSafe(() => setIntroDone(true));
      const updateIntroProgress = contextSafe((progress: number) => setIntroProgress(progress));

      gsap.set(button, {
        autoAlpha: reduceMotion ? 1 : 0,
        xPercent: -50,
        y: reduceMotion ? 108 : -156,
        width: reduceMotion ? 292 : 44,
        height: reduceMotion ? 58 : 44,
        borderRadius: reduceMotion ? 29 : 999,
        backgroundColor: reduceMotion ? "#DDE7FF" : "#2258F4",
        borderColor: reduceMotion ? "#A8BEFF" : "rgba(34,88,244,0)",
        boxShadow: reduceMotion
          ? "0 18px 50px rgba(34,88,244,0.16)"
          : "0 18px 42px rgba(34,88,244,0.25)",
        transformOrigin: "50% 100%",
      });
      gsap.set([hello, nice], { autoAlpha: 0, y: 10, filter: "blur(6px)" });
      gsap.set(content, { autoAlpha: 0, y: 6 });
      gsap.set(percentTrack, { autoAlpha: 0, width: "8%" });
      gsap.set(percent, { autoAlpha: 1, yPercent: -50 });
      gsap.set(fill, {
        autoAlpha: reduceMotion ? 1 : 0,
        scaleX: reduceMotion ? 0.08 : 0.03,
        transformOrigin: "0% 50%",
      });
      setCurveSwipePath(swipeBasePath, curveSwipeStates.baseCover);

      if (reduceMotion) {
        updateIntroProgress(1);
        markIntroDone();
        return;
      }

      CustomBounce.create("portfolio-loader-drop", {
        strength: 0.34,
        squash: 2.8,
        squashID: "portfolio-loader-drop-squash",
      });
      CustomBounce.create("portfolio-loader-final-drop", {
        strength: 0.48,
        squash: 3,
        squashID: "portfolio-loader-final-drop-squash",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
        onUpdate: () => updateIntroProgress(tl.progress()),
        onComplete: markIntroDone,
      });

      tl.set(button, { y: 172, autoAlpha: 0, scaleX: 0.86, scaleY: 1.16 })
        .addLabel("helloRise")
        .to(button, {
          autoAlpha: 1,
          y: -74,
          scaleX: 0.88,
          scaleY: 1.16,
          duration: 0.7,
          ease: "expo.out",
        })
        .to(button, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "elastic.out(0.8, 0.48)" }, "helloRise+=0.46")
        .fromTo(
          hello,
          { autoAlpha: 0, y: 12, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power3.out" },
          "helloRise+=0.28"
        )
        .addLabel("firstDrop", "+=0.22")
        .to(button, { y: 42, duration: 0.62, ease: "portfolio-loader-drop" }, "firstDrop")
        .to(
          button,
          {
            scaleX: 1.34,
            scaleY: 0.68,
            duration: 0.62,
            ease: "portfolio-loader-drop-squash",
          },
          "firstDrop"
        )
        .to(hello, { autoAlpha: 0, y: -8, filter: "blur(5px)", duration: 0.18 }, "firstDrop+=0.46")
        .to(button, { scaleX: 0.86, scaleY: 1.18, duration: 0.12, ease: "power2.out" }, "firstDrop+=0.56")
        .addLabel("niceRise", "firstDrop+=0.62")
        .to(button, { y: -82, scaleX: 0.96, scaleY: 1.06, duration: 0.56, ease: "expo.out" }, "niceRise")
        .to(button, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "elastic.out(0.85, 0.48)" }, "niceRise+=0.34")
        .fromTo(
          nice,
          { autoAlpha: 0, y: 12, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.22, ease: "power3.out" },
          "niceRise+=0.12"
        )
        .addLabel("finalDrop", "+=0.18")
        .to(button, { y: 108, duration: 0.72, ease: "portfolio-loader-final-drop" }, "finalDrop")
        .to(
          button,
          {
            scaleX: 1.3,
            scaleY: 0.7,
            duration: 0.72,
            ease: "portfolio-loader-final-drop-squash",
          },
          "finalDrop"
        )
        .to(nice, { autoAlpha: 0, y: -8, filter: "blur(5px)", duration: 0.18 }, "finalDrop+=0.12")
        .addLabel("morph", "finalDrop+=0.58")
        .to(
          button,
          {
            width: 308,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#DDE7FF",
            borderColor: "#A8BEFF",
            boxShadow: "0 18px 50px rgba(34,88,244,0.18)",
            scaleX: 1,
            scaleY: 1,
            duration: 0.48,
            ease: "elastic.out(0.74, 0.56)",
          },
          "morph"
        )
        .to(fill, { autoAlpha: 1, scaleX: 0.08, duration: 0.2, ease: "power3.out" }, "morph+=0.12")
        .to(percentTrack, { autoAlpha: 1, duration: 0.2, ease: "power3.out" }, "morph+=0.16");
    },
    { scope: rootRef }
  );

  useEffect(() => {
    if (!introDone || !fillRef.current) return;

    const target = Math.max(0.08, displayProgress);
    const fillTween = gsap.to(fillRef.current, {
      scaleX: target,
      duration: displayProgress >= 1 ? 0.34 : 0.5,
      ease: "power3.out",
    });

    return () => {
      fillTween.kill();
    };
  }, [displayProgress, introDone]);

  useEffect(() => {
    if (!introDone || !percentTrackRef.current) return;

    const target = Math.max(0.08, displayProgress);
    const percentTween = gsap.to(percentTrackRef.current, {
      width: `${target * 100}%`,
      autoAlpha: ready ? 0 : 1,
      duration: displayProgress >= 1 ? 0.3 : 0.5,
      ease: "power3.out",
    });

    return () => {
      percentTween.kill();
    };
  }, [displayProgress, introDone, ready]);

  useEffect(() => {
    if (!introDone || !contentRef.current) return;

    const contentTween = gsap.to(contentRef.current, {
      autoAlpha: ready ? 1 : 0,
      y: ready ? 0 : 6,
      duration: 0.24,
      ease: "power3.out",
    });

    return () => {
      contentTween.kill();
    };
  }, [introDone, ready]);

  useEffect(() => {
    if (!introDone || !progressReady || ready) return;
    setReady(true);
  }, [introDone, progressReady, ready]);

  useGSAP(
    (_, contextSafe) => {
      const button = buttonRef.current;
      if (!button || !ready || exiting) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const label = labelRef.current;
      const baseY = 108;
      const clampX = gsap.utils.clamp(-28, 28);
      const clampY = gsap.utils.clamp(-16, 16);
      const clampLabelX = gsap.utils.clamp(-16, 16);
      const clampLabelY = gsap.utils.clamp(-10, 10);
      let active = false;

      const resetButton = () => {
        gsap.to(button, {
          x: 0,
          y: baseY,
          duration: 0.72,
          ease: "elastic.out(0.9, 0.38)",
          overwrite: "auto",
        });
        if (label) {
          gsap.to(label, {
            x: 0,
            y: 0,
            duration: 0.68,
            ease: "elastic.out(0.85, 0.4)",
            overwrite: true,
          });
        }
      };

      const onMouseMove = contextSafe((event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const radius = Math.max(128, Math.min(176, rect.width * 0.56));

        if (distance > radius) {
          if (active) {
            resetButton();
            active = false;
          }
          return;
        }

        active = true;

        const mapX = gsap.utils.mapRange(
          centerX - radius,
          centerX + radius,
          -radius,
          radius,
          event.clientX
        );
        const mapY = gsap.utils.mapRange(
          centerY - radius,
          centerY + radius,
          -radius,
          radius,
          event.clientY
        );

        gsap.to(button, {
          x: clampX(mapX * 0.38),
          y: baseY + clampY(mapY * 0.32),
          duration: 0.42,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (label) {
          gsap.to(label, {
            x: clampLabelX(mapX * 0.22),
            y: clampLabelY(mapY * 0.18),
            duration: 0.42,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });

      const onMouseLeave = contextSafe(() => {
        if (!active) return;
        resetButton();
        active = false;
      });

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        gsap.killTweensOf(button);
        if (label) gsap.killTweensOf(label);
      };
    },
    { scope: rootRef, dependencies: [ready, exiting], revertOnUpdate: true }
  );

  const enterPortfolio = () => {
    const root = rootRef.current;
    const contentLayer = contentLayerRef.current;
    const swipeBasePath = swipeBasePathRef.current;
    if (!ready || exiting || !root || !contentLayer || !swipeBasePath) return;
    setExiting(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.12,
        onComplete: () => {
          setVisible(false);
          onEntered?.();
        },
      });
      return;
    }

    const curveState = { ...curveSwipeStates.baseCover };
    const renderCurve = () => setCurveSwipePath(swipeBasePath, curveState);
    renderCurve();
    gsap.killTweensOf([root, contentLayer, swipeBasePath, buttonRef.current]);

    gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          setVisible(false);
          onEntered?.();
        },
      })
      .to(buttonRef.current, { scale: 0.98, y: 96, autoAlpha: 0, duration: 0.16, ease: "power2.out" })
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
        "<0.04"
      )
      .to(root, { autoAlpha: 0, duration: 0.06, ease: "power1.out" }, ">-0.06");
  };

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-transparent text-[#1A1C24]"
      aria-busy={!ready}
      aria-live="polite"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path ref={swipeBasePathRef} fill="#FAFBFF" d={getCurveSwipePath(curveSwipeStates.baseCover)} />
      </svg>

      <div
        ref={contentLayerRef}
        className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(34,88,244,0.10), transparent 30%), linear-gradient(180deg, #FAFBFF 0%, #F4F7FF 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(34,88,244,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 50% 48%, #1A1C24 0%, transparent 62%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 48%, #1A1C24 0%, transparent 62%)",
          }}
        />

        <div className="relative flex min-h-[360px] w-full max-w-[420px] flex-col items-center justify-center px-6">
          <div className="relative h-[280px] w-full">
          <button
            ref={buttonRef}
            type="button"
            disabled={!ready || exiting}
            onClick={enterPortfolio}
            className="group absolute left-1/2 top-[72px] h-11 w-11 overflow-hidden border border-transparent bg-[#2258F4] text-left shadow-[0_18px_42px_rgba(34,88,244,0.25)] disabled:cursor-default"
            aria-label={ready ? "点击进入作品集" : "正在加载作品集"}
          >
            <span
              ref={fillRef}
              className="absolute inset-0 origin-left rounded-full bg-[#2258F4]"
            />
            <span
              ref={percentTrackRef}
              className={`pointer-events-none absolute inset-y-0 left-0 z-20 overflow-hidden rounded-full ${ready ? "hidden" : ""}`}
            >
              <span
                ref={percentRef}
                className="absolute right-4 top-1/2 whitespace-nowrap rounded-full text-[14px] font-semibold leading-none text-white"
              >
                {progressLabel}
              </span>
            </span>
            <span
              ref={contentRef}
              className={`relative z-10 flex h-full w-full items-center justify-between px-4 text-white ${ready ? "" : "invisible opacity-0"}`}
            >
              <span
                ref={labelRef}
                data-magnetic-label
                className="flex w-full will-change-transform items-center justify-between"
              >
                <span className="min-w-0 whitespace-nowrap text-[20px] font-semibold leading-none">
                  点击进入
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </button>
          <div
            ref={helloRef}
            className="absolute left-0 right-0 top-[128px] text-center text-[28px] font-semibold leading-none tracking-tight"
          >
            你好！
          </div>
          <div
            ref={niceRef}
            className="absolute left-0 right-0 top-[128px] text-center text-[24px] font-semibold leading-none tracking-tight"
          >
            再等一下!
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
