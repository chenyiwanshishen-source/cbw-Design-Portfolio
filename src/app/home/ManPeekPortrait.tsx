import { useEffect, useRef } from 'react';

export function ManPeekPortrait() {
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const node = image.current;
    if (!node) return;
    const source = `${import.meta.env.BASE_URL}images/home/man-peek/man-peek-original.webp`;
    // Start after the existing homepage opening, so the entrance remains visible.
    let frame = 0;
    const start = () => {
      if (document.querySelector('.intro-blueprint')) {
        frame = requestAnimationFrame(start);
      } else {
        node.src = source;
      }
    };
    frame = requestAnimationFrame(start);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <figure className="home-portrait man-peek-portrait" aria-label="人物探身并挥手打招呼">
    <img ref={image} width="320" height="320" alt="戴眼镜的人物探身挥手" />
  </figure>;
}
