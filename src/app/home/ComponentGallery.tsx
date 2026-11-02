import { useState } from 'react';
import { CaseList } from './CaseCard';
import { cases } from './content/zh';
import { Ruler } from './Ruler';

const typeScale = [
  { name: '姓名 / 主视觉', token: 'text-home-name', className: 'home-name font-normal', size: '56–96px，自适应', line: '1.2', weight: '400', sample: '陈俊学', usage: '首页姓名；每页只用一次。' },
  { name: '身份定位', token: 'text-home-role', className: 'home-role font-normal', size: '28–56px，自适应', line: '1.45', weight: '400', sample: 'B 端应用产品设计师', usage: '首页核心定位；保持简短。' },
  { name: '栏目标题', token: 'text-h2', className: 'text-h2 font-normal', size: '28px', line: '1.3', weight: '400', sample: '关于我的工作', usage: '一级内容分区标题。' },
  { name: '项目标题', token: 'text-h3', className: 'text-h3 font-normal', size: '26px', line: '1.35', weight: '400', sample: 'Qsight · AI 报告平台', usage: '项目名称与二级小节标题。' },
  { name: '小标题', token: 'text-h4', className: 'text-h4 font-medium', size: '20px', line: '1.4', weight: '500', sample: '设计职责', usage: '内容组内小标题。' },
  { name: '引导语', token: 'text-lead', className: 'text-lead font-medium', size: '20px', line: '1.5', weight: '500', sample: '你好，我是', usage: '问候与简短引导。' },
  { name: '介绍正文', token: 'text-body-lg', className: 'text-body-lg font-normal', size: '18px', line: '1.85', weight: '400', sample: '用 AI 编程工具构建可使用的产品。', usage: '首页自我介绍、需要连续阅读的重点段落。' },
  { name: '标准正文', token: 'text-body', className: 'text-body font-normal', size: '16px', line: '1.8', weight: '400', sample: '帮助研究员生成报告，并追溯内容和数据的来源。', usage: '项目简介、普通说明和主要操作文字。' },
  { name: '辅助说明', token: 'text-caption', className: 'text-caption font-normal', size: '14px', line: '1.6', weight: '400', sample: '项目周期 · 2025.04–2026.05', usage: '项目周期、工作职责与辅助说明；不替代主要正文。' },
  { name: '微型说明', token: 'text-micro', className: 'text-micro font-normal', size: '12px', line: '1.5', weight: '400', sample: '[待替换：界面 1]', usage: '图片占位、紧凑界面标记；不用来放正文。' },
  { name: '制图标注', token: 'text-label', className: 'text-label font-mono font-normal', size: '11px', line: '1', weight: '400', sample: 'COPY 01 · 320 × 48', usage: '短编号、尺寸及图版标注；不承载必要阅读信息。' },
];

export function ComponentGallery() {
  const [state, setState] = useState<number | null | undefined>(undefined);
  return <div className="homepage"><main className="mx-auto w-full max-w-content flex flex-col gap-16 py-10">
    <header className="flex flex-col gap-4"><a href="#top" className="home-target inline-flex items-center text-body">← 返回首页</a><h1 className="text-h2">作品集组件库</h1><p className="text-body text-text-secondary">与首页共用组件和 token。图片为占位；切换窗口宽度查看手机图片滑动状态。</p></header>
    <section className="flex flex-col gap-6"><h2 className="text-h3">颜色与字体</h2><div className="gallery-swatches">{['bg', 'text', 'accent', 'placeholder'].map(name => <div key={name}><span className={`gallery-swatch gallery-${name}`} /><p className="text-caption">{name}</p></div>)}</div><p className="text-h3">项目标题 · Noto Sans SC</p><p className="text-body">正文：项目解决的问题、周期和我的工作。</p><p className="font-mono text-label">LABEL · JetBrains Mono</p></section>
    <section className="flex flex-col gap-6" aria-labelledby="type-scale-title"><h2 id="type-scale-title" className="text-h3">文字应用阶梯</h2><p className="text-body text-text-secondary">正文使用 16px，辅助说明使用 14px，不使用 13px 或 15px。下面展示的是实际组件字号；姓名和身份随视口变化。</p>
      <div>{typeScale.map(type => <article key={type.token} className="gallery-type-row">
        <div className="flex flex-col gap-2"><h3 className="text-body font-medium">{type.name}</h3><p className="text-caption text-text-secondary">{type.size} · 行高 {type.line} · 字重 {type.weight}</p><code className="text-caption font-mono">{type.token}</code><p className="text-caption text-text-secondary">{type.usage}</p></div>
        <p className={`${type.className} gallery-type-sample`}>{type.sample}</p>
      </article>)}</div>
    </section>
    <section className="flex flex-col gap-6"><h2 className="text-h3">案例陈列</h2><p className="text-body">真实交互模式支持鼠标进入、移开与 Tab 聚焦。手机端显示横向滑动图片和可点击分页点。</p><div className="flex flex-wrap gap-3">{[{label:'真实交互',value:undefined},{label:'默认状态',value:null},{label:'首项激活',value:0}].map(option => <button key={option.label} type="button" className="gallery-button home-target px-4 text-body" aria-pressed={state === option.value} onClick={() => setState(option.value)}>{option.label}</button>)}</div><CaseList items={cases} previewActive={state} /></section>
    <section><h2 className="text-h3">开场按钮</h2><p className="text-body text-text-secondary">点击返回首页并播放完整开场。</p><Ruler onReplay={() => { window.location.hash = 'replay'; }} /></section>
  </main></div>;
}
