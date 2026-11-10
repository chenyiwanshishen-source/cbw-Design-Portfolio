export function ChainOutcome() {
  return <figure className="chain-outcome-card">
    <div className="chain-outcome-stat">
      <p>产业链构建周期缩短</p>
      <div className="chain-outcome-value"><span>约</span>76<span>%</span></div>
    </div>
    <div className="chain-outcome-chart" role="img" aria-label="产业链构建周期：改版前1至2周，改版后2至3天。柱高按各范围上限示意。">
      {[{ label: '改版前', duration: '1–2 周', height: '100%' }, { label: '改版后', duration: '2–3 天', height: '21.4%' }].map((item, i) => <div className="chain-outcome-column" key={item.label}>
        <div className="chain-outcome-track"><div className={`chain-outcome-bar${i ? ' is-after' : ''}`} style={{ height: item.height }}><span>{item.duration}</span></div></div>
        <p>{item.label}</p>
      </div>)}
    </div>
  </figure>;
}
