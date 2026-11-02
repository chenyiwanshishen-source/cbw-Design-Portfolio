import { useEffect, useState } from 'react';
import { Ruler } from './Ruler';
import { Blueprint } from './Blueprint';
import { useIntroOpening } from './useIntroOpening';
import { Intro } from './Intro';
import { CaseCard } from './CaseCard';
import { cases, navigation } from './content/zh';
import './home.css';

export function HomePage({ route }: { route: string }) {
  const [replay, setReplay] = useState(0);
  const { playing, finish } = useIntroOpening(replay);
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
      <Ruler onReplay={() => setReplay(value => value + 1)} />
      <Intro />
      <div className="flex flex-col gap-24 pb-24">
        <section id="work" aria-label="项目" className="flex flex-col gap-6">
          {cases.map(item => <CaseCard key={item.id} item={item} />)}
        </section>
        {[['ai', 'AI 工作流'], ['exp', '经历'], ['about', '关于 / 页脚']].map(([id, title]) => <section id={id} key={id} aria-labelledby={`${id}-title`} className="flex flex-col gap-6 border-t border-border pt-4"><h2 id={`${id}-title`} className="text-h2 font-normal text-balance">{title}</h2><p className="text-body text-text-secondary">[待补充]</p></section>)}
      </div>
    </div>
    {playing && <Blueprint onFinish={finish} />}
  </div>;
}
