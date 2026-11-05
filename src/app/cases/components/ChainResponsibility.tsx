import { useState } from 'react';
import './chain-responsibility.css';

const charts = [
  { title: '改版前', text: '用户提需求，内部人员负责配置', rows: [
    { role: '用户', key: 'user', value: 30 },
    { role: '系统', key: 'system', value: 22 },
    { role: '内部', key: 'internal', value: 94 },
  ] },
  { title: '改版后预期', text: '用户按本地口径，在系统里自己配置', rows: [
    { role: '用户', key: 'user', value: 42 },
    { role: '系统', key: 'system', value: 78 },
    { role: '内部', key: 'internal', value: 28 },
  ] },
];

export function ChainResponsibility() {
  const [position, setPosition] = useState(50);
  return <figure className="chain-responsibility">
    <div className="chain-comparison-stage">
      {charts.map((chart, index) => <div className="chain-comparison-layer" key={chart.title} style={index === 0 ? { clipPath: `inset(0 ${100 - position}% 0 0)` } : undefined}>
        <div className="chain-comparison-caption"><h4>{chart.title}</h4><p>{chart.text}</p></div>
        <div className="chain-columns" role="img" aria-label={`${chart.title}：${chart.text}。用户、系统、内部的相对复杂度示意。`}>
          {chart.rows.map(row => <div className="chain-column" key={row.key}>
            <div className="chain-column-track"><div className={`chain-column-bar chain-column-${row.key}`} style={{ height: `${row.value / 94 * 100}%` }} /></div>
            <span>{row.role}</span>
          </div>)}
        </div>
      </div>)}
      <div className="chain-comparison-divider" style={{ left: `${position}%` }} aria-hidden="true"><span>‹ ›</span></div>
      <input className="chain-comparison-slider" type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="左右拖动，对比改版前与改版后预期" aria-valuetext={`改版前显示 ${position}%，改版后预期显示 ${100 - position}%`} />
    </div>
  </figure>;
}
