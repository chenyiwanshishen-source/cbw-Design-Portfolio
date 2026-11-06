import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ring from '../../../../public/images/qixin/chart-vector-0.svg?raw';
import progress from '../../../../public/images/qixin/chart-vector-2.svg?raw';
import heat from '../../../../public/images/qixin/chart-vector-3.svg?raw';
import lines from '../../../../public/images/qixin/chart-vector-4.svg?raw';
import area from '../../../../public/images/qixin/chart-vector-6.svg?raw';
import bars from '../../../../public/images/qixin/chart-vector-7.svg?raw';
import horizontal from '../../../../public/images/qixin/chart-vector-8.svg?raw';
const sources: Record<number, string> = { 0: ring, 2: progress, 3: heat, 4: lines, 6: area, 7: bars, 8: horizontal };
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function AnimatedVectorChart({ index }: { index: number }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const shapes = [...root.current!.querySelectorAll<SVGGraphicsElement>('path, rect, circle')].filter(el => !el.closest('defs, clipPath'));
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } });
      const strokes = shapes.filter(el => el.hasAttribute('stroke') && el.tagName === 'path');
      const fills = shapes.filter(el => !strokes.includes(el));
      strokes.forEach((el, i) => {
        const length = (el as SVGPathElement).getTotalLength();
        tl.fromTo(el, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }, i * .1);
      });
      if ([2, 7, 8].includes(index)) {
        fills.forEach((el, i) => {
          const box = el.getBBox();
          tl.fromTo(el, index === 7 ? { scaleY: 0, svgOrigin: `${box.x} ${box.y + box.height}` } : { scaleX: 0, svgOrigin: `${box.x} ${box.y}` },
            index === 7 ? { scaleY: 1, duration: .9, ease: 'power3.out' } : { scaleX: 1, duration: .9, ease: 'power3.out' }, i * .055);
        });
      } else {
        tl.fromTo(fills, { opacity: 0 }, { opacity: 1, duration: .6, stagger: index === 3 ? .006 : .025 }, strokes.length ? .3 : 0);
      }
    });
    return () => media.revert();
  }, { scope: root, dependencies: [index], revertOnUpdate: true });
  return <div ref={root} className="animated-vector-chart" dangerouslySetInnerHTML={{ __html: sources[index] }} />;
}
