const sheets = [
  { name: 'colors', title: '颜色规范', width: 1192, height: 3000 },
  { name: 'grid', title: '栅格与间距', width: 2080, height: 2184 },
  { name: 'type', title: '文字规范', width: 1520, height: 2206 },
  { name: 'icons', title: '图标规范', width: 1520, height: 1858 },
  { name: 'buttons', title: '按钮类型与状态', width: 806, height: 904 },
  { name: 'fields', title: '输入框与下拉选择', width: 1216, height: 2576 },
];

export function QixinSystemOverview() {
  return <figure className="qixin-system-overview" aria-label="启信产业大脑基础规范与控件展示">
    <div className="qixin-system-overview-stage">
      {sheets.map(sheet => <img
        key={sheet.name}
        className={`qixin-system-sheet qixin-system-sheet-${sheet.name}`}
        src={`${import.meta.env.BASE_URL}images/qixin/system-${sheet.name}.webp`}
        alt={sheet.title} width={sheet.width} height={sheet.height} loading="lazy" />)}
    </div>
  </figure>;
}
