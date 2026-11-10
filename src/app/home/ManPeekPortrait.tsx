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
    timeline.to('.man-peek-outline', { strokeDashoffset: 0, duration: reduced ? 0 : 1.1, ease: 'power2.inOut' })
      .to('.man-peek-handle', { opacity: 1, duration: reduced ? 0 : 0.2, stagger: reduced ? 0 : 0.06 }, '-=0.15')
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
        <rect className="man-peek-outline" x="1" y="1" width="318" height="318" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
        {[[1, 1], [319, 1], [319, 319], [1, 319]].map(([x, y]) => <rect key={`${x}-${y}`} className="man-peek-handle" x={x - 4} y={y - 4} width="8" height="8" />)}
      </svg>
    </div>
  </figure>;
}
