const stages = [
  ['任务定义', '明确目标、角色和完成标准'],
  ['工具编排', '规定输入和工具调用顺序'],
  ['质量检查', '约束内容、格式和数据依据'],
  ['异常处理', '设置重试、兜底和交付自检'],
];
export function PromptStructure() {
  return <figure className="prompt-structure" aria-label="提示词的四个模块">
    <ol className="prompt-structure-stages">{stages.map(([title, text], i) => <li key={title}><div className="prompt-paper-heading"><span className="prompt-structure-number text-caption">0{i + 1}</span><h4 className="text-h4 font-medium">{title}</h4></div><p className="text-caption text-text-body">{text}</p></li>)}</ol>
  </figure>;
}
