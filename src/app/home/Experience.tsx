const experiences = [
  {
    period: '2020—2026.05',
    company: '合合信息',
    projects: ['启信宝 B 端客户端', '启信产业大脑', 'Qsight · AI 报告平台'],
  },
  {
    period: '2018—2020',
    company: '上海驻云',
    projects: ['电商运营后台', '业务系统与数据可视化'],
  },
  {
    period: '2017—2018',
    company: '鸿惠信息',
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
          <p className="text-meta text-text-meta">{experience.period}</p>
        </div>
        <ul className="home-experience-projects">
          {experience.projects.map(project => <li key={project} className="text-h4 font-normal">{project}</li>)}
        </ul>
      </li>)}
    </ol>
  </section>;
}
