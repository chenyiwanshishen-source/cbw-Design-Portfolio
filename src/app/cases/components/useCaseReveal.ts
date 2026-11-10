import { useLayoutEffect, type RefObject } from 'react';

/** Reveal reading blocks once, without transforming sticky navigation or diagrams. */
export function useCaseReveal(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const page = root.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const selector = '.case-back, .case-header-main, .case-facts, .exploration-detail > header, .case-section > h2, .case-subsection > h3, .case-prose, figure, .case-switch';
    const blocks = Array.from(page.querySelectorAll<HTMLElement>(selector)).filter(
      (node) => !node.parentElement?.closest(selector),
    );
    const show = (node: HTMLElement) => node.classList.add('case-reveal-visible');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    blocks.forEach((node) => {
      node.classList.add('case-reveal');
      observer.observe(node);
    });
    const revealFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      blocks.filter((node) => node.contains(target)).forEach(show);
    };
    page.addEventListener('focusin', revealFocus);
    return () => {
      observer.disconnect();
      page.removeEventListener('focusin', revealFocus);
      blocks.forEach((node) => node.classList.remove('case-reveal', 'case-reveal-visible'));
    };
  }, [root]);
}
