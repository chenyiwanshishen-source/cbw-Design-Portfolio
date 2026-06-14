import { ProjectCard } from "./ProjectCard";

type ProjectPreloadKey = "ai-report" | "qixin-brain";

interface ProjectsProps {
  onProjectIntent?: (project: ProjectPreloadKey, priority?: "high" | "low") => void;
}

export function Projects({ onProjectIntent }: ProjectsProps) {
  const projects = [
    {
      number: "01",
      title: "AI 报告生成创新项目",
      subtitle: "AI 智能体 · 产业/企业分析报告产品",
      role: "产品设计师",
      description:
        "基于 AI Agent 架构与多源数据整合能力,支持根据用户模板自动生成产业分析报告与企业分析报告。1.0 版本已上线。",
      highlights: [
        "主导制定 AI 报告生成场景的提示词基础框架,沉淀标准化提示词结构",
        "负责产品流程、核心页面与结果展示设计，推动 1.0 上线并完成设计验收闭环",
        "梳理生成式内容场景下的提示词框架,兼顾业务逻辑、内容呈现与维护效率",
        "提升报告生成稳定性与团队协作效率,降低提示词撰写与维护门槛",
      ],
      tags: ["AI 智能体", "提示词体系", "生成式体验", "多源数据"],
      accent: "from-[#0D800D] to-[#64BC64]",
      href: "#/project/ai-report",
      preloadKey: "ai-report" as const,
      visual: "previewStack" as const,
    },
    {
      number: "02",
      title: "启信产业大脑",
      subtitle: "产业分析与招商服务平台 · 服务政府客户",
      role: "产品设计师",
      description:
        "面向地区招商与产业分析场景,主要服务政府及相关业务部门,辅助区域产业研究、招商研判与产业发展决策。围绕产业从集聚到集群的全流程监测。",
      highlights: [
        "结合业务方向进行页面方案设计与高保真还原",
        "复杂业务场景下的信息结构梳理与结果展示优化",
        "跟进开发流程与最终上线结果,推动设计方案准确落地",
        "覆盖产业链优劣势分析、企业迁入迁出监控、产业集聚与集群分析",
      ],
      tags: ["B 端设计", "数据可视化", "政务服务", "产业分析"],
      accent: "from-[#2258F4] to-[#618AFF]",
      href: "#/project/qixin-brain",
      preloadKey: "qixin-brain" as const,
      visual: "qixinPreviewStack" as const,
    },
  ];

  const projectGridColumns = projects.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section id="work" className="relative pt-8 md:pt-12 pb-24 md:pb-32 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="w-full">
        <div className="mb-16">
          <div>
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)]">
              项目案例
            </h2>
          </div>
        </div>

        <div className={`grid grid-cols-1 items-start gap-6 md:grid-cols-2 ${projectGridColumns}`}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.number}
              {...p}
              index={i}
              onIntent={p.preloadKey ? () => onProjectIntent?.(p.preloadKey, "high") : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
