import './chain-responsibility.css';
const roles = [{ key: 'system', label: '系统' }, { key: 'user', label: '用户' }, { key: 'internal', label: '内部' }];
const charts = [
  { title: '改版前', text: '配置复杂度集中在内部', weights: [22, 30, 94] },
  { title: '改版后', text: '口径由用户判断，配置由系统承接', weights: [78, 42, 28] },
];
export function ChainResponsibility() {
  return <figure className="chain-responsibility">
    <div className="chain-responsibility-charts">{charts.map(chart => {
      const total = chart.weights.reduce((a, b) => a + b, 0);
      return <section key={chart.title}><h4>{chart.title}</h4><p>{chart.text}</p>
        <svg viewBox="0 0 360 250" role="img" aria-label={`${chart.title}复杂度分配示意，系统、用户、内部的相对权重为${chart.weights.join('、')}`}>
          {roles.map((role, index) => {
            const percent = chart.weights[index] / total * 100;
            const radius = Math.sqrt(percent / 100) * 118;
            const positions = [[112, 84], [105, 168], [224, 130]];
            const [cx, cy] = positions[index];
            return <g key={role.key}><circle cx={cx} cy={cy} r={radius} className={`chain-responsibility-${role.key}`} fillOpacity=".28" /><text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="chain-bubble-value">{Math.round(percent)}%</text><text x={cx} y={cy + 26} textAnchor="middle" className="chain-bubble-label">{role.label}</text></g>;
          })}
        </svg>
      </section>;
    })}</div>
    <div className="chain-responsibility-legend">{roles.map(role => <span key={role.key}><i className={`chain-responsibility-${role.key}`} />{role.label}</span>)}</div>
    <figcaption>沿用旧版相对权重展示复杂度分配，不代表实测工作量或耗时占比。</figcaption>
  </figure>;
}
