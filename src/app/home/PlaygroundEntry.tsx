import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import './playground-entry.css';

export function PlaygroundEntry() {
  const [active, setActive] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const reveal = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!preview.current) return;
    const media = gsap.matchMedia();
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, context => {
      reveal.current = gsap.fromTo(preview.current!.children,
        { yPercent: 100, rotation: (index: number) => index === 0 ? -8 : 7, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, stagger: context.conditions?.reduced ? 0 : 0.035, duration: context.conditions?.reduced ? 0 : 0.5, ease: 'back.out(1.5)', paused: true }
      );
      if (active) reveal.current.progress(1);
      return () => { reveal.current = null; };
    });
    return () => media.revert();
  }, { scope: preview });

  useEffect(() => {
    if (active) reveal.current?.timeScale(1).play();
    else reveal.current?.timeScale(1.5).reverse();
  }, [active]);

  return <section id="playground" className="home-section" aria-labelledby="playground-entry-title">
    <a className={`playground-entry${active ? ' is-active' : ''}`} href="#/playground"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(true); }}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(false); }}>
      <div className="playground-entry-copy">
        <h2 id="playground-entry-title" className="text-h2 font-normal">更多作品</h2>
        <p>界面设计 · 数据可视化</p>
      </div>
      <div className="playground-previews" aria-hidden="true">
        <div ref={preview} className="playground-preview-group">
          <div className="playground-preview playground-preview-0">
            <img src={`${import.meta.env.BASE_URL}images/playground/shiqu-home.webp`} width={375} height={812} alt="" decoding="async" />
          </div>
          <div className="playground-preview playground-preview-1">
            <img src={`${import.meta.env.BASE_URL}images/playground/shiqu-auctions.webp`} width={375} height={812} alt="" decoding="async" />
          </div>
        </div>
      </div>
    </a>
  </section>;
}
