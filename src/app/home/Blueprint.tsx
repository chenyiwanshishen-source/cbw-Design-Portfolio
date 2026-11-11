import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

type Frame = { x: number; y: number; width: number; height: number; full: number; target: number; label: string; ghost?: HTMLElement };
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
    const selectors = 'h1,h2,h3,p,figcaption,dt,dd,li,.home-portrait,.home-case-visual,.home-side-cover,.home-side-entry,button,a';
    const chosen: Element[] = [];
    const result: Frame[] = [];
    page.querySelectorAll<HTMLElement>(selectors).forEach(element => {
      if (element.matches('.home-case-link') || element.closest('.intro-blueprint') || chosen.some(parent => parent.contains(element))) return;
      // Composite cards contain media and text with their own layout. Trace their
      // children separately instead of cloning an unconstrained image into text.
      if (element.matches('a,li') && element.querySelector('h1,h2,h3,p,img,iframe')) return;
      const surface = element.matches('.man-peek-portrait') ? element.querySelector('.man-peek-window') ?? element : element;
      const rect = surface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      chosen.push(element);
      const media = element.matches('.home-portrait,.home-case-visual,.home-side-cover');
      const range = document.createRange(); range.selectNodeContents(element);
      const ink = range.getBoundingClientRect();
      const target = media ? rect.width : Math.min(rect.width, Math.max(ink.width, 12));
      result.push({ x: rect.left + window.scrollX, y: rect.top + window.scrollY, width: rect.width, height: rect.height,
        target, full: media ? rect.width : Math.max(rect.width, root.right - rect.left), label: media ? 'IMAGE' : element.tagName === 'H1' ? 'TITLE' : element.matches('button,a') ? 'CONTROL' : 'COPY',
        ghost: media ? undefined : ghostOf(element) });
    });
    setFrames(result);
    let tick = 0;
    const began = performance.now();
    const update = () => {
      ref.current?.querySelectorAll<HTMLElement>('.blueprint-part').forEach(part => {
        const box = part.querySelector<HTMLElement>('.blueprint-frame');
        const dimension = part.querySelector<HTMLElement>('.blueprint-dimension');
        if (box && dimension) {
          const width = box.getBoundingClientRect().width;
          dimension.style.width = `${width}px`;
          dimension.dataset.value = `${Math.round(width)} × ${Math.round(box.getBoundingClientRect().height)}`;
        }
      });
      const progress = ref.current?.querySelector<HTMLElement>('.blueprint-progress');
      if (progress) progress.textContent = `${Math.min(100, Math.round((performance.now() - began) / 42))}%`;
      tick = requestAnimationFrame(update);
    };
    tick = requestAnimationFrame(update);
    // Document-space geometry stays aligned while the viewport scrolls.
    const syncScroll = () => {
      ref.current?.style.setProperty('--draft-scroll-x', `${-window.scrollX}px`);
      ref.current?.style.setProperty('--draft-scroll-y', `${-window.scrollY}px`);
    };
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', onFinish);
    return () => { cancelAnimationFrame(tick); window.removeEventListener('scroll', syncScroll); window.removeEventListener('resize', onFinish); };
  }, [onFinish]);
  const gaps = frames.flatMap((frame, index) => {
    const previous = frames.slice(0, index).filter(other => Math.abs(other.x - frame.x) < 4 && other.y + other.height <= frame.y).sort((a, b) => b.y - a.y)[0];
    if (!previous || frame.y - previous.y - previous.height < 12) return [];
    return [{ x: Math.max(10, frame.x - 16), y: previous.y + previous.height, height: frame.y - previous.y - previous.height }];
  });
  return <div ref={ref} className="intro-blueprint" aria-hidden="true" onAnimationEnd={event => {
    if (event.target === event.currentTarget) onFinish();
  }}>
    <svg width="0" height="0" aria-hidden="true"><defs><filter id="draft-rough"><feTurbulence type="fractalNoise" baseFrequency=".045 .18" numOctaves="2" seed="7" result="grain" /><feDisplacementMap in="SourceGraphic" in2="grain" scale="1.15" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
    <div className="blueprint-paper" />
    <span className="blueprint-note">layout study · 1:1</span><span className="blueprint-progress">0%</span>
    <div className="blueprint-document">
    {gaps.map((gap, index) => <span key={index} className="blueprint-gap" style={{ left: gap.x, top: gap.y, height: gap.height }} data-value={Math.round(gap.height)} />)}
    {frames.map((frame, index) => <div key={index} className="blueprint-part" style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height, '--i': Math.min(index, 12), '--full': `${frame.full}px`, '--width': `${frame.target}px` } as CSSProperties}>
      <span className="blueprint-guide" />
      <div className={`blueprint-frame ${frame.ghost ? frame.label === 'CONTROL' ? 'blueprint-control' : 'blueprint-copy' : 'blueprint-image'}`} />
      <span className="blueprint-caption">{frame.label} {String(index + 1).padStart(2, '0')}</span>
      <span className="blueprint-dimension" data-value={`${Math.round(frame.full)} × ${Math.round(frame.height)}`} />
      {frame.ghost && <div className={`blueprint-words ${frame.label === 'TITLE' ? 'blueprint-title' : ''}`} ref={node => { if (node && !node.firstChild) { node.setAttribute('inert', ''); node.appendChild(frame.ghost!); } }} />}
    </div>)}
    </div>
  </div>;
}
