import { useRef, useState } from 'react';
import { useCasePreviewReveal } from './useCasePreviewReveal';
import type { CaseContent } from './content/zh';


const mobileCasePreviews: Record<string, { file: string; width: number; height: number; alt: string }[]> = {
  'ai-report': [
    { file: 'qsight/hover-539-5069.webp', width: 1000, height: 625, alt: 'Qsight 报告生成与编辑界面' },
    { file: 'qsight/hover-1363-50416.webp', width: 760, height: 475, alt: 'Qsight 文档仿写入口' },
  ],
  'qixin-brain': [
    { file: 'qixin/home-cover.webp', width: 1440, height: 1783, alt: '启信产业大脑首页工作台' },
    { file: 'qixin/hover-620-19593.webp', width: 1440, height: 900, alt: '启信产业大脑企业详情界面' },
    { file: 'qixin/hover-2447-7289.webp', width: 900, height: 563, alt: '启信产业大脑企业监控列表' },
  ],
  'ye-browser': [
    { file: 'ye/home-hover-tabs.webp', width: 1200, height: 643, alt: 'ye! 页签分组整理界面' },
    { file: 'ye/home-hover.webp', width: 1100, height: 581, alt: 'ye! 书签详情与 AI 对话界面' },
  ],
};

function CaseCopy({ item }: { item: CaseContent }) {
  return <div className="home-case-copy flex min-w-0 flex-col gap-4">
    <h3 className="text-h3 font-normal">{item.name}</h3>
    <p className="text-body text-text-body">{item.summary}</p>
    <dl className="flex flex-col gap-3 text-caption text-text-secondary">
      <div><dt className="inline">项目周期 · </dt><dd className="inline">{item.period}</dd></div>
      <div><dt className="inline">我的工作 · </dt><dd className="inline">{item.responsibility}</dd></div>
    </dl>
    {'outcomeTag' in item && item.outcomeTag && <div className="flex flex-wrap items-center gap-4"><mark className="case-marker home-case-outcome text-caption" aria-label={`${item.outcomeTag.label}：${item.outcomeTag.before ? `从 ${item.outcomeTag.before} 提升至` : '提升'} ${item.outcomeTag.after}`}>
      <span>{item.outcomeTag.label}：</span>
      {item.outcomeTag.before && <span>{item.outcomeTag.before}</span>}
      {/* Hugeicons Stroke Rounded · ArrowUp02Icon */}
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5.5V19" />
        <path d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11" />
      </svg>
      <span>{item.outcomeTag.after}</span>
    </mark>{'outcomeNote' in item && item.outcomeNote && <mark className="case-marker text-caption text-text-body">{item.outcomeNote}</mark>}</div>}
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
  const preview = useCasePreviewReveal(active, item.id === 'ye-browser');
  const [slide, setSlide] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const href = item.detailHref;
  const mobileImages = mobileCasePreviews[item.id] ?? [];
  return <article className={`home-case${active ? ' is-active' : ''}${muted ? ' is-muted' : ''}`}>
    <a href={href} className={`home-case-link case-desktop${item.id === 'qixin-brain' || item.id === 'ai-report' || item.id === 'ye-browser' ? ' home-case-qixin' : ''}`} tabIndex={0} aria-disabled={!href || undefined} aria-label={href ? `阅读案例：${item.name}` : `${item.name}，案例整理中`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') onHover(true); }} onPointerLeave={() => onHover(false)}
      onFocus={() => onFocus(true)} onBlur={() => onFocus(false)}>
      <CaseCopy item={item} />
      <div className="case-previews" aria-hidden="true">{item.id === 'ai-report' ? <div ref={preview} className="qixin-preview-group">{['hover-539-5069.webp', 'hover-1363-50416.webp'].map((file, index) => <div key={file} className={`case-preview case-preview-qixin qsight-preview qsight-preview-${index}`}><img src={`${import.meta.env.BASE_URL}images/qsight/${file}`} alt="" /></div>)}</div> : item.id === 'qixin-brain' ? <div ref={preview} className="qixin-preview-group">{['home-cover.webp', 'hover-620-19593.webp', 'hover-2447-7289.webp'].map((file, index) => <div key={file} className={`case-preview case-preview-qixin qixin-preview-${index}`}><img src={`${import.meta.env.BASE_URL}images/qixin/${file}`} alt="" /></div>)}</div>  : item.id === 'ye-browser' ? <div ref={preview} className="qixin-preview-group">{['home-hover-tabs.webp', 'home-hover.webp'].map((file, index) => <div key={file} className={`case-preview case-preview-qixin ye-screen-preview ye-screen-preview-${index}`}><img src={`${import.meta.env.BASE_URL}images/ye/${file}`} alt="" /></div>)}</div> : [0, 1, 2].map(index => <div key={index} className={`case-preview case-preview-${index}`}><Placeholder index={index} /></div>)}</div>
    </a>
    <div className="case-mobile">
      <CaseCopy item={item} />
      <div className="case-strip" ref={strip} role="region" aria-label={`${item.name}界面预览`} tabIndex={0}
        onScroll={event => { const node = event.currentTarget; const first = node.firstElementChild as HTMLElement; if (first) setSlide(Math.max(0, Math.min(mobileImages.length - 1, Math.round(node.scrollLeft / (first.offsetWidth + 8))))); }}>
        {mobileImages.map(image => <div key={image.file} className="case-slide relative min-w-0"><img src={`${import.meta.env.BASE_URL}images/${image.file}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" className="absolute inset-0 block h-full w-full object-contain object-top" /></div>)}
      </div>
      <div className="case-dots" aria-label="选择预览图片">{mobileImages.map((image, index) => <button key={image.file} type="button" aria-label={`第 ${index + 1} 张图片`} aria-pressed={slide === index} onClick={() => { const node = strip.current; const child = node?.children[index] as HTMLElement | undefined; if (node && child) node.scrollTo({ left: index * (child.offsetWidth + 8), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}><span /></button>)}</div>
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
