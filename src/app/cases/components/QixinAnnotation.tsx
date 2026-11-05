import type { CSSProperties } from 'react';
const notes: Record<string, { text: string; left: string; top: string; arrow: CSSProperties }[]> = {
  'chain-create-empty.webp': [{ text: '系统没有的环节，可以直接创建', left: '3%', top: '33%', arrow: { left: '29%', top: '20%', width: '20%', transform: 'rotate(-90deg)' } }],
  'chain-editor-1.webp': [{ text: '按业务需要，自己管理产业环节', left: '51%', top: '22%', arrow: { left: '39%', top: '19%', width: '12%', transform: 'rotate(170deg)' } }],
  'chain-editor-2.webp': [{ text: '按业务需要，自己管理产业环节', left: '44%', top: '24%', arrow: { left: '55%', top: '19%', width: '12%', transform: 'rotate(-85deg)' } }],
  hierarchy: [{ text: '自由调整层级，按自己的思路编排', left: '30%', top: '30%', arrow: { left: '45%', top: '17%', width: '13%', transform: 'rotate(-90deg)' } }],
  'chain-company-management.webp': [{ text: '建好产业链，就能查看相关资讯', left: '51%', top: '7%', arrow: { left: '43%', top: '3%', width: '10%', transform: 'rotate(165deg)' } }],
  'chain-company-details.webp': [{ text: '重点企业，随时关注', left: '34%', top: '2%', arrow: { left: '24%', top: '3%', width: '10%', transform: 'rotate(140deg)' } }],
  overview: [{ text: '实时关注区域动向', left: '38%', top: '12%', arrow: { left: '27%', top: '19%', width: '20%', transform: 'rotate(70deg)' } }],
  monitor: [{ text: '及时发现企业风险', left: '19%', top: '7%', arrow: { left: '8%', top: '24%', width: '20%', transform: 'rotate(-90deg)' } }],
  functions: [{ text: '自由规划工作路线', left: '3%', top: '20%', arrow: { left: '9%', top: '27%', width: '12%', transform: 'rotate(10deg)' } }],
};
export function QixinAnnotation({ name }: { name: string }) {
  const items = notes[name];
  if (!items) return null;
  return <div className="qixin-annotations">{items.map(item => <div key={item.text}><span className="qixin-annotation-text" style={{ left: item.left, top: item.top }}>{item.text}</span><svg className="qixin-annotation-arrow" style={item.arrow} viewBox="0 0 160 110" fill="none" aria-hidden="true"><path d="M8 38 C6 9 52 5 61 27 C72 54 37 53 46 31 C60 3 113 51 144 91 M122 84 Q138 87 144 99 Q152 87 150 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>)}</div>;
}
