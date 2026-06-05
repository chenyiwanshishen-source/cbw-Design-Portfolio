import { useEffect, useRef } from "react";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  size: number;
  hue: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<P[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const count = Math.floor((w * h) / 16000);
      const list: P[] = [];
      const hues = [0, 0, 0, 0]; // grayscale
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        list.push({
          x,
          y,
          ox: x,
          oy: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.4 + 0.4,
          hue: hues[Math.floor(Math.random() * hues.length)],
        });
      }
      particlesRef.current = list;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my, active } = mouseRef.current;
      const radius = 180;
      const list = particlesRef.current;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const f = (1 - dist / radius) * 0.6;
            p.vx += (dx / (dist || 1)) * f;
            p.vy += (dy / (dist || 1)) * f;
          }
        }
        // spring back to origin
        p.vx += (p.ox - p.x) * 0.012;
        p.vy += (p.oy - p.y) * 0.012;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        const d = active ? Math.hypot(mx - p.x, my - p.y) : 9999;
        const glow = d < radius ? 1 - d / radius : 0;
        const alpha = 0.18 + glow * 0.7;
        const size = p.size + glow * 1.4;

        ctx.beginPath();
        ctx.fillStyle = `rgba(78, 82, 94, ${alpha})`;
        ctx.shadowBlur = glow * 8;
        ctx.shadowColor = `rgba(78, 82, 94, ${glow * 0.5})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    />
  );
}
