import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import './chain-entry-comparison.css';

const versions = [
  { label: 'BEFORE', text: '列表展示，信息逐行排列', src: 'custom-chain-entry-before.webp' },
  { label: 'AFTER', text: '卡片展示，按分组浏览自定义产业链', src: 'custom-chain-card-entry.webp' },
];

export function ChainEntryComparison() {
  const [position, setPosition] = useState(50);
  const stage = useRef<HTMLDivElement>(null);
  const update = (event: PointerEvent<HTMLDivElement>) => {
    const rect = stage.current?.getBoundingClientRect();
    if (rect) setPosition(Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)));
  };
  return <figure className="chain-entry-comparison">
    <div className="chain-entry-stage" ref={stage}>
      {versions.map((version, index) => <div key={version.label} className={`chain-entry-layer${index === 1 ? ' chain-entry-after' : ''}`} style={index === 0 ? { clipPath: `inset(0 ${100 - position}% 0 0)`, zIndex: 1 } : undefined}>
        <div className="chain-entry-heading"><h4>{version.label}</h4><p>{version.text}</p></div>
        <div className="chain-entry-image"><div className="chain-entry-image-wrap"><img draggable={false} src={`${import.meta.env.BASE_URL}images/qixin/${version.src}`} alt={version.text} width={1440} height={900} loading="lazy" />
          {index === 1 && <div className="chain-entry-annotations">
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M 340 125 H 185 M 580 185 H 810 M 740 350 H 810" /><circle cx="340" cy="125" r="2" /><circle cx="580" cy="185" r="2" /><circle cx="740" cy="350" r="2" /><path d="m 190 122 -5 3 5 3 M 805 182 l 5 3 -5 3 M 805 347 l 5 3 -5 3" /></svg>
            <div className="chain-entry-callout chain-entry-callout-tabs"><span>分类切换</span></div>
            <div className="chain-entry-callout chain-entry-callout-card"><span>卡片更大，更聚焦</span></div>
            <div className="chain-entry-callout chain-entry-callout-add"><span>明确的新增入口</span></div>
          </div>}
        </div></div>
      </div>)}
      <div className="chain-entry-handle" style={{ left: `${position}%` }} role="slider" tabIndex={0} aria-label="拖动对比列表入口与卡片入口" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)}
        onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); update(event); }}
        onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event); }}
        onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onKeyDown={event => {
          if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            setPosition(value => event.key === 'Home' ? 0 : event.key === 'End' ? 100 : Math.max(0, Math.min(100, value + (event.key === 'ArrowLeft' ? -5 : 5))));
          }
        }}><span aria-hidden="true">‹ ›</span></div>
    </div>
  </figure>;
}
