const versions = [
  { label: '第一版', tools: ['gemini'] },
  { label: '第二版', tools: ['codex', 'gemini'] },
  { label: '第三版', tools: ['claude', 'gemini', 'codex'] },
];

export function YeCollaborationVersions() {
  return <figure className="ye-collaboration-versions" aria-label="三个版本的智能体协作组合">
    {versions.map(version => <div className="ye-collaboration-version" key={version.label} aria-label={version.label}>
      {version.tools.map(tool => <img key={tool} src={`${import.meta.env.BASE_URL}images/qsight/brands/${tool}-color.svg`} alt={tool === 'gemini' ? 'Gemini' : tool === 'claude' ? 'Claude' : 'Codex'} width="40" height="40" loading="lazy" />)}
    </div>)}
  </figure>;
}
