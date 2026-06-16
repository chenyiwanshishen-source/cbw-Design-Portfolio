export function Footer() {
  return (
    <footer className="relative py-10 md:py-12 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 border-t border-[#E6E7EB] mt-12">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#2258F4] text-xs text-white">
            陈
          </span>
          <div>
            <div className="text-sm text-[#1A1C24]">陈俊学 · UI产品设计师</div>
            <div className="text-xs text-[#696D7A]">
              专注 B 端复杂系统 · 数据可视化 · AI 产品设计
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#696D7A]">
          <span>© 2026 上海</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#2258F4] animate-pulse" />
            正在寻找新机会
          </span>
        </div>
      </div>
    </footer>
  );
}
