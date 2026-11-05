import './chain-responsibility.css';

const charts = [
  { title: '改版前', text: '用户提需求，内部人员负责配置', rows: [
    { role: '用户', key: 'user', value: 30 },
    { role: '系统', key: 'system', value: 22 },
    { role: '内部', key: 'internal', value: 94 },
  ] },
  { title: '改版后', text: '用户按本地口径，在系统里自己配置', rows: [
    { role: '用户', key: 'user', value: 42 },
    { role: '系统', key: 'system', value: 78 },
    { role: '内部', key: 'internal', value: 28 },
  ] },
];

export function ChainResponsibility() {
  return <figure className="chain-responsibility">
    <div className="chain-responsibility-heading">
      <h4>把复杂配置拆给更合适的角色</h4>
      <p>不是减少复杂性，而是把本地口径判断交给用户，把重复配置动作交给系统承接。</p>
    </div>
    <div className="chain-responsibility-charts">{charts.map(chart => <section key={chart.title}>
      <h4>{chart.title}<span> — {chart.text}</span></h4>
      <div className="chain-responsibility-rows">{chart.rows.map(row => <div className="chain-responsibility-row" key={row.key}>
        <span>{row.role}</span>
        <div className="chain-responsibility-track">
          <i className={`chain-responsibility-bar chain-responsibility-${row.key}`} style={{ width: `${row.value / 94 * 58}%` }} />
        </div>
      </div>)}</div>
    </section>)}</div>
  </figure>;
}
