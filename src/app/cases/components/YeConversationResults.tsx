import { Bookmark, Globe, ExternalLink, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Display-only adapters of the plugin's AIMessageEntityCard, Table, SourceCard
// and TaskPlanCardLayout. Product data access and execution stay in the plugin.
export function YeConversationResults() {
  return <figure className="ye-reply-grid" aria-label="四种聊天回复展示方式">
    <div className="ye-reply-plate"><div className="ye-reply-surface">
      <p>找到了这些设计资料：</p>
      {['设计系统示例', '交互设计资料'].map(title => <div className="ye-reply-entity" key={title}><span className="ye-reply-favicon"><Bookmark size={16}/></span><span className="ye-reply-entity-title">{title}<small>example.com</small></span><ExternalLink size={14}/></div>)}
    </div></div>
    <div className="ye-reply-plate"><div className="ye-reply-surface">
      <p>书签检查结果</p><table className="ye-reply-table"><thead><tr><th>书签</th><th>处理建议</th></tr></thead><tbody>{[['设计规范','归入设计系统'],['重复资料','等待确认'],['失效链接','等待确认']].map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
    </div></div>
    <div className="ye-reply-plate"><div className="ye-reply-surface">
      <div className="ye-reply-source-card"><div><Globe size={16}/><span>example.com</span></div><b>设计系统示例</b><p>页面包含组件规范与使用说明，可归入设计系统目录。</p><div className="ye-reply-source-nav"><ChevronLeft size={16}/><span>1/2</span><ChevronRight size={16}/></div></div>
    </div></div>
    <div className="ye-reply-plate"><div className="ye-reply-plan"><MoreHorizontal size={16} className="ye-reply-plan-menu"/><img src={`${import.meta.env.BASE_URL}images/ye/reply-plan-cover.svg`} alt=""/><b>书签整理方案已就绪</b><p>将 12 个书签整理到 3 个文件夹</p></div></div>
  </figure>;
}
