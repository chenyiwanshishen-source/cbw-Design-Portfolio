import './ye-cache-request.css';

function CacheIcon({ name, heading = false }: { name: string; heading?: boolean }) {
  return <span className={`ye-cache-icon${heading ? ' ye-cache-icon-heading' : ''}`} style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${name}.svg)` }} aria-hidden="true" />;
}

export function YeCacheRequest() {
  return <figure className="ye-cache-preview" aria-label="首次请求包含系统提示词、工具定义与当前对话">
    <div className="ye-cache-card">
      <div className="ye-cache-card-heading"><CacheIcon name="ArrowDataTransferHorizontalIcon" heading /><span>首次请求</span></div>
      <div className="ye-cache-config">
        <div className="ye-cache-row"><CacheIcon name="CheckListIcon" /><div><strong>系统提示词</strong></div></div>
        <div className="ye-cache-row"><CacheIcon name="Layers01Icon" /><div><strong>工具定义</strong></div></div>
      </div>
      <div className="ye-cache-dialogue ye-cache-row"><CacheIcon name="BubbleChatDelayIcon" /><div><strong>当前对话</strong></div></div>
    </div>
  </figure>;
}
