import type { CSSProperties } from 'react';

const results = [
  { label: '数据有来源', before: 60, after: 90, icon: 'database', description: '编造的情况很少见，数据基本都能找到来源。' },
  { label: '内容符合要求', before: 60, after: 80, icon: 'checks', description: '报告结构更稳定，内容能对应到数据。' },
  { label: '工具调用正确', before: 50, after: 90, icon: 'plugs-connected', description: '基本能按要求调用工具，很少跳步。' },
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

function SmallResultChart({ before, after, dots }: { before: number; after: number; dots: boolean }) {
  return <svg className="prompt-result-chart prompt-result-mini" viewBox="0 0 180 140" role="img" aria-label={`调整前约 ${before}%，调整后约 ${after}%`}>
    {[before, after].map((value, group) => <g key={group}>
      {dots ? Array.from({length: 50}, (_, index) => {
        const active = index < value / 2;
        return <circle key={index} cx={18 + group * 88 + (index % 5) * 11} cy={106 - Math.floor(index / 5) * 9} r="3.2" fill={active ? (group ? 'var(--result-ink)' : 'var(--color-drafting-line)') : 'var(--color-drafting-faint)'} />;
      }) : Array.from({length: 5}, (_, index) => <g key={index}>
        <rect x={14 + group * 88 + index * 11} y="20" width="6" height="90" rx="3" fill="var(--color-drafting-faint)" />
        <rect x={14 + group * 88 + index * 11} y={110-value*.9} width="6" height={value*.9} rx="3" fill={group ? 'var(--result-ink)' : 'var(--color-drafting-line)'} />
      </g>)}
      <text className="prompt-mini-label" x={40+group*88} y="132" textAnchor="middle">{group ? '调整后' : '调整前'}</text>
    </g>)}
  </svg>;
}

export function PromptResults() {
  return <figure className="prompt-results" aria-label="提示词调整前后对比，比例为粗估值">
    <div className="prompt-results-grid">{results.map(({ label, before, after, icon, description }, index) => <section className={`prompt-result${index === 0 ? ' prompt-result-featured' : ''}`} key={label}>
      <div className="prompt-result-copy">
        <div className="prompt-result-heading"><span className="prompt-result-icon"><span className="prompt-result-glyph" style={{maskImage: `url(/images/icons/phosphor/${icon}.svg)`} as CSSProperties} aria-hidden="true" /></span><h4>{label}</h4></div>
        <p className="prompt-result-value"><span>约 {before}%</span><span aria-hidden="true">→</span><strong>约 {after}%</strong></p>
        <p className="prompt-result-description">{description}</p>
        <p className="prompt-result-gain">约提升 {after-before} 个百分点</p>
      </div>
      {index === 0 ? <ResultChart before={before} after={after} /> : <SmallResultChart before={before} after={after} dots={index === 1} />}
    </section>)}</div>
    <p className="prompt-results-note">比例为测试结果的粗估，具体计数与判定标准待核对。</p>
  </figure>;
}
