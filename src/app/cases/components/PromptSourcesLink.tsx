export function PromptSourcesLink(){
 return <><div className="case-prompt-source-layout"><strong className="case-prompt-source-title">使用 Google AI Studio 生成提示词</strong><img className="case-prompt-source-image" src="/images/qsight/prompt-ai-studio.webp" alt="在 Google AI Studio 中编写和验证章节智能体提示词" loading="lazy" /><div className="case-prompt-source-entry"><span className="case-prompt-paper-stack" aria-hidden="true">{[
 ['01 章节需求','章节提示词需求','任务目标','你帮我生成一份关于重点企业监测报告章节智能体的提示词。','数据注入与解析原则','用户输入的需求要求大于系统提示词。'],
 ['02 系统提示词','Google Studio 提示词','核心职责','把用户的自然语言需求、草稿要求、已有提示词或任务目标，编译成高质量提示词。','全局安全红线','不编造用户未提供的硬约束。'],
 ['03 最终输出','重点企业监测报告章节智能体','Profile','精准解析上游数据，并行调用检索工具，通过数据去重与清洗输出结构化企业简报。','最高优先级原则','用户输入的需求要求永远大于本系统提示词。']
].map(([label,title,heading,text,second,detail])=><span className="case-outline-paper case-prompt-paper" key={label}><strong className="case-outline-paper-heading font-medium">{title}</strong><span className="case-outline-paper-label">{label}</span><span className="case-outline-paper-section"><strong>{heading}</strong><span className="case-outline-paper-text">{text}</span></span><span className="case-outline-paper-section"><strong>{second}</strong><span className="case-outline-paper-text">{detail}</span></span></span>)}</span></div></div></>;
}
