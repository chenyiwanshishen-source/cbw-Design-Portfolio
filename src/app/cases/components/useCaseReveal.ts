import { useLayoutEffect, type RefObject } from 'react';

/** Reveal reading blocks once, without transforming sticky navigation or diagrams. */
export function useCaseReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const page = root.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const selector = '.case-header-main, .case-facts, .exploration-detail > header, .case-section > h2, .case-subsection > h3, .case-prose, figure, .case-switch';
    const blocks = Array.from(page.querySelectorAll<HTMLElement>(selector)).filter(
      (node) => !node.parentElement?.closest(selector),
    );
    const show = (node: HTMLElement) => node.classList.add('case-reveal-visible');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.setProperty('--case-reveal-delay', `${Math.min(index, 3) * 90}ms`);
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -64px 0px' });
    blocks.forEach((node) => {
      node.classList.add('case-reveal');

    });
    // Let the hidden starting state paint before revealing above-the-fold blocks.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => blocks.forEach((node) => observer.observe(node)));
    });
    const revealFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      blocks.filter((node) => node.contains(target)).forEach(show);
    };
    page.addEventListener('focusin', revealFocus);
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      page.removeEventListener('focusin', revealFocus);
      blocks.forEach((node) => {
        node.classList.remove('case-reveal', 'case-reveal-visible');
        node.style.removeProperty('--case-reveal-delay');
      });
    };
  }, [root]);
}
