import type { CaseContent } from './content/zh';

export function CaseCard({ item }: { item: CaseContent }) {
  return <article className="home-case" aria-labelledby={`case-${item.id}`}>
    <a href={`#/project/${item.id}`} className="home-case-link grid min-w-0 grid-cols-1 gap-8 py-10 lg:grid-cols-12" aria-label={`阅读案例：${item.name}`}>
      <div className="home-case-copy flex min-w-0 flex-col gap-4 lg:col-span-4">
        <h3 id={`case-${item.id}`} className="text-h3 font-normal text-balance">{item.name}</h3>
        <p className="text-body text-text-body">{item.summary}</p>
        <dl className="flex flex-col gap-3 text-caption text-text-secondary">
          <div><dt className="inline">项目周期 · </dt><dd className="inline">{item.period}</dd></div>
          <div><dt className="inline">我的工作 · </dt><dd className="inline">{item.responsibility}</dd></div>
        </dl>
      </div>
      <div className="home-case-visual flex min-w-0 items-center justify-center p-6 font-mono text-micro text-text-meta lg:col-span-8">[待替换：裁切截图]</div>
    </a>
  </article>;
}
