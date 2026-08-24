import { ArrowLeft, ArrowRight } from "lucide-react";

interface CaseItem {
  title: string;
  href: string;
  tag?: string;
  subLabel: string;
}

const CASES: Record<string, { prev: CaseItem; next: CaseItem }> = {
  "ai-report": {
    prev: { title: "返回首页", href: "", tag: "首页", subLabel: "← 返回首页" },
    next: { title: "启信产业大脑", href: "#/project/qixin-brain", tag: "B端 SaaS", subLabel: "下一个案例 →" },
  },
  "qixin-brain": {
    prev: { title: "AI 报告生成", href: "#/project/ai-report", tag: "AI Agent", subLabel: "← 上一个案例" },
    next: { title: "AI 探索", href: "#/project/explorations", tag: "前沿验证", subLabel: "下一个案例 →" },
  },
  explorations: {
    prev: { title: "启信产业大脑", href: "#/project/qixin-brain", tag: "B端 SaaS", subLabel: "← 上一个案例" },
    next: { title: "关于我", href: "#about", tag: "个人介绍", subLabel: "下一站 · 关于我 →" },
  },
};

export function ProjectCaseNav({
  currentCase,
}: {
  currentCase: "ai-report" | "qixin-brain" | "explorations";
}) {
  const { prev, next } = CASES[currentCase];

  const handleNavigate = (href: string) => {
    window.location.hash = href;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="案例切换导航" className="w-full py-6 sm:py-8 select-none">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-5">
        {/* 上一步 / 上一个案例 */}
        <a
          href={prev.href ? prev.href : "#"}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(prev.href);
          }}
          className="group relative flex flex-1 max-w-[400px] items-center gap-3.5 rounded-[8px] border border-[#DED9CE] bg-[#FFFEF8] p-4 sm:p-4.5 text-left shadow-[0_2px_6px_rgba(28,36,52,0.06),0_8px_18px_rgba(28,36,52,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#85A3FF] hover:shadow-[0_6px_16px_rgba(34,88,244,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85A3FF]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, rgba(132,137,146,0.12) 28px)",
            transform: "rotate(-0.6deg)",
          }}
        >
          {/* Hand-drawn Left Arrow Button */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#DED9CE] bg-white text-[#4E525E] shadow-sm transition-all duration-200 group-hover:border-[#85A3FF] group-hover:bg-[#EEF4FF] group-hover:text-[#2258F4] group-hover:-translate-x-0.5">
            <ArrowLeft className="size-4.5 stroke-[2.2]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8C93A3]">
              <span>{prev.subLabel}</span>
              {prev.tag && (
                <span className="rounded bg-[#F0F2F6] px-1.5 py-0.2 text-[10.5px] font-medium text-[#696D7A]">
                  {prev.tag}
                </span>
              )}
            </div>
            <div className="mt-0.5 truncate text-[16px] font-bold text-[#1A1C24] transition-colors group-hover:text-[#2258F4]">
              {prev.title}
            </div>
          </div>
        </a>

        {/* 下一步 / 下一个案例 */}
        <a
          href={next.href}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(next.href);
          }}
          className="group relative flex flex-1 max-w-[400px] items-center justify-between gap-3.5 rounded-[8px] border border-[#DED9CE] bg-[#FFFEF8] p-4 sm:p-4.5 text-right shadow-[0_2px_6px_rgba(28,36,52,0.06),0_8px_18px_rgba(28,36,52,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#85A3FF] hover:shadow-[0_6px_16px_rgba(34,88,244,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85A3FF]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 27px, rgba(132,137,146,0.12) 28px)",
            transform: "rotate(0.6deg)",
          }}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-end gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8C93A3]">
              {next.tag && (
                <span className="rounded bg-[#F0F2F6] px-1.5 py-0.2 text-[10.5px] font-medium text-[#696D7A]">
                  {next.tag}
                </span>
              )}
              <span>{next.subLabel}</span>
            </div>
            <div className="mt-0.5 truncate text-[16px] font-bold text-[#1A1C24] transition-colors group-hover:text-[#2258F4]">
              {next.title}
            </div>
          </div>

          {/* Hand-drawn Right Arrow Button */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#DED9CE] bg-white text-[#4E525E] shadow-sm transition-all duration-200 group-hover:border-[#85A3FF] group-hover:bg-[#EEF4FF] group-hover:text-[#2258F4] group-hover:translate-x-0.5">
            <ArrowRight className="size-4.5 stroke-[2.2]" />
          </div>
        </a>
      </div>
    </nav>
  );
}
