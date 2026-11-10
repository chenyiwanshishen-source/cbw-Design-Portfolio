import { MessageSquare, SlidersHorizontal, Wrench, ArrowUpRight } from 'lucide-react';
import './ye-cache-request.css';

export function YeCacheRequest() {
  return <figure className="ye-cache-preview" aria-label="首次请求包含系统提示词、工具定义与当前对话">
    <div className="ye-cache-card">
      <div className="ye-cache-card-heading"><ArrowUpRight size={20} aria-hidden="true" /><span>首次请求</span></div>
      <div className="ye-cache-config">
        <div className="ye-cache-row"><SlidersHorizontal size={16} aria-hidden="true" /><div><strong>系统提示词</strong><span>基础规则与已加载的技能</span></div></div>
        <div className="ye-cache-row"><Wrench size={16} aria-hidden="true" /><div><strong>工具定义</strong><span>可用工具、用途与参数</span></div></div>
      </div>
      <div className="ye-cache-dialogue ye-cache-row"><MessageSquare size={16} aria-hidden="true" /><div><strong>当前对话</strong><span>用户消息与工作区信息</span></div></div>
    </div>
  </figure>;
}
