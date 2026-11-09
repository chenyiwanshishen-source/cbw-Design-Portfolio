import { useState } from 'react';

const slides = [
  { src: 'home-desktop.webp', label: '页签工作台', alt: 'ye! 首页工作台：左侧为页签与书签导航，中间按窗口和分组展示标签页，右侧为 AI 对话区', width: 4986, height: 2646 },
  { src: 'bookmarks-desktop.webp', label: '书签管理', alt: 'ye! 书签管理：按层级浏览文件夹与书签，查看书签详情，右侧保留 AI 对话区', width: 4968, height: 2624 },
];

export function YeHomePreview() {
  const [active, setActive] = useState(0);
  const select = (index: number) => setActive((index + slides.length) % slides.length);
  return <section className="case-subsection" aria-labelledby="ye-home-preview-title">
    <h3 id="ye-home-preview-title">首页工作台</h3>
    <div className="ye-home-carousel">
    <figure className="template-preview template-preview-carousel ye-home-preview" aria-label="ye! 首页工作台截图轮播" aria-roledescription="轮播">
      <div className="template-preview-stage">
        <div className="template-preview-screen" data-device="desktop">
          <div className="template-preview-media" aria-live="polite">
            <img src={`${import.meta.env.BASE_URL}images/ye/${slides[active].src}`} alt={slides[active].alt} width={slides[active].width} height={slides[active].height} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </figure>
    <div className="ye-home-controls">
      {[-1, 1].map(direction => <button key={direction} type="button" className={`report-edit-arrow ${direction < 0 ? 'is-previous' : 'is-next'}`} aria-label={direction < 0 ? '上一张工作台截图' : '下一张工作台截图'} onClick={() => select(active + direction)}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={direction < 0 ? 'M14 5 7 12 14 19' : 'm10 5 7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>)}
      <div className="report-edit-pagination" role="group" aria-label="选择工作台截图">
        {slides.map((slide, index) => <button key={slide.src} type="button" className="report-edit-dot" aria-label={`查看${slide.label}`} aria-pressed={active === index} onClick={() => select(index)}><span /></button>)}
      </div>
    </div>
    </div>
  </section>;
}
