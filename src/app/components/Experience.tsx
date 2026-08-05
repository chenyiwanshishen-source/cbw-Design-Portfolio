import { motion } from "motion/react";

const primaryExperience = {
  company: "上海合合信息科技股份有限公司",
  logo: {
    src: "./images/company-logos/hehe-information.png",
    alt: "合合信息 Logo",
  },
  productName: "启信宝 / 启信产业大脑",
  role: "产品设计师",
  period: "2020 — 2026.05",
  summary:
    "围绕企业数据与产业决策场景，负责从需求拆解、业务理解到产品方案、开发跟进及上线验收，持续推动复杂 B 端产品落地。",
  highlights: [
    "前期负责启信宝 B 端客户端，参与核心业务页面的方案设计与落地",
    "后期聚焦启信产业大脑，覆盖地区招商、产业分析与产业链监测等场景",
    "围绕产业集聚、企业迁移监控与区域产业优劣势分析，完成信息架构和功能方案设计",
  ],
  skills: ["复杂业务系统", "设计系统", "信息架构", "跨团队落地"],
  project: {
    title: "AI 产业 / 企业分析报告生成",
    meta: "2025.04 — 2026.05 · 公司内部创新项目",
    summary:
      "基于 AI Agent 融合企业、产业与新闻舆情数据，结合用户模板自动生成产业及企业分析报告。",
    highlights: [
      "梳理用户需求、报告结构与产品流程，设计业务页面和结果展示方式",
      "主导提示词基础框架与标准化结构，提升生成稳定性与团队协作效率",
      "推动 1.0 版本完成设计、开发跟进与上线验收",
    ],
    skills: ["AI Agent", "Prompt 框架", "生成稳定性"],
  },
};

const supportingExperiences = [
  {
    company: "上海驻云信息科技有限公司",
    logo: {
      src: "./images/company-logos/shanghai-zhuyun.png",
      alt: "上海驻云 Logo",
    },
    role: "B 端 UI 设计师",
    period: "2018 — 2020",
    summary:
      "负责复杂信息可视化与业务系统页面设计，参与从需求理解、页面结构到高保真交付和上线落地的完整流程。",
    highlights: [
      "参与电商产品运营后台及核心功能模块设计",
      "在部分项目中承担项目管理职责，协助推进需求沟通与项目上线",
    ],
    skills: ["B 端系统", "数据可视化", "高保真交付"],
  },
  {
    company: "鸿惠信息技术有限公司",
    logo: {
      alt: "鸿惠信息 Logo 占位",
      placeholderColor: "#CBCDD4",
    },
    role: "C 端 UI 设计师",
    period: "2017 — 2018",
    summary:
      "负责在线商城 C 端产品设计，完成商品端到用户端的高保真页面输出，并配合产品和开发推进上线。",
    highlights: [
      "参与商城核心页面的视觉设计与界面优化",
      "配合产品与开发完成设计还原和上线落地",
    ],
    skills: ["C 端商城", "视觉设计"],
  },
];

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
};

function SkillTags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#E6E7EB] bg-[#F5F5F7] px-3 py-1.5 text-[14px] leading-none text-[#5E626E]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={compact ? "space-y-2.5" : "space-y-3"}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[16px] text-[#4E525E]"
        >
          <span className="mt-[0.68em] size-1.5 flex-none rounded-full bg-[#2258F4]" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CompanyLogo({
  src,
  alt,
  placeholderColor,
}: {
  src?: string;
  alt: string;
  placeholderColor?: string;
}) {
  return (
    <div
      className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#E6E7EB] bg-white p-2 shadow-[0_1px_2px_rgba(26,28,36,0.04)] sm:size-14"
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          aria-label={alt}
          className="size-full rounded-[9px]"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
    </div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 py-24 sm:px-10 md:py-32 lg:px-16 xl:px-24 2xl:px-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] tracking-tight text-[#1A1C24]">
            工作经历
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <motion.article
            {...cardMotion}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-[#E6E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(26,28,36,0.04)] sm:p-8 lg:col-span-7 lg:p-10"
          >
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <CompanyLogo {...primaryExperience.logo} />
                  <div className="min-w-0">
                    <h3 className="text-[24px] leading-[1.25] text-[#1A1C24]">
                      {primaryExperience.company}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#4E525E]">
                      {primaryExperience.productName} · {primaryExperience.role}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pt-1 text-right text-[12px] tracking-[0.14em] text-[#696D7A] sm:text-[13px]">
                  {primaryExperience.period}
                </div>
              </div>

              <p className="mt-7 max-w-[68ch] text-[18px] leading-[1.8] text-[#363A45]">
                {primaryExperience.summary}
              </p>

              <div className="mt-6">
                <BulletList items={primaryExperience.highlights} />
              </div>

              <div className="mt-7">
                <SkillTags items={primaryExperience.skills} />
              </div>

              <div className="mt-9 border-t border-[#D9E1F5] pt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h4 className="text-[20px] font-semibold leading-snug text-[#1A1C24]">
                    {primaryExperience.project.title}
                  </h4>
                  <div className="shrink-0 text-[12px] leading-relaxed text-[#696D7A]">
                    {primaryExperience.project.meta}
                  </div>
                </div>

                <p className="mt-5 max-w-[68ch] text-[18px] leading-[1.75] text-[#4E525E]">
                  {primaryExperience.project.summary}
                </p>

                <div className="mt-5">
                  <BulletList items={primaryExperience.project.highlights} compact />
                </div>

                <div className="mt-6">
                  <SkillTags items={primaryExperience.project.skills} />
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
            {supportingExperiences.map((experience, index) => (
              <motion.article
                key={experience.company}
                {...cardMotion}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-full flex-col rounded-[28px] border border-[#E6E7EB] bg-[#FCFCFD] p-6 shadow-[0_8px_30px_rgba(26,28,36,0.04)] sm:p-7 lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <CompanyLogo {...experience.logo} />
                    <div className="min-w-0">
                      <h3 className="text-[20px] leading-snug text-[#1A1C24]">
                        {experience.company}
                      </h3>
                      <p className="mt-2 text-[14px] text-[#696D7A]">{experience.role}</p>
                    </div>
                  </div>
                  <div className="shrink-0 pt-1 text-right text-[12px] tracking-[0.14em] text-[#696D7A]">
                    {experience.period}
                  </div>
                </div>

                <p className="mt-6 text-[18px] leading-[1.75] text-[#4E525E]">
                  {experience.summary}
                </p>

                <div className="mt-5">
                  <BulletList items={experience.highlights} compact />
                </div>

                <div className="mt-auto pt-6">
                  <SkillTags items={experience.skills} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
