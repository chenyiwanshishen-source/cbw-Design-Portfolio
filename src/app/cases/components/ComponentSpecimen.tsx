import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ComponentSpecimen() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const images = root.current!.querySelectorAll('.qixin-component-slot img');
      gsap.from(images, {
        x: i => [28, -20, 16, -24, -18, 24, -16, 20, -28, 24][i],
        y: i => [-32, 20, -16, 28, 24, -28, 18, -20, 32, -24][i],
        rotation: i => [-7, 5, -4, 6, 4, -5, 3, -4, -6, 5][i],
        duration: 1.1,
        stagger: 0.045,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%', toggleActions: 'play none none none', once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="qixin-component-slots"><img className="qixin-component-toolbar" src={`${import.meta.env.BASE_URL}images/qixin/components-canvas-toolbar.webp`} width={80} height={248} alt="画布工具栏：放大、缩小、刷新和全屏" loading="lazy" />{[[0, 1, 2, 3], [4, 5, 6, 7], [8, 9]].map((items, slot) => <div key={slot} className={`qixin-component-slot qixin-component-slot-${slot + 1}`}>{items.map(item => <img key={item} src={`${import.meta.env.BASE_URL}images/qixin/components-slot-${item}.webp`} width={[160, 174, 216, 160, 368, 368, 368, 368, 496, 496][item]} alt={['数据添加成功提示', '排查任务已提交提示', '添加失败提示', '请选择企业提示', '数据添加进度通知', '部分失败通知', '操作成功通知', '企业监控报告通知', '删除企业确认弹窗', '审批确认弹窗'][item]} loading="lazy" />)}</div>)}</div>;
}
