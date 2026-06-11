import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, [data-zoom]";
const CURSOR_BASE_SIZE = 32;
const HOVER_SCALE = 2.45;
const ZOOM_SCALE = 4.25;
const ZOOM_FACTOR = 2.75;

type ZoomTarget = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function isButtonSized(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.width <= 360 && rect.height <= 120;
}

export function ScopeCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 600, damping: 38, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [zoomTarget, setZoomTarget] = useState<ZoomTarget | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  // Elastic spring for the cursor scale.
  const scale = useSpring(1, { stiffness: 320, damping: 14, mass: 0.6 });
  const size = useTransform(scale, (v) => `${v * CURSOR_BASE_SIZE}px`);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const target = t?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      const zoomEl = target?.closest("[data-zoom]") as HTMLElement | null;
      const forceZoom = !!zoomEl;
      const inter = !!target && (forceZoom || isButtonSized(target));

      if (targetRef.current !== target) {
        targetRef.current?.classList.remove("scope-cursor-target");
        targetRef.current = inter ? target : null;
        targetRef.current?.classList.add("scope-cursor-target");
      } else if (!inter) {
        targetRef.current?.classList.remove("scope-cursor-target");
        targetRef.current = null;
      }

      if (forceZoom && zoomEl) {
        const rect = zoomEl.getBoundingClientRect();
        const img = zoomEl.querySelector("img") as HTMLImageElement | null;
        const src = zoomEl.dataset.zoomSrc || img?.currentSrc || img?.src;

        if (src && rect.width > 0 && rect.height > 0) {
          setZoomTarget({
            src,
            x: Math.min(Math.max(e.clientX - rect.left, 0), rect.width),
            y: Math.min(Math.max(e.clientY - rect.top, 0), rect.height),
            width: rect.width,
            height: rect.height,
          });
        } else {
          setZoomTarget(null);
        }
      } else {
        setZoomTarget(null);
      }

      setHovering(inter);
    };
    const onLeave = () => {
      targetRef.current?.classList.remove("scope-cursor-target");
      targetRef.current = null;
      setHovering(false);
      setZoomTarget(null);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "scope-cursor-style";
    style.textContent = `
      html, body, body * {
        cursor: none !important;
      }
      .scope-cursor-target {
        scale: 1.08;
        transition: scale 180ms ease, filter 180ms ease;
        filter: contrast(1.08) brightness(1.08);
      }
      .scope-cursor-target[data-zoom] {
        scale: 1;
        filter: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      targetRef.current?.classList.remove("scope-cursor-target");
      document.documentElement.style.cursor = "";
      document.getElementById("scope-cursor-style")?.remove();
    };
  }, [x, y]);

  const zooming = !!zoomTarget;
  const zoomCursorSize = CURSOR_BASE_SIZE * ZOOM_SCALE;
  const zoomBackgroundPosition = zoomTarget
    ? `${zoomCursorSize / 2 - zoomTarget.x * ZOOM_FACTOR}px ${zoomCursorSize / 2 - zoomTarget.y * ZOOM_FACTOR}px`
    : undefined;
  const zoomBackgroundSize = zoomTarget
    ? `${zoomTarget.width * ZOOM_FACTOR}px ${zoomTarget.height * ZOOM_FACTOR}px`
    : undefined;

  useEffect(() => {
    scale.set(clicking ? (zooming ? ZOOM_SCALE * 0.94 : 0.86) : zooming ? ZOOM_SCALE : hovering ? HOVER_SCALE : 1);
  }, [hovering, clicking, zooming, scale]);

  return (
    <>
      {/* Frosted glass orb. */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          backdropFilter: zooming
            ? "none"
            : hovering
            ? "blur(1.2px) saturate(1.35) contrast(1.04) brightness(1.02)"
            : "blur(4px) saturate(1.8) contrast(1.2) brightness(1.05)",
          WebkitBackdropFilter: zooming
            ? "none"
            : hovering
            ? "blur(1.2px) saturate(1.35) contrast(1.04) brightness(1.02)"
            : "blur(4px) saturate(1.8) contrast(1.2) brightness(1.05)",
          backgroundColor: zooming ? "rgba(255,255,255,0.92)" : "transparent",
          backgroundImage:
            zooming && zoomTarget
              ? `radial-gradient(circle at 31% 26%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 62%), url("${zoomTarget.src}")`
              : hovering
              ? "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.055) 42%, rgba(255,255,255,0.018) 72%, rgba(255,255,255,0.006) 100%)"
              : "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.02) 100%)",
          backgroundRepeat: zooming ? "no-repeat, no-repeat" : "no-repeat",
          backgroundSize: zooming ? `100% 100%, ${zoomBackgroundSize}` : "100% 100%",
          backgroundPosition: zooming ? `center, ${zoomBackgroundPosition}` : "center",
          boxShadow:
            zooming
              ? "inset 0 1px 2px rgba(255,255,255,0.62), inset 0 -4px 12px rgba(34,88,244,0.08), 0 0 0 1px rgba(255,255,255,0.70), 0 0 0 2px rgba(168,190,255,0.72), 0 18px 42px rgba(34,88,244,0.20)"
              : hovering
              ? "inset 0 1px 2px rgba(255,255,255,0.42), inset 0 -2px 5px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.48), 0 0 0 1.5px rgba(34,88,244,0.18), 0 8px 24px rgba(34,88,244,0.12)"
              : "inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -1px 2px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.18)",
        }}
        className="pointer-events-none fixed top-0 left-0 z-[10050] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
      >
        {/* Top glass highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              hovering
                ? "radial-gradient(ellipse 60% 35% at 50% 18%, rgba(255,255,255,0.28), transparent 72%)"
                : "radial-gradient(ellipse 60% 35% at 50% 18%, rgba(255,255,255,0.45), transparent 70%)",
          }}
        />
        {/* Bottom subtle reflection */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 20% at 50% 92%, rgba(255,255,255,0.12), transparent 70%)",
          }}
        />
      </motion.div>

    </>
  );
}
