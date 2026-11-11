import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export function DiagramCanvas({ journey = false, embedded = false }: { journey?: boolean; embedded?: boolean }) {
  const surface = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const zoomOffset = useRef<{left: number; top: number} | null>(null);
  const [width, setWidth] = useState(journey ? 2400 : 2600);
  useLayoutEffect(() => {
    const el = surface.current, offset = zoomOffset.current;
    if (el && offset) { el.scrollLeft = offset.left; el.scrollTop = offset.top; zoomOffset.current = null; }
  }, [width]);
  useEffect(() => {
    const el = surface.current;
    if (!el) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      if (!event.ctrlKey && !event.metaKey) {
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientHeight : 1;
        if (event.shiftKey) el.scrollLeft += (event.deltaX || event.deltaY) * unit;
        else { el.scrollLeft += event.deltaX * unit; el.scrollTop += event.deltaY * unit; }
        return;
      }
      const bounds = el.getBoundingClientRect();
      const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
      const next = Math.max(el.clientWidth, Math.min(6500, width * Math.exp(-event.deltaY * (event.deltaMode === 1 ? .025 : .0015))));
      const ratio = next / width;
      const left = (el.scrollLeft + x) * ratio - x;
      const top = (el.scrollTop + y) * ratio - y;
      zoomOffset.current = { left: Math.max(0, left), top: Math.max(0, top) };
      setWidth(next);
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, [width]);
  const end = () => { drag.current = null; if(surface.current) delete surface.current.dataset.dragging; };
  return <div className={`case-diagram-canvas${embedded ? ' case-diagram-embedded' : ''}`} ref={surface} tabIndex={0}
    role="region" aria-label={`${journey ? '用户旅程图' : '用户流程图'}，拖拽移动，滚轮浏览，Ctrl 或 Command 加滚轮缩放，Shift 加滚轮横向滚动`}
    onPointerDown={event => {
      if (event.button !== 0) return;
      event.stopPropagation();
      const el = event.currentTarget;
      el.setPointerCapture(event.pointerId);
      drag.current = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop };
      el.dataset.dragging = 'true';
    }}
    onPointerMove={event => {
      if (!drag.current) return;
      const d = drag.current;
      event.currentTarget.scrollLeft = d.left + d.x - event.clientX;
      event.currentTarget.scrollTop = d.top + d.y - event.clientY;
    }}
    onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
    onKeyDown={event => {
      const directions: Record<string, [number, number]> = { ArrowLeft: [-120, 0], ArrowRight: [120, 0], ArrowUp: [0, -80], ArrowDown: [0, 80] };
      const delta = directions[event.key];
      if (delta) { event.preventDefault(); event.currentTarget.scrollBy(delta[0], delta[1]); }
    }}>
    <img style={{ width, minWidth: width }} src={`${import.meta.env.BASE_URL}images/qsight/${journey ? 'user-journey' : 'user-flow'}.svg`} draggable={false}
      alt={journey ? '报告生产全过程：现状旅程与 Qsight 介入点' : 'Qsight 完整用户流程，包含生成、核查、修改返回路径与最终交付'} />
  </div>;
}
export function UserFlow() {
  const source = `${import.meta.env.BASE_URL}images/qsight/user-journey.svg`;
  return <figure className="case-journey-thumbnail">
    <div>
      <img src={source} alt="报告生产全过程：现状旅程与 Qsight 介入点" loading="lazy" />
    </div>
  </figure>;
}
