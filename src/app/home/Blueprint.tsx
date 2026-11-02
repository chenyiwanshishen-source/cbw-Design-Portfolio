import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

type Frame = { label: string; x: number; y: number; width: number; height: number };

export function Blueprint({ onFinish }: { onFinish: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  useLayoutEffect(() => {
    const stage = ref.current?.parentElement;
    if (!stage) return;
    function measure() {
      const origin = stage!.getBoundingClientRect();
      setFrames(Array.from(stage!.querySelectorAll<HTMLElement>('[data-intro-block]')).map(block => {
        const rect = block.getBoundingClientRect();
        return { label: block.dataset.introBlock!, x: rect.left - origin.left, y: rect.top - origin.top, width: rect.width, height: rect.height };
      }));
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="intro-blueprint" aria-hidden="true" onAnimationEnd={event => {
    if (event.target === event.currentTarget) onFinish();
  }}>
    {frames.map((frame, index) => <div key={frame.label} className="blueprint-frame" style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height, '--i': index } as CSSProperties}>
      <span className="blueprint-caption">{frame.label} · {Math.round(frame.width)} × {Math.round(frame.height)}</span>
      <span className="blueprint-rule" />
    </div>)}
  </div>;
}
