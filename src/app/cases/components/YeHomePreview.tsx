import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

const slides = [
  { src: 'home-desktop.webp', label: '页签工作台', alt: 'ye! 首页工作台：左侧为页签与书签导航，中间按窗口和分组展示标签页，右侧为 AI 对话区', width: 4986, height: 2646 },
  { src: 'bookmarks-desktop.webp', label: '书签管理', alt: 'ye! 书签管理：按层级浏览文件夹与书签，查看书签详情，右侧保留 AI 对话区', width: 4968, height: 2624 },
];

export function YeHomePreview() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const previous = useRef(0);
  const direction = useRef(1);
  const select = (index: number, travel = index > active ? 1 : -1) => {
    direction.current = travel;
    setActive((index + slides.length) % slides.length);
  };
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    const schedule = () => {
      window.clearInterval(timer);
      if (!media.matches) timer = window.setInterval(() => { direction.current = 1; setActive(index => (index + 1) % slides.length); }, 4200);
    };
    schedule();
    media.addEventListener('change', schedule);
    return () => { window.clearInterval(timer); media.removeEventListener('change', schedule); };
  }, [active]);
  useGSAP(() => {
    if (!root.current) return;
    const layers = root.current.querySelectorAll('.ye-home-image');
    const mm = gsap.matchMedia();
    const changed = previous.current !== active;
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(layers, { autoAlpha: 0, x: 0, scale: 1 });
      gsap.set(layers[active], { autoAlpha: 1 });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(layers, { autoAlpha: 0, x: 0, scale: 1 });
      if (!changed) { gsap.set(layers[active], { autoAlpha: 1 }); return; }
      gsap.set(layers[previous.current], { autoAlpha: 1 });
      gsap.set(layers[active], { x: direction.current * 40, scale: .96 });
      gsap.timeline()
        .to(layers[previous.current], { autoAlpha: 0, x: direction.current * -24, scale: .98, duration: .2, ease: 'power2.in' }, 0)
        .to(layers[active], { autoAlpha: 1, duration: .18 }, .1)
        .to(layers[active], { x: 0, scale: 1, duration: .75, ease: 'elastic.out(1, 0.7)' }, .1);
      gsap.fromTo(root.current!.querySelectorAll('.report-edit-dot > span')[active], { scale: .6 }, { scale: 1, duration: .65, ease: 'elastic.out(1, 0.5)' });
    });
    previous.current = active;
    return () => mm.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });
  const { contextSafe } = useGSAP({ scope: root });
  const press = contextSafe((button: HTMLButtonElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(button, { scale: .84 }, { scale: 1, duration: .55, ease: 'elastic.out(1, 0.5)', overwrite: true });
  });
  return <section className="case-subsection" aria-labelledby="ye-home-preview-title">
    <h3 id="ye-home-preview-title">首页设计</h3>
    <div className="case-prose"><p className="case-paragraph">在「全部页签」中，我按浏览器窗口分栏展示，让每个窗口的页签独立呈现，方便用户看清当前打开的内容。书签则采用米勒分栏，借鉴苹果的分栏浏览方式，逐层展开文件夹，在有限空间内保留清楚的层级关系。选中具体书签后，可以查看详情和收藏时间，帮助用户判断这条收藏现在是否还有用。</p></div>
    <div className="ye-home-carousel" ref={root}>
    <figure className="template-preview template-preview-carousel ye-home-preview" aria-label="ye! 首页工作台截图轮播" aria-roledescription="轮播">
      <div className="ye-home-stage">{slides.map((slide, index) => <img key={slide.src} className="ye-home-image" src={`${import.meta.env.BASE_URL}images/ye/${slide.src}`} alt={slide.alt} width={slide.width} height={slide.height} aria-hidden={active !== index} decoding="async" />)}</div>
    </figure>
    <div className="ye-home-controls">
      {[-1, 1].map(direction => <button key={direction} type="button" className={`report-edit-arrow ${direction < 0 ? 'is-previous' : 'is-next'}`} aria-label={direction < 0 ? '上一张工作台截图' : '下一张工作台截图'} onClick={event => { press(event.currentTarget); select(active + direction, direction); }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={direction < 0 ? 'M14 5 7 12 14 19' : 'm10 5 7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>)}
      <div className="report-edit-pagination" role="group" aria-label="选择工作台截图">
        {slides.map((slide, index) => <button key={slide.src} type="button" className="report-edit-dot" aria-label={`查看${slide.label}`} aria-pressed={active === index} onClick={event => { press(event.currentTarget); select(index); }}><span /></button>)}
      </div>
    </div>
    </div>
  </section>;
}
