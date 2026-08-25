import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { preloadProjectDetailAssets } from "../projectPreload";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const focusAreas = ["AI 产品 0-1", "Prompt / Workflow", "复杂 B 端系统", "AI 设计工作流"];

const aboutProjects = [
  {
    id: "ai",
    title: "AI 报告生成",
    href: "#/project/ai-report",
    ariaLabel: "查看 AI 报告生成项目案例",
    tag: "AI 0-1 · 2025.04",
    tagColor: "#2258F4",
    tagBg: "#EEF2FF",
    tagBorder: "#C8D4FF",
    desc: "结合企业数据、外部资料与客户私有数据，面向企业/产业监测场景的 AI 分析报告生成平台。",
    responsibilities: ["核心交互与流程方案设计", "Prompt 基础结构与流式体验"],
    image: "./images/首页webp/AI报告生成.webp",
    rotation: "rotate-[-0.6deg]",
  },
  {
    id: "qixin",
    title: "启信产业大脑",
    href: "#/project/qixin-brain",
    ariaLabel: "查看启信产业大脑项目案例",
    tag: "B 端系统 · 2020~2026",
    tagColor: "#6366F1",
    tagBg: "#F5F3FF",
    tagBorder: "#DDD6FE",
    desc: "基于启信企业数据，面向产业服务与经济运行分析场景的垂直业务决策平台。",
    responsibilities: ["产业图谱与数据可视化方案", "业务全流程交互设计与规范"],
    image: "./images/首页webp/自定义产业链.webp",
    rotation: "rotate-[0.6deg]",
  },
] as const;

function PaperHoleStrip() {
  return (
    <span className="experience-paper-hole-strip" aria-hidden="true">
      {Array.from({ length: 22 }, (_, hole) => (
        <i key={hole} />
      ))}
    </span>
  );
}

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      if (!section || !cards) return;

      const projectItems = gsap.utils.toArray<HTMLElement>("[data-about-project-card]", cards);
      if (projectItems.length === 0) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(projectItems, {
          y: 40,
          autoAlpha: 0.6,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 35%",
            scrub: 0.18,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      aria-labelledby="about-intro-title"
      className="relative mx-auto w-full max-w-[1640px] px-6 pb-12 pt-14 sm:px-10 md:pb-16 md:pt-18 lg:px-12 lg:pt-24 xl:px-16"
    >
      <div className="grid w-full items-start gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24 xl:gap-32">
        {/* Left Column: Authentic Self-Introduction Paper Sheet */}
        <motion.article
          initial={{ opacity: 0, y: 24, rotate: 0.4 }}
          animate={{ opacity: 1, y: 0, rotate: 0.7 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="experience-paper-sheet experience-paper-sheet-secondary relative flex flex-col justify-between p-7 pl-14 sm:p-9 sm:pl-16 lg:p-10 lg:pl-18"
        >
          <PaperHoleStrip />

          <div>
            <div className="experience-identity-note experience-identity-note-text-only">
              <p className="text-[15px] font-medium tracking-[0.02em] text-[#363A45]">
                陈俊学 · 产品设计师 ｜ 郑州轻工业大学 · 工业设计
              </p>
            </div>

            <div className="mt-8 max-w-[72ch] text-[#363A45] sm:mt-9">
              <p className="text-[clamp(1.15rem,1.55vw,1.35rem)] font-medium leading-[1.75] text-[#1A1C24]">
                您好，我叫陈俊学。郑州轻工业大学工业设计专业毕业，做设计 9 年，上家公司主要做b端产品设计。
              </p>

              <div className="mt-6 space-y-4 text-[16px] leading-[1.85] text-[#4E525E] sm:text-[17px]">
                <p>我在上一家公司主要做了两个产品：</p>
                <div className="space-y-3 pl-1">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                    <p>
                      一个是 <strong className="font-semibold text-[#1A1C24]">启信产业大脑</strong>，从 2020 年一直维护迭代到我离职。它基于启信的企业数据，面向产业服务、经济运行这些垂直业务场景做的分析平台。
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#6366F1]" aria-hidden="true" />
                    <p>
                      另一个是 <strong className="font-semibold text-[#1A1C24]">AI 报告生成产品 Qsight</strong>，2025 年 4 月启动。结合企业数据、外部资料和客户私有数据，面向企业、产业、地区监测这些场景生成分析报告的 AI 平台。
                    </p>
                  </div>
                </div>

                <p className="pt-2">
                  在项目里，我主要和产品经理一起梳理业务目标、用户任务和信息架构；我的工作重点是把这些需求落到产品设计里，做成交互方案和界面设计，再配合研发推动落地。
                </p>

                <p className="pt-2">
                  最近我也在做个人的 AI 工具探索：解决大模型或前端生成页面之后的设计走查和局部修正问题。用多设备画布做预览和可视化编辑，减少设计师反复用提示词修改代码的成本。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#D9E1F5] pt-6">
            <p className="text-[13px] tracking-[0.12em] text-[#696D7A]">当前聚焦</p>
            <ul aria-label="当前聚焦方向" className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-[15px] text-[#4E525E]">
              {focusAreas.map((area, index) => (
                <li key={area} className="inline-flex items-center gap-3">
                  {index > 0 && <span className="size-1 rounded-full bg-[#A8BEFF]" aria-hidden="true" />}
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Right Column: Desktop Landing Slots where Hero's 2 project cards land on scroll */}
        <div
          data-about-card-target-container
          className="hidden lg:flex flex-col gap-6 sm:gap-7 justify-between pointer-events-none"
          style={{ minHeight: "560px" }}
        >
          <div
            data-about-target-ai
            className="w-full flex-1 rounded-[22px] min-h-[260px] opacity-0 -translate-x-3 xl:-translate-x-4"
          />
          <div
            data-about-target-qixin
            className="w-full flex-1 rounded-[22px] min-h-[260px] opacity-0 translate-x-3 xl:translate-x-4"
          />
        </div>

        {/* Mobile / Tablet Fallback (Hidden on Desktop) */}
        <div className="flex flex-col gap-6 sm:gap-7 justify-between lg:hidden">
          {aboutProjects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              aria-label={project.ariaLabel}
              onPointerEnter={() => void preloadProjectDetailAssets(project.id === "ai" ? "ai-report" : "qixin-brain", "high")}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-[#CDD7F0] bg-[#FCFDFF] p-5 shadow-[0_12px_32px_rgba(48,65,113,0.08)] sm:p-6 ${project.rotation}`}
            >
              <div className="flex items-center justify-between border-b border-[#E6EBF5] pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
                  <span className="size-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
                  <span className="size-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3.5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[20px] sm:text-[21px] font-bold tracking-tight text-[#1A1C24]">
                      {project.title}
                    </h3>
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#EEF2FF] text-[#2258F4]">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#4E525E]">
                    {project.desc}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {project.responsibilities.map((resp) => (
                      <span
                        key={resp}
                        className="rounded-md bg-[#F2F5FB] px-2.5 py-1 text-[12px] text-[#5A6376]"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 overflow-hidden rounded-[12px] border border-[#E1E6F2] bg-[#F7F9FF]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-28 sm:h-32 w-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
