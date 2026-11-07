const groups = [
  { title: '问题', icon: 'BubbleChatDelayIcon', points: [
    '当时市面上的组件库相关 Skill 还不太稳定。',
    '只靠聊天，AI 很难持续遵守已经定好的规则。',
    '从探索到组件生成的流程太长，后期容易偏离前面的约定。',
  ] },
  { title: '解决方案', icon: 'Layers01Icon', points: [
    '研究 Carbon 的间距、Fluent 的阴影等数值依据，整理规则。',
    '把栅格、文字、间距、圆角、阴影和描边拆成独立文档，按需读取。',
    '每次处理一类，先做样张并核对，确认后再写入变量与样式。',
  ] },
  { title: '结果', icon: 'DashboardSquare01Icon', points: [
    '形成了可单独使用的规则文档，不必每次重走完整流程。',
    '已用于 Qsight 旧设计稿的颜色整理和基础规范建设。',
    '组件库仍在开发；尚未验证能否稳定完成从零到一的整套生成。',
  ] },
];

export function DesignSystemSummary() {
  return <div className="design-system-summary" aria-label="设计系统实验的问题、解决方案与结果">
    {groups.map(group => <section key={group.title}>
      <span className="design-system-summary-icon" style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${group.icon}.svg)` }} aria-hidden="true" />
      <h3>{group.title}</h3>
      <ul>{group.points.map(point => <li key={point}>{point}</li>)}</ul>
    </section>)}
  </div>;
}
