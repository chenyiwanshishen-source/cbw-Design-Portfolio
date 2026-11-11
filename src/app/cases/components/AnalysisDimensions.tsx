export function AnalysisDimensions() {
  const base = `${import.meta.env.BASE_URL}images/qsight/`;
  return <figure className="analysis-dimensions" aria-label="从自定义维度进入更多监测维度弹窗">
    <div className="analysis-dimensions-plan">
      <img src={`${base}analysis-plan.webp`} width={779} height={440} alt="分析方案中的默认方案与自定义维度入口" loading="lazy" />
    </div>
    <div className="analysis-dimensions-detail">
      <img src={`${base}custom-dimensions.webp`} width={968} height={744} alt="更多监测维度弹窗，可选择已有维度，也可创建系统中没有的维度" loading="lazy" />
    </div>
    <figcaption className="generator-paper analysis-dimensions-note">用户可根据自己的需求创建数据维度，形成用户习惯，并让 AI 寻找对应的数据。</figcaption>
    <svg className="analysis-dimensions-arrow" viewBox="0 0 200.0 160.5" fill="none" aria-hidden="true">
      <path d="M144.6 123.8 C68.0 149.9 16.4 105.0 35.9 62.7 C49.8 28.6 105.6 25.0 155.7 26.8 M125.1 10.6 Q150.2 17.8 183.6 25.9 Q152.9 35.8 133.4 42.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </figure>;
}
