import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SpacingMarks({ toolbar = false, compact = false }: { toolbar?: boolean; compact?: boolean }) {
  const h = toolbar ? 248 : compact ? 226 : 312;
  // Exported images include shadows: toolbar origin (20,12), dialog origin (32,20).
  const dims = toolbar
    ? [{ x: 20, y: 12, w: 8, h: 208, label: '8', lx: -2, ly: 116, axis: 'x' }, { x: 28, y: 40, w: 24, h: 4, label: '4', lx: 76, ly: 42, axis: 'y' }, { x: 28, y: 60, w: 24, h: 8, label: '8', lx: 76, ly: 72, axis: 'y' }]
    : [{ x: 32, y: 20, w: 24, h: compact ? 162 : 248, label: '24', lx: 10, ly: compact ? 110 : 150, axis: 'x' }, { x: 56, y: 20, w: 384, h: 24, label: '24', lx: 248, ly: 4, axis: 'y' }, { x: 56, y: 66, w: 384, h: 16, label: '16', lx: 482, ly: 74, axis: 'y' }];
  return <svg className="component-spacing-marks" viewBox={`0 0 ${toolbar ? 80 : 496} ${h}`} aria-label={toolbar ? '工具栏内边距8，图文间距4，操作项间距8像素' : '弹窗内边距24，标题与正文间距16像素'}>{dims.map((d, i) => {
    const horizontal = d.axis === 'x';
    const edge = d.lx > d.x + d.w ? d.lx : d.lx < d.x ? d.lx : d.x + d.w;
    return <g key={i}>
      <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="#00a6dc" fillOpacity=".08" stroke="#00a6dc" strokeOpacity=".35" strokeWidth="1" />
      {horizontal ? <path d={`M${d.x},${d.y}V${d.ly}H${d.lx} M${d.x+d.w},${d.y}V${d.ly}`} fill="none" stroke="#00a6dc" strokeOpacity=".5" /> : <path d={`M${d.x},${d.y}H${edge} M${d.x},${d.y+d.h}H${edge} M${d.lx},${d.y}V${d.ly}`} fill="none" stroke="#00a6dc" strokeOpacity=".5" />}
      <rect x={d.lx-(toolbar ? 9 : 14)} y={d.ly-9} width={toolbar ? 18 : 28} height="18" rx="4" fill="#00a6dc" /><text x={d.lx} y={d.ly+4} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">{d.label}</text>
    </g>;
  })}</svg>;
}

export function ComponentSpecimen() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const images = root.current!.querySelectorAll('.qixin-component-slot > img, .component-spacing-wrap');
      gsap.fromTo(images, {
        x: i => [28, -20, 16, -24, -18, 24, -16, 20, -28, 24, -16][i],
        y: i => [-32, 20, -16, 28, 24, -28, 18, -20, 32, -24, 20][i],
        rotation: i => [-7, 5, -4, 6, 4, -5, 3, -4, -6, 5, -4][i],
      }, {
        x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0,
        duration: 1.1,
        stagger: 0.045,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%', toggleActions: 'play none none none', once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="qixin-component-slots"><div className="qixin-component-tool-panel"><div className="component-spacing-wrap component-spacing-toolbar"><img className="qixin-component-toolbar" src={`${import.meta.env.BASE_URL}images/qixin/components-canvas-toolbar.webp`} width={80} height={248} alt="画布工具栏：放大、缩小、刷新和全屏" loading="lazy" /><SpacingMarks toolbar /></div></div>{[[0, 1, 2, 3], [4, 5], [8, 9], [6, 7]].map((items, slot) => <div key={slot} className={`qixin-component-slot qixin-component-slot-${slot + 1}`}>{items.map(item => <div key={item} className={item >= 8 ? 'component-spacing-wrap component-spacing-modal' : 'component-plain-wrap'}><img src={`${import.meta.env.BASE_URL}images/qixin/components-slot-${item}.webp`} width={[160, 174, 216, 160, 368, 368, 368, 368, 496, 496][item]} alt={['数据添加成功提示', '排查任务已提交提示', '添加失败提示', '请选择企业提示', '数据添加进度通知', '部分失败通知', '操作成功通知', '企业监控报告通知', '删除企业确认弹窗', '审批确认弹窗'][item]} loading="lazy" />{item >= 8 && <SpacingMarks compact={item === 9} />}</div>)}</div>)}</div>;
}
