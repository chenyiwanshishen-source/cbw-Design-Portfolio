import { motion } from "motion/react";
import {
  Brain,
  Layers,
  Workflow,
  BarChart3,
  Lightbulb,
  Users,
} from "lucide-react";

export function Skills() {
  const skills = [
    {
      icon: Brain,
      title: "业务理解能力强",
      description:
        "深耕 B/G 端产业数据领域多年,熟悉政府招商、产业分析、企业征信等垂直场景,将复杂业务转化为清晰的产品方案。",
      span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
      size: "lg",
      accent: "from-[#2258F4]/20 to-[#E5EBFF]/40",
    },
    {
      icon: Lightbulb,
      title: "AI 产品设计经验",
      description:
        "参与 AI Agent 架构下的产品设计,主导提示词框架,在生成内容场景优化信息层级与可读性。",
      span: "lg:col-span-2",
      accent: "from-[#1A42B8]/18 to-[#EEF2FF]/45",
    },
    {
      icon: Workflow,
      title: "全链路设计能力",
      description:
        "从需求分析到上线验收的完整掌控,跨部门协作与推动落地。",
      accent: "from-[#2258F4]/18 to-[#A8BEFF]/28",
    },
    {
      icon: BarChart3,
      title: "数据可视化设计",
      description:
        "信息架构与交互流程设计,数据可视化与复杂信息呈现,B 端产品与后台系统设计经验丰富。",
      span: "sm:row-span-2 lg:row-span-2",
      size: "tall",
      accent: "from-[#1A42B8]/16 to-[#E5EBFF]/42",
    },
    {
      icon: Layers,
      title: "系统化思维",
      description: "沉淀标准化工作流程,建立提示词框架等基础设施,提升团队协作效率。",
      span: "lg:col-span-2",
      accent: "from-[#2258F4]/18 to-[#EEF2FF]/45",
    },
    {
      icon: Users,
      title: "跨团队协作",
      description: "协同 PM 与研发推进方案落地,保障设计还原质量。",
      accent: "from-[#A8BEFF]/30 to-[#E5EBFF]/42",
    },
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-16">
          <div>
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)]">
              我能做什么
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 [grid-auto-flow:dense]">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-[24px] border border-[#E6E7EB] bg-white shadow-[0_1px_2px_rgba(26,28,36,0.04)] p-6 lg:p-7 hover:border-[#CBCDD4] hover:shadow-md hover:-translate-y-1 transition-all duration-500 flex flex-col ${s.span ?? ""}`}
              >
                <div
                  className={`absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${s.accent}`}
                />
                {/* Decorative pattern for large piece */}
                {s.size === "lg" && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(34,88,244,0.16) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                )}
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`inline-flex items-center justify-center rounded-xl bg-[#F5F5F7] border border-[#E6E7EB] text-[#4E525E] group-hover:bg-[#2258F4] group-hover:border-[#2258F4] group-hover:text-white transition-colors ${
                        s.size === "lg" ? "size-14" : "size-11"
                      }`}
                    >
                      <Icon className={s.size === "lg" ? "size-6" : "size-5"} />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] text-[#696D7A]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3
                    className={`text-[#1A1C24] mb-3 ${
                      s.size === "lg" ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-[#4E525E] leading-relaxed ${
                      s.size === "lg" ? "text-base" : "text-sm"
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
