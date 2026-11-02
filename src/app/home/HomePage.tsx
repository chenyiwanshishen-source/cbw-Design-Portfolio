import { useEffect, useState } from 'react';
import { SiteHeader } from './SiteHeader';
import { Ruler } from './Ruler';
import { Intro } from './Intro';
import { CaseCard } from './CaseCard';
import { cases, navigation } from './content/zh';
import './home.css';

export function HomePage({ route }: { route: string }) {
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = navigation.find(item => route === `#${item.id}`)?.id;
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  return <div className="homepage">
    <div className="mx-auto w-full max-w-content">
      <SiteHeader />
      <Ruler onReplay={() => setReplay(value => value + 1)} />
      <Intro replay={replay} />
      <div className="flex flex-col gap-24 pb-24">
        <section id="work" aria-labelledby="work-title" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 pt-4"><h2 id="work-title" className="text-h2 font-normal text-balance">精选案例</h2><span className="font-mono text-label text-text-meta">CASE 01 / 03</span></div>
          {cases.map(item => <CaseCard key={item.id} item={item} />)}
        </section>
        {[['ai', 'AI 工作流'], ['exp', '经历'], ['about', '关于 / 页脚']].map(([id, title]) => <section id={id} key={id} aria-labelledby={`${id}-title`} className="flex flex-col gap-6 border-t border-border pt-4"><h2 id={`${id}-title`} className="text-h2 font-normal text-balance">{title}</h2><p className="text-body text-text-secondary">[待补充]</p></section>)}
      </div>
    </div>
  </div>;
}
