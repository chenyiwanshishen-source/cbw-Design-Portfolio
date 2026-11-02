import { navigation } from './content/zh';

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-6">
      <a href="#top" className="home-target inline-flex items-center gap-3 text-body font-medium text-text">
        <span className="inline-flex size-8 items-center justify-center border border-accent font-bold text-accent" aria-hidden="true">陈</span>
        陈俊学 · 产品设计师
      </a>
      <nav aria-label="主导航" className="flex flex-wrap items-center gap-x-6">
        {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className="home-target inline-flex items-center text-caption text-text hover:text-accent">{label}</a>)}
      </nav>
      <span className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-2 font-mono text-micro text-text">
        <span className="home-status-dot rounded-full bg-success" aria-hidden="true" />在找新机会 · 上海
      </span>
    </header>
  );
}
