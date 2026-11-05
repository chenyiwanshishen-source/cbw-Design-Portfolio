import './chain-discussion.css';
const rows = [
  { role: '用户侧', questions: ['本地产业划分和标准产业链哪里不同？', '说清产业链要求，要提供什么？', '交付前，怎么确认双方理解一致？', '环节、上下游或企业范围不对，怎么提修改？', '后续哪些调整还得找内部人员？'] },
  { role: '业务侧', questions: ['怎么把用户的产业范围拆成环节？', '哪些标准环节能复用，哪些要重梳理？', '怎么和用户确认上下游及企业归属？', '怎么把口径交给数据／后端，避免理解偏差？', '需求改了，哪些口径和结构要重新确认？'] },
  { role: '数据／后端侧', questions: ['要求说到什么程度，才能开始配置？', '哪些结构、关系和企业范围总要重配？', '口径改了，会影响哪些配置？', '哪些重复配置可以让用户自己操作？', '交付前，怎么核对配置与口径一致？'] },
];
export function ChainDiscussion() {
  return <figure className="chain-discussion" aria-label="自定义产业链各端问题梳理">
    {rows.map((row, i) => <section className={`chain-discussion-row chain-discussion-tone-${i}`} key={row.role}>
      <h4>{row.role}</h4><div className="chain-discussion-content"><ul>{row.questions.map(q => <li key={q}>{q}</li>)}</ul></div>
    </section>)}
  </figure>;
}
