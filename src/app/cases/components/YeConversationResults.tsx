import { Globe, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// Display-only adapters of the plugin's AIMessageEntityCard, Table, SourceCard
// and TaskPlanCardLayout. Product data access and execution stay in the plugin.
export function YeConversationResults() {
  return <figure className="ye-reply-grid" aria-label="四种聊天回复展示方式">
    <div className="ye-reply-plate"><div className="ye-reply-surface ye-reply-path-surface">
      <ul className="ye-reply-path-list">
        <li><span>书签栏/设计/视觉基础/图标</span>：最贴合，图标类资源都归在这里</li>
        <li><span>书签栏/设计/灵感与素材</span>：当作图标素材来源收藏也合适</li>
        <li><span>书签栏/设计/设计工具</span>：如果你想把它当工具站来用</li>
      </ul>
    </div></div>
    <div className="ye-reply-plate ye-reply-table-plate"><div className="ye-reply-surface ye-reply-table-surface">
      <p>书签检查结果</p><table className="ye-reply-table"><thead><tr>{['书签','当前目录','处理建议','判断依据','状态'].map(title=><th key={title}>{title}</th>)}</tr></thead><tbody>{[['设计规范','未分组','归入设计系统','包含组件规范与使用说明','已核实'],['重复资料','设计素材','合并重复收藏','网址与现有书签相同','等待确认'],['失效链接','学习资料','建议移除','网页已无法打开','等待确认']].map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
    </div></div>
    <div className="ye-reply-plate"><div className="ye-reply-surface">
      <div className="ye-reply-source-card"><div><Globe size={16}/><span>example.com</span></div><b>设计系统示例</b><p>页面包含组件规范与使用说明，可归入设计系统目录。</p><div className="ye-reply-source-nav"><ChevronLeft size={16}/><span>1/2</span><ChevronRight size={16}/></div></div>
    </div></div>
    <div className="ye-reply-plate"><div className="ye-reply-plan"><MoreHorizontal size={16} className="ye-reply-plan-menu"/><img src={`${import.meta.env.BASE_URL}images/ye/reply-plan-cover.svg`} alt=""/><b>书签整理方案已就绪</b><p>将 12 个书签整理到 3 个文件夹</p></div></div>
  </figure>;
}
