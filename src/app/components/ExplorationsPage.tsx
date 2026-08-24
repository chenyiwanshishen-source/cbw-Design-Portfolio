import { useState, useRef, useLayoutEffect, Fragment, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDashed,
  Layers,
  Palette,
  Component,
  Boxes,
  GitBranch,
  Link as LinkIcon,
  Monitor,
  Tablet,
  Smartphone,
  Sliders,
  Code2,
  MousePointer2,
  FileCode,
  Sparkles,
  ChevronRight,
  Eye,
  CornerDownRight,
} from "lucide-react";
import { ProjectCaseNav } from "./ProjectCaseNav";

// ============================================================================
// 1. DESIGN TOKENS
// ============================================================================
const INK = "#1A1C24";
const INK_MUTED = "#696D7A";
const INK_DIM = "#4E525E";
const SECTION_PAD = "px-6 sm:px-10 lg:px-12 xl:px-16";

const T = {
  h1: { fontSize: "clamp(34px, 4.6vw, 48px)", lineHeight: 1.18, fontWeight: 700 },
  heroSub: { fontSize: "clamp(16px, 1.6vw, 18px)", lineHeight: 1.65, fontWeight: 400, color: INK_MUTED },
  h2: { fontSize: "clamp(24px, 2.6vw, 30px)", lineHeight: 1.25, fontWeight: 700 },
  h2Sub: { fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, fontWeight: 400, color: INK_MUTED },
  body: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.75, fontWeight: 400, color: INK_MUTED },
  bodyMuted: { fontSize: "clamp(15px, 1.35vw, 16px)", lineHeight: 1.7, fontWeight: 400, color: INK_DIM },
  cardTitle: { fontSize: "20px", lineHeight: 1.35, fontWeight: 600, color: INK },
  cardDesc: { fontSize: "15px", lineHeight: 1.6, fontWeight: 400, color: INK_MUTED },
};

// ============================================================================
// 2. HELPER COMPONENTS
// ============================================================================

function StatusTag({ tone }: { tone: "done" | "wip" }) {
  const style =
    tone === "done"
      ? { color: "#1A42B8", background: "#E5EBFF", borderColor: "#85A3FF" }
      : { color: "#4E525E", background: "#F5F5F7", borderColor: "#E6E7EB" };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold tracking-[0.06em]"
      style={style}
    >
      <span className="size-1.5 rounded-full" style={{ background: "currentColor" }} />
      {tone === "done" ? "1.0 · 已打包 VSIX" : "验证中"}
    </span>
  );
}

function SectionHeader({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const center = align === "center";
  const hasSubtitle = Boolean(subtitle && subtitle.trim().length > 0);
  return (
    <div className={`mb-8 md:mb-10 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <h2 className={`tracking-tight text-neutral-900 ${hasSubtitle ? "mb-3" : "mb-0"} max-w-4xl`} style={T.h2}>
        {title}
      </h2>
      {hasSubtitle && (
        <p className="max-w-3xl" style={T.h2Sub}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function PromptSourcePaperHoles({ count = 13 }: { count?: number }) {
  return (
    <span className="experience-paper-hole-strip" aria-hidden="true">
      {Array.from({ length: count }, (_, hole) => (
        <i key={hole} />
      ))}
    </span>
  );
}

function HandDrawnTapeTag({
  text,
  variant = "blue",
  rotate = -1.2,
  className = "",
}: {
  text: string;
  variant?: "blue" | "amber" | "yellow";
  rotate?: number;
  className?: string;
}) {
  const isAmber = variant === "amber" || variant === "yellow";
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[3px] border px-3.5 py-1 text-[13.5px] font-bold shadow-[0_1px_3px_rgba(44,59,91,0.12)] ${className}`}
      style={{
        backgroundColor: isAmber ? "#FFF9DF" : "#EEF4FF",
        borderColor: isAmber ? "#EAD7A8" : "#C8D4FF",
        color: isAmber ? "#8A5A12" : "#1A42B8",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {text}
    </div>
  );
}

// ============================================================================
// 2.5 INTERACTIVE PLUGIN DEMO COMPONENT
// ============================================================================

interface PluginDemoElement {
  id: string;
  name: string;
  tag: string;
  component: string;
  sourceFile: string;
  sourceLine: number;
  sourceCol: number;
  classList: string[];
  styles: Record<string, string>;
  boxModel: {
    margin: string;
    padding: string;
    size: string;
  };
}

const PLUGIN_DEMO_ELEMENTS: Record<string, PluginDemoElement> = {
  "btn-primary": {
    id: "btn-primary",
    name: "button: Primary",
    tag: "button",
    component: "HeroSection",
    sourceFile: "src/components/Hero.tsx",
    sourceLine: 22,
    sourceCol: 7,
    classList: ["px-6", "py-3", "bg-blue-600", "hover:bg-blue-500", "text-white", "font-semibold", "rounded-xl", "shadow-lg"],
    styles: {
      padding: "12px 24px",
      backgroundColor: "#2563EB",
      borderRadius: "12px",
      color: "#FFFFFF",
      fontWeight: "600",
    },
    boxModel: {
      margin: "0 12px 0 0",
      padding: "12px 24px",
      size: "148 × 44 px",
    },
  },
  "hero-heading": {
    id: "hero-heading",
    name: "h2: Title",
    tag: "h2",
    component: "HeroSection",
    sourceFile: "src/components/Hero.tsx",
    sourceLine: 17,
    sourceCol: 5,
    classList: ["text-2xl", "sm:text-3xl", "font-extrabold", "text-white", "tracking-tight"],
    styles: {
      fontSize: "28px",
      lineHeight: "1.25",
      fontWeight: "800",
      color: "#FFFFFF",
    },
    boxModel: {
      margin: "0 0 12px 0",
      padding: "0px",
      size: "100% × 36 px",
    },
  },
  "hero-card": {
    id: "hero-card",
    name: "HeroSection Container",
    tag: "div",
    component: "HeroSection",
    sourceFile: "src/components/Hero.tsx",
    sourceLine: 14,
    sourceCol: 3,
    classList: ["p-6", "sm:p-8", "bg-slate-900/90", "border", "border-slate-800", "rounded-2xl", "shadow-2xl"],
    styles: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "#1E293B",
      borderRadius: "16px",
      padding: "28px",
    },
    boxModel: {
      margin: "16px auto",
      padding: "28px",
      size: "100% × 290 px",
    },
  },
  "header-nav": {
    id: "header-nav",
    name: "Header Bar",
    tag: "header",
    component: "Header",
    sourceFile: "src/components/Header.tsx",
    sourceLine: 5,
    sourceCol: 3,
    classList: ["px-6", "py-3.5", "bg-slate-900", "border-b", "border-slate-800", "flex", "items-center", "justify-between"],
    styles: {
      backgroundColor: "#0F172A",
      borderBottom: "1px solid #1E293B",
      padding: "14px 24px",
    },
    boxModel: {
      margin: "0",
      padding: "14px 24px",
      size: "100% × 54 px",
    },
  },
  "btn-secondary": {
    id: "btn-secondary",
    name: "button: Secondary",
    tag: "button",
    component: "HeroSection",
    sourceFile: "src/components/Hero.tsx",
    sourceLine: 23,
    sourceCol: 7,
    classList: ["px-5", "py-3", "bg-slate-800", "hover:bg-slate-700", "text-slate-200", "font-semibold", "rounded-xl", "border", "border-slate-700"],
    styles: {
      padding: "12px 20px",
      backgroundColor: "#1E293B",
      borderColor: "#334155",
      color: "#E2E8F0",
    },
    boxModel: {
      margin: "0",
      padding: "12px 20px",
      size: "136 × 44 px",
    },
  },
  "footer-card": {
    id: "footer-card",
    name: "FooterSection Container",
    tag: "footer",
    component: "FooterSection",
    sourceFile: "src/components/Footer.tsx",
    sourceLine: 31,
    sourceCol: 3,
    classList: ["flex", "items-center", "justify-between", "bg-slate-900/80", "border-t", "border-slate-800", "px-5", "py-3.5"],
    styles: {
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      borderTop: "1px solid #1E293B",
      padding: "14px 20px",
    },
    boxModel: {
      margin: "0",
      padding: "14px 20px",
      size: "100% × 46 px",
    },
  },
};

// 固定设计宽度:demo 内部始终按此宽度渲染,再按外层容器宽度等比缩放
const PLUGIN_DEMO_DESIGN_WIDTH = 1280;

function ScaledDemoContainer({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const nextScale = Math.min(1, outer.clientWidth / PLUGIN_DEMO_DESIGN_WIDTH);
      setScale((prev) => (Math.abs(prev - nextScale) > 0.002 ? nextScale : prev));
      setInnerHeight(inner.offsetHeight);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="w-full">
      <div style={{ height: innerHeight === null ? undefined : innerHeight * scale }}>
        <div
          ref={innerRef}
          style={{
            width: PLUGIN_DEMO_DESIGN_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function PluginEditorDemo() {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedId, setSelectedId] = useState<string>("btn-primary");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activePropertyTab, setActivePropertyTab] = useState<"tailwind" | "box" | "ast">("tailwind");
  const [astFeedback, setAstFeedback] = useState<string | null>(null);

  const selectedElement = PLUGIN_DEMO_ELEMENTS[selectedId] || PLUGIN_DEMO_ELEMENTS["btn-primary"];

  const handleClassClick = (cls: string) => {
    setAstFeedback(`⚡ Recast AST: 成功修改属性 "${cls}" 写回源码`);
    setTimeout(() => setAstFeedback(null), 2400);
  };

  return (
    <ScaledDemoContainer>
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 font-sans text-slate-100 shadow-[0_12px_36px_rgba(15,23,42,0.22)]">
      {/* 1. IDE Top Title Bar */}
      <div className="flex h-11 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 text-xs select-none">
        <div className="flex items-center gap-3">
          {/* Mac Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-[#EF4444]/90" />
            <span className="size-3 rounded-full bg-[#F59E0B]/90" />
            <span className="size-3 rounded-full bg-[#10B981]/90" />
          </div>
          <span className="h-3.5 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Code2 className="size-3.5 text-blue-400" />
            <span>Codex Visual Editor</span>
            <span className="rounded bg-blue-950/80 px-1.5 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800/60">
              v1.0.0 (VSIX)
            </span>
          </div>
        </div>

        {/* Live WebSocket Bridge Status */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-xs">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            WebSocket 已连接 :8080
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400">AST 无损写回模式</span>
        </div>
      </div>

      {/* 2. Responsive Viewport Controls Bar (切尺寸) */}
      <div className="flex h-10 items-center justify-between border-b border-slate-800/90 bg-slate-900/50 px-4 text-xs select-none">
        {/* Preset Buttons */}
        <div className="flex items-center gap-1 rounded-md border border-slate-800 bg-slate-950 p-0.5">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              viewport === "desktop"
                ? "bg-blue-600 font-semibold text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Monitor className="size-3.5" />
            <span>Desktop</span>
            <span className="font-mono text-[10px] opacity-75">1280px</span>
          </button>

          <button
            type="button"
            onClick={() => setViewport("tablet")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              viewport === "tablet"
                ? "bg-blue-600 font-semibold text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Tablet className="size-3.5" />
            <span>Tablet</span>
            <span className="font-mono text-[10px] opacity-75">768px</span>
          </button>

          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-colors ${
              viewport === "mobile"
                ? "bg-blue-600 font-semibold text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Smartphone className="size-3.5" />
            <span>Mobile</span>
            <span className="font-mono text-[10px] opacity-75">375px</span>
          </button>
        </div>

        {/* Viewport Info */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span className="inline text-slate-500">
            断点: <strong className="text-slate-300 font-normal">{viewport === "desktop" ? "xl: (≥1280px)" : viewport === "tablet" ? "md: (≥768px)" : "base (<640px)"}</strong>
          </span>
          <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800 text-slate-300">
            {viewport === "desktop" ? "1280 × 720" : viewport === "tablet" ? "768 × 1024" : "375 × 667"} px
          </span>
        </div>
      </div>

      {/* 3. Main Editor Work Area: Left Layer Tree + Center Canvas + Right Property Inspector */}
      <div className="grid grid-cols-[210px_minmax(0,1fr)_310px] min-h-[640px]">
        {/* LEFT: Component Layer Tree */}
        <div className="flex flex-col border-r border-slate-800 bg-slate-900/40 p-3 select-none">
          <div className="mb-2 flex items-center justify-between px-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            <span className="flex items-center gap-1.5">
              <Layers className="size-3 text-blue-400" />
              组件图层树
            </span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {/* App Node */}
            <div className="flex items-center gap-1.5 rounded px-2 py-1 text-slate-400">
              <Boxes className="size-3 text-purple-400" />
              <span>App</span>
            </div>

            {/* Header Node */}
            <button
              type="button"
              onClick={() => setSelectedId("header-nav")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-4 ${
                selectedId === "header-nav"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Component className="size-3 text-emerald-400" />
              <span>Header</span>
            </button>

            {/* Hero Section */}
            <button
              type="button"
              onClick={() => setSelectedId("hero-card")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-4 ${
                selectedId === "hero-card"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Component className="size-3 text-emerald-400" />
              <span>HeroSection</span>
            </button>

            {/* Children of Hero */}
            <button
              type="button"
              onClick={() => setSelectedId("hero-heading")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-7 ${
                selectedId === "hero-heading"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <span className="text-slate-600">↳</span>
              <span>h2: Title</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedId("btn-primary")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-7 ${
                selectedId === "btn-primary"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <span className="text-slate-600">↳</span>
              <span>button: Primary</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedId("btn-secondary")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-7 ${
                selectedId === "btn-secondary"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <span className="text-slate-600">↳</span>
              <span>button: Secondary</span>
            </button>

            {/* Footer Section */}
            <button
              type="button"
              onClick={() => setSelectedId("footer-card")}
              className={`w-full flex items-center gap-1.5 rounded px-2 py-1 text-left transition-colors pl-4 ${
                selectedId === "footer-card"
                  ? "bg-blue-600/30 text-blue-200 font-semibold border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Component className="size-3 text-emerald-400" />
              <span>FooterSection</span>
            </button>
          </div>

          <div className="mt-auto border-t border-slate-800/80 pt-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <MousePointer2 className="size-3 text-blue-400" />
              点击画布或图层进行选中
            </span>
          </div>
        </div>

        {/* CENTER: Interactive Canvas Viewport (选元素 & 切尺寸展示) */}
        <div className="flex flex-col items-center justify-center overflow-auto bg-slate-950/80 p-6">
          <div
            className={`w-full transition-all duration-300 ease-out ${
              viewport === "desktop"
                ? "max-w-full"
                : viewport === "tablet"
                ? "max-w-[480px]"
                : "max-w-[320px]"
            }`}
          >
            {/* Canvas App Screen */}
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#0B1120] text-slate-100 shadow-xl">
              {/* Rendered Header */}
              <div
                onClick={() => setSelectedId("header-nav")}
                onMouseEnter={() => setHoveredId("header-nav")}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-3 cursor-pointer transition-all ${
                  selectedId === "header-nav"
                    ? "ring-2 ring-[#3B82F6] ring-offset-1 ring-offset-slate-950 z-20"
                    : hoveredId === "header-nav"
                    ? "outline outline-1 outline-blue-400/50"
                    : ""
                }`}
              >
                {selectedId === "header-nav" && (
                  <span className="absolute -top-3 left-2 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                    header · L5:C3
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <div className="size-5 rounded bg-blue-600/80 flex items-center justify-center font-bold text-[11px]">
                    C
                  </div>
                  <span className="font-bold text-xs tracking-tight text-white">Codex Studio</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">Docs</span>
                  <span className="rounded bg-blue-600 px-2 py-0.5 font-medium text-white">Preview</span>
                </div>
              </div>

              {/* Rendered Hero Section Card */}
              <div className="p-7">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId("hero-card");
                  }}
                  onMouseEnter={() => setHoveredId("hero-card")}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative rounded-xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg space-y-4 cursor-pointer transition-all ${
                    selectedId === "hero-card"
                      ? "ring-2 ring-[#3B82F6] ring-offset-1 ring-offset-slate-950 z-10"
                      : hoveredId === "hero-card"
                      ? "outline outline-1 outline-blue-400/50"
                      : ""
                  }`}
                >
                  {selectedId === "hero-card" && (
                    <span className="absolute -top-3 left-2 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                      HeroSection · L14:C3
                    </span>
                  )}

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-800/60 bg-blue-950/80 px-2.5 py-0.5 text-[11px] font-medium text-blue-300">
                    <Sparkles className="size-3" />
                    <span>可视化 AST 引擎激活中</span>
                  </div>

                  {/* Heading */}
                  <h3
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId("hero-heading");
                    }}
                    onMouseEnter={() => setHoveredId("hero-heading")}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative font-extrabold tracking-tight text-white cursor-pointer transition-all ${
                      viewport === "mobile" ? "text-lg" : "text-2xl"
                    } ${
                      selectedId === "hero-heading"
                        ? "ring-2 ring-[#3B82F6] rounded px-1 -mx-1 bg-blue-500/10 z-20"
                        : hoveredId === "hero-heading"
                        ? "outline outline-1 outline-blue-400/50"
                        : ""
                    }`}
                  >
                    {selectedId === "hero-heading" && (
                      <span className="absolute -top-3.5 left-0 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                        h2 · L17:C5
                      </span>
                    )}
                    可视化修改代码与 AST 写回
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-300">
                    在画布中选中组件直接调整间距与样式，右侧属性面板实时映射，修改结果通过 AST 无损写回源码。
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId("btn-primary");
                      }}
                      onMouseEnter={() => setHoveredId("btn-primary")}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`relative rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                        selectedId === "btn-primary"
                          ? "ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-slate-900 z-20"
                          : hoveredId === "btn-primary"
                          ? "outline outline-1 outline-blue-400"
                          : ""
                      }`}
                    >
                      {selectedId === "btn-primary" && (
                        <span className="absolute -top-3.5 left-0 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                          button · L22:C7
                        </span>
                      )}
                      快速定位修改
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId("btn-secondary");
                      }}
                      onMouseEnter={() => setHoveredId("btn-secondary")}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`relative rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-all active:scale-95 cursor-pointer ${
                        selectedId === "btn-secondary"
                          ? "ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-slate-900 z-20"
                          : hoveredId === "btn-secondary"
                          ? "outline outline-1 outline-blue-400"
                          : ""
                      }`}
                    >
                      {selectedId === "btn-secondary" && (
                        <span className="absolute -top-3.5 left-0 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                          button · L23:C7
                        </span>
                      )}
                      查看 AST 差异
                    </button>
                  </div>
                </div>
              </div>

              {/* Rendered Footer */}
              <div
                onClick={() => setSelectedId("footer-card")}
                onMouseEnter={() => setHoveredId("footer-card")}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative flex items-center justify-between border-t border-slate-800 bg-slate-900/80 px-5 py-3.5 cursor-pointer transition-all ${
                  selectedId === "footer-card"
                    ? "ring-2 ring-[#3B82F6] ring-offset-1 ring-offset-slate-950 z-20"
                    : hoveredId === "footer-card"
                    ? "outline outline-1 outline-blue-400/50"
                    : ""
                }`}
              >
                {selectedId === "footer-card" && (
                  <span className="absolute -top-3 left-2 z-30 rounded bg-blue-600 px-1.5 py-0.2 text-[10px] font-mono font-bold text-white shadow">
                    footer · L31:C3
                  </span>
                )}
                <span className="text-[11px] text-slate-400">© 2026 Codex Studio</span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>文档</span>
                  <span>组件库</span>
                  <span className="text-blue-400">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Property Inspector Panel (右边对应的映射元素属性) */}
        <div className="border-l border-slate-800 bg-slate-900/60 p-4 select-none flex flex-col justify-between">
          <div>
            {/* Element Header */}
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-blue-300">
                  <Sliders className="size-3.5 text-blue-400" />
                  属性映射面板
                </span>
                <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800/50">
                  {selectedElement.tag}
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                <FileCode className="size-3 text-slate-500" />
                <span className="text-slate-300 font-semibold">{selectedElement.sourceFile}</span>
                <span className="text-amber-400">:{selectedElement.sourceLine}:{selectedElement.sourceCol}</span>
              </div>
            </div>

            {/* Property Tabs */}
            <div className="mt-3 flex rounded border border-slate-800 bg-slate-950 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setActivePropertyTab("tailwind")}
                className={`flex-1 rounded py-1 font-medium transition-colors ${
                  activePropertyTab === "tailwind"
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Tailwind 类名
              </button>
              <button
                type="button"
                onClick={() => setActivePropertyTab("box")}
                className={`flex-1 rounded py-1 font-medium transition-colors ${
                  activePropertyTab === "box"
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                盒模型 (Box)
              </button>
              <button
                type="button"
                onClick={() => setActivePropertyTab("ast")}
                className={`flex-1 rounded py-1 font-medium transition-colors ${
                  activePropertyTab === "ast"
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                AST 映射
              </button>
            </div>

            {/* Tab Contents */}
            {activePropertyTab === "tailwind" && (
              <div className="mt-3 space-y-2">
                <div className="text-[11px] font-medium text-slate-400">
                  当前组件 ClassList（点击可触发 AST 写回）：
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedElement.classList.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => handleClassClick(cls)}
                      className="group flex items-center gap-1 rounded bg-slate-800/90 border border-slate-700/80 px-2 py-1 text-[11px] font-mono text-slate-200 hover:border-blue-500 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
                      title="点击模拟修改并写回源码"
                    >
                      <span>{cls}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activePropertyTab === "box" && (
              <div className="mt-3 text-center">
                {/* Visual Box Model Diagram */}
                <div className="rounded border border-amber-500/40 bg-amber-500/5 p-2 text-[10px] font-mono text-amber-300">
                  <div className="text-[9px] text-amber-400/80 uppercase">margin: {selectedElement.boxModel.margin}</div>
                  <div className="my-1.5 rounded border border-blue-500/40 bg-blue-500/10 p-2 text-blue-300">
                    <div className="text-[9px] text-blue-400/80 uppercase">padding: {selectedElement.boxModel.padding}</div>
                    <div className="my-1 rounded border border-emerald-500/50 bg-emerald-500/20 py-2 font-bold text-white">
                      {selectedElement.boxModel.size}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePropertyTab === "ast" && (
              <div className="mt-3 space-y-2 text-xs font-mono">
                <div className="rounded border border-slate-800 bg-slate-950 p-2.5 text-[11px] space-y-1.5 text-slate-300">
                  <div className="text-slate-500">// Babel AST Location</div>
                  <div><span className="text-blue-400">Node:</span> JSXElement</div>
                  <div><span className="text-blue-400">Target:</span> {selectedElement.name}</div>
                  <div><span className="text-blue-400">Loc:</span> {selectedElement.sourceLine}:{selectedElement.sourceCol}</div>
                  <div className="text-emerald-400 text-[10px] pt-1">✓ Recast 无损写回就绪</div>
                </div>
              </div>
            )}
          </div>

          {/* AST Feedback Banner */}
          <div className="mt-4 border-t border-slate-800/80 pt-3">
            {astFeedback ? (
              <div className="rounded border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-1.5 text-[11px] font-mono text-emerald-300 animate-fade-in">
                {astFeedback}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="size-1.5 rounded-full bg-blue-400" />
                <span>精确修改单个属性，不消耗 AI token</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. IDE Bottom Status Bar */}
      <div className="flex h-8 items-center justify-between border-t border-slate-800 bg-slate-900/90 px-4 text-[10px] font-mono text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-blue-400">
            <GitBranch className="size-3" />
            main*
          </span>
          <span className="text-slate-400">{selectedElement.sourceFile}</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="size-3" />
            AST 写回就绪
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln {selectedElement.sourceLine}, Col {selectedElement.sourceCol}</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span className="text-slate-400">TypeScript React</span>
        </div>
      </div>
    </div>
    </ScaledDemoContainer>
  );
}

// ============================================================================
// 3. MAIN EXPLORATIONS COMPONENT
// ============================================================================

export function ExplorationsPage({ onBack: _onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"plugin" | "workflow">("plugin");

  const handleSelectTab = (tab: "plugin" | "workflow") => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="relative min-h-screen bg-[#FAFBFF] text-[#1A1C24]">
      {/* Main Two-Column Layout (1400px) */}
      <div className={`mx-auto w-full max-w-[1400px] ${SECTION_PAD} pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-56`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">

          {/* ================================================================= */}
          {/* LEFT: Project Index Sidebar (Sticky on lg)                       */}
          {/* ================================================================= */}
          <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-[310px] xl:w-[330px]">
            <div className="border-b border-[#E6E7EB] pb-6 lg:border-none lg:pb-0">
              <h1 className="text-[28px] font-bold tracking-tight text-[#1A1C24] sm:text-[32px]">
                AI 探索
              </h1>

              {/* Project Cards List */}
              <div className="mt-8 flex flex-col gap-8 sm:flex-row lg:flex-col">
                {/* Project Card 1: Plugin */}
                <button
                  type="button"
                  onClick={() => handleSelectTab("plugin")}
                  className={`group relative flex flex-1 flex-col rounded-[8px] border p-6 pt-8 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85A3FF] hover:-translate-y-1 hover:rotate-0 ${
                    activeTab === "plugin"
                      ? "shadow-[0_4px_10px_rgba(28,36,52,0.08),0_14px_30px_rgba(28,36,52,0.08)] z-10"
                      : "shadow-[0_2px_4px_rgba(28,36,52,0.06),0_10px_22px_rgba(28,36,52,0.04)] opacity-85 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: "#FFFEF8",
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.14) 32px)",
                    borderColor: "#DED9CE",
                    transform: activeTab === "plugin" ? "rotate(0deg)" : "rotate(-0.8deg)",
                  }}
                >
                  {/* Hand-drawn organic sketch border when active */}
                  {activeTab === "plugin" && (
                    <svg
                      className="pointer-events-none absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-visible"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M 2.5,3 C 35,1.5 68,2.2 97.5,3.2 C 98.2,35 97.4,68 97.2,96.8 C 65,97.6 32,96.5 2.8,96.5 C 2,65 2.6,33 2.5,3 Z"
                        stroke="#85A3FF"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.92}
                      />
                    </svg>
                  )}

                  {/* Mini Sticky Note Tab: 1.0 · 已打包 */}
                  <HandDrawnTapeTag
                    text="1.0 · 已打包"
                    variant="blue"
                    rotate={-1.5}
                    className="absolute -top-3.5 left-5 z-20"
                  />

                  <div className="relative z-10">
                    <h2 className="relative inline-block text-[18px] font-bold tracking-tight text-[#1A1C24]">
                      <span className="relative z-10">前端代码可视化编辑插件</span>
                      {activeTab === "plugin" && (
                        <span
                          className="absolute -bottom-0.5 -left-1 -right-1 h-3 -rotate-1 rounded-[2px] bg-[#E2ECFF]/90 -z-0"
                          aria-hidden="true"
                        />
                      )}
                    </h2>
                    <p className="mt-2.5 text-[14px] leading-[1.7] text-[#4E525E]">
                      在画布中修改组件样式，通过 AST 写回源码，不经过 AI 重新生成。
                    </p>
                  </div>
                </button>

                {/* Project Card 2: Workflow */}
                <button
                  type="button"
                  onClick={() => handleSelectTab("workflow")}
                  className={`group relative flex flex-1 flex-col rounded-[8px] border p-6 pt-8 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85A3FF] hover:-translate-y-1 hover:rotate-0 ${
                    activeTab === "workflow"
                      ? "shadow-[0_4px_10px_rgba(28,36,52,0.08),0_14px_30px_rgba(28,36,52,0.08)] z-10"
                      : "shadow-[0_2px_4px_rgba(28,36,52,0.06),0_10px_22px_rgba(28,36,52,0.04)] opacity-85 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: "#FFFEF9",
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(132,137,146,0.14) 32px)",
                    borderColor: "#DED9CE",
                    transform: activeTab === "workflow" ? "rotate(0deg)" : "rotate(0.8deg)",
                  }}
                >
                  {/* Hand-drawn organic sketch border when active */}
                  {activeTab === "workflow" && (
                    <svg
                      className="pointer-events-none absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-visible"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M 2.5,3 C 35,1.5 68,2.2 97.5,3.2 C 98.2,35 97.4,68 97.2,96.8 C 65,97.6 32,96.5 2.8,96.5 C 2,65 2.6,33 2.5,3 Z"
                        stroke="#85A3FF"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={0.92}
                      />
                    </svg>
                  )}

                  {/* Mini Sticky Note Tab: 验证中 */}
                  <HandDrawnTapeTag
                    text="验证中"
                    variant="amber"
                    rotate={1.2}
                    className="absolute -top-3.5 left-5 z-20"
                  />

                  <div className="relative z-10">
                    <h2 className="relative inline-block text-[18px] font-bold tracking-tight text-[#1A1C24]">
                      <span className="relative z-10">设计组件生成工作流1.0</span>
                      {activeTab === "workflow" && (
                        <span
                          className="absolute -bottom-0.5 -left-1 -right-1 h-3 -rotate-1 rounded-[2px] bg-[#FFF2CF]/90 -z-0"
                          aria-hidden="true"
                        />
                      )}
                    </h2>
                    <p className="mt-2.5 text-[14px] leading-[1.7] text-[#4E525E]">
                      从发现色板到复合组件的四步流程，把建库从手工逐个制作变成流程化生成。
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </aside>

          {/* ================================================================= */}
          {/* RIGHT: Detail View Container (Expands to fill 1400px frame)       */}
          {/* ================================================================= */}
          <main className="min-w-0 flex-1 lg:border-l lg:border-[#E6E7EB] lg:pl-8 xl:pl-10">
            <AnimatePresence mode="wait">
              {activeTab === "plugin" ? (
                <motion.div
                  key="plugin-detail"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-14 lg:space-y-16"
                >
                  {/* HEADER */}
                  <div className="border-b border-[#E6E7EB] pb-8">
                    <h1 className="text-[30px] font-bold tracking-tight text-[#1A1C24] sm:text-[38px]">
                      前端代码可视化编辑插件
                    </h1>

                    <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-[#4E525E] sm:text-[17px]">
                      针对 AI 生成前端代码后样式微调成本高的问题，做了一个 VSCode 插件：在可视化画布中选中组件、修改样式，修改结果通过 AST 写回源码文件，无需 AI 重新生成代码。
                    </p>
                  </div>

                  {/* INTERACTIVE PLUGIN DEMO SHOWCASE */}
                  <section aria-label="插件可视化编辑交互演示" className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#696D7A]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-blue-600" />
                        插件可交互演示（可点击切换尺寸、选择组件查看右侧映射属性）
                      </span>
                    </div>
                    <PluginEditorDemo />
                  </section>

                  {/* S01: 要解决的问题 */}
                  <section id="ex1-s01">
                    <SectionHeader
                      title="AI 提升了生成效率，微调成了新的成本"
                      subtitle="使用 AI 编写前端代码后，新的问题集中在样式微调环节。"
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {/* Note 1 */}
                      <article
                        className="relative min-h-[260px] rounded-[8px] border border-[#DED9CE] p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)]"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                          transform: "rotate(-0.45deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-sm"
                        />
                        <div className="text-[13px] font-semibold tracking-wider text-[#737B8C]">摩擦 01</div>
                        <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-[#35404F]">
                          修改一个属性，重新生成一段代码
                        </h3>
                        <div className="mt-3.5 space-y-2.5 text-[14px] leading-relaxed text-[#696D7A]">
                          <p>
                            <strong className="font-semibold text-[#35404F]">现象：</strong>
                            让 AI 调整间距或颜色时，它会重新输出整段组件代码；输出完成后，还需要人工检查是否影响了其他部分。
                          </p>
                          <p>
                            <strong className="font-semibold text-[#35404F]">原因：</strong>
                            对话式生成的最小修改单位是一段代码，无法只修改单个属性。
                          </p>
                        </div>
                      </article>

                      {/* Note 2 */}
                      <article
                        className="relative min-h-[260px] rounded-[8px] border border-[#DED9CE] p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)]"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                          transform: "rotate(0.35deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E5484D] shadow-sm"
                        />
                        <div className="text-[13px] font-semibold tracking-wider text-[#737B8C]">摩擦 02</div>
                        <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-[#35404F]">
                          预览与编辑分属两个环境
                        </h3>
                        <div className="mt-3.5 space-y-2.5 text-[14px] leading-relaxed text-[#696D7A]">
                          <p>
                            <strong className="font-semibold text-[#35404F]">现象：</strong>
                            在浏览器中发现样式问题后，需要切回编辑器查找对应代码，修改后再切回浏览器验证，一次走查往往要重复多个来回。
                          </p>
                          <p>
                            <strong className="font-semibold text-[#35404F]">原因：</strong>
                            页面渲染在浏览器中，代码在编辑器中，两者的对应关系依赖人工查找。
                          </p>
                        </div>
                      </article>

                      {/* Note 3 */}
                      <article
                        className="relative min-h-[260px] rounded-[8px] border border-[#DED9CE] p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)]"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                          transform: "rotate(-0.25deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A85A16] shadow-sm"
                        />
                        <div className="text-[13px] font-semibold tracking-wider text-[#737B8C]">摩擦 03</div>
                        <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-[#35404F]">
                          手动修改游离于规范之外
                        </h3>
                        <div className="mt-3.5 space-y-2.5 text-[14px] leading-relaxed text-[#696D7A]">
                          <p>
                            <strong className="font-semibold text-[#35404F]">现象：</strong>
                            直接在代码中修改样式时，颜色和间距数值随手输入，未引用项目的 Tailwind 配置和设计 token，长期累积导致页面样式不一致。
                          </p>
                          <p>
                            <strong className="font-semibold text-[#35404F]">原因：</strong>
                            手动编辑缺少从项目已有 token 中选取值的约束入口。
                          </p>
                        </div>
                      </article>
                    </div>
                  </section>

                  {/* S02: 关键决策 (Torn Paper Note) */}
                  <section id="ex1-s03">
                    <SectionHeader title="为什么样式微调不交给 AI" />

                    <article
                      aria-label="关键决策撕纸便签"
                      className="relative overflow-hidden pb-8 pl-16 pr-8 pt-8 transition-transform duration-200 hover:-translate-y-0.5 sm:pl-20 sm:pr-10 sm:pt-9"
                      style={{
                        filter:
                          "drop-shadow(0 2px 4px rgba(28,36,52,0.06)) drop-shadow(0 10px 22px rgba(28,36,52,0.05))",
                        transform: "rotate(-0.6deg)",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 600 240"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                      >
                        <defs>
                          <pattern id="ex1-decision-lines" width="600" height="32" patternUnits="userSpaceOnUse">
                            <rect width="600" height="32" fill="#FFFEF7" />
                            <line x1="0" y1="31" x2="600" y2="31" stroke="#D7E3F1" strokeWidth="1.2" opacity="0.75" />
                          </pattern>
                          <mask id="ex1-decision-torn-mask">
                            <path
                              d="M 30 0 H 600 V 240 H 22 L 28 220 L 10 198 L 26 178 L 12 155 L 27 132 L 8 108 L 24 85 L 11 60 L 26 38 L 12 18 Z"
                              fill="white"
                            />
                          </mask>
                        </defs>
                        <g mask="url(#ex1-decision-torn-mask)">
                          <rect width="600" height="240" fill="url(#ex1-decision-lines)" />
                          <line x1="68" y1="0" x2="68" y2="240" stroke="#D79A9A" strokeWidth="1.4" opacity="0.45" />
                        </g>
                      </svg>

                      <div className="relative z-10">
                        <HandDrawnTapeTag
                          text="关键决策"
                          variant="blue"
                          rotate={-1.2}
                        />

                        <p className="mt-4 text-[16px] leading-[1.85] text-[#252B36]">
                          把间距从 16 调整到 24，是一个确定性操作。交给 AI 执行，相当于引入不确定性：结果可能正确，也可能影响其他部分，同时消耗 token 与等待时间。因此在这个插件中，元素定位和样式修改由 AST 引擎完成，同样的操作始终得到同样的结果；AI 负责另一类任务——生成新组件、理解表述模糊的需求。
                        </p>
                      </div>
                    </article>
                  </section>

                  {/* S03: 进展 */}
                  <section id="ex1-s04">
                    <SectionHeader
                      title="当前进展与规划"
                      subtitle="产品定义、架构决策与质量标准由我制定，编码通过与 AI 编程工具协作完成。"
                    />

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* 已完成: Warm White Loose-leaf Paper */}
                      <article
                        aria-label="已完成"
                        className="relative min-h-[340px] overflow-hidden rounded-[4px] pb-8 pl-14 pr-6 pt-10 shadow-[8px_12px_24px_rgba(62,86,139,0.12),0_2px_0_rgba(255,255,255,0.9)_inset] transition-transform duration-200 hover:-translate-y-1 sm:pl-16 sm:pr-8 sm:pt-11"
                        style={{
                          background:
                            "linear-gradient(to right, transparent 46px, #e7b9bd 46px, #e7b9bd 47px, transparent 47px), repeating-linear-gradient(to bottom, #fffdf7 0 27px, #dce7f5 28px 29px)",
                          transform: "rotate(-1.2deg)",
                        }}
                      >
                        {/* Binder Holes */}
                        <PromptSourcePaperHoles count={13} />

                        {/* Top Sticky Note Tab: 已完成 */}
                        <div className="relative z-10 mb-6">
                          <HandDrawnTapeTag
                            text="已完成"
                            variant="amber"
                            rotate={-1.2}
                          />
                        </div>

                        {/* Content List */}
                        <ul className="relative z-10 space-y-3.5 text-[15px] leading-[1.75] text-[#1A1C24]">
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2258F4]" />
                            <span>画布与后端的 WebSocket 双向通信</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2258F4]" />
                            <span>画布元素选中、拖拽与基础属性修改</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2258F4]" />
                            <span>撤销/重做历史栈</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2258F4]" />
                            <span>VSCode 扩展打包 (VSIX)，本地安装运行</span>
                          </li>
                        </ul>
                      </article>

                      {/* 规划中: Soft Pastel Amber/Cream Loose-leaf Paper (Different Color) */}
                      <article
                        aria-label="规划中"
                        className="relative min-h-[340px] overflow-hidden rounded-[4px] pb-8 pl-14 pr-6 pt-10 shadow-[8px_12px_24px_rgba(62,86,139,0.12),0_2px_0_rgba(255,255,255,0.9)_inset] transition-transform duration-200 hover:-translate-y-1 sm:pl-16 sm:pr-8 sm:pt-11"
                        style={{
                          background:
                            "linear-gradient(to right, transparent 46px, #e7b9bd 46px, #e7b9bd 47px, transparent 47px), repeating-linear-gradient(to bottom, #f7f9ff 0 27px, #cadcff 28px 29px)",
                          transform: "rotate(1.4deg)",
                        }}
                      >
                        {/* Binder Holes */}
                        <PromptSourcePaperHoles count={13} />

                        {/* Top Sticky Note Tab: 规划中 */}
                        <div className="relative z-10 mb-6">
                          <HandDrawnTapeTag
                            text="规划中"
                            variant="blue"
                            rotate={1.2}
                          />
                        </div>

                        {/* Content List */}
                        <ul className="relative z-10 space-y-3.5 text-[15px] leading-[1.75] text-[#4E525E]">
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full border-2 border-[#85A3FF] bg-white" />
                            <span>Babel 源码定位与 Recast AST 无损写回</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full border-2 border-[#85A3FF] bg-white" />
                            <span>GitHub 仓库关联、代码拉取与分支推送</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full border-2 border-[#85A3FF] bg-white" />
                            <span>项目已有 React 组件的导入与维护</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full border-2 border-[#85A3FF] bg-white" />
                            <span>属性面板界面完善</span>
                          </li>
                        </ul>
                      </article>
                    </div>
                  </section>
                </motion.div>
              ) : (
                <motion.div
                  key="workflow-detail"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-16 lg:space-y-20"
                >
                  {/* HEADER */}
                  <div className="border-b border-[#E6E7EB] pb-8">
                    <h1 className="text-[30px] font-bold tracking-tight text-[#1A1C24] sm:text-[38px]">
                      设计组件生成工作流1.0
                    </h1>

                    <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-[#4E525E] sm:text-[17px]">
                      设计一条从品牌色板到可用组件库的生成流程：发现色板、生成全量色板、生成基础组件、组装复合组件。目前在工作流工具中逐步验证，尚未封装为可复用的 skill。
                    </p>

                    <div className="mt-4.5 flex flex-wrap items-center gap-2 text-[15px] sm:text-[16px]">
                      <span className="font-semibold text-[#696D7A]">仓库地址：</span>
                      <a
                        href="https://github.com/chenyiwanshishen-source/figma-design-system-workflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-[#2258F4] transition-colors hover:text-[#1A42B8] hover:underline"
                      >
                        <LinkIcon className="size-4 shrink-0 stroke-[2.2]" />
                        <span>https://github.com/chenyiwanshishen-source/figma-design-system-workflow</span>
                      </a>
                    </div>
                  </div>

                  {/* S01: 要解决的问题 (3 Pinned Paper Notes) */}
                  <section id="ex2-s01">
                    <SectionHeader title="从 0 建一个组件库，慢、难、还不规范" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {/* Note 1 */}
                      <article
                        className="relative min-h-[220px] rounded-[8px] border p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-0"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                          borderColor: "#DED9CE",
                          transform: "rotate(-0.6deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-sm"
                        />
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[13px] font-bold text-[#2258F4]">01</span>
                          <h3 className="text-[17px] font-bold leading-snug text-[#35404F]">周期长</h3>
                        </div>
                        <p className="mt-4 text-[14px] leading-[1.75] text-[#4E525E]">
                          从品牌色板到可用的组件库，色阶扩展、组件变体、状态样式都需要手工逐个制作，周期以周计。
                        </p>
                      </article>

                      {/* Note 2 (Soft light blue paper) */}
                      <article
                        className="relative min-h-[220px] rounded-[8px] border p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-0"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #EEF4FF 0, #EEF4FF 31px, #D8E1FF 32px, #D8E1FF 33px)",
                          borderColor: "#C8D4FF",
                          transform: "rotate(0.45deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E5484D] shadow-sm"
                        />
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[13px] font-bold text-[#2258F4]">02</span>
                          <h3 className="text-[17px] font-bold leading-snug text-[#35404F]">门槛高</h3>
                        </div>
                        <p className="mt-4 text-[14px] leading-[1.75] text-[#4E525E]">
                          小团队和个人通常没有设计工程资源，想要一套规范的组件库，但没有条件从 0 搭建。
                        </p>
                      </article>

                      {/* Note 3 */}
                      <article
                        className="relative min-h-[220px] rounded-[8px] border p-6 shadow-[0_4px_16px_rgba(56,67,92,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-0"
                        style={{
                          background:
                            "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                          borderColor: "#DED9CE",
                          transform: "rotate(-0.35deg)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A78C2] shadow-sm"
                        />
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[13px] font-bold text-[#2258F4]">03</span>
                          <h3 className="text-[17px] font-bold leading-snug text-[#35404F]">直接生成不规范</h3>
                        </div>
                        <p className="mt-4 text-[14px] leading-[1.75] text-[#4E525E]">
                          让 AI 直接生成组件，结果不遵守已有色板和 token，无法直接放进正式的组件库。
                        </p>
                      </article>
                    </div>
                  </section>

                  {/* S02: 工作流设计 (Mini Note Slips Connected with Hand-Drawn Arrow Lines) */}
                  <section id="ex2-s02">
                    <SectionHeader title="四步，上一步的输出是下一步的输入" />

                    <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2 xl:gap-3">
                      {[
                        { num: "01", title: "发现色板", rot: "rotate-[-0.8deg]" },
                        { num: "02", title: "全量色板", rot: "rotate-[0.6deg]" },
                        { num: "03", title: "基础组件", rot: "rotate-[-0.5deg]" },
                        { num: "04", title: "复合组件", rot: "rotate-[0.7deg]" },
                      ].map((step, idx) => (
                        <Fragment key={step.num}>
                          {/* Mini Paper Slip Note */}
                          <div
                            className="relative flex w-full flex-1 items-center gap-3 rounded-[6px] border px-4 py-3.5 shadow-[0_2px_4px_rgba(28,36,52,0.06),0_6px_16px_rgba(28,36,52,0.04)] transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-0 sm:px-5 sm:py-4"
                            style={{
                              background:
                                "repeating-linear-gradient(to bottom, #FFFEF8 0, #FFFEF8 31px, #E8E4D8 32px, #E8E4D8 33px)",
                              borderColor: "#DED9CE",
                              transform: step.rot,
                            }}
                          >
                            <span className="font-mono text-[15px] font-bold text-[#3B66DE]">{step.num}</span>
                            <span className="h-4 w-[1px] bg-[#E8E4D8]" aria-hidden="true" />
                            <h3 className="text-[16px] font-bold tracking-tight text-[#1A1C24] sm:text-[17px]">
                              {step.title}
                            </h3>
                          </div>

                          {/* Hand-drawn Connecting Arrow Line */}
                          {idx < 3 && (
                            <Fragment key={`arrow-${step.num}`}>
                              {/* Desktop Horizontal Arrow */}
                              <div className="hidden shrink-0 items-center justify-center px-1 text-[#85A3FF] lg:flex" aria-hidden="true">
                                <svg className="h-6 w-7 overflow-visible" viewBox="0 0 28 24" fill="none">
                                  <path
                                    d="M 2 12 C 9 9, 17 15, 24 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M 18 7 L 25 12 L 19 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>

                              {/* Mobile Vertical Arrow */}
                              <div className="flex items-center justify-center py-0.5 text-[#85A3FF] lg:hidden" aria-hidden="true">
                                <svg className="h-6 w-6 overflow-visible" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M 12 2 C 10 9, 14 15, 12 20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M 7 16 L 12 21 L 17 16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </Fragment>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </section>

                  {/* S03: 当前状态 (Torn Paper Note) */}
                  <section id="ex2-s04">
                    <SectionHeader title="验证到哪一步了" />

                    <article
                      aria-label="工作流验证状态撕纸便签"
                      className="relative overflow-hidden pb-8 pl-16 pr-8 pt-8 transition-transform duration-200 hover:-translate-y-0.5 sm:pl-20 sm:pr-10 sm:pt-9"
                      style={{
                        filter:
                          "drop-shadow(0 2px 4px rgba(28,36,52,0.06)) drop-shadow(0 10px 22px rgba(28,36,52,0.05))",
                        transform: "rotate(-0.5deg)",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 600 240"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                      >
                        <defs>
                          <pattern id="ex2-status-lines" width="600" height="32" patternUnits="userSpaceOnUse">
                            <rect width="600" height="32" fill="#FFFEF7" />
                            <line x1="0" y1="31" x2="600" y2="31" stroke="#D7E3F1" strokeWidth="1.2" opacity="0.75" />
                          </pattern>
                          <mask id="ex2-status-torn-mask">
                            <path
                              d="M 30 0 H 600 V 240 H 22 L 28 220 L 10 198 L 26 178 L 12 155 L 27 132 L 8 108 L 24 85 L 11 60 L 26 38 L 12 18 Z"
                              fill="white"
                            />
                          </mask>
                        </defs>
                        <g mask="url(#ex2-status-torn-mask)">
                          <rect width="600" height="240" fill="url(#ex2-status-lines)" />
                          <line x1="68" y1="0" x2="68" y2="240" stroke="#D79A9A" strokeWidth="1.4" opacity="0.45" />
                        </g>
                      </svg>

                      <div className="relative z-10">
                        <HandDrawnTapeTag
                          text="验证状态"
                          variant="amber"
                          rotate={-1.2}
                        />

                        <div className="mt-4 space-y-3 text-[16px] leading-[1.85] text-[#252B36]">
                          <p>
                            四步流程目前在工作流工具中逐环节验证：每个环节的输出质量、失败时的处理方式，在进行每个节点的验证，保证流程畅通之后再封装成 skill，目前有版本已经发在 GitHub 上。
                          </p>
                        </div>
                      </div>
                    </article>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>

          </main>
        </div>
      </div>

      {/* Bottom Case Navigation:lg 固定在视口底部,不随内容滚动;移动端在文档流末尾 */}
      <div className="mt-16 border-t border-[#E6E7EB] pt-6 lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-30 lg:mt-0 lg:border-t lg:bg-[#FAFBFF]/95 lg:pb-3 lg:pt-3 lg:backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 xl:px-16">
          <ProjectCaseNav currentCase="explorations" />
        </div>
      </div>
    </div>
  );
}
