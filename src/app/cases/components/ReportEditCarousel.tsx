import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
const defaultSlides = [
  { file: 'report-sources-web.webp', alt: '报告正文中选中段落，显示 AI 改写工具栏' },
  { file: 'report-edit-1.webp', alt: '选中报告段落，输入修改要求或选择润色、扩写、缩写与行文风格' },
  { file: 'report-edit-2.webp', alt: '查看 AI 改写结果，可插入段落或替换选段' },
];

export function ReportEditCarousel({ slides = defaultSlides, imageFolder = 'qsight', label = '报告编辑' }: { slides?: { file: string; alt: string }[]; imageFolder?: string; label?: string }) {
  const root = useRef<HTMLElement>(null);
  const previous = useRef(0);
  const direction = useRef(1);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const timer = window.setInterval(() => { direction.current = 1; setActive(index => (index + 1) % slides.length); }, 4200);
    const stop = () => { if (media.matches) window.clearInterval(timer); };
    media.addEventListener('change', stop);
    return () => { window.clearInterval(timer); media.removeEventListener('change', stop); };
  }, [active]);
  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const layers = el.querySelectorAll('.report-edit-slide');
    const dots = el.querySelectorAll('.report-edit-dot > span');
    const mm = gsap.matchMedia();
    const changed = previous.current !== active;
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(layers, { autoAlpha: 0, x: 0, scale: 1 });
      gsap.set(layers[active], { autoAlpha: 1 });
      gsap.set(dots, { scale: 1 });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(layers, { autoAlpha: 0, x: 0, scale: 1 });
      if (!changed) { gsap.set(layers[active], { autoAlpha: 1 }); return; }
      gsap.set(layers[previous.current], { autoAlpha: 1 });
      gsap.set(layers[active], { x: direction.current * 40, scale: .96 });
      gsap.timeline()
        .to(layers[previous.current], { autoAlpha: 0, x: direction.current * -24, scale: .98, duration: .2, ease: 'power2.in' }, 0)
        .to(layers[active], { autoAlpha: 1, duration: .18 }, .1)
        .to(layers[active], { x: 0, scale: 1, duration: .75, ease: 'elastic.out(1, 0.7)' }, .1)
        .fromTo(dots[active], { scale: .6 }, { scale: 1, duration: .65, ease: 'elastic.out(1, 0.5)' }, 0);
    });
    previous.current = active;
    return () => mm.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });
  const { contextSafe } = useGSAP({ scope: root });
  const select = (index: number, dir = index > active ? 1 : -1) => {
    if (index === active) return;
    direction.current = dir;
    setActive(index);
  };
  const press = contextSafe((button: HTMLButtonElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(button, { scale: .84 }, { scale: 1, duration: .55, ease: 'elastic.out(1, 0.5)', overwrite: true });
  });
  return <figure ref={root} className="report-edit-carousel" aria-label={`${label}操作展示`} aria-roledescription="轮播" onKeyDown={event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); select((active + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length, event.key === 'ArrowRight' ? 1 : -1);
    }
  }}>
    <div className="report-edit-stage">
      {slides.map((slide, index) => <div className="report-edit-slide" key={slide.file} aria-hidden={active !== index}>
        <img src={`${import.meta.env.BASE_URL}images/${imageFolder}/${slide.file}`} alt={slide.alt} width={2880} height={1800} draggable={false} />
      </div>)}
    </div>
    {[-1, 1].map(dir => <button key={dir} type="button" className={`report-edit-arrow ${dir < 0 ? 'is-previous' : 'is-next'}`} aria-label={dir < 0 ? `上一张${label}图` : `下一张${label}图`} onClick={event => { press(event.currentTarget); select((active + dir + slides.length) % slides.length, dir); }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={dir < 0 ? 'M14 5 7 12 14 19' : 'm10 5 7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>)}
    <div className="report-edit-pagination" role="group" aria-label={`选择${label}图片`}>
      {slides.map((slide, index) => <button type="button" key={slide.file} className="report-edit-dot" aria-label={`查看第 ${index + 1} 张${label}图`} aria-pressed={active === index} onClick={event => { press(event.currentTarget); select(index); }}><span /></button>)}
    </div>
    <span className="sr-only" aria-live="off">第 {active + 1} 张，共 {slides.length} 张：{slides[active].alt}</span>
  </figure>;
}
