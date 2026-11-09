import type { CSSProperties } from 'react';

const specimens = [
  { name: '间距', rule: '阶梯与用途', values: ['4', '8', '12', '16'], check: '检查行内、堆叠与内边距，区分细节、组件和布局节奏。' },
  { name: '描边', rule: '线宽与对齐', values: ['0', '1', '2'], check: '检查分割线、选中与焦点，切换时尺寸和内容位置保持稳定。' },
  { name: '圆角', rule: '尺度与轮廓', values: ['0', '4', '8', '16'], check: '对比控件与容器，检查焦点环是否贴合元素轮廓。' },
  { name: '文字', rule: '字体与角色', values: ['标题', '正文', '13 表格', '28%'], check: '检查中文、混排、数字与单位，以及长段落和窄屏的可读性。' },
  { name: '栅格', rule: '断点与影响区', values: ['320', '768', '1440'], check: '扣除侧栏空间，检查代表宽度下的列数、沟槽与内容落点。' },
  { name: '阴影', rule: '层级与承接面', values: ['无', '抬起', '浮层'], check: '分别检查阴影自身和叠加背景、描边后的效果，区分浮起与滚动提示。' },
];

export function YeSpecimenFlows() {
  return <div className="ye-specimen-flows">
    <p className="case-paragraph">确认设备、主题、字体和色板后，每次生成一类样张，由我检查、调整并确认。</p>
    <div className="ye-specimen-grid">{specimens.map(item => <figure className="ye-specimen-flow" key={item.name} aria-label={`${item.name}：规则经 AI 生成对照样张，再由我检查确认`}>
      <h4>{item.name}</h4>
      <div className="ye-specimen-track">
        <div className="generator-paper generator-paper-warm ye-specimen-rule"><strong>{item.name}规则</strong><span>{item.rule}</span><span className="generator-paper-lines" aria-hidden="true"><i/><i/><i/></span></div>
        <div className="ye-specimen-connector"><span>AI 生成</span><svg className="generator-arrow" viewBox="0 0 60 20" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg></div>
        <div className={`generator-prompt-doc ye-specimen-output ye-specimen-${item.name}`}><strong>{item.name}对照样张</strong><div className="ye-specimen-preview" aria-hidden="true">{item.values.map((value, i) => <span key={value} style={{ '--sample-index': i } as CSSProperties}><i/>{value}</span>)}</div></div>
      </div>
      <figcaption><span>我检查与确认</span>{item.check}</figcaption>
    </figure>)}</div>
    <p className="text-caption text-text-secondary">基础样张用于验证规则，具体组件尺寸和状态另行确定。所需类别确认后，再统一写入变量与样式，复核绑定和视觉变化。</p>
  </div>;
}
