export function Ruler({ onReplay }: { onReplay?: () => void }) {
  return <div className="flex flex-wrap items-center justify-between gap-x-3 border-t border-border py-2 font-mono text-label">
    <span aria-hidden="true" className="text-text-meta">00 · 02 · 04 · 06 · 08 · 10 · 12 · 14 · 16</span>
    <button type="button" onClick={onReplay} className="home-target text-accent hover:text-accent-hover">↻ 重播开场</button>
  </div>;
}
