import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import chartSvg from '../../../../public/images/qixin/chart-bars-animated.svg?raw';

gsap.registerPlugin(ScrollTrigger, useGSAP);
export function AnimatedBarChart() {
  const root = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.current!.querySelectorAll('[data-bar-group]'),
        { scaleY: 0, svgOrigin: '0 327' },
        { scaleY: 1, duration: 1, stagger: .09, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } });
    });
    return () => media.revert();
  }, { scope: root });
  const replay = contextSafe(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(root.current!.querySelectorAll('[data-bar-group]'),
      { scaleY: 0, svgOrigin: '0 327' },
      { scaleY: 1, duration: 1, stagger: .09, ease: 'power3.out', overwrite: true });
  });
  return <div ref={root} className="animated-bar-chart">
    <div dangerouslySetInnerHTML={{ __html: chartSvg }} />
    <button type="button" onClick={replay}>重播动画</button>
  </div>;
}
