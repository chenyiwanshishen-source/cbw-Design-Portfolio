import { useState } from 'react';
import { CaseList } from './CaseCard';
import { cases } from './content/zh';
import { Ruler } from './Ruler';

export function ComponentGallery() {
  const [state, setState] = useState<number | null | undefined>(undefined);
  return <div className="homepage"><main className="mx-auto w-full max-w-content flex flex-col gap-16 py-10">
    <header className="flex flex-col gap-4"><a href="#top" className="home-target inline-flex items-center text-body">← 返回首页</a><h1 className="text-h2">作品集组件库</h1><p className="text-body text-text-secondary">与首页共用组件和 token。图片为占位；切换窗口宽度查看手机图片滑动状态。</p></header>
    <section className="flex flex-col gap-6"><h2 className="text-h3">颜色与字体</h2><div className="gallery-swatches">{['bg', 'text', 'accent', 'placeholder'].map(name => <div key={name}><span className={`gallery-swatch gallery-${name}`} /><p className="text-caption">{name}</p></div>)}</div><p className="text-h3">项目标题 · Noto Sans SC</p><p className="text-body">正文：项目解决的问题、周期和我的工作。</p><p className="font-mono text-label">LABEL · JetBrains Mono</p></section>
    <section className="flex flex-col gap-6"><h2 className="text-h3">案例陈列</h2><p className="text-body">真实交互模式支持鼠标进入、移开与 Tab 聚焦。手机端显示横向滑动图片和可点击分页点。</p><div className="flex flex-wrap gap-3">{[{label:'真实交互',value:undefined},{label:'默认状态',value:null},{label:'首项激活',value:0}].map(option => <button key={option.label} type="button" className="gallery-button home-target px-4 text-body" aria-pressed={state === option.value} onClick={() => setState(option.value)}>{option.label}</button>)}</div><CaseList items={cases} previewActive={state} /></section>
    <section><h2 className="text-h3">开场按钮</h2><p className="text-body text-text-secondary">点击返回首页并播放完整开场。</p><Ruler onReplay={() => { window.location.hash = 'replay'; }} /></section>
  </main></div>;
}
