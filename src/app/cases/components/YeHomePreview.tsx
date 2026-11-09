import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Bookmark, ArrowUp } from 'lucide-react';
import { handDrawnArrowPath } from './QixinAnnotation';
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
  return <><section className="case-subsection" aria-labelledby="ye-home-preview-title">
    <h3 id="ye-home-preview-title">首页设计</h3>
    <div className="case-prose"><p className="case-paragraph">页签<mark className="case-marker">按浏览器窗口独立分栏</mark>，方便看清各窗口的内容。书签借鉴苹果的<mark className="case-marker">米勒分栏</mark>，逐层展开，节省空间并保留层级。选中书签可查看详情和<mark className="case-marker">收藏时间</mark>，判断是否仍值得保留。对话采用助手式设计，<mark className="case-marker">固定在内容区域右侧</mark>。</p></div>
    <div className="ye-home-carousel" ref={root}>
    <figure className="template-preview template-preview-carousel ye-home-preview" aria-label="ye! 首页工作台截图轮播" aria-roledescription="轮播">
      {slides.map((slide, index) => <img key={slide.src} className="ye-home-image" src={`${import.meta.env.BASE_URL}images/ye/${slide.src}`} alt={slide.alt} width={slide.width} height={slide.height} aria-hidden={active !== index} decoding="async" />)}
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
    <figure className="workbench-panels ye-home-details" aria-label="书签详情与页签收藏操作局部展示">
      <div className="ye-home-left-stack">
        <div className="ye-bookmark-detail"><div className="ye-import-specimen" aria-label="带入对话弹框"><div className="ye-import-reference"><Bookmark size={16} strokeWidth={2} /><span>书签</span></div><div className="ye-import-composer"><span className="ye-import-placeholder">补充说明（可选）</span><span className="ye-import-send" aria-hidden="true"><ArrowUp size={16} strokeWidth={2} /></span></div></div></div>
        <div className="ye-folder-actions-detail"><img src={`${import.meta.env.BASE_URL}images/ye/bookmark-folder-actions-v2.webp`} alt="书签分栏目录与分组菜单，支持带入对话、移动、新建分组、重命名、解散分组和删除" width="1534" height="1156" loading="lazy" decoding="async" /></div>
      </div>
      <div className="ye-collect-detail"><img src={`${import.meta.env.BASE_URL}images/ye/tab-collect-full.webp`} alt="页签菜单中的收藏操作，可选择分组或让 AI 建议" width="1496" height="1314" loading="lazy" decoding="async" /></div>
      <aside className="generator-paper case-pair-sticky-note ye-import-note">直接带入页签或分组，减少描述负担，避免 AI 误解整理范围。</aside>
      <svg className="ye-import-arrows" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d={handDrawnArrowPath([73.5, 28.7], [39, 25], 13)} />
        <path d={handDrawnArrowPath([39.6, 68.7], [35.5, 32], 9)} />
      </svg>
    </figure>
  </section>
  <section className="case-subsection" aria-labelledby="ye-character-title">
    <h3 id="ye-character-title">角色设定</h3>
    <div className="case-prose"><p className="case-paragraph">为了让整个产品更有人情味，我为这个插件设计了一个角色。</p></div>
  </section>
  <section className="case-subsection" aria-labelledby="ye-follow-up-title">
    <h3 id="ye-follow-up-title">关于追问和审查</h3>
    <div className="case-prose"><p className="case-paragraph">用户的一句话可能有多种理解，也可能缺少完成任务所需的信息。我希望 AI <mark className="case-marker">先结合上下文理解需求，仍不明确时再追问</mark>，避免理解错了就直接执行。问题要具体，让用户知道还缺什么、为什么需要补充，并自然地接着当前对话问下去。</p></div>
    <figure className="ye-clarification-gallery" aria-label="追问与方案预览截图">
    <img className="ye-clarification-image" src={`${import.meta.env.BASE_URL}images/ye/clarification-example.webp`} alt="AI 追问这次想怎么整理，提供整体重整、只收拢散落书签、只清理重复与失效链接三个选项，并支持补充说明" width="1172" height="746" loading="lazy" decoding="async" />
    <img className="ye-clarification-image" src={`${import.meta.env.BASE_URL}images/ye/clarification-existing-folders.webp`} alt="目录结构方案：选择按目录树整理或沿用现有文件夹归位" width="1175" height="637" loading="lazy" decoding="async" />
    <img className="ye-clarification-image" src={`${import.meta.env.BASE_URL}images/ye/clarification-structure-options.webp`} alt="目录结构方案：选择精细版或精简版，并可补充说明" width="1173" height="566" loading="lazy" decoding="async" />
    <img className="ye-clarification-image" src={`${import.meta.env.BASE_URL}images/ye/clarification-plan-preview.webp`} alt="方案预览：展示设计目录及子目录的分类说明与预计数量" width="1173" height="609" loading="lazy" decoding="async" />
    </figure>
    <figure className="workbench-panels ye-review-pair" aria-label="审查对话展示">
    <div>
    <span className="ye-review-conversation-shadow"><img className="ye-review-conversation-image" src={`${import.meta.env.BASE_URL}images/ye/review-conversation.webp`} alt="用户指出书签分类问题后，AI 查看实际内容、修正误判，并列出仍需用户确认的存疑项" width="1222" height="2418" loading="lazy" decoding="async" /></span>
    </div>
    <div className="ye-review-plan-panel"><span className="ye-review-plan-shadow"><img className="ye-review-plan-image" src={`${import.meta.env.BASE_URL}images/ye/review-plan.webp`} alt="整理方案审查：查看存疑清单、目录调整和书签来源，确认后应用" width="2892" height="2734" loading="lazy" decoding="async" /></span></div>
    </figure>
  </section></>;
}
