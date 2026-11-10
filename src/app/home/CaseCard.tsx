import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import type { CaseContent } from './content/zh';

gsap.registerPlugin(useGSAP);

function CaseCopy({ item }: { item: CaseContent }) {
  return <div className="home-case-copy flex min-w-0 flex-col gap-4">
    <h3 className="text-h3 font-normal">{item.name}</h3>
    <p className="text-body text-text-body">{item.summary}</p>
    <dl className="flex flex-col gap-3 text-caption text-text-secondary">
      <div><dt className="inline">项目周期 · </dt><dd className="inline">{item.period}</dd></div>
      <div><dt className="inline">我的工作 · </dt><dd className="inline">{item.responsibility}</dd></div>
    </dl>
    {!item.detailHref && <p className="text-caption text-text-meta">案例整理中</p>}
  </div>;
}

function Placeholder({ index }: { index: number }) {
  return <span className="case-placeholder">[待替换：界面 {index + 1}]</span>;
}

export function CaseCard({ item, active, muted, onHover, onFocus }: {
  item: CaseContent; active: boolean; muted: boolean;
  onHover: (active: boolean) => void; onFocus: (active: boolean) => void;
}) {
  const preview = useRef<HTMLDivElement>(null);
  const reveal = useRef<gsap.core.Tween | null>(null);
  useGSAP(() => {
    if (!preview.current) return;
    const media = gsap.matchMedia();
    media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      reveal.current = gsap.fromTo(preview.current.children,
        { y: 0, yPercent: 100, rotation: (index: number) => index === 0 ? -8 : 7, autoAlpha: 0 },
        { y: 0, yPercent: 0, autoAlpha: 1, stagger: context.conditions?.reduced ? 0 : 0.06, duration: context.conditions?.reduced ? 0 : 0.5, ease: 'power3.out', paused: true });
      if (active) reveal.current.progress(1);
      return () => { reveal.current = null; };
    });
    return () => media.revert();
  }, { scope: preview });
  useEffect(() => {
    if (active) reveal.current?.timeScale(1).play();
    else reveal.current?.timeScale(1.5).reverse();
  }, [active]);
  const [slide, setSlide] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const href = item.detailHref;
  return <article className={`home-case${active ? ' is-active' : ''}${muted ? ' is-muted' : ''}`}>
    <a href={href} className={`home-case-link case-desktop${item.id === 'qixin-brain' ? ' home-case-qixin' : ''}`} tabIndex={0} aria-disabled={!href || undefined} aria-label={href ? `阅读案例：${item.name}` : `${item.name}，案例整理中`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') onHover(true); }} onPointerLeave={() => onHover(false)}
      onFocus={() => onFocus(true)} onBlur={() => onFocus(false)}>
      <CaseCopy item={item} />
      <div className="case-previews" aria-hidden="true">{item.id === 'qixin-brain' ? <div ref={preview} className="qixin-preview-group">{['home-cover.webp', 'hover-620-19593.webp'].map((file, index) => <div key={file} className={`case-preview case-preview-qixin qixin-preview-${index}`}><img src={`${import.meta.env.BASE_URL}images/qixin/${file}`} alt="" /></div>)}</div> : [0, 1, 2].map(index => <div key={index} className={`case-preview case-preview-${index}`}><Placeholder index={index} /></div>)}</div>
    </a>
    <div className="case-mobile">
      <CaseCopy item={item} />
      <div className="case-strip" ref={strip} role="region" aria-label={`${item.name}界面预览`} tabIndex={0}
        onScroll={event => { const node = event.currentTarget; const first = node.firstElementChild as HTMLElement; if (first) setSlide(Math.min(2, Math.round(node.scrollLeft / (first.offsetWidth + 8)))); }}>
        {[0, 1, 2].map(index => <div key={index} className="case-slide"><Placeholder index={index} /></div>)}
      </div>
      <div className="case-dots" aria-label="选择预览图片">{[0, 1, 2].map(index => <button key={index} type="button" aria-label={`第 ${index + 1} 张图片`} aria-pressed={slide === index} onClick={() => { const node = strip.current; const child = node?.children[index] as HTMLElement | undefined; if (node && child) node.scrollTo({ left: index * (child.offsetWidth + 8), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><span /></button>)}</div>
      {href && <a className="home-target inline-flex items-center text-body" href={href}>阅读案例 →</a>}
    </div>
  </article>;
}

export function CaseList({ items, previewActive }: { items: CaseContent[]; previewActive?: number | null }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = previewActive !== undefined ? previewActive : focused ?? hovered;
  return <div className="case-list">{items.map((item, index) => <CaseCard key={item.id} item={item} active={active === index} muted={active !== null && active !== index}
    onHover={on => setHovered(on ? index : null)} onFocus={on => { if (on) setHovered(null); setFocused(on ? index : null); }} />)}</div>;
}
