import './chain-discussion.css';
const groups = [
  { title: '业务', tags: ['本地口径难说清', '需求反复确认', '配置要求难传递'] },
  { title: '开发', tags: ['重复配置结构', '修改影响范围不清', '交付前难核对'] },
  { title: '用户', tags: ['等待内部交付', '不能直接调整', '后续维护仍要提需求'] },
  { title: '产品', tags: ['配置能力未开放', '标准环节难复用', '修改仍回到内部流程'] },
];
export function ChainDiscussion() {
  return <div className="chain-discussion-compact"><div className="case-research-quadrants" role="group" aria-label="产业链问题：业务、开发、用户、产品">
    <svg viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round"><path d="M399 12 C395 108 405 244 400 348 M18 180 C241 176 551 185 782 179" strokeWidth="1.6"/><path d="M402 14 C404 132 396 251 403 346 M20 183 C266 181 554 177 780 182" strokeWidth="0.8" opacity=".45"/></g></svg>
    {groups.map(group => <div className="case-research-quadrant" key={group.title}><h4 className="text-body font-medium">{group.title}</h4><ul className="case-research-tags">{group.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>)}
  </div><div className="chain-common-problem"><h4 className="text-body font-medium">共性问题</h4><ul className="case-research-tags"><li>口径难对齐</li><li>重复沟通</li><li>修改反复流转</li></ul></div></div>;
}
