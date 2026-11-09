const versions = [
  { label: '第一版', tools: ['gemini'] },
  { label: '第二版', tools: ['codex', 'gemini'] },
  { label: '第三版', tools: ['claude', 'gemini', 'codex'] },
];

export function YeCollaborationIntro() {
  return <div className="case-prose ye-collaboration-intro">
    <p className="case-paragraph">第一版时，我没有把功能流转想清楚，Gemini 在模糊的需求下做出了一套靠正则和硬约束执行的工作流。第二版由 Codex 和 Gemini 协作重构，但只在原有判断外加了一层意图识别，<strong>重构没有解决根本问题</strong>。</p>
    <p className="case-paragraph">使用中，我发现 Claude 能把技术问题拆解得更清楚。第三版因此调整分工：<strong>Claude 定方案、拆任务、写测试文档，Codex 改代码和重建架构，Gemini 跑全量测试、更新项目文档</strong>。</p>
    <p className="case-paragraph">这几次协作让我了解了三点：</p>
    <ul className="ye-collaboration-judgments">
      <li><strong>模型的使用要落到具体分工。</strong>让同一个智能体同时定方案、写代码、做验证，很难看出偏差从哪里开始；第三版我把这些工作分开负责。</li>
      <li><strong>模型的特点要在实际任务中判断。</strong>这次协作中，Claude 拆解问题更清楚，Codex 更适合修改代码和重建架构，Gemini 则负责全量测试与文档；上下文不完整时，方案判断仍可能偏移。</li>
      <li><strong>产品目标需要我先确定。</strong>第一版没有想清功能流转，第二版又把加上意图识别当成重构，都没有达到预期。模型能完成代码，不代表做出的就是我想要的产品。</li>
    </ul>
  </div>;
}

export function YeCollaborationVersions() {
  return <figure className="ye-collaboration-versions" aria-label="三个版本的智能体协作组合">
    {versions.map(version => <div className="ye-collaboration-version" key={version.label} aria-label={version.label}>
      {version.label === '第三版' ? <div className="ye-collaboration-branch">
        <span className="ye-collaboration-logo ye-branch-lead"><img src={`${import.meta.env.BASE_URL}images/qsight/brands/claude-color.svg`} alt="Claude" width="40" height="40" /></span>
        <svg className="ye-branch-lines" viewBox="0 0 200 80" fill="none" aria-hidden="true"><path d="M100 0V24Q100 40 84 40H52Q36 40 36 56V80M100 24Q100 40 116 40H148Q164 40 164 56V80" stroke="currentColor" strokeWidth="1.5" /><circle cx="100" cy="2" r="3" fill="currentColor" /></svg>
        <span className="ye-collaboration-logo ye-branch-left"><img src={`${import.meta.env.BASE_URL}images/qsight/brands/gemini-color.svg`} alt="Gemini" width="40" height="40" /></span>
        <span className="ye-collaboration-logo ye-branch-right"><img src={`${import.meta.env.BASE_URL}images/qsight/brands/codex-color.svg`} alt="Codex" width="40" height="40" /></span>
      </div> : version.tools.map(tool => <span className="ye-collaboration-logo" key={tool}><img src={`${import.meta.env.BASE_URL}images/qsight/brands/${tool}-color.svg`} alt={tool === 'gemini' ? 'Gemini' : 'Codex'} width="40" height="40" loading="lazy" /></span>)}
    </div>)}
  </figure>;
}
