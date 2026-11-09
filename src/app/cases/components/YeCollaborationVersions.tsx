const versions = [
  { label: '第一版', tools: ['gemini'] },
  { label: '第二版', tools: ['codex', 'gemini'] },
  { label: '第三版', tools: ['claude', 'gemini', 'codex'] },
];

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
