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
      <header><h1><CaseText text={project?.name ?? ""} /></h1><p className="text-caption text-text-secondary">{chapter.title}</p></header>
      {chapter.id === 'explorations-01' ? <>
        <CaseBlocks blocks={chapter.blocks.slice(0, 1)} labels={labels} />
        <p className="text-caption"><a href={chapter.url} target="_blank" rel="noreferrer" className="exploration-repo-link"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18a4.63 4.63 0 0 1 1.24 3.22c0 4.6-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg><span>查看 GitHub 仓库 ↗</span></a></p>
        <CaseBlocks blocks={chapter.blocks.slice(1)} labels={labels} />
      </> : <CaseBlocks blocks={chapter.blocks} labels={labels} />}
      <p className="exploration-status"><CaseText text={chapter.status.split('GitHub')[0]} />{chapter.url && <><a href={chapter.url} target="_blank" rel="noreferrer">GitHub</a><CaseText text={chapter.status.split('GitHub')[1] ?? ''} /></>}</p>
      <nav className="case-switch"><a href="#ai">← 返回首页探索项目</a></nav>
    </div> : <p className="case-paragraph">项目不存在，<a href="#ai">返回首页探索项目</a>。</p>}
  </CaseLayout>;
}
