import { Suspense, lazy, useEffect, useState } from "react";
import { HomePage } from "./home/HomePage";
import { ArrowUp } from "lucide-react";
import { ProjectRouteLoader } from "./components/ProjectRouteLoader";
import {
  loadExplorationsPage,
  loadNav,
  loadQixinProjectDetail,
  isProjectRouteReady,
  preloadProjectDetailAssets,
  scheduleProjectRemainderPreload,
} from "./projectPreload";

const QsightCase = lazy(() => import("./cases/QsightCase").then(module => ({ default: module.QsightCase })));
const QixinProjectDetail = lazy(() =>
  loadQixinProjectDetail().then((module) => ({ default: module.QixinProjectDetail }))
);
const ExplorationsPage = lazy(() =>
  loadExplorationsPage().then((module) => ({ default: module.ExplorationsPage }))
);
const Nav = lazy(() => loadNav().then((module) => ({ default: module.Nav })));
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
      if (!href || href === "#/project/ai-report" || !isProjectDetailRoute(href)) return;
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

  useEffect(() => {
    if (isQixinDetail) {
      void preloadProjectDetailAssets("qixin-brain", "high");
    } else if (isExplorations) {
      void preloadProjectDetailAssets("explorations", "high");
    }
  }, [isAiDetail, isQixinDetail, isExplorations]);

  useEffect(() => {
    if (isQixinDetail) {
      return scheduleProjectRemainderPreload("qixin-brain");
    } else if (isExplorations) {
      return scheduleProjectRemainderPreload("explorations");
    }
  }, [isAiDetail, isQixinDetail, isExplorations]);

  useEffect(() => {
    if (!isProjectDetailRoute(route)) return;

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
  }, [route]);

  const detailFallback =
    routeLoaderHref || isProjectRouteReady(route) ? null : <ProjectRouteLoader route={route} />;

  const portfolioContent = isAiDetail ? (
    <Suspense fallback={null}>
      <QsightCase />
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
<HomePage route={route} />
  );

  return (
    <div className="relative min-h-screen text-text">
      {!isAiDetail && isProjectDetailRoute(route) && (
        <Suspense fallback={null}>
          <Nav />
          <ViewportScrollbars />
        </Suspense>
      )}

      {!isAiDetail && routeLoaderHref && (
        <ProjectRouteLoader
          key={routeLoaderHref}
          route={routeLoaderHref}
          onComplete={() => {
            setRouteLoaderHref((current) => (current === routeLoaderHref ? null : current));
          }}
        />
      )}

      {/* Global back-to-top */}
      {!isAiDetail && isProjectDetailRoute(route) && showBackToTop && (
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

      <main className="relative z-10">{portfolioContent}</main>
    </div>
  );
}
