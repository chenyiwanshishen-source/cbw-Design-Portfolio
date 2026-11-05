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
        <div className="chain-entry-image"><img draggable={false} src={`${import.meta.env.BASE_URL}images/qixin/${version.src}`} alt={version.text} width={1440} height={900} loading="lazy" /></div>
        {index === 1 && <svg className="chain-entry-next-arrow" viewBox="0 0 420 180" fill="none" aria-hidden="true"><path d="M390 12 C376 57 330 79 306 84 C276 91 290 48 308 49 C344 80 274 109 229 127 C177 149 116 161 35 166 M64 146 Q46 158 30 167 Q52 171 73 173" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
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
