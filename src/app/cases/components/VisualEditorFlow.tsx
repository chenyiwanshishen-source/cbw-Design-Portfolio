import { useEffect, useRef } from 'react';
export function VisualEditorFlow() {
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el) return;
  const observer=new IntersectionObserver(([entry])=>{el.classList.toggle('is-visible',entry.isIntersecting);},{threshold:.25});
  observer.observe(el);return ()=>observer.disconnect();
 },[]);
 const base=import.meta.env.BASE_URL;
 const agents=[['终端','apple-terminal.webp'],['Codex','codex-color.svg'],['Claude','claude-color.svg'],['Cursor','cursor.svg'],['GitHub Copilot','githubcopilot.svg'],['Windsurf','windsurf.svg'],['Gemini','gemini-color.svg']];
 const line=<div className="illustration-middle-link" aria-hidden="true">→</div>;
 return <div className="editor-principle-layout"><figure ref={root} className="illustration-flow editor-principle" aria-label="终端和智能体连接前端页面，再连接查看器，供设计师检查和修改">
 <div className="editor-principle-left"><div className="illustration-workflow">
  <div className="illustration-ai"><div className="bridge-agent-icons">{agents.map(([name,file])=><div className="bridge-icon" key={name} title={name}><img src={`${base}images/qsight/brands/${file}`} alt={name}/></div>)}</div></div>
  {line}
  <div className="illustration-endpoint"><span>前端页面</span><div className="illustration-flow-icon"><img src={`${base}images/icons/phosphor/monitor.svg`} alt=""/></div></div>
  {line}
  <div className="illustration-endpoint"><span>查看器</span><div className="illustration-flow-icon"><img src={`${base}images/visual-editor/inspector.svg`} alt=""/></div></div>
  {line}
  <div className="illustration-endpoint"><span>设计师</span><div className="illustration-flow-icon"><img src={`${base}images/visual-editor/user.svg`} alt=""/></div><strong>检查和修改</strong></div>
 </div></div>
 </figure><aside className="editor-principle-placeholder editor-principle-plan" aria-label="下一步规划"><h4>下一步规划</h4><p>在查看器里接入 AI，<mark className="case-marker">只给它找问题和修改所需的工具</mark>，让它专注页面走查和代码修改，<mark className="case-marker">设计师专注细节和审美</mark>。</p><p>用户可以按效果和成本选择合适的模型，<mark className="case-marker">接入自己的 API Key</mark> 来完成这些工作。</p><div className="editor-plan-models" aria-label="计划接入的大模型">{[['OpenAI','openai.svg'],['Claude','claude-color.svg'],['Gemini','gemini-color.svg'],['DeepSeek','deepseek-color.svg'],['通义千问','qwen-color.svg'],['豆包','doubao.webp']].map(([name,file])=><div className="bridge-icon" key={name} title={name}><img src={`${base}images/qsight/brands/${file}`} alt={name}/></div>)}</div></aside><svg className="editor-plan-connection" viewBox="0 0 1200 304" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M490 190 C492 209 485 225 491 238 C512 251 544 245 570 250 C629 257 710 244 780 252 M769 243 Q777 247 782 252 Q775 256 767 260"/></svg></div>;
}
