const screens = [
  '添加文件弹窗，未选择文件',
  '添加文件弹窗，上传文件',
  '报告段落修改要求与行文风格选择',
  '报告数据来源面板',
  '报告与参考原文对照',
  '报告历史版本侧栏',
  '报告表格与参考原文对照',
  '报告正文选中段落与 AI 改写工具栏',
  '移动端全屏导航菜单',
  '移动端历史报告卡片',
  '收藏夹中的文件列表',
  '回收站与彻底删除确认',
];

// One shared column system; rotate each image directly to keep its own raster layer.
const placements = [
  { x: -120, y: 720, width: 380 },
  { x: 290, y: 635, width: 380 },
  { x: 290, y: -160, width: 380 },
  { x: -120, y: -60, width: 380 },
  { x: 290, y: 105, width: 380 },
  { x: -120, y: 190, width: 380 },
  { x: 290, y: 370, width: 380 },
  { x: 700, y: -60, width: 380 },
  { x: 700, y: 205, width: 180 },
  { x: 900, y: 205, width: 180 },
  { x: -120, y: 455, width: 380 },
  { x: 700, y: 625, width: 380 },
];
const angle = -16 * Math.PI / 180;

export function QsightOverview({ hero = false }: { hero?: boolean }) {
  return <figure className={`qsight-overview${hero ? ' qsight-overview-hero' : ''}`} aria-label="Qsight 产品界面总览">
    {screens.map((alt, index) => {
      const { x, y, width } = placements[index];
      const dx = x - 500;
      const dy = y - 450;
      const left = (500 + dx * Math.cos(angle) - dy * Math.sin(angle)) / 10;
      const top = (450 + dx * Math.sin(angle) + dy * Math.cos(angle)) / 9;
      return <img key={alt} src={`${import.meta.env.BASE_URL}images/qsight/${index === 2 ? 'report-edit-original.webp' : index === 7 ? 'report-sources-web.webp' : `overview-${index + 1}.webp`}`} alt={alt} loading={hero ? "eager" : "lazy"} style={{ left: `${hero ? 50 + (left - 50) * 1.08 : left}%`, top: `${hero ? 35 + (top * .9 - 35) * 1.08 : top * .9}cqw`, width: `${width / 10 * (hero ? 1.08 : 1)}%` }} />;
    })}
  </figure>;
}
