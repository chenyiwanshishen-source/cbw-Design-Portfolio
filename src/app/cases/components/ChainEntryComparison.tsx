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
  return <div className="chain-entry-flow"><figure className="chain-entry-comparison">
    <div className="chain-entry-stage" ref={stage}>
      {versions.map((version, index) => <div key={version.label} className={`chain-entry-layer${index === 1 ? ' chain-entry-after' : ''}`} style={index === 0 ? { clipPath: `inset(0 ${100 - position}% 0 0)`, zIndex: 1 } : undefined}>
        <div className="chain-entry-heading"><h4>{version.label}</h4><p>{version.text}</p></div>
        <div className="chain-entry-image"><img draggable={false} src={`${import.meta.env.BASE_URL}images/qixin/${version.src}`} alt={version.text} width={1440} height={900} loading="lazy" /></div>
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
  </figure>
    <svg className="chain-entry-next-arrow" viewBox="0 0 420 220" fill="none" aria-hidden="true" style={{ opacity: position < 90 ? 1 : 0 }}><path d="M340 20 C336 82 253 136 164 191 M182 168 Q172 181 159 195 Q177 194 195 189" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>
  </div>;
}
