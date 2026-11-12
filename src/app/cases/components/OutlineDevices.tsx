export function OutlineDevices() {
  const base = `${import.meta.env.BASE_URL}images/qsight/`;
  return <figure className="outline-devices" aria-label="大纲设置在电脑端与移动端的取舍">
    <div className="outline-devices-web">
      <div className="outline-device-image">
        <img src={`${base}outline-settings.webp`} alt="电脑端提供完整的报告维度与参数设置" width={2880} height={1800} loading="lazy" />
      </div>
    </div>
    <div className="outline-devices-mobile">
      <div className="outline-device-image">
        <img src={`${base}outline-settings-mobile.webp`} alt="移动端报告配置，仅保留地区和时间选择" width={780} height={1688} loading="lazy" />
      </div>
    </div>
    <aside className="outline-devices-sticky" aria-label="我的取舍">
      <h3>我的取舍</h3>
      <p>移动端只选地区和时间，沿用模板配置；更多参数在电脑端设置。</p>
    </aside>
    <svg className="outline-devices-arrow" viewBox="0 0 160 110" fill="none" aria-hidden="true">
      <path d="M8 38 C6 9 52 5 61 27 C72 54 37 53 46 31 C60 3 113 51 144 91 M122 84 Q138 87 144 99 Q152 87 150 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </figure>;
}
