import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function ManPeekPortrait() {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    const node = image.current;
    if (!node) return;
    let cancelled = false;
    let frame = 0;
    let objectUrl: string | undefined;
    const controller = new AbortController();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeline = gsap.timeline({ paused: true });
    const rect = root.current?.querySelector('.man-peek-outline');
    const cursor = root.current?.querySelector('.man-peek-cursor');
    const handles = root.current?.querySelector('.man-peek-handles');
    const drag = { size: reduced ? 318 : 0 };
    const renderDrag = () => {
      rect?.setAttribute('width', String(drag.size));
      rect?.setAttribute('height', String(drag.size));
      cursor?.setAttribute('transform', `translate(${drag.size - 2} ${drag.size - 2})`);
    };
    renderDrag();
    timeline.to(cursor, { opacity: reduced ? 0 : 1, duration: reduced ? 0 : 0.2 })
      .to(drag, { size: 318, duration: reduced ? 0 : 1.35, ease: 'power2.inOut', onUpdate: renderDrag }, '+=0.15')
      .to(handles, { opacity: 1, duration: reduced ? 0 : 0.15 })
      .to(cursor, { opacity: 0, duration: reduced ? 0 : 0.25 }, '+=0.15')
      .call(() => { if (objectUrl) node.src = objectUrl; })
      .set(node, { autoAlpha: 1 });
    const start = () => {
      if (cancelled) return;
      if (document.querySelector('.intro-blueprint')) frame = requestAnimationFrame(start);
      else timeline.play();
    };
    const file = reduced ? 'man-peek-still.webp' : 'man-peek-original.webp';
    fetch(`${import.meta.env.BASE_URL}images/home/man-peek/${file}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Image unavailable'); return response.blob(); })
      .then(blob => { if (!cancelled) { objectUrl = URL.createObjectURL(blob); frame = requestAnimationFrame(start); } })
      .catch(() => { /* Keep the introduction usable if the image cannot load. */ });
    return () => { cancelled = true; controller.abort(); cancelAnimationFrame(frame); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, { scope: root });
  return <figure ref={root} className="home-portrait man-peek-portrait" aria-label="黄色选框画完后，人物从右侧探身挥手">
    <div className="man-peek-window">
      <div className="man-peek-clip"><img ref={image} width="320" height="320" alt="戴眼镜的人物探身挥手" /></div>
      <svg className="man-peek-frame" viewBox="0 0 320 320" fill="none" aria-hidden="true">
        <rect className="man-peek-outline" x="1" y="1" width="0" height="0" />
        <g className="man-peek-handles">
          {[[1, 1], [319, 1], [319, 319], [1, 319]].map(([x, y]) => <rect key={`${x}-${y}`} className="man-peek-handle" x={x - 4} y={y - 4} width="8" height="8" />)}
        </g>
        {/* Hugeicons Cursor02Icon, MIT free outline rendered with a solid fill. */}
        <g className="man-peek-cursor"><path d="M9.80282 4.62973L15.8364 6.99069C19.3164 8.35243 21.0564 9.03329 20.9987 10.1133C20.941 11.1934 19.1251 11.6886 15.4933 12.6791C14.412 12.974 13.8713 13.1215 13.4964 13.4963C13.1215 13.8712 12.9741 14.4119 12.6791 15.4933C11.6887 19.125 11.1934 20.9409 10.1134 20.9986C9.03335 21.0563 8.35249 19.3163 6.99075 15.8363L4.62979 9.80276C3.20411 6.15934 2.49127 4.33764 3.41448 3.41442C4.3377 2.49121 6.15941 3.20405 9.80282 4.62973Z" /></g>
      </svg>
    </div>
  </figure>;
}
