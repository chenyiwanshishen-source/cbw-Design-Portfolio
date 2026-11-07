type Point = [number, number];
type Note = { text: string; left: number; top: number; arrows: { from: Point; to: Point; bend?: number }[] };
const notes: Record<string, Note[]> = {
  'chain-create-empty.webp': [{ text: '系统没有的环节，可以直接创建', left: 3, top: 35, arrows: [{ from: [35, 35], to: [44, 27], bend: -4 }] }],
  'chain-editor-1.webp': [{ text: '按业务需要，自己管理产业环节', left: 51, top: 25, arrows: [{ from: [52, 31], to: [42, 41], bend: -8 }] }],
  'chain-editor-2.webp': [{ text: '按业务需要，自己管理产业环节', left: 46, top: 29, arrows: [{ from: [64, 35], to: [75, 48], bend: -7 }] }],
  hierarchy: [{ text: '按实际业务编排图谱', left: 39, top: 55, arrows: [{ from: [55, 54], to: [59, 32], bend: 6 }, { from: [40, 61], to: [23, 72], bend: 7 }] }],
  'chain-company-management.webp': [{ text: '建好产业链，就能查看相关资讯', left: 58, top: 10, arrows: [{ from: [56, 12], to: [49, 7], bend: -5 }] }],
  'chain-company-details.webp': [{ text: '重点企业，随时关注', left: 34, top: -5, arrows: [{ from: [33, -1], to: [24, 9], bend: -4 }] }],
  overview: [{ text: '实时关注区域动向', left: 38, top: 12, arrows: [{ from: [38, 19], to: [38, 32], bend: 8 }] }],
  monitor: [{ text: '及时发现企业风险', left: 3, top: 38, arrows: [{ from: [26, 36], to: [26, 24], bend: -10 }, { from: [26, 44], to: [26, 59], bend: -7 }] }],
  functions: [{ text: '自由规划工作路线', left: 1, top: 18, arrows: [{ from: [13, 23], to: [18, 28], bend: -7 }] }],
};
function arrowPath(from: Point, to: Point, bend = 5) {
  const [x, y] = from.map(v => v * 10);
  const [tx, ty] = to.map(v => v * 10);
  const dx = tx - x, dy = ty - y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length, ny = dx / length;
  const cx = x + dx * .5 + nx * bend * 10, cy = y + dy * .5 + ny * bend * 10;
  const angle = Math.atan2(ty - cy, tx - cx);
  const size = 15;
  return `M${x} ${y} C${x + dx * .15 + nx * 12} ${y + dy * .15 + ny * 12} ${cx} ${cy} ${tx} ${ty} M${tx - Math.cos(angle - .5) * size} ${ty - Math.sin(angle - .5) * size} Q${tx - Math.cos(angle) * 4} ${ty - Math.sin(angle) * 4} ${tx} ${ty} L${tx - Math.cos(angle + .5) * size} ${ty - Math.sin(angle + .5) * size}`;
}
export function QixinAnnotation({ name }: { name: string }) {
  const items = notes[name];
  if (!items) return null;
  return <div className="qixin-annotations">{items.map(item => <div key={item.text}><span className="qixin-annotation-text" style={{ left: `${item.left}%`, top: `${item.top}%` }}>{item.text}</span><svg className="qixin-annotation-arrow" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" aria-hidden="true">{name === 'chain-create-empty.webp' && <path d="M398 260 C399 227 514 229 510 262 C508 292 395 293 398 260 M404 263 C397 235 510 230 515 259 C520 291 405 295 402 265" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />}{item.arrows.map((arrow, i) => <path key={i} d={arrowPath(arrow.from, arrow.to, arrow.bend)} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />)}</svg></div>)}</div>;
}
