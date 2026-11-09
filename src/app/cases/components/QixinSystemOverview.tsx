const sheets = [
  { name: 'colors', title: '颜色规范', width: 1192, height: 3000 },
  { name: 'grid', title: '栅格与间距', width: 2080, height: 2184 },
  { name: 'type', title: '文字规范', width: 1520, height: 2206 },
  { name: 'icons', title: '图标规范', width: 1520, height: 1858 },
  { name: 'buttons', title: '按钮类型与状态', width: 806, height: 904 },
  { name: 'fields', title: '输入框与下拉选择', width: 1216, height: 2576 },
];

export function QixinSystemOverview() {
  return <>
    <div className="case-prose">
      <p className="case-paragraph">孵化期为了尽快上线，产业大脑沿用了启信宝的设计规范和组件，部分前端样式直接写了固定数值。产品定位分开后，我和两位设计师先梳理已上线页面，从变量开始搭建五层组件库，<strong>优先在设计侧统一规范</strong>。</p>
      <p className="case-paragraph">当时没有开发能全职配合组件库建设，我们需要在完善规范和加快落地之间做取舍。和开发商量后，我们确定了三条规则：</p>
      <ul style={{ listStyle: 'disc', paddingInlineStart: '1.5em' }}>
        <li className="case-paragraph"><strong>能复用的就复用。</strong>基于启信宝现有前端组件修改样式；与数据逻辑耦合太深的，再拆出来重写。</li>
        <li className="case-paragraph"><strong>多个需求都用到，才纳入组件库。</strong>控制组件库规模，方便后续维护。</li>
        <li className="case-paragraph"><strong>围绕真实需求建设。</strong>优先解决当前问题，随实际需求调整策略。</li>
      </ul>
      <p className="case-paragraph">这些取舍让前期落地比较顺利，也让组件库更容易维护。</p>
    </div>
    <figure className="qixin-system-overview" aria-label="启信产业大脑基础规范与控件展示">
    <div className="qixin-system-overview-stage">
      {sheets.map(sheet => <img
        key={sheet.name}
        className={`qixin-system-sheet qixin-system-sheet-${sheet.name}`}
        src={`${import.meta.env.BASE_URL}images/qixin/system-${sheet.name}.webp`}
        alt={sheet.title} width={sheet.width} height={sheet.height} loading="lazy" />)}
    </div>
  </figure></>;
}
