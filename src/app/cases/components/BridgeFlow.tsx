export function BridgeFlow() {
  const base = `${import.meta.env.BASE_URL}images/qsight/brands/`;
  return <figure className="bridge-flow" aria-label="智能体通过 MCP 连接本地服务，再由插件读取和修改 Figma，执行结果沿原路返回">
    <div className="bridge-flow-node"><span className="bridge-flow-label">智能体</span><div className="bridge-agent-icons">{[
      ['Codex', 'codex-color.svg'], ['Claude', 'claude-color.svg'], ['Cursor', 'cursor.svg'], ['GitHub Copilot', 'githubcopilot.svg'], ['Windsurf', 'windsurf.svg'], ['Cline', 'cline.svg'], ['Gemini', 'gemini-color.svg'],
    ].map(([name, file]) => <div key={name} className="bridge-icon" title={name}><img src={`${base}${file}`} alt={name} /></div>)}</div><span className="bridge-flow-caption" aria-hidden="true">&nbsp;</span></div>
    <div className="bridge-flow-connector"><span>MCP</span><i /></div>
    <div className="bridge-flow-node"><span className="bridge-flow-label">本地端口服务</span><div className="bridge-icon bridge-terminal"><img src={`${base}apple-terminal.webp`} alt="macOS 终端" /></div><span className="bridge-flow-caption" aria-hidden="true">&nbsp;</span></div>
    <div className="bridge-flow-connector"><span>插件桥接</span><i /></div>
    <div className="bridge-flow-node"><span className="bridge-flow-label">Figma</span><div className="bridge-icon"><img src={`${base}figma.svg`} alt="Figma" /></div><span className="bridge-flow-caption" aria-hidden="true">&nbsp;</span></div>
  </figure>;
}
