export function YeHomePreview() {
  return <section className="case-subsection" aria-labelledby="ye-home-preview-title">
    <h3 id="ye-home-preview-title">首页工作台</h3>
    <figure className="template-preview ye-home-preview" aria-label="ye! 首页工作台桌面端截图">
      <div className="template-preview-stage">
        <div className="template-preview-screen" data-device="desktop">
          <div className="template-preview-media">
            <img src={`${import.meta.env.BASE_URL}images/ye/home-desktop.webp`} alt="ye! 首页工作台：左侧为页签与书签导航，中间按窗口和分组展示标签页，右侧为 AI 对话区" width="4986" height="2646" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </figure>
  </section>;
}
