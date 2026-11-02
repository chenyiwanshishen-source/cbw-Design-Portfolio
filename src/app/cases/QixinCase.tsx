import { useEffect } from 'react';
import { qixin } from './content/qixin';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseSummary } from './components/CaseSummary';
import { CaseToc } from './components/CaseToc';
import { CaseSection } from './components/CaseSection';
import { FigurePlaceholder } from './components/FigurePlaceholder';
import { CaseBlocks } from './CaseBlocks';
import './qixin.css';

export function QixinCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel={qixin.ui.back} footer={<span className="text-caption text-text-meta">{qixin.ui.footer}</span>}>
    <div className="qixin-case">
      <FigurePlaceholder {...qixin.hero} />
      <CaseHeader content={qixin.header} compact />
      <ol className="qixin-timeline" aria-label={qixin.ui.timeline}>{qixin.timeline.map(item => <li key={item}>{item}</li>)}</ol>
      <CaseSummary items={qixin.summary} />
      <div className="case-body">
        <CaseToc items={qixin.toc} label={qixin.ui.toc} />
        <div className="case-chapters">{qixin.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}><CaseBlocks blocks={chapter.blocks} labels={qixin.ui} /></CaseSection>)}</div>
      </div>
      <nav className="case-switch">
        <a href="#/project/ai-report"><span className="text-caption text-text-meta">{qixin.ui.previous}</span><span className="text-h4 font-normal">{qixin.ui.previousTitle}</span></a>
        <a href="#/project/explorations"><span className="text-caption text-text-meta">{qixin.ui.next}</span><span className="text-h4 font-normal">{qixin.ui.nextTitle}</span></a>
      </nav>
    </div>
  </CaseLayout>;
}
