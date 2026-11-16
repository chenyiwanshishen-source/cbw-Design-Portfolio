import { useState } from 'react';
import { useCasePreviewReveal } from './useCasePreviewReveal';
import './playground-entry.css';

export function PlaygroundEntry() {
  const [active, setActive] = useState(false);
  const preview = useCasePreviewReveal(active);

  return <section id="playground" className="home-section" aria-labelledby="playground-entry-title">
    <a className={`playground-entry${active ? ' is-active' : ''}`} href="#/playground"
      onPointerEnter={() => setActive(true)}
      onMouseEnter={() => setActive(true)}
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
