import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

type Frame = { x: number; y: number; width: number; height: number; full: number; label: string; ghost?: HTMLElement };
const typography = ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'word-spacing', 'white-space', 'text-wrap', 'text-align', 'display', 'padding', 'margin', 'vertical-align', 'gap', 'flex-direction', 'align-items'];

// Copy the real typesetting, including nested romanized names and inline links.
function ghostOf(source: HTMLElement) {
  const clone = source.cloneNode(true) as HTMLElement;
  const originals = [source, ...source.querySelectorAll<HTMLElement>('*')];
  const copies = [clone, ...clone.querySelectorAll<HTMLElement>('*')];
  copies.forEach((copy, index) => {
    const style = getComputedStyle(originals[index]);
    copy.removeAttribute('id'); copy.removeAttribute('href'); copy.removeAttribute('aria-live');
    copy.removeAttribute('class'); copy.removeAttribute('style');
    typography.forEach(property => copy.style.setProperty(property, style.getPropertyValue(property)));
    copy.style.animation = 'none'; copy.style.transition = 'none';
    copy.style.background = 'none'; copy.style.border = 'none';
    copy.tabIndex = -1;
  });
  clone.style.margin = '0';
  return clone;
}

export function Blueprint({ onFinish }: { onFinish: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  useLayoutEffect(() => {
    const page = ref.current?.closest('.homepage');
    if (!page) return;
    const root = page.querySelector('.max-w-content')!.getBoundingClientRect();
    const selectors = 'h1,h2,h3,p,figcaption,dt,dd,li,.home-portrait,.home-case-visual,button,a';
    const chosen: Element[] = [];
    const result: Frame[] = [];
    page.querySelectorAll<HTMLElement>(selectors).forEach(element => {
      if (element.closest('.intro-blueprint') || chosen.some(parent => parent.contains(element))) return;
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= innerHeight || !rect.width || !rect.height) return;
      chosen.push(element);
      const media = element.matches('.home-portrait,.home-case-visual');
      result.push({ x: rect.left, y: rect.top, width: rect.width, height: rect.height,
        full: Math.max(rect.width, root.right - rect.left), label: media ? 'IMAGE' : element.tagName === 'H1' ? 'TITLE' : 'TYPE',
        ghost: media ? undefined : ghostOf(element) });
    });
    setFrames(result);
    // Never leave a measured overlay detached from its live content.
    window.addEventListener('scroll', onFinish, { passive: true });
    window.addEventListener('resize', onFinish);
    return () => { window.removeEventListener('scroll', onFinish); window.removeEventListener('resize', onFinish); };
  }, [onFinish]);
  return <div ref={ref} className="intro-blueprint" aria-hidden="true" onAnimationEnd={event => {
    if (event.target === event.currentTarget) onFinish();
  }}>
    {frames.map((frame, index) => <div key={index} className="blueprint-part" style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height, '--i': Math.min(index, 12), '--full': `${frame.full}px`, '--width': `${frame.width}px` } as CSSProperties}>
      <div className={`blueprint-frame ${frame.ghost ? '' : 'blueprint-image'}`}>
        <span className="blueprint-caption">{frame.label} · {Math.round(frame.width)} × {Math.round(frame.height)}</span>
      </div>
      {frame.ghost && <div className={`blueprint-words ${frame.label === 'TITLE' ? 'blueprint-title' : ''}`} ref={node => { if (node && !node.firstChild) { node.setAttribute('inert', ''); node.appendChild(frame.ghost!); } }} />}
    </div>)}
  </div>;
}
