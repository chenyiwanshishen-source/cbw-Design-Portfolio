const experiences = [
  {
    period: '2020—2026.05',
    company: '合合信息',
    role: '产品设计师',
    focus: '交互设计、界面设计',
    projects: ['Qsight · AI 报告平台', '启信产业大脑', '启信宝 B 端客户端'],
  },
  {
    period: '2018—2020',
    company: '上海驻云',
    role: 'B 端 UI 设计师',
    focus: '界面设计、客户沟通',
    projects: ['电商运营后台', '业务系统与数据可视化'],
  },
  {
    period: '2016—2018',
    company: '鸿惠信息',
    role: 'C 端 UI 设计师',
    projects: ['在线商城'],
  },
];

export function Experience() {
  return <section id="exp" aria-labelledby="exp-title" className="home-section border-t border-border">
    <h2 id="exp-title" className="text-h2 font-normal">经历</h2>
    <ol className="home-experience-list">
      {experiences.map(experience => <li key={experience.company} className="home-experience-row">
        <div className="home-experience-identity">
          <h3 className="text-h4 font-medium">{experience.company}</h3>
          <p className="text-body text-text-secondary">{experience.role}</p>
          <p className="text-meta text-text-meta">{experience.period}</p>
          {experience.focus && <p className="text-caption text-text-body"><mark className="case-marker">{experience.focus}</mark></p>}
        </div>
        <ul className="home-experience-projects">
          {experience.projects.map(project => <li key={project} className="text-body font-normal">{project}</li>)}
        </ul>
      </li>)}
    </ol>
  </section>;
}
