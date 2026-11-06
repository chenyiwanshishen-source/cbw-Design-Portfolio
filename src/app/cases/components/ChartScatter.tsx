import { useRef, type CSSProperties } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { FigureContent } from './FigurePlaceholder';

gsap.registerPlugin(useGSAP);
const positions = [
  [5, 3, 33, -5], [38, 8, 42, 4], [66, 2, 31, -3],
  [2, 35, 45, 3], [30, 39, 46, -4], [66, 31, 32, 5],
  [4, 70, 43, -3], [42, 68, 28, 4], [62, 72, 35, -4],
];
export function ChartScatter({ figures }: { figures: FigureContent[] }) {
  const root = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: root });
  const animate = contextSafe((el: HTMLImageElement, active: boolean) => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (!active && (el.matches(':focus') || el.matches(':hover'))) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = parseFloat(getComputedStyle(el).getPropertyValue('--dur-base')) / 1000;
    gsap.to(el, { y: active ? -16 : 0, force3D: false, duration: reduced ? 0 : duration, ease: 'power3.out', overwrite: true });
    el.style.zIndex = active ? '20' : String(Number(el.dataset.order) + 1);
  });
  const sorted = [...figures].sort((a,b) => Number(a.src?.match(/chart-(\d+)/)?.[1]) - Number(b.src?.match(/chart-(\d+)/)?.[1]));
  return <div ref={root} className="chart-scatter" aria-label="图表组件样张，悬停或键盘聚焦可展开查看">
    {sorted.map((f,i) => {
      const [x,y,w] = positions[i];
      return <img tabIndex={0} className="chart-scatter-card" key={f.plate} data-order={i} aria-label={f.alt || f.title}
        style={{ '--card-x': `${x}%`, '--card-y': `${y}%`, '--card-width': `${w}%`, zIndex: i+1, transformOrigin: x > 60 ? 'right center' : x < 10 ? 'left center' : 'center' } as CSSProperties}
        onPointerEnter={e=>animate(e.currentTarget,true)} onPointerLeave={e=>animate(e.currentTarget,false)}
        onFocus={e=>animate(e.currentTarget,true)} onBlur={e=>animate(e.currentTarget,false)}
        src={`${import.meta.env.BASE_URL}${f.src}`} alt={f.alt || f.title} width={f.width} height={f.height} loading="lazy" />;
    })}
  </div>;
}
