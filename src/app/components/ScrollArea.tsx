import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";

type Metrics = {
  canScrollX: boolean;
  canScrollY: boolean;
  xSize: number;
  xOffset: number;
  ySize: number;
  yOffset: number;
};

type DragState = {
  axis: "x" | "y";
  startPointer: number;
  startScroll: number;
};

const EMPTY_METRICS: Metrics = {
  canScrollX: false,
  canScrollY: false,
  xSize: 0,
  xOffset: 0,
  ySize: 0,
  yOffset: 0,
};

function setRefs<T>(node: T, ...refs: Array<Ref<T> | undefined>) {
  refs.forEach((ref) => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(node);
    } else {
      ref.current = node;
    }
  });
}

function measureElement(el: HTMLElement): Metrics {
  const scrollableX = el.scrollWidth - el.clientWidth;
  const scrollableY = el.scrollHeight - el.clientHeight;
  const canScrollX = scrollableX > 1;
  const canScrollY = scrollableY > 1;
  const xTrack = Math.max(0, el.clientWidth - 24);
  const yTrack = Math.max(0, el.clientHeight - 24);
  const xSize = canScrollX ? Math.max(36, (el.clientWidth / el.scrollWidth) * xTrack) : 0;
  const ySize = canScrollY ? Math.max(36, (el.clientHeight / el.scrollHeight) * yTrack) : 0;
  const xOffset = canScrollX ? (el.scrollLeft / scrollableX) * Math.max(0, xTrack - xSize) : 0;
  const yOffset = canScrollY ? (el.scrollTop / scrollableY) * Math.max(0, yTrack - ySize) : 0;

  return { canScrollX, canScrollY, xSize, xOffset, ySize, yOffset };
}

function hideNativeScrollbarsClass(className = "") {
  return `native-scrollbar-hidden ${className}`.trim();
}

export const ScrollArea = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ScrollArea(
  { children, className = "", onScroll, ...props },
  forwardedRef
) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const updateMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setMetrics(measureElement(viewport));
  }, []);

  const showTemporarily = useCallback(() => {
    setActive(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      if (!hovered && !dragRef.current) setActive(false);
    }, 900);
  }, [hovered]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild);

    window.addEventListener("resize", updateMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMetrics);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [updateMetrics]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      const viewport = viewportRef.current;
      if (!drag || !viewport) return;

      if (drag.axis === "x") {
        const track = Math.max(1, viewport.clientWidth - 24 - metrics.xSize);
        const scrollable = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
        viewport.scrollLeft = drag.startScroll + ((event.clientX - drag.startPointer) / track) * scrollable;
      } else {
        const track = Math.max(1, viewport.clientHeight - 24 - metrics.ySize);
        const scrollable = Math.max(1, viewport.scrollHeight - viewport.clientHeight);
        viewport.scrollTop = drag.startScroll + ((event.clientY - drag.startPointer) / track) * scrollable;
      }
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      if (!hovered) showTemporarily();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [hovered, metrics.xSize, metrics.ySize, showTemporarily]);

  const beginDrag = (axis: "x" | "y", event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    event.stopPropagation();
    setActive(true);
    dragRef.current = {
      axis,
      startPointer: axis === "x" ? event.clientX : event.clientY,
      startScroll: axis === "x" ? viewport.scrollLeft : viewport.scrollTop,
    };
  };

  const visible = active || hovered;
  const thumbStyle: CSSProperties = {
    background: "rgba(91, 101, 124, 0.42)",
    boxShadow: "0 1px 3px rgba(15, 20, 25, 0.12)",
  };

  return (
    <div
      className="relative min-w-0"
      onMouseEnter={() => {
        setHovered(true);
        setActive(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (!dragRef.current) showTemporarily();
      }}
    >
      <div
        {...props}
        ref={(node) => {
          viewportRef.current = node;
          setRefs(node, forwardedRef);
        }}
        className={hideNativeScrollbarsClass(className)}
        onScroll={(event) => {
          updateMetrics();
          showTemporarily();
          onScroll?.(event);
        }}
      >
        {children}
      </div>

      {metrics.canScrollY && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-3 right-1.5 top-3 z-50 w-1.5 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="pointer-events-auto absolute left-0 w-full rounded-full"
            style={{
              ...thumbStyle,
              height: metrics.ySize,
              transform: `translate3d(0, ${metrics.yOffset}px, 0)`,
            }}
            onPointerDown={(event) => beginDrag("y", event)}
          />
        </div>
      )}

      {metrics.canScrollX && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1.5 left-3 right-3 z-50 h-1.5 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="pointer-events-auto absolute top-0 h-full rounded-full"
            style={{
              ...thumbStyle,
              width: metrics.xSize,
              transform: `translate3d(${metrics.xOffset}px, 0, 0)`,
            }}
            onPointerDown={(event) => beginDrag("x", event)}
          />
        </div>
      )}
    </div>
  );
});

export function ViewportScrollbars() {
  const hideTimerRef = useRef<number | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getViewportElement = useCallback(() => document.scrollingElement as HTMLElement | null, []);

  const updateMetrics = useCallback(() => {
    const el = getViewportElement();
    if (!el) return;
    setMetrics(measureElement(el));
  }, [getViewportElement]);

  const showTemporarily = useCallback(() => {
    setActive(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      if (!hovered && !dragRef.current) setActive(false);
    }, 900);
  }, [hovered]);

  useEffect(() => {
    updateMetrics();

    const handleScroll = () => {
      updateMetrics();
      showTemporarily();
    };

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMetrics);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [showTemporarily, updateMetrics]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      const el = getViewportElement();
      if (!drag || !el) return;

      const track = Math.max(1, window.innerHeight - 24 - metrics.ySize);
      const scrollable = Math.max(1, el.scrollHeight - window.innerHeight);
      window.scrollTo({ top: drag.startScroll + ((event.clientY - drag.startPointer) / track) * scrollable });
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      if (!hovered) showTemporarily();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [getViewportElement, hovered, metrics.ySize, showTemporarily]);

  if (!metrics.canScrollY) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-3 right-1.5 top-3 z-[10060] w-1.5 transition-opacity duration-300 ${
        active || hovered ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => {
        setHovered(true);
        setActive(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (!dragRef.current) showTemporarily();
      }}
    >
      <div
        className="absolute left-0 w-full rounded-full bg-[#5B657C]/45 shadow-[0_1px_3px_rgba(15,20,25,0.12)]"
        style={{
          height: metrics.ySize,
          transform: `translate3d(0, ${metrics.yOffset}px, 0)`,
        }}
        onPointerDown={(event) => {
          const el = getViewportElement();
          if (!el) return;
          event.preventDefault();
          setActive(true);
          dragRef.current = {
            axis: "y",
            startPointer: event.clientY,
            startScroll: el.scrollTop,
          };
        }}
      />
    </div>
  );
}
