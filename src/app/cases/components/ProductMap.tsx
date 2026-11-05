import './product-map.css';

export function ProductMap() {
  return <figure className="product-map" aria-label="启信产业大脑用户场景与任务流程">
    <div className="product-map-scenario-tree">
      <div className="product-map-sticky product-map-root">启信产业大脑</div>
      <div className="product-map-branches" aria-hidden="true"><svg viewBox="0 0 1000 72" preserveAspectRatio="none"><path d="M100 0V72 M100 18Q100 36 120 36H880Q900 36 900 54V72 M300 36V72 M500 36V72 M700 36V72"/><path d="m92 62 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9"/></svg></div>
      <div className="product-map-scenarios">{['招商', '产业服务', '企业服务', '金融', '区域治理'].map(text => <div className="product-map-sticky" key={text}>{text}</div>)}</div>
    </div>
    <div className="product-map-row"><span className="product-map-label">任务流程</span><div className="product-map-tasks"><div className="product-map-five">{['定位范围', '筛选目标', '判断价值', '持续管理', '输出结果'].map((text, i) => <span className="product-map-cell product-map-step" key={text}>{text}{i < 4 && <span className="product-map-arrow" aria-hidden="true">→</span>}</span>)}</div></div></div>
  </figure>;
}
