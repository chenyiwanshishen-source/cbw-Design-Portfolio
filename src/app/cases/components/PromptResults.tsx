import { Target, Workflow, ShieldCheck } from 'lucide-react';
const results = [
  { label: '内容符合要求', before: 60, after: 80, Icon: Target, description: '报告结构更稳定，内容能对应到数据。' },
  { label: '工具调用正确', before: 50, after: 90, Icon: Workflow, description: '基本能按要求调用工具，很少跳步。' },
  { label: '数据有来源', before: 60, after: 90, Icon: ShieldCheck, description: '编造的情况很少见，数据基本都能找到来源。' },
];

export function PromptResults() {
  return <figure className="prompt-results" aria-label="提示词调整前后对比，合计 50 份测试，比例为粗估值">
    <figcaption className="prompt-results-caption"><span>50 份测试</span><span>30 份相同数据 + 20 份不同数据</span></figcaption>
    <div className="prompt-results-grid">{results.map(({ label, before, after, Icon, description }, index) => <section className="prompt-result" key={label}>
      <span className="prompt-result-icon"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>
      <h4>{label}</h4>
      <p className="prompt-result-value"><span>约 {before}%</span><span aria-hidden="true">→</span><strong>约 {after}%</strong></p>
      <p className="prompt-result-description">{description}</p>
      <div className="prompt-result-chart"><div className="prompt-result-bars">{[{name:'调整前', value:before}, {name:'调整后', value:after}].map(({name,value}, i) => <div className="prompt-result-row" key={name}><span>{name}</span><div className="prompt-result-track" aria-label={`${name}约 ${value}%`}><span className={i ? 'prompt-result-after' : 'prompt-result-before'} style={{width:`${value}%`}} /></div></div>)}</div>{index === 0 && <div className="prompt-result-axis" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div>}</div>
      <p className="prompt-result-gain">约提升 {after - before} 个百分点</p>
    </section>)}</div>
    <div className="prompt-result-validation"><div><strong>20 份不同数据</strong><span>通过率</span></div><strong className="prompt-validation-value">80%</strong><div className="prompt-result-track" aria-label="不同数据测试通过率 80%"><span className="prompt-result-after" style={{width: '80%'}} /></div></div>
    <p className="prompt-results-note">比例为测试结果的粗估，合并统计两组样本；具体计数与判定标准待核对。</p>
  </figure>;
}
