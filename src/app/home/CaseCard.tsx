import type { CaseContent } from './content/zh';

export function CaseCard({ item }: { item: CaseContent }) {
  return <article className="grid min-w-0 grid-cols-1 border border-border-subtle bg-surface lg:grid-cols-12" aria-labelledby={`case-${item.id}`}>
    <div className="flex min-w-0 flex-col gap-6 p-6 lg:col-span-5 lg:p-10">
      <p className="font-mono text-label text-accent">{item.meta}</p>
      <h3 id={`case-${item.id}`} className="text-h3 font-bold text-balance">{item.title}</h3>
      <div className="flex flex-col gap-3 text-body text-text-body"><p>{item.context}</p><p>{item.action}</p></div>
      {item.metrics.length > 0 && <dl className="flex flex-wrap gap-8 border-t border-border-subtle pt-4">{item.metrics.map(metric => <div key={metric.label} className="flex flex-col gap-1"><dt className="order-2 text-caption text-text-secondary">{metric.label}</dt><dd className="text-h4 font-bold tabular-nums">{metric.value}</dd></div>)}</dl>}
      {item.progress && <p className="border-t border-border-subtle pt-4 text-body font-medium">{item.progress}</p>}
      <ul aria-label="项目标签" className="flex flex-wrap gap-2">{item.tags.map(tag => <li key={tag} className="border border-border-subtle px-3 py-1 text-micro text-text-secondary">{tag}</li>)}</ul>
      <a href={`#/project/${item.id}`} className="home-target inline-flex items-center self-start text-body font-medium text-accent hover:text-accent-hover" aria-label={`阅读案例：${item.title}`}>阅读案例 →</a>
    </div>
    <div className="surface-tint home-case-visual flex min-w-0 items-center justify-center border-t border-border-subtle p-6 font-mono text-micro text-text-meta lg:col-span-7 lg:border-t-0 lg:border-l lg:p-8">[待替换：裁切截图]</div>
  </article>;
}
