import './mvp-background.css';
import { DiagramCanvas } from './UserFlow';
import { useState, useRef } from 'react';
import type { PointerEvent } from 'react';

export function MvpComparison() {
  const [position, setPosition] = useState(50);
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<boolean>(false);
  const begin = (event: PointerEvent<HTMLDivElement>, _mode: 'compare') => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = true;
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!gesture.current || !stage.current) return;
    const bounds = stage.current.getBoundingClientRect();
    setPosition(Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100)));
  };
  const end = () => { gesture.current = false; };
  return <figure className="mvp-comparison">
    <div ref={stage} className="mvp-comparison-stage">
      <div className="mvp-comparison-layer mvp-comparison-prototype"><img draggable={false} src={`${import.meta.env.BASE_URL}images/qsight/mvp-key-screens.webp`} alt="中保真原型的四个页面" /><span className="mvp-prototype-title">Qsight · 中保真原型</span></div>
      <div className="mvp-comparison-layer mvp-comparison-flow" style={{width:`${position}%`}}><DiagramCanvas embedded /></div>
      <div className="mvp-comparison-divider" style={{left:`${position}%`}} role="slider" tabIndex={0} aria-label="左右拖动对照" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} onPointerDown={event => begin(event, 'compare')} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); setPosition(value => Math.max(0, Math.min(100, value + (event.key === 'ArrowLeft' ? -5 : 5)))); } }} />
    </div>
  </figure>;
}
