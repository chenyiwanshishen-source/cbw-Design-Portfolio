import './product-map.css';

export function ProductMap() {
  return <figure className="product-map" aria-label="启信产业大脑产品结构图，标出首页工作台、自定义产业链、组件库三部分">
    <div className="product-map-scenario-tree">
      <div className="product-map-sticky product-map-root">启信产业大脑</div>
      <div className="product-map-branches" aria-hidden="true"><svg viewBox="0 0 1000 72" preserveAspectRatio="none"><path d="M100 0V72 M100 18Q100 36 120 36H880Q900 36 900 54V72 M300 36V72 M500 36V72 M700 36V72"/><path d="m92 62 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9 m184 0 8 9 8-9"/></svg></div>
      <div className="product-map-scenarios">{['招商', '产业服务', '企业服务', '金融', '区域治理'].map(text => <div className="product-map-sticky" key={text}>{text}</div>)}</div>
    </div>
    <div className="product-map-row"><span className="product-map-label">任务流程</span><div className="product-map-tasks"><div className="product-map-five">{['定位范围', '筛选目标', '判断价值', '持续管理', '输出结果'].map((text, i) => <span className="product-map-cell product-map-step" key={text}>{text}{i < 4 && <span className="product-map-arrow" aria-hidden="true">→</span>}</span>)}</div><div className="product-map-owned">① 首页工作台</div></div></div>
    <div className="product-map-row"><span className="product-map-label">产品能力</span><div className="product-map-capabilities"><div className="product-map-cell">企业、产业与区域数据的查询、研判、管理和输出</div><div className="product-map-owned product-map-chain">② 自定义产业链</div></div></div>
    <div className="product-map-row"><span className="product-map-label">底座</span><div className="product-map-owned">③ 组件库</div></div>
    <figcaption>深色部分是这次重点讲解、由我主导的案例</figcaption>
  </figure>;
}
