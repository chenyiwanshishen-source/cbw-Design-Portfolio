import { useEffect, useRef } from 'react';
import geometry from './mascot-eyes.json';

export function BlinkMascot({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || !active) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const eyes = Array.from(node.children) as HTMLElement[];
    let raf = 0, start = performance.now(), nextBlink = start + 1400;
    let pointer: {x: number; y: number} | null = null;
    const move = (event: PointerEvent) => { pointer = {x: event.clientX, y: event.clientY}; };
    const draw = (now: number) => {
      const frame = reduced.matches ? 0 : Math.floor((now - start) / 20) % 124;
      const size = node.clientWidth, scale = size / 256;
      node.style.backgroundPosition = `${-(frame % 16) * size}px ${-Math.floor(frame / 16) * size}px`;
      if (now > nextBlink + 120) nextBlink = now + 2400 + Math.random() * 2800;
      const elapsed = now - nextBlink;
      const blink = !reduced.matches && elapsed >= 0 && elapsed < 120 ? 1 - .92 * Math.sin(Math.PI * elapsed / 120) : 1;
      const rect = node.getBoundingClientRect();
      geometry.frames[frame].forEach((eye, index) => {
        const el = eyes[index];
        const dx = pointer ? pointer.x - rect.left - eye.x * scale : 0;
        const dy = pointer ? pointer.y - rect.top - eye.y * scale : 0;
        const length = Math.max(1, Math.hypot(dx, dy));
        Object.assign(el.style, {
          width: `${(eye.mask[2] - eye.mask[0] + 1) * scale}px`, height: `${(eye.mask[3] - eye.mask[1] + 1) * scale}px`,
          left: `${(eye.mask[0] + dx / length * eye.rx * .35) * scale}px`, top: `${(eye.mask[1] + dy / length * eye.ry * .35) * scale}px`,
          maskSize: `${size * 16}px ${size * 8}px`,
          maskPosition: `${-(frame % 16 * 256 + eye.mask[0]) * scale}px ${-(Math.floor(frame / 16) * 256 + eye.mask[1]) * scale}px`,
          transform: `scaleY(${blink})`,
        });
      });
      if (!reduced.matches) raf = requestAnimationFrame(draw);
    };
    window.addEventListener('pointermove', move, {passive: true});
    draw(start);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); };
  }, [active]);
  return <div ref={root} className="home-blink-mascot"><i /><i /></div>;
}
