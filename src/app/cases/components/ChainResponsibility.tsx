import './chain-responsibility.css';

const charts = [
  { title: '改版前', text: '配置复杂度集中在内部', rows: [
    { role: '用户', key: 'user', task: '提需求 / 等交付', value: 30 },
    { role: '系统', key: 'system', task: '展示结果', value: 22 },
    { role: '内部', key: 'internal', task: '需求理解 / 结构拆解 / 数据配置 / 关系配置 / 企业范围配置', value: 94 },
  ] },
  { title: '改版后', text: '口径判断回到用户，配置动作由系统承接', rows: [
    { role: '用户', key: 'user', task: '本地口径判断 / 企业校准', value: 42 },
    { role: '系统', key: 'system', task: '标准复用 / 环节新增 / 图谱编辑 / 名单维护', value: 78 },
    { role: '内部', key: 'internal', task: '必要支持 / 异常处理', value: 28 },
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
          <span className="chain-responsibility-task" style={{ marginLeft: `calc(${row.value / 94 * 58}% + var(--space-3))` }}>{row.task}</span>
        </div>
      </div>)}</div>
    </section>)}</div>
  </figure>;
}
