import { motion } from "motion/react";
import {
  Sparkles,
  Workflow,
  Layers,
  BarChart3,
  Component,
} from "lucide-react";

export function Skills() {
  const skills = [
    {
      icon: Sparkles,
      title: "AI 产品 0-1 设计",
      description:
        "主导 AI 报告生成从需求拆解到 1.0 上线。负责 Agent 链路交互、生成过程透明化与来源可信度设计，推动 AI 从单纯生成工具收敛为可控的业务流程。",
      span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
      size: "lg",
    },
    {
      icon: Workflow,
      title: "Prompt 工程化体系",
      description:
        "将个人经验 Prompt 梳理收敛为团队标准框架。搭建六阶段编译管线与异常自动重试机制，降低协作调教成本并保障模型输出稳定性。",
      span: "sm:col-span-1 lg:col-span-2",
    },
    {
      icon: Layers,
      title: "复杂 B 端业务架构",
      description:
        "五年企业级数据智能平台主导设计。负责产业链图谱、首页工作台与多源数据流转架构，具备高密度信息与复杂业务流程落地能力。",
      span: "sm:col-span-1 lg:col-span-2",
    },
    {
      icon: BarChart3,
      title: "数据可视化与图谱",
      description:
        "主导产业链图谱、企业关联网络与动态监控看板设计。将海量实体与深层数据关系转化为直观可视的交互结构，支撑多维决策研判。",
      span: "sm:col-span-1 lg:col-span-2",
    },
    {
      icon: Component,
      title: "设计系统与组件规范",
      description:
        "主导搭建团队 DGG 组件库与设计规范，统一色彩 Token、排版层级与高密度交互模式，沉淀标准化设计资产，保障多业务线交付一致性。",
      span: "sm:col-span-1 lg:col-span-2",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto lg:auto-rows-[185px] gap-4 sm:gap-5 [grid-auto-flow:dense]">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`skills-sticky-note skills-note-${i} group relative p-6 lg:p-7 flex flex-col justify-between ${s.span ?? ""}`}
              >
                {/* Decorative pattern for large piece */}
                {s.size === "lg" && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(34,88,244,0.16) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                )}
                <div className="relative flex flex-col h-full justify-start">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center text-[#2D3748] transition-transform duration-200 group-hover:scale-105">
                      <Icon className={s.size === "lg" ? "size-7 stroke-[1.8]" : "size-6 stroke-[1.8]"} />
                    </span>
                  </div>
                  <h3
                    className={`text-[#1A1C24] font-bold mb-2.5 ${
                      s.size === "lg" ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-[#4E525E] leading-relaxed ${
                      s.size === "lg" ? "text-base lg:text-[17px] lg:leading-[1.75]" : "text-sm sm:text-[15px] leading-normal"
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
