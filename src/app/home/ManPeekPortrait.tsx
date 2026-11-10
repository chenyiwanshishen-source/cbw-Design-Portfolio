import { useEffect, useRef } from 'react';

export function ManPeekPortrait() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const node = canvas.current;
    const context = node?.getContext('2d');
    if (!node || !context) return;
    const image = new Image();
    let cancelled = false;
    let frame = 0;
    let start: number | undefined;
    let previous = -1;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw = (index: number) => {
      if (index === previous) return;
      context.clearRect(0, 0, 512, 512);
      context.drawImage(image, (index % 16) * 512, Math.floor(index / 16) * 512, 512, 512, 0, 0, 512, 512);
      previous = index;
    };
    const play = (time: number) => {
      if (cancelled) return;
      if (reduced.matches) { draw(191); return; }
      // Let the existing opening finish before the character enters.
      if (document.querySelector('.intro-blueprint')) { frame = requestAnimationFrame(play); return; }
      start ??= time;
      const index = Math.min(191, Math.floor((time - start) * 24 / 1000));
      draw(index);
      if (index < 191) frame = requestAnimationFrame(play);
    };
    image.src = `${import.meta.env.BASE_URL}images/home/man-peek/man-peek.webp`;
    image.decode().then(() => {
      if (!cancelled) frame = requestAnimationFrame(play);
    }).catch(() => { /* Keep the surrounding introduction readable if the asset fails. */ });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, []);
  return <figure className="home-portrait man-peek-portrait" aria-label="人物探身并挥手打招呼，播放一次后停留">
    <canvas ref={canvas} width="512" height="512" role="img" aria-label="戴眼镜的人物探身挥手" />
  </figure>;
}
