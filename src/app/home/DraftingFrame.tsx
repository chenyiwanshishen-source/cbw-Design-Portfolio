import { useEffect, useRef, useState } from 'react';

/** Decorative measurements follow the real sheet, not fixed mock dimensions. */
export function DraftingFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const { width, height } = size;
  const ticks = Array.from({ length: Math.ceil(height / 24) }, (_, i) => {
    const y = i * 24;
    const length = i % 4 === 0 ? 8 : 4;
    return `M-24 ${y}h${length} M${width + 24} ${y}h-${length}`;
  }).join(' ');
  return <div ref={ref} className="drafting-frame" aria-hidden="true">
    <svg className="drafting-lines" width="100%" height="100%">
      <defs><filter id="sheet-pencil" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035 .15" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale=".65" /></filter></defs>
      <g filter="url(#sheet-pencil)">
        <path className="drafting-guides" d={`M-24 16V${height - 16} M${width + 24} 16V${height - 16} M0 60V${height} M${width} 60V${height}`} />
        <path d={ticks} />
        <path d={`M0 64V80 M0 72H${width} M${width} 64V80`} />
        <path d={`M-8 8H8 M0 0V16 M${width - 8} 8H${width + 8} M${width} 0V16 M-8 ${height - 8}H8 M0 ${height - 16}V${height} M${width - 8} ${height - 8}H${width + 8} M${width} ${height - 16}V${height}`} />
      </g>
    </svg>
    <span className="drafting-measure">COLUMN {width} PX · SCALE 1:1</span>
    <span className="drafting-note">DESIGN / WORKS</span>
    <i className="drafting-pin" />
  </div>;
}
