import type { CSSProperties } from 'react';

const results = [
  { label: '数据有来源', before: 60, after: 90, icon: 'database', description: '编造的情况很少见，数据基本都能找到来源。' },
  { label: '内容符合要求', before: 60, after: 80, icon: 'checks', description: '报告结构更稳定，内容能对应到数据。' },
  { label: '工具调用成功', before: 50, after: 90, icon: 'plugs-connected', description: '基本能按要求调用工具，很少跳步。' },
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

function SmallResultChart({ before, after, columns }: { before: number; after: number; columns: boolean }) {
  const y = (value: number) => 120 - value;
  return <svg className="prompt-result-chart prompt-result-mini" viewBox="0 0 180 150" role="img" aria-label={`调整前约 ${before}%，调整后约 ${after}%`}>
    {columns ? <>
      {[0,50,100].map(value => <line key={value} className="prompt-chart-grid" x1="12" x2="168" y1={y(value)} y2={y(value)} strokeDasharray="2 3" />)}
      {[before,after].map((value,index) => <g key={index} style={{color: index ? 'oklch(from var(--color-success) .75 .17 h)' : 'oklch(from var(--color-source-web-fg) .72 .19 h)'}}>
        <rect x={22+index*80} y={y(value)} width="52" height={value} fill="currentColor" opacity=".16" />
        <rect x={22+index*80} y={y(value)-7} width="52" height="16" rx="8" fill="currentColor" />
        <text x={48+index*80} y={y(value)+4} textAnchor="middle" fill="var(--color-on-accent)" className="prompt-mini-label-cap">{index ? '调整后' : '调整前'}</text>
      </g>)}
    </> : <>
      <rect x="85" y="16" width="6" height="108" rx="3" fill="var(--color-source-kb-bg)" />
      {[0,1,2,3,4,5].map(index => <path key={index} d={`M 85 ${18+index*3} l 6 -3`} stroke="var(--result-ink)" strokeOpacity=".3" />)}
      <rect x="85" y={y(after)} width="6" height={after} rx="3" fill="var(--result-ink)" />
      <path d={`M 78 ${y(before)} H 98 M 78 ${y(after)} H 98`} stroke="var(--result-ink)" strokeWidth="1" />
      <text x="77" y={y(before)-4} textAnchor="end" className="prompt-mini-label">调整前</text>
      <text x="101" y={y(after)+4} className="prompt-mini-label">调整后</text>
      <text x="101" y="124" className="prompt-mini-label">0%</text>
    </>}
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
      {index === 0 ? <ResultChart before={before} after={after} /> : <SmallResultChart before={before} after={after} columns={index === 1} />}
    </section>)}</div>
    <p className="prompt-results-note">比例为测试结果的粗估，具体计数与判定标准待核对。</p>
  </figure>;
}
