import { useEffect } from 'react';
import { explorations, explorationProjects } from './content/explorations';
import { CaseLayout } from './components/CaseLayout';
import { CaseText } from './components/TodoNote';
import { CaseBlocks } from './CaseBlocks';
import './explorations.css';

const labels = { judgment: '我的判断', result: '结果' };
export function ExplorationsCase({ route }: { route: string }) {
  const project = explorationProjects.find(item => item.href === route);
  const chapter = explorations.chapters.find(item => item.id === project?.chapter);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);
  return <CaseLayout backLabel="← 返回首页" footer={<a href="#ai" className="text-caption text-text-secondary">返回探索项目</a>}>
    {chapter ? <div className="exploration-detail">
      <header><p className="text-caption text-text-secondary">{project?.name}</p><h1>{chapter.title}</h1></header>
      <CaseBlocks blocks={chapter.blocks} labels={labels} />
      <p className="exploration-status"><CaseText text={chapter.status.split('GitHub')[0]} />{chapter.url && <><a href={chapter.url} target="_blank" rel="noreferrer">GitHub</a><CaseText text={chapter.status.split('GitHub')[1] ?? ''} /></>}</p>
      <nav className="case-switch"><a href="#ai">← 返回首页探索项目</a></nav>
    </div> : <p className="case-paragraph">项目不存在，<a href="#ai">返回首页探索项目</a>。</p>}
  </CaseLayout>;
}
