import { useRef, useState } from 'react';
import type { CaseContent } from './content/zh';

function CaseCopy({ item }: { item: CaseContent }) {
  return <div className="home-case-copy flex min-w-0 flex-col gap-4">
    <h3 className="text-h3 font-normal text-balance">{item.name}</h3>
    <p className="text-body text-text-body">{item.summary}</p>
    <dl className="flex flex-col gap-3 text-caption text-text-secondary">
      <div><dt className="inline">项目周期 · </dt><dd className="inline">{item.period}</dd></div>
      <div><dt className="inline">我的工作 · </dt><dd className="inline">{item.responsibility}</dd></div>
    </dl>
  </div>;
}

function Placeholder({ index }: { index: number }) {
  return <span className="case-placeholder">[待替换：界面 {index + 1}]</span>;
}

export function CaseCard({ item, active, muted, onHover, onFocus }: {
  item: CaseContent; active: boolean; muted: boolean;
  onHover: (active: boolean) => void; onFocus: (active: boolean) => void;
}) {
  const [slide, setSlide] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const href = `#/project/${item.id}`;
  return <article className={`home-case${active ? ' is-active' : ''}${muted ? ' is-muted' : ''}`}>
    <a href={href} className="home-case-link case-desktop" aria-label={`阅读案例：${item.name}`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') onHover(true); }} onPointerLeave={() => onHover(false)}
      onFocus={() => onFocus(true)} onBlur={() => onFocus(false)}>
      <CaseCopy item={item} />
      <div className="case-previews" aria-hidden="true">{[0, 1, 2].map(index => <div key={index} className={`case-preview case-preview-${index}`}><Placeholder index={index} /></div>)}</div>
    </a>
    <div className="case-mobile">
      <CaseCopy item={item} />
      <div className="case-strip" ref={strip} role="region" aria-label={`${item.name}界面预览`} tabIndex={0}
        onScroll={event => { const node = event.currentTarget; const first = node.firstElementChild as HTMLElement; if (first) setSlide(Math.min(2, Math.round(node.scrollLeft / (first.offsetWidth + 8)))); }}>
        {[0, 1, 2].map(index => <div key={index} className="case-slide"><Placeholder index={index} /></div>)}
      </div>
      <div className="case-dots" aria-label="选择预览图片">{[0, 1, 2].map(index => <button key={index} type="button" aria-label={`第 ${index + 1} 张图片`} aria-pressed={slide === index} onClick={() => { const node = strip.current; const child = node?.children[index] as HTMLElement | undefined; if (node && child) node.scrollTo({ left: index * (child.offsetWidth + 8), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><span /></button>)}</div>
      <a className="home-target inline-flex items-center text-body" href={href}>阅读案例 →</a>
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
