import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PortfolioLoader } from "./components/PortfolioLoader";
import {
  loadAiProjectDetail,
  loadQixinProjectDetail,
  preloadProjectDetailAssets,
  scheduleHomeProjectPreload,
  scheduleProjectRemainderPreload,
} from "./projectPreload";

const ProjectDetail = lazy(() =>
  loadAiProjectDetail().then((module) => ({ default: module.ProjectDetail }))
);
const QixinProjectDetail = lazy(() =>
  loadQixinProjectDetail().then((module) => ({ default: module.QixinProjectDetail }))
);
const HomeContent = lazy(() =>
  import("./components/HomeContent").then((module) => ({ default: module.HomeContent }))
);
const Nav = lazy(() => import("./components/Nav").then((module) => ({ default: module.Nav })));
const ParticleField = lazy(() =>
  import("./components/ParticleField").then((module) => ({ default: module.ParticleField }))
);
const ScopeCursor = lazy(() =>
  import("./components/ScopeCursor").then((module) => ({ default: module.ScopeCursor }))
);
const ViewportScrollbars = lazy(() =>
  import("./components/ScrollArea").then((module) => ({ default: module.ViewportScrollbars }))
);

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [portfolioEntered, setPortfolioEntered] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setHasFinePointer(media.matches);
    updatePointer();
    media.addEventListener("change", updatePointer);
    return () => media.removeEventListener("change", updatePointer);
  }, []);

  // Cursor-following grid spotlight
  const gridRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    el.style.setProperty("--mx", `${cx}px`);
    el.style.setProperty("--my", `${cy}px`);
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mounted]);

  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [route, setRoute] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goHome = () => {
    window.location.hash = "";
  };

  const isAiDetail = route === "#/project/ai-report";
  const isQixinDetail = route === "#/project/qixin-brain";

  useEffect(() => {
    if (!portfolioEntered) return;
    if (isAiDetail || isQixinDetail) return;
    return scheduleHomeProjectPreload();
  }, [portfolioEntered, isAiDetail, isQixinDetail]);

  useEffect(() => {
    if (isAiDetail) {
      void preloadProjectDetailAssets("ai-report", "high");
    } else if (isQixinDetail) {
      void preloadProjectDetailAssets("qixin-brain", "high");
    }
  }, [isAiDetail, isQixinDetail]);

  useEffect(() => {
    if (!portfolioEntered) return;
    if (isAiDetail) {
      scheduleProjectRemainderPreload("ai-report");
    } else if (isQixinDetail) {
      scheduleProjectRemainderPreload("qixin-brain");
    }
  }, [portfolioEntered, isAiDetail, isQixinDetail]);

  const detailFallback = (
    <div className="min-h-screen px-6 pt-32 text-center text-sm text-[#696D7A]">
      正在加载项目详情...
    </div>
  );

  const portfolioContent = isAiDetail ? (
    <Suspense fallback={detailFallback}>
      <ProjectDetail onBack={goHome} />
    </Suspense>
  ) : isQixinDetail ? (
    <Suspense fallback={detailFallback}>
      <QixinProjectDetail onBack={goHome} />
    </Suspense>
  ) : (
    <Suspense fallback={null}>
      <HomeContent onProjectIntent={preloadProjectDetailAssets} />
    </Suspense>
  );

  return (
    <div className="relative min-h-screen bg-[#FAFBFF] text-[#1A1C24] overflow-x-hidden selection:bg-[#E5EBFF] selection:text-[#1A1C24]">
      {/* Animated grid background — cursor spotlight */}
      <div
        ref={gridRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,88,244,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(34,88,244,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), #1A1C24 0%, rgba(26,28,36,0.55) 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), #1A1C24 0%, rgba(26,28,36,0.55) 45%, transparent 100%)",
        }}
      />

      {/* Floating gradient orbs — toned down for light theme */}
      {portfolioEntered && <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/3 -right-40 size-[600px] rounded-full blur-[160px] opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #2258F4, transparent 70%)" }}
        />
      </div>}

      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>")',
        }}
      />

      {mounted && hasFinePointer && (
        <Suspense fallback={null}>
          <ScopeCursor />
        </Suspense>
      )}
      {mounted && portfolioEntered && (
        <Suspense fallback={null}>
          <ParticleField />
          <ViewportScrollbars />
        </Suspense>
      )}
      <PortfolioLoader route={route} onEntered={() => setPortfolioEntered(true)} />

      {portfolioEntered && (
        <Suspense fallback={null}>
          <Nav />
        </Suspense>
      )}

      {/* Global back-to-top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-[#1A1C24] hover:shadow-[0_0_40px_rgba(34,88,244,0.45)] transition-all duration-300"
        >
          <span className="text-sm">回到顶部</span>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#2258F4] text-white group-hover:-translate-y-0.5 transition-transform duration-300">
            <ArrowUp className="size-4" />
          </span>
        </button>
      )}

      <main className="relative z-10">{portfolioEntered ? portfolioContent : null}</main>
    </div>
  );
}
