import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  Database,
  FileText,
  GitBranch,
  Layers3,
  LayoutDashboard,
  Link2,
  Map,
  Network,
  Palette,
  Search,
  Settings2,
  Table2,
  Tags,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { Placeholder } from "./Placeholder";
import { Footer } from "./Footer";

interface Props {
  onBack: () => void;
}

const BLUE = "#2258F4";
const ICON_BLUE = "#1A42B8";
const ICON_BG = "#E5EBFF";
const ICON_BORDER = "#A8BEFF";
const ICON_GRAY = "#CBCDD4";
const INK = "#0F1419";
const INK_MUTED = "rgba(15,20,25,0.72)";
const INK_DIM = "rgba(15,20,25,0.55)";
const LINE = "rgba(15,20,25,0.10)";
const SECTION_PAD = "px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32";
const HERO_PAD = "px-6 sm:px-[clamp(40px,4.5vw,128px)]";
const READ = "max-w-[1400px] mx-auto";
const BUSINESS_READ = "max-w-[1600px] mx-auto";
const PROSE = "max-w-[72ch]";
const SCREEN_CARD_BG =
  "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,255,0.86))";
const SCREEN_BOTTOM_FADE =
  "linear-gradient(180deg, rgba(248,250,255,0) 0%, rgba(248,250,255,0.08) 28%, rgba(248,250,255,0.36) 68%, rgba(248,250,255,0.62) 100%)";
const SCREEN_REPORT_BOTTOM_FADE =
  "linear-gradient(180deg, rgba(248,250,255,0) 0%, rgba(248,250,255,0.05) 34%, rgba(248,250,255,0.22) 70%, rgba(248,250,255,0.46) 100%)";
const SCREEN_STACK_FRONT_SHADOW = "0 10px 18px rgba(26,28,36,0.10)";
const SCREEN_STACK_BACK_SHADOW = "0 12px 28px rgba(26,28,36,0.14)";
const DETAIL_IMAGE_LAZY_PROPS = {
  loading: "lazy" as const,
  decoding: "async" as const,
};
const DETAIL_IMAGE_EAGER_PROPS = {
  loading: "eager" as const,
  decoding: "async" as const,
  fetchPriority: "high" as const,
};

const SECTIONS = [
  { id: "qx01", index: "01", label: "项目概览" },
  { id: "qx02", index: "02", label: "业务背景" },
  { id: "qx05", index: "03", label: "首页工作台" },
  { id: "qx06", index: "04", label: "企业数据" },
  { id: "qx07", index: "05", label: "自定义产业链" },
  { id: "qx08", index: "06", label: "设计系统" },
  { id: "qx10", index: "07", label: "项目总结" },
];

const T = {
  h1: { fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.12, fontWeight: 700 },
  heroTitle: { fontSize: "clamp(42px, 2.45vw, 60px)", lineHeight: 1.12, fontWeight: 700 },
  heroSub: { fontSize: "clamp(16px, 1.6vw, 18px)", lineHeight: 1.75, color: INK_MUTED },
  h2: { fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.22, fontWeight: 700 },
  h2Sub: { fontSize: "clamp(15px, 1.45vw, 17px)", lineHeight: 1.7, color: INK_MUTED },
  body: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.78, color: INK_MUTED },
  muted: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.72, color: INK_DIM },
  cardTitle: { fontSize: "16px", lineHeight: 1.45, fontWeight: 650, color: INK },
  cardDesc: { fontSize: "14px", lineHeight: 1.65, color: INK_MUTED },
  label: { fontSize: "13px", lineHeight: 1.35, fontWeight: 600, letterSpacing: "0.08em" },
  nav: { fontSize: "13px", lineHeight: 1.4, fontWeight: 500 },
};

function AccentBlob({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
        side === "right" ? "-right-44" : "-left-44"
      } size-[560px] rounded-full blur-[170px] opacity-18`}
      style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }}
    />
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

function FoundationRulesPreview() {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-[24px] border bg-[#FAFBFF]"
      style={{
        aspectRatio: "16 / 10",
        borderColor: "#E6E7EB",
        boxShadow: "0 1px 2px rgba(15,20,25,0.04)",
      }}
      aria-label="DGG 组件库基础规则构建示意图"
    >
      <div className="absolute left-[19.8%] top-[4%] h-[104%] w-[86.6%] overflow-hidden rounded-[16px] bg-white">
        <img
          src="images/optimized/qixin-color-1600.jpg"
          alt="DGG 组件库色彩 Token 命名规范局部"
          draggable={false}
          className="block h-auto w-full max-w-none select-none object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="absolute left-[-4.2%] top-[48.6%] h-[55.5%] w-[77.2%] overflow-hidden rounded-[16px] bg-white shadow-[0_14px_28px_rgba(26,28,36,0.10)]">
        <img
          src="images/optimized/qixin-text-1600.jpg"
          alt="DGG 组件库字体、间距、圆角与阴影规范"
          draggable={false}
          className="block h-auto w-full max-w-none select-none object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption
        className="pointer-events-none absolute bottom-5 left-6 z-40 text-[#4E525E]"
        style={{
          fontSize: 18,
          lineHeight: "26px",
          fontWeight: 700,
          textShadow: "0 1px 0 rgba(250,251,255,0.92)",
        }}
      >
        基础规范
      </figcaption>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[22%] bg-gradient-to-b from-transparent via-[#FAFBFF]/30 to-[#FAFBFF]/78" />
    </figure>
  );
}

function KeyComponentStatesPreview() {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-[24px] border bg-[#FAFBFF]"
      style={{
        aspectRatio: "16 / 10",
        borderColor: "#E6E7EB",
      }}
      aria-label="DGG 组件库关键组件状态示意图"
    >
      <div className="absolute bottom-[-8%] left-[10%] z-0 w-[106%] overflow-hidden rounded-[16px] bg-white ring-1 ring-[#E6E7EB]">
        <img
          src="images/optimized/qixin-park-recruit-1600.jpg"
          alt="园区招商列表页面截图"
          draggable={false}
          className="block h-auto w-full max-w-none select-none object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute left-[2%] top-[16%] z-20 w-[32%] overflow-hidden rounded-[10px] bg-white shadow-[0_8px_18px_rgba(26,28,36,0.06)] ring-1 ring-[#E6E7EB]">
        <img
          src="images/启信产业大脑/时间选择器.png"
          alt="时间选择器组件截图"
          draggable={false}
          className="block h-auto w-full max-w-none select-none object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute bottom-[2%] right-[2%] z-20 w-[38%] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_22px_rgba(26,28,36,0.08)] ring-1 ring-[#E6E7EB]">
        <img
          src="images/启信产业大脑/弹窗.png"
          alt="添加同级环节弹窗截图"
          draggable={false}
          className="block h-auto w-full max-w-none select-none object-contain object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[22%] bg-gradient-to-b from-transparent via-[#FAFBFF]/30 to-[#FAFBFF]/78" />
      <figcaption
        className="pointer-events-none absolute bottom-5 left-6 z-40 text-[#4E525E]"
        style={{
          fontSize: 18,
          lineHeight: "26px",
          fontWeight: 700,
          textShadow: "0 1px 0 rgba(250,251,255,0.92)",
        }}
      >
        组件模版
      </figcaption>
    </figure>
  );
}

function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
  center = false,
}: {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <span
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
        style={{ color: ICON_BLUE, background: ICON_BG, border: `1px solid ${ICON_BORDER}`, ...T.label }}
      >
        <span>{index}</span>
        <span className="size-1 rounded-full bg-current opacity-60" />
        <span>{kicker}</span>
      </span>
      <h2 className="tracking-tight text-[#1A1C24] max-w-4xl" style={T.h2}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 ${center ? "max-w-3xl" : "max-w-4xl"}`} style={T.h2Sub}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
  className = "",
}: {
  icon: any;
  title: string;
  desc: string;
  className?: string;
}) {
  const Icon = icon;
  return (
    <div
      className={`relative rounded-2xl border p-5 bg-[#FAFBFF] ${className}`}
      style={{ borderColor: LINE }}
    >
      <div>
        <div className="mb-1.5 flex items-start gap-3">
          <div className="flex-1" style={T.cardTitle}>{title}</div>
          <IconBadge Icon={Icon} />
        </div>
        <div style={T.cardDesc}>{desc}</div>
      </div>
    </div>
  );
}

type ArchitectureLayerId = "base" | "component";

const ARCHITECTURE_LAYERS: Record<
  ArchitectureLayerId,
  {
    label: string;
    contents: string[];
    definitions: string[];
    guideY: number;
    leftDotX: number;
    rightDotX: number;
    textTop: number;
    offsetY: number;
  }
> = {
  base: {
    label: "基础规范层",
    contents: ["颜色样式", "文本样式", "间距规则", "圆角规则", "交互状态"],
    definitions: ["定义界面基础视觉语言", "统一组件默认与反馈状态", "为上层组件提供可复用变量"],
    guideY: 171,
    leftDotX: 136,
    rightDotX: 360,
    textTop: 128,
    offsetY: 34,
  },
  component: {
    label: "基础组件层",
    contents: ["按钮", "输入框", "标签", "表格行", "筛选控件"],
    definitions: ["承接基础变量生成控件", "统一默认、悬浮、选中、禁用状态", "为复合组件提供稳定颗粒"],
    guideY: 96,
    leftDotX: 144,
    rightDotX: 368,
    textTop: 68,
    offsetY: -26,
  },
};

const ARCHITECTURE_LAYER_ORDER: ArchitectureLayerId[] = ["base", "component"];

const SYSTEM_LAYER_CARDS = [
  {
    title: "基础规范层",
    desc: "颜色、字号、间距、圆角和交互状态先沉淀为共同变量，同时定义栅格断点和阴影层级，让不同页面在同一套框架下适配多端。",
  },
  {
    title: "基础组件层",
    desc: "按钮、输入框、下拉菜单、日期选择器和开关等基础控件从变量中生成，统一默认、悬浮、聚焦和禁用四种状态。",
  },
  {
    title: "复合组件层",
    desc: "筛选区、工具栏、表格和弹窗由基础组件组合而成，每个复合结构保持一致的内部间距和对齐规则。",
  },
  {
    title: "业务组件层",
    desc: "企业列表、风险标签、产业分布和招商进度等开始承载业务语义，让同一个按钮和表格在不同场景下自动适配业务逻辑。",
  },
  {
    title: "页面模板层",
    desc: "列表页、详情页、配置页和报表页沉淀为页面骨架，新增业务页面时直接复用骨架，只替换内容和模块。",
  },
];

function SystemLayerCardIllustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 176" aria-hidden="true">
        <defs>
          <clipPath id="foundationWindowDraftBodyClip">
            <path d="M 142 108 H 498 V 262 Q 498 278 482 278 H 158 Q 142 278 142 262 Z" />
          </clipPath>
        </defs>

        <g id="foundation-window-draft" transform="translate(-70 -36) scale(0.72)">
          <g id="foundation-window-frame">
            <rect x="142" y="68" width="356" height="210" rx="16" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.3" />
            <g id="foundation-window-layout-grid" clipPath="url(#foundationWindowDraftBodyClip)">
              <g>
                <rect x="170" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="196" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="222" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="248" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="274" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="300" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="326" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="352" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="378" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="404" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="430" y="108" width="14" height="170" fill="#F6F8FF" />
                <rect x="456" y="108" width="14" height="170" fill="#F6F8FF" />
              </g>
            </g>
            <path d="M 142 108 H 498" stroke="#E6E7EB" strokeWidth="1.1" />
            <circle cx="166" cy="88" r="4" fill="#2258F4" />
            <circle cx="181" cy="88" r="4" fill="#A8BEFF" />
            <circle cx="196" cy="88" r="4" fill="#E5EBFF" />
            <rect x="224" y="79" width="218" height="18" rx="9" fill="#F5F5F7" />

            <g id="foundation-window-type-panel" transform="translate(130 138) scale(1.36)">
              <rect x="0" y="0" width="158" height="66" rx="12" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
              <rect x="14" y="12" width="20" height="16" rx="5" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="1" />
              <text x="24" y="23.5" textAnchor="middle" fill="#1A42B8" fontSize="8.5" fontWeight="800">B</text>
              <text x="52" y="23.5" textAnchor="middle" fill="#696D7A" fontSize="8.5" fontWeight="500">T</text>
              <line x1="72" x2="91" y1="16" y2="16" stroke="#A8BEFF" strokeWidth="1.35" strokeLinecap="round" />
              <line x1="72" x2="85" y1="23" y2="23" stroke="#A8BEFF" strokeWidth="1.35" strokeLinecap="round" />
              <line x1="108" x2="127" y1="16" y2="16" stroke="#A8BEFF" strokeWidth="1.35" strokeLinecap="round" />
              <line x1="112" x2="123" y1="23" y2="23" stroke="#A8BEFF" strokeWidth="1.35" strokeLinecap="round" />
              <rect x="14" y="41" width="26" height="15" rx="6" fill="#FAFBFF" />
              <text x="27" y="52" textAnchor="middle" fill="#696D7A" fontSize="7.5" fontWeight="700">S</text>
              <rect x="48" y="41" width="26" height="15" rx="6" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.9" />
              <text x="61" y="52" textAnchor="middle" fill="#1A42B8" fontSize="7.5" fontWeight="800">M</text>
              <rect x="82" y="41" width="30" height="15" rx="6" fill="#FAFBFF" />
              <text x="97" y="52" textAnchor="middle" fill="#696D7A" fontSize="7.5" fontWeight="700">XL</text>
              <rect x="120" y="41" width="30" height="15" rx="6" fill="#FAFBFF" />
              <text x="135" y="52" textAnchor="middle" fill="#696D7A" fontSize="7.5" fontWeight="700">XXL</text>
            </g>

            <g id="foundation-window-color-swatches">
              <circle cx="362" cy="142" r="8" fill="#2258F4" />
              <circle cx="390" cy="142" r="8" fill="#4777FF" />
              <circle cx="418" cy="142" r="8" fill="#618AFF" />
              <circle cx="446" cy="142" r="8" fill="#85A3FF" />
              <circle cx="474" cy="142" r="8" fill="#A8BEFF" />

              <circle cx="362" cy="170" r="8" fill="#7575FA" />
              <circle cx="390" cy="170" r="8" fill="#B973FF" />
              <circle cx="418" cy="170" r="8" fill="#FE668C" />
              <circle cx="446" cy="170" r="8" fill="#FF8157" />
              <circle cx="474" cy="170" r="8" fill="#FFD659" />

              <circle cx="362" cy="198" r="8" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />
              <circle cx="390" cy="198" r="8" fill="#EFEFFF" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="418" cy="198" r="8" fill="#F3E7FF" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="446" cy="198" r="8" fill="#FFE6EC" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="474" cy="198" r="8" fill="#FFF0E0" stroke="#E6E7EB" strokeWidth="0.8" />
            </g>

            <g id="foundation-window-spacing-rule">
              <rect x="206" y="240" width="42" height="18" rx="7" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />
              <rect x="278" y="240" width="42" height="18" rx="7" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />
              <rect x="340" y="240" width="42" height="18" rx="7" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />
              <rect x="394" y="240" width="42" height="18" rx="7" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />

              <line x1="248" x2="248" y1="232" y2="266" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />
              <line x1="278" x2="278" y1="232" y2="266" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />

              <line x1="320" x2="320" y1="234" y2="264" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />
              <line x1="340" x2="340" y1="234" y2="264" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />

              <line x1="382" x2="382" y1="236" y2="262" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />
              <line x1="394" x2="394" y1="236" y2="262" stroke="#A8BEFF" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4" />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 176" aria-hidden="true">
        <g id="basic-window-draft" transform="translate(-70 -36) scale(0.72)">
          <g id="basic-window-frame">
            <rect x="142" y="68" width="356" height="210" rx="16" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.3" />
            <path d="M 142 108 H 498" stroke="#E6E7EB" strokeWidth="1.1" />
            <circle cx="166" cy="88" r="4" fill="#2258F4" />
            <circle cx="181" cy="88" r="4" fill="#A8BEFF" />
            <circle cx="196" cy="88" r="4" fill="#E5EBFF" />
            <rect x="224" y="79" width="218" height="18" rx="9" fill="#F5F5F7" />

            <g id="basic-dropdown-component">
              <rect x="108" y="122" width="150" height="166" rx="16" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.1" />

              <g id="basic-dropdown-search">
                <rect x="116" y="130" width="134" height="24" rx="12" fill="#FAFBFF" stroke="#E6E7EB" strokeWidth="1" />
                <circle cx="128" cy="142" r="3.4" fill="none" stroke="#696D7A" strokeWidth="1" />
                <line x1="130.8" x2="134.2" y1="144.8" y2="148.2" stroke="#696D7A" strokeWidth="1" strokeLinecap="round" />
                <rect x="144" y="139" width="72" height="5" rx="2.5" fill="#E5EBFF" />
              </g>

              <g id="basic-dropdown-options">
                <g id="basic-dropdown-option-1">
                  <circle cx="128" cy="170" r="5" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
                  <rect x="144" y="167" width="70" height="5" rx="2.5" fill="#E5EBFF" />
                </g>

                <g id="basic-dropdown-option-2">
                  <rect x="116" y="186" width="134" height="26" rx="9" fill="#E5EBFF" />
                  <circle cx="128" cy="199" r="6" fill="#2258F4" />
                  <path d="M 125.2 198.7 L 127.5 201 L 131.3 196.6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="144" y="196" width="82" height="5" rx="2.5" fill="#A8BEFF" />
                </g>

                <g id="basic-dropdown-option-3">
                  <circle cx="128" cy="226" r="5" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
                  <rect x="144" y="223" width="74" height="5" rx="2.5" fill="#E5EBFF" />
                </g>

                <g id="basic-dropdown-option-4">
                  <circle cx="128" cy="254" r="5" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
                  <rect x="144" y="251" width="56" height="5" rx="2.5" fill="#E5EBFF" />
                </g>
              </g>
            </g>

            <g id="basic-control-card">
              <rect x="266" y="138" width="220" height="108" rx="16" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.1" />

              <g id="basic-range-slider">
                <line x1="274" x2="478" y1="166" y2="166" stroke="#E6E7EB" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="306" x2="446" y1="166" y2="166" stroke="#2258F4" strokeWidth="3" strokeLinecap="round" />
                <circle cx="306" cy="166" r="7.2" fill="#2258F4" />
                <circle cx="446" cy="166" r="7.2" fill="#2258F4" />
                <circle cx="306" cy="166" r="2" fill="#FFFFFF" />
                <circle cx="446" cy="166" r="2" fill="#FFFFFF" />
                <rect x="294" y="134" width="24" height="18" rx="9" fill="#2258F4" />
                <text x="306" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="750">1</text>
                <rect x="434" y="134" width="24" height="18" rx="9" fill="#2258F4" />
                <text x="446" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="750">2</text>
              </g>

              <g id="basic-input-fields">
                <rect x="274" y="178" width="100" height="34" rx="9" fill="#FAFBFF" stroke="#E6E7EB" strokeWidth="1" />
                <text x="286" y="191" fill="#696D7A" fontSize="7.8" fontWeight="650">From</text>
                <text x="286" y="204" fill="#1A1C24" fontSize="10.5" fontWeight="800">12,340.45</text>

                <rect x="378" y="178" width="100" height="34" rx="9" fill="#FAFBFF" stroke="#E6E7EB" strokeWidth="1" />
                <text x="390" y="191" fill="#696D7A" fontSize="7.8" fontWeight="650">To</text>
                <text x="390" y="204" fill="#1A1C24" fontSize="10.5" fontWeight="800">40,350.90</text>
              </g>

              <g id="basic-buttons">
                <rect x="274" y="216" width="132" height="22" rx="11" fill="#2258F4" />
                <text x="340" y="230.5" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="750">应用</text>
                <rect x="410" y="216" width="68" height="22" rx="11" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
                <text x="444" y="230.5" textAnchor="middle" fill="#4E525E" fontSize="9.5" fontWeight="700">取消</text>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 176" aria-hidden="true">
        <g id="compound-window-draft" transform="translate(-70 -36) scale(0.72)">
          <g id="compound-window-frame">
            <rect x="142" y="68" width="356" height="210" rx="16" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.3" />
            <path d="M 142 108 H 498" stroke="#E6E7EB" strokeWidth="1.1" />
            <circle cx="166" cy="88" r="4" fill="#2258F4" />
            <circle cx="181" cy="88" r="4" fill="#A8BEFF" />
            <circle cx="196" cy="88" r="4" fill="#E5EBFF" />
            <rect x="224" y="79" width="218" height="18" rx="9" fill="#F5F5F7" />

            <g id="compound-notification-card">
              <rect x="112" y="126" width="188" height="134" rx="18" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.1" />

              <g id="compound-notification-header">
                <rect x="124" y="138" width="10" height="10" rx="4" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.7" />
                <rect x="146" y="140" width="74" height="5" rx="2.5" fill="#E5EBFF" />
              </g>

              <g id="compound-notification-option-1">
                <rect x="124" y="158" width="164" height="26" rx="13" fill="#FAFBFF" />
                <rect x="132" y="165" width="12" height="12" rx="5" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.7" />
                <rect x="154" y="165" width="52" height="4" rx="2" fill="#A8BEFF" />
                <rect x="154" y="173" width="76" height="3" rx="1.5" fill="#E5EBFF" />
                <rect x="262" y="166" width="22" height="10" rx="5" fill="#2258F4" />
                <circle cx="278" cy="171" r="4" fill="#FFFFFF" />
              </g>

              <g id="compound-notification-option-2">
                <rect x="124" y="190" width="164" height="26" rx="13" fill="#FAFBFF" />
                <rect x="132" y="197" width="12" height="12" rx="5" fill="#EEF2FF" stroke="#A8BEFF" strokeWidth="0.7" />
                <rect x="154" y="197" width="58" height="4" rx="2" fill="#A8BEFF" />
                <rect x="154" y="205" width="82" height="3" rx="1.5" fill="#E5EBFF" />
                <rect x="262" y="198" width="22" height="10" rx="5" fill="#2258F4" />
                <circle cx="278" cy="203" r="4" fill="#FFFFFF" />
              </g>

              <g id="compound-notification-option-3">
                <rect x="124" y="222" width="164" height="26" rx="13" fill="#FAFBFF" />
                <rect x="132" y="229" width="12" height="12" rx="5" fill="#F5F5F7" stroke="#E6E7EB" strokeWidth="0.7" />
                <rect x="154" y="229" width="62" height="4" rx="2" fill="#A8BEFF" />
                <rect x="154" y="237" width="72" height="3" rx="1.5" fill="#E5EBFF" />
                <rect x="262" y="230" width="22" height="10" rx="5" fill="#E6E7EB" />
                <circle cx="267" cy="235" r="4" fill="#FFFFFF" stroke="#CBCDD4" strokeWidth="0.7" />
              </g>
            </g>

            <g id="compound-progress-card">
              <rect x="306" y="118" width="216" height="142" rx="18" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.1" />
              <rect x="318" y="132" width="110" height="5" rx="2.5" fill="#E5EBFF" />
              <path d="M 306 154 H 522" stroke="#E6E7EB" strokeWidth="0.9" />

              <rect x="318" y="168" width="88" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="318" y="185" width="86" height="4" rx="2" fill="#2258F4" />
              <rect x="408" y="185" width="58" height="4" rx="2" fill="#A8BEFF" />
              <rect x="470" y="185" width="40" height="4" rx="2" fill="#E5EBFF" />

              <circle cx="320" cy="204" r="2.2" fill="#2258F4" />
              <rect x="328" y="202.5" width="38" height="3" rx="1.5" fill="#E5EBFF" />
              <circle cx="382" cy="204" r="2.2" fill="#A8BEFF" />
              <rect x="390" y="202.5" width="42" height="3" rx="1.5" fill="#E5EBFF" />
              <circle cx="448" cy="204" r="2.2" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.6" />
              <rect x="456" y="202.5" width="42" height="3" rx="1.5" fill="#E5EBFF" />

              <path d="M 306 222 H 522" stroke="#E6E7EB" strokeWidth="0.9" />
              <rect x="318" y="234" width="50" height="14" rx="7" fill="#FAFBFF" stroke="#E6E7EB" strokeWidth="0.8" />
              <rect x="330" y="239" width="20" height="3.5" rx="1.75" fill="#A8BEFF" />
              <path d="M 356 238 L 360 241 L 356 244" fill="none" stroke="#1A42B8" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 176" aria-hidden="true">
        <g id="business-window-draft-large">
          <rect x="30" y="10" width="360" height="196" rx="18" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.3" />
          <path d="M 30 50 H 390" stroke="#E6E7EB" strokeWidth="1.1" />
          <circle cx="56" cy="30" r="4" fill="#2258F4" />
          <circle cx="72" cy="30" r="4" fill="#A8BEFF" />
          <circle cx="88" cy="30" r="4" fill="#E5EBFF" />
          <rect x="120" y="21" width="226" height="18" rx="9" fill="#F5F5F7" />

          <g id="business-timeline-component">
            <rect x="54" y="64" width="312" height="48" rx="10" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
            <line x1="82" x2="338" y1="80" y2="80" stroke="#A8BEFF" strokeWidth="1.4" strokeLinecap="round" />

            <g id="business-timeline-node-1">
              <circle cx="82" cy="80" r="8" fill="#2258F4" />
              <rect x="60" y="94" width="44" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="65" y="104" width="34" height="4" rx="2" fill="#E5EBFF" />
            </g>

            <g id="business-timeline-node-2">
              <circle cx="168" cy="80" r="8" fill="#2258F4" />
              <rect x="146" y="94" width="44" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="151" y="104" width="34" height="4" rx="2" fill="#E5EBFF" />
            </g>

            <g id="business-timeline-node-3">
              <circle cx="252" cy="80" r="8" fill="#2258F4" />
              <rect x="230" y="94" width="44" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="235" y="104" width="34" height="4" rx="2" fill="#E5EBFF" />
            </g>

            <g id="business-timeline-node-4">
              <circle cx="338" cy="80" r="8" fill="#FFFFFF" stroke="#A8BEFF" strokeWidth="1.2" />
              <circle cx="338" cy="80" r="3" fill="#A8BEFF" />
              <rect x="316" y="94" width="44" height="5" rx="2.5" fill="#E6E7EB" />
              <rect x="321" y="104" width="34" height="4" rx="2" fill="#E5EBFF" />
            </g>
          </g>

          <g id="business-enterprise-table">
            <rect x="54" y="122" width="312" height="106" rx="10" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
            <rect x="54" y="122" width="312" height="22" rx="10" fill="#FAFBFF" />
            <path d="M 54 144 H 366" stroke="#E6E7EB" strokeWidth="0.9" />
            <rect x="68" y="131" width="48" height="4" rx="2" fill="#CBCDD4" />
            <rect x="186" y="131" width="36" height="4" rx="2" fill="#CBCDD4" />
            <rect x="264" y="131" width="42" height="4" rx="2" fill="#CBCDD4" />

            <g id="business-enterprise-row-1">
              <path d="M 54 174 H 366" stroke="#E6E7EB" strokeWidth="0.9" />
              <rect x="68" y="153" width="16" height="16" rx="5" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.8" />
              <rect x="94" y="153" width="64" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="94" y="164" width="48" height="4" rx="2" fill="#E5EBFF" />
              <rect x="186" y="155" width="46" height="12" rx="6" fill="#22C55E" fillOpacity="0.14" stroke="#22C55E" strokeOpacity="0.42" strokeWidth="0.8" />
              <rect x="256" y="155" width="46" height="12" rx="6" fill="#F97316" fillOpacity="0.14" stroke="#F97316" strokeOpacity="0.42" strokeWidth="0.8" />
              <rect x="322" y="156" width="24" height="10" rx="5" fill="#E5EBFF" />
            </g>

            <g id="business-enterprise-row-2">
              <path d="M 54 204 H 366" stroke="#E6E7EB" strokeWidth="0.9" />
              <rect x="68" y="183" width="16" height="16" rx="5" fill="#EEF2FF" stroke="#A8BEFF" strokeWidth="0.8" />
              <rect x="94" y="183" width="58" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="94" y="194" width="52" height="4" rx="2" fill="#E5EBFF" />
              <rect x="186" y="185" width="46" height="12" rx="6" fill="#FF2828" fillOpacity="0.1" stroke="#FF2828" strokeOpacity="0.34" strokeWidth="0.8" />
              <rect x="256" y="185" width="46" height="12" rx="6" fill="#22C55E" fillOpacity="0.14" stroke="#22C55E" strokeOpacity="0.42" strokeWidth="0.8" />
              <rect x="322" y="186" width="24" height="10" rx="5" fill="#E5EBFF" />
            </g>
          </g>
        </g>

        <g id="business-status-filter">
          <rect x="320" y="56" width="84" height="22" rx="11" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />
          <rect x="332" y="65" width="42" height="4" rx="2" fill="#A8BEFF" />
          <path d="M 386 64 L 390 68 L 394 64" fill="none" stroke="#1A42B8" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />

          <g>
            <rect x="320" y="84" width="88" height="88" rx="9" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1" />

            <g id="business-status-filter-option-1">
              <rect x="328" y="92" width="72" height="12" rx="6" fill="#FAFBFF" />
              <rect x="336" y="96" width="40" height="4" rx="2" fill="#A8BEFF" />
            </g>

            <g id="business-status-filter-option-2">
              <rect x="328" y="108" width="72" height="12" rx="6" fill="#FAFBFF" />
              <rect x="336" y="111.5" width="44" height="5" rx="2.5" fill="#22C55E" fillOpacity="0.16" stroke="#22C55E" strokeOpacity="0.45" strokeWidth="0.7" />
            </g>

            <g id="business-status-filter-option-3">
              <rect x="328" y="124" width="72" height="12" rx="6" fill="#FAFBFF" />
              <rect x="336" y="127.5" width="44" height="5" rx="2.5" fill="#F97316" fillOpacity="0.16" stroke="#F97316" strokeOpacity="0.45" strokeWidth="0.7" />
            </g>

            <g id="business-status-filter-option-4">
              <rect x="328" y="140" width="72" height="12" rx="6" fill="#FAFBFF" />
              <rect x="336" y="143.5" width="44" height="5" rx="2.5" fill="#FF2828" fillOpacity="0.11" stroke="#FF2828" strokeOpacity="0.38" strokeWidth="0.7" />
            </g>

            <g id="business-status-filter-option-5">
              <rect x="328" y="156" width="72" height="8" rx="4" fill="#FAFBFF" />
              <rect x="336" y="158" width="34" height="4" rx="2" fill="#E6E7EB" />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (index === 4) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 176" aria-hidden="true">
        <g id="template-window-draft-large">
          <rect x="30" y="10" width="360" height="196" rx="18" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="1.3" />
          <path d="M 30 50 H 390" stroke="#E6E7EB" strokeWidth="1.1" />
          <circle cx="56" cy="30" r="4" fill="#2258F4" />
          <circle cx="72" cy="30" r="4" fill="#A8BEFF" />
          <circle cx="88" cy="30" r="4" fill="#E5EBFF" />
          <rect x="120" y="21" width="226" height="18" rx="9" fill="#F5F5F7" />

          <g id="template-sidebar-menu">
            <rect x="30" y="50" width="78" height="156" fill="#FAFBFF" />
            <path d="M 108 50 V 206" stroke="#E6E7EB" strokeWidth="1" />
            <rect x="48" y="68" width="34" height="5" rx="2.5" fill="#CBCDD4" />

            <g id="template-sidebar-group-1">
              <circle cx="50" cy="92" r="3.4" fill="#E5EBFF" stroke="#A8BEFF" strokeWidth="0.7" />
              <rect x="60" y="89.5" width="30" height="4" rx="2" fill="#696D7A" opacity="0.62" />
              <rect x="60" y="101" width="38" height="4" rx="2" fill="#E5EBFF" />
              <rect x="60" y="111" width="30" height="4" rx="2" fill="#E5EBFF" />
              <rect x="60" y="121" width="34" height="4" rx="2" fill="#E5EBFF" />
            </g>

            <g id="template-sidebar-group-2">
              <circle cx="50" cy="144" r="3.4" fill="#2258F4" />
              <rect x="60" y="141.5" width="34" height="4" rx="2" fill="#2258F4" />
              <rect x="60" y="153" width="40" height="4" rx="2" fill="#E5EBFF" />
              <rect x="60" y="163" width="32" height="4" rx="2" fill="#E5EBFF" />
              <rect x="60" y="173" width="36" height="4" rx="2" fill="#E5EBFF" />
            </g>
          </g>

          <g id="template-dashboard-surface">
            <g id="template-dashboard-header">
              <rect x="126" y="70" width="104" height="8" rx="4" fill="#CBCDD4" />
              <rect x="126" y="88" width="52" height="5" rx="2.5" fill="#E6E7EB" />
            </g>

            <g id="template-action-cards">
              <rect x="126" y="104" width="76" height="28" rx="7" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="144" cy="118.5" r="2.6" fill="none" stroke="#CBCDD4" strokeWidth="0.8" />
              <path d="M 142.5 118.5 H 145.5" stroke="#CBCDD4" strokeWidth="0.8" strokeLinecap="round" />
              <rect x="158" y="117" width="30" height="5" rx="2.5" fill="#E5EBFF" />

              <rect x="214" y="104" width="76" height="28" rx="7" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="232" cy="118.5" r="2.6" fill="none" stroke="#CBCDD4" strokeWidth="0.8" />
              <path d="M 230.5 118.5 H 233.5" stroke="#CBCDD4" strokeWidth="0.8" strokeLinecap="round" />
              <rect x="246" y="117" width="30" height="5" rx="2.5" fill="#E5EBFF" />
            </g>

            <g id="template-dashboard-panel">
              <rect x="126" y="144" width="188" height="56" rx="9" fill="#FAFBFF" />
              <path d="M 142 172 L 156 160 L 172 166 L 190 148 L 210 164 L 232 154" fill="none" stroke="#2258F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="190" cy="148" r="2.4" fill="#FFFFFF" stroke="#2258F4" strokeWidth="1" />
              <circle cx="210" cy="164" r="2.4" fill="#FFFFFF" stroke="#2258F4" strokeWidth="1" />
              <rect x="254" y="154" width="34" height="5" rx="2.5" fill="#E5EBFF" />
              <rect x="254" y="166" width="25" height="5" rx="2.5" fill="#2258F4" opacity="0.48" />
            </g>

            <g id="template-option-card-grid">
              <rect x="126" y="224" width="82" height="32" rx="7" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="0.8" />
              <circle cx="144.5" cy="241.5" r="2.8" fill="none" stroke="#CBCDD4" strokeWidth="0.8" />
              <path d="M 143 241.5 H 146" stroke="#CBCDD4" strokeWidth="0.8" strokeLinecap="round" />
              <rect x="158" y="236" width="32" height="5" rx="2.5" fill="#A8BEFF" />
              <rect x="158" y="247" width="24" height="4" rx="2" fill="#E5EBFF" />
            </g>

            <g id="template-right-stat-cards">
              <g id="template-right-stat-card-primary">
                <rect x="304" y="60" width="108" height="58" rx="9" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="0.8" />
                <circle cx="321" cy="77" r="3.5" fill="none" stroke="#CBCDD4" strokeWidth="0.9" />
                <path d="M 321 74.5 V 79.5 M 318.5 77 H 323.5" stroke="#CBCDD4" strokeWidth="0.8" strokeLinecap="round" />
                <rect x="336" y="73" width="42" height="6" rx="3" fill="#CBCDD4" />
                <circle cx="398" cy="72" r="1.2" fill="#CBCDD4" />
                <circle cx="398" cy="77" r="1.2" fill="#CBCDD4" />
                <circle cx="398" cy="82" r="1.2" fill="#CBCDD4" />

                <text x="314" y="103" fill="#1A1C24" fontFamily="PingFang SC, sans-serif" fontSize="16" fontWeight="700">248</text>
                <text x="354" y="99" fill="#2258F4" fontFamily="PingFang SC, sans-serif" fontSize="6" fontWeight="700">+36</text>
                <rect x="374" y="96" width="22" height="4" rx="2" fill="#E6E7EB" />

                <g id="template-right-primary-bar">
                  <rect x="314" y="108" width="88" height="5" rx="2.5" fill="#EEF2FF" />
                  <rect x="314" y="108" width="34" height="5" rx="2.5" fill="#2258F4" />
                  <rect x="350" y="108" width="34" height="5" rx="2.5" fill="#A8BEFF" />
                  <rect x="386" y="108" width="16" height="5" rx="2.5" fill="#CBCDD4" />
                </g>
              </g>

              <g id="template-right-stat-card-secondary">
                <rect x="304" y="124" width="108" height="52" rx="9" fill="#FFFFFF" stroke="#E6E7EB" strokeWidth="0.8" />
                <path d="M 318 144 L 323 139" stroke="#CBCDD4" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="323" cy="139" r="1.7" fill="none" stroke="#CBCDD4" strokeWidth="0.8" />
                <rect x="336" y="137" width="48" height="6" rx="3" fill="#CBCDD4" />
                <circle cx="398" cy="136" r="1.2" fill="#CBCDD4" />
                <circle cx="398" cy="141" r="1.2" fill="#CBCDD4" />
                <circle cx="398" cy="146" r="1.2" fill="#CBCDD4" />

                <g id="template-right-secondary-left">
                  <circle cx="315" cy="154" r="2" fill="#A8BEFF" />
                  <text x="314" y="168" fill="#1A1C24" fontFamily="PingFang SC, sans-serif" fontSize="10" fontWeight="700">86</text>
                  <text x="333" y="164" fill="#2258F4" fontFamily="PingFang SC, sans-serif" fontSize="5" fontWeight="700">+12</text>
                  <rect x="314" y="171" width="34" height="4" rx="2" fill="#E6E7EB" />
                </g>

                <path d="M 358 152 V 176" stroke="#E6E7EB" strokeWidth="0.8" />

                <g id="template-right-secondary-right">
                  <circle cx="370" cy="154" r="2" fill="#CBCDD4" />
                  <text x="370" y="168" fill="#1A1C24" fontFamily="PingFang SC, sans-serif" fontSize="10" fontWeight="700">54</text>
                  <rect x="370" y="171" width="24" height="4" rx="2" fill="#E6E7EB" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  return null;
}

function DesignSystemArchitectureLayers() {
  const [activeLayerId, setActiveLayerId] = useState<ArchitectureLayerId | null>(null);
  const [settled, setSettled] = useState(false);
  const currentLayerId = activeLayerId ?? "base";
  const currentLayer = ARCHITECTURE_LAYERS[currentLayerId];
  const renderOrder: ArchitectureLayerId[] = activeLayerId === "base" ? ["component", "base"] : ["base", "component"];

  useEffect(() => {
    setSettled(false);

    if (!activeLayerId) {
      setSettled(false);
      return;
    }

    const timer = window.setTimeout(() => setSettled(true), 240);
    return () => window.clearTimeout(timer);
  }, [activeLayerId]);

  const guideVisible = !!activeLayerId && settled;

  const activateLayerFromPointer = (event: ReactMouseEvent<SVGSVGElement> | ReactPointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewBoxY = ((event.clientY - rect.top) / rect.height) * 300;
    setActiveLayerId(viewBoxY < 176 ? "component" : "base");
  };

  const renderSideContent = (side: "left" | "right") => (
    <div className="relative min-h-[240px]">
      {ARCHITECTURE_LAYER_ORDER.map((id) => {
        const layer = ARCHITECTURE_LAYERS[id];
        const items = side === "left" ? layer.contents : layer.definitions;
        const isVisible = currentLayerId === id;

        return (
          <motion.div
            key={`${side}-${id}`}
            className={`absolute w-full space-y-3 ${side === "left" ? "left-0 text-left" : "right-0 text-right"}`}
            style={{ top: layer.textTop, pointerEvents: isVisible ? "auto" : "none" }}
            initial={false}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[#1A42B8]" style={{ fontSize: 13, lineHeight: "18px", fontWeight: 700, letterSpacing: "0.04em" }}>
              {side === "left" ? "这一层包含" : "这一层定义"}
            </div>
            <div className={side === "left" ? "space-y-2" : "space-y-2.5"}>
              {items.map((item) => (
                <div
                  key={item}
                  className="text-[#696D7A]"
                  style={{ fontSize: 12, lineHeight: "18px", fontWeight: 600 }}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderLayer = (id: ArchitectureLayerId) => {
    const layer = ARCHITECTURE_LAYERS[id];
    const isActive = activeLayerId === id;
    const isDimmed = !!activeLayerId && !isActive;
    const topFill = id === "component" ? "url(#componentLayerTop)" : "url(#baseLayerTop)";
    const sideFill = id === "component" ? "url(#componentLayerSide)" : "url(#baseLayerSide)";
    const detailOpacity = isActive ? 1 : id === "component" ? 0.86 : 0.7;
    const activateLayer = () => setActiveLayerId(id);

    return (
      <motion.g
        key={id}
        onMouseEnter={activateLayer}
        onMouseMove={activateLayer}
        onPointerEnter={activateLayer}
        onPointerMove={activateLayer}
        animate={{ x: isActive ? -12 : 0, y: isActive ? 16 : 0, opacity: isDimmed ? 0.52 : 1 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        style={{ cursor: "none" }}
      >
        <g transform={`translate(0 ${layer.offsetY})`}>
          <path
            d="M 148 142 L 248 86 Q 260 79 272 86 L 372 142 Q 386 150 372 158 L 272 213 Q 260 220 248 213 L 148 158 Q 134 150 148 142 Z"
            fill={sideFill}
            stroke={isActive ? BLUE : ICON_BORDER}
            strokeWidth={isActive ? 2.2 : 1.35}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 148 130 L 248 74 Q 260 67 272 74 L 372 130 Q 386 138 372 146 L 272 201 Q 260 208 248 201 L 148 146 Q 134 138 148 130 Z"
            fill={topFill}
            stroke={isActive ? BLUE : ICON_BORDER}
            strokeWidth={isActive ? 2.4 : 1.55}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="148,149 260,211 372,149"
            fill="none"
            stroke="#A8BEFF"
            strokeWidth="1.1"
            opacity="0.62"
          />

          {id === "base" ? (
            <g opacity={detailOpacity}>
              <path
                d="M 190 132 L 258 94 L 326 132 L 262 170 Z"
                fill="rgba(255,255,255,0.82)"
                stroke="#A8BEFF"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path d="M 190 132 L 262 170 L 262 178 L 190 140 Z" fill="#EEF2FF" stroke="#A8BEFF" strokeWidth="1" strokeLinejoin="round" opacity="0.9" />
              <path d="M 262 170 L 326 132 L 326 140 L 262 178 Z" fill="#FAFBFF" stroke="#A8BEFF" strokeWidth="1" strokeLinejoin="round" opacity="0.86" />

              <path
                d="M 210 132 L 258 105 L 306 132 L 262 159 Z"
                fill="none"
                stroke="#E5EBFF"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M 229 132 L 258 116 L 288 132 L 262 148 Z"
                fill="none"
                stroke="#A8BEFF"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path
                d="M 245 132 L 258 125 L 272 132 L 262 139 Z"
                fill="#2258F4"
                stroke="#1A42B8"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                d="M 206 132 L 258 103 L 312 132"
                fill="none"
                stroke="#2258F4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.72"
              />
            </g>
          ) : (
            <g opacity={detailOpacity}>
              <rect x="184" y="118" width="58" height="22" rx="8" fill="#2258F4" opacity="0.92" />
              <rect x="252" y="118" width="82" height="22" rx="8" fill="#FFFFFF" stroke="#A8BEFF" strokeWidth="1.5" />
              <line x1="268" x2="318" y1="129" y2="129" stroke="#A8BEFF" strokeWidth="2" strokeLinecap="round" />
              <rect x="198" y="151" width="38" height="18" rx="9" fill="#E5EBFF" stroke="#2258F4" strokeWidth="1.3" />
              <rect x="246" y="151" width="42" height="18" rx="9" fill="#FAFBFF" stroke="#A8BEFF" strokeWidth="1.2" />
              <rect x="302" y="148" width="32" height="24" rx="6" fill="#EEF2FF" stroke="#2258F4" strokeWidth="1.25" />
              <line x1="340" x2="358" y1="153" y2="143" stroke="#A8BEFF" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="340" x2="358" y1="164" y2="154" stroke="#E5EBFF" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          <text x="260" y="255" textAnchor="middle" fill="#1A42B8" fontSize="15" fontWeight="700">
            {layer.label}
          </text>
          <path
            d="M 128 118 L 248 50 Q 260 43 272 50 L 392 118 Q 410 128 392 139 L 272 228 Q 260 235 248 228 L 128 139 Q 110 128 128 118 Z"
            fill="transparent"
            pointerEvents="all"
            onMouseEnter={activateLayer}
            onMouseMove={activateLayer}
            onPointerEnter={activateLayer}
            onPointerMove={activateLayer}
          />
        </g>
      </motion.g>
    );
  };

  return (
    <div
      className="relative h-full min-h-[320px] overflow-hidden rounded-2xl bg-white px-4 py-5 md:px-6"
      onMouseLeave={() => setActiveLayerId(null)}
    >
      <motion.div
        key={currentLayerId}
        className="pointer-events-none absolute left-6 top-6 z-20 md:left-8 md:top-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-[#1A1C24]" style={{ fontSize: 18, lineHeight: "24px", fontWeight: 700 }}>
          {currentLayer.label}
        </div>
      </motion.div>
      <div className="relative z-10 grid h-full gap-5 md:grid-cols-[0.78fr_1.34fr_0.82fr] md:items-center">
        {renderSideContent("left")}

        <div className="relative flex min-h-[240px] items-center justify-center">
          <svg
            viewBox="0 0 520 300"
            className="h-full min-h-[240px] w-full overflow-visible"
            role="img"
            aria-label="组件库基础规范层与基础组件层等距架构图"
            onMouseMove={activateLayerFromPointer}
            onPointerMove={activateLayerFromPointer}
            onMouseLeave={() => setActiveLayerId(null)}
          >
            <defs>
              <linearGradient id="baseLayerTop" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#EEF2FF" />
              </linearGradient>
              <linearGradient id="baseLayerSide" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#E5EBFF" stopOpacity="0.94" />
                <stop offset="100%" stopColor="#FAFBFF" stopOpacity="0.82" />
              </linearGradient>
              <linearGradient id="componentLayerTop" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FAFBFF" />
              </linearGradient>
              <linearGradient id="componentLayerSide" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.86" />
              </linearGradient>
            </defs>
            <motion.line
              x1="-210"
              y1={currentLayer.guideY}
              x2={currentLayer.leftDotX}
              y2={currentLayer.guideY}
              stroke="#A8BEFF"
              strokeWidth="1"
              initial={false}
              animate={{ opacity: guideVisible ? 1 : 0 }}
              transition={{ duration: guideVisible ? 0.2 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.line
              x1="730"
              y1={currentLayer.guideY}
              x2={currentLayer.rightDotX}
              y2={currentLayer.guideY}
              stroke="#A8BEFF"
              strokeWidth="1"
              initial={false}
              animate={{ opacity: guideVisible ? 1 : 0 }}
              transition={{ duration: guideVisible ? 0.2 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
            {renderOrder.map((id) => renderLayer(id))}
            <motion.circle
              cx={currentLayer.leftDotX}
              cy={currentLayer.guideY}
              r="3.8"
              fill={BLUE}
              stroke="#FFFFFF"
              strokeWidth="1.4"
              initial={false}
              animate={{ opacity: guideVisible ? 1 : 0 }}
              transition={{ duration: guideVisible ? 0.2 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={currentLayer.rightDotX}
              cy={currentLayer.guideY}
              r="3.8"
              fill={BLUE}
              stroke="#FFFFFF"
              strokeWidth="1.4"
              initial={false}
              animate={{ opacity: guideVisible ? 1 : 0 }}
              transition={{ duration: guideVisible ? 0.2 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>

        {renderSideContent("right")}
      </div>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex px-3 py-1.5 rounded-full"
      style={{ background: "#DCE5FF", color: ICON_BLUE, fontSize: 13, fontWeight: 600 }}
    >
      {children}
    </span>
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
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function QixinProjectDetail({ onBack }: Props) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [sideNav, setSideNav] = useState(false);
  const sideNavRef = useRef(false);
  const chainPointerRef = useRef({ x: -1, y: -1 });
  const chainSwitchPointRef = useRef({ x: -1, y: -1 });
  const recruitPointerRef = useRef({ x: -1, y: -1 });
  const [chainSlide, setChainSlide] = useState(0);
  const [recruitFront, setRecruitFront] = useState<"detail" | "relation">("detail");

  const chainSlides = [
    { src: "images/optimized/qixin-industry-detail-1600.jpg", alt: "产业洞察详情" },
    { src: "images/optimized/qixin-chain-map-1600.jpg", alt: "产业链图" },
    { src: "images/optimized/qixin-chain-action-1600.jpg", alt: "强链补链延链" },
  ];

  const recruitSlides = [
    { id: "detail", src: "images/optimized/qixin-company-detail-1600.jpg", alt: "企业详情" },
    { id: "relation", src: "images/optimized/qixin-relation-1600.jpg", alt: "找关系" },
  ] as const;

  const PAIN_POINTS = [
    { title: "数据源分散", desc: "企业信息、产业数据、风险动态分散在不同系统和报告中，查找和整合耗时巨大。" },
    { title: "缺少产业视角", desc: "只能查询单个企业，无法从产业链维度理解上下游关系、识别产业优势环节。" },
    { title: "招商线索难跟进", desc: "企业名单和招商线索缺少系统化管理，跟进状态依赖个人经验和线下表格。" },
    { title: "报告输出低效", desc: "从数据收集到报告撰写完全手动，一份完整报告需要数天甚至数周时间。" },
  ];

  const SOLUTIONS = [
    { title: "一站式数据平台", desc: "企业、产业、风险、舆情、经营等多维数据整合在同一平台，快速检索与交叉分析。" },
    { title: "产业链视角", desc: "支持标准产业链与自定义产业链图谱，直观呈现上下游结构和本地企业分布。" },
    { title: "系统化招商流程", desc: "从企业发现、价值判断、名单沉淀到持续监控，完整的招商任务闭环。" },
    { title: "AI 报告联动", desc: "企业分组关联 AI 报告生成，历史数据自动填充，报告输出从数天缩短至分钟级。" },
  ];

  const SCENARIOS = [
    { id: "01", name: "招商场景", users: "招商办、园区招商人员", tasks: ["找产业", "找企业", "建名单", "跟进线索"] },
    { id: "02", name: "产业服务", users: "产业部门、园区运营人员", tasks: ["看产业结构", "识别优势环节", "服务本地企业"] },
    { id: "03", name: "企业服务", users: "企业服务部门", tasks: ["企业画像", "识别风险", "政策扶持", "跟踪成长"] },
    { id: "04", name: "金融场景", users: "银行、投资机构、金融服务人员", tasks: ["企业筛选", "风险判断", "融资动态", "价值评估"] },
    { id: "05", name: "区域治理", users: "政府部门、区域经济管理者", tasks: ["区域经济", "迁入迁出", "舆情动态", "输出报告"] },
  ];

  useEffect(() => {
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const isAtPageEnd = Math.ceil(viewportBottom) >= documentHeight - 4;
      const y = window.scrollY + Math.min(window.innerHeight * 0.42, 360);
      let current = SECTIONS[0].id;
      if (isAtPageEnd) {
        current = SECTIONS[SECTIONS.length - 1].id;
      } else {
        for (const section of SECTIONS) {
          const el = document.getElementById(section.id);
          if (el && el.offsetTop <= y) current = section.id;
        }
      }
      setActive(current);
      const second = document.getElementById("qx02");
      if (second) {
        const pastIntro = window.scrollY > second.offsetTop + 100;
        if (pastIntro && !sideNavRef.current) {
          sideNavRef.current = true;
          setSideNav(true);
        } else if (!pastIntro && window.scrollY < second.offsetTop - 100 && sideNavRef.current) {
          sideNavRef.current = false;
          setSideNav(false);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="relative z-10">
      {sideNav && (
        <nav className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden 2xl:block">
          <div className="flex flex-col gap-1 px-4 py-4 rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-xl shadow-sm">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <button key={s.id} onClick={() => scrollTo(s.id)} className="group flex items-center gap-3 py-1.5">
                  <span
                    className={`size-2 rounded-full border-2 transition-colors ${
                      isActive ? "bg-[#2258F4] border-[#2258F4]" : "bg-transparent border-neutral-600 group-hover:border-neutral-400"
                    }`}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      isActive ? "text-[#1A42B8]" : "text-neutral-500 group-hover:text-neutral-700"
                    }`}
                    style={T.nav}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}




      <>
      <section id="qx01" className={`relative pt-24 md:pt-28 overflow-hidden ${HERO_PAD}`}>
        <AccentBlob side="right" />
        <div className="relative w-full grid lg:grid-cols-[1.05fr_1fr] gap-12 xl:gap-16 items-start">
          <div className="pt-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="tracking-tight text-[#1A1C24]"
              style={T.heroTitle}
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #4777FF, #1E4DD6)" }}>
                启信产业大脑
              </span>
              <br />
              政府招商与产业分析的企业数据系统设计
            </motion.h1>
            <p className="mt-7" style={T.heroSub}>
              从早期招商大脑功能迭代开始，逐步演进为覆盖产业洞察、精准招商、企业画像、报告中心、企业监控与 AI 报告联动的平台型系统。
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-x-7 gap-y-6">
              {[
                ["项目周期", "2021 - 2026"],
                ["项目类型", "B/G 端数据平台"],
                ["我的角色", "产品设计师"],
                ["参与范围", "核心模块与规范"],
                ["当前状态", "已上线并持续迭代"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 text-[#1A1C24]/45" style={T.label}>{label}</div>
                  <div className="text-[#1A1C24]" style={{ fontSize: 15, lineHeight: 1.55, fontWeight: 520 }}>{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {[
                { icon: LayoutDashboard, title: "核心模块设计", desc: "首页、产业洞察、精准招商、企业画像、报告中心、企业监控" },
                { icon: Boxes, title: "组件库建设", desc: "主导协同组内设计师从 0 到 1 建设 DGG 组件库与标品规范" },
                { icon: Network, title: "自定义产业链", desc: "支持本地产业口径下的产业图谱配置与分析视图" },
                { icon: Link2, title: "跨系统联动", desc: "企业分组通过权限体系关联到 AI 报告生成中的关联企业" },
              ].map((item) => <Card key={item.title} {...item} />)}
            </div>
          </div>

          <div className="mx-auto w-[92%] px-2 pt-2 relative lg:mt-[clamp(0px,calc(612px-34vw),190px)]">
            <div
              className="max-h-[640px] overflow-hidden rounded-t-3xl relative border-t border-l border-r border-[#E6E7EB]"
            >
              <img
                src="images/optimized/qixin-home-1920.jpg"
                alt="启信产业大脑首页截图"
                {...DETAIL_IMAGE_EAGER_PROPS}
                className="block w-full rounded-none"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24"
                style={{
                  background: "linear-gradient(180deg, rgba(250,250,250,0), rgba(250,250,250,0.92))",
                }}
              />
            </div>
            <img
              src="images/首页/login.png"
              alt="登录页截图"
              {...DETAIL_IMAGE_LAZY_PROPS}
              className="absolute -left-12 bottom-2 z-20 w-[28%] rounded-lg border border-[#E6E7EB]"
              style={{
                boxShadow: "4px -4px 20px rgba(15,20,25,0.06)",
              }}
            />
            <img
              src="images/首页/push group.png"
              alt="推送分组截图"
              {...DETAIL_IMAGE_LAZY_PROPS}
              className="absolute -right-12 bottom-4 z-10 w-[28%] rounded-lg border border-[#E6E7EB]"
              style={{
                boxShadow: "-4px -4px 20px rgba(15,20,25,0.06)",
              }}
            />
          </div>
        </div>

      </section>

      <div className={`relative z-30 ${SECTION_PAD}`}>
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #E6E7EB 35%, #E6E7EB 65%, transparent 100%)",
          }}
        />
      </div>

      {/* ───── v1+v2: KPI 数据卡 ───── */}
        <div className={`relative z-20 ${SECTION_PAD} mt-12 md:mt-16`}>
          <div className={READ}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { n: "40+", label: "省市级客户" },
                { n: "全国", label: "覆盖行政区" },
                { n: "300+", label: "产业链覆盖" },
                { n: "1000亿", label: "企业数据" },
                { n: "1000+", label: "产业链数据维度" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="relative p-3.5 rounded-2xl border border-[#E6E7EB] bg-white overflow-hidden group hover:border-[#A8BEFF]/60 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[#618AFF]/40 to-transparent" />
                  <div className="relative">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-[clamp(20px,2.5vw,28px)] font-bold tracking-tight text-[#1A1C24] group-hover:text-[#2258F4] transition-colors duration-300">
                        {k.n}
                      </span>
                    </div>
                    <div className="text-[12px] text-[#696D7A]">{k.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      <section id="qx02" className={`relative py-20 md:py-28 ${SECTION_PAD}`}>
        <div className={BUSINESS_READ}>
          <Reveal>
          <div className="text-center">
            <h2 className="tracking-tight text-[#1A1C24] leading-[1.12]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700 }}>
              从单一查询工具到多场景数据平台
            </h2>
            <p className="mt-4 text-[#696D7A] max-w-[1080px] mx-auto" style={T.bodyMuted}>
              政府招商、产业服务、企业服务、金融服务、区域治理——启信产业大脑同时面对五类场景，每类场景的核心设计命题不是数据量的堆叠，而是让用户按自己的任务逻辑连续完成工作。以下以招商场景为典型，拆解从发现企业到持续跟进的全链路体验设计。
            </p>
          </div>
        </Reveal>
        </div>

        {/* ───── 5 场景卡片 ───── */}
        <div className="mx-auto mt-10 max-w-[1600px]">
          <Reveal>
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            {SCENARIOS.map((s) => (
              <div key={s.id} className="relative flex-1 rounded-2xl border border-[#E6E7EB] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute right-4 top-4 text-[56px] font-bold text-[#1A1C24]/[0.05] leading-none">{s.id}</div>
                <div className="text-base font-semibold text-[#1A1C24]">{s.name}</div>
                <div className="text-[13px] text-[#696D7A] leading-relaxed mt-1.5">{s.users}</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {s.tasks.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md text-[11px] text-[#696D7A] bg-[#F5F5F7] border border-[#E6E7EB]">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>

        {/* ───── 招商场景深挖 ───── */}
        <div className={`${BUSINESS_READ} mt-4`}>
          <Reveal>
            <div className="space-y-4">
              <Reveal>
                    <div className="rounded-2xl border border-[#E6E7EB] bg-white p-5">
                  <div className="grid gap-6 lg:grid-cols-[420px_1fr] lg:items-start 2xl:grid-cols-[460px_1fr]">
                    <div>
                      <div className="mb-2 text-[16px] font-semibold leading-[1.35] text-[#1A1C24]">用户故事</div>
                      <p className="text-[14px] font-normal leading-[1.7] text-[#1A1C24]">
                        作为政府部门或机构的业务人员，我需要一个能连续走完<span className="text-[#1A42B8]">「定位 → 筛选 → 评估 → 管理 → 输出」</span>的企业数据工作台，以便告别多平台搬运和 Excel 拼凑，让每一次决策都有数据支撑。
                      </p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { step: "定位范围", desc: "看清产业结构和优势环节" },
                        { step: "筛选目标", desc: "从海量企业中锁定候选名单" },
                        { step: "评估判断", desc: "多维度判断企业价值与风险" },
                        { step: "持续管理", desc: "分组监控，标注进度，线索不丢" },
                        { step: "输出结果", desc: "一键生成报告，随要随出" },
                      ].map((item, i) => (
                        <div key={item.step} className="rounded-xl border border-[#E6E7EB] bg-[#FAFBFF] p-3">
                          <span className="mb-2 inline-flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-semibold text-[#1A42B8]">{`0${i + 1}`}</span>
                          <div className="text-[13px] font-semibold leading-[1.45] text-[#1A1C24]">{item.step}</div>
                          <p className="mt-1 text-[12px] leading-[1.55] text-[#696D7A]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-3 lg:hidden">
                {[
                  {
                    stage: "理解产业",
                    task: "看清产业结构与重点方向",
                    friction: "产业数据分散，口径不统一",
                    opportunity: "用产业链建立统一观察入口",
                    support: "产业洞察 / 自定义产业链",
                    scene: "产业规划 / 区域治理",
                  },
                  {
                    stage: "识别对象",
                    task: "找到企业、服务或风险对象",
                    friction: "对象数量多，筛选维度复杂",
                    opportunity: "用筛选、标签和关系图谱定位对象",
                    support: "精准招商 / 企业检索 / 关系图谱",
                    scene: "招商 / 企业服务 / 金融辅助",
                  },
                  {
                    stage: "判断价值",
                    task: "判断价值、风险与优先级",
                    friction: "信息分散，判断依据不完整",
                    opportunity: "用企业画像整合多维判断依据",
                    support: "企业画像 / 风险信息 / 经营动态",
                    scene: "招商 / 金融辅助 / 企业服务",
                  },
                  {
                    stage: "沉淀任务",
                    task: "形成可管理的工作名单",
                    friction: "线索散落在表格和记录中",
                    opportunity: "用分组、状态和进度承接任务",
                    support: "企业分组 / 企业监控 / 进度标注",
                    scene: "招商 / 企业服务",
                  },
                  {
                    stage: "持续监测",
                    task: "跟踪动态、变化和任务进展",
                    friction: "后续变化难持续感知",
                    opportunity: "用监控、提醒和报告形成反馈",
                    support: "企业监控 / 报告中心 / AI 报告联动",
                    scene: "区域治理 / 企业服务 / 招商",
                  },
                ].map((item, i) => (
                  <Reveal key={item.stage}>
                    <div className="rounded-2xl border border-[#E6E7EB] bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E5EBFF] text-[11px] font-semibold text-[#1A42B8]">
                          {`0${i + 1}`}
                        </span>
                        <div className="text-[15px] font-semibold text-[#1A1C24]">{item.stage}</div>
                      </div>
                      <div className="grid gap-2 text-[13px] leading-[1.6]">
                        <p className="text-[#696D7A]"><span className="font-medium text-[#1A1C24]">用户任务：</span>{item.task}</p>
                        <p className="text-[#696D7A]"><span className="font-medium text-[#1A1C24]">核心阻力：</span>{item.friction}</p>
                        <p className="text-[#1A42B8]"><span className="font-medium">设计机会：</span>{item.opportunity}</p>
                        <p className="text-[#696D7A]"><span className="font-medium text-[#1A1C24]">产品承接：</span>{item.support}</p>
                        <p className="text-[#696D7A]"><span className="font-medium text-[#1A1C24]">适用场景：</span>{item.scene}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="hidden lg:block">
                <div className="overflow-x-auto rounded-2xl border border-[#E6E7EB] bg-white">
                  <div className="grid min-w-[1600px] grid-cols-[120px_repeat(5,minmax(0,1fr))] overflow-hidden">
                    <div className="border-b border-r border-[#E6E7EB] bg-[#FAFBFF] py-4 pl-5">
                      <span className="text-xs font-semibold text-[#B3B6BF]">阶段</span>
                    </div>
                    {["理解产业", "识别对象", "判断价值", "沉淀任务", "持续监测"].map((stage) => (
                      <div key={stage} className="border-b border-r border-[#E6E7EB]/40 bg-[#FAFBFF] px-4 py-4 text-center last:border-r-0">
                        <div className="text-sm font-semibold text-[#1A1C24]">{stage}</div>
                      </div>
                    ))}

                    {[
                      {
                        label: "用户任务",
                        labelClass: "bg-[#FAFBFF] text-[#696D7A]",
                        cellClass: "text-[#696D7A]",
                        rowClass: "",
                        cells: ["看清产业结构与重点方向", "找到企业、服务或风险对象", "判断价值、风险与优先级", "形成可管理的工作名单", "跟踪动态、变化和任务进展"],
                      },
                      {
                        label: "核心阻力",
                        labelClass: "bg-[#FAFBFF] text-[#696D7A]",
                        cellClass: "text-[#696D7A]",
                        rowClass: "",
                        cells: ["产业数据分散，口径不统一", "对象数量多，筛选维度复杂", "信息分散，判断依据不完整", "线索散落在表格和记录中", "后续变化难持续感知"],
                      },
                      {
                        label: "设计机会",
                        labelClass: "bg-[#E5EBFF] text-[#1A42B8]",
                        cellClass: "font-medium text-[#1A42B8]",
                        rowClass: "bg-[#EEF2FF]/50",
                        cells: ["用产业链建立统一观察入口", "用筛选、标签和关系图谱定位对象", "用企业画像整合多维判断依据", "用分组、状态和进度承接任务", "用监控、提醒和报告形成反馈"],
                      },
                      {
                        label: "产品承接",
                        labelClass: "bg-[#FAFBFF] text-[#696D7A]",
                        cellClass: "text-[#696D7A]",
                        rowClass: "",
                        cells: ["产业洞察 / 自定义产业链", "精准招商 / 企业检索 / 关系图谱", "企业画像 / 风险信息 / 经营动态", "企业分组 / 企业监控 / 进度标注", "企业监控 / 报告中心 / AI 报告联动"],
                      },
                      {
                        label: "适用场景",
                        labelClass: "bg-[#FAFBFF] text-[#696D7A]",
                        cellClass: "text-[#696D7A]",
                        rowClass: "",
                        cells: ["产业规划 / 区域治理", "招商 / 企业服务 / 金融辅助", "招商 / 金融辅助 / 企业服务", "招商 / 企业服务", "区域治理 / 企业服务 / 招商"],
                      },
                    ].map((row, rowIndex, rows) => (
                      <div key={row.label} className="contents">
                        <div className={`flex items-center border-r border-[#E6E7EB] px-5 py-4 ${rowIndex < rows.length - 1 ? "border-b" : ""} ${row.labelClass}`}>
                          <span className="text-xs font-semibold">{row.label}</span>
                        </div>
                        {row.cells.map((cell, cellIndex) => (
                          <div
                            key={`${row.label}-${cell}`}
                            className={`flex items-center border-r border-[#E6E7EB]/40 px-4 py-4 ${cellIndex === row.cells.length - 1 ? "border-r-0" : ""} ${rowIndex < rows.length - 1 ? "border-b" : ""} ${row.rowClass}`}
                          >
                            <p className={`text-[13px] leading-relaxed ${row.cellClass}`}>{cell}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
        </Reveal>

        </div>

          <div className={`${BUSINESS_READ} mt-4`}>
          <Reveal>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                {
                  n: "01",
                  stage: "理解产业",
                  title: "产业链概况",
                  desc: "通过产业洞察和产业链视图，帮助用户看清区域产业结构、优势环节和重点企业分布。",
                  tags: ["产业洞察", "默认产业链", "自定义产业链"],
                  imageLabel: "产业洞察详情 / 产业链图 / 强链补链延链",
                },
                {
                  n: "02",
                  stage: "识别对象",
                  title: "精准招商",
                  desc: "通过企业检索、筛选条件和关系图谱，从产业链中定位目标企业、服务对象或风险对象。",
                  tags: ["精准招商", "企业检索", "关系图谱"],
                  imageLabel: "精准招商 / 企业检索 / 关系图谱截图",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className={`rounded-xl border border-[#E6E7EB] bg-white p-5 ${
                        item.n === "01" || item.n === "02" ? "relative h-[500px] overflow-hidden 2xl:h-[520px]" : ""
                  }`}
                  style={item.n === "01" || item.n === "02" ? { background: SCREEN_CARD_BG } : undefined}
                >
                  <h4 className="text-[24px] font-medium leading-[28px] text-[#1A1C24]">{item.title}</h4>
                  <p className="mb-4 mt-3 text-[16px] font-normal leading-[24px] text-[#696D7A]">{item.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-[#EEF2FF] px-2 py-1 text-[12px] font-normal leading-[14px] text-[#1A42B8]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.n === "01" ? (
                    <div
                      className="relative h-[400px] w-full overflow-visible 2xl:h-[420px]"
                      onMouseMove={(event) => {
                        if (
                          chainPointerRef.current.x === event.clientX &&
                          chainPointerRef.current.y === event.clientY
                        ) {
                          return;
                        }
                        chainPointerRef.current = { x: event.clientX, y: event.clientY };
                        const switchDistance = Math.hypot(
                          event.clientX - chainSwitchPointRef.current.x,
                          event.clientY - chainSwitchPointRef.current.y
                        );
                        if (chainSwitchPointRef.current.x !== -1 && switchDistance < 48) {
                          return;
                        }
                        const target = (event.target as HTMLElement).closest("[data-chain-index]") as HTMLElement | null;
                        const next = Number(target?.dataset.chainIndex);
                        if (!Number.isNaN(next) && chainSlide !== next) {
                          chainSwitchPointRef.current = { x: event.clientX, y: event.clientY };
                          setChainSlide(next);
                        }
                      }}
                      onMouseLeave={() => {
                        chainPointerRef.current = { x: -1, y: -1 };
                        chainSwitchPointRef.current = { x: -1, y: -1 };
                        setChainSlide(0);
                      }}
                    >
                      {chainSlides.map((slide, index) => {
                        const position = (index - chainSlide + chainSlides.length) % chainSlides.length;
                        const isActive = position === 0;
                        const isNext = position === 1;
                        return (
                          <div
                            key={slide.src}
                            data-chain-index={index}
                            className="absolute overflow-hidden rounded-xl border border-[#E6E7EB] bg-white transition-all duration-500 ease-out"
                            style={{
                              top: isActive ? 0 : 16,
                              left: isActive
                                ? "calc(50% - clamp(290px,20.625vw,330px))"
                                : isNext
                                  ? "calc(100% - clamp(520px,36.875vw,590px))"
                                  : 0,
                              width: isActive ? "clamp(580px,41.25vw,660px)" : "clamp(520px,36.875vw,590px)",
                              opacity: isActive ? 1 : 0.5,
                              zIndex: isActive ? 30 : 10,
                              boxShadow: isActive ? SCREEN_STACK_FRONT_SHADOW : SCREEN_STACK_BACK_SHADOW,
                              cursor: isActive ? "default" : "pointer",
                            }}
                          >
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              {...DETAIL_IMAGE_LAZY_PROPS}
                              className="block h-auto w-full object-contain"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : item.n === "02" ? (
                    <div
                      className="relative h-[400px] w-full overflow-visible 2xl:h-[420px]"
                      onMouseMove={(event) => {
                        if (
                          recruitPointerRef.current.x === event.clientX &&
                          recruitPointerRef.current.y === event.clientY
                        ) {
                          return;
                        }
                        recruitPointerRef.current = { x: event.clientX, y: event.clientY };
                        const target = (event.target as HTMLElement).closest("[data-recruit-id]") as HTMLElement | null;
                        const next = target?.dataset.recruitId as "detail" | "relation" | undefined;
                        if (next && recruitFront !== next) setRecruitFront(next);
                      }}
                      onMouseLeave={() => {
                        recruitPointerRef.current = { x: -1, y: -1 };
                        setRecruitFront("detail");
                      }}
                    >
                      {recruitSlides.map((slide) => {
                        const isFront = recruitFront === slide.id;
                        const isRelation = slide.id === "relation";
                        return (
                          <div
                            key={slide.id}
                            data-recruit-id={slide.id}
                            className="absolute overflow-hidden rounded-xl border border-[#E6E7EB] bg-white transition-all duration-500 ease-out"
                            style={{
                              top: isFront ? 0 : 16,
	                              left: isFront && slide.id === "detail" ? 0 : isFront ? "calc(50% - clamp(290px,20.625vw,330px))" : isRelation ? "calc(100% - clamp(520px,36.875vw,590px))" : 0,
	                              width: isFront ? "clamp(580px,41.25vw,660px)" : "clamp(520px,36.875vw,590px)",
                              opacity: isFront ? 1 : 0.5,
                              zIndex: isFront ? 30 : 10,
                              boxShadow: isFront ? SCREEN_STACK_FRONT_SHADOW : SCREEN_STACK_BACK_SHADOW,
                              cursor: isRelation && !isFront ? "pointer" : "default",
                            }}
                          >
                            <img
                              src={slide.src}
                              alt={slide.alt}
                              {...DETAIL_IMAGE_LAZY_PROPS}
                              className="block h-auto w-full object-contain"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-[#E6E7EB] bg-[#F5F5F7]">
                      {item.image ? (
                        <img src={item.image} alt={item.imageAlt} {...DETAIL_IMAGE_LAZY_PROPS} className="block h-[220px] w-full object-cover object-top" />
                      ) : (
                        <Placeholder size="md" ratio="16 / 8" label={item.imageLabel} />
                      )}
                    </div>
                  )}
                  {(item.n === "01" || item.n === "02") && (
                    <div
	                      className="pointer-events-none absolute -bottom-px -left-5 -right-5 z-40 h-24 md:-left-6 md:-right-6"
                      style={{
                        background: SCREEN_BOTTOM_FADE,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  n: "03",
                  stage: "判断价值",
                  title: "企业信息",
                  desc: "整合工商、风险、融资、经营动态等信息，辅助判断企业价值。",
                  tags: ["企业形象", "风险信息", "经营动态"],
                  image: "images/optimized/qixin-business-info-1600.jpg",
                  imageAlt: "企业工商信息截图",
                  imageLabel: "企业信息截图",
                },
                {
                  n: "04",
                  stage: "沉淀任务",
                  title: "企业监控",
                  desc: "把一次性筛选结果沉淀为可分组、可监控、可持续跟进的工作名单。",
                  tags: ["企业分组", "企业监控", "进度标注"],
                  image: "images/optimized/qixin-monitor-1600.jpg",
                  imageAlt: "企业监控截图",
                  imageLabel: "企业分组与进度标注截图",
                },
                {
                  n: "05",
                  stage: "持续监测",
                  title: "企业及产业报告中心",
                  desc: "将企业动态和产业变化转化为后续研判、监测反馈和报告输出。",
                  tags: ["企业监控", "报告中心", "AI 报告联动"],
                  image: "images/optimized/qixin-report-center-1600.jpg",
                  imageAlt: "企业及产业报告中心截图",
                  imageLabel: "企业监控 / 报告中心 / AI 报告联动截图",
                },
              ].map((item) => (
                <div
                  key={item.n}
	                  className={`rounded-xl border border-[#E6E7EB] bg-white p-5 ${
                        item.n === "03" || item.n === "04" || item.n === "05" ? "relative h-[390px] overflow-hidden 2xl:h-[410px]" : ""
                  }`}
                  style={item.n === "03" || item.n === "04" || item.n === "05" ? { background: SCREEN_CARD_BG } : undefined}
                >
                  <h4 className="text-[24px] font-medium leading-[28px] text-[#1A1C24]">{item.title}</h4>
                  <p className={`${item.n === "03" || item.n === "04" || item.n === "05" ? "max-w-[760px] leading-[20px]" : "leading-[24px]"} mt-3 text-[16px] font-normal text-[#696D7A]`}>
                    {item.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`bg-[#E5EBFF] text-[12px] font-normal leading-[16px] text-[#1A42B8] ${
                          item.n === "03" || item.n === "04" || item.n === "05" ? "rounded-full px-2 py-0.5" : "rounded-md px-2 py-1"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(item.n === "03" || item.n === "04" || item.n === "05") && item.image ? (
                    <>
                      <div
                        className="group relative mt-3 overflow-hidden rounded-[12px] border border-[#E6E7EB] shadow-[0_12px_28px_rgba(26,28,36,0.08)]"
                        data-zoom
                        data-zoom-src={item.image}
                      >
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          draggable={false}
                          {...DETAIL_IMAGE_LAZY_PROPS}
                          className="block h-auto w-full max-w-none select-none object-contain object-top"
                        />
                        <div className="pointer-events-none absolute inset-0 hidden rounded-[12px] ring-1 ring-inset ring-transparent transition group-hover:ring-[#A8BEFF]/70 md:block" />
                      </div>
                      <div
	                        className="pointer-events-none absolute -bottom-px -left-5 -right-5 z-30 h-20 md:-left-6 md:-right-6"
                        style={{
                          background: item.n === "05" ? SCREEN_REPORT_BOTTOM_FADE : SCREEN_BOTTOM_FADE,
                        }}
                      />
                    </>
                  ) : (
                    <div className="mt-4 overflow-hidden rounded-lg border border-[#E6E7EB] bg-[#F5F5F7]">
                      {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        {...DETAIL_IMAGE_LAZY_PROPS}
                        className="block h-[160px] w-full object-cover object-top"
                      />
                      ) : (
                        <Placeholder size="sm" ratio="16 / 10" label={item.imageLabel} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="qx05" className="relative px-6 py-20 sm:px-10 md:py-28 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto max-w-[1680px]">
          <Reveal>
          <div className="mb-10 text-center md:mb-12">
            <h2 className="mx-auto max-w-4xl tracking-tight text-[#1A1C24]" style={T.h2}>
              从功能入口到任务起点
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[#696D7A]" style={T.h2Sub}>
              用户进入系统后不应该先想我要点哪个菜单，而是第一眼就能看到自己关心的信息，直接开始工作。
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.94fr_1.1fr] lg:items-start xl:gap-10">
            <div className="overflow-hidden rounded-[24px] border border-[#E6E7EB] bg-[#FAFBFF]">
              <img
                src="images/optimized/qixin-entry-1600.jpg"
                alt="启信产业大脑首页工作台截图"
                {...DETAIL_IMAGE_LAZY_PROPS}
                className="block h-auto w-full object-contain object-top"
              />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(230,231,235,0),rgba(203,205,212,0.9)_50%,rgba(230,231,235,0))] lg:block" />
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(203,205,212,0.9)_50%,rgba(230,231,235,0))] lg:block" />
              <div className="grid lg:grid-cols-2">
                {[
                  {
                    title: "报告入口",
                    desc: "企业分析报告和产业分析报告前置到首页，用户不用进菜单就能直接生成或查看最近报告。",
                    label: "首页功能图占位",
                  },
                  {
                    title: "快讯与舆情入口",
                    desc: "将快讯、融资动态和舆情信息前置到首页，帮助用户在进入业务分析前先感知市场变化和企业风险信号。",
                    label: "报告入口图占位",
                  },
                  {
                    title: "业务信息速览",
                    desc: "地区概览、产业信息、异动预警和企业推荐等内容前置，帮助用户先判断再深入。",
                    label: "业务速览图占位",
                  },
                  {
                    title: "高频功能工作台",
                    desc: "将常用功能和榜单入口集中暴露，让用户更快进入查询、筛选和跟进任务。",
                    label: "常用功能图占位",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="px-6 pb-6 md:px-7 md:pb-7"
                  >
                    <div
                      className={`rounded-[24px] ${
                        index === 2
                          ? "overflow-visible bg-transparent"
                          : "overflow-hidden border border-[#E6E7EB] bg-white"
                      }`}
                    >
                      {index === 0 ? (
                        <div className="relative aspect-[16/11] overflow-hidden bg-white">
                          <div className="absolute -left-[11%] top-[12%] h-[54%] w-[34%] rounded-[12px] border border-[#E6E7EB] bg-white/70 opacity-65">
                            <div className="absolute left-4 top-4 h-2 w-14 rounded-full bg-[#E5EBFF]" />
                            <div className="absolute left-4 right-5 top-10 h-px bg-[#E6E7EB]" />
                            <div className="absolute left-4 top-14 h-1.5 w-20 rounded-full bg-[#E6E7EB]" />
                            <div className="absolute left-4 top-[74px] h-1.5 w-14 rounded-full bg-[#E6E7EB]" />
                          </div>
                          <div className="absolute -right-[11%] top-[8%] h-[50%] w-[33%] rounded-[12px] border border-[#E6E7EB] bg-white/75 opacity-65">
                            <div className="absolute left-4 top-4 h-2 w-10 rounded-full bg-[#EEF2FF]" />
                            <div className="absolute right-4 top-4 size-2 rounded-full bg-[#A8BEFF]" />
                            <div className="absolute left-4 right-5 top-10 h-px bg-[#E6E7EB]" />
                            <div className="absolute left-4 top-14 h-1.5 w-16 rounded-full bg-[#E6E7EB]" />
                            <div className="absolute left-4 top-[74px] h-1.5 w-20 rounded-full bg-[#E6E7EB]" />
                          </div>
                          <div className="absolute left-[29%] right-[29%] top-[58%] h-px bg-[linear-gradient(90deg,rgba(168,190,255,0),rgba(168,190,255,0.55),rgba(168,190,255,0))]" />
                          <div className="absolute left-[49%] top-[calc(58%-3px)] size-1.5 rounded-full bg-[#A8BEFF]/70" />
                          <img
                            src="images/启信产业大脑/企业报告.svg"
                            alt="企业报告封面"
                            {...DETAIL_IMAGE_LAZY_PROPS}
                            className="absolute left-[28%] top-[31%] h-[74%] -translate-x-1/2 object-contain"
                          />
                          <img
                            src="images/启信产业大脑/产业报告.svg"
                            alt="产业报告封面"
                            {...DETAIL_IMAGE_LAZY_PROPS}
                            className="absolute left-[72%] top-[31%] h-[74%] -translate-x-1/2 object-contain"
                          />
                          <div
                            className="pointer-events-none absolute -left-5 -right-5 bottom-0 z-30 h-20 md:-left-6 md:-right-6"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(248,250,255,0), rgba(248,250,255,0.95))",
                            }}
                          />
                        </div>
                      ) : index === 1 ? (
                        <div className="relative aspect-[16/11] overflow-hidden bg-white">
                          <div className="pointer-events-none absolute inset-x-[7%] top-[8%] z-0 h-[32%] overflow-hidden">
                            <div className="absolute left-0 right-0 top-[36%] h-px bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(230,231,235,0.86)_18%,rgba(230,231,235,0.86)_82%,rgba(230,231,235,0))]" />
                            <div className="absolute left-[17%] top-[calc(36%-4px)] size-2 rounded-full border border-[#A8BEFF]/60 bg-white" />
                            <div className="absolute left-[49%] top-[calc(36%-4px)] size-2 rounded-full border border-[#A8BEFF]/50 bg-white" />
                            <div className="absolute left-[81%] top-[calc(36%-4px)] size-2 rounded-full border border-[#A8BEFF]/60 bg-white" />
                            <div className="absolute left-[10%] top-[6%] h-[34px] w-[24%] rounded-[12px] border border-[#E6E7EB]/70 bg-white/72 px-3 py-2">
                              <div className="h-1.5 w-10 rounded-full bg-[#EEF2FF]" />
                              <div className="mt-1.5 h-1 w-14 rounded-full bg-[#F5F5F7]" />
                            </div>
                            <div className="absolute right-[10%] top-[6%] h-[34px] w-[24%] rounded-[12px] border border-[#E6E7EB]/70 bg-white/72 px-3 py-2">
                              <div className="h-1.5 w-12 rounded-full bg-[#F5F5F7]" />
                              <div className="mt-1.5 h-1 w-9 rounded-full bg-[#EEF2FF]" />
                            </div>
                            <div className="absolute left-[43%] top-[2%] flex gap-1.5 rounded-full border border-[#E6E7EB]/70 bg-white/80 px-2.5 py-1">
                              <span className="size-1.5 rounded-full bg-[#A8BEFF]/70" />
                              <span className="size-1.5 rounded-full bg-[#E6E7EB]" />
                              <span className="size-1.5 rounded-full bg-[#E6E7EB]" />
                            </div>
                            <div className="absolute left-[43%] top-[55%] h-1.5 w-8 rounded-full bg-[#EEF2FF]/80" />
                            <div className="absolute left-[54%] top-[55%] h-1.5 w-5 rounded-full bg-[#F5F5F7]" />
                          </div>
                          <img
                            src="images/启信产业大脑/舆情速递.png"
                            alt="舆情速递"
                            {...DETAIL_IMAGE_LAZY_PROPS}
                            className="absolute left-1/2 top-[24%] z-10 block h-auto w-[94%] max-w-none -translate-x-1/2 rounded-[12px] border border-[#E6E7EB] object-contain object-top"
                            style={{
                              boxShadow:
                                "0 12px 26px rgba(34,88,244,0.06), 0 4px 10px rgba(15,20,25,0.04)",
                            }}
                          />
                          <div
                            className="pointer-events-none absolute -left-5 -right-5 bottom-0 z-30 h-16"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(250,251,255,0), rgba(250,251,255,0.95))",
                            }}
                          />
                        </div>
                      ) : index === 2 ? (
                        <div className="relative aspect-[16/11] overflow-visible rounded-[24px]">
                          <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-[#E6E7EB] bg-white">
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[12%] z-0">
                              <div className="absolute left-[4%] top-[8%] h-[28%] w-[27%] rounded-[18px] border border-[#EEF2FF] bg-[linear-gradient(180deg,rgba(245,247,255,0.92),rgba(255,255,255,0.42))]" />
                              <div className="absolute right-[5%] top-[10%] h-[18%] w-[24%] rounded-[16px] border border-[#F0F1F4] bg-[linear-gradient(180deg,rgba(250,251,255,0.95),rgba(255,255,255,0.58))]" />
                              <div className="absolute right-[7%] bottom-[10%] h-[16%] w-[22%] rounded-[16px] border border-[#F0F1F4] bg-[linear-gradient(180deg,rgba(250,251,255,0.95),rgba(255,255,255,0.58))]" />
                              <div className="absolute left-[4%] right-[4%] top-[24%] h-px bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(230,231,235,0.88)_18%,rgba(230,231,235,0.88)_82%,rgba(230,231,235,0))]" />
                              <div className="absolute left-[6%] right-[6%] top-[48%] h-px bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(230,231,235,0.72)_20%,rgba(230,231,235,0.72)_80%,rgba(230,231,235,0))]" />
                              <div className="absolute left-[8%] right-[8%] top-[72%] h-px bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(230,231,235,0.6)_20%,rgba(230,231,235,0.6)_80%,rgba(230,231,235,0))]" />
                              <div className="absolute left-[49.5%] bottom-[14%] top-[16%] w-px bg-[linear-gradient(180deg,rgba(168,190,255,0),rgba(168,190,255,0.48)_24%,rgba(168,190,255,0.48)_76%,rgba(168,190,255,0))]" />
                              <div className="absolute left-[23%] top-[30%] h-px w-[31%] rotate-[12deg] bg-[linear-gradient(90deg,rgba(168,190,255,0),rgba(168,190,255,0.42),rgba(168,190,255,0))]" />
                              <div className="absolute left-[46%] top-[54%] h-px w-[28%] rotate-[-10deg] bg-[linear-gradient(90deg,rgba(168,190,255,0),rgba(168,190,255,0.34),rgba(168,190,255,0))]" />
                              <div className="absolute left-[48.7%] top-[23%] size-2 rounded-full border border-[#A8BEFF]/70 bg-white" />
                              <div className="absolute left-[48.7%] top-[47%] size-2 rounded-full border border-[#A8BEFF]/55 bg-white" />
                              <div className="absolute left-[48.7%] top-[71%] size-2 rounded-full border border-[#A8BEFF]/55 bg-white" />
                              <div className="absolute left-[22.2%] top-[29.2%] size-1.5 rounded-full bg-[#A8BEFF]/50" />
                              <div className="absolute left-[72%] top-[51.5%] size-1.5 rounded-full bg-[#A8BEFF]/42" />
                              <div className="absolute left-[12%] top-[36%] grid grid-cols-4 gap-1 opacity-70">
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#A8BEFF]/55" />
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#E6E7EB]" />
                                <span className="size-1 rounded-full bg-[#A8BEFF]/45" />
                              </div>
                              <div className="absolute right-[14%] top-[34%] flex gap-1.5 opacity-75">
                                <span className="h-1.5 w-6 rounded-full bg-[#F5F5F7]" />
                                <span className="h-1.5 w-10 rounded-full bg-[#EEF2FF]" />
                              </div>
                              <div className="absolute right-[16%] bottom-[26%] flex gap-1.5 opacity-75">
                                <span className="h-1.5 w-8 rounded-full bg-[#EEF2FF]" />
                                <span className="h-1.5 w-5 rounded-full bg-[#F5F5F7]" />
                              </div>
                              <div className="absolute left-[7%] top-[16%] h-2 w-16 rounded-full bg-[#F5F5F7]" />
                              <div className="absolute right-[9%] top-[16%] h-2 w-12 rounded-full bg-[#EEF2FF]" />
                              <div className="absolute right-[12%] bottom-[12%] h-2 w-14 rounded-full bg-[#F5F5F7]" />
                            </div>
                            <div
                              className="absolute left-[51%] top-[5%] z-10 w-[47%] overflow-hidden rounded-[12px] border border-[#E6E7EB] bg-white"
                              style={{
                                boxShadow:
                                  "0 12px 26px rgba(34,88,244,0.06), 0 4px 10px rgba(15,20,25,0.04)",
                              }}
                            >
                              <img
                                src="images/启信产业大脑/异动预警.png"
                                alt="异动预警"
                                {...DETAIL_IMAGE_LAZY_PROPS}
                                className="block h-auto w-full object-contain object-top"
                              />
                            </div>
                            <div
                              className="absolute left-[51%] top-[56%] z-10 w-[47%] overflow-hidden rounded-[12px] border border-[#E6E7EB] bg-white"
                              style={{
                                boxShadow:
                                  "0 12px 26px rgba(34,88,244,0.06), 0 4px 10px rgba(15,20,25,0.04)",
                              }}
                            >
                              <img
                                src="images/启信产业大脑/企业监控入口.png"
                                alt="企业监控入口"
                                {...DETAIL_IMAGE_LAZY_PROPS}
                                className="block h-auto w-full object-contain object-top"
                              />
                            </div>
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 rounded-b-[24px]"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(250,251,255,0), rgba(250,251,255,0.95))",
                              }}
                            />
                          </div>
                          <div
                            className="absolute -left-[5%] top-[13%] z-40 w-[50%] overflow-hidden rounded-[14px] border border-[#E6E7EB] bg-white"
                            style={{
                              boxShadow:
                                "0 12px 26px rgba(34,88,244,0.06), 0 4px 10px rgba(15,20,25,0.04)",
                            }}
                          >
                            <img
                              src="images/启信产业大脑/产业信息.png"
                              alt="产业信息"
                              {...DETAIL_IMAGE_LAZY_PROPS}
                              className="block h-auto w-full object-contain object-top"
                            />
                          </div>
                        </div>
                      ) : index === 3 ? (
                        <div className="relative aspect-[16/11] overflow-hidden bg-white">
                          <div className="pointer-events-none absolute inset-x-[6%] top-[7%] z-0 h-[30%] overflow-hidden">
                            <div className="absolute -left-[8%] top-[4px] h-[44px] w-[24%] rounded-[12px] border border-[#E6E7EB] bg-white/72" />
                            <div className="absolute -right-[8%] top-[4px] h-[44px] w-[24%] rounded-[12px] border border-[#E6E7EB] bg-white/72" />
                            <div className="absolute inset-x-[10%] top-[14px] h-px bg-[#E6E7EB]" />
                            <div className="absolute inset-x-[18%] top-[54px] h-px bg-[linear-gradient(90deg,rgba(230,231,235,0),rgba(230,231,235,0.82)_20%,rgba(230,231,235,0.82)_80%,rgba(230,231,235,0))]" />
                            <div className="relative z-10 mx-auto grid w-[72%] grid-cols-5 gap-2">
                              {[
                                { bars: ["w-3", "w-4"], fill: "bg-[#EEF2FF]" },
                                { bars: ["w-4", "w-3"], fill: "bg-[#F5F5F7]" },
                                { bars: ["w-3", "w-5"], fill: "bg-[#E5EBFF]" },
                                { bars: ["w-5", "w-3"], fill: "bg-[#F5F5F7]" },
                                { bars: ["w-4", "w-4"], fill: "bg-[#EEF2FF]" },
                              ].map((entry, entryIndex) => (
                                <div key={entryIndex} className="flex h-[44px] flex-col items-center justify-center rounded-[10px] border border-[#E6E7EB] bg-white/92">
                                  <div className={`mb-1.5 size-3 rounded-[4px] ${entry.fill}`} />
                                  <div className={`mb-1 h-1 rounded-full bg-[#E6E7EB] ${entry.bars[0]}`} />
                                  <div className={`h-1 rounded-full bg-[#F0F1F4] ${entry.bars[1]}`} />
                                </div>
                              ))}
                            </div>
                            <div className="absolute left-[27%] top-[51px] size-1.5 rounded-full bg-[#A8BEFF]/45" />
                            <div className="absolute left-[49%] top-[51px] size-1.5 rounded-full bg-[#A8BEFF]/35" />
                            <div className="absolute left-[71%] top-[51px] size-1.5 rounded-full bg-[#A8BEFF]/45" />
                          </div>
                          <div
                            className="absolute inset-x-[5%] top-[30%] z-10 overflow-hidden rounded-[12px] border border-[#E6E7EB] bg-white"
                            style={{
                              boxShadow:
                                "0 12px 26px rgba(34,88,244,0.06), 0 4px 10px rgba(15,20,25,0.04)",
                            }}
                          >
                            <img
                              src="images/启信产业大脑/常用功能.png"
                              alt="常用功能"
                              {...DETAIL_IMAGE_LAZY_PROPS}
                              className="block h-auto w-full object-contain object-top"
                            />
                          </div>
                          <div
                            className="pointer-events-none absolute -left-5 -right-5 bottom-0 z-30 h-16"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(250,251,255,0), rgba(250,251,255,0.95))",
                            }}
                          />
                        </div>
                      ) : (
                        <Placeholder size="md" ratio="16 / 11" label={item.label} />
                      )}
                    </div>
                    <div className="mt-4">
                      <div
                        className="mb-2 text-[#1A1C24]"
                        style={{ fontSize: 16, lineHeight: "20px", fontWeight: 500 }}
                      >
                        {item.title}
                      </div>
                      <p
                        className="text-[#696D7A]"
                        style={{ fontSize: 14, lineHeight: "22px", fontWeight: 400 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </section>

      <section id="qx06" className={`relative py-20 md:py-28 ${SECTION_PAD}`}>
        <div className="mx-auto max-w-[1680px]">
          <Reveal>
          <div className="text-center mb-10">
            <h2 className="tracking-tight text-[#1A1C24] leading-[1.12]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700 }}>
              企业数据能力底座
            </h2>
            <p className="mt-4 max-w-[760px] mx-auto" style={{ fontSize: 16, lineHeight: 1.7, color: "#696D7A" }}>
              复杂业务判断的前提，是先把企业找准、关系看清、名单处理干净。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 min-[1280px]:mx-auto min-[1280px]:w-[1152px] min-[1280px]:grid-cols-[512px_620px] min-[1280px]:items-stretch min-[1440px]:w-[1248px] min-[1440px]:grid-cols-[560px_668px] min-[1536px]:w-[1280px] min-[1536px]:grid-cols-[576px_684px] min-[1680px]:w-[1424px] min-[1680px]:grid-cols-[640px_764px] min-[1904px]:w-[1648px] min-[1904px]:grid-cols-[768px_860px] min-[1936px]:w-[1680px] min-[1936px]:grid-cols-[784px_876px]">
            <div className="relative overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] ring-1 ring-[#E6E7EB]">
              <img
                src="images/optimized/qixin-search-1600.jpg"
                alt="高级搜索筛选企业截图"
                {...DETAIL_IMAGE_LAZY_PROPS}
                className="block h-auto w-full rounded-2xl object-contain object-top ring-1 ring-[#E6E7EB]"
              />
              <div className="pt-4">
                <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-[#696D7A]">
                  01 · 定位企业
                </div>
                <div className="mb-3 flex items-start gap-3">
                  <h3 className="flex-1" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "#1A1C24" }}>多条件收敛目标企业池</h3>
                  <span
                    className="mt-1 inline-flex size-4 shrink-0 items-center justify-center"
                    style={{ color: ICON_GRAY }}
                  >
                    <Search className="size-4" />
                  </span>
                </div>
                <p className="max-w-[600px]" style={{ fontSize: 16, lineHeight: "28px", color: "#4E525E" }}>
                  通过地区、行业、资本背景、经营状态、机构类型等条件，把海量企业数据转化为可操作的目标范围。
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["地区范围", "行业产业", "资本状态", "经营状态", "机构类型"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex h-7 items-center rounded-full px-3 ring-1"
                      style={{
                        ["--tw-ring-color" as string]: ICON_BORDER,
                        background: "rgba(229,235,255,0.6)",
                        color: ICON_BLUE,
                        fontSize: 13,
                        lineHeight: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 min-[1280px]:h-full min-[1280px]:grid-rows-2">
              {[
                {
                  icon: Network,
                  index: "02",
                  eyebrow: "扩展关系",
                  title: "从企业扩展上下游关系",
                  desc: "围绕供应商、客户和产业链关系，帮助用户从单个企业继续发现招商线索。",
                  image: "images/optimized/qixin-supply-chain-1600.jpg",
                  alt: "供应链招商企业列表截图",
                  tags: ["供应商", "客户数", "产业筛选"],
                },
                {
                  icon: Table2,
                  index: "03",
                  eyebrow: "批量分析",
                  title: "把外部名单转成分析资产",
                  desc: "支持上传企业名单并选择指标，批量补全企业信息，为监控、分析和报告生成提供结构化输入。",
                  image: "images/optimized/qixin-batch-query-1600.jpg",
                  alt: "批量查询选择指标截图",
                  tags: ["名单上传", "指标选择", "信息补全"],
                },
              ].map((item) => (
                <div key={item.title} className="relative min-h-0 overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] ring-1 ring-[#E6E7EB] min-[1280px]:h-full">
                  <div className="grid gap-4 min-[1280px]:h-full min-[1280px]:grid-cols-[332px_240px] min-[1280px]:items-start min-[1440px]:grid-cols-[368px_252px] min-[1536px]:grid-cols-[376px_260px] min-[1680px]:grid-cols-[412px_304px] min-[1904px]:grid-cols-[476px_336px] min-[1936px]:grid-cols-[484px_344px]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      {...DETAIL_IMAGE_LAZY_PROPS}
                      className="block h-auto w-full rounded-2xl object-contain object-top ring-1 ring-[#E6E7EB]"
                    />
                    <div className="flex flex-col pt-3 min-[1280px]:h-[208px] min-[1280px]:pt-0 min-[1440px]:h-[230px] min-[1536px]:h-[235px] min-[1680px]:h-[258px] min-[1904px]:h-[298px] min-[1936px]:h-[303px]">
                      <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-[#696D7A]">
                        {item.index} · {item.eyebrow}
                      </div>
                      <div className="mt-4 min-[1280px]:mb-8 min-[1280px]:mt-auto">
                        <div className="mb-4 flex items-start gap-3">
                          <h3 className="flex-1" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "#1A1C24" }}>{item.title}</h3>
                          <span
                            className="mt-1 inline-flex size-4 shrink-0 items-center justify-center"
                            style={{ color: ICON_GRAY }}
                          >
                            <item.icon className="size-4" />
                          </span>
                        </div>
                        <p style={{ fontSize: 16, lineHeight: "28px", color: "#4E525E" }}>{item.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex h-7 items-center rounded-full px-3 ring-1"
                              style={{
                                ["--tw-ring-color" as string]: ICON_BORDER,
                                background: "rgba(229,235,255,0.6)",
                                color: ICON_BLUE,
                                fontSize: 13,
                                lineHeight: "16px",
                                fontWeight: 500,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </Reveal>
        </div>
      </section>

      <section id="qx07" className={`relative py-20 md:py-28 ${SECTION_PAD} overflow-hidden`}>
        <AccentBlob side="left" />
        <div className={`relative ${BUSINESS_READ}`}>
          <Reveal>
            <div className="mx-auto mb-10 max-w-[880px] text-center">
              <h2 className="tracking-tight text-[#1A1C24] leading-[1.12]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700 }}>
                让产业分析适配本地口径
              </h2>
              <p className="mt-4 text-[#696D7A]" style={{ fontSize: 16, lineHeight: 1.72 }}>
                标准产业链无法覆盖每个地方政府的真实招商口径，因此系统需要让用户把本地产业理解沉淀为可编辑、可授权、可复用的产业图谱。
              </p>
            </div>

            <div className="grid items-stretch gap-5 md:auto-rows-fr md:grid-cols-2 lg:gap-6">
              <article className="h-full overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] ring-1 ring-[#E6E7EB]">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(26,28,36,0.07)] ring-1 ring-[#E6E7EB]">
                  <img
                    src="images/optimized/qixin-custom-chain-edit01-1600.jpg"
                    alt="自定义产业链图谱编辑界面"
                    {...DETAIL_IMAGE_LAZY_PROPS}
                    className="block h-full w-full object-contain object-top"
                  />
                </div>
                <div className="px-1 pt-5">
                  <div className="mb-3 flex items-start gap-4">
                    <h3 className="flex-1" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "#1A1C24" }}>在一张图谱里维护上中下游关系</h3>
                    <span
                      className="ml-auto mt-1 inline-flex size-4 shrink-0 items-center justify-center"
                      style={{ color: ICON_GRAY }}
                    >
                      <GitBranch className="size-4" />
                    </span>
                  </div>
                  <p className="max-w-[760px]" style={{ fontSize: 16, lineHeight: "28px", color: "#4E525E" }}>
                    用户可以直接在图谱上增删和调整产业链节点，不用在列表和图谱之间来回切换。每个节点支持编辑、移动和设置企业范围，让产业关系的维护像操作地图一样直观。
                  </p>
                </div>
              </article>

              <article className="h-full overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] ring-1 ring-[#E6E7EB]">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(26,28,36,0.07)] ring-1 ring-[#E6E7EB]">
                  <img
                    src="images/optimized/qixin-custom-chain-list-1600.jpg"
                    alt="自定义产业链列表管理界面"
                    {...DETAIL_IMAGE_LAZY_PROPS}
                    className="block h-full w-full object-contain object-top"
                  />
                </div>
                <div className="px-1 pt-5">
                  <div className="mb-3 flex items-start gap-4">
                    <h3 className="flex-1" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "#1A1C24" }}>管理多条本地产业链资产</h3>
                    <span
                      className="ml-auto mt-1 inline-flex size-4 shrink-0 items-center justify-center"
                      style={{ color: ICON_GRAY }}
                    >
                      <Layers3 className="size-4" />
                    </span>
                  </div>
                  <p style={{ fontSize: 16, lineHeight: "28px", color: "#4E525E" }}>
                    每条产业链都有独立的分组、链主、创建人和企业统计，让自定义产业链从一次性配置变成可持续维护的业务资产。谁建的、管哪个领域、覆盖了多少企业，一目了然。
                  </p>
                </div>
              </article>

              {[
                {
                  icon: Settings2,
                  title: "为产业节点补充企业范围",
                  desc: "每个节点既能批量导入已有企业名单，也能从平台数据中继续筛选补充。两种方式共享同一个企业池，避免手动维护两份名单的重复工作。",
                  image: "images/optimized/qixin-custom-chain-edit02-1600.jpg",
                  alt: "自定义产业链添加企业菜单界面",
                },
                {
                  icon: Map,
                  title: "在编辑态校准节点关系",
                  desc: "调整节点关系时只高亮当前层级，让用户在复杂图谱中不会被无关信息干扰。编辑完成后恢复完整视图，所见即所得。",
                  image: "images/optimized/qixin-custom-chain-edit03-1600.jpg",
                  alt: "自定义产业链节点关系编辑界面",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="h-full overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,20,25,0.04)] ring-1 ring-[#E6E7EB]"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(26,28,36,0.07)] ring-1 ring-[#E6E7EB]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      {...DETAIL_IMAGE_LAZY_PROPS}
                      className="block h-full w-full object-contain object-top"
                    />
                  </div>
                  <div className="px-1 pt-5">
                    <div className="mb-3 flex items-start gap-4">
                      <h3 className="flex-1" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700, color: "#1A1C24" }}>{item.title}</h3>
                      <span
                        className="ml-auto mt-1 inline-flex size-4 shrink-0 items-center justify-center"
                        style={{ color: ICON_GRAY }}
                      >
                        <item.icon className="size-4" />
                      </span>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: "28px", color: "#4E525E" }}>{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="qx08" className={`relative py-20 md:py-28 ${SECTION_PAD} bg-[#FAFBFF]`}>
        <div className={BUSINESS_READ}>
          <Reveal>
            <div className="mb-12 flex flex-col items-center text-center md:mb-16">
              <h2 className="max-w-4xl tracking-tight text-[#1A1C24]" style={T.h2}>
                用可复用规则代替反复判断
              </h2>
              <p className="mt-4 max-w-3xl" style={T.h2Sub}>
                随着模块持续扩展，组件库的作用不只是让界面保持一致，更在于每次新增功能时不用重新决定颜色、间距和交互状态。
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(360px,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
              <article className="h-full min-w-0 rounded-[28px] border bg-white p-6 shadow-[0_1px_2px_rgba(15,20,25,0.04)] md:p-8" style={{ borderColor: "#E6E7EB" }}>
                <h3 className="text-[#1A1C24]" style={{ fontSize: 24, lineHeight: "32px", fontWeight: 700 }}>
                  把反复判断沉淀为共同标准
                </h3>
                <p className="mt-5" style={T.body}>
                  我主导协同组内设计师从 0 到 1 建设组件库与标品规范，把颜色、字号、间距、状态、表格、筛选和侧边栏这些高频判断收束成可复用规则。
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["140 个颜色样式", "24 个文本样式", "11 大色系", "5 层结构"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border px-3 py-1.5"
                      style={{
                        borderColor: "rgba(168,190,255,0.65)",
                        background: "rgba(229,235,255,0.42)",
                        color: ICON_BLUE,
                        fontSize: 13,
                        lineHeight: 1.25,
                        fontWeight: 600,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    ["页面与框架", "定义统一的页面尺寸、留白和布局层级，让不同模块在同一套框架下自然对齐，而不是各自为政。"],
                    ["组件与状态", "把按钮、筛选、表格、弹窗等高频组件抽象为可复用单元，新增页面时直接组合，不用每次重新画。"],
                    ["协作与交付", "设计和研发共用同一套命名、状态和组件规则，减少沟通成本，后续迭代不用回滚调整基础样式。"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-2xl border border-[#E6E7EB] bg-[#FAFBFF] p-4">
                      <div className="text-[#1A1C24]" style={{ fontSize: 15, lineHeight: "22px", fontWeight: 700 }}>
                        {title}
                      </div>
                      <p className="mt-1" style={{ fontSize: 14, lineHeight: "24px", color: "#4E525E" }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid min-w-0 gap-4 md:grid-cols-6 lg:self-start lg:content-start">
                {SYSTEM_LAYER_CARDS.map((item, index) => (
                  <article
                    key={item.title}
                    className={`min-h-[278px] overflow-hidden rounded-[24px] border bg-white shadow-[0_1px_2px_rgba(15,20,25,0.04)] ${
                      index < 3 ? "md:col-span-2" : "md:col-span-3"
                    }`}
                    style={{ borderColor: "#E6E7EB" }}
                  >
                    <div className="relative h-[196px] overflow-hidden border-b border-[#E6E7EB] bg-[#FAFBFF]">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(203,205,212,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(203,205,212,0.18) 1px, transparent 1px)",
                          backgroundPosition: "-1px -1px",
                          backgroundSize: "8px 8px",
                        }}
                      />
                      <SystemLayerCardIllustration index={index} />
                    </div>
                    <div className="p-4 pt-4">
                      <h3 className="text-[#1A1C24]" style={{ fontSize: 16, lineHeight: "22px", fontWeight: 700 }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[#696D7A]" style={{ fontSize: 13, lineHeight: "21px", fontWeight: 500 }}>
                        {item.desc}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <FoundationRulesPreview />
              <KeyComponentStatesPreview />
            </div>
        </Reveal>
        </div>
      </section>

      <section id="qx10" className={`relative py-20 md:py-28 ${SECTION_PAD} bg-[#FAFBFF]`}>
        <div className={READ}>
          <Reveal>
          <div className="text-center mb-12">
            <h2 className="tracking-tight text-[#1A1C24] leading-[1.12]" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700 }}>
              从模块设计到平台治理
            </h2>
            <p className="mt-4 text-[#696D7A] max-w-[880px] mx-auto" style={T.bodyMuted}>
              从核心模块设计到平台架构、设计系统和跨系统联动，贯穿 2021 到 2026 年的持续迭代。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Workflow, title: "平台信息架构能力", desc: "把产业洞察、精准招商、企业画像等模块组织为统一可导航的平台结构。" },
              { icon: ClipboardList, title: "多场景任务拆解能力", desc: "从招商、产业服务、企业服务等五类场景中抽象共同的用户任务链路。" },
              { icon: Search, title: "核心业务模块设计能力", desc: "持续迭代首页、产业洞察、精准招商、企业画像、报告中心和企业监控。" },
              { icon: Boxes, title: "组件库与规范建设能力", desc: "主导 DGG 组件库与标品规范从 0 到 1 建设，协同组内设计师推进。" },
              { icon: Link2, title: "跨系统联动设计能力", desc: "将产业大脑的企业分组与 AI 报告的关联企业能力打通，形成数据闭环。" },
              { icon: GitBranch, title: "长期产品演进能力", desc: "从 2021 到 2026 持续跟进迭代，在功能持续增长中保持体验不失控。" },
            ].map((item) => <Card key={item.title} {...item} />)}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#CBCDD4]">
            <button onClick={onBack} className="group inline-flex items-center gap-3 text-sm text-[#696D7A] hover:text-[#1A1C24] transition-colors">
              <span className="inline-flex size-4 items-center justify-center text-[#CBCDD4] transition-colors">
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
          </div>
        </Reveal>
        </div>
      </section>

      <Footer />
      </>
    </div>
  );
}
