import './ye-cache-request.css';

function CacheIcon({ name, heading = false }: { name: string; heading?: boolean }) {
  return <span className={`ye-cache-icon${heading ? ' ye-cache-icon-heading' : ''}`} style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${name}.svg)` }} aria-hidden="true" />;
}

function RequestCard({ followUp = false }: { followUp?: boolean }) {
  return <div className="ye-cache-card">
    <div className="ye-cache-card-heading"><span>{followUp ? '后续请求' : '首次请求'}</span></div>
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
  return <figure className="ye-cache-preview" aria-label="首次与后续请求对比，虚线框表示新增对话和工具结果">
    <RequestCard />
    <RequestCard followUp />
  </figure>;
}
