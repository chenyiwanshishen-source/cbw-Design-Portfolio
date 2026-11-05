import './chain-responsibility.css';
const parts = [
  { key: 'internal', label: '内部', weight: 94, task: '理解需求、拆解结构和配置数据' },
  { key: 'user', label: '用户', weight: 30, task: '提出需求、等待交付' },
  { key: 'system', label: '系统', weight: 22, task: '展示配置结果' },
];
export function ChainResponsibility() {
  const total = parts.reduce((sum, part) => sum + part.weight, 0);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return <figure className="chain-responsibility chain-responsibility-before">
    <div className="chain-donut-copy"><h4>改版前</h4><p>配置复杂度集中在内部</p><ul className="chain-donut-legend">{parts.map(part => <li key={part.key}><i className={`chain-responsibility-${part.key}`} /><div><strong>{part.label}</strong><p>{part.task}</p></div></li>)}</ul></div>
    <svg viewBox="0 0 280 280" role="img" aria-label="改版前复杂度分配示意：内部约64%，用户约21%，系统约15%">
      {parts.map(part => {
        const fraction = part.weight / total;
        const angle = (offset + fraction / 2) * 2 * Math.PI - Math.PI / 2;
        const currentOffset = offset;
        offset += fraction;
        return <g key={part.key}><circle cx="140" cy="140" r={radius} fill="none" strokeWidth="46" strokeLinecap="round" strokeDasharray={`${fraction * circumference - 18} ${circumference}`} strokeDashoffset={-currentOffset * circumference - 9} transform="rotate(-90 140 140)" className={`chain-donut-${part.key}`} /><text x={140 + Math.cos(angle) * radius} y={140 + Math.sin(angle) * radius} textAnchor="middle" dominantBaseline="central" className="chain-donut-number">{Math.round(fraction * 100)}%</text></g>;
      })}
    </svg>
    <figcaption>沿用旧版相对权重展示复杂度分配，不代表实测工作量或耗时占比。</figcaption>
  </figure>;
}
