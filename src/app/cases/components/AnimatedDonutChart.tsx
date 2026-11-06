import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import chartSvg from '../../../../public/images/qixin/chart-donut-animated.svg?raw';

gsap.registerPlugin(ScrollTrigger, useGSAP);
export function AnimatedDonutChart() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(root.current!.querySelectorAll('[data-donut-segment]'),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, stagger: .16, ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="animated-donut-chart" dangerouslySetInnerHTML={{ __html: chartSvg }} />;
}
