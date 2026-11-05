import { useState } from 'react';
function Connector() {
  return <svg className="generator-arrow" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>;
}
function Paper({ title, warm = false }: { title: string; warm?: boolean }) {
  return <div className={`generator-paper${warm ? ' generator-paper-warm' : ''}`}><strong>{title}</strong><span className="generator-paper-lines" aria-hidden="true"><i/><i/><i/><i/><i/></span></div>;
}
export function PromptGenerator() {
  const [templatesOpen, setTemplatesOpen] = useState(false);
  return <figure className="prompt-generator" aria-label="固定模板经 Google AI Studio 生成章节智能体提示词，提示词与用户需求一起进入 Qsight，生成报告">
    <div className="generator-node generator-template-node"><button type="button" className="generator-notes" aria-label="展开三张固定模板" aria-expanded={templatesOpen} onClick={() => setTemplatesOpen(!templatesOpen)}><Paper title="生成规则" warm /><Paper title="章节需求" warm /><Paper title="固定模板" warm /></button><span className="generator-authored">我定义结构与规则</span></div>
    <Connector />
    <div className="generator-node generator-studio"><h4>Google AI Studio</h4><div className="generator-app"><img src={`${import.meta.env.BASE_URL}images/qsight/brands/google-ai-studio.svg`} alt="Google AI Studio" /></div><span className="generator-authored">我编写系统提示词</span></div>
    <Connector />
    <div className="generator-inputs"><div className="generator-node"><div className="generator-prompt-doc"><strong>智章节提示词</strong><div className="generator-prompt-sections" aria-hidden="true">{[0,1,2,3].map(i => <div key={i}><b/><span/><span/></div>)}</div></div></div><div className="generator-request"><strong>用户需求</strong><span className="generator-request-rules" aria-hidden="true"/></div></div>
    <div className="generator-merge" aria-hidden="true"><svg viewBox="0 0 60 240" preserveAspectRatio="none"><path d="M0 120 H60 M0 275 H16 Q24 275 24 267 V128 Q24 120 32 120"/><path d="M53 115 L59 120 53 125"/></svg></div>
    <div className="generator-node"><div className="generator-app generator-qsight"><span className="generator-qsight-logo"><img src={`${import.meta.env.BASE_URL}images/qsight/brands/qsight-logo.webp`} alt="Qsight" /></span></div></div>
    <Connector />
    <div className="generator-node"><div className="generator-report"><span className="generator-report-kicker" aria-hidden="true">REPORT</span><strong>报告</strong><span className="generator-report-rule" aria-hidden="true"/><span className="generator-report-footer" aria-hidden="true"><i/><i/></span></div></div>
  </figure>;
}
