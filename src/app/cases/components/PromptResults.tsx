import { Target, Workflow, ShieldCheck } from 'lucide-react';

const results = [
  { label: '数据有来源', before: 60, after: 90, Icon: ShieldCheck, description: '编造的情况很少见，数据基本都能找到来源。' },
  { label: '内容符合要求', before: 60, after: 80, Icon: Target, description: '报告结构更稳定，内容能对应到数据。' },
  { label: '工具调用正确', before: 50, after: 90, Icon: Workflow, description: '基本能按要求调用工具，很少跳步。' },
];

function ResultChart({ before, after }: { before: number; after: number }) {
  return <svg className="prompt-result-chart" viewBox="0 0 320 200" role="img" aria-label={`调整前约 ${before}%，调整后约 ${after}%`}>
    {[0, 25, 50, 75, 100].map(value => <g key={value}>
      <line className="prompt-chart-grid" x1={36+value*2.5} x2={36+value*2.5} y1="20" y2="164" strokeDasharray="3 4" />
      <text className="prompt-chart-tick" x={36+value*2.5} y="188" textAnchor="middle">{value}%</text>
    </g>)}
    {[{value:after,y:34,name:'调整后'},{value:before,y:106,name:'调整前'}].map(({value,y,name},index) => {
      const end = 36+value*2.5;
      return <g key={name}>
        <path d={`M 36 ${y} H ${end-8} Q ${end} ${y} ${end} ${y+8} V ${y+40} Q ${end} ${y+48} ${end-8} ${y+48} H 36 Z`} fill={index === 0 ? 'var(--color-accent)' : 'var(--color-drafting-faint)'} />
      </g>;
    })}
    <path className="prompt-chart-grid" d="M 36 20 V 164 H 292" fill="none" />
  </svg>;
}

export function PromptResults() {
  return <figure className="prompt-results" aria-label="提示词调整前后对比，比例为粗估值">
    <div className="prompt-results-grid">{results.map(({ label, before, after, Icon, description }, index) => <section className={`prompt-result${index === 0 ? ' prompt-result-featured' : ''}`} key={label}>
      <div className="prompt-result-copy">
        <div className="prompt-result-heading"><span className="prompt-result-icon"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /></span><h4>{label}</h4></div>
        <p className="prompt-result-value"><span>约 {before}%</span><span aria-hidden="true">→</span><strong>约 {after}%</strong></p>
        <p className="prompt-result-description">{description}</p>
        <p className="prompt-result-gain">约提升 {after-before} 个百分点</p>
      </div>
      <ResultChart before={before} after={after} />
    </section>)}</div>
    <p className="prompt-results-note">比例为测试结果的粗估，具体计数与判定标准待核对。</p>
  </figure>;
}
