import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowRight,
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
  Workflow,
  ListChecks,
  PenLine,
  Wand2,
} from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    <div className={`${hasSubtitle ? "mb-12 md:mb-16" : "mb-4"} ${center ? "text-center flex flex-col items-center" : ""}`}>
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

function AgentWorkflowDiagram() {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border bg-white p-2.5"
    >
      <div className="px-3 pb-5 pt-4 sm:px-4 md:px-5 md:pt-5 lg:flex lg:items-start lg:justify-between lg:gap-4">
        <div className="max-w-[730px]">
          <div className="text-[24px] font-semibold leading-[1.3] tracking-tight text-[#1D2333]">
            Agent 报告生成工作流
          </div>
          <p className="mt-2 text-[16px] leading-[1.65]" style={{ color: "#596174" }}>
            章节提示词编排嵌在多节点 Agent 工作流里，作为稳定执行规则，而不是孤立写 prompt。
          </p>
        </div>
        <div
          className="w-fit shrink-0 rounded-xl border px-4 py-2.5 text-[12px] leading-[1.5]"
          style={{ borderColor: ICON_BORDER, background: ICON_BG, color: ICON_BLUE }}
        >
          <div>Plan-and-Execute 负责整体规划</div>
          <div>ReAct 负责单章节执行</div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-[#FAFBFF] py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-55"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(34,88,244,0.13) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative overflow-x-auto">
          <img
            src="./images/章节提示词/line-01.svg"
            alt="Agent 报告生成工作流"
            {...DETAIL_IMAGE_LAZY_PROPS}
            className="mx-auto block h-auto w-[950px] max-w-none"
            draggable={false}
          />
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
          src="./images/ai-report-flow/step-02-final-outline.png"
          alt="章节大纲确认页面外层框架"
          {...DETAIL_IMAGE_LAZY_PROPS}
          className="absolute inset-0 h-full w-full object-contain object-top"
        />
      )}
      {showContent && <div className="absolute left-[30.9%] top-[7.4%] h-[88.5%] w-[52.1%] overflow-hidden">
        <img
          src="./images/ai-report-flow/step-02-final-outline-02.png"
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
  const flowSectionRef = useRef<HTMLElement | null>(null);
  const flowStageRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(0);

  const heroToggleImages = [
    "./images/ai-report-hero-toggle-01.png",
    "./images/ai-report-hero-toggle-02.png",
  ];
  const heroToggleCaptions = [
    "学习文档风格，生成一致表达",
    "理解原文风格，完成结构化仿写",
  ];

  const validationPanels = [
    {
      label: "之前状态",
      summary: "人工整理、模板套用、手动校对",
      heroCard: {
        icon: Workflow,
        title: "Excel + Word + 模板的手工链路",
        desc: "多个工具分散承载数据处理、内容组织和格式交付，无法沉淀成下一次可直接复用的生成流程。",
        meta: "原始流程",
      },
      cards: [
        { icon: Database, title: "Excel 处理", desc: "整理企业名单、动态项和统计口径。", tag: "数据整理" },
        { icon: FileText, title: "Word 编辑", desc: "按固定模板补充章节和正文。", tag: "人工撰写" },
        { icon: Layers, title: "模板套用", desc: "模板固定，难覆盖每次变化的企业范围。", tag: "结构约束" },
        { icon: CheckCircle2, title: "人工校对", desc: "逐项确认来源、企业名称和表达准确性。", tag: "质量检查" },
      ],
    },
    {
      label: "问题来源",
      summary: "客户需求、内部测试、反馈沉淀",
      heroCard: {
        icon: Users,
        title: "客户直接找团队手写报告",
        desc: "当报告口径、企业范围和章节重点发生变化时，固定模板很难独立完成交付，团队需要重新组织材料。",
        meta: "客户需求",
      },
      cards: [
        { icon: Compass, title: "报告口径变化", desc: "地区、产业和企业范围变化后，同类报告也需要调整。", tag: "场景差异" },
        { icon: ListChecks, title: "内部测试反馈", desc: "大纲结构、动态项引用和生成结果需要前置校验。", tag: "可控性" },
        { icon: Link2, title: "来源追溯缺口", desc: "投融资、迁入迁出等内容需要保留来源链接。", tag: "可信度" },
        { icon: ShieldCheck, title: "交付风险", desc: "缺少统一规则时，结构遗漏和来源缺失更难发现。", tag: "稳定性" },
      ],
    },
    {
      label: "验证场景",
      summary: "区域企业动态监测周报",
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
      image: "./images/ai-report-flow/step-01-blank-canvas.png",
      sidebar: "./images/ai-report-flow/step-01-sidebar.png",
      finalImage: "./images/ai-report-flow/step-01-final-template-center.png",
      templateCards: [
        {
          src: "./images/ai-report-flow/step-01-template-region.png",
          label: "区域监测报告",
          className: "left-[19%] top-[17%] w-[19.5%]",
          from: { x: -80, y: 60 },
        },
        {
          src: "./images/ai-report-flow/step-01-template-opinion.png",
          label: "地区舆情分析报告",
          className: "left-[41.5%] top-[17%] w-[19.5%]",
          from: { x: 0, y: 80 },
        },
        {
          src: "./images/ai-report-flow/step-01-template-chain.png",
          label: "产业链区域画像",
          className: "left-[86.5%] top-[17%] w-[19.5%]",
          from: { x: 90, y: 70 },
        },
        {
          src: "./images/ai-report-flow/step-01-template-futian.png",
          label: "福田监测",
          className: "left-[64%] top-[17%] w-[19.5%]",
          from: { x: 130, y: -36 },
          emphasis: true,
        },
      ],
      callouts: [],
      decision: "先让用户选择报告类型，而不是直接输入需求。",
      why: "让报告生成从明确场景进入，降低用户不知道如何开始的问题。",
    },
    {
      label: "大纲生成",
      tagline: "先定结构",
      icon: GitBranch,
      placeholder: "章节大纲生成页面",
      image: "./images/ai-report-flow/step-01-blank-canvas.png",
      finalImage: "./images/ai-report-flow/step-02-final-outline.png",
      compactCanvas: true,
      decision: "系统先生成章节大纲，再进入正文生成。",
      why: "把控制点前置，避免用户等到全文生成后才发现结构不对。",
    },
    {
      label: "用户确认",
      tagline: "确认方向",
      icon: CheckCircle2,
      placeholder: "大纲确认页面",
      image: "./images/ai-report-flow/step-02-final-outline-02.png",
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
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.18 }}
              className="mx-auto mt-9 grid max-w-[860px] grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-4"
            >
              {[
                { label: "项目类型", value: "AI 报告生成 · B 端 SaaS" },
                { label: "项目阶段", value: "1.0版本上线" },
                { label: "主要场景", value: "企业 / 产业 / 地区监测报告" },
                { label: "我的角色", value: "产品设计师" },
              ].map((m) => (
                <div key={m.label} className="text-left md:text-center">
                  <div style={{ ...T.metaLabel, fontSize: 14 }} className="mb-2">
                    {m.label}
                  </div>
                  <div style={T.metaValue}>{m.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.78, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-9 max-w-[1060px] overflow-visible rounded-[32px]"
          >
            <img
              src="./images/ai-report-hero-full.png"
              alt="AI 报告生成产品完整界面"
              {...DETAIL_IMAGE_EAGER_PROPS}
              className="block h-auto w-full rounded-[32px] border border-white/80 object-contain shadow-[0_30px_90px_rgba(15,20,25,0.14)]"
            />

            {/* Decorative placeholder thumbnails around hero */}
            <div className="absolute top-[10%] -left-[18%] z-10 w-[20%] max-w-[190px]">
              <img
                src="./images/ai-repor- left-01.png"
                alt="模板中心截图"
                {...DETAIL_IMAGE_LAZY_PROPS}
                className="w-full overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(15,20,25,0.12)]"
                style={{ transform: "rotate(-6deg) scale(1.3)", transformOrigin: "center" }}
              />
            </div>

            <div className="absolute top-[8%] -right-[14%] z-10 w-[18%] max-w-[170px]">
              <img
                src="./images/ai- report-right-01.png"
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

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mx-auto mt-7 grid max-w-[1240px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Workflow, t: "生成流程设计", d: "模板选择到大纲确认、流式生成的端到端链路" },
              { icon: Settings2, t: "配置体验与关键页面", d: "报告配置、模板中心、历史文档等核心页面" },
              { icon: ListChecks, t: "大纲确认与修改", d: "在生成前建立可控的结构化输入，减少生成偏差" },
              { icon: PenLine, t: "提示词标准化探索", d: "把提示词从经验写法转为可维护结构" },
            ].map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.t}
                  className="relative rounded-2xl border p-5 shadow-[0_18px_50px_rgba(15,20,25,0.08)]"
                  style={{
                    borderColor: LINE,
                    background: "rgba(255,255,255,0.94)",
                  }}
                >
                  <div>
                    <div className="mb-1.5 flex items-start gap-3">
                      <div className="min-w-0 flex-1" style={{ fontSize: 18, fontWeight: 600, color: INK, lineHeight: 1.35 }}>{r.t}</div>
                      <span className="mt-1 inline-flex size-4 shrink-0 items-center justify-center" style={{ color: ICON_GRAY }}>
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: INK_MUTED }}>{r.d}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 02. Validation scenario ===== */}
      <section
        id="s02"
        className={`relative z-0 overflow-hidden pt-24 pb-24 md:pt-28 md:pb-32 ${SECTION_PAD}`}
      >
        <BlueAccentBlob side="left" />
        <div className={`relative ${READ}`}>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)]">
              <div className="relative px-6 py-7 sm:px-8 md:py-9 xl:px-10">
                <h3 className="max-w-[520px] tracking-tight text-[#1A1C24]" style={T.h2}>
                  为什么要重做报告生产流程
                </h3>
                <p className="mt-4 max-w-[540px]" style={T.h2Sub}>
                  企业用户、产业分析师和政府部门仍在用 Excel、Word 和固定模板整理报告。每次企业范围、报告维度和来源材料变化时，人工链路都很难稳定复用。
                </p>

                <div className="mt-9 grid gap-3">
                  {validationPanels.map((item, index) => {
                    const isActive = activeValidationIndex === index;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setActiveValidationIndex(index)}
                        className="group flex items-start gap-4 rounded-[18px] border px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8BEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFBFF]"
                        style={{
                          borderColor: isActive ? ICON_BORDER : LINE,
                          background: isActive ? ICON_BG : SURFACE,
                        }}
                        aria-pressed={isActive}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold leading-[1.35] text-[#1A1C24]">
                            {item.label}
                          </span>
                          <span
                            className="mt-1 block text-[13px] leading-[1.45]"
                            style={{ color: isActive ? ICON_BLUE : INK_MUTED }}
                          >
                            {item.summary}
                          </span>
                        </span>
                        <ArrowRight
                          className="mt-2 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: isActive ? ICON_BLUE : ICON_GRAY }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden px-6 py-7 sm:px-8 md:py-9 xl:px-10">
                <AnimatePresence mode="wait">
                  {(() => {
                    const panel = validationPanels[activeValidationIndex];
                    const primaryRow = {
                      icon: panel.heroCard.icon,
                      title: panel.heroCard.title,
                      desc: panel.heroCard.desc,
                      tag: panel.heroCard.meta,
                      isPrimary: true,
                    };
                    const rows = [
                      { ...panel.cards[0], isPrimary: false },
                      { ...panel.cards[1], isPrimary: false },
                      primaryRow,
                      { ...panel.cards[2], isPrimary: false },
                      { ...panel.cards[3], isPrimary: false },
                    ];
                    const rowLayout = [
                      {
                        width: "min(430px, 68%)",
                        marginTop: "0px",
                        opacity: 1,
                        blur: "blur(0.65px)",
                        zIndex: 1,
                        isSoft: true,
                      },
                      {
                        width: "min(570px, 86%)",
                        marginTop: "10px",
                        opacity: 1,
                        blur: "none",
                        zIndex: 5,
                        isSoft: false,
                      },
                      {
                        width: "min(640px, 96%)",
                        marginTop: "10px",
                        opacity: 1,
                        blur: "none",
                        zIndex: 6,
                        isSoft: false,
                      },
                      {
                        width: "min(570px, 86%)",
                        marginTop: "10px",
                        opacity: 1,
                        blur: "none",
                        zIndex: 5,
                        isSoft: false,
                      },
                      {
                        width: "min(430px, 68%)",
                        marginTop: "10px",
                        opacity: 1,
                        blur: "blur(0.55px)",
                        zIndex: 1,
                        isSoft: true,
                      },
                    ];
                    return (
                      <motion.div
                        key={panel.label}
                        className="relative z-10 flex w-full max-w-[660px] flex-col items-center justify-center"
                        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {rows.map((row, index) => {
                          const RowIcon = row.icon;
                          const isPrimary = row.isPrimary;
                          const layout = rowLayout[index];
                          const isSoft = layout.isSoft;
                          return (
                            <motion.article
                              key={row.title}
                              className="relative flex min-h-[50px] items-center gap-3 rounded-[16px] border bg-white p-4"
                              style={{
                                borderColor: isPrimary ? ICON_BORDER : isSoft ? "#EEF0F5" : LINE,
                                background: SURFACE,
                                width: layout.width,
                                marginTop: layout.marginTop,
                                opacity: layout.opacity,
                                filter: layout.blur,
                                zIndex: layout.zIndex,
                              }}
                              initial={{ opacity: 0, y: 16, scale: 0.98 }}
                              animate={{ opacity: layout.opacity, y: 0, scale: 1 }}
                              transition={{ duration: 0.34, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <span
                                className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl border"
                                style={{
                                  borderColor: isPrimary ? ICON_BORDER : isSoft ? "#EEF0F5" : LINE,
                                  background: isPrimary ? ICON_BG : SURFACE_2,
                                  color: isPrimary ? ICON_BLUE : isSoft ? "#8D94A3" : INK_DIM,
                                }}
                              >
                                <RowIcon className="size-4" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className="block text-[14px] font-semibold leading-[1.25]"
                                  style={{ color: isSoft ? "#8D94A3" : "#1A1C24" }}
                                >
                                  {row.title}
                                </span>
                                <span
                                  className={`mt-0.5 block text-[12px] leading-[1.35] ${isPrimary ? "whitespace-normal" : "max-w-[430px] truncate"}`}
                                  style={{ color: isSoft ? "#A8ADBA" : "#696D7A" }}
                                >
                                  {row.desc}
                                </span>
                              </span>
                            </motion.article>
                          );
                        })}
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 03. Interactive flow: 模板选择 → 历史文档 ===== */}
      <section
        id="s03"
        ref={flowSectionRef}
        className={`relative z-10 isolate overflow-hidden bg-[#FAFBFF] py-20 md:py-28 lg:min-h-screen lg:py-0 ${SECTION_PAD}`}
      >
        <div
          ref={flowStageRef}
          className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] items-start pb-10 pt-40 lg:pt-[clamp(8.5rem,15vh,11rem)]"
        >
          <div className="w-full">
            <SectionHeader
              index="03"
              kicker="生成流程"
              title="从模板到成文的生成链路"
              subtitle="通过大纲确认、用户确认和流式生成，把 AI 报告从一次性写作变成可控的业务流程。"
              align="center"
            />

            {(() => {
              const p0 = stepLocalProgress(0);
              const p1 = stepLocalProgress(1);
              const p2 = stepLocalProgress(2);
              const p3 = stepLocalProgress(3);
              const p4 = stepLocalProgress(4);

              const templateFinal = rangeProgress(p0, 0.62, 0.84);
              const templateCardIn = rangeProgress(p0, 0.12, 0.42);

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
                      <div
                        className="absolute left-[3%] right-[4%] top-[12%] bottom-[8%] rounded-[34px]"
                        style={{
                          background:
                            "radial-gradient(circle at 18% 18%, rgba(34,88,244,0.16), transparent 32%), linear-gradient(135deg, #F8FAFF, #EEF3FF 52%, #FFFFFF)",
                          boxShadow: "inset 0 0 0 1px rgba(34,88,244,0.08), 0 28px 80px rgba(34,88,244,0.08)",
                        }}
                      />
                      <div
                        className="absolute inset-0 m-auto w-[99%] overflow-visible"
                        style={{ aspectRatio: "16 / 10" }}
                      >
                        <img
                          src="./images/ai-report-flow/step-01-blank-canvas.png"
                          alt="模板中心页面"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="relative h-full w-full rounded-[22px] border border-white/80 object-contain object-top shadow-[0_24px_70px_rgba(15,20,25,0.12)]"
                          style={{
                            opacity: 1 - templateFinal,
                            filter: `blur(${lerp(0, 8, templateFinal)}px)`,
                          }}
                        />
                      </div>
                      <img
                        src="./images/ai-report-flow/step-01-sidebar.png"
                        alt="模板中心侧边栏"
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="absolute left-[0.6%] top-[-2%] z-20 h-[104%] rounded-[15px] object-contain object-top shadow-[10px_0_24px_rgba(15,20,25,0.07)]"
                        style={{
                          opacity: templateCardIn * (1 - templateFinal),
                          transform: `translate3d(${lerp(-140, 0, templateCardIn)}px, 0, 0)`,
                        }}
                      />
                      {flowSteps[0].templateCards?.map((item, index) => (
                        <img
                          key={item.src}
                          src={item.src}
                          alt={item.label}
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className={`absolute z-20 rounded-[14px] object-contain object-top ${
                            item.emphasis
                              ? "shadow-[0_24px_56px_rgba(34,88,244,0.18)]"
                              : "shadow-[0_18px_42px_rgba(15,20,25,0.14)]"
                          } ${item.className}`}
                          style={{
                            opacity: templateCardIn * (1 - templateFinal),
                            transform: `translate3d(${lerp(item.from.x, 0, templateCardIn)}px, ${lerp(item.from.y, 0, templateCardIn)}px, 0) scale(${item.emphasis ? lerp(0.96, 1.015, templateCardIn) : lerp(0.96, 1, templateCardIn)})`,
                          }}
                        />
                      ))}
                      <img
                        src={flowSteps[0].finalImage}
                        alt="模板中心完整页面"
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="absolute inset-0 z-30 m-auto w-[99%] rounded-[24px] border border-white/80 object-contain object-top shadow-[0_28px_80px_rgba(15,20,25,0.14)]"
                        style={{
                          aspectRatio: "16 / 10",
                          opacity: templateFinal,
                          transform: `translate3d(0, ${lerp(26, 0, templateFinal)}px, 0)`,
                          filter: `blur(${lerp(10, 0, templateFinal)}px)`,
                        }}
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
                          src="./images/04/kongbaihuabu.png"
                          alt="流式生成空白画布"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute inset-0 h-full w-full object-contain object-top"
                        />
                        <img
                          src="./images/04/liushihuaban.png"
                          alt="流式生成报告空白面板"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute right-0 top-0 z-20 h-full w-[60.7%] object-contain object-top"
                          style={{
                            opacity: streamPanelIn,
                            transform: `translate3d(${lerp(110, 0, streamPanelIn)}px, 0, 0)`,
                            clipPath: `inset(0 0 0 ${lerp(100, 0, streamPanelIn)}%)`,
                            filter: `blur(${lerp(5, 0, streamPanelIn)}px)`,
                          }}
                        />
                        <img
                          src="./images/optimized/ai-stream-text-1400.jpg"
                          alt="流式生成报告正文"
                          {...DETAIL_IMAGE_LAZY_PROPS}
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
                          src="./images/05/lishijilupng.png"
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

      {/* ===== 04. Product design — strategy cards with default visuals ===== */}
      <section
        id="s04"
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
              index="04"
              kicker="产品设计方案"
              title="从数据、对象、章节三层控制生成边界"
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
                desc:
                  "系统默认数据无法覆盖所有报告依据，用户还需要补充外部资料和本地知识。我将系统数据、外链知识和本地知识库做成可选输入，并保留章节引用来源。",
                points: ["系统数据", "外链知识", "本地知识库", "来源追溯"],
                visual: "知识库页面大图",
                image: "./images/optimized/ai-data01-1600.jpg",
              },
              {
                icon: Users,
                title: "企业范围复用",
                desc:
                  "企业名单已经在产业平台中沉淀，如果重新选择会增加重复成本。我打通企业监控和企业分组，让已维护的企业对象直接进入报告生成流程。",
                points: ["企业监控", "企业分组", "账户权限", "跨系统关联"],
                visual: "跨系统联动关系图",
                image: "./images/optimized/ai-group02-1600.jpg",
                overlayImage: "./images/optimized/ai-group01-1600.jpg",
              },
              {
                icon: GitBranch,
                title: "章节结构匹配",
                desc:
                  "高频报告结构相似，但每次从头配置会影响效率和一致性。我通过相似章节匹配和内置章节复用，让报告结构更稳定，也方便用户二次调整。",
                points: ["用户输入匹配", "编辑新增匹配", "内置章节复用"],
                visual: "章节匹配逻辑截图",
                image: "./images/optimized/ai-marry01-1600.jpg",
                overlayImage: "./images/设计方案/marry02.png",
                overlayRaw: true,
              },
            ];
            const [primaryStrategy, ...secondaryStrategies] = designStrategies;
            const PrimaryIcon = primaryStrategy.icon;
            return (
              <div className="space-y-6">
                <div
                  className="grid items-center gap-7 overflow-hidden rounded-[28px] border pt-5 pr-5 pl-5 md:pt-6 md:pr-6 md:pl-6 pb-0 lg:grid-cols-[0.72fr_1.28fr]"
                  style={{
                    borderColor: LINE,
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.93), rgba(246,248,255,0.84))",
                  }}
                >
                  <div className="self-start">
                    <div className="py-1">
                      <span className="mb-8 inline-flex size-4 shrink-0 items-center justify-center" style={{ color: ICON_GRAY }}>
                        <PrimaryIcon className="size-4" />
                      </span>
                      <h3 className="mb-3" style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: INK }}>
                        {primaryStrategy.title}
                      </h3>
                      <p className="mb-5" style={bodyText}>
                        {primaryStrategy.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {primaryStrategy.points.map((point) => (
                          <span
                            key={point}
                            className="rounded-full border px-3 py-1.5"
                            style={{
                              borderColor: ICON_BORDER,
                              background: "rgba(229,235,255,0.6)",
                              color: ICON_BLUE,
                              fontSize: 13,
                              lineHeight: 1.25,
                              fontWeight: 500,
                            }}
                          >
                            {point}
                          </span>
                        ))}
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
                    <div
                      className="pointer-events-none absolute -left-[72%] -right-6 bottom-0 z-20 h-20 md:-right-7"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(248,250,255,0), rgba(248,250,255,0.92))",
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {secondaryStrategies.map((strategy) => {
                const Icon = strategy.icon;
                return (
                  <div
                    key={strategy.title}
                    className="grid min-h-[480px] grid-rows-[auto_1fr] gap-5 overflow-hidden rounded-[28px] border pt-5 pr-5 pl-5 md:pt-6 md:pr-6 md:pl-6 pb-0"
                    style={{
                      borderColor: LINE,
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.93), rgba(246,248,255,0.84))",
                    }}
                  >
                    <div>
                      <span className="mb-8 inline-flex size-4 shrink-0 items-center justify-center" style={{ color: ICON_GRAY }}>
                        <Icon className="size-4" />
                      </span>
                      <h3 className="mb-3" style={{ fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: INK }}>
                        {strategy.title}
                      </h3>
                      <p className="mb-5" style={bodyText}>
                        {strategy.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {strategy.points.map((point) => (
                          <span
                            key={point}
                            className="rounded-full border px-3 py-1.5"
                            style={{
                              borderColor: ICON_BORDER,
                              background: "rgba(229,235,255,0.6)",
                              color: ICON_BLUE,
                              fontSize: 13,
                              lineHeight: 1.25,
                              fontWeight: 500,
                            }}
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`relative flex min-h-0 items-end rounded-2xl ${strategy.overlayImage ? "overflow-visible" : "overflow-hidden"}`}
                      style={{ aspectRatio: "16 / 10.5" }}
                    >
                      {strategy.overlayImage ? (
                        <div className="relative h-full w-full">
                          <img
                            src={strategy.image}
                            alt={`${strategy.title}主界面`}
                            {...DETAIL_IMAGE_LAZY_PROPS}
                            className={`absolute z-10 object-contain ${
                              strategy.overlayRaw
                                ? "left-[3%] top-[-2%] w-[92%] -rotate-[2deg] rounded-2xl shadow-[0_10px_28px_rgba(15,20,25,0.08)]"
                                : "right-0 top-0 w-[88%] rotate-[1.5deg] rounded-2xl shadow-[0_6px_16px_rgba(15,20,25,0.07)]"
                            }`}
                          />
                          <img
                            src={strategy.overlayImage}
                            alt={`${strategy.title}交互状态`}
                            {...DETAIL_IMAGE_LAZY_PROPS}
                            className={`absolute z-20 object-contain ${
                              strategy.overlayRaw
                                ? "right-[-10%] bottom-[-6%] w-[84%] rotate-[2deg] drop-shadow-[0_22px_42px_rgba(15,20,25,0.16)]"
                                : "left-0 -bottom-4 w-[82%] -rotate-[3deg] rounded-2xl shadow-[0_20px_48px_rgba(15,20,25,0.18)]"
                            }`}
                          />
                          {strategy.overlayRaw && (
                            <div className="absolute left-[18%] top-[36%] z-30 flex rotate-[-11.5deg] flex-col items-center">
                              <span
                                className="rounded-lg px-3.5 py-2 text-xs font-semibold leading-none text-white"
                                style={{
                                  background: BLUE,
                                }}
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
                          )}
                          <div
                            className="pointer-events-none absolute -left-5 -right-5 bottom-0 z-30 h-20 md:-left-6 md:-right-6"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(248,250,255,0), rgba(248,250,255,0.95))",
                            }}
                          />
                        </div>
                      ) : strategy.image ? (
                        <img
                          src={strategy.image}
                          alt={strategy.visual}
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Placeholder size="lg" ratio="auto" label={strategy.visual} />
                      )}
                    </div>
                  </div>
                );
                  })}
                </div>
              </div>
            );
          })()}
          </Reveal>
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
              kicker="章节提示词编排规则"
              title="章节提示词编排规则"
              subtitle=""
            />
          </Reveal>

          <Reveal className="mb-12 max-w-[860px]" delay={0.08}>
            <p style={bodyText}>
              将用户指令、章节背景和执行限制统一注入章节智能体，让每个章节都能按稳定流程完成检索、合流、校验和输出。
            </p>
          </Reveal>

          <Reveal className="mb-6" delay={0.16} y={24}>
            <AgentWorkflowDiagram />
          </Reveal>

          <Reveal className="mb-6 grid gap-4 md:grid-cols-3" delay={0.2} y={20}>
            {[
              {
                title: "上下文漂移",
                desc: "章节生成容易脱离父节点、章节位置和报告大纲。因此需要在每次生成前注入章节背景和当前任务范围。",
                visual: "context",
              },
              {
                title: "维护成本高",
                desc: "如果提示词依赖个人经验，换人后效果很难复现。因此需要把写法拆成统一模块，让规则可以复用和维护。",
                visual: "maintenance",
              },
              {
                title: "质量不可控",
                desc: "来源、时间、字段和格式如果没有约束，结果容易不稳定。因此需要设置输出门禁，未通过检查不进入最终结果。",
                visual: "quality",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[28px] border bg-white p-2.5"
              >
                <div
                  className="relative flex h-52 items-center justify-center overflow-hidden rounded-xl"
                  style={{
                    background: "#FAFBFF",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-55"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(34,88,244,0.13) 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />
                  {item.visual === "context" && (
                    <div className="relative mt-10 grid w-[90%] grid-cols-[43%_14%_43%] items-center">
                      <div className="relative rounded-2xl border bg-white p-3 shadow-[0_14px_26px_rgba(15,20,25,0.06)]" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[11px] font-semibold" style={{ color: ICON_BLUE }}>
                          报告大纲树
                        </div>
                        {[
                          ["第二章", "产业分析", false],
                          ["2.1", "区域概况", false],
                          ["2.2", "重点企业监测", true],
                          ["2.3", "风险研判", false],
                        ].map(([prefix, label, active]) => (
                          <div
                            key={`${prefix}-${label}`}
                            className="mb-1.5 grid grid-cols-[32px_1fr] items-center gap-1.5 rounded-lg px-2 py-1.5 last:mb-0"
                            style={{
                              background: active ? "#EEF2FF" : "transparent",
                              color: active ? ICON_BLUE : "#4E525E",
                              border: "1px solid transparent",
                            }}
                          >
                            <span className="whitespace-nowrap text-[10px] font-semibold">{prefix}</span>
                            <span className="truncate text-[11px] font-medium">{label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="relative h-24">
                        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 72 96" fill="none" aria-hidden="true">
                          <path
                            d="M0 66 C20 66 24 38 40 38 C56 38 48 72 72 72"
                            stroke={BLUE}
                            strokeWidth="1.5"
                            strokeDasharray="5 5"
                            strokeLinecap="round"
                            opacity="0.42"
                          />
                          <circle cx="1" cy="66" r="3" fill={BLUE} opacity="0.8" />
                          <circle cx="71" cy="72" r="3" fill={BLUE} opacity="0.28" />
                        </svg>
                        <div className="absolute left-1/2 top-[8px] flex w-[78px] -translate-x-1/2 flex-col gap-1 text-center text-[10px] leading-[1.25]">
                          <div className="rounded-full px-1.5 py-0.5" style={{ background: "#FFE3E3", color: "#B81D1D" }}>父节点丢失</div>
                          <div className="rounded-full px-1.5 py-0.5" style={{ background: "#FFF6DB", color: "#B45309" }}>章节弱化</div>
                        </div>
                      </div>

                      <div className="relative mt-4 rounded-2xl border bg-white p-3 shadow-[0_14px_26px_rgba(15,20,25,0.06)]" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[12px] font-semibold text-neutral-900">企业动态汇总</div>
                        <div className="space-y-2">
                          <div className="h-2 w-[88%] rounded-full bg-neutral-200" />
                          <div className="h-2 w-full rounded-full bg-neutral-200" />
                          <div className="h-2 w-[72%] rounded-full bg-neutral-200" />
                          <div className="mt-3 rounded-lg px-2 py-1.5 text-[10px]" style={{ background: "#FFF6DB", color: "#B45309" }}>
                            偏向泛化动态，脱离 2.2 章节定位
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.visual === "maintenance" && (
                    <div className="relative h-full w-[90%]">
                      <div className="absolute right-0 top-3 flex items-center gap-1 rounded-full border bg-white/92 px-2 py-1 text-[10px] font-medium" style={{ borderColor: "#E6E7EB", color: "#B81D1D" }}>
                        <Sparkles className="size-3.5" style={{ color: ICON_GRAY }} />
                        效果不可复现
                      </div>
                      <div className="absolute bottom-5 left-3 right-3 border-t border-dashed" style={{ borderColor: "rgba(34,88,244,0.32)" }} />
                      <div className="absolute right-0 bottom-3 rounded-full px-3 py-1 text-[10px] font-medium" style={{ background: "#FFF6DB", color: "#B45309" }}>
                        统一结构缺失
                      </div>
                      {[
                        { owner: "Designer A", x: 0, y: 42, modules: ["目标", "工具", "输出"] },
                        { owner: "PM B", x: 28, y: 78, modules: ["角色", "示例", "规则"] },
                        { owner: "运营 C", x: 56, y: 56, modules: ["限制", "流程", "兜底"] },
                      ].map((doc, index) => (
                        <div
                          key={doc.owner}
                          className="absolute w-[31%] rounded-2xl border bg-white p-3 shadow-[0_14px_26px_rgba(15,20,25,0.06)]"
                          style={{
                            left: `${doc.x}%`,
                            top: doc.y,
                            borderColor: "#E6E7EB",
                          }}
                        >
                          <div className="mb-2 inline-flex rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: "#EEF2FF", color: ICON_BLUE }}>
                            {doc.owner}
                          </div>
                          <div className="space-y-1.5">
                            {doc.modules.map((module, moduleIndex) => (
                              <div
                                key={module}
                                className="rounded-lg px-2 py-1.5 text-[10px] font-medium"
                                style={{
                                  background: moduleIndex === 1 ? "#EEF2FF" : "#FAFBFF",
                                  color: moduleIndex === 1 ? ICON_BLUE : "#696D7A",
                                }}
                              >
                                {module}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.visual === "quality" && (
                    <div className="relative mt-6 grid w-[92%] grid-cols-[22%_47%_25%] items-center gap-[3%]">
                      <div className="space-y-2">
                        {["key_info", "deep_search", "file_tool"].map((source) => (
                          <div
                            key={source}
                            className="whitespace-nowrap rounded-full border bg-white px-2.5 py-1.5 text-center text-[10px] font-medium shadow-sm"
                            style={{ borderColor: "#CBCDD4", color: "#4E525E" }}
                          >
                            {source}
                          </div>
                        ))}
                      </div>

                      <div className="relative rounded-2xl border bg-white p-3 shadow-[0_14px_26px_rgba(15,20,25,0.06)]" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-2 text-[11px] font-semibold" style={{ color: ICON_BLUE }}>
                          统一候选池
                        </div>
                        {[
                          ["缺 URL", "#FFE3E3"],
                          ["时间超范围", "#FFF6DB"],
                          ["分类未确认", "#EEF2FF"],
                        ].map(([status, bg], index) => (
                          <div key={status} className="mb-2 grid grid-cols-[1fr_auto] items-center gap-2 rounded-lg px-2.5 py-2 last:mb-0" style={{ background: bg }}>
                            <div className="space-y-1">
                              <div className="h-1.5 w-full rounded-full bg-white/80" />
                              <div className="h-1.5 w-[70%] rounded-full bg-white/80" />
                            </div>
                            <span className="whitespace-nowrap text-[10px] font-medium" style={{ color: index === 0 ? "#B81D1D" : index === 1 ? "#B45309" : ICON_BLUE }}>
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="relative rounded-2xl border p-3 shadow-[0_14px_26px_rgba(34,88,244,0.08)]" style={{ borderColor: ICON_BORDER, background: "#EEF2FF" }}>
                        <div className="mb-2 flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold" style={{ color: ICON_BLUE }}>
                          <ShieldCheck className="size-3.5" style={{ color: ICON_GRAY }} />
                          输出门禁
                        </div>
                        {[
                          ["URL", false],
                          ["时间", false],
                          ["分类", true],
                          ["格式", true],
                        ].map(([label, pass]) => (
                          <div key={String(label)} className="mb-1.5 flex items-center justify-between rounded-lg bg-white/78 px-2 py-1.5 last:mb-0">
                            <span className="text-[10px] font-medium" style={{ color: "#4E525E" }}>{label}</span>
                            <span className="flex size-4 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: pass ? "#E3F5E3" : "#FFE3E3", color: pass ? "#15803D" : "#B81D1D" }}>
                              {pass ? "✓" : "!"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                        <path d="M24 50H30" stroke={BLUE} strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" opacity="0.44" />
                        <path d="M70 50H75" stroke={BLUE} strokeWidth="0.8" strokeLinecap="round" opacity="0.58" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="px-1.5 pb-1 pt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="flex size-6 items-center justify-center rounded-md text-[12px] font-semibold"
                      style={{ background: "#E5EBFF", color: ICON_BLUE }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[12px] font-medium" style={{ color: "#696D7A" }}>
                      {`问题${["一", "二", "三"][i]}`}
                    </span>
                  </div>
                  <div className="mb-2 text-[24px] font-semibold text-neutral-900">{item.title}</div>
                  <div className="text-[16px] leading-[1.7]" style={{ color: "#4E525E" }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal
            className="relative overflow-hidden rounded-[28px] border bg-white p-5 md:p-8"
            delay={0.16}
            y={24}
            style={{
              borderColor: "#E6E7EB",
            }}
          >
            <div className="relative">
              <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="max-w-[760px]">
                  <div className="text-[24px] font-semibold leading-tight text-[#1A1C24]">
                    章节生成规则设计
                  </div>
                  <div className="mt-2 text-[16px] leading-[1.7]" style={{ color: "#4E525E" }}>
                    把提示词从经验写法，拆成可复用、可校验、可维护的执行规则。
                  </div>
                </div>
                <span
                  className="w-fit rounded-full border px-3 py-1.5 text-[12px] font-medium"
                  style={{ borderColor: ICON_BORDER, background: ICON_BG, color: ICON_BLUE }}
                >
                  基于章节生成场景
                </span>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div
                  className="hidden"
                  style={{ borderColor: "#E6E7EB" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(34,88,244,0.13) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <div className="relative space-y-6">
                    {/* 安全红线 — 全局约束横条，置于三层结构最上方 */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45, delay: 0.08 }}
                      className="relative rounded-2xl border px-5 py-4"
                      style={{ borderColor: "#FFE3E3", background: "#FFFFFF" }}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className="flex size-8 items-center justify-center rounded-xl"
                            style={{ background: "#FFE3E3", color: "#B81D1D" }}
                          >
                            <ShieldCheck className="size-4" />
                          </span>
                          <span className="text-[14px] font-semibold" style={{ color: "#B81D1D" }}>
                            安全红线
                          </span>
                          <span className="hidden sm:inline-block h-5 w-px" style={{ background: "#FFE3E3" }} />
                          <span className="hidden sm:inline text-[12px]" style={{ color: "#B45309" }}>
                            全局约束，所有章节生成前注入
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["事实有来源", "禁止空转", "当前任务优先", "禁止格式漂移"].map((rule) => (
                            <span
                              key={rule}
                              className="rounded-full bg-white/82 px-3 py-1.5 text-[12px] font-medium"
                              style={{ color: "#B81D1D" }}
                            >
                              {rule}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* 第一层：输入与全局约束 */}
                    <div className="relative rounded-3xl border bg-[#FAFBFF]/88 p-4 md:p-5" style={{ borderColor: "#E6E7EB" }}>
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-[12px] font-medium" style={{ color: ICON_BLUE }}>
                              第一层
                            </div>
                            <div className="mt-1 text-[16px] font-semibold text-[#1A1C24]">输入与全局约束</div>
                          </div>
                          <div className="hidden items-center gap-2 text-[11px] font-medium text-[#696D7A] md:flex">
                            <span className="inline-block h-px w-8" style={{ background: BLUE }} />
                            注入任务判断
                          </div>
                        </div>

                        <div className="relative grid gap-3 md:grid-cols-3">
                          {[
                            { level: "A", name: "用户指令", desc: "任务说明、关注对象、分析意图", delay: 0.12 },
                            { level: "B", name: "章节背景", desc: "章节位置、父节点、报告大纲、监测主体", delay: 0.18 },
                            { level: "C", name: "执行限制", desc: "时间范围、字数要求、输出格式、当前日期", delay: 0.24 },
                          ].map((item) => (
                            <motion.div
                              key={item.level}
                              initial={{ opacity: 0, y: 14 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-80px" }}
                              transition={{ duration: 0.45, delay: item.delay }}
                              className="relative rounded-2xl border p-4"
                              style={{
                                borderColor: "#E6E7EB",
                                background: "#FFFFFF",
                              }}
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <span
                                  className="flex size-7 items-center justify-center rounded-lg text-[12px] font-bold"
                                  style={{ background: BLUE, color: "#FFFFFF" }}
                                >
                                  {item.level}
                                </span>
                                <span className="text-[14px] font-semibold text-[#1A1C24]">{item.name}</span>
                              </div>
                              <div className="text-[12px] leading-[1.55]" style={{ color: "#4E525E" }}>
                                {item.desc}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                    {/* 第二层：执行闭环 */}
                    <div className="relative rounded-[28px] border p-5 md:p-7" style={{ borderColor: "#E6E7EB", background: "#FAFBFF" }}>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden opacity-[0.22]"
                        style={{
                          backgroundImage: "radial-gradient(circle, rgba(34,88,244,0.13) 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                          <div>
                            <div className="text-[12px] font-medium" style={{ color: ICON_BLUE }}>第二层</div>
                            <div className="mt-1 text-[16px] font-semibold text-[#1A1C24]">执行闭环</div>
                          </div>
                          <div className="text-[12px] leading-[1.5] max-w-[420px]" style={{ color: "#696D7A" }}>
                            工具调用后不直接输出，先观察，再决定输出、重试或熔断。
                          </div>
                        </div>

                        {/* Desktop: fixed grid chain + quality-gate branches */}
                        <div className="relative hidden lg:block">
                          <div className="grid grid-cols-4 items-stretch gap-6">
                            {[
                              { icon: Compass, title: "任务判断", kw: ["识别主体", "拆解意图", "生成检索词"], delay: 0.3 },
                              { icon: Database, title: "工具执行", kw: ["检索", "读取", "抽取"], delay: 0.38 },
                              { icon: ListChecks, title: "结果观察", kw: ["检查数量", "字段 / 来源", "时间范围"], delay: 0.48 },
                              { icon: ShieldCheck, title: "质量门禁", kw: ["达标输出", "重试调整", "异常熔断"], delay: 0.58 },
                            ].map((node, i) => {
                              const Icon = node.icon;
                              return (
                                <div key={node.title} className="relative">
                                  <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.42, delay: node.delay }}
                                    className="relative h-full min-h-[126px] rounded-2xl border p-4"
                                    style={{
                                      borderColor: "#E6E7EB",
                                      background: "#FFFFFF",
                                    }}
                                  >
                                    <div className="mb-3 flex items-start gap-2">
                                      <span className="text-[14px] font-semibold whitespace-nowrap" style={{ color: "#1A1C24" }}>
                                        {node.title}
                                      </span>
                                      <Icon className="mt-0.5 size-4 shrink-0" style={{ color: ICON_GRAY }} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      {node.kw.map((k) => (
                                        <span key={k} className="text-[12px] leading-[1.45]" style={{ color: "#4E525E" }}>
                                          {k}
                                        </span>
                                      ))}
                                    </div>
                                  </motion.div>
                                  {i < 3 && (
                                    <div className="pointer-events-none absolute left-full top-[62px] z-10 flex w-6 items-center">
                                      <span className="h-px flex-1" style={{ background: ICON_BORDER }} />
                                      <span className="h-0 w-0 border-y-[4px] border-y-transparent" style={{ borderLeft: `6px solid ${ICON_BORDER}` }} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        </div>

                        {/* Mobile fallback */}
                        <div className="grid gap-3 lg:hidden">
                          {[
                            { icon: Compass, title: "任务判断", kw: ["识别主体", "拆解意图", "生成检索词"] },
                            { icon: Database, title: "工具执行", kw: ["检索", "读取", "抽取"] },
                            { icon: ListChecks, title: "结果观察", kw: ["检查数量", "字段", "来源", "时间"] },
                            { icon: ShieldCheck, title: "质量门禁", kw: ["达标输出", "重试调整", "异常熔断"] },
                          ].map((node, index) => {
                            const Icon = node.icon;
                            return (
                              <div
                                key={node.title}
                                className="relative rounded-2xl border p-4"
                                style={{
                                  borderColor: "#E6E7EB",
                                  background: "#FFFFFF",
                                }}
                              >
                                {index < 3 && (
                                  <div className="absolute -bottom-3 left-7 h-3 w-px" style={{ background: ICON_BORDER }} />
                                )}
                                <div>
                                  <div className="flex items-start gap-3">
                                    <div className="text-[14px] font-semibold" style={{ color: "#1A1C24" }}>
                                      {node.title}
                                    </div>
                                    <Icon className="mt-0.5 size-4 shrink-0" style={{ color: ICON_GRAY }} />
                                  </div>
                                  <div>
                                    <div className="mt-1 flex flex-wrap gap-1.5">
                                      {node.kw.map((k) => (
                                        <span key={k} className="text-[11px] leading-[1.4]" style={{ color: "#4E525E" }}>
                                          {k}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-[28px] border bg-[#FAFBFF]/90 p-4 md:p-5" style={{ borderColor: "#E6E7EB" }}>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[12px] font-medium" style={{ color: ICON_BLUE }}>
                            第三层
                          </div>
                          <div className="mt-1 text-[16px] font-semibold text-[#1A1C24]">输出与自检</div>
                        </div>
                        <div className="hidden items-center gap-2 text-[11px] font-medium md:flex" style={{ color: ICON_BLUE }}>
                          <span className="inline-block h-px w-8" style={{ background: ICON_BORDER }} />
                          达标输出
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {[
                          { title: "正反样例", desc: "正确结构 / 错误示范", icon: FileText, delay: 0.64 },
                          { title: "输出格式", desc: "标题层级、字段顺序、来源绑定", icon: PenLine, delay: 0.7 },
                          { title: "交付前自检", desc: "事实核查、红线核查、格式核查、时间核查", icon: ListChecks, delay: 0.76 },
                          { title: "最终章节内容", desc: "结构稳定、来源可信、格式一致", icon: CheckCircle2, pass: true, delay: 0.82 },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-80px" }}
                              transition={{ duration: 0.45, delay: item.delay }}
                              className="relative rounded-2xl border bg-white p-4"
                              style={{
                                borderColor: item.pass ? ICON_BORDER : "#E6E7EB",
                              }}
                            >
                              <div className="mb-1 flex items-start gap-2">
                                <div className="flex-1 text-[18px] font-semibold text-[#1A1C24]">{item.title}</div>
                                <Icon className="mt-1 size-4 shrink-0" style={{ color: ICON_GRAY }} />
                              </div>
                              <div className="mt-1 text-[14px] leading-[1.55]" style={{ color: "#4E525E" }}>
                                {item.desc}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="order-2 rounded-2xl border bg-white/92 p-5" style={{ borderColor: "#E6E7EB" }}>
                  <div className="mb-5">
                    <div>
                      <div className="text-[18px] font-semibold text-[#1A1C24]">方法沉淀</div>
                      <div className="mt-1 text-[14px]" style={{ color: "#696D7A" }}>
                        从章节生成场景抽象出可复用规则
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-[#FAFBFF] p-3" style={{ borderColor: "#E6E7EB" }}>
                    <div className="mb-2 text-[14px] font-semibold text-[#1A1C24]">模块映射</div>
                    <div className="space-y-1.5">
                      {[
                        ["任务定义", "目标定义 / 身份与角色 / 成功标准"],
                        ["执行编排", "输入定义 / 处理规则 / 工具编排"],
                        ["质量门禁", "约束边界 / 输出规范 / 异常处理"],
                        ["容错兜底", "兜底机制 / 自检清单"],
                      ].map(([label, mods]) => (
                        <div key={label} className="grid grid-cols-[58px_minmax(0,1fr)] items-center gap-2 rounded-xl bg-white px-3 py-2">
                          <span className="text-[13px] font-medium leading-tight" style={{ color: ICON_BLUE }}>
                            {label}
                          </span>
                          <span className="whitespace-nowrap text-[13px] leading-none" style={{ color: "#696D7A" }}>
                            {mods}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl p-4" style={{ background: "#EEF2FF" }}>
                    <div className="mb-3 text-[14px] font-semibold" style={{ color: ICON_BLUE }}>
                      执行闭环
                    </div>
                    <div className="mb-3 rounded-xl bg-white/70 px-3 py-2 text-[13px] leading-[1.65]" style={{ color: ICON_BLUE }}>
                      ReAct 负责单章节执行：观察工具结果，判断是否继续检索、合流、核验，再决定输出、重试或兜底。
                    </div>
                    <div className="space-y-2">
                      {[
                        "工具结果先合流",
                        "通过门禁后输出",
                        "异常进入重试或兜底",
                      ].map((rule) => (
                        <div key={rule} className="flex items-center gap-2 text-[13px] leading-[1.5]" style={{ color: ICON_BLUE }}>
                          <span className="size-1.5 rounded-full" style={{ background: BLUE }} />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* 设计决策卡片行 */}
                <Reveal className="order-1 grid gap-4 lg:grid-cols-2" delay={0.06} y={16}>
                  {[
                    { n: "01", visual: "flow", title: "节点编排代替自由生成", desc: "将提示词写作转变为 观察与解析 → 并发检索 → 合流汇总 → 整理处理 → 核验复查 → 排版输出 的阶段化执行链路。" },
                    { n: "02", visual: "merge", title: "并行取数后强制合流", desc: "多个检索工具并发调用后，必须先合并为统一候选池，禁止按工具维度分别输出原始结果。" },
                    { n: "03", visual: "gate", title: "阶段门禁与状态驱动", desc: "每阶段形成显式状态，未完成当前阶段不得进入下一阶段；建立「当前输入 > 阶段状态 > 历史记忆 > 默认规则」的优先级体系。" },
                    { n: "04", visual: "module", title: "提示词拆解为标准化模块", desc: "将依赖个人经验的提示词，拆解为目标定义、输入定义、处理规则、约束边界、输出规范、异常处理、兜底机制七个可复用模块。" },
                  ].map((item) => (
                    <div
                      key={item.n}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border p-2.5"
                      style={{ borderColor: "#E6E7EB" }}
                    >
                      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#FAFBFF]">
                        <div
                          className="absolute inset-0 opacity-55"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, rgba(34,88,244,0.13) 1px, transparent 1px)",
                            backgroundSize: "14px 14px",
                          }}
                        />
                        {item.visual === "flow" ? (
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
                        ) : item.visual === "merge" ? (
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
                        ) : item.visual === "gate" ? (
                          <div className="relative grid w-[88%] grid-cols-[1fr_82px] items-center gap-5">
                            <div className="relative h-28">
                              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 292 112" fill="none" aria-hidden="true">
                                <path d="M28 56H260" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.42" />
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
                        ) : item.visual === "module" ? (
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
                                {[
                                  "任务定义",
                                  "执行编排",
                                  "质量门禁",
                                  "容错兜底",
                                ].map((group, groupIndex) => (
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
                        ) : (
                          <div className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold" style={{ color: ICON_BLUE }}>
                            <span className="flex size-6 items-center justify-center rounded-full text-[11px] text-white" style={{ background: BLUE }}>
                              {item.n}
                            </span>
                            {item.visual}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                        <div className="text-[18px] font-semibold text-[#1A1C24]">{item.title}</div>
                        <div className="mt-2 text-[14px] leading-[1.65]" style={{ color: "#4E525E" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </Reveal>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-6" delay={0.2} y={18}>
            <a
              href="./report-agent-page.html"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 rounded-[18px] border border-[#A8BEFF] bg-[#EEF2FF] px-5 py-4 text-left transition-all duration-300 hover:border-[#85A3FF] hover:bg-[#E5EBFF] hover:shadow-[0_12px_32px_rgba(34,88,244,0.12)] sm:flex-row sm:items-center sm:justify-between md:px-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="text-[18px] font-semibold leading-tight text-[#1A1C24]">
                  最终成果
                </span>
                <span className="text-[13px] leading-[1.6] text-[#4E525E]">
                  报告智能体 10+1 模块配置框架
                </span>
              </div>
              <span
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1A42B8] transition-all duration-300 group-hover:translate-x-1.5 group-hover:bg-[#2258F4] group-hover:text-white"
                aria-hidden="true"
              >
                <ArrowRight className="size-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer CTA */}
      <div className={`relative ${SECTION_PAD} py-16`}>
        <Reveal className={`${READ} flex flex-wrap items-center justify-between gap-4`} delay={0.22} y={18}>
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <span className="inline-flex size-4 items-center justify-center transition-colors" style={{ color: ICON_GRAY }}>
              <ArrowLeft className="size-4" />
            </span>
            返回首页
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onBack();
              setTimeout(
                () =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" }),
                60
              );
            }}
            className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-neutral-900 text-white hover:bg-[#2258F4] transition-colors"
          >
            <span className="text-sm">联系我</span>
            <span className="inline-flex size-4 items-center justify-center text-white/80 group-hover:rotate-45 transition-transform">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}
