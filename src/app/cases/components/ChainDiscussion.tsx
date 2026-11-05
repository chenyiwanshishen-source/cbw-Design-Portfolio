const groups = [
  { title: '上游支持', tags: ['用户：明确本地产业范围', '用户、业务：说清本地口径', '业务：确认交付要求', '业务、后端：明确配置输入'] },
  { title: '软件可支持', tags: ['用户：选用标准产业环节', '用户：自建本地产业环节', '用户：调整上下游关系', '用户：查看和维护企业范围', '业务、后端：减少重复配置'] },
  { title: '待验证的问题', tags: ['用户能否理解并编辑图谱', '标准环节能复用到什么程度', '修改后会影响哪些配置', '用户能否自行完成后续维护', '能否减少来回沟通'] },
  { title: '需人工判断', tags: ['用户：本地产业怎样划分', '用户、业务：上下游是否合理', '用户、业务：企业归属是否合适', '业务、后端：配置是否符合口径'] },
];
export function ChainDiscussion() {
  return <div className="case-research-quadrants" role="group" aria-label="产业链问题的四类归纳，包含用户、业务与数据后端">
    <svg viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round"><path d="M399 12 C395 108 405 244 400 348 M18 180 C241 176 551 185 782 179" strokeWidth="1.6"/><path d="M402 14 C404 132 396 251 403 346 M20 183 C266 181 554 177 780 182" strokeWidth="0.8" opacity=".45"/></g></svg>
    {groups.map(group => <div className="case-research-quadrant" key={group.title}><h4 className="text-body font-medium">{group.title}</h4><ul className="case-research-tags">{group.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>)}
  </div>;
}
