import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
const cards = [
  { file: 'news', title: '新闻来源', width: 748, height: 302 },
  { file: 'news-group', title: '多条新闻', width: 748, height: 786 },
  { file: 'enterprise', title: '企业数据', width: 748, height: 728 },
  { file: 'knowledge', title: '知识库', width: 748, height: 224 },
  { file: 'calculation', title: '模型计算', width: 748, height: 336 },
];
export function SourceEvidence() {
  const root = useRef<HTMLElement>(null);
  const [arrow, setArrow] = useState('');
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const update = () => {
      const board = el.getBoundingClientRect();
      const report = el.querySelector('.source-evidence-report')!.getBoundingClientRect();
      const card = el.querySelectorAll('.source-evidence-card')[4].getBoundingClientRect();
      const sx = report.right - board.left - 100;
      const sy = report.top - board.top + report.height * .63;
      const tx = card.left - board.left + 12;
      const ty = card.top - board.top + Math.min(60, card.height * .35);
      setArrow(`M${sx} ${sy} C${sx + 58} ${sy - 12} ${tx - 70} ${ty - 32} ${tx} ${ty} M${tx - 15} ${ty - 12} L${tx} ${ty} L${tx - 19} ${ty + 8}`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    observer.observe(el.querySelector('.source-evidence-report')!);
    update();
    return () => observer.disconnect();
  }, []);
  useGSAP(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll('.source-evidence-card');
    const line = root.current.querySelector('.source-evidence-arrow path');
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(items, { x: 0, y: 0, rotation: 0, scale: 1 });
      gsap.set(line, { strokeDashoffset: 0 });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      items.forEach((item, i) => { gsap.set(item, { rotation: i % 2 ? 1.5 : -1.5 }); gsap.to(item, { y: i % 2 ? 2 : -2, duration: 3 + i * .2, repeat: -1, yoyo: true, ease: 'sine.inOut' }); });
      gsap.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .6, ease: 'power2.out' });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [arrow], revertOnUpdate: true });
  const base = `${import.meta.env.BASE_URL}images/qsight/`;
  return <figure className="source-evidence" ref={root} aria-label="正文引用与不同类型来源卡片的对应展示">
    <div className="source-evidence-report"><img src={`${base}source-report.webp`} alt="报告正文中的引用编号与模型运算来源卡片" width={2880} height={1800} loading="lazy" /></div>
    <div className="source-evidence-deck" role="group" aria-label="来源卡片示例">
      {cards.map((card, i) => <div className="source-evidence-card" key={card.file} style={{ top: `${[0, 12, 32, 62, 77][i]}%`, left: i % 2 ? '36%' : '0', zIndex: i + 1 }}>
        <img src={`${base}source-${card.file}.webp`} alt={`${card.title}卡片，显示该类依据的具体信息`} width={card.width} height={card.height} loading="lazy" />
      </div>)}
    </div>
    <svg className="source-evidence-arrow" fill="none" aria-hidden="true"><path pathLength="1" strokeDasharray="1" d={arrow} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </figure>;
}
