import './chain-discussion.css';
const groups = [
  { title: '业务', tags: ['产业范围怎么拆成环节？', '哪些标准环节能复用？', '哪些本地差异要重梳理？', '上下游和企业归属怎么确认？', '口径怎么交给开发？', '需求改后，哪些内容要再确认？'] },
  { title: '用户', tags: ['本地与标准划分哪里不同？', '提需求要提供什么？', '交付前怎么确认理解一致？', '环节、关系或企业范围不对怎么改？', '哪些后续调整还得找内部？'] },
  { title: '开发', tags: ['要求明确到什么程度才能配置？', '哪些结构、关系和企业范围反复配置？', '口径变化影响哪些配置？', '哪些配置能让用户自己做？', '交付前怎么核对口径？'] },
  { title: '共性', tags: ['口径怎么对齐？', '怎么减少重复沟通？', '修改怎么减少来回流转？'] },
];
export function ChainDiscussion() {
  return <div className="chain-discussion-compact"><div className="case-research-quadrants" role="group" aria-label="产业链问题：业务、用户、开发、共性">
    <svg viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round"><path d="M399 12 C395 108 405 244 400 348 M18 180 C241 176 551 185 782 179" strokeWidth="1.6"/><path d="M402 14 C404 132 396 251 403 346 M20 183 C266 181 554 177 780 182" strokeWidth="0.8" opacity=".45"/></g></svg>
    {groups.map(group => <div className="case-research-quadrant" key={group.title}><h4 className="text-body font-medium">{group.title}</h4><ul className="case-research-tags">{group.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>)}
  </div></div>;
}
