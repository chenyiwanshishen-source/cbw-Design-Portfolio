export function AnalysisDimensions() {
  const base = `${import.meta.env.BASE_URL}images/qsight/`;
  return <figure className="analysis-dimensions" aria-label="从自定义维度进入更多监测维度弹窗">
    <div className="analysis-dimensions-plan">
      <img src={`${base}analysis-plan.webp`} width={779} height={440} alt="分析方案中的默认方案与自定义维度入口" loading="lazy" />
    </div>
    <div className="analysis-dimensions-detail">
      <img src={`${base}custom-dimensions.webp`} width={968} height={744} alt="更多监测维度弹窗，可选择已有维度，也可创建系统中没有的维度" loading="lazy" />
    </div>
    <figcaption className="generator-paper analysis-dimensions-note">没有想要的维度，也可以自己创建，让 AI 匹配对应数据。</figcaption>
    <svg className="analysis-dimensions-arrow" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path d="M12 184 C46 146 100 68 181 24 M149 19 Q168 20 187 24 Q178 41 163 53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </figure>;
}
