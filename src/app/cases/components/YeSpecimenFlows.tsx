const steps = [
  { title: '生成基础色板', detail: '设备、主题、字体与色板', icon: 'PaintBoardIcon', paper: true },
  { title: '生成基础规范', detail: '间距、描边、圆角、文字、栅格、阴影', icon: 'Layers01Icon', paper: true },
  { title: '对照规则检查', detail: '核对数值、文字、布局与边界', icon: 'CheckListIcon', paper: true },
  { title: '生成样张表现', detail: '修正样张，确认视觉表现', icon: 'DashboardSquare01Icon', paper: true },
  { title: '定义基础规则', detail: '统一变量与样式，检查绑定和视觉', icon: 'HierarchySquare01Icon', paper: true },
];

export function YeSpecimenFlows() {
  return <figure className="ye-sample-process" aria-label="样张生成流程：生成基础色板、生成基础规范、对照规则检查、生成样张表现、定义基础规则">
    <ol>{steps.map((step, index) => <li key={step.title}>
      <div className="ye-process-node">
        <span className="ye-process-number" aria-hidden="true">0{index + 1}</span>
        <div className={step.paper ? 'generator-paper ye-process-paper' : 'generator-app ye-process-ai'}>
          {step.paper ? <><strong>{step.title}</strong><span className="ye-process-cover-icon" aria-hidden="true" style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${step.icon}.svg)` }} /><span className="generator-paper-lines" aria-hidden="true"><i/><i/><i/><i/></span></> : <span>AI</span>}
        </div>
        <span className="ye-process-detail">{step.detail}</span>
      </div>
      {index < steps.length - 1 && <svg className="generator-arrow ye-process-arrow" viewBox="0 0 60 20" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>}
    </li>)}</ol>
  </figure>;
}
