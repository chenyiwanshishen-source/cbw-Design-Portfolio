const stages = [
  ['任务定义', '明确目标、角色和完成标准'],
  ['工具编排', '规定输入和工具调用顺序'],
  ['质量检查', '约束内容、格式和数据依据'],
  ['异常处理', '设置重试、兜底和交付自检'],
];
const threads = [
  'M25 188C65 15 236 82 185 218S21 101 116 83 250 243 125 252 53 20 190 105 160 235 103 166C161 90 245 122 290 82S354 44 420 44',
  'M30 136C127 276 231 46 121 65S38 272 193 225 181 17 82 124 252 231 183 147C235 89 271 132 319 132H420',
  'M47 220C5 101 203 39 207 175S70 265 75 122 242 111 151 230 31 108 151 88C235 62 245 220 320 220H420',
  'M30 161C166 21 224 222 123 248S32 77 160 94 202 270 82 200 134 31 213 157C250 218 277 308 333 308H420',
];
export function PromptStructure() {
  return <figure className="prompt-structure" aria-label="把混杂的生成要求梳理为四个提示词模块">
    <div className="prompt-structure-threads"><svg viewBox="0 0 420 352" preserveAspectRatio="none" fill="none" aria-hidden="true">{threads.map((d, i) => <path key={i} className={`prompt-thread prompt-thread-${i}`} d={d} />)}</svg></div>
    <ol className="prompt-structure-stages">{stages.map(([title, text], i) => <li key={title} className={`prompt-thread-${i}`}><span className="prompt-structure-number text-caption">0{i + 1}</span><div><h4 className="text-h4 font-medium">{title}</h4><p className="text-caption text-text-body">{text}</p></div></li>)}</ol>
  </figure>;
}
