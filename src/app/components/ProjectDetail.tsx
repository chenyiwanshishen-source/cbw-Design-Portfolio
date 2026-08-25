import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Layers,
  Link2,
  GitBranch,
  ShieldCheck,
  FileText,
  Database,
  Settings2,
  History,
  Users,
  CheckCircle2,
  Compass,
  ListChecks,
  PenLine,
  Search,
  Wrench,
  CircleX,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Footer } from "./Footer";
import { ProjectCaseNav } from "./ProjectCaseNav";
import { ResearchPaperCanvas } from "./ResearchPaperCanvas";
import { hideContactDetails } from "../buildVariant";
import promptCompilerSystemSource from "../../assets/ai-report/prompt-compiler-system-v2.txt?raw";
import finalReportAgentPromptSource from "../../assets/ai-report/final-report-agent-prompt.md?raw";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const promptCompilerSystemLines = promptCompilerSystemSource
  .replace(/\r\n?/g, "\n")
  .trim()
  .split("\n");

const finalReportAgentPromptLines = finalReportAgentPromptSource
  .replace(/\r\n?/g, "\n")
  .trim()
  .split("\n");

interface Props {
  onBack: () => void;
}

const BLUE = "#2258F4";
const ICON_BLUE = "#1A42B8";
const ICON_BG = "#E5EBFF";
const ICON_BORDER = "#85A3FF";
const ICON_GRAY = "#CBCDD4";
const INK = "#1A1C24";
const INK_MUTED = "#696D7A";
const INK_DIM = "#4E525E";
const LINE = "#E6E7EB";
const SURFACE = "#FFFFFF";
const SURFACE_2 = "#F5F5F7";
const SECTION_PAD = "px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32";
// Readable container for body copy / supporting cards inside full-bleed sections
const READ = "max-w-[1400px] mx-auto";
const PROSE = "max-w-[68ch]";
const DETAIL_IMAGE_LAZY_PROPS = {
  loading: "lazy" as const,
  decoding: "async" as const,
  fetchpriority: "low" as const,
};
const DETAIL_IMAGE_EAGER_PROPS = {
  loading: "eager" as const,
  decoding: "async" as const,
  fetchpriority: "high" as const,
};

// Typography tokens — strict hierarchy, no clamp
const T = {
  h1: { fontSize: "clamp(34px, 4.6vw, 48px)", lineHeight: 1.18, fontWeight: 700 },
  heroSub: { fontSize: "clamp(16px, 1.6vw, 18px)", lineHeight: 1.65, fontWeight: 400, color: INK_MUTED },
  h2: { fontSize: "clamp(26px, 3vw, 32px)", lineHeight: 1.25, fontWeight: 700 },
  h2Sub: { fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, fontWeight: 400, color: INK_MUTED },
  // body — strict 16px on desktop, never below 15px
  body: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.75, fontWeight: 400, color: INK_MUTED },
  bodyMuted: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.7, fontWeight: 400, color: INK_DIM },
  cardTitle: { fontSize: "24px", lineHeight: 1.35, fontWeight: 600, color: INK },
  cardDesc: { fontSize: "16px", lineHeight: 1.6, fontWeight: 400, color: INK_MUTED },
  // labels / badges — unified 12px
  label: { fontSize: "12px", lineHeight: 1.3, fontWeight: 600, letterSpacing: "0.06em" },
  metaLabel: { fontSize: "13px", lineHeight: 1.3, fontWeight: 500, letterSpacing: "0.06em", color: INK_DIM },
  metaValue: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.55, fontWeight: 500, color: INK },
  nav: { fontSize: "clamp(13px, 1.2vw, 14px)", lineHeight: 1.4, fontWeight: 500 },
  // eyebrow inside diagrams (small caps style)
  eyebrow: { fontSize: "13px", lineHeight: 1.3, fontWeight: 500, letterSpacing: "0.16em" },
};

function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  const hasSubtitle = subtitle.trim().length > 0;
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <h2
        className={`tracking-tight text-neutral-900 ${hasSubtitle ? "mb-4" : "mb-0"} ${center ? "max-w-4xl" : "max-w-4xl"}`}
        style={T.h2}
      >
        {title}
      </h2>
      {hasSubtitle && (
        <p className={`${center ? "max-w-3xl" : "max-w-3xl"}`} style={T.h2Sub}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function IconBadge({ Icon }: { Icon: any }) {
  return (
    <span
      className="inline-flex size-4 shrink-0 items-center justify-center"
      style={{
        color: ICON_GRAY,
      }}
    >
      <Icon className="size-4" />
    </span>
  );
}

const bodyText = T.body;
const mutedBody = T.bodyMuted;

const cardBase =
  "rounded-2xl border bg-white hover:bg-neutral-50 shadow-[0_1px_2px_rgba(15,20,25,0.04)] transition-colors";
const cardBorder = { borderColor: LINE };
const highlightTop = (
  <div
    className="pointer-events-none absolute inset-x-0 top-0 h-px"
    style={{ background: `linear-gradient(90deg, transparent, ${ICON_BLUE}, transparent)` }}
  />
);

// Decorative full-bleed accent strip
function BlueAccentBlob({ side = "right" }: { side?: "right" | "left" }) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
        side === "right" ? "-right-40" : "-left-40"
      } size-[560px] rounded-full blur-[160px] opacity-20`}
      style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }}
    />
  );
}

function FourDimensionLoopOverview() {
  return (
    <div className="mb-10 mt-12 flex justify-center px-4 py-4 md:mt-24">
      <div
        data-four-dimension-summary-note="true"
        className="relative flex h-[132px] w-[200px] rotate-[-0.35deg] items-center justify-center rounded-[6px] border px-4 py-5 text-center text-[14px] font-semibold leading-[1.6] text-[#35404F] shadow-[0_2px_3px_rgba(28,36,52,0.16),0_7px_14px_rgba(28,36,52,0.055)] sm:h-[118px] sm:w-[280px] sm:px-5 sm:text-[16px] md:h-[136px] md:w-[330px] md:px-6 md:py-6 md:text-[20px]"
        style={{
          background: "repeating-linear-gradient(to bottom, #EEF2FF 0, #EEF2FF 31px, #D8E1FF 32px, #D8E1FF 33px)",
          borderColor: "#C8D4FF",
        }}
      >
        <span aria-hidden="true" className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: INK_DIM, boxShadow: "0 2px 4px rgba(78,82,94,0.22)" }} />
        这些问题不能被孤立地当成 Prompt 问题，需要从四个方向分析。
      </div>
    </div>
  );
}

function MarkerHighlight({ children }: { children: ReactNode }) {
  return (
    <mark
      className="rounded-[2px] bg-transparent px-1 font-semibold text-[#35404F]"
      style={{
        backgroundImage: "linear-gradient(177deg, transparent 34%, rgba(105,109,122,0.24) 34%, rgba(105,109,122,0.24) 84%, transparent 84%)",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}

function ReflectionMarker({ children }: { children: ReactNode }) {
  return (
    <mark className="ai-report-marker-highlight bg-transparent font-semibold text-[#252B36]">
      {children}
    </mark>
  );
}

function QualityMarker({ children, tone }: { children: ReactNode; tone: "blue" | "orange" | "green" }) {
  const markerColor = {
    blue: "rgba(142,170,255,0.46)",
    orange: "rgba(246,185,119,0.52)",
    green: "rgba(144,207,160,0.50)",
  }[tone];

  return (
    <mark
      className="whitespace-nowrap rounded-[2px] bg-transparent px-0.5 text-inherit"
      style={{
        backgroundImage: `linear-gradient(176deg, transparent 36%, ${markerColor} 36%, ${markerColor} 86%, transparent 86%)`,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}

function PromptConsoleHistoryNote() {
  return (
    <a
      href="./report-agent-page.html"
      target="_blank"
      rel="noreferrer"
      data-prompt-console-history-note="true"
      aria-label="点击查看之前规划的 Prompt 控制台原型"
      className="prompt-console-history-note group self-start px-6 pb-7 pt-9 focus-visible:outline-none md:col-start-2 md:row-start-2 sm:px-7 sm:pb-8 sm:pt-10"
    >
      <span className="relative z-10 flex items-start justify-between gap-5">
        <span className="min-w-0 flex-1">
          <span className="block text-[18px] font-medium leading-[1.45] text-[#4E5668]">
            点击查看
          </span>
          <span className="mt-1 block text-[20px] font-semibold leading-[1.45] text-[#20242D]">
            之前规划的 Prompt 控制台原型
          </span>
        </span>
        <span
          aria-hidden="true"
          className="prompt-console-history-note-arrow mt-7 grid size-11 shrink-0 place-items-center border border-[#B9C9F5] bg-[#F8FAFF] text-[#2258F4]"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none">
            <path d="M4.2 12.1C8.2 11.9 13.1 12.3 18.5 11.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M13.8 7.2C15.4 8.7 17.1 10.4 18.7 12C17.2 13.6 15.7 15.3 13.8 16.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.6 12.9C8.7 12.7 12.9 12.9 17.8 12.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.28" />
          </svg>
        </span>
      </span>
      <span className="relative z-10 mt-6 block text-[16px] leading-[1.75] text-[#4E5668]">
        之前做的 10+1 模块配置框架的设计，但是现在模型能力上来后可能不需要这么重了。
      </span>
    </a>
  );
}

function ProjectOutcomeMetrics() {
  const metrics = [
    {
      title: "全流程交付周期",
      before: "2~3 天",
      after: "20 分钟",
      change: "90%",
      direction: "down",
      bg: "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
      borderColor: "#DED9CE",
      pinColor: "#4A78C2",
      rotation: "rotate-[-0.7deg]",
    },
    {
      title: "纯内容生成耗时",
      before: "6~8 小时",
      after: "约 5~30 分钟",
      change: "92%",
      direction: "down",
      bg: "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
      borderColor: "#DED9CE",
      pinColor: "#A85A16",
      rotation: "rotate-[0.6deg]",
    },
    {
      title: "资料准备与清洗",
      before: "半天以上",
      after: "约 5~20 分钟",
      change: "92%",
      direction: "down",
      bg: "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
      borderColor: "#DED9CE",
      pinColor: "#2F7A44",
      rotation: "rotate-[-0.5deg]",
    },
    {
      title: "关键事实溯源率",
      before: "约 50%",
      after: "80%",
      change: "30%",
      direction: "up",
      bg: "repeating-linear-gradient(to bottom, #EEF2FF 0, #EEF2FF 34px, #D8E1FF 35px, #D8E1FF 36px)",
      borderColor: "#C8D4FF",
      pinColor: "#2258F4",
      rotation: "rotate-[0.7deg]",
    },
  ];

  return (
    <div
      data-project-outcome-metrics="true"
      aria-label="项目成果指标"
      className="mx-auto w-full max-w-[1400px]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className={`relative flex min-h-[118px] flex-col items-stretch justify-center rounded-[8px] border px-4 py-3.5 shadow-[0_6px_20px_rgba(56,67,92,0.07)] sm:px-5 sm:py-4 xl:px-4 2xl:px-5 ${metric.rotation} transition-transform duration-200 hover:rotate-0 hover:z-20 hover:-translate-y-1`}
            style={{
              background: metric.bg,
              borderColor: metric.borderColor,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
              style={{ backgroundColor: metric.pinColor }}
            />

            <div className="min-w-0 flex flex-col justify-center">
              <div className="whitespace-nowrap text-[16px] font-semibold tracking-tight text-[#6C7584]">
                {metric.title}
              </div>

              <div className="mt-1.5 flex min-w-0 items-baseline gap-1 whitespace-nowrap xl:gap-0.5 2xl:gap-1.5">
                <span className="whitespace-nowrap text-[15px] text-[#858C9B] xl:text-[13px] 2xl:text-[16px]">
                  {metric.before}
                </span>
                <span className="shrink-0 text-[15px] font-bold text-[#2258F4] xl:text-[13px] 2xl:text-[16px]">→</span>
                <span className="whitespace-nowrap text-[16px] font-bold text-[#1A1C24] xl:text-[14px] 2xl:text-[17px]">
                  {metric.after}
                </span>
                <span
                  className="ml-auto inline-flex shrink-0 items-baseline gap-0.5 whitespace-nowrap xl:ml-0 2xl:ml-auto"
                  style={{
                    color: metric.direction === "down" ? "#2F7A44" : "#2258F4",
                  }}
                >
                  <span className="text-[14px] font-bold leading-none xl:text-[13px] 2xl:text-[16px]">
                    {metric.direction === "down" ? "↓" : "↑"}
                  </span>
                  <span className="text-[24px] font-extrabold leading-none tracking-tight xl:text-[22px] 2xl:text-[26px]">
                    {metric.change}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptCompilerValueReflection() {
  const reflections = [
    {
      id: "team",
      title: "团队价值",
      paperVariant: "experience-paper-sheet-primary",
      gridPlacement: "md:col-start-1 md:row-start-1",
      paragraphs: [
        <>
          团队成员只需输入业务诉求与关注对象，即可
          <ReflectionMarker>按统一架构快速装配提示词</ReflectionMarker>。
        </>,
        <>
          将 Prompt 从个人经验，转化为
          <ReflectionMarker>团队可维护、可校验的标准配置资产</ReflectionMarker>，显著降低协作与迭代成本。
        </>,
      ],
    },
    {
      id: "personal",
      title: "个人价值",
      paperVariant: "experience-paper-sheet-secondary",
      gridPlacement: "md:col-start-2 md:row-start-1",
      paragraphs: [
        <>
          在搭建和调试过程中，
          <ReflectionMarker>建立了对模型能力边界的工作级认知</ReflectionMarker>。
        </>,
        <>
          明确
          <ReflectionMarker>哪些体验必须由系统做“硬约束”，哪些表达可以放手交给模型自主推理</ReflectionMarker>。
        </>,
      ],
    },
    {
      id: "insight",
      title: "工作洞察",
      paperVariant: "experience-paper-sheet-tertiary",
      gridPlacement: "md:col-start-3 md:row-start-1",
      paragraphs: [
        <>
          最初曾试想过将我的提示词模板做成通用 Skill，但在实战中发现：随着模型能力提升，
          <ReflectionMarker>需要写死的规则反而在减少</ReflectionMarker>。
        </>,
        <>
          <ReflectionMarker>架构的价值不是堆砌规则，而在于建立可持续维护的秩序</ReflectionMarker>。
        </>,
      ],
    },
  ];

  return (
    <section
      data-prompt-value-reflection="true"
      aria-labelledby="prompt-value-reflection-title"
      className="mb-20 pt-10 md:pt-16"
    >
      <div className="mb-8 text-left md:mb-10">
        <h3
          id="prompt-value-reflection-title"
          className="tracking-tight text-neutral-900"
          style={T.h2}
        >
          成果、价值与反思
        </h3>
      </div>

      <div className="mb-12 md:mb-16">
        <ProjectOutcomeMetrics />
      </div>

      <div className="grid gap-7 px-2 md:grid-cols-3 md:px-0">
        {reflections.map((reflection, index) => (
          <Fragment key={reflection.id}>
            <article
              data-prompt-value-note={reflection.id}
              aria-labelledby={`prompt-value-note-${reflection.id}`}
              className={`experience-paper-sheet ${reflection.paperVariant} ${reflection.gridPlacement} relative min-h-[320px] overflow-hidden pb-8 pl-16 pr-6 pt-10 sm:min-h-[300px] sm:pl-[72px] sm:pr-7 sm:pt-11`}
            >
              <PromptSourcePaperHoles count={index === 0 ? 14 : 13} />
              <div className="relative z-10">
                <div className="experience-identity-note experience-identity-note-text-only">
                  <h4 id={`prompt-value-note-${reflection.id}`} className="text-[18px] font-semibold leading-[1.4] text-[#1A1C24]">
                    {reflection.title}
                  </h4>
                </div>
                <div className="mt-7 space-y-4 text-[16px] leading-[1.8] text-[#4E525E]">
                  {reflection.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${reflection.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
            {reflection.id === "personal" ? <PromptConsoleHistoryNote /> : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function ReportAgentExecutionChainSticker() {
  return (
    <figure
      data-report-agent-execution-chain="true"
      aria-labelledby="report-agent-execution-chain-caption"
      className="pointer-events-none absolute left-1/2 top-[56px] z-30 w-[88%] max-w-[950px] -translate-x-1/2 -rotate-[0.7deg] sm:w-[82%] lg:w-[72%]"
    >
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <filter id="s05-report-agent-sticker-filter" x="-25%" y="-40%" width="150%" height="190%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="expanded" />
            <feFlood floodColor="#FFFEFB" result="stickerColor" />
            <feComposite in="stickerColor" in2="expanded" operator="in" result="stickerEdge" />
            <feGaussianBlur in="expanded" stdDeviation="1.8" result="softBlur" />
            <feOffset in="softBlur" dy="2.5" result="offsetBlur" />
            <feFlood floodColor="#687080" floodOpacity="0.14" result="shadowColor" />
            <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="stickerShadow" />
            <feMerge>
              <feMergeNode in="stickerShadow" />
              <feMergeNode in="stickerEdge" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="relative" style={{ filter: "url(#s05-report-agent-sticker-filter)" }}>
        <img
          src="./images/章节提示词/line-01.svg"
          alt="Agent 报告生成工作流，章节生成 Agent 节点高亮"
          {...DETAIL_IMAGE_LAZY_PROPS}
          className="block h-auto w-full"
          draggable={false}
        />
      </div>

      <figcaption
        id="report-agent-execution-chain-caption"
        className="skills-sticky-note skills-note-0 right-[5%] top-[-42px] z-20 w-fit whitespace-nowrap px-4 py-2 text-[12px] font-semibold text-[#35404F] sm:text-[14px]"
        style={{ position: "absolute" }}
      >
        我的 Prompt 运行在「章节生成 Agent」环节
      </figcaption>
    </figure>
  );
}

function FourDimensionDecisionNotes() {
  const notes = [
    {
      title: "用户维度",
      rotate: "rotate-[-0.35deg]",
      needLabel: "用户诉求",
      needDetail: "研报真实性与准确性要求极高。",
      needPlacement: { left: "clamp(12px, 4%, 24px)", bottom: "-49px", width: "calc(100% - 30px)", rotate: "-1.7deg" },
      points: [
        {
          category: "取舍",
          title: "正文逐段绑定信源",
          detail: "不把信任交给文末免责声明或集中来源列表，改为让来源与正文内容就近绑定。",
        },
        {
          category: "规划",
          title: "支持用户自定义写作样本",
          detail: "本期先固化 Few-Shot 标准样本，下一阶段规划用户自定义样本库与在线编辑。",
        },
      ],
    },
    {
      title: "产品维度",
      rotate: "rotate-[0.3deg]",
      needLabel: "产品阶段",
      needDetail: "处于 1.0 MVP，研发资源有限，暂不支持可视化参数配置。",
      needPlacement: { left: "clamp(28px, 8%, 40px)", bottom: "-56px", width: "calc(100% - 42px)", rotate: "0.9deg" },
      points: [
        {
          category: "取舍",
          title: "Prompt 拆分为四个可维护的模块",
          detail: "MVP 不提前搭建配置后台，先拆为任务定义、工具编排、质量门禁、容错兜底 4 个模块。",
        },
        {
          category: "价值",
          title: "降低后续配置化重构成本",
          detail: "预留配置映射边界，未来可将 4 个模块转化为后台可配置选项，部分可开放给用户进行维护。",
        },
      ],
    },
    {
      title: "研发维度",
      rotate: "rotate-[0.25deg]",
      needLabel: "研发现状",
      needDetail: "Agent 框架刚搭建，需要大家一起参与调优。",
      needPlacement: { left: "clamp(22px, 7%, 34px)", bottom: "-48px", width: "calc(100% - 38px)", rotate: "1.3deg" },
      points: [
        {
          category: "取舍",
          title: "Prompt 阶段管线提示词设计",
          detail: "放弃 Agent 自由编排流程，改为与执行步骤一一对应，使各个步骤都可追溯。",
        },
        {
          category: "规则",
          title: "增加异常状态校验和兜底环节",
          detail: "关键阶段未通过校验时进入重试或兜底，避免错误继续向下游传递。",
        },
      ],
    },
    {
      title: "模型维度",
      rotate: "rotate-[-0.3deg]",
      needLabel: "模型选择",
      needDetail: "高阶模型可能掩盖 Prompt 的结构问题，同时增加调试成本。",
      needPlacement: { left: "clamp(14px, 5%, 28px)", bottom: "-58px", width: "calc(100% - 32px)", rotate: "-0.8deg" },
      points: [
        {
          category: "取舍",
          title: "弱模型验证规则下限",
          detail: "不先用强模型掩盖规则漏洞，优先以低能力模型验证结构下限。",
        },
        {
          category: "价值",
          title: "降低生产模型迁移风险",
          detail: "在目标生产模型上对比通过率、重试率、来源覆盖率和成本，为多模型迁移提供验证依据。",
        },
      ],
    },
  ];

  return (
    <section
      data-four-dimension-decision-notes="true"
      aria-label="四维策略展开"
      className="mx-auto mb-24 mt-12 grid max-w-[1160px] grid-cols-1 gap-x-16 gap-y-24 sm:grid-cols-2"
    >
      {notes.map((note) => (
        <article
          key={note.title}
          data-decision-note="true"
          className={`relative min-h-[300px] ${note.rotate} rounded-[5px] border px-6 py-7 shadow-[0_2px_3px_rgba(28,36,52,0.16),0_7px_14px_rgba(28,36,52,0.055)] sm:min-h-[320px] sm:px-7`}
          style={{
            background: "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
            borderColor: "#DED9CE",
          }}
        >
          <span
            className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: "#4A78C2",
              boxShadow: "0 2px 4px rgba(34,61,109,0.22)",
            }}
          />
          <h3 className="text-[20px] font-semibold leading-tight text-[#35404F]">{note.title}</h3>
          <div className="mt-5 space-y-5">
            {note.points.map((point) => (
              <div key={point.title} className="grid grid-cols-[42px_minmax(0,1fr)] gap-x-2">
                <span className="mt-[2px] inline-flex h-5 items-center justify-center rounded-[2px] border bg-[#F3F1E9] px-1 text-[12px] font-semibold tracking-[0.08em] text-[#696D7A]" style={{ borderColor: "#D6D2C7" }}>
                  {point.category}
                </span>
                <h4 className="text-[16px] leading-[1.55]">
                  <MarkerHighlight>{point.title}</MarkerHighlight>
                </h4>
                <span aria-hidden="true" />
                <p className="mt-1.5 text-[15px] leading-[1.7] text-[#696D7A]">{point.detail}</p>
              </div>
            ))}
          </div>
          <aside
            data-dimension-need-note={note.title}
            className="experience-identity-note z-20"
            style={{
              position: "absolute",
              zIndex: 20,
              left: note.needPlacement.left,
              bottom: note.needPlacement.bottom,
              width: note.needPlacement.width,
              maxWidth: "none",
              rotate: note.needPlacement.rotate,
            }}
          >
            <div className="text-[16px] font-semibold leading-[1.45] text-[#1A1C24]">{note.needLabel}</div>
            <p className="mt-2 text-[15px] leading-[1.65] text-[#4E525E]">{note.needDetail}</p>
          </aside>
        </article>
      ))}
    </section>
  );
}

function PromptPipelineMarker({ children }: { children: ReactNode }) {
  return (
    <mark
      className="rounded-[2px] bg-transparent px-0.5 font-semibold text-inherit"
      style={{
        backgroundImage: "linear-gradient(176deg, transparent 30%, rgba(255,211,92,0.62) 30%, rgba(255,211,92,0.62) 86%, transparent 86%)",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}

function PromptPipelineConnector({ index }: { index: number }) {
  return (
    <div
      data-prompt-pipeline-connector={String(index).padStart(2, "0")}
      data-prompt-pipeline-static-connector="true"
      aria-hidden="true"
      className="relative hidden h-16 min-w-0 items-center lg:flex"
    >
      <svg className="h-14 w-full overflow-visible" viewBox="0 0 200 48" preserveAspectRatio="none" fill="none">
        <path
          d="M6 24 C58 12 140 36 194 24"
          stroke="#D8E4FF"
          strokeWidth="10"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M6 26 C60 14 138 34 194 23"
          stroke="#86A2EB"
          strokeWidth="1.2"
          strokeDasharray="3 7"
          strokeLinecap="round"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M6 24 C58 12 140 36 194 24"
          stroke="#2258F4"
          strokeWidth="2.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        data-prompt-pipeline-terminal="start"
        className="absolute left-0 top-1/2 size-2.5 -translate-y-1/2 border-2 border-[#2258F4] bg-[#FFFEF7]"
        style={{ borderRadius: "48% 52% 45% 55% / 53% 47% 54% 46%" }}
      />
      <span
        data-prompt-pipeline-terminal="end"
        className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 border-2 border-[#2258F4] bg-[#FFFEF7]"
        style={{ borderRadius: "53% 47% 51% 49% / 46% 54% 48% 52%" }}
      />
    </div>
  );
}

function PromptSourcePaperHoles({ count = 20 }: { count?: number }) {
  return (
    <span className="experience-paper-hole-strip" aria-hidden="true">
      {Array.from({ length: count }, (_, hole) => (
        <i key={hole} />
      ))}
    </span>
  );
}

function RequirementPromptSource() {
  return (
    <article
      data-prompt-source-scroll="01"
      tabIndex={0}
      aria-label="重点企业监测报告章节智能体提示词需求全文"
      className="absolute inset-0 overflow-y-auto overscroll-contain pb-12 pl-16 pr-7 pt-12 text-[16px] leading-[1.75] text-[#35404F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4777FF]"
    >
      <h2 className="text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-[#1A1C24]">
        重点企业监测报告章节智能体提示词需求
      </h2>

      <section className="mt-8">
        <h3 className="text-[20px] font-bold leading-[1.5] text-[#1A1C24]">1. 任务目标</h3>
        <p className="mt-3 text-[16px] leading-[1.75]">你帮我生成一份关于重点企业监测报告章节智能体的提示词。</p>
      </section>

      <section className="mt-8">
        <h3 className="text-[20px] font-bold leading-[1.5] text-[#1A1C24]">2. 数据注入与解析原则</h3>
        <div className="mt-3 space-y-4 text-[16px] leading-[1.75]">
          <p>优先级原则：用户输入的需求要求大于系统提示词。当两者冲突时，严格按照用户要求执行。解析上游数据中的分析目标、分析类别、分析时间</p>
          <p>这份提示词中约束用到的工具是我们本地的 MCP 工具，名称为：key_ent_monitor、all_ent_monitor、big_document_process 以及兜底工具 deep_search。</p>
          <p>使用原则：</p>
          <p>并行联合检索：不设任何前置前提，必须同时、无条件调用 key_ent_monitor 查询企业相关数据、all_ent_monitor 查询地区参数数据，以及 deep_search 进行全量深度检索，保证一次性获取最广泛的初始信源。</p>
          <p>将上述三个请求获得的所有数据统一传入 big_document_process 进行数据整理。注意：严禁在该环节输出任何逻辑总结段落、统计表格或可视化图表，仅允许生成并返回纯净的结构化事实数据。</p>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-[20px] font-bold leading-[1.5] text-[#1A1C24]">3. 数据分类与清洗</h3>
        <p className="mt-3 text-[16px] leading-[1.75]">最终结构化数据要经过智能体的清洗，将所有的数据分三个大类：</p>
        <div className="mt-3 space-y-1 text-[16px] leading-[1.75]">
          <p>一、获得融资、业务拓展、新品发布类</p>
          <p>二、榜单类</p>
          <p>三、获奖、获得荣誉类</p>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-[20px] font-bold leading-[1.5] text-[#1A1C24]">4. 输出格式规范</h3>
        <p className="mt-3 text-[16px] leading-[1.75]">
          三层分类（作为各部分总起）+ 并在各分类下方罗列对应企业的具体简报。 简报格式规范： 强制层级：中文序号一、分类名称，二、分类名称，三、分类名称，大类名称为总起，下方为各分类下对应的企业简报，严禁混叠或跳过层级。 独特性：数据需进行全局去重，确保每个企业简报展示的是唯一且最准确的信源。 企业简报样式为：（数字序号）+ 企业标题 + 文章的精炼内容 + 数据来源的 URL。 严格逻辑：严禁变成单章节的分析报告，要严格遵循“一、分类”、“二、分类”、“三、分类”并伴随“分类 + 企业”的输出逻辑。 严禁将任务转化为单章节分析报告模型。严禁在每一条企业简报下方、每一级分类章节末尾以及全文终点处，出现汇总性结论、统计图表（Chart）、数据表格（Table）或参考文献。保持纯净的“分类 + 简报”纯文本结构。
        </p>
      </section>
    </article>
  );
}

function PromptCompilerSystemSource() {
  return (
    <article
      data-prompt-source-scroll="02"
      tabIndex={0}
      aria-label="全场景Prompt Compiler智能体系统提示词全文"
      className="absolute inset-0 overflow-y-auto overscroll-contain pb-12 pl-16 pr-7 pt-12 text-[16px] leading-[1.75] text-[#35404F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4777FF]"
    >
      {promptCompilerSystemLines.map((sourceLine, index) => {
        const line = sourceLine.trim();
        const isDocumentTitle = index === 0;
        const isPrimaryHeading = /^M\d{2} ·/.test(line) || line === "最终执行指令";
        const isSecondaryHeading = line.endsWith("：") && line.length <= 28;

        if (isDocumentTitle) {
          return (
            <h2 key={`${index}-${line}`} className="text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-[#1A1C24]">
              {line}
            </h2>
          );
        }

        if (!line) {
          return <span key={`space-${index}`} aria-hidden="true" className="block h-3" />;
        }

        if (isPrimaryHeading) {
          return (
            <h3 key={`${index}-${line}`} className="mt-8 text-[20px] font-bold leading-[1.5] text-[#1A1C24]">
              {line}
            </h3>
          );
        }

        if (isSecondaryHeading) {
          return (
            <h4 key={`${index}-${line}`} className="mt-4 text-[17px] font-bold leading-[1.65] text-[#252B36]">
              {line}
            </h4>
          );
        }

        return (
          <p key={`${index}-${line.slice(0, 32)}`} className="mt-2 break-words text-[16px] leading-[1.75]">
            {line}
          </p>
        );
      })}
    </article>
  );
}

function renderPromptInline(value: string) {
  const source = value.replace(/\\\|/g, "|");
  const tokens: ReactNode[] = [];
  const tokenPattern = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match = tokenPattern.exec(source);

  while (match) {
    if (match.index > cursor) tokens.push(source.slice(cursor, match.index));

    const token = match[0];
    const key = `${match.index}-${token.slice(0, 18)}`;

    if (token.startsWith("**")) {
      tokens.push(
        <strong key={key} className="font-bold text-[#252B36]">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("*")) {
      tokens.push(
        <em key={key} className="text-[#566176]">
          {token.slice(1, -1)}
        </em>,
      );
    } else if (token.startsWith("`")) {
      tokens.push(
        <code key={key} className="rounded-sm bg-[#E9EEF9] px-1 py-0.5 font-mono text-[15px] text-[#1A42B8]">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      tokens.push(
        linkMatch ? (
          <a
            key={key}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="break-all text-[#1A42B8] underline decoration-[#85A3FF] underline-offset-2"
          >
            {linkMatch[1]}
          </a>
        ) : (
          token
        ),
      );
    }

    cursor = match.index + token.length;
    match = tokenPattern.exec(source);
  }

  if (cursor < source.length) tokens.push(source.slice(cursor));
  return tokens;
}

function FinalReportAgentPromptSource() {
  return (
    <article
      data-prompt-source-scroll="03"
      tabIndex={0}
      aria-label="重点企业监测报告章节智能体最终提示词全文"
      className="absolute inset-0 overflow-y-auto overscroll-contain pb-12 pl-16 pr-7 pt-12 text-[16px] leading-[1.75] text-[#35404F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4777FF]"
    >
      {finalReportAgentPromptLines.map((sourceLine, index) => {
        const line = sourceLine.trim();
        const headingMatch = /^(#{1,3})\s+(.+)$/.exec(line);
        const standaloneBoldMatch = /^\*\*(.+)\*\*$/.exec(line);

        if (!line) {
          return <span key={`space-${index}`} aria-hidden="true" className="block h-3" />;
        }

        if (headingMatch?.[1] === "#") {
          return (
            <h2 key={`${index}-${line}`} className="text-[24px] font-bold leading-[1.35] tracking-[-0.02em] text-[#1A1C24]">
              {headingMatch[2]}
            </h2>
          );
        }

        if (headingMatch?.[1] === "##") {
          return (
            <h3 key={`${index}-${line}`} className="mt-8 text-[20px] font-bold leading-[1.5] text-[#1A1C24]">
              {headingMatch[2]}
            </h3>
          );
        }

        if (headingMatch?.[1] === "###" || standaloneBoldMatch) {
          return (
            <h4 key={`${index}-${line}`} className="mt-5 text-[17px] font-bold leading-[1.65] text-[#252B36]">
              {headingMatch?.[2] ?? renderPromptInline(standaloneBoldMatch?.[1] ?? line)}
            </h4>
          );
        }

        return (
          <p key={`${index}-${line.slice(0, 32)}`} className="mt-2 break-words text-[16px] leading-[1.75]">
            {renderPromptInline(line)}
          </p>
        );
      })}
    </article>
  );
}

function PromptSourceViewer({
  isOpen,
  onClose,
  reduceMotion,
}: {
  isOpen: boolean;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = viewerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  const paperVariants = [
    "experience-paper-sheet-primary",
    "experience-paper-sheet-secondary",
    "experience-paper-sheet-tertiary",
  ];
  const paperStageNotes = [
    { code: "01", label: "章节提示词需求输入", noteClass: "skills-note-0" },
    { code: "02", label: "Google Studio 提示词", noteClass: "skills-note-1" },
    { code: "03", label: "最终输出提示词", noteClass: "skills-note-2" },
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={viewerRef}
          id="prompt-source-viewer"
          data-prompt-source-viewer="true"
          role="dialog"
          aria-modal="true"
          aria-label="Prompt原文查看器"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={(event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.closest("[data-prompt-source-card], [data-prompt-source-close]")) return;
            onClose();
          }}
          className="fixed inset-0 z-[100] isolate overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[#EDF1FA]/95 backdrop-blur-[7px]" />

          <button
            ref={closeButtonRef}
            type="button"
            data-prompt-source-close="true"
            aria-label="关闭Prompt原文查看器"
            title="关闭"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 grid size-12 place-items-center border border-[#AEB8CC] bg-[#FFFEF7] text-[#4E525E] shadow-[2px_3px_0_rgba(57,70,99,0.13),0_10px_28px_rgba(43,57,87,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2258F4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] sm:right-8 sm:top-7"
            style={{ borderRadius: "51% 49% 47% 53% / 48% 53% 47% 52%" }}
          >
            <CircleX size={22} strokeWidth={1.9} />
          </button>

          <div className="relative z-10 flex h-full w-full items-center overflow-x-auto overflow-y-hidden px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24 lg:px-12 xl:px-16">
            <div
              data-prompt-source-paper-row="true"
              className="mx-auto grid w-full min-w-[1080px] max-w-[1900px] grid-cols-3 gap-[clamp(20px,2.4vw,44px)]"
              style={{ height: "min(78vh, 820px)" }}
            >
              {paperVariants.map((variant, index) => (
                <motion.div
                  key={variant}
                  data-prompt-source-card={String(index + 1).padStart(2, "0")}
                  initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.38,
                    delay: reduceMotion ? 0 : 0.04 + index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full min-w-0"
                >
                  <aside
                    data-prompt-source-stage-note={paperStageNotes[index].code}
                    aria-label={paperStageNotes[index].label}
                    className={`skills-sticky-note ${paperStageNotes[index].noteClass} z-20 min-w-[190px] select-none px-4 pb-3 pt-3`}
                    style={{
                      position: "absolute",
                      left: "clamp(22px, 7%, 42px)",
                      top: 0,
                      transform: "translateY(-58%)",
                    }}
                  >
                    <span className="relative z-10 mr-2 font-mono text-[13px] font-bold tracking-[0.08em] text-[#2258F4]">
                      {paperStageNotes[index].code}
                    </span>
                    <strong className="relative z-10 whitespace-nowrap text-[16px] font-semibold text-[#252B36]">
                      {paperStageNotes[index].label}
                    </strong>
                  </aside>
                  <div
                    data-prompt-source-paper={String(index + 1).padStart(2, "0")}
                    className={`experience-paper-sheet ${variant} h-full w-full overflow-hidden`}
                  >
                    <PromptSourcePaperHoles />
                    {index === 0 ? <RequirementPromptSource /> : null}
                    {index === 1 ? <PromptCompilerSystemSource /> : null}
                    {index === 2 ? <FinalReportAgentPromptSource /> : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function PromptCompilerPipelineScaffold() {
  const pipelineRootRef = useRef<HTMLElement | null>(null);
  const pipelineTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const pipelineSeekingRef = useRef(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [isPipelinePlaying, setIsPipelinePlaying] = useState(false);
  const [isPromptSourceViewerOpen, setIsPromptSourceViewerOpen] = useState(false);
  const shouldReducePipelineMotion = useReducedMotion();
  const topScale = Array.from({ length: 17 }, (_, index) => String(index).padStart(2, "0"));
  const sideScale = Array.from({ length: 10 }, (_, index) => String(index).padStart(2, "0"));
  const nodeNotes = [
    {
      number: "01",
      title: "章节提示词需求输入",
      description: "团队成员用自然语言描述需求",
      detailLabel: "示例",
      detail: "“帮我生成企业动态监测周报的章节Prompt”",
      background: "#FFFEF7",
      border: "#DED9CE",
      line: "rgba(132, 137, 146, 0.15)",
      pin: "#4A7BC7",
      className: "md:mt-2 md:-rotate-[0.8deg]",
    },
    {
      number: "02",
      title: "Google Studio",
      description: "使用我在Google AI Studio设计好的提示词框架编译器",
      detailLabel: "示例",
      detail: "M01宪法层 / M04四层信息包 / M06场景路由 / M07编译引擎",
      background: "#EEF4FF",
      border: "#C9D8F4",
      line: "rgba(75, 111, 174, 0.16)",
      pin: "#F05B62",
      className: "md:-mt-1 md:rotate-[0.7deg]",
    },
    {
      number: "03",
      title: "最终输出",
      description: "完整可部署的章节Prompt",
      detailLabel: "标签",
      detail: "6阶段门禁 / §10质量自检 / 信源绑定",
      background: "#FFFEF7",
      border: "#DED9CE",
      line: "rgba(132, 137, 146, 0.15)",
      pin: "#4A7BC7",
      className: "md:mt-1 md:-rotate-[0.35deg]",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "任务定义",
      summary: "目标定义 / 身份与角色 / 成功标准",
      rotate: "-rotate-[0.35deg]",
    },
    {
      number: "02",
      title: "执行编排",
      summary: "输入定义 / 处理规则 / 工具编排",
      rotate: "rotate-[0.28deg]",
    },
    {
      number: "03",
      title: "质量门禁",
      summary: "约束边界 / 输出规范 / 异常处理",
      rotate: "-rotate-[0.2deg]",
    },
    {
      number: "04",
      title: "容错兜底",
      summary: "兜底机制 / 自检清单",
      rotate: "rotate-[0.38deg]",
    },
  ];

  useGSAP(
    () => {
      const root = pipelineRootRef.current;
      if (!root) return;

      const select = gsap.utils.selector(root);
      const nodeOne = root.querySelector<HTMLElement>('[data-prompt-compiler-node="01"]');
      const nodeTwo = root.querySelector<HTMLElement>('[data-prompt-compiler-node="02"]');
      const nodeThree = root.querySelector<HTMLElement>('[data-prompt-compiler-node="03"]');
      const animatedSvg = root.querySelector<SVGSVGElement>('[data-pipeline-animated-svg="true"]');
      const segmentOneStrokes = select<SVGPathElement>('[data-pipeline-animated-stroke="first"]');
      const segmentTwoStrokes = select<SVGPathElement>('[data-pipeline-animated-stroke="second"]');
      const animatedStrokes = [...segmentOneStrokes, ...segmentTwoStrokes];
      const startDot = select<SVGCircleElement>('[data-pipeline-animated-dot="start"]');
      const compilerInDot = select<SVGCircleElement>('[data-pipeline-animated-dot="compiler-in"]');
      const compilerOutDot = select<SVGCircleElement>('[data-pipeline-animated-dot="compiler-out"]');
      const endDot = select<SVGCircleElement>('[data-pipeline-animated-dot="end"]');
      const staticConnectors = select<HTMLElement>('[data-prompt-pipeline-static-connector="true"]');
      const processCluster = select<HTMLElement>('[data-pipeline-process-cluster="true"]');
      const processItems = select<HTMLElement>('[data-pipeline-process-step]');
      const processNodes = select<HTMLElement>('[data-pipeline-process-node]');
      const processNumbers = select<HTMLElement>('[data-pipeline-process-number]');
      const processChecks = select<SVGSVGElement>('[data-pipeline-process-check]');
      const processRailFill = select<HTMLElement>('[data-pipeline-process-rail-fill="true"]');

      if (!nodeOne || !nodeTwo || !nodeThree || !animatedSvg) return;

      const setPipelineGeometry = () => {
        const surfaceRect = animatedSvg.getBoundingClientRect();
        if (surfaceRect.width <= 0 || surfaceRect.height <= 0) return;

        const getRenderedPathLength = (path: SVGPathElement) => {
          const geometryLength = Math.max(1, path.getTotalLength());
          const screenMatrix = path.getScreenCTM();
          if (!screenMatrix) return geometryLength;

          const sampleCount = 32;
          let renderedLength = 0;
          let previousPoint: { x: number; y: number } | null = null;

          for (let sampleIndex = 0; sampleIndex <= sampleCount; sampleIndex += 1) {
            const point = path.getPointAtLength((geometryLength * sampleIndex) / sampleCount);
            const screenPoint = {
              x: screenMatrix.a * point.x + screenMatrix.c * point.y + screenMatrix.e,
              y: screenMatrix.b * point.x + screenMatrix.d * point.y + screenMatrix.f,
            };
            if (previousPoint) {
              renderedLength += Math.hypot(screenPoint.x - previousPoint.x, screenPoint.y - previousPoint.y);
            }
            previousPoint = screenPoint;
          }

          return Math.max(1, renderedLength);
        };

        const toCanvasPoint = (x: number, y: number) => ({
          x: ((x - surfaceRect.left) / surfaceRect.width) * 1000,
          y: ((y - surfaceRect.top) / surfaceRect.height) * 1000,
        });
        const firstRect = nodeOne.getBoundingClientRect();
        const secondRect = nodeTwo.getBoundingClientRect();
        const thirdRect = nodeThree.getBoundingClientRect();
        const firstCenterY = firstRect.top + firstRect.height / 2;
        const secondCenterY = secondRect.top + secondRect.height / 2;
        const thirdCenterY = thirdRect.top + thirdRect.height / 2;
        const firstIsHorizontal = Math.abs(firstCenterY - secondCenterY) < Math.min(firstRect.height, secondRect.height) * 0.45;
        const secondIsHorizontal = Math.abs(secondCenterY - thirdCenterY) < Math.min(secondRect.height, thirdRect.height) * 0.45;

        const start = firstIsHorizontal
          ? toCanvasPoint(firstRect.right, firstRect.top + firstRect.height / 2)
          : toCanvasPoint(firstRect.left + firstRect.width / 2, firstRect.bottom);
        const compilerIn = firstIsHorizontal
          ? toCanvasPoint(secondRect.left, secondRect.top + secondRect.height / 2)
          : toCanvasPoint(secondRect.left + secondRect.width / 2, secondRect.top);
        const compilerOut = secondIsHorizontal
          ? toCanvasPoint(secondRect.right, secondRect.top + secondRect.height / 2)
          : toCanvasPoint(secondRect.left + secondRect.width / 2, secondRect.bottom);
        const end = secondIsHorizontal
          ? toCanvasPoint(thirdRect.left, thirdRect.top + thirdRect.height / 2)
          : toCanvasPoint(thirdRect.left + thirdRect.width / 2, thirdRect.top);

        const createCurve = (
          from: { x: number; y: number },
          to: { x: number; y: number },
          horizontal: boolean,
        ) => {
          if (horizontal) {
            const direction = Math.sign(to.x - from.x) || 1;
            const distance = Math.max(55, Math.abs(to.x - from.x) * 0.48);
            return `M ${from.x} ${from.y} C ${from.x + distance * direction} ${from.y - 22}, ${to.x - distance * direction} ${to.y + 22}, ${to.x} ${to.y}`;
          }
          const direction = Math.sign(to.y - from.y) || 1;
          const distance = Math.max(55, Math.abs(to.y - from.y) * 0.48);
          return `M ${from.x} ${from.y} C ${from.x - 24} ${from.y + distance * direction}, ${to.x + 24} ${to.y - distance * direction}, ${to.x} ${to.y}`;
        };
        const firstPath = createCurve(start, compilerIn, firstIsHorizontal);
        const secondPath = createCurve(compilerOut, end, secondIsHorizontal);

        segmentOneStrokes.forEach((path) => path.setAttribute("d", firstPath));
        segmentTwoStrokes.forEach((path) => path.setAttribute("d", secondPath));
        const setDotPosition = (dots: SVGCircleElement[], point: { x: number; y: number }) => {
          dots.forEach((dot) => {
            dot.setAttribute("cx", String(point.x));
            dot.setAttribute("cy", String(point.y));
          });
        };
        setDotPosition(startDot, start);
        setDotPosition(compilerInDot, compilerIn);
        setDotPosition(compilerOutDot, compilerOut);
        setDotPosition(endDot, end);

        const currentTimeline = pipelineTimelineRef.current;
        const currentProgress = currentTimeline?.progress() ?? 0;
        animatedStrokes.forEach((path) => {
          const hiddenLength = Math.ceil(getRenderedPathLength(path) + 12);
          gsap.set(path, { strokeDasharray: hiddenLength, strokeDashoffset: hiddenLength });
        });
        if (currentTimeline) {
          currentTimeline.invalidate().progress(currentProgress);
        }
      };

      setPipelineGeometry();
      const geometryObserver = new ResizeObserver(setPipelineGeometry);
      geometryObserver.observe(animatedSvg);

      gsap.set(processCluster, { autoAlpha: 0, x: 0 });
      gsap.set(processItems, { autoAlpha: 0, x: 18, scale: 0.985, transformOrigin: "left center" });
      gsap.set(processRailFill, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(processNodes, { backgroundColor: "#FFFEF7", borderColor: "#B8C2D6", color: "#7C879C" });
      gsap.set(processNumbers, { autoAlpha: 1 });
      gsap.set(processChecks, { autoAlpha: 0, scale: 0.5, transformOrigin: "center" });
      gsap.set([...startDot, ...compilerInDot, ...compilerOutDot, ...endDot], { autoAlpha: 0, scale: 0.5, transformOrigin: "center" });
      gsap.set(animatedStrokes, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
        onUpdate: () => {
          const currentTimeline = pipelineTimelineRef.current;
          if (!currentTimeline) return;
          setPipelineProgress(Number((currentTimeline.progress() * 100).toFixed(1)));
        },
        onComplete: () => {
          setPipelineProgress(100);
          setIsPipelinePlaying(false);
        },
      });
      pipelineTimelineRef.current = timeline;

      timeline
        .addLabel("prepare", 0)
        .to([nodeTwo, nodeThree], { autoAlpha: 0, y: -8, duration: 0.28, stagger: 0.018 }, "prepare")
        .to(staticConnectors, { autoAlpha: 0, duration: 0.01 }, 0.01)
        .to(startDot, { autoAlpha: 1, scale: 1, duration: 0.08 }, 0.29)
        .addLabel("draw-to-compiler", 0.35)
        .set(segmentOneStrokes, { autoAlpha: 1, immediateRender: false }, "draw-to-compiler")
        .to(segmentOneStrokes, { strokeDashoffset: 0, duration: 0.6, ease: "none" }, "draw-to-compiler")
        .to(nodeTwo, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.82)
        .to(compilerInDot, { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.88)
        .addLabel("compiler-process", 0.95)
        .to(processCluster, { autoAlpha: 1, x: 0, duration: 0.15 }, "compiler-process")
        .to(processItems, { autoAlpha: 1, x: 0, scale: 1, duration: 0.2, stagger: 0.055 }, 0.97);

      processItems.forEach((item, index) => {
        const processStart = 1.08 + index * 0.52;
        const processDone = processStart + 0.34;
        timeline
          .to(item, { backgroundColor: "#F4F7FF", borderColor: "#91ACFF", duration: 0.12 }, processStart)
          .to(processNodes[index], { backgroundColor: "#2258F4", borderColor: "#2258F4", color: "#FFFFFF", duration: 0.12 }, processStart)
          .to(processRailFill, { scaleY: (index + 1) / processItems.length, duration: 0.38, ease: "none" }, processStart)
          .to(item, { backgroundColor: "#F6FFF8", borderColor: "#BDD9C6", duration: 0.12 }, processDone)
          .to(processNumbers[index], { autoAlpha: 0, duration: 0.08 }, processDone)
          .to(processChecks[index], { autoAlpha: 1, scale: 1, duration: 0.12 }, processDone)
          .to(processNodes[index], { backgroundColor: "#EAF8EF", borderColor: "#72B98A", color: "#277142", duration: 0.12 }, processDone);
      });

      timeline
        .addLabel("process-exit", 3.35)
        .to(processCluster, { autoAlpha: 0, x: 14, duration: 0.3, ease: "power2.in" }, "process-exit")
        .addLabel("draw-to-output", 3.6)
        .to(compilerOutDot, { autoAlpha: 1, scale: 1, duration: 0.08 }, 3.54)
        .set(segmentTwoStrokes, { autoAlpha: 1, immediateRender: false }, "draw-to-output")
        .to(segmentTwoStrokes, { strokeDashoffset: 0, duration: 0.36, ease: "none" }, "draw-to-output")
        .to(nodeThree, { autoAlpha: 1, y: 0, duration: 0.12 }, 3.88)
        .to(endDot, { autoAlpha: 1, scale: 1, duration: 0.06 }, 3.94)
        .to({}, { duration: 0.01 }, 3.99);

      timeline.pause(0);

      return () => {
        geometryObserver.disconnect();
        pipelineTimelineRef.current = null;
        timeline.kill();
      };
    },
    { scope: pipelineRootRef },
  );

  const togglePipelinePlayback = () => {
    const timeline = pipelineTimelineRef.current;
    if (!timeline) return;

    if (isPipelinePlaying) {
      timeline.pause();
      setIsPipelinePlaying(false);
      return;
    }

    if (timeline.progress() >= 0.999) {
      timeline.pause(0);
    }

    if (shouldReducePipelineMotion) {
      timeline.progress(1).pause();
      setPipelineProgress(100);
      setIsPipelinePlaying(false);
      return;
    }

    timeline.play();
    setIsPipelinePlaying(true);
  };

  const resetPipelinePlayback = () => {
    pipelineTimelineRef.current?.pause(0);
    setIsPipelinePlaying(false);
    setPipelineProgress(0);
  };

  const openPromptSourceViewer = () => {
    pipelineTimelineRef.current?.pause();
    setIsPipelinePlaying(false);
    setIsPromptSourceViewerOpen(true);
  };

  const seekPipelinePlayback = (nextProgress: number) => {
    const timeline = pipelineTimelineRef.current;
    timeline?.pause().progress(nextProgress / 100);
    setIsPipelinePlaying(false);
    setPipelineProgress(nextProgress);
  };

  const seekPipelineFromPointer = (clientX: number, target: HTMLInputElement) => {
    const trackBounds = target.getBoundingClientRect();
    if (trackBounds.width <= 0) return;
    const nextProgress = Math.min(100, Math.max(0, ((clientX - trackBounds.left) / trackBounds.width) * 100));
    seekPipelinePlayback(Number(nextProgress.toFixed(1)));
  };

  return (
    <section
      ref={pipelineRootRef}
      data-prompt-compiler-pipeline-scaffold="true"
      aria-labelledby="prompt-compiler-pipeline-title"
      className="mx-auto mb-20 max-w-[1400px]"
    >
      <div className="mb-10 flex justify-center px-4 text-center md:mb-12">
        <div
          data-prompt-compiler-title-note="true"
          className="relative flex h-[132px] w-[200px] rotate-[0.45deg] items-center justify-center rounded-[6px] border px-4 py-5 text-[14px] font-semibold leading-[1.6] text-[#35404F] shadow-[0_2px_3px_rgba(28,36,52,0.16),0_7px_14px_rgba(28,36,52,0.055)] sm:h-[118px] sm:w-[280px] sm:px-5 sm:text-[16px] md:h-[136px] md:w-[330px] md:px-6 md:py-6 md:text-[20px]"
          style={{
            background: "repeating-linear-gradient(to bottom, #EEF2FF 0, #EEF2FF 31px, #D8E1FF 32px, #D8E1FF 33px)",
            borderColor: "#C8D4FF",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: INK_DIM, boxShadow: "0 2px 4px rgba(78,82,94,0.22)" }}
          />
          <h3 id="prompt-compiler-pipeline-title">
            <span className="block">我构建的 Prompt 编译管线：</span>
            <span className="block">用自然语言输入，</span>
            <span className="block">产出团队统一标准的提示词</span>
          </h3>
        </div>
      </div>

      <div className="relative pt-[132px] sm:pt-[140px] lg:pt-[132px]">
        <ReportAgentExecutionChainSticker />

        <div
          data-prompt-compiler-player-canvas="true"
          aria-label="Prompt 编译管线播放器画布"
          className="relative z-10 overflow-clip rounded-[28px] border border-[#E6E7EB] bg-white"
        >
          <div className="relative min-h-[1040px] bg-white sm:min-h-[760px] lg:aspect-[16/8.5] lg:min-h-0">
          <div
            className="pointer-events-none absolute bottom-3 left-7 right-3 top-7 rounded-[18px] border border-[#E6E7EB] sm:bottom-4 sm:left-8 sm:right-4 sm:top-8"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-[17px]"
              style={{
                backgroundColor: "#FFFFFF",
                backgroundImage:
                  "linear-gradient(rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(rgba(107, 120, 150, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.035) 1px, transparent 1px)",
                backgroundSize: "112px 112px, 112px 112px, 28px 28px, 28px 28px",
              }}
            />

            <div className="absolute inset-x-0 top-0 grid -translate-y-[calc(100%+9px)] grid-cols-17 px-1">
              {topScale.map((mark) => (
                <span
                  key={mark}
                  className="relative text-center text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                >
                  {mark}
                  <span className="absolute left-1/2 top-[calc(100%+3px)] h-1.5 w-px -translate-x-1/2 bg-[#AAB2C2]" />
                </span>
              ))}
            </div>

            <div className="absolute inset-y-0 left-0 grid -translate-x-[calc(100%+9px)] grid-rows-10 py-1">
              {sideScale.map((mark) => (
                <span
                  key={mark}
                  className="relative flex items-center justify-end text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                >
                  {mark}
                  <span className="absolute left-[calc(100%+3px)] top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#AAB2C2]" />
                </span>
              ))}
          </div>
        </div>
      </div>

          <svg
            data-pipeline-animated-svg="true"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-28 left-11 right-7 top-12 z-[12] overflow-visible sm:bottom-28 sm:left-14 sm:right-10 sm:top-14"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              data-pipeline-animated-stroke="first"
              d="M 250 500 C 340 478, 410 522, 500 500"
              stroke="#D8E4FF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              vectorEffect="non-scaling-stroke"
            />
            <path
              data-pipeline-animated-stroke="first"
              d="M 250 500 C 340 478, 410 522, 500 500"
              stroke="#2258F4"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              vectorEffect="non-scaling-stroke"
            />

            <path
              data-pipeline-animated-stroke="second"
              d="M 500 500 C 590 478, 660 522, 750 500"
              stroke="#D8E4FF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              vectorEffect="non-scaling-stroke"
            />
            <path
              data-pipeline-animated-stroke="second"
              d="M 500 500 C 590 478, 660 522, 750 500"
              stroke="#2258F4"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              vectorEffect="non-scaling-stroke"
            />

            <circle
              data-pipeline-animated-dot="start"
              cx="250"
              cy="500"
              r="6"
              fill="#FFFEF7"
              stroke="#2258F4"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              opacity="0"
            />
            <circle
              data-pipeline-animated-dot="compiler-in"
              cx="500"
              cy="500"
              r="6"
              fill="#FFFEF7"
              stroke="#2258F4"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              opacity="0"
            />
            <circle
              data-pipeline-animated-dot="compiler-out"
              cx="600"
              cy="500"
              r="6"
              fill="#FFFEF7"
              stroke="#2258F4"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              opacity="0"
            />
            <circle
              data-pipeline-animated-dot="end"
              cx="750"
              cy="500"
              r="6"
              fill="#FFFEF7"
              stroke="#2258F4"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              opacity="0"
            />
          </svg>

          <div
            data-pipeline-process-cluster="true"
            aria-hidden="true"
            className="invisible absolute left-10 right-7 top-[30%] z-30 opacity-0 sm:left-[44%] sm:right-8 sm:top-[13%] lg:left-[63%] lg:right-auto lg:top-1/2 lg:w-[calc(36%-8px)] lg:max-w-[400px] lg:-translate-y-1/2"
          >
            <div className="relative space-y-2.5 pl-14 lg:translate-x-2">
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-[21px] top-3 z-0 w-[4px] border border-[#C9D2E4] bg-[#F5F7FB]"
                style={{ borderRadius: "54% 46% 49% 51% / 48% 53% 47% 52%" }}
              />
              <span
                data-pipeline-process-rail-fill="true"
                aria-hidden="true"
                className="absolute bottom-3 left-[21px] top-3 z-[1] w-[4px] origin-top bg-[#2258F4]"
                style={{ borderRadius: "52% 48% 46% 54% / 49% 55% 45% 51%" }}
              />

              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  data-pipeline-process-step={step.number}
                  className={`relative z-10 min-h-[78px] ${step.rotate} rounded-[5px] border border-[#D7DDE9] bg-[#FFFEF7] px-4 py-3 shadow-[0_4px_11px_rgba(42,55,82,0.08)]`}
                  style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 25px, rgba(108,126,160,0.12) 26px, rgba(108,126,160,0.12) 27px)",
                  }}
                >
                  <span
                    data-pipeline-process-node={step.number}
                    aria-hidden="true"
                    className="absolute left-[-46px] top-1/2 z-20 grid size-8 -translate-y-1/2 place-items-center border-2 bg-[#FFFEF7] font-mono text-[16px] font-semibold shadow-[1px_2px_0_rgba(47,61,90,0.12)]"
                    style={{ borderRadius: "49% 51% 45% 55% / 53% 47% 54% 46%" }}
                  >
                    <span data-pipeline-process-number={step.number}>{index + 1}</span>
                    <CheckCircle2
                      data-pipeline-process-check={step.number}
                      className="invisible absolute opacity-0"
                      size={20}
                      strokeWidth={2.3}
                    />
                  </span>

                  <div className="relative z-10 flex flex-wrap items-baseline gap-x-2">
                    <h5 className="text-[16px] font-semibold leading-[1.4] text-[#20242D]">{step.title}</h5>
                  </div>
                  <p className="relative z-10 mt-1 text-[16px] leading-[1.45] text-[#4F5B70]">{step.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div
            data-prompt-compiler-node-notes="true"
            className="absolute bottom-28 left-11 right-7 top-12 z-10 grid grid-cols-1 items-center gap-8 sm:bottom-28 sm:left-14 sm:right-10 sm:top-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[260px_minmax(0,1fr)_260px_minmax(0,1fr)_260px] lg:gap-0 xl:grid-cols-[290px_minmax(0,1fr)_290px_minmax(0,1fr)_290px] 2xl:grid-cols-[320px_minmax(0,1fr)_320px_minmax(0,1fr)_320px]"
          >
            {nodeNotes.map((note, index) => (
              <Fragment key={`prompt-compiler-node-group-${index + 1}`}>
                <article
                  data-prompt-compiler-node={String(index + 1).padStart(2, "0")}
                  aria-label={`管线节点 ${note.number}：${note.title}`}
                  className={`relative z-10 min-h-[220px] overflow-visible rounded-[6px] border px-4 pb-4 pt-5 shadow-[0_10px_22px_rgba(28,36,52,0.075)] sm:min-h-[230px] md:min-h-[230px] lg:min-h-[224px] xl:min-h-[216px] 2xl:min-h-[210px] ${index === nodeNotes.length - 1 ? "sm:col-span-2 sm:w-[46%] sm:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-stretch" : ""} ${note.className}`}
                  style={{
                    backgroundColor: note.background,
                    borderColor: note.border,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_1px_0_rgba(36,40,49,0.14)] sm:size-3.5"
                    style={{ backgroundColor: note.pin }}
                  />

                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[5px]">
                    <div className="absolute inset-x-0 top-[31%] space-y-7 sm:space-y-8">
                      {Array.from({ length: 4 }, (_, lineIndex) => (
                        <span
                          key={lineIndex}
                          className="block h-px w-full"
                          style={{ backgroundColor: note.line }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 pr-2">
                      <span className="font-mono text-[16px] font-semibold tracking-[0.1em] text-[#2258F4]">
                        {note.number}
                      </span>
                      <h4 className="text-[17px] font-semibold leading-[1.35] text-[#20242D]">
                        {note.title}
                      </h4>
                    </div>

                    <p className="mt-3 text-[16px] font-medium leading-[1.55] text-[#3E4655]">
                      {note.number === "02" ? (
                        <>
                          使用我在<PromptPipelineMarker>Google AI Studio</PromptPipelineMarker>设计好的提示词框架编译器
                        </>
                      ) : (
                        note.description
                      )}
                    </p>

                    <div className="mt-3 grid grid-cols-[2.5em_minmax(0,1fr)] gap-x-2 border-t border-[#AAB2C2]/25 pt-3 text-[16px] leading-[1.5]">
                      <span className="font-semibold text-[#737B8C]">{note.detailLabel}</span>
                      <p className="break-words text-[#4F5B70]">{note.detail}</p>
                    </div>
                  </div>
                </article>

                {index < nodeNotes.length - 1 ? <PromptPipelineConnector index={index + 1} /> : null}
              </Fragment>
            ))}
          </div>

          <div
            data-prompt-compiler-player-controls="true"
            className="absolute bottom-6 left-10 right-6 z-20 flex items-center justify-center gap-2.5 sm:bottom-7 sm:left-14 sm:right-10 sm:gap-3"
          >
            <div
              className="relative flex min-w-0 max-w-[920px] flex-1 -rotate-[0.18deg] items-center gap-2.5 rounded-[13px] border border-[#BFC7D8] bg-[#FFFEF7] px-3 py-3 shadow-[0_1px_0_rgba(79,91,112,0.10),0_3px_8px_rgba(34,48,78,0.055)] sm:gap-3 sm:px-4"
              style={{ borderRadius: "13px 11px 14px 10px / 11px 14px 10px 13px" }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[3px] rounded-[10px] border border-[#D7DCE7]"
                style={{ borderRadius: "10px 8px 11px 9px / 8px 11px 9px 10px" }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-10 top-0 h-3 w-24 -translate-y-1/2 -rotate-[2.5deg] bg-[#DCE7FF]/80"
              />

              <button
                type="button"
                data-pipeline-play-toggle="true"
                aria-label={isPipelinePlaying ? "暂停管线播放" : "播放管线"}
                aria-pressed={isPipelinePlaying}
                title={isPipelinePlaying ? "暂停" : "播放"}
                onClick={togglePipelinePlayback}
                className="relative z-10 grid size-10 shrink-0 place-items-center border border-[#8FA9EF] shadow-[1px_2px_0_rgba(54,74,121,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2258F4] focus-visible:ring-offset-2"
                style={{
                  backgroundColor: isPipelinePlaying ? "#2258F4" : "#EEF4FF",
                  color: isPipelinePlaying ? "#F8F9FF" : "#2258F4",
                  borderRadius: "48% 52% 46% 54% / 53% 47% 55% 45%",
                }}
              >
                {isPipelinePlaying ? <Pause size={17} strokeWidth={2.2} /> : <Play size={17} strokeWidth={2.2} className="translate-x-px" />}
              </button>

              <button
                type="button"
                data-pipeline-reset="true"
                aria-label="刷新并重置管线进度"
                title="刷新"
                onClick={resetPipelinePlayback}
                className="relative z-10 grid size-10 shrink-0 place-items-center border border-[#C7C1B3] bg-[#F8F5EC] text-[#596174] shadow-[1px_2px_0_rgba(75,80,92,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2258F4] focus-visible:ring-offset-2"
                style={{ borderRadius: "53% 47% 51% 49% / 46% 54% 48% 52%" }}
              >
                <RotateCcw size={17} strokeWidth={2.1} />
              </button>

              <div data-pipeline-progress-shell="true" className="relative z-10 h-10 min-w-0 flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={pipelineProgress}
                  aria-label="管线播放进度"
                  aria-valuetext={`${Math.round(pipelineProgress)}%`}
                  onPointerDown={(event) => {
                    pipelineTimelineRef.current?.pause();
                    setIsPipelinePlaying(false);
                    pipelineSeekingRef.current = true;
                    event.currentTarget.setPointerCapture?.(event.pointerId);
                    seekPipelineFromPointer(event.clientX, event.currentTarget);
                  }}
                  onPointerMove={(event) => {
                    if (!pipelineSeekingRef.current) return;
                    seekPipelineFromPointer(event.clientX, event.currentTarget);
                  }}
                  onPointerUp={(event) => {
                    if (!pipelineSeekingRef.current) return;
                    seekPipelineFromPointer(event.clientX, event.currentTarget);
                    pipelineSeekingRef.current = false;
                    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                      event.currentTarget.releasePointerCapture(event.pointerId);
                    }
                  }}
                  onPointerCancel={() => {
                    pipelineSeekingRef.current = false;
                  }}
                  onInput={(event) => seekPipelinePlayback(Number(event.currentTarget.value))}
                  className="peer absolute inset-0 z-30 m-0 h-full w-full cursor-ew-resize opacity-0"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-x-1 top-1/2 h-[18px] -translate-y-1/2 overflow-hidden border border-[#8E98AC] bg-[#F0EEE7] shadow-[inset_1px_1px_0_rgba(83,94,116,0.14)]"
                  style={{ borderRadius: "10px 8px 9px 11px / 8px 10px 11px 9px" }}
                >
                  <div
                    data-pipeline-progress-fill="true"
                    className="h-full bg-[#3C6CF2]"
                    style={{
                      width: `${pipelineProgress}%`,
                      backgroundImage: "repeating-linear-gradient(-8deg, rgba(255,255,255,0.02) 0 7px, rgba(255,255,255,0.18) 7px 9px)",
                    }}
                  />
                </div>

                <span
                  data-pipeline-progress-thumb="true"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 z-20 grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-[#2258F4] bg-[#FFFEF7] shadow-[1px_2px_0_rgba(36,58,112,0.20)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#2258F4] peer-focus-visible:ring-offset-2"
                  style={{
                    left: `clamp(11px, ${pipelineProgress}%, calc(100% - 11px))`,
                    borderRadius: "47% 53% 51% 49% / 52% 46% 54% 48%",
                  }}
                >
                  <span className="size-1.5 rounded-full bg-[#2258F4]" />
                </span>
              </div>
            </div>

            <button
              type="button"
              data-prompt-source-open="true"
              aria-haspopup="dialog"
              aria-expanded={isPromptSourceViewerOpen}
              aria-controls="prompt-source-viewer"
              aria-label="查看Prompt原文"
              title="查看Prompt原文"
              onClick={openPromptSourceViewer}
              className="relative grid h-16 w-16 shrink-0 rotate-[0.3deg] place-items-center overflow-hidden border border-[#85A3FF] bg-[#EEF2FF] text-[#1A42B8] shadow-[0_1px_0_rgba(79,91,112,0.10),0_4px_10px_rgba(34,88,244,0.10)] transition-colors duration-200 hover:border-[#6F91F5] hover:bg-[#E5EBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2258F4] focus-visible:ring-offset-2 md:flex md:w-auto md:gap-2.5 md:px-5"
              style={{ borderRadius: "11px 14px 10px 13px / 13px 10px 14px 11px" }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[3px] border border-[#C8D4FF]"
                style={{ borderRadius: "8px 11px 7px 10px / 10px 7px 11px 8px" }}
              />
              <FileText className="relative z-10 size-5 shrink-0" strokeWidth={1.9} />
              <span className="relative z-10 hidden whitespace-nowrap text-[17px] font-semibold text-[#1A42B8] md:inline">
                查看Prompt原文
              </span>
            </button>
          </div>
        </div>
      </div>

      <PromptSourceViewer
        isOpen={isPromptSourceViewerOpen}
        onClose={() => setIsPromptSourceViewerOpen(false)}
        reduceMotion={Boolean(shouldReducePipelineMotion)}
      />
    </section>
  );
}

type RuleIllustrationKind = "flow" | "merge" | "gate" | "module";

const RULE_ILLUSTRATION_ORDER: RuleIllustrationKind[] = ["flow", "merge", "gate", "module"];

function RuleIllustration({ visual }: { visual: RuleIllustrationKind }) {
  if (visual === "flow") {
    return (
      <div className="relative grid w-[88%] grid-cols-[30%_12%_58%] items-center">
        <div className="relative h-28">
          {[
            { text: "写章节内容", x: 2, y: 0, w: "76%" },
            { text: "补工具结果", x: 18, y: 40, w: "66%" },
            { text: "整理输出", x: 0, y: 82, w: "72%" },
          ].map((chip) => (
            <div
              key={chip.text}
              className="absolute rounded-xl border bg-white px-3 py-2 text-[10px] font-medium"
              style={{
                left: chip.x,
                top: chip.y,
                width: chip.w,
                borderColor: "#E6E7EB",
                color: "#4E525E",
              }}
            >
              {chip.text}
            </div>
          ))}
        </div>

        <svg className="h-24 w-full overflow-visible" viewBox="0 0 80 96" fill="none" aria-hidden="true">
          <path d="M4 26 C26 26 28 48 54 48" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.5" />
          <path d="M4 48 H56" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.66" />
          <path d="M4 70 C26 70 28 48 54 48" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.5" />
          <path d="M54 44L62 48L54 52" fill={BLUE} opacity="0.78" />
        </svg>

        <div className="grid grid-cols-3 items-center gap-x-3 gap-y-3">
          {["观察", "检索", "合流", "整理", "核验", "输出"].map((node, nodeIndex) => (
            <div key={node} className="relative">
              <div
                className="rounded-xl border bg-white px-2 py-2 text-center text-[11px] font-semibold"
                style={{
                  borderColor: nodeIndex === 2 ? ICON_BORDER : "#E6E7EB",
                  background: nodeIndex === 2 ? "#EEF2FF" : "#FFFFFF",
                  color: nodeIndex === 2 ? ICON_BLUE : "#4E525E",
                }}
              >
                {node}
              </div>
              {nodeIndex < 5 && nodeIndex !== 2 && (
                <span
                  className="pointer-events-none absolute left-[calc(100%+2px)] top-1/2 hidden h-px w-2 -translate-y-1/2 lg:block"
                  style={{ background: ICON_BORDER }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual === "merge") {
    return (
      <div className="relative grid w-[86%] grid-cols-[28%_20%_52%] items-center">
        <div className="space-y-2">
          {["MCP", "deep_search", "file_tool"].map((tool) => (
            <div
              key={tool}
              className="rounded-full border bg-white px-3 py-2 text-center text-[11px] font-medium shadow-[0_8px_16px_rgba(15,20,25,0.04)]"
              style={{ borderColor: "#E6E7EB", color: "#4E525E" }}
            >
              {tool}
            </div>
          ))}
        </div>

        <svg className="h-28 w-full overflow-visible" viewBox="0 0 80 112" fill="none" aria-hidden="true">
          <path d="M2 22 C24 22 30 56 62 56" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.44" />
          <path d="M2 56 H62" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.68" />
          <path d="M2 90 C24 90 30 56 62 56" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.44" />
          <path d="M62 51L72 56L62 61" fill={BLUE} opacity="0.78" />
        </svg>

        <div className="translate-y-2 rounded-2xl border bg-white p-4 shadow-[0_14px_26px_rgba(15,20,25,0.06)]" style={{ borderColor: ICON_BORDER }}>
          <div className="mb-3 text-[13px] font-semibold" style={{ color: ICON_BLUE }}>
            统一候选池
          </div>
          <div className="space-y-1.5">
            <div className="grid grid-cols-[38px_1fr] items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: "#EEF2FF" }}>
              <span className="text-[9px] font-semibold" style={{ color: ICON_BLUE }}>URL</span>
              <div className="h-1.5 w-full rounded-full bg-white/90" />
            </div>
            <div className="grid grid-cols-[38px_1fr] items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ background: "#EEF2FF" }}>
              <span className="text-[9px] font-semibold" style={{ color: ICON_BLUE }}>时间</span>
              <div className="h-1.5 w-[78%] rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-3 rounded-full px-3 py-1.5 text-center text-[10px] font-medium" style={{ background: "#FFF6DB", color: "#B45309" }}>
            禁止按工具分别输出
          </div>
        </div>
      </div>
    );
  }

  if (visual === "gate") {
    return (
      <div className="relative grid w-[88%] grid-cols-[292px_82px] items-center justify-center gap-4">
        <div className="relative h-28">
          <svg className="absolute left-0 top-0 h-full w-[292px]" viewBox="0 0 292 112" fill="none" aria-hidden="true">
            <path d="M41 56H257" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.42" />
          </svg>
          {[
            { label: "当前输入", x: 0, y: 18, active: true },
            { label: "阶段状态", x: 72, y: 42, active: true },
            { label: "历史记忆", x: 144, y: 18, active: false },
            { label: "默认规则", x: 216, y: 42, active: false },
          ].map((step, stepIndex) => (
            <div
              key={step.label}
              className="absolute flex w-[82px] flex-col items-center"
              style={{ left: step.x, top: step.y }}
            >
              <div
                className="mb-1 flex size-7 items-center justify-center rounded-full border text-[11px] font-bold"
                style={{
                  borderColor: step.active ? ICON_BORDER : "#E6E7EB",
                  background: step.active ? BLUE : "#FFFFFF",
                  color: step.active ? "#FFFFFF" : "#B3B6BF",
                }}
              >
                {stepIndex + 1}
              </div>
              <div
                className="rounded-full px-2 py-1 text-[10px] font-medium"
                style={{
                  background: step.active ? "#EEF2FF" : "#E6E7EB",
                  color: step.active ? ICON_BLUE : "#696D7A",
                }}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-3" style={{ borderColor: ICON_BORDER, background: "#EEF2FF" }}>
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: ICON_BLUE }}>
            <ShieldCheck className="size-4" style={{ color: ICON_GRAY }} />
            <span>Gate</span>
          </div>
          <div className="space-y-1.5">
            <div className="rounded-lg bg-white px-2 py-1.5 text-[10px] font-medium" style={{ color: ICON_BLUE }}>
              已完成
            </div>
            <div className="rounded-lg px-2 py-1.5 text-[10px] font-medium" style={{ background: "#FFF6DB", color: "#B45309" }}>
              不放行
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid w-[88%] grid-cols-[34%_66%] items-center gap-4">
      <div className="relative rounded-2xl border bg-white p-3 shadow-[0_12px_24px_rgba(15,20,25,0.05)]" style={{ borderColor: "#E6E7EB" }}>
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#1A1C24" }}>
          <FileText className="size-3.5" style={{ color: ICON_GRAY }} />
          Prompt 文档
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-[86%] rounded-full" style={{ background: "#E6E7EB" }} />
          <div className="h-1.5 w-[64%] rounded-full" style={{ background: "#E6E7EB" }} />
          <div className="rounded-lg p-2" style={{ background: "#EEF2FF" }}>
            <div className="mb-1.5 h-1.5 w-[78%] rounded-full bg-white" />
            <div className="h-1.5 w-[52%] rounded-full bg-white" />
          </div>
          <div className="h-1.5 w-[72%] rounded-full" style={{ background: "#E6E7EB" }} />
        </div>
        <div className="absolute -right-2 top-1/2 h-px w-6" style={{ background: ICON_BORDER }} />
        <div className="absolute -right-3 top-[calc(50%-3px)] h-0 w-0 border-y-[3px] border-y-transparent" style={{ borderLeft: `5px solid ${ICON_BORDER}` }} />
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-1.5">
          {["目标", "输入", "规则", "约束", "输出", "异常", "兜底"].map((module, moduleIndex) => (
            <div
              key={module}
              className="rounded-full border px-2 py-1.5 text-center text-[10px] font-semibold"
              style={{
                borderColor: moduleIndex < 5 ? ICON_BORDER : moduleIndex === 5 ? "#E6E7EB" : "#FFE3E3",
                background: moduleIndex < 5 ? "#EEF2FF" : moduleIndex === 5 ? "#FFF6DB" : "#FFE3E3",
                color: moduleIndex < 5 ? ICON_BLUE : moduleIndex === 5 ? "#B45309" : "#B81D1D",
              }}
            >
              {module}
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {["任务定义", "执行编排", "质量门禁", "容错兜底"].map((group, groupIndex) => (
            <div
              key={group}
              className="rounded-xl border bg-white px-2.5 py-2 text-center"
              style={{ borderColor: groupIndex === 0 ? ICON_BORDER : "#E6E7EB" }}
            >
              <div className="text-[10px] font-semibold" style={{ color: groupIndex === 0 ? ICON_BLUE : "#4E525E" }}>
                {group}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  style,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}



const STREAM_PROCESS_CONSTRAINTS = [
  { label: "区域：", detail: "深圳市福田区" },
  { label: "时间：", detail: "2026年4月6日—4月12日" },
  { label: "目标：", detail: "重点企业动态监测报告 · 重点企业章节" },
  { label: "父节点：", detail: "产业动态监测周报 / 第3章" },
] as const;

const STREAM_PROCESS_RETRIEVAL_DETAILS = [
  { tool: "key_ent_monitor", detail: "福田区 · 央企及500强重大投资项目" },
  { tool: "key_ent_monitor", detail: "福田区 · 企业投资平台上线事件" },
  { tool: "all_ent_monitor", detail: "福田区 · 重点企业名单与参建机构" },
  { tool: "联合检索", detail: "福田区 · 产业/企业数据补充" },
] as const;

const STREAM_PROCESS_ROWS = [
  { type: "merge", label: "正在合流", detail: "三工具结果汇入统一候选池" },
  {
    type: "error",
    label: "工具调用失败",
    detail: "big_document_process",
    anchorId: "stream-tool-failure",
    highlight: true,
  },
  { type: "retry", label: "触发重试", detail: "第 1 次 / 上限 2 次", highlight: true },
  { type: "success", label: "重试成功", detail: "完成全局去重与简报提取", highlight: true },
  { type: "generate", label: "正在生成", detail: "章节正文与分类内容" },
  { type: "warning", label: "事实声明", detail: "海洋经济数据不足，未对缺失数据作假设", highlight: true },
] as const;

function StreamProcessEvidence() {
  const iconMap = {
    search: Search,
    tool: Wrench,
    summary: PenLine,
    merge: Layers,
    error: CircleX,
    generate: PenLine,
    gate: GitBranch,
    retry: RotateCcw,
    success: CheckCircle2,
    warning: ShieldCheck,
  };

  return (
    <div
      className="relative w-full max-w-[540px]"
      data-testid="stream-process-evidence"
    >
      <div
        className="relative rounded-2xl border bg-white p-6 shadow-[0_4px_20px_rgba(56,67,92,0.06),0_1px_2px_rgba(56,67,92,0.04)] sm:p-7"
        style={{ borderColor: "#E6E7EB" }}
      >
        {/* 顶部标题栏 */}
        <div className="mb-4 flex items-center justify-between border-b pb-3.5" style={{ borderColor: "#E6E7EB" }}>
          <div className="flex items-center gap-2 text-[16px] font-medium" style={{ color: "#8D94A3" }}>
            <span className="font-semibold text-[#1A1C24]">正在进行生成</span>
            <span>4m56s</span>
          </div>
          <div className="flex items-center gap-1.5 text-[16px] font-medium" style={{ color: "#696D7A" }}>
            <Sparkles className="size-4" style={{ color: BLUE }} />
            <span>实时执行流</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* 识别的本次硬约束 (标黄) */}
          <details className="group" data-testid="stream-process-constraints">
            <summary
              className="relative flex h-11 w-full cursor-pointer list-none items-center justify-between gap-2 rounded-full px-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] transition-all [&::-webkit-details-marker]:hidden"
              style={{ background: "#FFF6CC" }}
            >
              <span className="flex min-w-0 items-center gap-1.5 text-[16px] font-semibold leading-none text-[#8A5A16]">
                <ListChecks className="size-4 shrink-0" strokeWidth={1.8} />
                <span className="truncate">识别的本次硬约束（点击展开）</span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-[#8A5A16] transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
              />
            </summary>

            <div
              className="mt-2 space-y-2 rounded-2xl border border-dashed bg-white/80 p-3.5"
              style={{ borderColor: "#D8DCE6" }}
              data-testid="stream-process-constraint-content"
            >
              {STREAM_PROCESS_CONSTRAINTS.map((constraint) => (
                <div
                  key={constraint.label}
                  className="flex min-w-0 items-center gap-1.5 text-[16px] leading-[1.45]"
                >
                  <span className="shrink-0 font-semibold text-[#8A5A16]">{constraint.label}</span>
                  <span className="min-w-0 truncate text-[#4E525E]" title={constraint.detail}>
                    {constraint.detail}
                  </span>
                </div>
              ))}
            </div>
          </details>

          {/* 已完成 4 路并发检索 (普通白底胶囊) */}
          <details className="group" data-testid="stream-process-retrievals">
            <summary
              className="relative flex h-11 w-full cursor-pointer list-none items-center justify-between gap-2 rounded-full border bg-white px-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] transition-all [&::-webkit-details-marker]:hidden"
              style={{ borderColor: "#E6E7EB" }}
            >
              <span className="flex min-w-0 items-center gap-1.5 text-[16px] font-semibold leading-none text-[#1A1C24]">
                <Search className="size-4 shrink-0" style={{ color: BLUE }} strokeWidth={1.8} />
                <span className="truncate">已完成 4 路并发检索</span>
                <span className="hidden shrink-0 text-[16px] font-normal text-[#696D7A] sm:inline">
                  （福田区产业/企业数据）
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-[#696D7A] transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
              />
            </summary>

            <div
              className="mt-2 space-y-2 rounded-2xl border border-dashed bg-white/80 p-3.5"
              style={{ borderColor: "#D8DCE6" }}
              data-testid="stream-process-retrieval-content"
            >
              {STREAM_PROCESS_RETRIEVAL_DETAILS.map((item) => (
                <div
                  key={`${item.tool}-${item.detail}`}
                  className="flex min-w-0 items-center gap-1.5 text-[16px] leading-[1.45]"
                >
                  <span className="shrink-0 font-semibold text-[#1A1C24]">{item.tool}</span>
                  <span className="text-[#696D7A]">·</span>
                  <span className="min-w-0 truncate text-[#4E525E]" title={item.detail}>
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </details>

          {/* 流程条目 stages */}
          <div className="space-y-2.5 border-t pt-2.5" style={{ borderColor: "#E6E7EB" }} data-testid="stream-process-stages">
            {STREAM_PROCESS_ROWS.map((row, index) => {
              const Icon = iconMap[row.type];
              // 只有与上方重点核验对应的 2 项标黄：触发重试 和 事实声明
              const isYellow = row.type === "retry" || row.type === "warning";

              return (
                <div
                  key={`${row.label}-${row.detail}-${index}`}
                  id={"anchorId" in row ? row.anchorId : undefined}
                  data-prompt-anchor={"anchorId" in row ? "big-document-failure" : undefined}
                  className="flex h-11 w-fit max-w-full items-center gap-1.5 rounded-full px-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)]"
                  style={{
                    background: isYellow ? "#FFF6CC" : "#FFFFFF",
                    border: isYellow ? "1px solid #FDE68A" : "1px solid #E6E7EB",
                  }}
                >
                  <span
                    className="flex shrink-0 items-center gap-1 text-[16px] font-semibold leading-none"
                    style={{ color: isYellow ? "#8A5A16" : "#1A1C24" }}
                  >
                    <Icon className="size-4" strokeWidth={1.8} />
                    {row.label}
                  </span>
                  <span
                    className="min-w-0 truncate text-[16px] leading-none"
                    style={{ color: isYellow ? "#75501A" : "#696D7A" }}
                    title={row.detail}
                  >
                    {row.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部状态条 */}
        <div
          className="mt-4 flex h-12 items-center justify-between rounded-full border bg-white px-4 text-[16px]"
          style={{ borderColor: "#E6E7EB", color: "#8D94A3" }}
        >
          <span className="truncate">小Q正在生成中，生成已耗时24s...</span>
          <span
            className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full border bg-white"
            style={{ borderColor: "#CBCDD4", color: BLUE }}
          >
            <LoaderCircle className="size-4 animate-spin" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </div>
  );
}

const ORIGINAL_MONITOR_PROMPT = [
  "# Role: 重点企业监测报告章节工作流智能体",
  "你是一个服务于企业监测报告生成工作流的专属节点智能体。你的唯一职责是：精准解析当前输入变量，并发调度检索工具，严密执行数据合流、清洗去重与事实校验，严格按阶段状态推进，最终输出结构完全固定的企业监测章节简报。",
  "",
  "## 1. 核心质量与记忆边界红线",
  "- **状态与记忆优先级**：【当前用户输入】 > 【当前阶段显式状态】 > 【历史记忆】 > 【默认规则】。当历史记忆与当前事实、变量存在冲突时，必须无条件抛弃历史记忆，以当前输入为准。",
  "- **事实绝对忠诚**：所有输出必须严格基于工具返回的真实原始数据提取，严禁臆造内容、幻觉扩写或编造事实。",
  "- **主体聚焦**：只保留以【企业主体】为核心的实质性事件，必须剔除其分支机构、子公司或泛行业的边角信息。",
  "- **数据量把控**：全篇有效简报总数优先目标为 20-50 条。坚决宁缺毋滥，客观无数据时以空状态表达，绝不为了凑数而硬编造。",
  "",
  "## 2. ReAct 阶段执行逻辑与状态门禁（强制管线）",
  "你必须按顺序严格执行以下 6 个阶段。未完成当前阶段状态，绝对禁止进入下一阶段或直接输出：",
  "",
  "### Phase 1: Observe / Parse（观察与解析）",
  "- **动作**：解析当前上下文与用户需求，提取核心变量：【分析目标】【分析类别】【分析时间】【地区范围（如有）】【章节/父节点位置（如有）】。",
  "- **门禁**：形成明确的【阶段 1 状态：输入理解参数表】后，方可进入 Phase 2。",
  "",
  "### Phase 2: Parallel Retrieve（并发检索）",
  "- **动作**：必须**并发调用** `key_ent_monitor`、`all_ent_monitor`、`deep_search` 三个本地 MCP 工具，进行第一轮全网动态抓取。",
  "- **禁忌**：严禁按工具分别直接输出结果！严禁串行调用！",
  "- **门禁**：形成【阶段 2 状态：三工具原始结果集合】后，进入 Phase 3。",
  "",
  "### Phase 3: Merge（合流汇总）",
  "- **动作**：将三个工具返回的分散数据，无缝拼装合并为一个【统一候选池】（Unified Candidate Pool）。",
  "- **禁忌**：这是雷打不动的必须节点，严禁跳过合并步骤直连下游。",
  "- **门禁**：形成【阶段 3 状态：统一候选池】后，进入 Phase 4。",
  "",
  "### Phase 4: Process（大文本整理与初步分类）",
  "- **动作**：将【统一候选池】全量数据传给 `big_document_process` 工具，进行内容提炼、全局去重（同一事件保留最权威的一条）、剔除分支机构、提炼出 150-200 字左右的核心简报，并分配到指定分类。",
  "- **异常重试**：如该节点返回为空、格式损坏或抽取失败，最多重试 **2 次**。",
  "- **门禁**：形成【阶段 4 状态：去重与初步分类集合】后，进入 Phase 5。",
  "",
  "### Phase 5: Verify（核验复查与异常补救）",
  "进行输出前的极端清洗与补充：",
  "1. **数据量补救**：若某个分类数据匮乏，允许微调关键词或时间精度发起补充检索，**上限 2 次**。",
  "2. **URL 挂载核验**：逐一审查准备输出的简报是否附带了专属源 URL。",
  "3. **URL 补救与丢弃（硬约束）**：若某条候选数据缺失 URL，必须调用 `deep_search` 回源重查该企业事件，**重试上限 2 次**。若 2 次仍未找到有效 URL，**必须直接丢弃该条数据**。",
  "4. **门禁**：形成【阶段 5 状态：已完成 URL 与真实性核验的最终候选集合】后，进入 Phase 6。",
  "",
  "### Phase 6: Render（最终排版输出）",
  "你必须严格分为两步输出（显式核验层 + 纯正文），绝对禁止把长链路思考过程（Thinking Process）暴露出来。",
  "",
  "#### 步骤 6.1：输出阶段自检清单",
  "必须严格按照以下格式输出审查记录，以证明你没有跳步：",
  "<Verification_Checklist>",
  "- [ ] 变量解析是否完全以当前输入为准，未被历史记忆干扰：是/否",
  "- [ ] 是否执行了合流汇总（Merge）步骤，没有直接暴露单工具结果：是/否",
  "- [ ] 简报是否剔除了分支机构，仅保留企业主体，且字数控制在 150-200 字：是/否",
  "- [ ] 每一条保留的数据是否都通过了 URL 挂载核验，没有合并 URL 也没有文末堆砌：是/否",
  "- [ ] URL 缺失重试或大文本抽取重试是否均遵守了不超过 2 次的限制：是/否",
  "- [ ] 是否彻底排除了总结分析、图表及参考资料列表：是/否",
  "</Verification_Checklist>",
  "",
  "#### 步骤 6.2：输出正文报告",
  "正文不得包含任何过渡语、总结段落、分析结论或数据表格。",
  "",
  "**【固定分类标题】（严禁改写名称与顺序）**",
  "一、获得融资、业务拓展、新品发布类",
  "二、榜单类",
  "三、获奖、获得荣誉类",
  "四、负面信息类",
  "（注：若某分类经核验后无有效数据，必须在该分类下方输出：`当前分类无数据`）",
  "",
  "**【单条简报固定排版格式】**",
  "`（数字序号） 企业名称 事件内容（纯文本，客观准确，剔除分支机构信息，150-200字） 源URL`",
  "（注：每个大类的序号均从（1）开始；必须做到一个企业名称一条200字简报紧跟一个对应 URL）",
  "",
  "---",
  "",
  "## 3. 样例约束 (Few-shot)",
  "",
  "### ✅ 正确样例 (Positive)",
  "<Verification_Checklist>",
  "- [x] 变量解析是否完全以当前输入为准，未被历史记忆干扰：是",
  "- [x] 是否执行了合流汇总（Merge）步骤，没有直接暴露单工具结果：是",
  "- [x] 简报是否剔除了分支机构，仅保留企业主体，且字数控制在 150-200 字：是",
  "- [x] 每一条保留的数据是否都通过了 URL 挂载核验，没有合并 URL 也没有文末堆砌：是",
  "- [x] URL 缺失重试或大文本抽取重试是否均遵守了不超过 2 次的限制：是",
  "- [x] 是否彻底排除了总结分析、图表及参考资料列表：是",
  "</Verification_Checklist>",
  "",
  "一、获得融资、业务拓展、新品发布类",
  "（1）星海科技有限公司 宣布完成数千万元B轮融资，本轮融资由知名风投机构领投，多只产业基金跟投。资金将主要用于加速公司在工业大模型一体机领域的研发进度与市场拓展。星海科技今年已累计发布多款相关核心产品，此次融资后将进一步扩大在华东地区的总部的研发团队规模，并计划在第三季度推出升级版基座模型，持续扩大在工业 AI 落地场景中的占有率，巩固行业优势。 https://news.example.com/item/1122",
  "（2）智远物联股份有限公司 正式发布工业级传感基站V3.0，并宣布全面进军欧洲市场。该产品在低功耗运行和极端环境适应性上实现多项目前沿技术突破，首批超百万美元订单已与德国某大型制造企业正式签署。公司董事会表示，未来将持续推动核心硬件产品的全球化布局，力图在海外工业物联网基础设施领域抢占先机，提升公司在国际市场的核心竞争力。 https://news.example.com/item/3344",
  "",
  "二、榜单类",
  "（1）云端数聚集团 入选“2023年度全国高成长性独角兽榜单TOP50”。该榜单由行业内权威研究机构经过长达三个月的实地调研与多维度评选得出，主要考量企业的核心技术创新力、年度营收增速以及一级市场估值水平。云端数聚凭借在云原生数据库底座领域的突破性技术进展，以及连续两年实现主营业务营收翻倍的优异表现，成功入选该榜单，成为该赛道少数跻身前五十强的新锐科技企业。 https://rank.example.com/list/2023",
  "",
  "三、获奖、获得荣誉类",
  "当前分类无数据",
  "",
  "四、负面信息类",
  "（1）绿野农业集团 因子公司违规排污受到行政处罚从而影响集团重大项目审批。经查明，绿野农业集团在二季度未能有效监管污染处理设施，导致部分工业废水直排进入附近水系。市环保部门在例行水质监测中发现该违规情况，对企业开具罚单并责令立即停产整改。该事件直接导致集团正在申报的市级绿色农业示范项目被无限期搁置，可能会对企业下半年的整体产能规划及相关政策补贴申请造成实质性阻碍。 https://gov.example.com/punish/9988",
  "",
  "---",
  "### ❌ 错误样例 (Negative - 严禁出现此类输出)",
  "*（错误原因分析：带有开篇总结、包含分支机构事件、正文严重不足150字、多个URL被合并、URL在文末统一堆砌、包含主观推测）*",
  "",
  "根据当前信息检索，本月重点监测企业整体表现活跃，以下是具体情况：",
  "一、获得融资、业务拓展、新品发布类",
  "（1）星海科技完成融资，智远物联发布了新基站产品，两家公司发展良好。星海科技的深圳分公司也新招了10个人。[链接1, 链接2]",
  "三、获奖、获得荣誉类",
  "当前暂无相关数据。说明行业正处于静默期，建议投资者持续观望。",
  "【参考来源】",
  "1. https://news.example.com/item/1122",
  "2. https://news.example.com/item/3344",
  "",
  "---",
  "**系统指令**：你已接收工作流上下文，请立刻丢弃任何干扰当前任务的无效记忆，启动 Phase 1 阶段，严格遵循所有门禁推进。",
].join("\n");

function OriginalPromptEvidence() {
  const promptViewportRef = useRef<HTMLPreElement>(null);
  const phaseFourProblemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const promptViewport = promptViewportRef.current;
      const phaseFourProblem = phaseFourProblemRef.current;

      if (!promptViewport || !phaseFourProblem) return;

      const failureRow = document.getElementById("stream-tool-failure");
      const promptRect = promptViewport.getBoundingClientRect();
      const failureRect = failureRow?.getBoundingClientRect();
      const targetRect = phaseFourProblem.getBoundingClientRect();
      const currentTargetCenter = targetRect.top + targetRect.height / 2;
      const desiredTargetCenter =
        failureRect && window.matchMedia("(min-width: 1280px)").matches
          ? failureRect.top + failureRect.height / 2
          : promptRect.top + promptViewport.clientHeight * 0.45;

      promptViewport.scrollTop = Math.max(
        0,
        promptViewport.scrollTop + currentTargetCenter - desiredTargetCenter,
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="w-full min-w-0 self-start">
      <div
        className="flex h-[780px] flex-col overflow-hidden rounded-2xl border bg-white sm:h-[860px]"
        style={{ borderColor: "#E6E7EB" }}
      >
        <div className="flex items-center border-b px-4 py-3.5 md:px-5" style={{ borderColor: "#E6E7EB" }}>
          <div>
            <div className="text-[12px] font-semibold text-[#8D94A3]">原始 Prompt</div>
            <div className="mt-1 text-[16px] font-semibold text-[#1A1C24]">重点企业监测报告章节工作流智能体</div>
          </div>
        </div>
        <pre
          ref={promptViewportRef}
          className="min-h-0 flex-1 overflow-hidden whitespace-pre-wrap break-words px-4 py-4 font-sans text-[12px] leading-[1.75] text-[#4E525E] md:px-5"
        >
          {ORIGINAL_MONITOR_PROMPT.split("\n").map((line, index, lines) => {
            const isPhaseFourProblem =
              line.startsWith("- **异常重试**：如该节点返回为空") ||
              line.startsWith("- **门禁**：形成【阶段 4 状态");
            const isPhaseFourProblemAnchor = line.startsWith("- **异常重试**：如该节点返回为空");

            return (
              <span
                key={`${index}-${line.slice(0, 24)}`}
                ref={isPhaseFourProblemAnchor ? phaseFourProblemRef : undefined}
                data-prompt-anchor={isPhaseFourProblemAnchor ? "phase-4-failure-rule" : undefined}
                className={isPhaseFourProblem ? "rounded bg-[#FFF0F1] px-1 text-[#C52B32]" : undefined}
              >
                {line}
                {index < lines.length - 1 ? "\n" : ""}
              </span>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

function OutlineConfirmFrame({
  className = "",
  style,
  contentTranslate = 0,
  contentXTranslate = 0,
  contentOpacity = 1,
  showShell = true,
  showContent = true,
}: {
  className?: string;
  style?: CSSProperties;
  contentTranslate?: number;
  contentXTranslate?: number;
  contentOpacity?: number;
  showShell?: boolean;
  showContent?: boolean;
}) {
  const frameChrome = showShell
    ? "overflow-hidden rounded-[24px] border border-white/80 shadow-[0_28px_80px_rgba(15,20,25,0.14)]"
    : "overflow-visible";

  return (
    <div
      className={`absolute inset-0 m-auto ${frameChrome} ${className}`}
      style={{ aspectRatio: "16 / 10", ...style }}
    >
      {showShell && (
        <img
          src="./images/ai-report-flow-webp/step-02-final-outline.webp"
          alt="章节大纲确认页面外层框架"
          {...DETAIL_IMAGE_LAZY_PROPS}
          className="absolute inset-0 h-full w-full object-contain object-top"
        />
      )}
      {showContent && <div className="absolute left-[30.9%] top-[7.4%] h-[88.5%] w-[52.1%] overflow-hidden">
        <img
          src="./images/ai-report-flow-webp/step-02-final-outline-02.webp"
          alt="章节大纲确认完整内容"
          {...DETAIL_IMAGE_LAZY_PROPS}
          className="block w-full max-w-none object-contain object-top"
          style={{
            opacity: contentOpacity,
            transform: `translate3d(${contentXTranslate}%, ${contentTranslate}%, 0)`,
          }}
        />
      </div>}
    </div>
  );
}

export function ProjectDetail({ onBack }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [flowProgress, setFlowProgress] = useState(0);
  const [heroToggleIndex, setHeroToggleIndex] = useState(0);
  const [activeValidationIndex, setActiveValidationIndex] = useState(0);
  const [activeInterview, setActiveInterview] = useState<number | null>(null);
  const flowSectionRef = useRef<HTMLElement | null>(null);
  const flowStageRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);

  const heroToggleImages = [
    "./images/ai-report-hero-toggle-01.webp",
    "./images/ai-report-hero-toggle-02.webp",
  ];
  const heroToggleCaptions = [
    "学习文档风格，生成一致表达",
    "理解原文风格，完成结构化仿写",
  ];

  const validationPanels = [
    {
      label: "问题来源",
      summary: "我通过访谈收集的一些问题",
      heroCard: {
        icon: Users,
        title: "用户需要的不是写作工具，而是可控流程",
        desc: "访谈反复指向四个控制点：报告口径、企业范围、章节结构和来源依据。",
        meta: "访谈洞察",
      },
      cards: [
        { icon: Compass, title: "需求经常变化", desc: "地区、产业、企业范围和章节重点变化后，固定模板很难直接复用。", tag: "需求变化" },
        { icon: Database, title: "材料分散在多工具里", desc: "企业名单和统计口径在 Excel，正文和格式在 Word，信息难以沉淀复用。", tag: "材料分散" },
        { icon: ListChecks, title: "结构偏差会返工", desc: "大纲和章节重点如果没有提前确认，正文完成后再改成本很高。", tag: "结构确认" },
        { icon: ShieldCheck, title: "来源需要反复校对", desc: "企业名称、动态来源和引用链接都要核查，否则报告可信度会下降。", tag: "可信校验" },
      ],
    },
    {
      label: "设计方案",
      summary: "从访谈问题转成生成控制点",
      heroCard: {
        icon: FileText,
        title: "区域企业动态监测周报",
        desc: "以招商办高频周报为验证对象，检验系统能否在结构、范围和来源都受控的情况下持续生成业务材料。",
        meta: "验证场景",
      },
      cards: [
        { icon: Layers, title: "结构相对固定", desc: "周报栏目稳定，可由报告模板和章节大纲承接。", tag: "模板中心" },
        { icon: Settings2, title: "企业范围可配置", desc: "支持系统筛选、重点企业选择或名单上传。", tag: "范围控制" },
        { icon: Link2, title: "结果可追溯", desc: "保留企业名称、动态项和来源链接。", tag: "来源依据" },
        { icon: Sparkles, title: "结果可复用", desc: "生成后的报告沉淀为历史文档，便于持续迭代。", tag: "业务周报" },
      ],
    },
  ];

  const journeyStages = [
    {
      stage: "任务定义",
      control: "可控感中等",
      x: 10,
      y: 28,
      emotions: [
        { src: "./images/用户画像/表情/01.svg", offsetX: -22, offsetY: 0, zIndex: 1 },
        { src: "./images/用户画像/表情/02.svg", offsetX: 24, offsetY: 0, zIndex: 2 },
      ],
      calloutTop: 60,
      calloutPosition: "below",
      pain: "任务已定义，但需求变化仍需收敛。",
      solution: "将报告口径前置为类型、地区、产业和周期配置。",
    },
    {
      stage: "材料整理",
      control: "可控感低",
      x: 30,
      y: 60,
      emotions: [{ src: "./images/用户画像/表情/02.svg", offsetX: 0, offsetY: 0, zIndex: 2 }],
      calloutTop: 31,
      calloutPosition: "above",
      pain: "材料分散，输入口径难统一。",
      solution: "支持材料导入、名单上传和历史引用。",
    },
    {
      stage: "生成前确认",
      control: "可控感高",
      x: 50,
      y: 60,
      emotions: [{ src: "./images/用户画像/表情/02.svg", offsetX: 0, offsetY: 0, zIndex: 2 }],
      calloutTop: 5,
      calloutPosition: "above",
      pain: "范围与大纲已确认，生成方向更稳定。",
      solution: "先确认范围与大纲，再进入正文生成。",
    },
    {
      stage: "内容生成",
      control: "可控感中低",
      x: 70,
      y: 76,
      emotions: [{ src: "./images/用户画像/表情/03.svg", offsetX: 0, offsetY: 0, zIndex: 2 }],
      calloutTop: 42,
      calloutPosition: "above",
      pain: "正文生成仍是黑箱，过程可见度最低。",
      solution: "拆成分步生成、节点状态和局部重生成。",
    },
    {
      stage: "核查交付",
      control: "最低后回升",
      x: 90,
      y: 50,
      emotions: [
        { src: "./images/用户画像/表情/03.svg", offsetX: -22, offsetY: 0, zIndex: 1 },
        { src: "./images/用户画像/表情/02.svg", offsetX: 24, offsetY: 0, zIndex: 2 },
      ],
      calloutTop: 61,
      calloutPosition: "below",
      pain: "来源可核查后，交付信心回升。",
      solution: "绑定来源链接、引用卡片和历史报告。",
    },
  ];

  const journeyPathSegments = [
    "M 10 28 C 17 32 23 58 30 60",
    "M 30 60 C 37 62 43 60 50 60",
    "M 50 60 C 57 60 63 74 70 76",
    "M 70 76 C 77 76 84 52 90 50",
  ];
  const journeyPath = journeyPathSegments.join(" ");

  const interviewDetailContent = [
    {
      round: "第一轮访谈",
      title: "最近一次报告任务回溯",
      goal: "通过最近一次真实任务，梳理需求来源、生产流程与交付方式。",
      points: [
        "报告完成时间与类型",
        "需求由谁提出，以及最初要求和材料",
        "从接到任务到审核交付的具体步骤",
        "使用的工具与数据来源",
        "最耗时、最易返工或最没把握的环节",
      ],
      conclusion: (
        <>
          <span className="ai-report-marker-highlight">
            用户真正的时间消耗不在“写报告”，而在“准备写报告”。
          </span>
          {"材料分散在多个网站、时效难判断、找完还要分类——这一步普遍要花半天以上。格式一旦变化，之前积累的所有措辞和段落结构全部失效，相当于重新来过。"}
        </>
      ),
    },
    {
      round: "第二轮访谈",
      title: "竞品案例讨论与产品机会识别",
      goal: "基于项目当时的豆包、天工版本，用具体案例帮助用户表达对 AI 生成与资料处理的期待与顾虑。",
      points: [
        "天工当时的生成内容可控性不足，且该版本缺少知识库能力",
        "豆包当时对本地文件的解析效果不够稳定",
        "天工和豆包在生成前提供范围与结构确认，这一机制值得吸收",
        "用户还需要查看生成内容对应的材料与来源",
      ],
      conclusion: (
        <>
          {"用户在竞品演示中对“生成前先确认范围和结构”这个机制反应最强烈——这说明"}
          <span className="ai-report-marker-highlight">
            用户核心焦虑不是“AI写得好不好”，而是“AI会不会跑偏”。
          </span>
          {"同时本地文件解析不稳定是明确的产品机会点，结合公司OCR能力有差异化空间。"}
        </>
      ),
    },
    {
      round: "第三轮访谈",
      title: "低保真原型图讨论",
      goal: "使用低保真原型图与用户讨论主要流程和功能边界，确认方向是否贴近真实工作方式。",
      points: [
        "模板、范围与大纲配置是否易理解",
        "用户是否清楚当前生成阶段",
        "生成结果如何查看、修改与继续使用",
        "历史报告如何保存、查找与复用",
        "内容来源如何查看和核查",
      ],
      conclusion: (
        <>
          {"原型方向整体成立，但讨论中暴露了两个初期规划外的需求：1. 历史报告的查找和复用需求比预期强烈，用户希望"}
          <span className="ai-report-marker-highlight">“这次的报告下次能直接改”</span>
          {"；2. 来源核查的诉求不只是"}
          <span className="ai-report-marker-highlight">“能看到链接”</span>
          {"，用户还需要知道"}
          <span className="ai-report-marker-highlight">“这段内容是从哪条材料里来的”</span>
          {"。这两点推动了历史文档管理模块和来源引用卡片的设计优先级。"}
        </>
      ),
    },
  ];
  const activeInterviewDetail =
    activeInterview === null ? null : interviewDetailContent[activeInterview];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroToggleIndex((current) => (current + 1) % heroToggleImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroToggleImages.length]);

  // Flow step data for s03 interactive module
  const flowSteps = [
    {
      label: "模板选择",
      tagline: "明确报告场景",
      icon: FileText,
      placeholder: "模板中心页面",
      finalImage: "./images/ai-report-flow-webp/step-01-final-template-center.webp",
      callouts: [],
      decision: "先让用户选择报告类型，而不是直接输入需求。",
      why: "让报告生成从明确场景进入，降低用户不知道如何开始的问题。",
    },
    {
      label: "大纲生成",
      tagline: "先定结构",
      icon: GitBranch,
      placeholder: "章节大纲生成页面",
      finalImage: "./images/ai-report-flow-webp/step-02-final-outline.webp",
      compactCanvas: true,
      decision: "系统先生成章节大纲，再进入正文生成。",
      why: "把控制点前置，避免用户等到全文生成后才发现结构不对。",
    },
    {
      label: "用户确认",
      tagline: "确认方向",
      icon: CheckCircle2,
      placeholder: "大纲确认页面",
      image: "./images/ai-report-flow-webp/step-02-final-outline-02.webp",
      scrollContent: true,
      decision: "用户可配置报告标题、监测范围、产业、维度，确认后进入生成。",
      why: "把复杂配置拆成可理解的操作，让用户在生成前控制输入边界。",
    },
    {
      label: "流式生成",
      tagline: "过程可见",
      icon: Sparkles,
      placeholder: "报告生成中页面",
      decision: "正文按章节流式生成，让生成过程可见。",
      why: "减少等待焦虑，让用户知道系统正在按照确认后的结构输出内容。",
    },
    {
      label: "历史文档",
      tagline: "沉淀结果",
      icon: History,
      placeholder: "历史文档页面",
      decision: "生成后的报告进入历史文档，方便查看、复用和后续迭代。",
      why: "对于高频周报场景，报告不是一次性结果，而是需要持续沉淀的业务材料。",
    },
  ];

  const flowConfigCards = [
    {
      title: "报告标题",
      body: "福田区区域监测报告",
      primaryTags: [],
      mutedTags: [],
      className: "left-[22%] top-[7%]",
      fromX: -80,
      fromY: 6,
      mergeX: 280,
      mergeY: 180,
      variant: "title",
    },
    {
      title: "一、区域企业监测",
      body: "覆盖全量企业主体，采集工商注册、经营状况、纳税信用、创新能力等多维数据",
      primaryTags: ["深圳市-福田区", "2026.01.01-01.07"],
      mutedTags: ["央企", "世界500强", "中国各类500强", "+添加企业"],
      className: "left-[18%] top-[32%]",
      fromX: -130,
      fromY: 10,
      mergeX: 300,
      mergeY: 60,
    },
    {
      title: "二、区域重点产业监测",
      body: "聚焦主导产业和战略性新兴产业，跟踪产业链供应链运行态势及市场竞争力",
      primaryTags: [],
      mutedTags: ["软件与信息技术服务", "智能机器人", "集成电路", "+4"],
      className: "right-[10%] top-[8%]",
      fromX: 90,
      fromY: -8,
      mergeX: -280,
      mergeY: 180,
    },
    {
      title: "三、重点对标区域动态监测",
      body: "选取标杆区域持续比较经济指标、产业发展、营商环境等关键维度",
      primaryTags: ["深圳市-罗湖区", "深圳市-宝安区", "深圳市-龙岗区"],
      mutedTags: ["新发布政策", "重大招商引资项目", "新设立的产业基金"],
      className: "right-[9%] top-[58%]",
      fromX: 100,
      fromY: 16,
      mergeX: -300,
      mergeY: -80,
    },
    {
      title: "添加章节",
      body: "继续补充报告结构",
      primaryTags: [],
      mutedTags: [],
      className: "left-[42%] bottom-[7%]",
      fromX: -50,
      fromY: 14,
      mergeX: 80,
      mergeY: -220,
      variant: "add",
    },
  ];

  useGSAP(
    () => {
      const section = flowSectionRef.current;
      const stage = flowStageRef.current;
      if (!section || !stage) return;

      const proxy = { value: 0 };
      let lastProgress = -1;

      gsap.to(proxy, {
        value: 1,
        ease: "none",
        onUpdate: () => {
          const nextProgress = Number(proxy.value.toFixed(4));
          if (Math.abs(nextProgress - lastProgress) < 0.001) return;
          lastProgress = nextProgress;
          setFlowProgress(nextProgress);

          const nextStep = Math.min(flowSteps.length - 1, Math.floor(nextProgress * flowSteps.length));
          if (activeStepRef.current !== nextStep) {
            activeStepRef.current = nextStep;
            setActiveStep(nextStep);
          }
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 4.8, 4200)}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          refreshPriority: 0,
        },
      });
    },
    { scope: flowSectionRef, dependencies: [flowSteps.length] }
  );

  const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
  const lerp = (from: number, to: number, progress: number) => from + (to - from) * clamp01(progress);
  const rangeProgress = (value: number, start: number, end: number) => {
    if (end === start) return value >= end ? 1 : 0;
    return clamp01((value - start) / (end - start));
  };
  const stepCount = flowSteps.length;
  const lastStepIndex = stepCount - 1;
  const rawFlowStep = Math.min(flowSteps.length - 1, flowProgress * flowSteps.length);
  const stepLocalProgress = (index: number) => {
    const start = index / stepCount;
    const end = index === lastStepIndex ? 1 : (index + 1) / stepCount;
    return rangeProgress(flowProgress, start, end);
  };
  const layerPresence = (index: number) => {
    const start = index / stepCount;
    const end = index === lastStepIndex ? 1 : (index + 1) / stepCount;
    const fadeWindow = 0.025;
    const fadeIn = index === 0 ? 1 : rangeProgress(flowProgress, start, Math.min(end, start + fadeWindow));
    const fadeOut = index === lastStepIndex ? 0 : rangeProgress(flowProgress, Math.max(start, end - fadeWindow), end);
    return clamp01(fadeIn * (1 - fadeOut));
  };

  return (
    <div className="relative z-10">
      {/* ===== 01. HERO / Overview — centered product hero ===== */}
      <section
        id="s01"
        className={`relative pt-28 md:pt-32 pb-10 md:pb-14 ${SECTION_PAD} overflow-visible`}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-[-220px] z-0 h-[calc(100%+520px)] w-[150vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 54% 42% at 50% 38%, rgba(229,235,255,0.66) 0%, rgba(250,251,255,0.34) 38%, rgba(250,251,255,0) 76%), radial-gradient(ellipse 34% 32% at 70% 35%, rgba(168,190,255,0.30) 0%, rgba(168,190,255,0.12) 42%, rgba(168,190,255,0) 82%), radial-gradient(ellipse 36% 34% at 76% 55%, rgba(232,210,255,0.30) 0%, rgba(232,210,255,0.11) 45%, rgba(232,210,255,0) 84%), radial-gradient(ellipse 36% 34% at 28% 56%, rgba(255,239,205,0.32) 0%, rgba(255,239,205,0.12) 46%, rgba(255,239,205,0) 86%)",
          }}
        />
        <BlueAccentBlob side="right" />
        <div className="relative mx-auto w-full max-w-[1320px]">
          <div className="mx-auto max-w-[1060px] text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="whitespace-nowrap tracking-tight text-neutral-900"
              style={{ ...T.h1, fontSize: "clamp(34px, 3.6vw, 44px)", lineHeight: 1.14 }}
            >
              <span><span style={{ color: "#2258F4" }}>Qsight</span> — AI 多场景报告生成平台</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-4 max-w-[980px]"
              style={T.heroSub}
            >
              面向企业、产业和地区监测报告，将模板选择、大纲确认、数据配置、流式生成和历史文档串成完整流程，让用户在生成前控制范围，生成中看到进度，生成后复用结果。
            </motion.p>

          </div>

          <motion.figure
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.78, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-9 max-w-[1060px] overflow-visible rounded-[32px]"
          >
            <img
              src="./images/ai-report-hero-full.webp"
              alt="AI 报告生成产品完整界面"
              {...DETAIL_IMAGE_EAGER_PROPS}
              className="block h-auto w-full rounded-[32px] border border-white/80 object-contain shadow-[0_30px_90px_rgba(15,20,25,0.14)]"
            />

            {/* Decorative placeholder thumbnails around hero */}
            <div className="absolute top-[10%] -left-[18%] z-10 w-[20%] max-w-[190px]">
              <img
                src="./images/ai-repor- left-01.webp"
                alt="模板中心截图"
                {...DETAIL_IMAGE_LAZY_PROPS}
                className="w-full overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(15,20,25,0.12)]"
                style={{ transform: "rotate(-6deg) scale(1.3)", transformOrigin: "center" }}
              />
            </div>

            <div className="absolute top-[8%] -right-[14%] z-10 w-[18%] max-w-[170px]">
              <img
                src="./images/ai- report-right-01.webp"
                alt="监测维度配置截图"
                {...DETAIL_IMAGE_LAZY_PROPS}
                className="w-full overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(15,20,25,0.12)]"
                style={{ transform: "rotate(-4deg) scale(1.4)", transformOrigin: "center" }}
              />
            </div>

            <div className="absolute bottom-[14%] -right-[4%] z-10 w-[32%] min-w-[260px] max-w-[340px]">
              <div
                className="relative w-full rounded-[28px] bg-white pb-3 shadow-[0_18px_54px_rgba(15,20,25,0.18)] ring-1 ring-black/5"
                style={{ transform: "rotate(6deg)" }}
              >
                <div className="relative overflow-hidden rounded-[20px] bg-[#F8FAFF]" style={{ aspectRatio: "366 / 204" }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroToggleImages[heroToggleIndex]}
                      src={heroToggleImages[heroToggleIndex]}
                      alt="AI 报告生成局部状态"
                      {...DETAIL_IMAGE_LAZY_PROPS}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, x: 18, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -18, filter: "blur(4px)" }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                </div>
                <div className="mt-3 text-center text-[13px] font-medium leading-[1.35] text-[#1A1C24]">
                  {heroToggleCaptions[heroToggleIndex]}
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  {heroToggleImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`切换到第 ${index + 1} 张状态图`}
                      onClick={() => setHeroToggleIndex(index)}
                      className="flex h-4 w-7 items-center justify-center rounded-full"
                    >
                      <span
                        className={`h-2 rounded-full transition-all duration-300 ${
                          heroToggleIndex === index ? "w-7 bg-[#2258F4]" : "w-5 bg-[#DDE3F2]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.figure>

        </div>
      </section>

      {/* ===== 02. Role & Responsibilities ===== */}
      <section
        id="s02-role"
        className={`relative pt-8 pb-12 md:pt-10 md:pb-16 ${SECTION_PAD}`}
      >
        <div className={`mx-auto w-full max-w-[1400px] ${READ}`}>
          <Reveal delay={0.08} y={16}>
            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-8">
              {/* Left: Role Note */}
              <article
                aria-label="我的角色"
                className="relative flex flex-col justify-between rounded-[8px] border p-7 pt-9 shadow-[0_2px_4px_rgba(28,36,52,0.06),0_10px_22px_rgba(28,36,52,0.04)] transition-transform duration-200 hover:-translate-y-1 sm:p-8 sm:pt-10 lg:w-[400px] lg:shrink-0"
                style={{
                  backgroundColor: "#FFFEF8",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.14) 32px)",
                  borderColor: "#DED9CE",
                  transform: "rotate(-0.8deg)",
                }}
              >
                {/* Mini Sticky Note Tab: 我的角色 */}
                <div
                  className="absolute -top-4 left-6 z-20 flex items-center justify-center rounded-[3px] border px-4 py-1 shadow-[0_2px_6px_rgba(44,59,91,0.12)] sm:left-8"
                  style={{
                    backgroundColor: "#EEF4FF",
                    borderColor: "#C8D4FF",
                    transform: "rotate(-1.5deg)",
                  }}
                >
                  <span className="text-[16px] font-bold text-[#1A42B8]">我的角色</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-[26px] font-bold tracking-tight text-[#1A1C24]">
                    产品设计师
                  </h3>

                  <p className="mt-2 text-[17px] font-medium text-[#35404F]">
                    AI 报告核心体验设计
                  </p>

                  <p className="mt-4 text-[16px] leading-[1.75] text-[#4E525E]">
                    参与前期用户需求与业务流程梳理，负责核心交互方案与 Prompt 基础结构设计，并跟进后续开发与测试验收。
                  </p>
                </div>
              </article>

              {/* Right: Responsibilities Note */}
              <article
                aria-label="我的职责"
                className="relative flex-1 rounded-[8px] border p-7 pt-9 shadow-[0_2px_4px_rgba(28,36,52,0.06),0_10px_22px_rgba(28,36,52,0.04)] transition-transform duration-200 hover:-translate-y-1 sm:p-8 sm:pt-10 lg:p-9 lg:pt-10"
                style={{
                  backgroundColor: "#FFFEF9",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.14) 32px)",
                  borderColor: "#DED9CE",
                  transform: "rotate(0.6deg)",
                }}
              >
                {/* Mini Sticky Note Tab: 我的职责 */}
                <div
                  className="absolute -top-4 left-6 z-20 flex items-center justify-center rounded-[3px] border px-4 py-1 shadow-[0_2px_6px_rgba(44,59,91,0.12)] sm:left-8"
                  style={{
                    backgroundColor: "#FFF9E8",
                    borderColor: "#EAD7A8",
                    transform: "rotate(1.2deg)",
                  }}
                >
                  <span className="text-[16px] font-bold text-[#A85A16]">我的职责</span>
                </div>

                <div className="relative z-10">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {[
                      {
                        title: "用户研究与范围收敛",
                        desc: "参与 3 轮用户访谈，梳理报告生产链路并推动 MVP 边界确认",
                        dotColor: "#2258F4",
                      },
                      {
                        title: "核心体验与界面设计",
                        desc: "负责模板选择、大纲确认、数据配置、流式生成与历史文档等关键流程",
                        dotColor: "#6366F1",
                      },
                      {
                        title: "AI 生成规则梳理",
                        desc: "搭建 Prompt 基础框架，确定输入约束、监测生成阶段的行动方式",
                        dotColor: "#A85A16",
                      },
                      {
                        title: "开发协作与设计验收",
                        desc: "跟进研发实现与还原质量，推动 1.0 版本落地上线",
                        dotColor: "#2F7A44",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <span
                          className="mt-2.5 size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: item.dotColor }}
                        />
                        <div>
                          <h4 className="text-[18px] font-semibold text-[#1A1C24]">
                            {item.title}
                          </h4>
                          <p className="mt-1.5 text-[16px] leading-[1.7] text-[#4E525E]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ===== 03. Product scope and user goals ===== */}
      <section
        id="s03-product-scope"
        className={`relative overflow-x-clip ${SECTION_PAD}`}
      >
        <div className={`mx-auto flex w-full max-w-[1400px] flex-col py-16 md:py-20 ${READ}`}>
          <div className="mx-auto mb-10 max-w-[940px] text-center md:mb-12">
            <h2 className="tracking-tight text-[#1A1C24]" style={T.h2}>
              确定产品范围和用户目标
            </h2>
          </div>

          <div className="relative overflow-visible rounded-[28px] border border-[#E6E7EB] bg-white">
            <div className="relative min-h-[1940px] rounded-[27px] bg-white sm:min-h-[1760px] md:min-h-[1700px] lg:h-[960px] lg:min-h-0 lg:aspect-auto 2xl:h-[820px]">
              <div
                aria-hidden="true"
                className="absolute bottom-3 left-7 right-3 top-7 rounded-[18px] border border-[#E6E7EB] sm:bottom-4 sm:left-8 sm:right-4 sm:top-8"
              >
                <div
                  className="absolute inset-0 rounded-[17px]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    backgroundImage:
                      "linear-gradient(rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(rgba(107, 120, 150, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.035) 1px, transparent 1px)",
                    backgroundSize: "112px 112px, 112px 112px, 28px 28px, 28px 28px",
                  }}
                />

                <div className="absolute inset-x-0 top-0 grid -translate-y-[calc(100%+9px)] grid-cols-17 px-1">
                  {Array.from({ length: 17 }, (_, index) => String(index).padStart(2, "0")).map((mark) => (
                    <span
                      key={mark}
                      className="relative text-center text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                    >
                      {mark}
                      <span className="absolute left-1/2 top-[calc(100%+3px)] h-1.5 w-px -translate-x-1/2 bg-[#AAB2C2]" />
                    </span>
                  ))}
                </div>

                <div className="absolute inset-y-0 left-0 grid -translate-x-[calc(100%+9px)] grid-rows-10 py-1">
                  {Array.from({ length: 10 }, (_, index) => String(index).padStart(2, "0")).map((mark) => (
                    <span
                      key={mark}
                      className="relative flex items-center justify-end text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                    >
                      {mark}
                      <span className="absolute left-[calc(100%+3px)] top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#AAB2C2]" />
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                aria-label="研究访谈范围"
                aria-hidden={activeInterview !== null}
                animate={{ opacity: activeInterview === null ? 1 : 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className={`absolute left-[52px] top-[52px] z-10 flex flex-wrap items-center gap-x-7 gap-y-3 sm:left-16 sm:top-16 ${activeInterview === null ? "" : "pointer-events-none"}`}
              >
                {[
                  {
                    label: "1 家客户",
                    color: "#E5EBFF",
                    rotation: "-1.2deg",
                    wrapperTransform: "translateY(0) rotate(-0.7deg)",
                    clipPath: "polygon(1% 18%, 10% 10%, 24% 15%, 38% 7%, 55% 13%, 70% 5%, 86% 12%, 99% 8%, 97% 88%, 82% 94%, 65% 89%, 48% 96%, 31% 90%, 14% 95%, 2% 86%)",
                  },
                  {
                    label: "4 位业务参与者",
                    color: "#F3E7FF",
                    rotation: "0.8deg",
                    wrapperTransform: "translateY(9px) rotate(0.8deg)",
                    clipPath: "polygon(2% 10%, 18% 15%, 34% 7%, 51% 12%, 67% 5%, 83% 13%, 99% 9%, 97% 91%, 80% 87%, 62% 95%, 45% 89%, 27% 96%, 10% 90%, 1% 94%)",
                  },
                  {
                    label: "3 轮访谈",
                    color: "#FFF6DB",
                    rotation: "-0.5deg",
                    wrapperTransform: "translateY(3px) rotate(-0.4deg)",
                    clipPath: "polygon(1% 14%, 15% 7%, 30% 13%, 46% 6%, 63% 12%, 79% 5%, 98% 11%, 99% 88%, 84% 95%, 68% 89%, 50% 96%, 33% 90%, 17% 94%, 2% 87%)",
                  },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="relative inline-flex whitespace-nowrap px-1 text-[16px] font-medium leading-[1.5] text-[#4E525E] sm:text-[18px] lg:text-[20px]"
                    style={{ transform: item.wrapperTransform }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 z-0 h-[58%] origin-center"
                      style={{
                        backgroundColor: item.color,
                        clipPath: item.clipPath,
                        transform: `rotate(${item.rotation})`,
                      }}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </span>
                ))}
              </motion.div>

              <motion.div
                aria-label="四位业务参与者"
                aria-hidden={activeInterview !== null}
                animate={{ opacity: activeInterview === null ? 1 : 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className={`absolute left-[52px] right-6 top-[124px] z-10 flex flex-wrap items-start gap-3 sm:left-16 sm:right-8 sm:gap-4 lg:right-[41%] ${activeInterview === null ? "" : "pointer-events-none"}`}
              >
                {[
                  { file: "01.webp", rotation: "-3.2deg", offsetX: "0px", offsetY: "0px", tapeColor: "rgba(202, 216, 225, 0.72)", tapeLeft: "8%", tapeTop: "0", tapeWidth: "30%", tapeRotation: "-7deg" },
                  { file: "02.webp", rotation: "2.6deg", offsetX: "6px", offsetY: "20px", tapeColor: "rgba(213, 224, 207, 0.7)", tapeLeft: "18%", tapeTop: "0", tapeWidth: "27%", tapeRotation: "5deg" },
                  { file: "03.webp", rotation: "-2.2deg", offsetX: "-5px", offsetY: "-4px", tapeColor: "rgba(207, 220, 226, 0.68)", tapeLeft: "52%", tapeTop: "0", tapeWidth: "32%", tapeRotation: "-4deg" },
                  { file: "04.webp", rotation: "3deg", offsetX: "4px", offsetY: "26px", tapeColor: "rgba(218, 226, 210, 0.72)", tapeLeft: "62%", tapeTop: "0", tapeWidth: "28%", tapeRotation: "7deg" },
                ].map((participant, index) => (
                  <figure
                    key={participant.file}
                    className="relative flex aspect-square w-28 items-center justify-center rounded-[3px] border border-[#E6E7EB] bg-white p-1.5 shadow-[0_3px_10px_rgba(28,36,52,0.07)] sm:w-36 lg:w-40"
                    style={{
                      transform: `translate(${participant.offsetX}, ${participant.offsetY}) rotate(${participant.rotation})`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute z-10 h-[15px] shadow-[0_1px_2px_rgba(55,67,74,0.08)] sm:h-[17px] lg:h-5"
                      style={{
                        left: participant.tapeLeft,
                        top: participant.tapeTop,
                        width: participant.tapeWidth,
                        backgroundColor: participant.tapeColor,
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02) 42%, rgba(72,87,94,0.05))",
                        clipPath:
                          "polygon(2% 12%, 13% 5%, 28% 10%, 43% 3%, 58% 9%, 73% 4%, 98% 11%, 96% 88%, 82% 94%, 67% 89%, 51% 97%, 36% 91%, 20% 96%, 3% 87%)",
                        transform: `translateY(-50%) rotate(${participant.tapeRotation})`,
                      }}
                    />
                    <img
                      src={`./images/ai报告人物动画webp/${participant.file}`}
                      alt={`业务参与者 ${index + 1}`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ))}
              </motion.div>

              <div
                aria-label="三轮访谈记录"
                className="absolute left-[52px] right-6 top-[450px] z-20 flex flex-col gap-8 overflow-visible sm:left-16 sm:right-8 sm:top-[500px] md:top-[490px] lg:left-auto lg:right-[8%] lg:top-[90px] lg:w-[39%] lg:max-w-[450px] lg:gap-4"
                onPointerLeave={() => setActiveInterview(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveInterview(null);
                  }
                }}
              >
                {[
                  {
                    round: "第一轮访谈",
                    title: "还原真实任务",
                    body: "从最近一次报告切入，确认需求由谁提出、如何完成，以及谁负责审核交付。",
                    conclusion: "材料准备才是最大的时间黑洞，格式变化让所有积累归零。",
                    color: "#FFFEF7",
                    borderColor: "#DED9CE",
                    transform: "translate(-2px, 0) rotate(-0.8deg)",
                    tapeColor: "rgba(202, 216, 225, 0.72)",
                    tapeLeft: "8%",
                    tapeWidth: "40%",
                    tapeRotation: "-5deg",
                  },
                  {
                    round: "第二轮访谈",
                    title: "验证产品方向",
                    body: "对比当时豆包、天工在生成控制、知识库、本地文件解析与生成前确认上的体验差异。",
                    conclusion: "用户焦虑的不是 AI 写不好，而是 AI 会跑偏，控制感前置是核心机会。",
                    color: "#EEF4FF",
                    borderColor: "#C9D8F4",
                    transform: "translate(8px, 8px) rotate(0.8deg)",
                    tapeColor: "rgba(214, 224, 208, 0.72)",
                    tapeLeft: "51%",
                    tapeWidth: "38%",
                    tapeRotation: "4deg",
                  },
                  {
                    round: "第三轮访谈",
                    title: "低保真原型图讨论",
                    body: "结合低保真原型图讨论真实使用方式，围绕历史材料复用共同推演文档管理与知识库机会。",
                    conclusion: "历史复用和来源溯源的优先级高于预期，成为模块立项的直接依据。",
                    color: "#F1F8EA",
                    borderColor: "#C7D9B8",
                    transform: "translate(24px, 18px) rotate(-0.6deg)",
                    tapeColor: "rgba(207, 220, 226, 0.7)",
                    tapeLeft: "27%",
                    tapeWidth: "46%",
                    tapeRotation: "-3deg",
                  },
                ].map((interview, index) => (
                  <div
                    key={interview.round}
                    className="relative overflow-visible"
                    style={{ transform: interview.transform }}
                  >
                    <motion.article
                      tabIndex={0}
                      aria-label={`${interview.round}：${interview.title}，查看访谈详情`}
                      className="relative cursor-pointer overflow-visible rounded-[8px] border px-5 pb-5 pt-7 outline-none focus-visible:ring-2 focus-visible:ring-[#85A3FF] focus-visible:ring-offset-2 sm:px-6 sm:pb-6 sm:pt-8 lg:px-5 lg:pb-5"
                      style={{
                        backgroundColor: interview.color,
                        borderColor: interview.borderColor,
                      }}
                      animate={{
                        y: activeInterview === index ? -7 : 0,
                        scale: activeInterview === index ? 1.015 : 1,
                        boxShadow:
                          activeInterview === index
                            ? "0 10px 24px rgba(28,36,52,0.11)"
                            : "0 5px 14px rgba(28,36,52,0.065)",
                      }}
                      transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.65 }}
                      onPointerEnter={() => {
                        if (window.matchMedia("(min-width: 1024px)").matches) {
                          setActiveInterview(index);
                        }
                      }}
                      onFocus={() => {
                        if (window.matchMedia("(min-width: 1024px)").matches) {
                          setActiveInterview(index);
                        }
                      }}
                      onClick={() => {
                        if (
                          window.matchMedia("(min-width: 1024px)").matches &&
                          window.matchMedia("(hover: none)").matches
                        ) {
                          setActiveInterview(index);
                        }
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 z-10 h-6 shadow-[0_1px_2px_rgba(55,67,74,0.08)] sm:h-7 lg:h-8"
                        style={{
                          left: interview.tapeLeft,
                          width: interview.tapeWidth,
                          backgroundColor: interview.tapeColor,
                          backgroundImage:
                            "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.03) 44%, rgba(72,87,94,0.05))",
                          clipPath:
                            "polygon(2% 12%, 14% 5%, 29% 10%, 44% 3%, 59% 9%, 74% 4%, 98% 11%, 96% 88%, 82% 94%, 67% 89%, 51% 97%, 36% 91%, 20% 96%, 3% 87%)",
                          transform: `translateY(-30%) rotate(${interview.tapeRotation})`,
                        }}
                      />

                      <h3 className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] tracking-[-0.015em] text-[#2D3442] sm:text-[18px] lg:text-[20px]">
                        {interview.round}：{interview.title}
                      </h3>
                      <p className="mt-3 text-[16px] leading-[1.7] text-[#4E525E]">
                        {interview.body}
                      </p>
                      <div className="mt-4 border-t border-[rgba(78,82,94,0.14)] pt-3">
                        <div className="text-[12px] font-semibold leading-[1.4] tracking-[0.08em] text-[#737B8C]">
                          访谈结论
                        </div>
                        <p className="mt-1 text-[15px] font-medium leading-[1.65] text-[#3E4655] sm:text-[16px]">
                          {interview.conclusion}
                        </p>
                      </div>
                    </motion.article>
                  </div>
                ))}
              </div>

              <motion.section
                aria-label="用户诉求和问题总览"
                aria-hidden={activeInterview !== null}
                animate={{ opacity: activeInterview === null ? 1 : 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className={`absolute left-[52px] right-6 top-[1320px] z-20 sm:left-16 sm:right-8 sm:top-[1280px] md:top-[1240px] lg:left-[7%] lg:right-auto lg:top-[500px] lg:w-[50%] lg:max-w-[620px] 2xl:top-[340px] ${activeInterview === null ? "" : "pointer-events-none"}`}
              >
                <h3 className="relative inline-block text-[26px] font-semibold leading-[1.3] text-[#1A1C24] sm:text-[28px] lg:text-[30px]">
                  <span className="relative z-10">用户诉求和问题</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 190 70"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -inset-x-[15%] -inset-y-[25%] z-0 h-[160%] w-[130%] overflow-visible"
                    fill="none"
                  >
                    <path
                      d="M 26 40 C 34 9 82 0 130 8 C 155 12 171 21 178 32"
                      stroke="#4777FF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M 164 54 C 139 68 98 71 65 66 C 54 64 48 62 44 59"
                      stroke="#A8BEFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </h3>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                    {
                      title: "01｜材料准备耗时",
                      text: "资料分散且格式繁杂（PDF／扫描件／网页），数据清洗与提取占用超 60% 准备时间。",
                      quoteParts: [
                        { text: "写一份报告，" },
                        { text: "大半天都在找资料", highlighted: true },
                        { text: "。PDF、网页、表格散得到处都是，资料整理完，" },
                        { text: "正文还一个字没写", highlighted: true },
                        { text: "。" },
                      ],
                    },
                    {
                      title: "02｜生成过程失控",
                      text: "全文直接生成易跑偏，一旦结构或重点不符，后期修改成本远大于手动撰写。",
                      quoteParts: [
                        { text: "我" },
                        { text: "不敢让它直接生成全文", highlighted: true },
                        { text: "，前面范围和结构没确认好，后面很容易跑偏。生成几千字再改，" },
                        { text: "还不如我自己重写", highlighted: true },
                        { text: "。" },
                      ],
                    },
                    {
                      title: "03｜内容缺乏信源",
                      text: "专业报告容错率极低，AI 幻觉与无出处数据导致严重的交付信任危机。",
                      quoteParts: [
                        { text: "报告要给领导看，" },
                        { text: "里面的数据必须有出处", highlighted: true },
                        { text: "。AI 给出的数字看着很真，但" },
                        { text: "查不到来源，我肯定不敢交", highlighted: true },
                        { text: "。" },
                      ],
                    },
                    {
                      title: "04｜资产无法复用",
                      text: "过往研报与数据库碎片化沉淀，每次撰写新报告都在重复“从零造轮子”。",
                      quoteParts: [
                        { text: "以前写过类似报告，但" },
                        { text: "需要时总是找不到", highlighted: true },
                        { text: "。每次接到新任务，还是要重新找资料、搭框架，" },
                        { text: "之前的成果很难复用", highlighted: true },
                        { text: "。" },
                      ],
                    },
                  ].map((note, index) => (
                    <article
                      key={note.title}
                      tabIndex={0}
                      aria-label={`${note.title}。${note.text}。访谈转述：${note.quoteParts.map((part) => part.text).join("")}`}
                      className="group relative min-h-[160px] cursor-pointer rounded-[5px] border px-5 pb-4 pt-6 shadow-[0_2px_3px_rgba(28,36,52,0.16),0_7px_14px_rgba(28,36,52,0.055)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4777FF] focus-visible:ring-offset-2"
                      style={{
                        backgroundColor: "#FFFEF9",
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.18) 32px)",
                        borderColor: "#DED9CE",
                        transform: `rotate(${index % 2 === 0 ? "-0.6deg" : "0.6deg"})`,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 z-30 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F05B62]"
                      />
                      <div className="relative z-10 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:opacity-0 group-focus:-translate-y-1 group-focus:opacity-0 motion-reduce:transform-none motion-reduce:transition-none">
                        <h4 className="text-[15px] font-semibold leading-[1.45] text-[#20242D] sm:text-[16px]">
                          {note.title}
                        </h4>
                        <p className="mt-2 text-[14px] leading-[1.65] text-[#4F5B70] sm:text-[15px]">
                          {note.text}
                        </p>
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 z-20 flex translate-y-1 items-center rounded-[4px] px-5 py-4 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                        style={{
                          backgroundColor: "#FFFEF9",
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.18) 32px)",
                        }}
                      >
                        <p className="text-[13px] font-medium leading-[1.55] text-[#3E4655] xl:text-[14px]">
                          “{note.quoteParts.map((part, partIndex) => (
                            part.highlighted ? (
                              <mark
                                key={`${note.title}-highlight-${partIndex}`}
                                className="bg-transparent px-[1px] font-semibold text-inherit"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(transparent 48%, rgba(255, 220, 92, 0.72) 48%, rgba(255, 220, 92, 0.72) 91%, transparent 91%)",
                                }}
                              >
                                {part.text}
                              </mark>
                            ) : (
                              <span key={`${note.title}-text-${partIndex}`}>{part.text}</span>
                            )
                          ))}”
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

              </motion.section>

              <AnimatePresence mode="wait">
                {activeInterviewDetail ? (
                  <motion.section
                    key={activeInterviewDetail.round}
                    aria-label={`${activeInterviewDetail.round}详情`}
                    className="pointer-events-none absolute left-[6%] top-[78px] z-30 hidden w-[45%] max-w-[570px] lg:block lg:min-h-[660px] xl:min-h-[690px]"
                    style={{
                      filter:
                        "drop-shadow(0 2px 4px rgba(28,36,52,0.055)) drop-shadow(0 7px 14px rgba(28,36,52,0.025))",
                    }}
                    initial={{ opacity: 0, x: -8, y: 8, rotate: -1 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: -0.25 }}
                    exit={{ opacity: 0, x: -5, y: 4, rotate: -0.7 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 600 720"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full overflow-visible"
                    >
                      <defs>
                        <pattern
                          id="ai-report-interview-detail-lines"
                          width="600"
                          height="34"
                          patternUnits="userSpaceOnUse"
                        >
                          <rect width="600" height="34" fill="#FFFEF7" />
                          <line
                            x1="0"
                            y1="33"
                            x2="600"
                            y2="33"
                            stroke="#D7E3F1"
                            strokeWidth="1.2"
                            opacity="0.78"
                          />
                        </pattern>
                        <mask id="ai-report-interview-detail-torn-mask">
                          <path
                            d="M 24 0 H 600 V 720 H 18 L 23 686 L 10 650 L 24 615 L 12 580 L 24 542 L 9 506 L 23 468 L 11 430 L 24 392 L 8 352 L 23 314 L 12 274 L 24 234 L 9 194 L 22 154 L 11 112 L 24 72 L 10 34 Z"
                            fill="white"
                          />
                        </mask>
                      </defs>
                      <g mask="url(#ai-report-interview-detail-torn-mask)">
                        <rect width="600" height="720" fill="url(#ai-report-interview-detail-lines)" />
                        <line
                          x1="82"
                          y1="0"
                          x2="82"
                          y2="720"
                          stroke="#D79A9A"
                          strokeWidth="1.4"
                          opacity="0.42"
                        />
                      </g>
                    </svg>

                    <div className="relative z-10 py-8 pl-16 pr-7 sm:py-9 sm:pl-[76px] sm:pr-9">
                      <div className="text-[14px] font-semibold tracking-[0.08em] text-[#4777FF]">
                        {activeInterviewDetail.round}
                      </div>
                      <h3 className="mt-2 text-[24px] font-semibold leading-[1.3] tracking-tight text-[#252B36] xl:text-[26px]">
                        {activeInterviewDetail.title}
                      </h3>

                      <div className="mt-6">
                        <div className="text-[14px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          研究目标
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#4E525E] xl:text-[17px]">
                          {activeInterviewDetail.goal}
                        </p>
                      </div>

                      <div className="mt-6">
                        <div className="text-[14px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          关键讨论
                        </div>
                        <ul className="mt-2.5 space-y-2 text-[16px] leading-[1.65] text-[#4E525E] xl:text-[17px]">
                          {activeInterviewDetail.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-[#85A3FF]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 border-t border-[#DED9CE] pt-4">
                        <div className="text-[14px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          访谈结论
                        </div>
                        <p className="mt-2 text-[16px] font-medium leading-[1.7] text-[#35404F] xl:text-[17px]">
                          {activeInterviewDetail.conclusion}
                        </p>
                      </div>
                    </div>
                  </motion.section>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02. Validation scenario: 研报链路与设计控制点 ===== */}
      <ResearchPaperCanvas
        stages={journeyStages}
        journeyPath={journeyPath}
        journeyPathSegments={journeyPathSegments}
      />


      {/* ===== 03. Product design — strategy cards with default visuals ===== */}
      <section
        id="s03"
        className={`relative py-20 md:py-28 ${SECTION_PAD} overflow-hidden`}
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,88,244,0.03), transparent)",
        }}
      >
        <BlueAccentBlob side="right" />
        <div className={`relative ${READ}`}>
          <Reveal>
            <SectionHeader
              index="03"
              kicker="产品设计方案"
              title="访谈找到的痛点，设计是这样回应的"
              subtitle=""
            />
          </Reveal>

          <Reveal className="mb-12 max-w-[860px]" delay={0.08}>
            <p style={bodyText}>
              把影响报告质量的关键变量前置为可配置、可复用、可追溯的产品结构。这个项目的设计重点不是做一个生成入口,而是明确数据来源、企业对象和章节结构,让用户在生成前控制边界,在生成后追溯依据。
            </p>
          </Reveal>

          <Reveal delay={0.16} y={24}>
          {(() => {
            const designStrategies = [
              {
                icon: Database,
                title: "数据来源配置",
                quote:
                  "资料来源太多，找资料往往是整个报告里最花时间的部分。",
                desc:
                  "数据来源很多，采集完成后能不能统一管理？",
                feedback:
                  "用户认为这套方案整体符合他们的预期，资料查找和整理更集中，内容的来源也更容易确认。",
                points: ["系统数据", "外链知识", "本地知识库", "来源追溯"],
                visual: "知识库页面大图",
                image: "./images/optimized-webp/ai-data01-1600.webp",
              },
              {
                icon: Users,
                title: "企业范围复用",
                quote:
                  "我们现有的企业名单，能不能直接上传到系统里维护？",
                desc:
                  "对用户来说，重点不是增加一个上传按钮，而是能不能沿用旧名单继续跟踪管理。",
                feedback:
                  "用户认为直接复用启信产业大脑中已有的客户数据，比每次手动上传名单更符合实际工作方式，这也成为 1.0 上线后最核心的延伸需求。",
                points: ["企业监控", "企业分组", "账户权限", "跨系统关联"],
                visual: "跨系统联动关系图",
                image: "./images/optimized-webp/ai-group02-1600.webp",
                overlayImage: "./images/optimized-webp/ai-group01-1600.webp",
              },
              {
                icon: GitBranch,
                title: "章节结构匹配",
                quote:
                  "已经写好的内容，能不能只换一下数据就直接用？",
                desc:
                  "这里有两层判断：第一点，用户期望在生产过程中减少工作量；第二点，用户觉得 AI 生成的结果不稳定。",
                points: ["用户输入匹配", "编辑新增匹配", "内置章节复用"],
                visual: "章节匹配逻辑截图",
                image: "./images/optimized-webp/ai-marry01-1600.webp",
                overlayImage: "./images/设计方案/marry02.png",
                overlayRaw: true,
              },
            ];
            const [primaryStrategy, ...secondaryStrategies] = designStrategies;
            const secondaryStrategy = secondaryStrategies[0];
            const tertiaryStrategy = secondaryStrategies[1];
            return (
              <div>
                <div
                  className="grid items-start gap-8 lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.28fr)] lg:gap-10 xl:gap-14"
                >
                  <div className="self-start pt-1 lg:pt-3">
                    <h3 className="mb-6" style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: INK }}>
                      {primaryStrategy.title}
                    </h3>

                    <blockquote
                      className="relative mb-8 max-w-[420px] rounded-[8px] border border-[#DED9CE] px-5 py-5 shadow-[0_8px_22px_rgba(56,67,92,0.1)]"
                      style={{
                        background:
                          "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
                      />
                      <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                        用户原话
                      </div>
                      <p className="mt-3 text-[16px] font-medium leading-[1.75] text-[#35404F] xl:text-[18px]">
                        “{primaryStrategy.quote}”
                      </p>
                    </blockquote>

                    <div className="max-w-[420px] space-y-5">
                      <div>
                        <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          目标判断
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#696D7A]">
                          <span className="ai-report-marker-highlight">{primaryStrategy.desc}</span>
                        </p>
                      </div>

                      <div className="border-t pt-4" style={{ borderColor: LINE }}>
                        <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          上线反馈
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#696D7A]">
                          {primaryStrategy.feedback}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative max-h-[350px] overflow-visible rounded-t-2xl pt-3">
                    <div
                      className="absolute inset-x-3 top-0 h-[86%] rounded-2xl border"
                      style={{
                        borderColor: "rgba(15,20,25,0.035)",
                        background: "rgba(238,241,247,0.42)",
                      }}
                    />
                    <img
                      src={primaryStrategy.image}
                      alt={primaryStrategy.visual}
                      {...DETAIL_IMAGE_LAZY_PROPS}
                      className="relative z-10 block w-full rounded-2xl object-contain shadow-[0_16px_36px_rgba(15,20,25,0.11)]"
                    />
                  </div>
                </div>

                <div className="mt-24 grid items-start gap-8 md:mt-28 lg:grid-cols-[minmax(0,1.28fr)_minmax(300px,0.72fr)] lg:gap-10 xl:mt-32 xl:gap-14">
                  <div
                    className="relative flex min-h-0 items-end overflow-visible rounded-2xl"
                    style={{ aspectRatio: "16 / 10.5" }}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={secondaryStrategy.image}
                        alt={`${secondaryStrategy.title}主界面`}
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="absolute right-0 top-0 z-10 w-[88%] rotate-[1.5deg] rounded-2xl object-contain shadow-[0_6px_16px_rgba(15,20,25,0.07)]"
                      />
                      {secondaryStrategy.overlayImage && (
                        <img
                          src={secondaryStrategy.overlayImage}
                          alt={`${secondaryStrategy.title}交互状态`}
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute left-0 -bottom-4 z-20 w-[82%] -rotate-[3deg] rounded-2xl object-contain shadow-[0_20px_48px_rgba(15,20,25,0.18)]"
                        />
                      )}
                    </div>
                  </div>

                  <div className="self-start pt-1 lg:pt-3">
                    <h3 className="mb-6" style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: INK }}>
                      {secondaryStrategy.title}
                    </h3>

                    <blockquote
                      className="relative mb-8 max-w-[420px] rounded-[8px] border border-[#DED9CE] px-5 py-5 shadow-[0_8px_22px_rgba(56,67,92,0.1)]"
                      style={{
                        background:
                          "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
                      />
                      <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                        用户原话
                      </div>
                      <p className="mt-3 text-[16px] font-medium leading-[1.75] text-[#35404F] xl:text-[18px]">
                        “{secondaryStrategy.quote}”
                      </p>
                    </blockquote>

                    <div className="max-w-[420px] space-y-5">
                      <div>
                        <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          目标判断
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#696D7A]">
                          <span className="ai-report-marker-highlight">{secondaryStrategy.desc}</span>
                        </p>
                      </div>

                      <div className="border-t pt-4" style={{ borderColor: LINE }}>
                        <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          上线反馈
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#696D7A]">
                          {secondaryStrategy.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-24 grid items-start gap-8 md:mt-28 lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.28fr)] lg:gap-10 xl:mt-32 xl:gap-14">
                  <div className="self-start pt-1 lg:pt-3">
                    <h3 className="mb-6" style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: INK }}>
                      {tertiaryStrategy.title}
                    </h3>

                    <blockquote
                      className="relative mb-8 max-w-[420px] rounded-[8px] border border-[#DED9CE] px-5 py-5 shadow-[0_8px_22px_rgba(56,67,92,0.1)]"
                      style={{
                        background:
                          "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
                      />
                      <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                        用户原话
                      </div>
                      <p className="mt-3 text-[16px] font-medium leading-[1.75] text-[#35404F] xl:text-[18px]">
                        “{tertiaryStrategy.quote}”
                      </p>
                    </blockquote>

                    <div className="max-w-[420px] space-y-5">
                      <div>
                        <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                          目标判断
                        </div>
                        <p className="mt-2 text-[16px] leading-[1.75] text-[#696D7A]">
                          <span className="ai-report-marker-highlight">{tertiaryStrategy.desc}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative flex min-h-0 items-end overflow-visible rounded-2xl"
                    style={{ aspectRatio: "16 / 10.5" }}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={tertiaryStrategy.image}
                        alt={`${tertiaryStrategy.title}主界面`}
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="absolute left-[3%] top-[-2%] z-10 w-[92%] -rotate-[2deg] rounded-2xl object-contain shadow-[0_10px_28px_rgba(15,20,25,0.08)]"
                      />
                      {tertiaryStrategy.overlayImage && (
                        <img
                          src={tertiaryStrategy.overlayImage}
                          alt={`${tertiaryStrategy.title}交互状态`}
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute right-[-10%] bottom-[-6%] z-20 w-[84%] rotate-[2deg] object-contain drop-shadow-[0_22px_42px_rgba(15,20,25,0.16)]"
                        />
                      )}
                      <div className="absolute left-[18%] top-[36%] z-30 flex rotate-[-11.5deg] flex-col items-center">
                        <span
                          className="rounded-lg px-3.5 py-2 text-xs font-semibold leading-none text-white"
                          style={{ background: BLUE }}
                        >
                          用户二次匹配
                        </span>
                        <svg
                          className="mt-3 size-6 rotate-[85deg] overflow-visible"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.3 3.1C2.9 2.2 3.9 1.4 4.7 1.9L17 8.9C18 9.5 18 10.8 17 11.4L4.7 18.1C3.9 18.6 2.9 17.8 3.3 16.9L5.8 10.9C6 10.3 6 9.7 5.8 9.1L3.3 3.1Z"
                            fill={BLUE}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          </Reveal>
        </div>
      </section>

      {/* ===== 03b. Traceability — source evidence setup ===== */}
      <section
        className={`relative pt-20 pb-12 md:pt-24 md:pb-16 xl:pt-28 xl:pb-20 ${SECTION_PAD} overflow-hidden`}
      >
        <div className={`relative ${READ}`}>
          <Reveal className="max-w-[980px]">
            <SectionHeader
              index="03B"
              kicker="来源可信度"
              title="用户信任内容的前提是知道它从哪来"
              subtitle=""
            />

            <blockquote
              className="relative max-w-[420px] rounded-[8px] border border-[#DED9CE] px-5 py-5 shadow-[0_8px_22px_rgba(56,67,92,0.1)]"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
              />
              <div className="text-[16px] font-semibold tracking-[0.08em] text-[#737B8C]">
                用户原话
              </div>
              <p className="mt-3 text-[16px] font-medium leading-[1.75] text-[#35404F] xl:text-[18px]">
                “生成的内容里面的数据是不是真的？还是只用了我给的材料？”
              </p>
            </blockquote>
          </Reveal>

          <Reveal className="mb-16 max-w-[1400px] md:mb-20" delay={0.08} y={18}>
            <div className="flex max-w-[420px] justify-center py-2" aria-hidden="true">
              <svg className="h-[76px] w-[112px] overflow-visible" viewBox="0 0 112 76" fill="none">
                <path
                  d="M25 5 C25 31 38 44 76 57"
                  stroke={BLUE}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  opacity="0.82"
                />
                <path
                  d="M65 48 L80 59 L62 65"
                  stroke={BLUE}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.82"
                />
                <path
                  d="M30 6 C30 28 42 39 70 50"
                  stroke="#A8BEFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="3 6"
                  opacity="0.58"
                />
              </svg>
            </div>

            {(() => {
              const decisions = [
                {
                  title: "判断 01 — 如何打消用户疑虑",
                  body:
                    "报告末尾有免责声明，但用户访谈中仍担心「数据会是真的吗」。",
                  conclusionLabel: "取舍",
                  conclusion:
                    "不再把免责声明当作信任手段，改为让依据跟具体内容就近出现。",
                  rotation: "-0.4deg",
                },
                {
                  title: "判断 02 — 如何让用户更清晰地做决策",
                  body:
                    "最初打算把所有来源汇总在报告末尾，但内容与来源分离，用户无法很好地对应到相关位置。",
                  conclusionLabel: "取舍",
                  conclusion:
                    "放弃末尾集中方案，改为在正文中用引用编号就近绑定来源卡片，读到哪里、依据就在哪里。",
                  rotation: "0deg",
                },
                {
                  title: "判断 03 — 如何区分信息置信度",
                  body:
                    "企业数据、知识库、互联网与模型推算的性质不同，混在一起会让用户无法判断可信度，仍会关心「这会不会是 AI 算出来的」。",
                  conclusionLabel: "设计依据",
                  conclusion:
                    "尼尔森「识别优于记忆」——用颜色编码区分四种来源类型，用户一眼识别，无需记规则。",
                  rotation: "0deg",
                },
              ];

              const renderDecisionPaper = (
                decision: (typeof decisions)[number],
                decisionIndex: number,
                variant: "primary" | "extension",
              ) => {
                const decisionNumber = String(decisionIndex + 1).padStart(2, "0");
                const maskId = `ai-report-traceability-decision-${decisionNumber}-torn-mask`;
                const washId = `ai-report-traceability-decision-${decisionNumber}-wash`;
                const rulePatternId = `ai-report-traceability-decision-${decisionNumber}-rules`;
                const titleId = `ai-report-traceability-decision-${decisionNumber}-title`;
                const isPrimary = variant === "primary";
                const isUpperExtension = variant === "extension" && decisionIndex === 1;
                const sharedTearTopPath =
                  "M 0 16 L 13 7 L 31 14 L 52 3 L 70 12 L 91 5 L 116 16 L 134 6 L 159 13 L 181 2 L 204 15 L 229 7 L 252 17 L 274 4 L 297 12 L 322 3 L 346 16 L 367 6 L 391 14 L 408 5 L 420 13 V 272 Q 420 280 412 280 H 8 Q 0 280 0 272 V 16 Z";
                const sharedTearBottomPath =
                  "M 8 0 H 412 Q 420 0 420 8 V 275 L 408 267 L 391 276 L 367 268 L 346 278 L 322 265 L 297 274 L 274 266 L 252 279 L 229 269 L 204 277 L 181 264 L 159 275 L 134 268 L 116 278 L 91 267 L 70 274 L 52 265 L 31 276 L 13 269 L 0 278 V 8 Q 0 0 8 0 Z";
                const paperPath = isUpperExtension ? sharedTearBottomPath : sharedTearTopPath;
                const paperColors = isPrimary
                  ? {
                      fill: "#FFFEF8",
                      washStart: "#FFFEF8",
                      washMiddle: "#FFFEF8",
                      washEnd: "#E8E4D8",
                      border: "#DED9CE",
                      divider: "#E8E4D8",
                      washOpacity: 0.18,
                    }
                  : {
                      fill: "#F8FAFF",
                      washStart: "#FFFFFF",
                      washMiddle: "#F8FAFF",
                      washEnd: "#EEF4FF",
                      border: "#B9C9EA",
                      divider: "#DCE7FA",
                      washOpacity: 0.22,
                    };

                return (
                  <article
                    key={decision.title}
                    aria-labelledby={titleId}
                    className={`relative h-full overflow-visible ${
                      isPrimary
                        ? "min-h-[300px] sm:min-h-[290px] xl:min-h-[336px]"
                        : "min-h-[220px] sm:min-h-[238px] xl:min-h-[160px]"
                    }`}
                    style={{
                      filter:
                        "drop-shadow(0 2px 4px rgba(28,36,52,0.055)) drop-shadow(0 10px 20px rgba(28,36,52,0.035))",
                      transform: `rotate(${decision.rotation})`,
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 420 280"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full overflow-visible"
                    >
                      <defs>
                        <mask id={maskId}>
                          <path d={paperPath} fill="white" />
                        </mask>
                        <linearGradient id={washId} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor={paperColors.washStart} />
                          <stop offset="0.52" stopColor={paperColors.washMiddle} />
                          <stop offset="1" stopColor={paperColors.washEnd} />
                        </linearGradient>
                        {!isPrimary && (
                          <pattern
                            id={rulePatternId}
                            width="420"
                            height="42"
                            patternUnits="userSpaceOnUse"
                          >
                            <line
                              x1="0"
                              y1="41.5"
                              x2="420"
                              y2="41.5"
                              stroke="#DCE7FA"
                              strokeWidth="1"
                              opacity="0.72"
                              vectorEffect="non-scaling-stroke"
                            />
                          </pattern>
                        )}
                      </defs>
                      <g mask={`url(#${maskId})`}>
                        <rect width="420" height="280" fill={paperColors.fill} />
                        <rect
                          width="420"
                          height="280"
                          fill={`url(#${washId})`}
                          opacity={paperColors.washOpacity}
                        />
                        {!isPrimary && (
                          <rect width="420" height="280" fill={`url(#${rulePatternId})`} />
                        )}
                      </g>
                      <path
                        d={paperPath}
                        fill="none"
                        stroke={paperColors.border}
                        strokeWidth="1.2"
                        opacity="0.82"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>

                    <div
                      className={`relative z-10 h-full px-6 pb-6 pt-8 ${
                        isPrimary
                          ? "flex flex-col sm:px-7 sm:pb-7 sm:pt-9"
                          : "sm:px-6 sm:pb-6 sm:pt-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.92fr)] xl:items-center xl:gap-5 xl:px-6 xl:pb-5 xl:pt-7"
                      }`}
                    >
                      <div>
                        <h3
                          id={titleId}
                          className={`font-semibold leading-[1.45] text-[#252B36] ${
                            isPrimary ? "text-[18px] xl:text-[19px]" : "text-[16px] xl:text-[17px]"
                          }`}
                        >
                          {decision.title}
                        </h3>
                        <p
                          className={`text-[#4E525E] ${
                            isPrimary
                              ? "mt-4 text-[15px] leading-[1.8] xl:text-[16px]"
                              : "mt-3 text-[14px] leading-[1.72] xl:text-[15px]"
                          }`}
                        >
                          {decision.body}
                        </p>
                      </div>
                      <p
                        className={`${
                          isPrimary
                            ? "mt-auto border-t pt-4 text-[15px] leading-[1.75] xl:text-[16px]"
                            : "mt-4 border-t pt-3 text-[14px] leading-[1.7] xl:mt-0 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0 xl:text-[15px]"
                        } text-[#35404F]`}
                        style={{ borderColor: paperColors.divider }}
                      >
                        <span className="font-semibold text-[#252B36]">{decision.conclusionLabel}：</span>
                        {decision.conclusion}
                      </p>
                    </div>
                  </article>
                );
              };

              return (
                <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,0.86fr)_128px_minmax(0,1.34fr)]">
                  {renderDecisionPaper(decisions[0], 0, "primary")}

                  <div className="relative min-h-[72px] xl:min-h-[336px]">
                    <div className="flex h-full flex-col items-center justify-center py-1 xl:hidden">
                      <span className="text-[13px] font-semibold tracking-[0.08em] text-[#6E7A92]">
                        延展思考
                      </span>
                      <svg
                        aria-hidden="true"
                        className="mt-1 h-11 w-16 overflow-visible sm:hidden"
                        viewBox="0 0 64 44"
                        fill="none"
                      >
                        <defs>
                          <marker
                            id="ai-report-traceability-mobile-arrowhead"
                            markerWidth="8"
                            markerHeight="8"
                            refX="6"
                            refY="4"
                            orient="auto"
                          >
                            <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#6F8FE8" strokeWidth="1.5" />
                          </marker>
                        </defs>
                        <path
                          d="M32 2 C32 16 32 24 32 38"
                          stroke="#6F8FE8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          markerEnd="url(#ai-report-traceability-mobile-arrowhead)"
                        />
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="mt-1 hidden h-12 w-full max-w-[560px] overflow-visible sm:block"
                        viewBox="0 0 560 48"
                        fill="none"
                      >
                        <defs>
                          <marker
                            id="ai-report-traceability-tablet-arrowhead"
                            markerWidth="8"
                            markerHeight="8"
                            refX="6"
                            refY="4"
                            orient="auto"
                          >
                            <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#6F8FE8" strokeWidth="1.5" />
                          </marker>
                        </defs>
                        <path
                          d="M280 2 C280 25 185 18 142 42"
                          stroke="#6F8FE8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          markerEnd="url(#ai-report-traceability-tablet-arrowhead)"
                        />
                        <path
                          d="M280 2 C280 25 375 18 418 42"
                          stroke="#6F8FE8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          markerEnd="url(#ai-report-traceability-tablet-arrowhead)"
                        />
                      </svg>
                    </div>

                    <div className="absolute inset-0 hidden xl:block">
                      <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[13px] font-semibold tracking-[0.08em] text-[#6E7A92]">
                        延展思考
                      </span>
                      <svg
                        aria-hidden="true"
                        className="h-full w-full overflow-visible"
                        viewBox="0 0 128 336"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <marker
                            id="ai-report-traceability-desktop-arrowhead"
                            markerWidth="8"
                            markerHeight="8"
                            refX="6"
                            refY="4"
                            orient="auto"
                          >
                            <path d="M 0 0 L 8 4 L 0 8" fill="none" stroke="#6F8FE8" strokeWidth="1.5" />
                          </marker>
                        </defs>
                        <path
                          d="M4 168 C48 168 52 80 119 80"
                          stroke="#6F8FE8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          markerEnd="url(#ai-report-traceability-desktop-arrowhead)"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M4 168 C48 168 52 256 119 256"
                          stroke="#6F8FE8"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          markerEnd="url(#ai-report-traceability-desktop-arrowhead)"
                          vectorEffect="non-scaling-stroke"
                        />
                        <circle cx="5" cy="168" r="3.5" fill="#6F8FE8" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="grid gap-4 sm:grid-cols-2 xl:min-h-[336px] xl:grid-cols-1 xl:grid-rows-2 xl:gap-0"
                    style={{ transform: "rotate(0.22deg)", transformOrigin: "center center" }}
                  >
                    {renderDecisionPaper(decisions[1], 1, "extension")}
                    {renderDecisionPaper(decisions[2], 2, "extension")}
                  </div>
                </div>
              );
            })()}
          </Reveal>

          <Reveal className="max-w-[1400px]" delay={0.16} y={24}>
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,696px)] xl:grid-cols-[320px_696px_320px] xl:items-start xl:gap-8">
              <div className="order-2 flex w-full max-w-[320px] flex-col gap-3 lg:order-1 lg:mt-[40px]">
                {[
                  {
                    src: "./images/首页webp/数据溯源/多互联网数据.webp",
                    alt: "互联网数据来源卡片",
                  },
                  {
                    src: "./images/首页webp/数据溯源/启信产业大脑数据.webp",
                    alt: "启信产业大脑数据来源卡片",
                  },
                  {
                    src: "./images/首页webp/数据溯源/模型运算.webp",
                    alt: "模型运算来源卡片",
                  },
                ].map((sourceImage) => (
                  <img
                    key={sourceImage.src}
                    src={sourceImage.src}
                    alt={sourceImage.alt}
                    {...DETAIL_IMAGE_EAGER_PROPS}
                    className="block h-auto w-full object-contain"
                  />
                ))}
              </div>

              <div
                className="relative order-1 inline-block max-w-full overflow-hidden rounded-[28px] border bg-white p-3 align-top lg:order-2"
                style={{ borderColor: LINE }}
              >
                <img
                  src="./images/首页webp/数据溯源/生成内容.webp"
                  alt="带来源引用的报告生成内容"
                  {...DETAIL_IMAGE_EAGER_PROPS}
                  className="block h-auto w-[672px] max-w-full object-contain"
                />
                <span
                  className="absolute z-20 hidden size-3 rounded-full border-2 border-white lg:block"
                  style={{
                    left: "88.5%",
                    top: "31.4%",
                    background: BLUE,
                    boxShadow: "0 0 0 4px rgba(34,88,244,0.16)",
                  }}
                />
              </div>

              <div
                className="pointer-events-none absolute hidden lg:block"
                style={{
                  left: 320,
                  top: 277,
                  width: 132,
                  borderTop: `2px dashed ${BLUE}`,
                  zIndex: 30,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full lg:block"
                style={{
                  left: 316,
                  top: 274,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full lg:block"
                style={{
                  left: 448,
                  top: 274,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <div
                className="pointer-events-none absolute hidden lg:block"
                style={{
                  left: 320,
                  top: 715,
                  width: 491,
                  borderTop: `2px dashed ${BLUE}`,
                  zIndex: 30,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full lg:block"
                style={{
                  left: 316,
                  top: 712,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full lg:block"
                style={{
                  left: 807,
                  top: 712,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <div
                className="pointer-events-none absolute hidden xl:block"
                style={{
                  left: 968,
                  top: 277,
                  width: 112,
                  borderTop: `2px dashed ${BLUE}`,
                  zIndex: 30,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full xl:block"
                style={{
                  left: 1076,
                  top: 274,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <div
                className="pointer-events-none absolute hidden xl:block"
                style={{
                  left: 1023,
                  top: 811,
                  width: 57,
                  borderTop: `2px dashed ${BLUE}`,
                  zIndex: 30,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full xl:block"
                style={{
                  left: 1019,
                  top: 808,
                  background: BLUE,
                  zIndex: 31,
                }}
              />
              <span
                className="pointer-events-none absolute z-20 hidden size-2 rounded-full xl:block"
                style={{
                  left: 1076,
                  top: 808,
                  background: BLUE,
                  zIndex: 31,
                }}
              />

              <div className="order-3 flex w-full max-w-[320px] flex-col gap-3 xl:relative xl:min-h-[864px]">
                <div
                  className="rounded-[24px] border bg-white p-5 xl:absolute xl:left-0 xl:top-[104px]"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: BLUE }} />
                    <div className="text-[15px] font-semibold leading-tight" style={{ color: INK }}>
                      依据：系统状态可见
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: INK_DIM }}>
                    AI 生成不能只给结果，也要让用户知道这句话从哪里来。因此将正文引用编号与来源卡片绑定，hover 时即可回查依据。
                  </p>
                  <div className="mt-4 space-y-2">
                    {["正文保留引用编号", "来源卡片可回查", "减少黑箱误信"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px]" style={{ color: INK_MUTED }}>
                        <span className="size-1.5 rounded-full" style={{ background: ICON_BORDER }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[24px] border bg-white p-5 xl:absolute xl:left-0 xl:top-[606px]"
                  style={{ borderColor: LINE }}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: BLUE }} />
                    <div className="text-[15px] font-semibold leading-tight" style={{ color: INK }}>
                      依据：识别优先于记忆
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: INK_DIM }}>
                    报告会混用多类依据，不能让用户记规则。用颜色和短标签区分来源类型，让用户看正文时直接识别依据性质。
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      { label: "启信数据", value: "企业库事实依据", color: BLUE },
                      { label: "知识库", value: "知识库材料补充", color: "#1F7A3A" },
                      { label: "互联网数据", value: "公开信息校验", color: "#6D35C7" },
                      { label: "模型运算", value: "推理与计算结果", color: "#B47A12" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 text-[13px] leading-tight" style={{ color: INK_MUTED }}>
                        <span className="size-1.5 shrink-0 rounded-full" style={{ background: item.color }} />
                        <span className="font-medium" style={{ color: INK }}>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 04. Interactive flow: 模板选择 → 历史文档 ===== */}
      <section
        id="s04"
        ref={flowSectionRef}
        className={`relative z-10 isolate overflow-hidden py-20 md:py-28 lg:min-h-screen lg:py-0 ${SECTION_PAD}`}
      >
        <div
          ref={flowStageRef}
          className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] items-center py-20 md:py-24 lg:py-[clamp(5.5rem,8vh,7rem)]"
        >
          <div className="w-full">
            <SectionHeader
              index="04"
              kicker="生成流程"
              title="从模板到成文的生成链路"
              subtitle="通过大纲确认、用户确认和流式生成，把 AI 报告从一次性写作变成可控的业务流程。"
              align="center"
            />

            {(() => {
              const p1 = stepLocalProgress(1);
              const p2 = stepLocalProgress(2);
              const p3 = stepLocalProgress(3);
              const p4 = stepLocalProgress(4);

              const outlineCardsIn = rangeProgress(p1, 0.04, 0.22);
              const outlineMerge = rangeProgress(p1, 0.52, 0.74);
              const outlineContentIn = rangeProgress(p1, 0.72, 0.88);
              const outlineSharedPresence =
                rawFlowStep < 1
                  ? 0
                  : rawFlowStep < 2
                    ? 1
                    : rawFlowStep < 2.94
                      ? 1
                      : 1 - rangeProgress(rawFlowStep, 2.94, 3.04);

              const confirmScroll = rangeProgress(p2, 0.08, 0.92);
              const streamPanelIn = rangeProgress(p3, 0.12, 0.36);
              const streamTextIn = rangeProgress(p3, 0.34, 0.88);
              const streamShine = rangeProgress(p3, 0.78, 1);
              const historyIn = p4;
              const currentFlowStep = flowSteps[activeStep] ?? flowSteps[0];

              return (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start xl:gap-12">
                <aside aria-label="生成流程进度" className="relative hidden lg:block">
                  <div className="absolute left-4 top-4 bottom-4 z-0 w-px bg-[#DDE3F2]" />
                  <div
                    className="absolute left-4 top-4 z-0 w-px transition-[height] duration-300 ease-out"
                    style={{
                      height: `calc((100% - 32px) * ${activeStep / Math.max(flowSteps.length - 1, 1)})`,
                      background: BLUE,
                    }}
                  />
                  <div className="relative space-y-6">
                    {flowSteps.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = activeStep === index;
                      const isDone = index < activeStep;
                      return (
                        <div
                          key={item.label}
                          aria-current={isActive ? "step" : undefined}
                          className="grid grid-cols-[32px_minmax(0,1fr)] items-center gap-4"
                        >
                          <span
                            className="relative z-10 inline-flex size-8 items-center justify-center rounded-full border transition-all duration-200"
                            style={{
                              borderColor: isActive || isDone ? ICON_BORDER : "rgba(15,20,25,0.14)",
                              background: isActive ? ICON_BG : isDone ? "#F0F4FF" : SURFACE,
                              color: isActive || isDone ? ICON_BLUE : INK_DIM,
                              boxShadow: isActive ? "0 10px 24px rgba(34,88,244,0.16)" : "none",
                            }}
                          >
                            <Icon className="size-3.5" />
                          </span>
                          <span
                            className="transition-colors duration-200"
                            style={{
                              fontSize: 16,
                              lineHeight: 1.35,
                              fontWeight: isActive ? 700 : 600,
                              color: isActive ? INK : INK_MUTED,
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </aside>

                <div className="min-w-0">
                  <div className="relative aspect-[16/10] overflow-visible">
                    <div
                      className="absolute inset-0 z-[70]"
                      style={{
                        opacity: layerPresence(0),
                        transform: `translate3d(0, ${lerp(0, -34, rangeProgress(rawFlowStep, 0.82, 1))}px, 0)`,
                        pointerEvents: "none",
                      }}
                    >
                      <img
                        src={flowSteps[0].finalImage}
                        alt="模板中心完整页面"
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="absolute inset-0 z-30 m-auto w-[99%] rounded-[24px] border border-white/80 object-contain object-top shadow-[0_28px_80px_rgba(15,20,25,0.14)]"
                        style={{ aspectRatio: "16 / 10" }}
                      />
                    </div>

                    <OutlineConfirmFrame
                      className="z-10 w-[99%]"
                      showContent={false}
                      style={{
                        opacity: outlineSharedPresence,
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      className="absolute inset-0 z-[70]"
                      style={{
                        opacity: p1 > 0 && p1 < 1 ? 1 : 0,
                        transform: `translate3d(0, ${lerp(32, 0, rangeProgress(p1, 0.04, 0.24))}px, 0) scale(${lerp(0.985, 1, rangeProgress(p1, 0.04, 0.24))})`,
                        pointerEvents: "none",
                      }}
                    >
                      {flowConfigCards.map((card, index) => {
                        const cardIn = rangeProgress(outlineCardsIn, index * 0.08, 0.58 + index * 0.08);
                        const isTitleCard = card.variant === "title";
                        const isAddCard = card.variant === "add";
                        return (
                          <div
                            key={card.title}
                            className={
                              isAddCard
                                ? `absolute z-[80] inline-flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-white px-3 py-1.5 shadow-[0_4px_14px_rgba(15,20,25,0.06)] ${card.className}`
                                : `absolute z-[80] rounded-xl border border-neutral-100 bg-white px-3 py-2.5 shadow-[0_6px_20px_rgba(15,20,25,0.08)] ${card.className}`
                            }
                            style={{
                              opacity: cardIn * (1 - outlineMerge),
                              transform: `translate3d(${lerp(card.fromX, card.mergeX, outlineMerge)}px, ${lerp(card.fromY, card.mergeY, outlineMerge)}px, 0) scale(${lerp(0.96, 0.2, outlineMerge)})`,
                            }}
                          >
                            {isTitleCard ? (
                              <>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="shrink-0 text-[13px] font-medium text-[#1A1C24]">{card.title}</span>
                                  <svg
                                    className="size-3 shrink-0 -rotate-90 text-neutral-400"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  >
                                    <path d="M3 4.5L6 7.5L9 4.5" />
                                  </svg>
                                </div>
                                <div className="mt-1.5 rounded-lg border border-[#E6E7EB] bg-[#F5F5F7] px-2 py-1.5">
                                  <span className="text-[12px] text-[#1A1C24]">{card.body}</span>
                                </div>
                              </>
                            ) : isAddCard ? (
                              <>
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#2258F4] text-white">
                                  <svg className="size-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 1v8M1 5h8" />
                                  </svg>
                                </span>
                                <span className="text-[13px] text-neutral-600">{card.title}</span>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="shrink-0 text-[13px] font-medium text-[#1A1C24]">{card.title}</span>
                                  <svg
                                    className="size-3 shrink-0 -rotate-90 text-neutral-400"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  >
                                    <path d="M3 4.5L6 7.5L9 4.5" />
                                  </svg>
                                </div>
                                {card.primaryTags.length > 0 && (
                                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                                    {card.primaryTags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 rounded-full bg-[#E5EBFF] px-1.5 py-0.5 text-[10px] font-medium text-[#1A42B8]"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <p className={`${card.primaryTags.length > 0 ? "mt-1.5" : "mt-1"} text-[10px] leading-relaxed text-[#696D7A]`}>
                                  {card.body}
                                </p>
                                {card.mutedTags.length > 0 && (
                                  <div className="mt-1.5 flex flex-wrap gap-1">
                                    {card.mutedTags.map((tag) => (
                                      <span
                                        key={tag}
                                        className={`rounded-md border border-[#E6E7EB] bg-[#F5F5F7] px-1.5 py-0.5 text-[10px] ${
                                          tag.startsWith("+")
                                            ? "text-neutral-400"
                                            : "text-neutral-700"
                                        }`}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <OutlineConfirmFrame
                      className="z-30 w-[99%]"
                      showShell={false}
                      contentXTranslate={0}
                      contentTranslate={lerp(0, -74, confirmScroll)}
                      contentOpacity={rawFlowStep < 2 ? outlineContentIn : 1}
                      style={{
                        opacity: outlineSharedPresence,
                        transform:
                          rawFlowStep < 2
                            ? "translate3d(0, 0, 0)"
                            : `translate3d(0, ${lerp(0, -24, rangeProgress(rawFlowStep, 2.82, 3))}px, 0)`,
                        filter: "blur(0px)",
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        opacity: layerPresence(3),
                        transform: `translate3d(0, ${lerp(34, -28, rangeProgress(rawFlowStep, 2.82, 4))}px, 0)`,
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="absolute inset-0 z-30 m-auto w-[99%] overflow-hidden rounded-[24px] border border-white/80 shadow-[0_28px_80px_rgba(15,20,25,0.14)]"
                        style={{ aspectRatio: "16 / 10" }}
                      >
                        <img
                          src="./images/0405-webp/kongbaihuabu.webp"
                          alt="流式生成空白画布"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute inset-0 h-full w-full object-contain object-top"
                        />
                        <img
                          src="./images/0405-webp/liushihuaban.webp"
                          alt="流式生成报告空白面板"
                          {...DETAIL_IMAGE_EAGER_PROPS}
                          className="absolute right-0 top-0 z-20 h-full w-[60.7%] object-contain object-top"
                          style={{
                            opacity: streamPanelIn,
                            transform: `translate3d(${lerp(110, 0, streamPanelIn)}px, 0, 0)`,
                            clipPath: `inset(0 0 0 ${lerp(100, 0, streamPanelIn)}%)`,
                            filter: `blur(${lerp(5, 0, streamPanelIn)}px)`,
                          }}
                        />
                        <img
                          src="./images/optimized-webp/ai-stream-text-1400.webp"
                          alt="流式生成报告正文"
                          {...DETAIL_IMAGE_EAGER_PROPS}
                          className="absolute right-0 top-[5.6%] z-30 h-[88.9%] w-[60.7%] object-contain object-top"
                          style={{
                            opacity: streamTextIn,
                            clipPath: `inset(0 0 ${lerp(100, 0, streamTextIn)}% 0)`,
                            filter: `blur(${lerp(3, 0, streamTextIn)}px)`,
                          }}
                        />
                        <div
                          className="pointer-events-none absolute right-0 top-0 z-40 h-full w-[60.7%]"
                          style={{
                            opacity: streamShine < 0.5 ? lerp(0, 0.75, streamShine * 2) : lerp(0.75, 0, (streamShine - 0.5) * 2),
                            transform: `translate3d(${lerp(-75, 92, streamShine)}%, 0, 0)`,
                            background:
                              "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.02) 36%, rgba(255,255,255,0.58) 48%, rgba(34,88,244,0.14) 54%, transparent 68%)",
                            mixBlendMode: "screen",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className="absolute inset-0"
                      style={{
                        opacity: layerPresence(4),
                        transform: `translate3d(0, ${lerp(80, 0, historyIn)}px, 0)`,
                        filter: `blur(${lerp(8, 0, historyIn)}px)`,
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className="absolute inset-0 z-30 m-auto w-[99%] overflow-hidden rounded-[24px] border border-white/80 shadow-[0_28px_80px_rgba(15,20,25,0.14)]"
                        style={{ aspectRatio: "16 / 10" }}
                      >
                        <img
                          src="./images/0405-webp/lishijilupng.webp"
                          alt="历史文档页面"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute inset-0 h-full w-full object-contain object-top"
                        />
                      </div>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`flow-note-${activeStep}`}
                      className="mt-6 grid gap-4 rounded-[16px] border bg-white/92 px-4 py-3 backdrop-blur-md md:grid-cols-[0.88fr_1.12fr]"
                      style={{
                        borderColor: LINE,
                        boxShadow: "0 12px 34px rgba(15,20,25,0.07)",
                      }}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold" style={{ color: INK }}>
                          设计决策
                        </div>
                        <p className="mt-0.5 text-[13px] leading-[1.55]" style={{ color: INK_DIM }}>
                          {currentFlowStep.decision}
                        </p>
                      </div>
                      <div className="min-w-0 border-t pt-2 md:border-l md:border-t-0 md:pl-4 md:pt-0" style={{ borderColor: LINE }}>
                        <div className="text-[13px] font-semibold" style={{ color: INK }}>
                          为什么这样做
                        </div>
                        <p className="mt-0.5 text-[13px] leading-[1.55]" style={{ color: INK_DIM }}>
                          {currentFlowStep.why}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            );
            })()}
          </div>
        </div>
      </section>

      {/* ===== 05. Prompt standardization — chapter-level protocol ===== */}
      <section
        id="s05"
        className={`relative py-20 md:py-28 ${SECTION_PAD} overflow-hidden`}
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,88,244,0.05), transparent)",
        }}
      >
        <BlueAccentBlob side="left" />
        <div className={`relative ${READ}`}>
          <Reveal>
            <SectionHeader
              index="05"
              kicker="提示词标准化梳理"
              title="设计提示词框架供团队使用"
              subtitle=""
            />
          </Reveal>

          <Reveal className="mb-8 grid gap-4 md:mb-40 md:grid-cols-3" delay={0.08} y={18}>
            {[
              {
                label: "问题 01",
                title: "上下文容易漂移（脱离大纲）",
                symptom: <>章节生成容易脱离父节点、章节整体位置和报告大纲，<span className="ai-report-marker-highlight">生成后半段时逻辑失控</span>。</>,
                cause: "单段 Prompt 缺乏对全局上下文的显式锚定，模型“走一步看一步”。",
                rotation: "rotate-[-0.45deg]",
              },
              {
                label: "问题 02",
                title: "工具调用偷懒与跳步（时序混乱）",
                symptom: <>模型并发调用多个检索/分析工具后，经常漏掉合流与数据清洗步骤，甚至<span className="ai-report-marker-highlight">直接跳过核验直接给出生成结果</span>。</>,
                cause: "Prompt 过于宽松，未对 Agent 的推理步骤与工具依赖做强约束。",
                rotation: "rotate-[0.35deg]",
              },
              {
                label: "问题 03",
                title: "缺乏自检规则",
                symptom: <>来源链接失效、数据时间超范围、<span className="ai-report-marker-highlight">模型自行编造无出处的数据直接混入正文</span>。</>,
                cause: "缺少前置的自检与校验环节，错误内容直接透出给用户。",
                rotation: "rotate-[-0.25deg]",
              },
            ].map((note) => (
              <article
                key={note.label}
                className={`relative min-h-[280px] rounded-[8px] border border-[#DED9CE] px-5 py-5 shadow-[0_8px_22px_rgba(56,67,92,0.1)] ${note.rotation}`}
                style={{
                  background:
                    "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 34px, #E8E4D8 35px, #E8E4D8 36px)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-[0_2px_4px_rgba(34,61,109,0.22)]"
                />
                <div className="text-[14px] font-semibold tracking-[0.08em] text-[#737B8C]">
                  {note.label}
                </div>
                <h3 className="mt-3 text-[18px] font-semibold leading-tight text-[#35404F]">
                  {note.title}
                </h3>
                <div className="mt-3 space-y-3 text-[15px] leading-[1.7] text-[#696D7A]">
                  <p><strong className="font-semibold text-[#35404F]">现象：</strong>{note.symptom}</p>
                  <p><strong className="font-semibold text-[#35404F]">原因：</strong>{note.cause}</p>
                </div>
                {note.label === "问题 01" && (
                  <div className="pointer-events-none relative z-10 mt-4 flex h-[150px] items-center justify-center overflow-visible md:absolute md:inset-x-2 md:bottom-[-108px] md:mt-0 md:h-[170px]">
                    <svg className="absolute size-0" aria-hidden="true">
                      <defs>
                        <filter id="s05-context-sticker-filter" x="-25%" y="-35%" width="150%" height="180%" colorInterpolationFilters="sRGB">
                          <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="expanded" />
                          <feFlood floodColor="#FFFEFB" result="stickerColor" />
                          <feComposite in="stickerColor" in2="expanded" operator="in" result="stickerEdge" />
                          <feGaussianBlur in="expanded" stdDeviation="1.8" result="softBlur" />
                          <feOffset in="softBlur" dy="2.5" result="offsetBlur" />
                          <feFlood floodColor="#687080" floodOpacity="0.14" result="shadowColor" />
                          <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="stickerShadow" />
                          <feMerge>
                            <feMergeNode in="stickerShadow" />
                            <feMergeNode in="stickerEdge" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                    </svg>
                    <div className="relative z-10 grid w-[112%] shrink-0 scale-[0.86] rotate-[-1deg] grid-cols-[43%_14%_43%] items-center" style={{ filter: "url(#s05-context-sticker-filter)" }}>
                      <div className="relative rounded-2xl border bg-white p-3" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[11px] font-semibold" style={{ color: ICON_BLUE }}>报告大纲树</div>
                        {[
                          ["第二章", "产业分析", false],
                          ["2.1", "区域概况", false],
                          ["2.2", "重点企业监测", true],
                          ["2.3", "风险研判", false],
                        ].map(([prefix, label, active]) => (
                          <div key={`${prefix}-${label}`} className="mb-1.5 grid grid-cols-[32px_1fr] items-center gap-1.5 rounded-lg px-2 py-1.5 last:mb-0" style={{ background: active ? "#EEF2FF" : "transparent", color: active ? ICON_BLUE : "#4E525E", border: "1px solid transparent" }}>
                            <span className="whitespace-nowrap text-[10px] font-semibold">{prefix}</span>
                            <span className="truncate text-[11px] font-medium">{label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="relative h-24">
                        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 72 96" fill="none" aria-hidden="true">
                          <path d="M0 66 C20 66 24 38 40 38 C56 38 48 72 72 72" stroke={BLUE} strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round" opacity="0.42" />
                          <circle cx="1" cy="66" r="3" fill={BLUE} opacity="0.8" />
                          <circle cx="71" cy="72" r="3" fill={BLUE} opacity="0.28" />
                        </svg>
                        <div className="absolute left-1/2 top-[8px] flex w-[78px] -translate-x-1/2 flex-col gap-1 text-center text-[10px] leading-[1.25]">
                          <div className="rounded-full px-1.5 py-0.5" style={{ background: "#FFE3E3", color: "#B81D1D" }}>父节点丢失</div>
                          <div className="rounded-full px-1.5 py-0.5" style={{ background: "#FFF6DB", color: "#B45309" }}>章节弱化</div>
                        </div>
                      </div>
                      <div className="relative mt-4 rounded-2xl border bg-white p-3" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[12px] font-semibold text-neutral-900">企业动态汇总</div>
                        <div className="space-y-2">
                          <div className="h-2 w-[88%] rounded-full bg-neutral-200" />
                          <div className="h-2 w-full rounded-full bg-neutral-200" />
                          <div className="h-2 w-[72%] rounded-full bg-neutral-200" />
                          <div className="mt-3 rounded-lg px-2 py-1.5 text-[10px]" style={{ background: "#FFF6DB", color: "#B45309" }}>偏向泛化动态，脱离 2.2 章节定位</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {note.label === "问题 02" && (
                  <div className="pointer-events-none relative z-10 mt-4 flex h-[150px] items-center justify-center overflow-visible md:absolute md:inset-x-2 md:bottom-[-108px] md:mt-0 md:h-[170px]">
                    <div className="relative h-[188px] w-[112%] shrink-0 scale-[0.82] rotate-[0.8deg]" style={{ filter: "url(#s05-context-sticker-filter)" }}>
                      <div className="absolute right-0 top-3 flex items-center gap-1 rounded-full border bg-white/92 px-2 py-1 text-[10px] font-medium" style={{ borderColor: "#E6E7EB", color: "#B81D1D" }}>
                        <Sparkles className="size-3.5" style={{ color: ICON_GRAY }} />效果不可复现
                      </div>
                      <div className="absolute bottom-5 left-3 right-3 border-t border-dashed" style={{ borderColor: "rgba(34,88,244,0.32)" }} />
                      <div className="absolute right-0 bottom-3 rounded-full px-3 py-1 text-[10px] font-medium" style={{ background: "#FFF6DB", color: "#B45309" }}>统一结构缺失</div>
                      {[
                        { owner: "Designer A", x: 0, y: 42, modules: ["目标", "工具", "输出"] },
                        { owner: "PM B", x: 28, y: 78, modules: ["角色", "示例", "规则"] },
                        { owner: "运营 C", x: 56, y: 56, modules: ["限制", "流程", "兜底"] },
                      ].map((doc) => (
                        <div key={doc.owner} className="absolute w-[31%] rounded-2xl border bg-white p-3" style={{ left: `${doc.x}%`, top: doc.y, borderColor: "#E6E7EB" }}>
                          <div className="mb-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: "#EEF2FF", color: ICON_BLUE }}>{doc.owner}</div>
                          <div className="space-y-1.5">
                            {doc.modules.map((module, moduleIndex) => <div key={module} className="rounded-lg px-2 py-1.5 text-[10px] font-medium" style={{ background: moduleIndex === 1 ? "#EEF2FF" : "#FAFBFF", color: moduleIndex === 1 ? ICON_BLUE : "#696D7A" }}>{module}</div>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {note.label === "问题 03" && (
                  <div className="pointer-events-none relative z-10 mt-4 flex h-[150px] items-center justify-center overflow-visible md:absolute md:inset-x-2 md:bottom-[-108px] md:mt-0 md:h-[170px]">
                    <div className="relative mt-2 grid w-[112%] shrink-0 scale-[0.84] rotate-[-0.7deg] grid-cols-[22%_47%_25%] items-center gap-[3%]" style={{ filter: "url(#s05-context-sticker-filter)" }}>
                      <div className="space-y-2">{["key_info", "deep_search", "file_tool"].map((source) => <div key={source} className="whitespace-nowrap rounded-full border bg-white px-2.5 py-1.5 text-center text-[10px] font-medium" style={{ borderColor: "#CBCDD4", color: "#4E525E" }}>{source}</div>)}</div>
                      <div className="relative rounded-2xl border bg-white p-3" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[11px] font-semibold" style={{ color: ICON_BLUE }}>统一候选池</div>
                        {[['缺 URL', '#FFE3E3'], ['时间超范围', '#FFF6DB'], ['分类未确认', '#EEF2FF']].map(([status, bg], index) => <div key={status} className="mb-2 grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg px-2.5 py-2 last:mb-0" style={{ background: bg }}><div className="space-y-1"><div className="h-1.5 w-full rounded-full bg-white/80" /><div className="h-1.5 w-[70%] rounded-full bg-white/80" /></div><span className="whitespace-nowrap text-[10px] font-medium" style={{ color: index === 0 ? "#B81D1D" : index === 1 ? "#B45309" : ICON_BLUE }}>{status}</span></div>)}
                      </div>
                      <div className="relative rounded-2xl border p-3" style={{ borderColor: ICON_BORDER, background: "#EEF2FF" }}><div className="mb-2 flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold" style={{ color: ICON_BLUE }}><ShieldCheck className="size-3.5" style={{ color: ICON_GRAY }} />输出门禁</div>{[["URL", false], ["时间", false], ["分类", true], ["格式", true]].map(([label, pass]) => <div key={String(label)} className="mb-1.5 flex items-center justify-between rounded-lg bg-white/78 px-2 py-1.5 last:mb-0"><span className="text-[10px] font-medium" style={{ color: "#4E525E" }}>{label}</span><span className="flex size-4 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: pass ? "#E3F5E3" : "#FFE3E3", color: pass ? "#15803D" : "#B81D1D" }}>{pass ? "✓" : "!"}</span></div>)}</div>
                      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M24 50H30" stroke={BLUE} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" opacity="0.44" /><path d="M70 50H75" stroke={BLUE} strokeWidth="0.8" strokeLinecap="round" opacity="0.58" /></svg>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </Reveal>

          <FourDimensionLoopOverview />

          <FourDimensionDecisionNotes />

          <PromptCompilerPipelineScaffold />

          <Reveal className="mb-8 flex justify-center px-4 text-center" delay={0.16} y={18}>
            <div
              data-output-quality-title-note="true"
              className="relative flex h-[132px] w-[200px] rotate-[-0.7deg] items-center justify-center rounded-[6px] border px-4 py-5 text-[14px] font-semibold leading-[1.6] text-[#35404F] shadow-[0_2px_3px_rgba(28,36,52,0.16),0_7px_14px_rgba(28,36,52,0.055)] sm:h-[118px] sm:w-[280px] sm:px-5 sm:text-[16px] md:h-[136px] md:w-[330px] md:px-6 md:py-6 md:text-[20px]"
              style={{
                background: "repeating-linear-gradient(to bottom, #EEF2FF 0, #EEF2FF 31px, #D8E1FF 32px, #D8E1FF 33px)",
                borderColor: "#C8D4FF",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: INK_DIM, boxShadow: "0 2px 4px rgba(78,82,94,0.22)" }}
              />
              <h3 id="output-quality-tracking-title">模型生成输出质量监测追踪方案</h3>
            </div>
          </Reveal>

          <Reveal
            className="relative z-20 mb-10 px-2 pt-10 md:px-0"
            delay={0.18}
            y={22}
          >
            <div
              data-quality-monitoring-method-pair="true"
              className="relative mx-auto grid w-full max-w-[1400px] gap-12 md:grid-cols-[minmax(0,640px)_minmax(0,640px)] md:justify-between md:gap-14"
            >
              <svg
                data-quality-monitoring-method-plus="true"
                aria-hidden="true"
                viewBox="0 0 36 36"
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-8 -translate-x-1/2 -translate-y-1/2 overflow-visible sm:size-9"
                fill="none"
              >
                <path d="M6.5 18.6C13.4 17.9 22.4 18.2 29.7 17.4" stroke="#4E525E" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18.8 5.8C18.2 13.2 18.7 22.7 17.9 30.1" stroke="#4E525E" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M7.3 19.5C14.6 18.8 23.2 19.1 29.1 18.5" stroke="#4E525E" strokeWidth="0.9" strokeLinecap="round" opacity="0.34" />
              </svg>

              <article
                data-quality-monitoring-note="prompt"
                aria-label="提示词埋点"
                className="quality-monitoring-note quality-monitoring-note--prompt skills-sticky-note relative z-10 flex min-h-[340px] flex-col p-6 pt-12 md:min-h-[360px] md:px-8 md:pb-8 md:pt-14"
              >
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div
                    data-quality-monitoring-method="prompt"
                    className="quality-monitoring-method-tag quality-monitoring-method-tag--prompt flex min-h-[50px] w-[140px] items-center justify-center px-4 text-center text-[18px] font-semibold leading-none text-[#2258F4] sm:min-h-[56px] sm:w-[184px] sm:px-5"
                  >
                    <span className="relative z-10 whitespace-nowrap">提示词埋点</span>
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="divide-y divide-[#DED9CE]">
                    {/* 事前监控 */}
                    <div className="grid grid-cols-[100px_minmax(0,1fr)] items-start gap-3 pb-4 md:grid-cols-[110px_minmax(0,1fr)] md:gap-4 md:pb-5">
                      <div>
                        <span
                          className="inline-flex rounded-lg px-2.5 py-1 text-[16px] font-semibold tracking-tight"
                          style={{ background: "#EEF2FF", color: ICON_BLUE }}
                        >
                          事前监控
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[18px] font-semibold leading-[1.55] tracking-[-0.02em]" style={{ color: INK }}>
                          Prompt §10 · 第一部分｜<QualityMarker tone="blue">输出要包含识别的硬约束</QualityMarker>
                        </h4>
                        <p data-quality-monitoring-purpose="pre" className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[16px] leading-[1.5]">
                          <span className="shrink-0 font-medium text-[#8D94A3]">追踪目的</span>
                          <span className="font-semibold text-[#4E525E]">监测任务理解是否偏离</span>
                        </p>
                      </div>
                    </div>

                    {/* 事中监控 */}
                    <div className="grid grid-cols-[100px_minmax(0,1fr)] items-start gap-3 py-4 md:grid-cols-[110px_minmax(0,1fr)] md:gap-4 md:py-5">
                      <div>
                        <span
                          className="inline-flex rounded-lg px-2.5 py-1 text-[16px] font-semibold tracking-tight"
                          style={{ background: "#FFF6DB", color: "#A85A16" }}
                        >
                          事中监控
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[18px] font-semibold leading-[1.55] tracking-[-0.02em]" style={{ color: INK }}>
                          Prompt §6–7｜<QualityMarker tone="orange">显式阶段流转与状态记录</QualityMarker>
                        </h4>
                        <p data-quality-monitoring-purpose="during" className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[16px] leading-[1.5]">
                          <span className="shrink-0 font-medium text-[#8D94A3]">追踪目的</span>
                          <span className="font-semibold text-[#4E525E]">监测执行时序与合流状态</span>
                        </p>
                      </div>
                    </div>

                    {/* 事后监控 */}
                    <div className="grid grid-cols-[100px_minmax(0,1fr)] items-start gap-3 pt-4 md:grid-cols-[110px_minmax(0,1fr)] md:gap-4 md:pt-5">
                      <div>
                        <span
                          className="inline-flex rounded-lg px-2.5 py-1 text-[16px] font-semibold tracking-tight"
                          style={{ background: "#E8F5E9", color: "#2F7A44" }}
                        >
                          事后监控
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[18px] font-semibold leading-[1.55] tracking-[-0.02em]" style={{ color: INK }}>
                          Prompt §10 · 第三部分｜<QualityMarker tone="green">输出数据缺失与假设说明</QualityMarker>
                        </h4>
                        <p data-quality-monitoring-purpose="post" className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[16px] leading-[1.5]">
                          <span className="shrink-0 font-medium text-[#8D94A3]">追踪目的</span>
                          <span className="font-semibold text-[#4E525E]">监测事实完整度与防幻觉</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article
                data-quality-monitoring-note="human"
                aria-label="输出结果人工核验"
                className="quality-monitoring-note quality-monitoring-note--human skills-sticky-note relative z-10 flex min-h-[340px] flex-col p-6 pt-12 md:min-h-[360px] md:px-8 md:pb-8 md:pt-14"
              >
                <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div
                    data-quality-monitoring-method="human"
                    className="quality-monitoring-method-tag quality-monitoring-method-tag--human flex min-h-[50px] w-[170px] items-center justify-center px-4 text-center text-[18px] font-semibold leading-none text-[#8A5A16] sm:min-h-[56px] sm:w-[184px] sm:px-5"
                  >
                    <span className="relative z-10 whitespace-nowrap">输出结果人工核验</span>
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="divide-y divide-[#E3D6BA]">
                    {[
                      {
                        phase: "constraint",
                        tag: "硬约束核验",
                        summary: "正文开头确认写作范围",
                        value: "发现任务理解偏离即刻中断",
                        color: ICON_BLUE,
                        badgeBg: "#EEF2FF",
                      },
                      {
                        phase: "execution",
                        tag: "执行时序复核",
                        summary: "生成异常步骤定位",
                        value: "依据阶段状态锁定报错位置和原因",
                        color: "#A85A16",
                        badgeBg: "#FFF6DB",
                      },
                      {
                        phase: "evidence",
                        tag: "事实置信度核查",
                        summary: "依照事实声明判断模型是否产生幻觉",
                        value: "文末主动标注数据缺失与假设",
                        color: "#2F7A44",
                        badgeBg: "#E8F5E9",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.phase}
                        data-quality-human-verification-row={item.phase}
                        className={`grid grid-cols-[110px_minmax(0,1fr)] items-start gap-3 md:grid-cols-[130px_minmax(0,1fr)] md:gap-4 ${
                          index === 0 ? "pb-4 md:pb-5" : index === 1 ? "py-4 md:py-5" : "pt-4 md:pt-5"
                        }`}
                      >
                        <div>
                          <span
                            className="inline-flex rounded-lg px-2.5 py-1 text-[16px] font-semibold tracking-tight"
                            style={{ background: item.badgeBg, color: item.color }}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-[18px] font-semibold leading-[1.55] tracking-[-0.02em]" style={{ color: INK }}>
                            {item.summary}
                          </h4>
                          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[16px] leading-[1.5]">
                            <span className="shrink-0 font-medium text-[#8D94A3]">核验价值</span>
                            <span className="font-semibold text-[#4E525E]">{item.value}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>

          </Reveal>

          <Reveal
            className="relative z-0 mt-8 px-2 md:mx-auto md:flex md:w-full md:max-w-[1400px] md:justify-center md:px-0"
            delay={0.18}
            y={24}
          >
            <div
              data-stream-verification-composite="true"
              className="relative flex w-full max-w-[880px] flex-col items-center md:flex-row md:items-center md:justify-center"
            >
              <div
                data-stream-process-sticker="true"
                className="relative z-20 w-full max-w-[500px] rotate-[-0.6deg] transition-transform duration-200 hover:rotate-0"
                style={{ filter: "url(#s05-context-sticker-filter)" }}
              >
                <StreamProcessEvidence />
              </div>

              <aside
                data-stream-verification-notes="true"
                aria-label="生成过程核验点"
                className="relative z-30 mt-6 flex w-full max-w-[500px] flex-col items-center gap-4 md:-ml-4 md:mt-0 md:w-[310px] md:max-w-none md:gap-5"
                style={{ filter: "url(#s05-context-sticker-filter)" }}
              >
                {[
                  {
                    phase: "事前核验",
                    title: "硬约束核验",
                    detail: "正文开头确认写作范围，若任务理解偏离即刻中断",
                    tagBg: "#EEF2FF",
                    tagColor: ICON_BLUE,
                    rotate: "rotate-[1.4deg]",
                  },
                  {
                    phase: "事中核验",
                    title: "跳步核验",
                    detail: "依据阶段状态锁定报错位置，触发自动重试或人工干预",
                    tagBg: "#FFF6DB",
                    tagColor: "#B45309",
                    rotate: "rotate-[-1.2deg]",
                  },
                  {
                    phase: "事后核验",
                    title: "事实置信度核验",
                    detail: "文末主动标注数据缺失与假设说明，严禁幻觉扩写",
                    tagBg: "#E8F5E9",
                    tagColor: "#2F7A44",
                    rotate: "rotate-[1deg]",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    data-stream-verification-note={card.title}
                    className={`relative w-full rounded-2xl border bg-white p-4 sm:p-5 shadow-[0_6px_22px_rgba(56,67,92,0.08),0_1px_3px_rgba(56,67,92,0.04)] ${card.rotate} transition-transform duration-200 hover:rotate-0 hover:z-40`}
                    style={{ borderColor: "#E6E7EB" }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-[18px] font-bold text-[#1A1C24]">{card.title}</h5>
                      <span
                        className="inline-flex shrink-0 rounded-md px-2 py-0.5 text-[14px] font-semibold tracking-tight"
                        style={{ background: card.tagBg, color: card.tagColor }}
                      >
                        {card.phase}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] sm:text-[16px] leading-[1.55] text-[#696D7A]">{card.detail}</p>
                  </div>
                ))}
              </aside>
            </div>
          </Reveal>

          <Reveal delay={0.16} y={22}>
            <PromptCompilerValueReflection />
          </Reveal>
        </div>
      </section>

      {/* Footer Case Navigation */}
      <div className={`relative ${SECTION_PAD} pb-8`}>
        <div className={READ}>
          <ProjectCaseNav currentCase="ai-report" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
