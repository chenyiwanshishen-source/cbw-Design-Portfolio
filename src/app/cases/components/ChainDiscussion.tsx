import './chain-discussion.css';
const rows = [
  { role: '用户侧', known: '本地产业划分和企业归属不同；构建与修改都需要内部配置。', questions: ['本地的产业划分和标准产业链有哪些不同？', '要把一条产业链的要求说清楚，需要提供什么？', '交付前看不到配置结果，怎样确认双方理解一致？', '发现环节、上下游或企业范围不合适时，怎样提出修改？', '后续变化时，哪些调整必须再次找内部人员？'] },
  { role: '业务侧', known: '需要理解用户口径、拆分产业环节、确认上下游；修改后再次确认口径。', questions: ['用户说的产业范围，怎样转成明确的环节划分？', '本地口径与标准环节不同，哪些可以复用，哪些需要重新梳理？', '上下游关系和企业归属，怎样和用户逐项确认？', '怎样把业务口径交给数据／后端，避免理解偏差？', '需求修改后，哪些口径和结构需要重新确认？'] },
  { role: '数据／后端侧', known: '需要定义数据结构、配置图谱关系和企业范围；修改需求会回流重新配置。', questions: ['业务交来的要求，需要明确到什么程度才能开始配置？', '哪些数据结构、关系和企业范围每次都要重新配置？', '口径变化后，会影响哪些已有配置？', '重复配置中，哪些操作可以做成用户可操作的功能？', '配置交付前，怎样检查结果与确认过的口径一致？'] },
];
export function ChainDiscussion() {
  return <figure className="chain-discussion" aria-label="自定义产业链各端问题梳理">
    {rows.map((row, i) => <section className={`chain-discussion-row chain-discussion-tone-${i}`} key={row.role}>
      <h4>{row.role}</h4><div className="chain-discussion-content"><p className="chain-discussion-known">{row.known}</p><ul>{row.questions.map(q => <li key={q}>{q}</li>)}</ul></div>
    </section>)}
    <figcaption>依据旧版作品集与旧流程整理；问句为待核对的问题，不作访谈原话或已验证结论。</figcaption>
  </figure>;
}
