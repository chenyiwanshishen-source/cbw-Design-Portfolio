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
      const first = chart.weights[0];
      const second = first + chart.weights[1];
      return <section key={chart.title}><h4>{chart.title}</h4><p>{chart.text}</p>
        <svg viewBox="0 0 358 178" role="img" aria-label={`${chart.title}复杂度分配示意，系统、用户、内部的相对权重为${chart.weights.join('、')}`}>
          {Array.from({ length: 200 }, (_, index) => {
            const rank = (index * 73) % 200;
            const role = rank >= total ? 'empty' : rank < first ? 'system' : rank < second ? 'user' : 'internal';
            return <rect key={index} x={index % 20 * 18} y={Math.floor(index / 20) * 18} width="14" height="14" rx="3" className={`chain-responsibility-${role}`} />;
          })}
        </svg>
      </section>;
    })}</div>
    <div className="chain-responsibility-legend">{roles.map(role => <span key={role.key}><i className={`chain-responsibility-${role.key}`} />{role.label}</span>)}</div>
    <figcaption>沿用旧版相对权重展示复杂度分配，不代表实测工作量或耗时占比。</figcaption>
  </figure>;
}
