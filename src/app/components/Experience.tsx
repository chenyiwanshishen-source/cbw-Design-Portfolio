import { motion } from "motion/react";

export function Experience() {
  const experiences = [
    {
      company: "上海合合信息科技股份有限公司",
      productName: "启信宝/启信产业大脑",
      role: "产品设计师",
      period: "2020 — 至今",
      responsibilities: [
        "负责需求分析、业务理解、产品方案设计、高保真输出、开发跟进及上线验收",
        "参与 AI 报告生成创新项目，负责模板选择、大纲确认、流式生成和历史文档等核心流程设计",
        "梳理数据来源、企业范围和章节结构等生成控制点，让报告生成过程可配置、可确认、可追溯",
        "前期负责启信宝 B 端客户端页面设计，参与相关业务页面的方案设计与落地",
        "后期主要负责启信产业大脑产品线的产品设计，服务地区招商、产业分析、产业链监测等场景",
        "围绕产业集聚、企业迁入迁出监控、区域产业优劣势分析等场景，参与页面与功能方案设计",
        "协同产品经理与研发团队推进方案落地，保障设计还原质量与上线效果",
      ],
      highlight:
        "主导 AI 报告生成场景的提示词基础框架,沉淀标准化提示词结构,提升报告生成稳定性与团队协作效率",
    },
    {
      company: "上海驻云信息科技有限公司",
      role: "B 端 UI 设计师",
      period: "2018 — 2020",
      responsibilities: [
        "负责复杂信息可视化与业务系统页面设计，参与从需求理解到方案落地的全流程",
        "参与电商产品运营后台设计，完成后台页面及功能模块的高保真输出",
        "结合业务需求进行页面结构梳理、视觉规范统一及设计落地",
        "在部分项目中承担项目管理，协助推进需求沟通、设计执行与上线",
      ],
    },
    {
      company: "鸿惠信息技术有限公司",
      role: "C 端 UI 设计师",
      period: "2017 — 2018",
      responsibilities: [
        "负责在线商城 C 端产品 UI 设计",
        "完成商品端到用户端的高保真页面设计输出",
        "参与商城核心页面视觉设计与界面优化，配合产品和开发推进上线落地",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="w-full">
        <div className="mb-16">
          <div>
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)]">
              工作经历
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative grid md:grid-cols-[clamp(160px,18%,260px)_1fr] gap-6 md:gap-10 lg:gap-16 border-t border-[#E6E7EB] pt-8 pb-8 hover:bg-[#F5F5F7]/60 transition-colors px-2 md:px-4 rounded-[24px]"
            >
              <div className="space-y-2">
                <div className="text-[16px] text-[#1A1C24]">{exp.company}</div>
                <div className="text-[14px] tracking-[0.18em] text-[#696D7A]">
                  {exp.period}
                </div>
                {exp.productName && (
                  <div className="text-[14px] text-[#4E525E]">{exp.productName}</div>
                )}
                <div className="text-[14px] text-[#696D7A]">{exp.role}</div>
              </div>

              <div>
                {exp.highlight && (
                  <div className="mb-5 rounded-[24px] border border-[#E6E7EB] bg-white p-4">
                    <div className="mb-1.5 text-[14px] text-[#696D7A]">
                      关键亮点
                    </div>
                    <p className="text-[16px] leading-relaxed text-[#4E525E]">{exp.highlight}</p>
                  </div>
                )}

                <ul className="space-y-2.5">
                  {exp.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[16px] text-[#4E525E]">
                      <span className="mt-2 size-1 rounded-full bg-[#CBCDD4] flex-shrink-0" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
