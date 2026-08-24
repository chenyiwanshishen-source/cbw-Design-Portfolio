import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PortfolioLoader } from "./components/PortfolioLoader";
import { ProjectRouteLoader } from "./components/ProjectRouteLoader";
import {
  loadAiProjectDetail,
  loadExplorationsPage,
  loadHomeContent,
  loadNav,
  loadQixinProjectDetail,
  isProjectRouteReady,
  preloadProjectDetailAssets,
  scheduleProjectRemainderPreload,
} from "./projectPreload";

const ProjectDetail = lazy(() =>
  loadAiProjectDetail().then((module) => ({ default: module.ProjectDetail }))
);
const QixinProjectDetail = lazy(() =>
  loadQixinProjectDetail().then((module) => ({ default: module.QixinProjectDetail }))
);
const ExplorationsPage = lazy(() =>
  loadExplorationsPage().then((module) => ({ default: module.ExplorationsPage }))
);
const HomeContent = lazy(() =>
  loadHomeContent().then((module) => ({ default: module.HomeContent }))
);
const Nav = lazy(() => loadNav().then((module) => ({ default: module.Nav })));
const ParticleField = lazy(() =>
  import("./components/ParticleField").then((module) => ({ default: module.ParticleField }))
);
const ScopeCursor = lazy(() =>
  import("./components/ScopeCursor").then((module) => ({ default: module.ScopeCursor }))
);
const ViewportScrollbars = lazy(() =>
  import("./components/ScrollArea").then((module) => ({ default: module.ViewportScrollbars }))
);

const PROJECT_ROUTE_LOADING_EVENT = "portfolio:project-route-loading";

function isProjectDetailRoute(route: string) {
  return (
    route === "#/project/ai-report" ||
    route === "#/project/qixin-brain" ||
    route === "#/project/explorations"
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [portfolioEntered, setPortfolioEntered] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
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
    const stopThreshold = 0.35;
    el.style.setProperty("--mx", `${cx}px`);
    el.style.setProperty("--my", `${cy}px`);
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      if (Math.abs(tx - cx) > stopThreshold || Math.abs(ty - cy) > stopThreshold) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const requestTick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      requestTick();
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
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
  const [routeLoaderHref, setRouteLoaderHref] = useState<string | null>(null);
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onProjectRouteLoading = (event: Event) => {
      const href = (event as CustomEvent<{ href?: string }>).detail?.href;
      if (!href || !isProjectDetailRoute(href)) return;
      if (isProjectRouteReady(href)) return;
      setRouteLoaderHref(href);
    };

    window.addEventListener(PROJECT_ROUTE_LOADING_EVENT, onProjectRouteLoading as EventListener);
    return () => {
      window.removeEventListener(PROJECT_ROUTE_LOADING_EVENT, onProjectRouteLoading as EventListener);
    };
  }, []);

  const goHome = () => {
    window.location.hash = "";
  };

  const isAiDetail = route === "#/project/ai-report";
  const isQixinDetail = route === "#/project/qixin-brain";
  const isExplorations = route === "#/project/explorations";
  const isAbout = route === "#about";

  useEffect(() => {
    if (isAiDetail) {
      void preloadProjectDetailAssets("ai-report", "high");
    } else if (isQixinDetail) {
      void preloadProjectDetailAssets("qixin-brain", "high");
    } else if (isExplorations) {
      void preloadProjectDetailAssets("explorations", "high");
    }
  }, [isAiDetail, isQixinDetail, isExplorations]);

  useEffect(() => {
    if (isAiDetail) {
      return scheduleProjectRemainderPreload("ai-report");
    } else if (isQixinDetail) {
      return scheduleProjectRemainderPreload("qixin-brain");
    } else if (isExplorations) {
      return scheduleProjectRemainderPreload("explorations");
    }
  }, [isAiDetail, isQixinDetail, isExplorations]);

  useEffect(() => {
    if (!portfolioEntered) return;

    const main = document.querySelector("main");
    if (!main) return;

    const imageSurfaces = new Set<HTMLElement>();

    const updateSurface = (surface: HTMLElement) => {
      const hasPendingImage = Array.from(surface.querySelectorAll<HTMLImageElement>("img")).some(
        (image) => image.dataset.imageSettled !== "true"
      );
      if (hasPendingImage) {
        surface.dataset.imagePending = "true";
      } else {
        delete surface.dataset.imagePending;
      }
    };

    const markImage = (image: HTMLImageElement, didError = false) => {
      const isSettled = didError || image.complete;
      const isReady = !didError && image.complete && image.naturalWidth > 0;
      image.dataset.imageSettled = isSettled ? "true" : "false";
      image.dataset.imageReady = isReady ? "true" : "false";

      const surface = image.parentElement;
      if (surface) {
        imageSurfaces.add(surface);
      }
    };

    const refreshSurfaceChain = (start: HTMLElement | null) => {
      let surface = start;
      while (surface && surface !== main) {
        if (imageSurfaces.has(surface)) {
          updateSurface(surface);
        }
        surface = surface.parentElement;
      }
    };

    const imagesInNode = (node: Node) => {
      if (node instanceof HTMLImageElement) {
        return [node];
      }
      if (node instanceof Element || node instanceof DocumentFragment) {
        return Array.from(node.querySelectorAll<HTMLImageElement>("img"));
      }
      return [];
    };

    const onImageSettled = (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      markImage(event.target, event.type === "error");
      refreshSurfaceChain(event.target.parentElement);
    };

    const initialImages = Array.from(main.querySelectorAll<HTMLImageElement>("img"));
    initialImages.forEach((image) => {
      image.addEventListener("load", onImageSettled);
      image.addEventListener("error", onImageSettled);
      markImage(image);
    });
    imageSurfaces.forEach(updateSurface);

    const observer = new MutationObserver((records) => {
      const addedImages = new Set<HTMLImageElement>();
      const affectedElements = new Set<HTMLElement>();

      records.forEach((record) => {
        if (record.target instanceof HTMLElement) {
          affectedElements.add(record.target);
        }

        record.addedNodes.forEach((node) => {
          imagesInNode(node).forEach((image) => {
            addedImages.add(image);
            const surface = image.parentElement;
            if (surface) {
              imageSurfaces.add(surface);
              affectedElements.add(surface);
            }
          });
        });
      });

      addedImages.forEach((image) => {
        image.removeEventListener("load", onImageSettled);
        image.removeEventListener("error", onImageSettled);
        image.addEventListener("load", onImageSettled, { once: true });
        image.addEventListener("error", onImageSettled, { once: true });
        markImage(image);
      });

      affectedElements.forEach((element) => refreshSurfaceChain(element));
    });

    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      initialImages.forEach((image) => {
        image.removeEventListener("load", onImageSettled);
        image.removeEventListener("error", onImageSettled);
      });
    };
  }, [portfolioEntered, route]);

  const detailFallback =
    routeLoaderHref || isProjectRouteReady(route) ? null : <ProjectRouteLoader route={route} />;

  const portfolioContent = isAiDetail ? (
    <Suspense fallback={detailFallback}>
      <ProjectDetail onBack={goHome} />
    </Suspense>
  ) : isQixinDetail ? (
    <Suspense fallback={detailFallback}>
      <QixinProjectDetail onBack={goHome} />
    </Suspense>
  ) : isExplorations ? (
    <Suspense fallback={detailFallback}>
      <ExplorationsPage onBack={goHome} />
    </Suspense>
  ) : (
    <Suspense fallback={null}>
      <HomeContent key={isAbout ? "about" : "home"} view={isAbout ? "about" : "home"} />
    </Suspense>
  );

  return (
    <div className="relative min-h-screen bg-[#FAFBFF] text-[#1A1C24] overflow-x-clip selection:bg-[#E5EBFF] selection:text-[#1A1C24]">
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

      {mounted && hasFinePointer && !routeLoaderHref && (
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

      {portfolioEntered && routeLoaderHref && (
        <ProjectRouteLoader
          key={routeLoaderHref}
          route={routeLoaderHref}
          onComplete={() => {
            setRouteLoaderHref((current) => (current === routeLoaderHref ? null : current));
          }}
        />
      )}

      {/* Global back-to-top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 left-1/2 z-40 group inline-flex -translate-x-1/2 items-center rounded-full bg-white p-2 text-[#1A1C24] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,88,244,0.45)] sm:bottom-8 sm:gap-3 sm:py-2 sm:pl-7 sm:pr-2"
        >
          <span className="hidden text-sm sm:inline">回到顶部</span>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#2258F4] text-white group-hover:-translate-y-0.5 transition-transform duration-300">
            <ArrowUp className="size-4" />
          </span>
        </button>
      )}

      <main className="relative z-10">{portfolioEntered ? portfolioContent : null}</main>
    </div>
  );
}
