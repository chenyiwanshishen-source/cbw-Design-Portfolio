import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  ListChecks,
  PenLine,
  Search,
  Wrench,
  CircleX,
  LoaderCircle,
} from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Footer } from "./Footer";
import { ResearchPaperCanvas } from "./ResearchPaperCanvas";
import { hideContactDetails } from "../buildVariant";
import reportSummaryPaper from "../../assets/ai-report/summary-paper-grid-v1.png";
import reportSummaryPaperMobile from "../../assets/ai-report/summary-paper-grid-mobile-v1.png";

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
      className="relative overflow-hidden rounded-[28px] border bg-white p-4 md:p-5"
    >
      <div className="pb-4 lg:flex lg:items-start lg:justify-between lg:gap-4">
        <div className="max-w-[730px]">
          <div className="text-[24px] font-semibold leading-[1.3] tracking-tight text-[#1D2333]">
            章节生成拆成一条可控执行链路
          </div>
          <p className="mt-2 text-[16px] leading-[1.65]" style={{ color: "#596174" }}>
            用户指令、章节背景、工具调用和输出检查串成一条流程，先定边界，再合流校验。
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

      <div className="relative overflow-hidden rounded-2xl bg-[#FAFBFF] py-6">
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

function ReportProjectSummary() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="ai-report-project-summary-title"
      className="relative mx-auto mt-16 min-h-[656px] w-full max-w-[1080px] overflow-visible sm:min-h-[680px]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px] sm:h-auto sm:aspect-[1672/941]">
        <img
          src={reportSummaryPaperMobile}
          alt=""
          className="absolute inset-0 h-full w-full -translate-x-3 translate-y-5 rotate-[-2.4deg] object-fill opacity-95 sm:-translate-x-5 sm:translate-y-6"
          style={{
            filter:
              "brightness(1.025) saturate(0.72) sepia(0.1) hue-rotate(175deg) drop-shadow(0 1px 2px rgba(70, 91, 128, 0.025))",
          }}
          loading="lazy"
          decoding="async"
        />
        <img
          src={reportSummaryPaperMobile}
          alt=""
          className="absolute inset-0 h-full w-full translate-x-3 translate-y-3 rotate-[1.8deg] object-fill opacity-95 sm:translate-x-5 sm:translate-y-4"
          style={{
            filter:
              "brightness(1.025) saturate(0.72) sepia(0.075) drop-shadow(0 1px 2px rgba(70, 91, 128, 0.035))",
          }}
          loading="lazy"
          decoding="async"
        />
        <img
          src={reportSummaryPaperMobile}
          alt=""
          className="absolute inset-0 h-full w-full translate-y-7 rotate-[0.6deg] object-fill opacity-90 sm:translate-y-9"
          style={{
            filter:
              "brightness(1.02) saturate(0.76) sepia(0.085) hue-rotate(175deg) drop-shadow(0 2px 3px rgba(70, 91, 128, 0.05))",
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        className="relative z-10 h-[620px] w-full sm:h-auto sm:aspect-[1672/941]"
        style={{ filter: "drop-shadow(0 2px 3px rgba(70, 91, 128, 0.08)) drop-shadow(0 5px 7px rgba(70, 91, 128, 0.045))" }}
      >
        <picture aria-hidden="true">
          <source media="(min-width: 640px)" srcSet={reportSummaryPaper} />
          <img
            src={reportSummaryPaperMobile}
            alt=""
            className="absolute inset-0 h-full w-full object-fill"
            style={{ filter: "brightness(1.018) saturate(0.82) sepia(0.04)" }}
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div className="relative z-10 flex h-full flex-col pb-[9%] pl-[19%] pr-[9%] pt-[8%] sm:px-[13%] sm:pb-[8%] sm:pt-[7.5%]">
          <header className="flex items-end justify-between gap-4 pb-3 sm:pb-4">
            <h2
              id="ai-report-project-summary-title"
              className="text-[26px] font-semibold leading-none text-[#1A1C24] sm:text-[32px]"
            >
              项目小结
            </h2>
            <span className="hidden text-[12px] font-medium tracking-[0.14em] text-[#2258F4] sm:block">
              AI 报告生成 · 1.0
            </span>
          </header>

          <div className="grid flex-1 content-start gap-4 pt-4 sm:gap-5 sm:pt-5 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
            <div>
              <p className="text-[19px] font-semibold leading-[1.35] text-[#2258F4] sm:text-[25px]">
                真实客户需求
                <br />
                完成 1.0 上线
              </p>
            </div>
            <p className="text-[14px] leading-[1.62] text-[#414958] sm:text-[15px] sm:leading-[1.75]">
              本项目源于真实客户需求，完成了 AI 报告生成 1.0 的设计与上线。由于项目上线后终止，未进入持续运营阶段，因此没有可持续追踪的数据指标。
            </p>

            <div className="border-t border-[#9DB2D4]/70 pt-4 md:col-span-2 md:grid md:grid-cols-[0.72fr_1.28fr] md:gap-x-10 md:pt-5">
              <div>
                <p className="text-[18px] font-semibold leading-[1.4] text-[#1A1C24] sm:text-[22px]">
                  两个超出初始规划
                  <br className="hidden sm:block" />
                  的关键发现
                </p>
              </div>
              <ol className="mt-3 space-y-3 md:mt-0 md:space-y-4">
                <li className="grid grid-cols-[30px_minmax(0,1fr)] gap-2 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[21px] font-semibold leading-none text-[#2258F4] sm:text-[26px]">01</span>
                  <p className="text-[14px] leading-[1.58] text-[#414958] sm:text-[15px] sm:leading-[1.68]">
                    <strong className="font-semibold text-[#25314A]">关联客户数据：</strong>
                    用户管理的部分客户已存在于启信产业大脑中，希望直接关联数据，避免每次生成报告前重复上传名单。
                  </p>
                </li>
                <li className="grid grid-cols-[30px_minmax(0,1fr)] gap-2 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-3">
                  <span className="text-[21px] font-semibold leading-none text-[#2258F4] sm:text-[26px]">02</span>
                  <p className="text-[14px] leading-[1.58] text-[#414958] sm:text-[15px] sm:leading-[1.68]">
                    <strong className="font-semibold text-[#25314A]">提前知识库规划：</strong>
                    用户会用扫描全能王 OCR 将纸质或图片资料转成可复用文本，因此我们决定在构建知识库功能的时候，重点把公司的 OCR 能力也纳入到产品中去。
                  </p>
                </li>
              </ol>
            </div>
          </div>

          <p className="mt-4 border-t border-[#9DB2D4]/70 pt-4 text-[14px] font-semibold leading-[1.55] text-[#2258F4] sm:mt-5 sm:text-[17px]">
            AI 报告的价值不只是生成内容，更在于连接客户数据、资料资产与原有工作流。
          </p>
        </div>
      </div>
    </motion.section>
  );
}

const STREAM_PROCESS_ROWS = [
  { type: "tool", label: "正在调用工具", detail: "key_ent_monitor" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 央企及500强重大投资项目" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 企业投资平台上线事件" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 新设基金与关键合作事件" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 编号“12131”企业事件动态" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 重点企业名单与参建机构" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 重点企业经济及产业影响" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 重点企业项目产出与就业带动" },
  { type: "search", label: "联网搜索", detail: "深圳市福田区 4月6日至12日 企业新技术应用与发展趋势" },
  { type: "tool", label: "正在调用工具", detail: "all_ent_monitor" },
  { type: "summary", label: "正在总结", detail: "将工具原始结果集合合流，抽取重点企业事件并按四类整理" },
  { type: "summary", label: "正在总结", detail: "对检索材料去重，整理企业、事件、时间与来源" },
  { type: "tool", label: "正在调用工具", detail: "big_document_process" },
  {
    type: "error",
    label: "工具调用失败",
    detail: "big_document_process",
    anchorId: "stream-tool-failure",
  },
  { type: "generate", label: "正在生成", detail: "章节正文与分类内容" },
] as const;

function StreamProcessEvidence() {
  const iconMap = {
    search: Search,
    tool: Wrench,
    summary: PenLine,
    error: CircleX,
    generate: PenLine,
  };

  return (
    <div
      className="relative w-[calc(100vw-48px)] max-w-[479px] justify-self-start sm:w-full"
      data-testid="stream-process-evidence"
    >
      <div
        className="relative min-h-[780px] rounded-2xl border px-3 pb-20 pt-4 sm:min-h-[860px] sm:px-4"
        style={{
          borderColor: "#E6E7EB",
          background: "#F7F8FC",
        }}
      >
        <div className="mb-3 flex items-center gap-2 border-b pb-3 text-[12px] font-medium" style={{ borderColor: "#E6E7EB", color: "#8D94A3" }}>
          <span>正在进行生成</span>
          <span>4m56s</span>
        </div>

        <div className="space-y-3">
          {STREAM_PROCESS_ROWS.map((row, index) => {
            const Icon = iconMap[row.type];
            const isError = row.type === "error";

            return (
              <div
                key={`${row.label}-${row.detail}-${index}`}
                id={"anchorId" in row ? row.anchorId : undefined}
                data-prompt-anchor={"anchorId" in row ? "big-document-failure" : undefined}
                className="relative flex h-8 w-fit max-w-full items-center gap-1 rounded-full border bg-white px-2 shadow-[0_1px_2px_rgba(15,20,25,0.04)]"
                style={{ borderColor: isError ? "#FFD2D4" : "#E6E7EB" }}
              >
                <span
                  className="flex shrink-0 items-center gap-1 text-[12px] font-medium leading-none"
                  style={{ color: isError ? "#E5484D" : "#1A1C24" }}
                >
                  <Icon className="size-3.5" strokeWidth={1.8} />
                  {row.label}
                </span>
                <span
                  className="min-w-0 truncate text-[12px] leading-none"
                  style={{ color: "#696D7A" }}
                  title={row.detail}
                >
                  {row.detail}
                </span>
                {isError && (
                  <svg
                    className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-10 hidden h-6 w-[232px] -translate-y-1/2 overflow-visible xl:block"
                    viewBox="0 0 232 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <marker
                        id="stream-failure-arrow"
                        viewBox="0 0 8 8"
                        refX="6.8"
                        refY="4"
                        markerWidth="7"
                        markerHeight="7"
                        orient="auto"
                      >
                        <path
                          d="M1 1L7 4L1 7"
                          fill="none"
                          stroke="#FF8DA1"
                          strokeWidth="1.15"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </marker>
                    </defs>
                    <path
                      d="M0 12H220"
                      stroke="#FF8DA1"
                      strokeWidth="1.2"
                      strokeDasharray="5 8"
                      strokeLinecap="round"
                      opacity="0.88"
                      markerEnd="url(#stream-failure-arrow)"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="absolute inset-x-3 bottom-3 flex h-12 items-center justify-between rounded-full border bg-white px-3 sm:inset-x-4"
          style={{ borderColor: "#E6E7EB", color: "#8D94A3" }}
        >
          <span className="truncate text-[12px]">小Q正在生成中，生成已耗时24s...</span>
          <span className="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: "#CBCDD4" }}>
            <LoaderCircle className="size-3.5 animate-spin" strokeWidth={1.8} />
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
  const [activeInterview, setActiveInterview] = useState<number | null>(null);
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
      conclusion: "报告生产是一条包含需求提出、材料整理、结构确认、内容生产和核查交付的完整链路。",
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
      conclusion: "结合公司 OCR 能力强化本地材料解析，吸收生成前范围与结构确认机制，并补充知识库与来源追溯能力。",
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
      conclusion: "通过低保真原型图讨论，产品方向未出现明显偏差；围绕历史材料复用、报告查找与来源核查的讨论，共同识别出历史文档统一管理与来源展示等产品机会。",
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
      finalImage: "./images/ai-report-flow/step-01-final-template-center.png",
      callouts: [],
      decision: "先让用户选择报告类型，而不是直接输入需求。",
      why: "让报告生成从明确场景进入，降低用户不知道如何开始的问题。",
    },
    {
      label: "大纲生成",
      tagline: "先定结构",
      icon: GitBranch,
      placeholder: "章节大纲生成页面",
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

        </div>
      </section>

      {/* ===== 02. Product scope and user goals ===== */}
      <section
        id="s02-product-scope"
        className={`relative overflow-x-clip ${SECTION_PAD}`}
      >
        <div className={`mx-auto flex w-full max-w-[1400px] flex-col py-16 md:py-20 ${READ}`}>
          <div className="mx-auto mb-10 max-w-[940px] text-center md:mb-12">
            <h2 className="tracking-tight text-[#1A1C24]" style={T.h2}>
              确定产品范围和用户目标
            </h2>
          </div>

          {/* Keep ownership visible before the research canvas. */}
          <div className="relative z-30 mx-auto flex w-full max-w-[980px] flex-col gap-3 pb-3 md:-mb-5 md:flex-row md:items-end md:gap-4 md:pb-0">
            <section
              aria-label="我的角色"
              className="relative min-h-[146px] w-full overflow-visible md:w-[238px] md:shrink-0"
              style={{
                filter:
                  "drop-shadow(0 2px 4px rgba(28,36,52,0.055)) drop-shadow(0 8px 16px rgba(28,36,52,0.025))",
                transform: "rotate(-0.8deg)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 420 280"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <mask id="ai-report-role-header-note-torn-mask">
                    <path
                      d="M 0 18 L 18 5 L 36 15 L 55 3 L 74 14 L 94 4 L 114 16 L 135 3 L 156 14 L 178 5 L 200 15 L 222 3 L 244 14 L 266 4 L 288 16 L 310 3 L 332 14 L 354 5 L 376 15 L 398 4 L 420 17 V 280 H 0 Z"
                      fill="white"
                    />
                  </mask>
                  <linearGradient id="ai-report-role-header-note-wash" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="0.52" stopColor="#EAF1FF" />
                    <stop offset="1" stopColor="#DCE7FA" />
                  </linearGradient>
                </defs>
                <g mask="url(#ai-report-role-header-note-torn-mask)">
                  <rect width="420" height="280" fill="#EAF1FF" />
                  <rect width="420" height="280" fill="url(#ai-report-role-header-note-wash)" opacity="0.28" />
                </g>
                <path
                  d="M 0 18 L 18 5 L 36 15 L 55 3 L 74 14 L 94 4 L 114 16 L 135 3 L 156 14 L 178 5 L 200 15 L 222 3 L 244 14 L 266 4 L 288 16 L 310 3 L 332 14 L 354 5 L 376 15 L 398 4 L 420 17 V 280 H 0 Z"
                  fill="none"
                  stroke="#B9C9EA"
                  strokeWidth="1.2"
                  opacity="0.75"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative z-10 px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8 md:px-5 md:pb-5 md:pt-7">
                <h3 className="text-[20px] font-semibold leading-[1.3] text-[#252B36]">我的角色</h3>
                <p className="mt-3 text-[16px] font-medium text-[#35404F]">产品设计师</p>
                <p className="mt-1 text-[14px] leading-[1.45] text-[#596174]">AI 报告核心体验设计</p>
              </div>
            </section>

            <section
              aria-label="我的职责"
              className="relative min-h-[246px] w-full overflow-visible md:min-h-[224px] md:flex-1"
              style={{
                filter:
                  "drop-shadow(0 2px 4px rgba(28,36,52,0.055)) drop-shadow(0 8px 16px rgba(28,36,52,0.025))",
                transform: "rotate(0.55deg)",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 420 280"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <mask id="ai-report-responsibilities-header-note-torn-mask">
                    <path
                      d="M 0 18 L 18 5 L 36 15 L 55 3 L 74 14 L 94 4 L 114 16 L 135 3 L 156 14 L 178 5 L 200 15 L 222 3 L 244 14 L 266 4 L 288 16 L 310 3 L 332 14 L 354 5 L 376 15 L 398 4 L 420 17 V 280 H 0 Z"
                      fill="white"
                    />
                  </mask>
                  <linearGradient id="ai-report-responsibilities-header-note-wash" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="0.52" stopColor="#EAF1FF" />
                    <stop offset="1" stopColor="#DCE7FA" />
                  </linearGradient>
                </defs>
                <g mask="url(#ai-report-responsibilities-header-note-torn-mask)">
                  <rect width="420" height="280" fill="#EAF1FF" />
                  <rect width="420" height="280" fill="url(#ai-report-responsibilities-header-note-wash)" opacity="0.28" />
                </g>
                <path
                  d="M 0 18 L 18 5 L 36 15 L 55 3 L 74 14 L 94 4 L 114 16 L 135 3 L 156 14 L 178 5 L 200 15 L 222 3 L 244 14 L 266 4 L 288 16 L 310 3 L 332 14 L 354 5 L 376 15 L 398 4 L 420 17 V 280 H 0 Z"
                  fill="none"
                  stroke="#B9C9EA"
                  strokeWidth="1.2"
                  opacity="0.75"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative z-10 px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8 md:px-6 md:pb-5 md:pt-7">
                <h3 className="text-[20px] font-semibold leading-[1.3] text-[#252B36]">我的职责</h3>
                <ul className="mt-3 grid gap-3 text-[16px] leading-[1.55] text-[#4E525E] md:grid-cols-2 md:gap-x-6 md:gap-y-3">
                  {[
                    "用户研究与范围收敛：参与 3 轮用户访谈，梳理报告生产链路并推动 MVP 边界确认",
                    "核心体验与界面设计：负责模板选择、大纲确认、数据配置、流式生成与历史文档等关键流程",
                    "AI 生成规则梳理：搭建 Prompt 基础框架，确定输入约束、监测生成阶段的行动方式",
                    "开发协作与设计验收：跟进研发实现与还原质量，推动 1.0 版本落地上线",
                  ].map((responsibility) => (
                    <li key={responsibility} className="flex gap-2">
                      <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-[#4777FF]" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="relative overflow-visible rounded-[28px] border border-[#E6E7EB] bg-white">
            <div className="relative min-h-[1940px] rounded-[27px] bg-white sm:min-h-[1760px] md:min-h-[1700px] lg:h-[900px] lg:min-h-0 lg:aspect-auto 2xl:h-[760px]">
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
                  { file: "01.png", rotation: "-3.2deg", offsetX: "0px", offsetY: "0px", tapeColor: "rgba(202, 216, 225, 0.72)", tapeLeft: "8%", tapeTop: "0", tapeWidth: "30%", tapeRotation: "-7deg" },
                  { file: "02.png", rotation: "2.6deg", offsetX: "6px", offsetY: "20px", tapeColor: "rgba(213, 224, 207, 0.7)", tapeLeft: "18%", tapeTop: "0", tapeWidth: "27%", tapeRotation: "5deg" },
                  { file: "03.png", rotation: "-2.2deg", offsetX: "-5px", offsetY: "-4px", tapeColor: "rgba(207, 220, 226, 0.68)", tapeLeft: "52%", tapeTop: "0", tapeWidth: "32%", tapeRotation: "-4deg" },
                  { file: "04.png", rotation: "3deg", offsetX: "4px", offsetY: "26px", tapeColor: "rgba(218, 226, 210, 0.72)", tapeLeft: "62%", tapeTop: "0", tapeWidth: "28%", tapeRotation: "7deg" },
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
                      src={`./images/ai报告人物动画/${participant.file}`}
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
                    conclusion: "还原真实的报告生产链路。",
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
                    conclusion: "结合 OCR 优势，吸收生成前确认机制，并补充知识库与来源追溯。",
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
                    conclusion: "将历史文档管理和来源展示纳入产品范围。",
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
                aria-label="访谈结论总览"
                aria-hidden={activeInterview !== null}
                animate={{ opacity: activeInterview === null ? 1 : 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className={`absolute left-[52px] right-6 top-[1320px] z-20 sm:left-16 sm:right-8 sm:top-[1280px] md:top-[1240px] lg:left-[7%] lg:right-auto lg:top-[500px] lg:w-[44%] lg:max-w-[500px] 2xl:top-[340px] ${activeInterview === null ? "" : "pointer-events-none"}`}
              >
                <h3 className="relative inline-block text-[26px] font-semibold leading-[1.3] text-[#1A1C24] sm:text-[28px] lg:text-[30px]">
                  <span className="relative z-10">访谈结论</span>
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

                <div className="mt-8 space-y-6">
                  {[
                    {
                      label: "服务对象",
                      text: "承担报告内容生产与交付的专业用户，覆盖产业研究、经济分析、监测研判等报告场景。",
                      color: "#E5EBFF",
                      rotation: "-0.8deg",
                      clipPath: "polygon(1% 15%, 12% 7%, 27% 13%, 43% 5%, 59% 11%, 75% 4%, 98% 10%, 97% 89%, 82% 95%, 66% 89%, 49% 96%, 32% 90%, 16% 95%, 2% 87%)",
                    },
                    {
                      label: "用户目标",
                      text: "提升报告生产效率，同时保留范围确认、过程控制与来源核查。",
                      color: "#F3E7FF",
                      rotation: "0.7deg",
                      clipPath: "polygon(2% 10%, 18% 15%, 34% 7%, 51% 12%, 67% 5%, 83% 13%, 99% 9%, 97% 91%, 80% 87%, 62% 95%, 45% 89%, 27% 96%, 10% 90%, 1% 94%)",
                    },
                    {
                      label: "首期产品范围",
                      items: [
                        "历史文档统一管理",
                        "利用公司 OCR 技术解析本地材料",
                        "模板及大纲确认",
                        "基于材料生成内容",
                        "来源展示与历史报告留存",
                      ],
                      color: "#FFF6DB",
                      rotation: "-0.5deg",
                      clipPath: "polygon(1% 14%, 15% 7%, 30% 13%, 46% 6%, 63% 12%, 79% 5%, 98% 11%, 99% 88%, 84% 95%, 68% 89%, 50% 96%, 33% 90%, 17% 94%, 2% 87%)",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-4"
                    >
                      <span className="relative inline-flex w-fit whitespace-nowrap px-1 text-[17px] font-semibold leading-[1.55] text-[#4E525E] sm:text-[18px]">
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 z-0 h-[60%]"
                          style={{
                            backgroundColor: item.color,
                            clipPath: item.clipPath,
                            transform: `rotate(${item.rotation})`,
                          }}
                        />
                        <span className="relative z-10">{item.label}</span>
                      </span>
                      {item.items ? (
                        <ul className="space-y-1.5 text-[17px] leading-[1.65] text-[#4E525E] sm:text-[18px]">
                          {item.items.map((capability) => (
                            <li key={capability} className="flex items-start gap-2.5">
                              <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-[#4777FF]" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[17px] leading-[1.7] text-[#4E525E] sm:text-[18px]">
                          {item.text}
                        </p>
                      )}
                    </div>
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

      {/* ===== 02. Validation scenario ===== */}
      <section
        id="s02"
        className={`relative z-0 pt-24 pb-12 md:pt-28 md:pb-16 ${SECTION_PAD}`}
      >
        <div className={`relative ${READ}`}>
          <Reveal delay={0.08}>
            <div>
              <div className="mx-auto max-w-[940px] text-center">
                <h3 className="tracking-tight text-[#1A1C24]" style={T.h2}>
                  从报告生产链路中定位 AI 生成的设计控制点
                </h3>
                <p className="mx-auto mt-4 max-w-[860px]" style={T.h2Sub}>
                  基于客户需求、内部测试和历史交付复盘，我将报告生成过程拆解为多个关键阶段，识别用户在每一步的失控点，并转化为可配置、可确认、可追溯的系统能力。
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      <ResearchPaperCanvas
        stages={journeyStages}
        journeyPath={journeyPath}
        journeyPathSegments={journeyPathSegments}
      />

      {/* ===== 03. Interactive flow: 模板选择 → 历史文档 ===== */}
      <section
        id="s03"
        ref={flowSectionRef}
        className={`relative z-10 isolate overflow-hidden py-20 md:py-28 lg:min-h-screen lg:py-0 ${SECTION_PAD}`}
      >
        <div
          ref={flowStageRef}
          className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] items-center py-20 md:py-24 lg:py-[clamp(5.5rem,8vh,7rem)]"
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
                          src="./images/04/kongbaihuabu.png"
                          alt="流式生成空白画布"
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="absolute inset-0 h-full w-full object-contain object-top"
                        />
                        <img
                          src="./images/04/liushihuaban.png"
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
                          src="./images/optimized/ai-stream-text-1400.jpg"
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

      {/* ===== 04b. Traceability — source evidence setup ===== */}
      <section
        className={`relative pt-20 pb-12 md:pt-24 md:pb-16 xl:pt-28 xl:pb-20 ${SECTION_PAD} overflow-hidden`}
      >
        <div className={`relative ${READ}`}>
          <Reveal className="max-w-[980px]">
            <SectionHeader
              index="04B"
              kicker="来源可信度"
              title="设计数据溯源交互方案"
              subtitle="判断报告生成的风险不只在内容是否完整，也在用户是否知道依据来自哪里。因此将参考来源、企业对象和模型运算结果前置展示，并让正文引用回链到具体来源。"
            />
          </Reveal>
          <Reveal className="max-w-[1400px]" delay={0.12} y={24}>
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,696px)] xl:grid-cols-[320px_696px_320px] xl:items-start xl:gap-8">
              <div className="order-2 flex w-full max-w-[320px] flex-col gap-3 lg:order-1 lg:mt-[40px]">
                {[
                  {
                    src: "./images/首页/数据溯源/多互联网数据.png",
                    alt: "互联网数据来源卡片",
                  },
                  {
                    src: "./images/首页/数据溯源/启信产业大脑数据.png",
                    alt: "启信产业大脑数据来源卡片",
                  },
                  {
                    src: "./images/首页/数据溯源/模型运算.png",
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
                  src="./images/首页/数据溯源/生成内容.png"
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
              title="主导章节生成从经验 Prompt 梳理成可执行规则"
              subtitle=""
            />
          </Reveal>

          <Reveal className="mb-6 max-w-none md:whitespace-nowrap" delay={0.08}>
            <p style={bodyText}>
              将依赖经验的章节 Prompt，梳理成上下文注入、工具合流、质量门禁和异常兜底规则，让章节生成从个人写法变成统一流程。
            </p>
          </Reveal>

          <Reveal className="mb-6" delay={0.18} y={24}>
            <AgentWorkflowDiagram />
          </Reveal>

          <Reveal className="mb-6 grid gap-4 md:grid-cols-3" delay={0.2} y={20}>
            {[
              {
                title: "上下文容易漂移",
                desc: "章节生成容易脱离父节点、章节位置和报告大纲，因此将章节背景、父级约束和当前任务范围作为固定输入。",
                visual: "context",
              },
              {
                title: "写法难以复用",
                desc: "提示词写法依赖个人经验，因此将目标、输入、工具、规则和兜底拆成固定模块。",
                visual: "maintenance",
              },
              {
                title: "结果缺少门禁",
                desc: "来源、时间和格式缺少约束，因此设置输出门禁，未通过校验不进入最终结果。",
                visual: "quality",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[28px] border bg-white p-4"
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
                <div className="pt-4">
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
            className="relative overflow-hidden rounded-[28px] border bg-white p-4 md:p-5"
            delay={0.16}
            y={24}
            style={{
              borderColor: "#E6E7EB",
            }}
          >
            <div className="relative">
              <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="max-w-none">
                  <div className="text-[24px] font-semibold leading-tight text-[#1A1C24]">
                    沉淀的章节生成规则
                  </div>
                  <div className="mt-2 text-[16px] leading-[1.7]" style={{ color: "#4E525E" }}>
                    将节点编排、工具合流、状态门禁和模块化提示词沉淀成可复用规则。
                  </div>
                </div>
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

          <Reveal
            className="relative mt-6 overflow-hidden rounded-[28px] border bg-white p-4 md:p-5"
            delay={0.18}
            y={24}
            style={{
              borderColor: "#E6E7EB",
            }}
          >
            <div className="relative">
              <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div className="max-w-none">
                  <div className="text-[24px] font-semibold leading-tight text-[#1A1C24]">
                    人工复核驱动的流式校验闭环
                  </div>
                  <div className="mt-2 text-[16px] leading-[1.7]" style={{ color: "#4E525E" }}>
                    人工从流式执行中发现异常，回查原始 Prompt 定位并修正问题，再重新执行与复核，直至输出正确。
                  </div>
                </div>
              </div>

              <div className="grid items-start justify-items-start gap-6 xl:grid-cols-[479px_minmax(0,1fr)]">
                <StreamProcessEvidence />
                <OriginalPromptEvidence />
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

          <ReportProjectSummary />
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
          {!hideContactDetails && (
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
          )}
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}
