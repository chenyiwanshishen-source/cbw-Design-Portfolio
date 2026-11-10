import './ye-cache-request.css';

function CacheIcon({ name, heading = false }: { name: string; heading?: boolean }) {
  return <span className={`ye-cache-icon${heading ? ' ye-cache-icon-heading' : ''}`} style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${name}.svg)` }} aria-hidden="true" />;
}

function RequestCard({ followUp = false }: { followUp?: boolean }) {
  return <div className="ye-cache-card">
    <div className="ye-cache-card-heading"><span>{followUp ? '缓存命中' : '首次请求'}</span></div>
    <div className="ye-cache-config">
      <div className="ye-cache-row"><CacheIcon name="CheckListIcon" /><div><strong>系统提示词</strong></div></div>
      <div className="ye-cache-row"><CacheIcon name="Layers01Icon" /><div><strong>工具定义</strong></div></div>
    </div>
    <div className="ye-cache-dialogue ye-cache-row"><CacheIcon name="BubbleChatDelayIcon" /><div><strong>{followUp ? '已有对话' : '当前对话'}</strong></div></div>
    {followUp && <div className="ye-cache-additions" aria-label="追加内容">
      <div className="ye-cache-row"><CacheIcon name="BubbleChatDelayIcon" /><div><strong>新增对话</strong></div></div>
      <div className="ye-cache-row"><CacheIcon name="CheckListIcon" /><div><strong>工具结果</strong></div></div>
    </div>}
  </div>;
}

export function YeCacheRequest() {
  return <figure className="ye-cache-preview" aria-label="缓存命中与上下文压缩，虚线框表示追加内容">
    <div className="ye-reply-plate ye-cache-plate"><RequestCard followUp /></div>
    <div className="ye-reply-plate ye-cache-plate"><div className="ye-cache-card">
      <div className="ye-cache-card-heading"><span>上下文压缩</span></div>
      <div className="ye-cache-config">
        <div className="ye-cache-row"><CacheIcon name="CheckListIcon" /><div><strong>系统提示词</strong></div></div>
        <div className="ye-cache-row"><CacheIcon name="Layers01Icon" /><div><strong>工具定义</strong></div></div>

      </div>
      <div className="ye-cache-dialogue ye-cache-config">
        <div className="ye-cache-row"><CacheIcon name="Layers01Icon" /><div><strong>先清理旧工具结果</strong></div></div>
        <div className="ye-cache-row"><CacheIcon name="BubbleChatDelayIcon" /><div><strong>达到压缩线后重建任务状态</strong></div></div>
      </div>
      <p className="ye-cache-reuse-note">由插件执行，保留用户要求与任务进度</p>
      <div className="ye-cache-additions" aria-label="本次新增内容">
        <div className="ye-cache-row"><CacheIcon name="BubbleChatDelayIcon" /><div><strong>新增对话</strong></div></div>
        <div className="ye-cache-row"><CacheIcon name="CheckListIcon" /><div><strong>工具结果</strong></div></div>
      </div>
    </div></div>
  </figure>;
}
