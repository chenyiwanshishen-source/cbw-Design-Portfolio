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
        "长期参与复杂业务与数据产品设计，熟悉从信息结构、任务流程到页面落地的拆解方法，能把高密度业务转化为清晰可执行的产品方案。",
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
      title: "设计推进与落地",
      description:
        "从需求梳理、方案设计到原型验证，持续关注关键流程、边界状态与实现质量，让设计真正落到产品中。",
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
    <section id="skills" className="relative px-6 pb-24 pt-12 sm:px-10 md:pb-28 md:pt-16 lg:px-16 lg:pb-32 lg:pt-14 xl:px-24 2xl:px-32">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-10 md:mb-12">
          <div>
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)]">
              能力概况
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
                className={`skills-sticky-note skills-note-${i} group relative p-6 lg:p-7 flex flex-col ${s.span ?? ""}`}
              >
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
                    <div className={`skills-sticky-stamp ${s.size === "lg" ? "skills-sticky-stamp-large" : ""}`}>
                      <Icon className={`skills-sticky-icon ${s.size === "lg" ? "size-6" : "size-5"}`} />
                      <Icon aria-hidden="true" className={`skills-sticky-icon skills-sticky-icon-echo ${s.size === "lg" ? "size-6" : "size-5"}`} />
                    </div>
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
