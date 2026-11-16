import { ArrowLeft } from 'lucide-react';
import { usePlaygroundCanvas, type CanvasItem } from './usePlaygroundCanvas';
import './playground-gallery.css';

const imageRoot = `${import.meta.env.BASE_URL}images/playground/`;
const works = [
  { id: 'workbench', group: 'interfaces', title: '教师工作台', width: 1960, height: 1240, alt: '教育产品教师工作台，包含常用功能、待办事项、学情趋势和批阅进度' },
  { id: 'paper-builder', group: 'interfaces', title: '知识点组卷', width: 1936, height: 1240, alt: '知识点组卷界面，包含知识点目录、试题筛选和试题列表' },
  { id: 'grading-allocation', group: 'interfaces', title: '分配阅卷', width: 2048, height: 1280, alt: '阅卷分配界面，展示考试列表、题目分配状态和批阅教师' },
  { id: 'class-report', group: 'interfaces', title: '班级报告', width: 2048, height: 1636, alt: '班级学情报告，展示成绩概览、上档率趋势、各科合格情况和学生排名' },
  { id: 'dashboard-education', group: 'dashboards', title: '行智教育集团院校情况', width: 2048, height: 857, alt: '行智教育集团院校情况完整大屏，包含四川地图、院校数据、升学情况与教科研成果' },
  { id: 'dashboard-agriculture', group: 'dashboards', title: '皖农链农产品监测', width: 1920, height: 1080, alt: '皖农链农产品监测完整大屏，包含安徽地图、农业概况、产品检测与环境监测设备数据' },
  { id: 'campaign-invitation', group: 'campaign', title: '邀请有礼活动页面', width: 750, height: 1980, alt: '邀请有礼活动页面，展示邀请好友奖励、分享入口、邀请收益和我的奖励' },
  { id: 'campaign-reward-10', group: 'campaign', title: '10元奖励插画', width: 180, height: 144, alt: '标有10元的红色礼盒奖励插画，透明背景' },
  { id: 'campaign-reward-5', group: 'campaign', title: '5元奖励插画', width: 180, height: 144, alt: '标有5元的红色礼盒奖励插画，透明背景' },
  { id: 'campaign-vip', group: 'campaign', title: 'VIP礼盒插画', width: 180, height: 144, alt: '装有VIP卡与礼品的红色礼盒插画，透明背景' },
  { id: 'dashboard-industry-shanghai', group: 'dashboards', title: '对外产业合作情况', width: 1920, height: 1080, alt: '对外产业合作情况完整大屏，包含上海地图、宝山浦东奉贤区域数据、对口地区分析、产业词云和投资企业分析' },
  { id: 'mobile-report', group: 'mobile', title: '单科报告', width: 340, height: 726, alt: '学生单科报告手机界面，展示考试成绩、排名趋势和薄弱知识点' },
  { id: 'mobile-learning-practice', group: 'mobile', title: '原题与变式训练', width: 400, height: 754, alt: '个性化学习宝练习界面，展示原题和变式训练' },
  { id: 'mobile-learning-paid', group: 'mobile', title: '个性化学习宝闯关', width: 350, height: 822, alt: '已开通的个性化学习宝手机界面，展示排名、知识点和单题试炼' },
  { id: 'mobile-learning-locked', group: 'mobile', title: '个性化学习宝体验', width: 350, height: 822, alt: '个性化学习宝体验手机界面，展示免费试炼与尚未购买的状态' },
];


// Small overlaps and gentle angles keep each group together while exposing each work.
// Cropped previews retain the previously agreed ratios; other images stay complete.
const arrangement: Record<string, { x: number; y: number; width: number; height?: number; angle: number }> = {
  'workbench': { x: 0, y: 100, width: 400, height: 250, angle: -2 },
  'paper-builder': { x: 350, y: 60, width: 400, height: 250, angle: 1.5 },
  'grading-allocation': { x: 40, y: 320, width: 400, height: 250, angle: -1 },
  'class-report': { x: 390, y: 290, width: 400, height: 250, angle: 2 },
  'dashboard-education': { x: 1240, y: 710, width: 460, angle: -1.5 },
  'dashboard-agriculture': { x: 1580, y: 740, width: 460, angle: 1.5 },
  'dashboard-industry-shanghai': { x: 1420, y: 920, width: 460, angle: -1 },
  'campaign-invitation': { x: 80, y: 1000, width: 200, height: 456, angle: -1.5 },
  'campaign-reward-10': { x: 270, y: 1240, width: 150, angle: -5 },
  'campaign-reward-5': { x: 400, y: 1210, width: 150, angle: -1 },
  'campaign-vip': { x: 530, y: 1240, width: 150, angle: 5 },
  'mobile-report': { x: 1120, y: 60, width: 190, angle: -2 },
  'mobile-learning-practice': { x: 1280, y: 90, width: 190, angle: 1 },
  'mobile-learning-paid': { x: 1440, y: 60, width: 190, angle: -1 },
  'mobile-learning-locked': { x: 1600, y: 90, width: 190, angle: 2 },
};

const canvasWorks = works.map(work => {
  const frame = arrangement[work.id];
  return { ...work, frame: { ...frame, height: frame.height ?? frame.width * work.height / work.width } };
});
// Group notes sit in the canvas with the artwork, rather than repeating a caption on every image.
const groupNotes = [
  { id: 'school', title: '智能精准教与学减负系统', detail: 'Web 端 · 学校管理后台', x: 0, y: 610, width: 790, height: 72 },
  { id: 'parents', title: '智能精准教与学减负系统', detail: '家长后台', x: 1120, y: 575, width: 670, height: 72 },
  { id: 'marketing', title: '营销拓客', detail: '营销活动页面', x: 80, y: 1495, width: 600, height: 72 },
  { id: 'visualization', title: '数据可视化大屏', detail: '教育 · 农业 · 产业合作', x: 1240, y: 1540, width: 800, height: 72 },
];
const canvasItems: CanvasItem[] = [
  ...canvasWorks.map(work => ({ id: work.id, ...work.frame })),
  ...groupNotes.map(note => ({ ...note, id: `note-${note.id}` })),
];

export function PlaygroundGallery() {
  const canvas = usePlaygroundCanvas(canvasItems);
  const { camera } = canvas;
  // Keep the dots legible without becoming dense when the whole board is in view.
  const gridUnit = 56 * 2 ** Math.max(0, Math.ceil(Math.log2(20 / (56 * camera.scale))));
  const gridSize = gridUnit * camera.scale;

  return <section className="playground-gallery" aria-label="作品展示">
    <a className="playground-back" href="#playground"><ArrowLeft size={18} aria-hidden="true" />返回首页</a>
    <span id="playground-keyboard-help" className="sr-only">拖动空白处平移画布，拖动图片调整位置。使用双指手势，或按住 Ctrl、Command 配合滚轮缩放。画布聚焦时方向键平移，加减键缩放，数字零查看全部；图片聚焦时方向键移动图片。</span>
    <div
      ref={canvas.viewportRef}
      className={`playground-viewport${canvas.isPanning ? ' is-panning' : ''}${canvas.activeItemId ? ' is-moving-image' : ''}`}
      tabIndex={0}
      role="region"
      aria-label="作品无限画布"
      aria-describedby="playground-keyboard-help"
      style={{ backgroundSize: `${gridSize}px ${gridSize}px`, backgroundPosition: `${camera.x}px ${camera.y}px` }}
      {...canvas.viewportHandlers}
    >
      <div className="playground-world" style={{ transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})` }}>
        {groupNotes.map(note => <div
          key={note.id}
          className="playground-group-note"
          style={{ left: note.x, top: note.y, width: note.width, height: note.height }}
        >
          <h2>{note.title}</h2>
          <p>{note.detail}</p>
        </div>)}
        {canvasWorks.map(work => <figure
          key={work.id}
          className={`playground-piece playground-piece--${work.group} playground-piece--${work.id}${canvas.activeItemId === work.id ? ' is-dragging' : ''}`}
          tabIndex={0}
          aria-label={`可拖动图片：${work.title}`}
          aria-describedby="playground-keyboard-help"
          style={{ left: canvas.positions[work.id].x, top: canvas.positions[work.id].y, width: work.frame.width, height: work.frame.height, zIndex: canvas.itemLayers[work.id], transform: `rotate(${work.frame.angle}deg)` }}
          {...canvas.getItemHandlers(work.id)}
        >
          <div className="playground-image">
            <img src={`${imageRoot}${work.id}.webp`} width={work.width} height={work.height} alt={work.alt} loading="lazy" decoding="async" draggable={false} />
          </div>
        </figure>)}
      </div>
    </div>
  </section>;
}
