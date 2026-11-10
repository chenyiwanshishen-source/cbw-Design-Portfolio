const experiences = [
  {
    period: '2020—2026.05',
    company: '合合信息',
    role: '产品设计师',
    description: '负责启信宝 B 端客户端、启信产业大脑的产品与交互设计，从需求梳理、方案设计到开发跟进和上线验收。后期参与 Qsight AI 报告平台从 0 到 1 的设计，负责核心交互与提示词基础框架。',
  },
  {
    period: '2018—2020',
    company: '上海驻云',
    role: 'B 端 UI 设计师',
    description: '负责电商运营后台、业务系统与数据可视化设计，部分项目兼顾需求沟通和项目推进。',
  },
  {
    period: '2017—2018',
    company: '鸿惠信息',
    role: 'C 端 UI 设计师',
    description: '负责在线商城的界面设计，配合产品和研发完成设计落地。',
  },
];

export function Experience() {
  return <section id="exp" aria-labelledby="exp-title" className="home-section border-t border-border">
    <h2 id="exp-title" className="text-h2 font-normal">经历</h2>
    <ol className="home-experience-list">
      {experiences.map(experience => <li key={experience.company} className="home-experience-row">
        <p className="text-meta text-text-meta">{experience.period}</p>
        <div className="home-experience-copy">
          <h3 className="text-h4 font-medium">{experience.company} · {experience.role}</h3>
          <p className="text-body text-text-secondary">{experience.description}</p>
        </div>
      </li>)}
    </ol>
  </section>;
}
