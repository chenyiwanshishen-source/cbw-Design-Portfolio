const steps = [
  { title: '确认使用条件', detail: '设备、主题、字体与色板', paper: true },
  { title: '明确生成规则', detail: '间距、描边、圆角、文字、栅格、阴影', paper: true },
  { title: '对照规则检查', detail: '核对数值、文字、布局与边界', paper: true },
  { title: '调整并确认', detail: '修正样张，确认视觉表现', paper: true },
  { title: '写入并复核', detail: '统一变量与样式，检查绑定和视觉', paper: true },
];

export function YeSpecimenFlows() {
  return <figure className="ye-sample-process" aria-label="样张生成流程：确认使用条件、明确生成规则、对照规则检查、调整并确认、写入并复核">
    <ol>{steps.map((step, index) => <li key={step.title}>
      <div className="ye-process-node">
        <span className="ye-process-number" aria-hidden="true">0{index + 1}</span>
        <div className={step.paper ? 'generator-paper ye-process-paper' : 'generator-app ye-process-ai'}>
          {step.paper ? <><strong>{step.title}</strong><span className="generator-paper-lines" aria-hidden="true"><i/><i/><i/><i/></span></> : <span>AI</span>}
        </div>
        <strong className="ye-process-title">{step.title}</strong>
        <span className="ye-process-detail">{step.detail}</span>
      </div>
      {index < steps.length - 1 && <svg className="generator-arrow ye-process-arrow" viewBox="0 0 60 20" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>}
    </li>)}</ol>
    <figcaption>检查不通过时，返回生成样张继续调整；所需类别全部确认后，再统一写入。基础样张用于验证规则，具体组件尺寸和状态另行确定。</figcaption>
  </figure>;
}
