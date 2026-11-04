const stages = [
  ['任务定义', '明确目标、角色和完成标准'],
  ['工具编排', '规定输入和工具调用顺序'],
  ['质量检查', '约束内容、格式和数据依据'],
  ['异常处理', '设置重试、兜底和交付自检'],
];
const dots = Array.from({ length: 120 }, (_, i) => ({
  x: 12 + ((i * 73 + i * i * 7) % 185),
  y: 24 + ((i * 47 + i * i * 3) % 352),
  r: 1.5 + (i % 4) * .5,
  opacity: .12 + (i % 5) * .14,
}));
export function PromptStructure() {
  return <figure className="prompt-structure" aria-label="将零散要求梳理为四个提示词模块">
    <svg className="prompt-structure-map" viewBox="0 0 360 400" preserveAspectRatio="none" aria-hidden="true">
      {dots.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r="0.01" strokeWidth={dot.r * 2} opacity={dot.opacity} />)}
      <path className="prompt-map-divider" d="M224 8V392" />
      {[50, 150, 250, 350].map(y => <path key={y} className="prompt-map-link" d={`M242 200C286 200 286 ${y} 360 ${y}`} />)}
    </svg>
    <ol className="prompt-structure-stages">{stages.map(([title, text], i) => <li key={title}><div className="prompt-paper-heading"><span className="prompt-structure-number text-caption">0{i + 1}</span><h4 className="text-h4 font-medium">{title}</h4></div><p className="text-caption text-text-body">{text}</p></li>)}</ol>
  </figure>;
}
