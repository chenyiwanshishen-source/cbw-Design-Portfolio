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
      placeholderColor: "#F5F5F7",
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
  const markers = [
    { color: "#E5EBFF", rotation: "-1.2deg", clipPath: "polygon(1% 16%, 18% 9%, 36% 14%, 54% 6%, 74% 13%, 99% 9%, 97% 89%, 78% 95%, 57% 90%, 38% 96%, 17% 90%, 2% 87%)" },
    { color: "#FFF6DB", rotation: "0.8deg", clipPath: "polygon(2% 10%, 22% 15%, 43% 7%, 63% 13%, 82% 6%, 98% 12%, 96% 91%, 77% 87%, 58% 95%, 36% 89%, 13% 94%, 1% 86%)" },
    { color: "#E3F4EA", rotation: "-0.7deg", clipPath: "polygon(1% 13%, 19% 6%, 40% 12%, 59% 5%, 80% 11%, 99% 8%, 98% 88%, 79% 95%, 60% 89%, 39% 96%, 18% 90%, 2% 86%)" },
    { color: "#F3E7FF", rotation: "1deg", clipPath: "polygon(2% 9%, 20% 14%, 41% 6%, 61% 12%, 81% 5%, 98% 10%, 96% 92%, 76% 88%, 56% 96%, 35% 90%, 12% 95%, 1% 87%)" },
  ];
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item, index) => {
        const marker = markers[index % markers.length];
        return (
          <span key={item} className="relative inline-flex whitespace-nowrap px-1 text-[14px] font-medium leading-[1.5] text-[#4E525E]">
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-[60%] origin-center" style={{ backgroundColor: marker.color, clipPath: marker.clipPath, transform: `rotate(${marker.rotation})` }} />
            <span className="relative z-10">{item}</span>
          </span>
        );
      })}
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

function PaperHoleStrip({ count }: { count: number }) {
  return <span className="experience-paper-hole-strip" aria-hidden="true">{Array.from({ length: count }, (_, hole) => <i key={hole} />)}</span>;
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative px-6 pb-12 pt-24 sm:px-10 md:pb-16 md:pt-28 lg:px-16 lg:pb-14 lg:pt-32 xl:px-24 2xl:px-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-10 md:mb-12">
          <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] tracking-tight text-[#1A1C24]">
            工作经历
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <motion.article
            {...cardMotion}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="experience-paper-sheet experience-paper-sheet-primary relative rounded-[28px] p-6 sm:p-8 lg:col-span-7 lg:p-10"
          >
            <PaperHoleStrip count={24} />
            <div className="relative flex flex-col">
              <div className="experience-identity-row flex items-start justify-between gap-4">
                <div className="experience-identity-note flex min-w-0 items-start gap-3 sm:gap-4">
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

              <p className="mt-7 text-[18px] leading-[1.8] text-[#363A45]">
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

                <p className="mt-5 text-[18px] leading-[1.75] text-[#4E525E]">
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

          <div className="grid self-start gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-6 lg:content-start">
            {supportingExperiences.map((experience, index) => (
              <motion.article
                key={experience.company}
                {...cardMotion}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`experience-paper-sheet ${index === 0 ? "experience-paper-sheet-secondary" : "experience-paper-sheet-tertiary"} flex flex-col p-6 sm:p-7 lg:p-8`}
              >
                <PaperHoleStrip count={index === 0 ? 16 : 15} />
                <div className="experience-identity-row flex items-start justify-between gap-4">
                  <div className={`experience-identity-note flex min-w-0 items-start gap-3 sm:gap-4 ${index === 1 ? "experience-identity-note-text-only" : ""}`}>
                    {index === 0 && <CompanyLogo {...experience.logo} />}
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

                <div className="pt-6">
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
