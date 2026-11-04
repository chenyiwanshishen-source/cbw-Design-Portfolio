import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import '../case.css';

gsap.registerPlugin(useGSAP);

export function QuestionBankLink() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const link = linkRef.current;
    if (!link) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(link, { '--idle-y': '-4px', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      const motion = gsap.timeline({ paused: true, defaults: { duration: 0.42, ease: 'power2.out' } })
        .to('.question-bank-art', { y: -4, rotation: -3 }, 0)
        .to('.question-bank-paper-front', { y: -18, rotation: -1 }, 0)
        .to('.question-bank-paper-back', { y: -9, rotation: 3 }, 0)
        .to('.question-bank-folder-front', { scaleY: 0.96, transformOrigin: '50% 100%' }, 0);
      let hovered = false;
      let focused = false;
      const update = () => { if (hovered || focused) motion.timeScale(1).play(); else motion.timeScale(1.3).reverse(); };
      const enter = (event: PointerEvent) => { if (event.pointerType === 'touch') return; hovered = true; update(); };
      const leave = () => { hovered = false; update(); };
      const focus = () => { focused = link.matches(':focus-visible'); update(); };
      const blur = () => { focused = false; update(); };
      link.addEventListener('pointerenter', enter);
      link.addEventListener('pointerleave', leave);
      link.addEventListener('focus', focus);
      link.addEventListener('blur', blur);
      return () => {
        link.removeEventListener('pointerenter', enter);
        link.removeEventListener('pointerleave', leave);
        link.removeEventListener('focus', focus);
        link.removeEventListener('blur', blur);
      };
    }, linkRef);
    return () => media.revert();
  }, { scope: linkRef });
  return <a ref={linkRef} className="question-bank-link" href="#/project/ai-report/questions" aria-label="打开准备好的题库">
    <span className="question-bank-art" aria-hidden="true">
      <span className="question-bank-folder-back" />
      <span className="question-bank-paper question-bank-paper-back" />
      <span className="question-bank-paper question-bank-paper-front">
        <span className="question-bank-document-title">访谈题库</span>
        
      </span>
      <span className="question-bank-folder-front" />
    </span>
  </a>;
}
export function QuestionBankPage() {
  useEffect(() => { window.scrollTo({top: 0, behavior: 'instant'}); }, []);
  return <article className="case-page"><div className="case-sheet mx-auto w-full max-w-content"><a className="case-back text-caption" href="#/project/ai-report">← 返回 Qsight 案例</a><header className="question-bank-header"><h1 className="text-h2">访谈题库</h1></header><div className="question-bank-empty" aria-label="题库内容区域" /></div></article>;
}

export function OutlinePaper({ children }: { children: ReactNode }) {
  const paperRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const paper = paperRef.current;
    if (!paper) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(paper, { '--idle-y': '-3px', duration: 2.8, delay: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      const tween = gsap.to(paper, { y: -12, rotation: 1, duration: 0.42, ease: 'power2.out', paused: true });
      const enter = () => { tween.timeScale(1).play(); };
      const leave = () => { tween.timeScale(1.3).reverse(); };
      paper.addEventListener('pointerenter', enter);
      paper.addEventListener('pointerleave', leave);
      return () => {
        paper.removeEventListener('pointerenter', enter);
        paper.removeEventListener('pointerleave', leave);
      };
    });
    return () => media.revert();
  }, { scope: paperRef });
  return <div ref={paperRef} className="case-outline-paper">{children}</div>;
}
