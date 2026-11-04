const stages = [
  ['任务定义', '明确目标、角色和完成标准'],
  ['工具编排', '规定输入和工具调用顺序'],
  ['质量检查', '约束内容、格式和数据依据'],
  ['异常处理', '设置重试、兜底和交付自检'],
];
export function PromptStructure() {
  return <figure className="prompt-structure" aria-label="从混杂的生成要求，梳理为任务定义、工具编排、质量检查、异常处理四个阶段">
    <div className="prompt-structure-tangle">
      <svg viewBox="0 0 280 240" fill="none" aria-hidden="true">
        <path d="M25 152C64 8 236 24 224 126S44 238 52 117 263 58 203 176 13 130 103 58 253 171 124 198 65 15 187 70 167 231 73 161 142 17 217 94 77 220 64 104 237 127 154 177 37 63 137 56 238 216 107 168 145 35 213 132" />
      </svg>
      <span className="text-caption text-text-meta">混在一起的生成要求</span>
    </div>
    <div className="prompt-structure-gate text-body font-medium">提示词分阶段梳理</div>
    <svg className="prompt-structure-connectors" viewBox="0 0 400 36" preserveAspectRatio="none" fill="none" aria-hidden="true">{Array.from({ length: 17 }, (_, i) => <path key={i} d={`M${40 + i * 20} 0v36`} />)}</svg>
    <ol className="prompt-structure-stages">{stages.map(([title, text], i) => <li key={title}><span className="prompt-structure-number text-caption">0{i + 1}</span><div><h4 className="text-h4 font-medium">{title}</h4><p className="text-caption text-text-body">{text}</p></div></li>)}</ol>
  </figure>;
}
