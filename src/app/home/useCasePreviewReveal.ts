import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';

// A single GSAP reveal controller shared by the portfolio's case cards and More Works.
gsap.registerPlugin(useGSAP);

export function useCasePreviewReveal(active: boolean, flat = false) {
  const preview = useRef<HTMLDivElement>(null);
  const reveal = useRef<gsap.core.Tween | null>(null);
  useGSAP(() => {
    if (!preview.current) return;
    const media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      reveal.current = gsap.fromTo(preview.current!.children,
        { y: 0, yPercent: 100, rotation: (index: number) => flat ? 0 : index === 0 ? -8 : 7, autoAlpha: 0 },
        { y: 0, yPercent: 0, autoAlpha: 1, stagger: context.conditions?.reduced ? 0 : 0.035, duration: context.conditions?.reduced ? 0 : 0.5, ease: 'back.out(1.5)', paused: true });
      if (active) reveal.current.progress(1);
      return () => { reveal.current = null; };
    });
    return () => media.revert();
  }, { scope: preview });
  useEffect(() => {
    if (active) reveal.current?.timeScale(1).play();
    else reveal.current?.timeScale(1.5).reverse();
  }, [active]);
  return preview;
}
