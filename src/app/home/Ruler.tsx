export function Ruler({ onReplay }: { onReplay?: () => void }) {
  return <div className="flex justify-end py-2 font-mono text-label">
    <button type="button" onClick={onReplay} className="home-target font-mono text-label font-normal text-accent hover:text-accent-hover">↻ 重播开场</button>
  </div>;
}
